"use client";
import Link from 'next/link';
import { 
  BrainCircuit, Activity, MessageSquare, ShieldCheck, 
  Terminal, ArrowRight, Sparkles, Play, GitBranch, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [pipelineState, setPipelineState] = useState<'idle' | 'analyzing' | 'risk_detected' | 'rollback'>('idle');

  // Loop a simulated pipeline animation in the hero illustration
  useEffect(() => {
    const timer = setInterval(() => {
      setPipelineState(prev => {
        if (prev === 'idle') return 'analyzing';
        if (prev === 'analyzing') return 'risk_detected';
        if (prev === 'risk_detected') return 'rollback';
        return 'idle';
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0F14] text-[#F0F2FF] flex flex-col relative overflow-hidden select-none">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4F7FFF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#A78BFA]/5 blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <nav className="h-20 border-b border-[#2A2F45]/50 bg-[#0D0F14]/75 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#4F7FFF] to-[#A78BFA] rounded-xl flex items-center justify-center shadow-lg shadow-[#4F7FFF]/20">
            <BrainCircuit className="text-[#0D0F14] w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-bold text-lg tracking-tight">PipelineIQ</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-[#8B91B5] hover:text-[#F0F2FF] transition-colors font-medium">Features</a>
          <a href="#demo" className="text-[#8B91B5] hover:text-[#F0F2FF] transition-colors font-medium">Interactive Demo</a>
          <a href="#architecture" className="text-[#8B91B5] hover:text-[#F0F2FF] transition-colors font-medium">Hindsight Layer</a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-xs font-semibold text-[#8B91B5] hover:text-[#F0F2FF] px-4 py-2 transition-colors">
            Log In
          </Link>
          <Link href="/auth/signup" className="text-xs font-semibold bg-[#4F7FFF] hover:bg-[#4F7FFF]/90 text-white px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-[#4F7FFF]/15 hover:shadow-[#4F7FFF]/25 hover:scale-[1.02]">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-16 py-20 lg:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center flex-1 w-full z-10">
        {/* Left Column: Headline */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full text-xs font-semibold text-[#A78BFA] animate-pulse">
            <Sparkles size={12} />
            <span>Introducing Episodic Memory via Hindsight</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Your pipeline's <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F7FFF] via-[#A78BFA] to-[#22D3EE]">
              memory. Finally.
            </span>
          </h1>

          <p className="text-[#8B91B5] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            PipelineIQ learns from every deployment, failure, and incident in your delivery lifecycle to prevent the next one. It predicts deployment risk before you merge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              href="/auth/signup" 
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4F7FFF] to-[#4F7FFF]/90 hover:from-[#4F7FFF]/90 hover:to-[#4F7FFF] text-white px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-xl shadow-[#4F7FFF]/20 hover:scale-[1.02]"
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
            <a 
              href="#demo" 
              className="flex items-center justify-center gap-2 bg-[#13161E] hover:bg-[#1C2030] border border-[#2A2F45] text-[#F0F2FF] px-8 py-4 rounded-xl text-sm font-semibold transition-colors"
            >
              <Play size={14} fill="currentColor" /> Watch 2-min Demo
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Pipeline Animation */}
        <div id="demo" className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[500px] bg-[#13161E]/95 border border-[#2A2F45] rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-[#2A2F45]/50 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#EF4444] rounded-full" />
                <span className="w-2.5 h-2.5 bg-[#EAB308] rounded-full" />
                <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full" />
              </div>
              <span className="text-[10px] font-mono text-[#4A5070]">pipelineiq-agent-monitor</span>
            </div>

            {/* Pipeline Stage Visualization */}
            <div className="space-y-6">
              {/* Build Node */}
              <div className="flex items-center justify-between p-3.5 bg-[#1C2030]/40 rounded-xl border border-[#2A2F45]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#4F7FFF]/10 rounded-lg flex items-center justify-center text-[#4F7FFF]">
                    <Terminal size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F0F2FF]">CI Build: payment-service</p>
                    <p className="text-[10px] text-[#8B91B5] font-mono">v1.8.2 • trigger: commit(b8c9d0e)</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded font-bold border border-[#22C55E]/20">
                  <CheckCircle size={10} /> Passing
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center h-8 relative">
                <div className="w-[2px] h-full bg-[#2A2F45] relative">
                  <div className="absolute top-0 left-[-3px] w-2.5 h-2.5 bg-[#4F7FFF] rounded-full animate-bounce" />
                </div>
              </div>

              {/* Memory Retrieval & Risk Scoring Node */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                pipelineState === 'idle' ? 'bg-[#1C2030]/20 border-[#2A2F45]' :
                pipelineState === 'analyzing' ? 'bg-[#A78BFA]/10 border-[#A78BFA]/30 neon-glow-purple' :
                pipelineState === 'risk_detected' ? 'bg-[#EF4444]/10 border-[#EF4444]/30 neon-glow-red' :
                'bg-[#22C55E]/10 border-[#22C55E]/30'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      pipelineState === 'risk_detected' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#A78BFA]/20 text-[#A78BFA]'
                    }`}>
                      <BrainCircuit size={16} className={pipelineState === 'analyzing' ? 'animate-spin' : ''} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#F0F2FF]">Risk Assessment Engine</p>
                      <p className="text-[10px] text-[#8B91B5]">Hindsight memory retrieval active</p>
                    </div>
                  </div>
                  
                  {pipelineState === 'idle' && (
                    <span className="text-[10px] text-[#8B91B5] uppercase font-bold">Idle</span>
                  )}
                  {pipelineState === 'analyzing' && (
                    <span className="text-[10px] text-[#A78BFA] uppercase font-bold animate-pulse">Querying Memory...</span>
                  )}
                  {pipelineState === 'risk_detected' && (
                    <span className="text-[10px] text-[#EF4444] uppercase font-bold flex items-center gap-1">
                      <AlertTriangle size={10} /> Critical Risk
                    </span>
                  )}
                  {pipelineState === 'rollback' && (
                    <span className="text-[10px] text-[#22C55E] uppercase font-bold">Risk mitigated</span>
                  )}
                </div>

                {/* Risk scoring detail details */}
                <div className="space-y-2 text-xs font-mono text-[#8B91B5]">
                  {pipelineState === 'idle' && (
                    <p className="italic text-[10px] text-[#4A5070]">Waiting for deployment webhook trigger...</p>
                  )}
                  {pipelineState === 'analyzing' && (
                    <div className="space-y-1 text-[11px]">
                      <p className="text-[#A78BFA]">• Fetching past payment-service deployments...</p>
                      <p className="text-[#A78BFA]">• Comparing diff sets against incident archives...</p>
                    </div>
                  )}
                  {pipelineState === 'risk_detected' && (
                    <div className="space-y-1.5 text-[11px] bg-[#0D0F14]/60 p-3 rounded-lg border border-[#EF4444]/20">
                      <div className="flex justify-between font-bold text-[#EF4444] mb-1">
                        <span>Risk Score: 89/100</span>
                        <span>HIGH RISK</span>
                      </div>
                      <p className="text-[#8B91B5]">• 3 similar stripe migrations in 90d caused 2 major incidents</p>
                      <p className="text-[#8B91B5]">• Target deploy window: Friday 5:12 PM (88% incident rate)</p>
                    </div>
                  )}
                  {pipelineState === 'rollback' && (
                    <div className="space-y-1 text-[11px] bg-[#0D0F14]/60 p-3 rounded-lg border border-[#22C55E]/20">
                      <p className="text-[#22C55E] font-bold">Action Recommended: Block & Reschedule</p>
                      <p className="text-[#8B91B5]">• Deploy halted. Rescheduled to Monday 10:00 AM</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip Section */}
      <section id="features" className="bg-[#13161E] border-y border-[#2A2F45] py-20 px-6 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F0F2FF]">Designed for high-reliability platform teams</h2>
            <p className="text-[#8B91B5] text-sm">Everything SRE and DevOps leads need to maintain zero-incident production environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-[#1C2030]/30 border border-[#2A2F45] rounded-2xl hover:border-[#3D4566] transition-all group">
              <div className="w-10 h-10 bg-[#A78BFA]/10 text-[#A78BFA] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <BrainCircuit size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#F0F2FF] mb-2">Memory-Driven Intelligence</h3>
              <p className="text-[#8B91B5] text-sm leading-relaxed">PipelineIQ queries Hindsight episodic memory to pull up similar historical deployments, logs, and resolution details automatically.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-[#1C2030]/30 border border-[#2A2F45] rounded-2xl hover:border-[#3D4566] transition-all group">
              <div className="w-10 h-10 bg-[#4F7FFF]/10 text-[#4F7FFF] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <Activity size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#F0F2FF] mb-2">Real-Time Risk Scoring</h3>
              <p className="text-[#8B91B5] text-sm leading-relaxed">Computes an exact Risk Score from 0 to 100 before every deployment by weighing change diffs, commit history, and day-of-week incident frequencies.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-[#1C2030]/30 border border-[#2A2F45] rounded-2xl hover:border-[#3D4566] transition-all group">
              <div className="w-10 h-10 bg-[#22D3EE]/10 text-[#22D3EE] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#F0F2FF] mb-2">Natural Language Queries</h3>
              <p className="text-[#8B91B5] text-sm leading-relaxed">Interact with your deployment graph using English. Ask what caused the database incident last month or which commits are highly risky.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="py-16 px-6 lg:px-16 text-center max-w-7xl mx-auto w-full z-10">
        <p className="text-[#4A5070] text-xs font-bold uppercase tracking-widest mb-8">Trusted by next-generation platform engineering teams</p>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-30 grayscale hover:opacity-50 transition-opacity duration-300">
          <span className="font-mono text-xl font-bold tracking-tight text-[#F0F2FF]">VERCEL</span>
          <span className="font-mono text-xl font-bold tracking-tight text-[#F0F2FF]">DATADOG</span>
          <span className="font-mono text-xl font-bold tracking-tight text-[#F0F2FF]">HASHICORP</span>
          <span className="font-mono text-xl font-bold tracking-tight text-[#F0F2FF]">AWS_CI/CD</span>
          <span className="font-mono text-xl font-bold tracking-tight text-[#F0F2FF]">SLACK_ENG</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#2A2F45]/50 bg-[#0D0F14] py-12 px-6 lg:px-16 text-center text-xs text-[#8B91B5] z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-[#4F7FFF] w-4 h-4" />
            <span className="font-bold text-[#F0F2FF]">PipelineIQ</span>
            <span className="text-[#4A5070]">|</span>
            <span>Episodic Memory DevOps Agent</span>
          </div>
          <p className="text-[#4A5070]">© {new Date().getFullYear()} PipelineIQ Inc. All rights reserved. Built for HackBaroda 2026.</p>
        </div>
      </footer>
    </div>
  );
}
