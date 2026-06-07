/**
 * Groq LLM Service (OpenAI-compatible SDK)
 *
 * Used for generating deployment risk recommendations.
 * The chat/NL query uses Hindsight's built-in `reflect` operation instead,
 * which is already memory-grounded and gives better results.
 *
 * Model: llama-3.3-70b-versatile — best free-tier model on Groq
 * Falls back to rule-based responses when GROQ_API_KEY is not set.
 */

import OpenAI from 'openai';
import type { Deployment, RiskFactor, Recommendation, RiskLevel } from '../models/types';
import type { HindsightMemory } from './hindsight.service';

const groqClient = process.env.GROQ_API_KEY
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  : null;

const MODEL = 'llama-3.3-70b-versatile';

// ── Risk Recommendations ───────────────────────────────────────────────────

export async function generateRecommendations(params: {
  deployment: Deployment;
  factors: RiskFactor[];
  similarEvents: HindsightMemory[];
  service_name: string;
  risk_level: RiskLevel;
}): Promise<Recommendation[]> {
  if (!groqClient) {
    return getStaticRecommendations(params.risk_level, params.factors);
  }

  const memoryContext = params.similarEvents
    .slice(0, 3)
    .map(
      (e, i) =>
        `[Past Event ${i + 1}] ${e.metadata.context ?? e.metadata.type ?? 'event'} | Outcome: ${e.metadata.outcome ?? 'unknown'} | ${e.content.substring(0, 200)}`
    )
    .join('\n');

  const factorsList = params.factors.map(f => `- ${f.label} (weight: ${f.weight})`).join('\n');

  const prompt = `You are a DevOps risk advisor for PipelineIQ. A deployment is about to happen.
Based on the risk factors and historical context below, provide exactly 3 specific, actionable recommendations.

Service: ${params.service_name}
Version: ${params.deployment.version}
Risk Level: ${params.risk_level.toUpperCase()}
Change Summary: ${params.deployment.change_summary ?? 'Not provided'}

Risk Factors:
${factorsList || 'No significant risk factors detected'}

Historical Context:
${memoryContext || 'No similar past events found'}

Respond with ONLY a JSON object like: {"recommendations": [{"text": "specific action", "priority": "high"}, ...]}
Priority must be "high", "medium", or "low". Be specific and reference the actual service/change.`;

  try {
    const response = await groqClient.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 512,
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(content);
    const recs: Recommendation[] = Array.isArray(parsed.recommendations)
      ? parsed.recommendations
      : Array.isArray(parsed)
      ? parsed
      : [];

    return recs.slice(0, 3).map(r => ({
      text: String(r.text ?? ''),
      priority: (['high', 'medium', 'low'].includes(r.priority) ? r.priority : 'medium') as
        | 'high'
        | 'medium'
        | 'low',
    }));
  } catch (err) {
    console.error('[Groq] recommendations failed:', err);
    return getStaticRecommendations(params.risk_level, params.factors);
  }
}

// ── Static fallbacks ───────────────────────────────────────────────────────

function getStaticRecommendations(
  riskLevel: RiskLevel,
  factors: RiskFactor[]
): Recommendation[] {
  const hasMigration = factors.some(f => f.label.toLowerCase().includes('migration'));
  const isHighRisk = riskLevel === 'high' || riskLevel === 'elevated';

  if (isHighRisk && hasMigration) {
    return [
      { text: 'Validate rollback script and database backup before deploying', priority: 'high' },
      { text: 'Run migration on a production-equivalent dataset in staging first', priority: 'high' },
      { text: 'Monitor DB latency and error rate for 30 minutes post-deploy', priority: 'medium' },
    ];
  }

  if (isHighRisk) {
    return [
      { text: 'Ensure SRE coverage is active during the deploy window', priority: 'high' },
      { text: 'Run smoke tests on critical paths before promoting traffic', priority: 'high' },
      { text: 'Prepare rollback procedure and communicate to team', priority: 'medium' },
    ];
  }

  return [
    { text: 'Proceed with standard automated test suite', priority: 'low' },
    { text: 'Monitor application error rate for 15 minutes post-deploy', priority: 'low' },
  ];
}
