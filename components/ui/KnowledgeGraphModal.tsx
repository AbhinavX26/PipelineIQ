import React, { useEffect, useState } from 'react';
import { X, Network, BrainCircuit, Activity } from 'lucide-react';

interface KnowledgeGraphModalProps {
  onClose: () => void;
}

export default function KnowledgeGraphModal({ onClose }: KnowledgeGraphModalProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  // Nodes mapping
  const nodes = [
    { id: 'auth', label: 'auth-service', x: 250, y: 150, type: 'service', status: 'healthy' },
    { id: 'pay', label: 'payment-service', x: 450, y: 100, type: 'service', status: 'degraded' },
    { id: 'api', label: 'api-gateway', x: 350, y: 250, type: 'service', status: 'healthy' },
    { id: 'notif', label: 'notification-service', x: 150, y: 250, type: 'service', status: 'healthy' },
    { id: 'db1', label: 'Users DB', x: 150, y: 100, type: 'resource', status: 'healthy' },
    { id: 'db2', label: 'Stripe Cache', x: 550, y: 150, type: 'resource', status: 'healthy' },
    { id: 'inc1', label: 'Stripe Locking Incident', x: 500, y: 50, type: 'incident', status: 'critical' },
    { id: 'inc2', label: 'Token Expiry Lag', x: 300, y: 80, type: 'incident', status: 'warning' },
  ];

  // Edges mapping
  const edges = [
    { source: 'api', target: 'auth' },
    { source: 'api', target: 'pay' },
    { source: 'api', target: 'notif' },
    { source: 'auth', target: 'db1' },
    { source: 'pay', target: 'db2' },
    { source: 'inc1', target: 'pay' },
    { source: 'inc1', target: 'db2' },
    { source: 'inc2', target: 'auth' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] pointer-events-auto flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-5xl bg-[#0D0F14] border border-[#2A2F45] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A2F45]/60 flex justify-between items-center bg-[#1C2030]/50 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#A78BFA]/10 rounded-lg flex items-center justify-center text-[#A78BFA]">
              <Network size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#F0F2FF]">Operational Knowledge Graph</h3>
              <p className="text-[10px] text-[#8B91B5] uppercase tracking-wider font-semibold">Live System Topology & Impact Radius</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#8B91B5] hover:text-[#F0F2FF] p-2 hover:bg-[#1C2030] rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body - Graph View */}
        <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1C2030]/40 via-[#0D0F14] to-[#0D0F14]">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0MiwgNDcsIDY5LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

          {/* SVG Canvas for Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet">
            {edges.map((edge, idx) => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;

              const isHighlighted = activeNode === edge.source || activeNode === edge.target;
              const isCritical = sourceNode.status === 'critical' || targetNode.status === 'critical';

              return (
                <g key={idx}>
                  <line 
                    x1={sourceNode.x} 
                    y1={sourceNode.y} 
                    x2={targetNode.x} 
                    y2={targetNode.y} 
                    stroke={isHighlighted ? (isCritical ? '#EF4444' : '#4F7FFF') : '#2A2F45'} 
                    strokeWidth={isHighlighted ? 3 : 1}
                    className="transition-all duration-500"
                    strokeDasharray={isCritical ? "4,4" : "none"}
                  />
                  {isHighlighted && (
                    <circle 
                      cx={sourceNode.x} cy={sourceNode.y} r="3" fill={isCritical ? '#EF4444' : '#4F7FFF'}
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* HTML Overlay for Nodes */}
          <div className="absolute inset-0 w-full h-full" style={{ position: 'relative', width: '100%', height: '100%', transform: 'scale(1.2) translate(10%, 15%)' }}>
            {nodes.map((node) => {
              let bg = 'bg-[#1C2030] border-[#2A2F45]';
              let text = 'text-[#8B91B5]';
              let shadow = '';
              let pulse = false;

              if (node.status === 'critical') {
                bg = 'bg-[#EF4444]/20 border-[#EF4444]';
                text = 'text-[#EF4444]';
                shadow = 'shadow-[0_0_15px_rgba(239,68,68,0.4)]';
                pulse = true;
              } else if (node.status === 'degraded') {
                bg = 'bg-[#F97316]/20 border-[#F97316]';
                text = 'text-[#F97316]';
                shadow = 'shadow-[0_0_15px_rgba(249,115,22,0.3)]';
              } else if (node.type === 'service') {
                bg = 'bg-[#4F7FFF]/10 border-[#4F7FFF]/50';
                text = 'text-[#4F7FFF]';
                shadow = 'shadow-[0_0_15px_rgba(79,127,255,0.2)]';
              }

              const isHovered = activeNode === node.id;

              return (
                <div
                  key={node.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110 z-20' : 'scale-100 z-10'}`}
                  style={{ left: `${(node.x / 700) * 100}%`, top: `${(node.y / 400) * 100}%` }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <div className={`px-4 py-2 rounded-xl border backdrop-blur-md flex items-center gap-2 ${bg} ${shadow} ${pulse ? 'animate-pulse' : ''}`}>
                    {node.type === 'incident' ? <Activity size={14} className={text} /> : <BrainCircuit size={14} className={text} />}
                    <span className={`text-xs font-bold ${isHovered ? 'text-white' : text}`}>{node.label}</span>
                  </div>
                  
                  {isHovered && node.type === 'service' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#13161E] border border-[#2A2F45] rounded-xl p-3 shadow-2xl z-50">
                      <div className="text-[10px] uppercase text-[#8B91B5] font-bold mb-1">Impact Radius</div>
                      <div className="text-xs text-[#F0F2FF] mb-2">Connected to {edges.filter(e => e.source === node.id || e.target === node.id).length} nodes</div>
                      {node.status === 'degraded' && (
                        <div className="text-[10px] text-[#F97316] bg-[#F97316]/10 p-1.5 rounded border border-[#F97316]/20">
                          Hindsight Warning: 88% chance of related incident escalation.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#1C2030]/80 border-t border-[#2A2F45]/60 flex items-center justify-between text-xs text-[#8B91B5]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#EF4444]" /> Critical Path</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F97316]" /> Degraded</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#4F7FFF]" /> Healthy</span>
          </div>
          <p className="italic">Hover over nodes to explore causal relationships.</p>
        </div>
      </div>
    </div>
  );
}
