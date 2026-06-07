/**
 * Risk Scoring Engine
 *
 * Computes a 0-100 risk score for a deployment by combining:
 *   A. Historical failure rate from semantically similar Hindsight memories
 *   B. Infrastructure change risk (db migration, critical deps)
 *   C. Temporal risk (day-of-week + hour)
 *   D. Recent failure streak for this service
 *
 * Then generates recommendations via Groq LLM with the Hindsight context.
 */

import { retrieveSimilarMemories, buildDeploymentNarrative } from './hindsight.service';
import { generateRecommendations } from './groq.service';
import { getRecentBuildFailures } from '../repositories/build-failure.repo';
import { getInfraChangesByDeployment } from '../repositories/deployment.repo';
import { getServiceById } from '../repositories/org.repo';
import type { Deployment, RiskAnalysis, RiskFactor, Recommendation, RiskLevel } from '../models/types';
import { nanoid } from '../lib/nanoid';

export async function computeRiskScore(deployment: Deployment): Promise<RiskAnalysis> {
  const service = getServiceById(deployment.service_id);
  const infraChanges = getInfraChangesByDeployment(deployment.id);

  const hasMigration = infraChanges.some(ic => ic.change_type === 'db_migration');
  const hasInfraChange = infraChanges.length > 0;

  // 1. Build narrative for Hindsight query
  const narrative = buildDeploymentNarrative({
    service_name: service?.name ?? 'unknown-service',
    version: deployment.version,
    environment: deployment.environment_id,
    deployer_name: deployment.deployed_by_name,
    change_summary: deployment.change_summary,
    has_db_migration: hasMigration,
    has_infra_change: hasInfraChange,
    timestamp: deployment.started_at ?? deployment.created_at,
  });

  // 2. Retrieve similar past events
  let similarEvents: any[] = [];
  try {
    similarEvents = await retrieveSimilarMemories(
      narrative,
      { org_id: deployment.org_id, service_name: service?.name },
      10
    );
  } catch {
    similarEvents = [];
  }

  const factors: RiskFactor[] = [];
  let totalScore = 0;

  // ── Factor A: Historical failure rate ────────────────────────────────────
  let historicalFactor = 0;
  if (similarEvents.length > 0) {
    const failedEvents = similarEvents.filter(e => e.metadata?.outcome === 'failure');
    const failureRate = failedEvents.length / similarEvents.length;
    historicalFactor = Math.round(failureRate * 40);
    totalScore += historicalFactor;

    if (historicalFactor > 8) {
      factors.push({
        label: `${failedEvents.length}/${similarEvents.length} similar past deploys caused failures`,
        weight: historicalFactor,
        category: 'historical',
      });
    }
  }

  // ── Factor B: Infrastructure change risk ─────────────────────────────────
  let infraFactor = 0;
  if (hasMigration) {
    infraFactor += 20;
    totalScore += 20;
    factors.push({ label: 'Database migration included', weight: 20, category: 'infra' });
  } else if (hasInfraChange) {
    infraFactor += 10;
    totalScore += 10;
    factors.push({
      label: `Infrastructure change detected: ${infraChanges[0].change_type.replace(/_/g, ' ')}`,
      weight: 10,
      category: 'infra',
    });
  }

  // ── Factor C: Temporal risk ───────────────────────────────────────────────
  let temporalFactor = 0;
  const deployTime = new Date(deployment.started_at ?? Date.now());
  const dayOfWeek = deployTime.getDay(); // 0=Sun, 5=Fri
  const hourUTC = deployTime.getUTCHours();

  if (dayOfWeek === 5 && hourUTC >= 14) {
    temporalFactor = 18;
    totalScore += 18;
    factors.push({ label: 'Friday afternoon deploy (historically risky window)', weight: 18, category: 'temporal' });
  } else if (dayOfWeek === 6 || dayOfWeek === 0) {
    temporalFactor = 12;
    totalScore += 12;
    factors.push({ label: 'Weekend deploy (reduced SRE coverage)', weight: 12, category: 'temporal' });
  } else if (hourUTC >= 20 || hourUTC < 6) {
    temporalFactor = 8;
    totalScore += 8;
    factors.push({ label: 'Off-hours deploy (reduced response capacity)', weight: 8, category: 'temporal' });
  }

  // ── Factor D: Recent failure streak ──────────────────────────────────────
  let frequencyFactor = 0;
  const recentFailures = getRecentBuildFailures(deployment.service_id, 14);
  if (recentFailures.length >= 2) {
    frequencyFactor = Math.min(recentFailures.length * 6, 22);
    totalScore += frequencyFactor;
    factors.push({
      label: `${recentFailures.length} build failures in last 14 days`,
      weight: frequencyFactor,
      category: 'historical',
    });
  }

  const finalScore = Math.min(totalScore, 100);
  const riskLevel = getRiskLevel(finalScore);

  // 5. Generate recommendations via Groq
  let recommendations: Recommendation[] = [];
  try {
    recommendations = await generateRecommendations({
      deployment,
      factors,
      similarEvents,
      service_name: service?.name ?? 'unknown',
      risk_level: riskLevel,
    });
  } catch {
    recommendations = getDefaultRecommendations(riskLevel, hasMigration);
  }

  return {
    id: nanoid(),
    deployment_id: deployment.id,
    risk_score: finalScore,
    risk_level: riskLevel,
    historical_factor: historicalFactor || null,
    temporal_factor: temporalFactor || null,
    infra_factor: infraFactor || null,
    frequency_factor: frequencyFactor || null,
    risk_factors: factors,
    recommendations,
    model_version: 'groq/llama-3.3-70b-versatile',
    computed_at: new Date().toISOString(),
  };
}

function getRiskLevel(score: number): RiskLevel {
  if (score < 30) return 'low';
  if (score < 55) return 'medium';
  if (score < 75) return 'elevated';
  return 'high';
}

function getDefaultRecommendations(
  riskLevel: RiskLevel,
  hasMigration: boolean
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (riskLevel === 'high' || riskLevel === 'elevated') {
    recs.push({ text: 'Ensure SRE coverage is active during deploy window', priority: 'high' });
    recs.push({ text: 'Run full regression suite before promoting to production', priority: 'high' });
  }

  if (hasMigration) {
    recs.push({ text: 'Validate migration rollback script before deploying', priority: 'high' });
    recs.push({ text: 'Test migration performance under load in staging first', priority: 'medium' });
  }

  if (riskLevel === 'low' || riskLevel === 'medium') {
    recs.push({ text: 'Proceed with standard automated test suites', priority: 'low' });
  }

  return recs;
}
