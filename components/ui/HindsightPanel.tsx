import { BrainCircuit, Cpu } from 'lucide-react';

const memories = [
  { id: 1, version: 'v2.3.8', date: 'Dec 12, 2025', outcome: 'Incident (P2)', similarity: '94%', note: 'Same database schema migration structure on users table — 8min write latency downtime' },
  { id: 2, version: 'v2.2.1', date: 'Oct 05, 2025', outcome: 'Success', similarity: '82%', note: 'Similar middleware change set, deployed Tuesday morning — stable execution.' },
  { id: 3, version: 'v1.7.0', date: 'Sep 18, 2025', outcome: 'Degraded Uptime', similarity: '79%', note: 'Comparable DB index adjustment. Latency rose +40% for 30 minutes.' }
];

export default function HindsightPanel() {
  return (
    <div className="bg-[#1C2030]/30 border border-[#A78BFA]/25 rounded-xl overflow-hidden shadow-xl animate-slide-in-right">
      {/* Header */}
      <div className="bg-[#A78BFA]/10 p-4 border-b border-[#A78BFA]/20 flex justify-between items-center">
        <h3 className="text-[#A78BFA] font-bold text-xs flex items-center gap-2">
          <BrainCircuit size={16} /> Hindsight Memory
        </h3>
        <span className="text-[9px] bg-[#A78BFA] text-[#0D0F14] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
          <Cpu size={10} /> Active
        </span>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        <p className="text-[10px] text-[#8B91B5] italic leading-relaxed">
          Semantically matched event outcomes retrieved from episodic memory cache:
        </p>
        
        {memories.map(m => {
          const isIncident = m.outcome.includes('Incident') || m.outcome.includes('Degraded');
          const outcomeColor = isIncident ? 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20' : 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20';

          return (
            <div key={m.id} className="bg-[#13161E] border border-[#2A2F45] p-3.5 rounded-lg space-y-2.5 hover:border-[#3D4566] transition-colors duration-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#F0F2FF] font-mono">{m.version}</span>
                <span className="text-[#8B91B5] text-[10px]">{m.date}</span>
              </div>
              
              <div className="text-[10px] flex justify-between items-center">
                <span className={`px-2 py-0.5 rounded font-bold border ${outcomeColor}`}>
                  {m.outcome}
                </span>
                <span className="text-[#A78BFA] font-bold font-mono">Similarity: {m.similarity}</span>
              </div>
              
              <p className="text-[11px] text-[#8B91B5] italic leading-relaxed border-t border-[#2A2F45]/50 pt-2">
                "{m.note}"
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}