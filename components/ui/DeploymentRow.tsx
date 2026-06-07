import Link from 'next/link';
import { ChevronRight, Terminal, ShieldAlert } from 'lucide-react';

interface DeploymentRowProps {
  id?: string;
  service: string;
  version: string;
  risk: number;
  status: string;
  time: string;
}

export default function DeploymentRow({ id = '1', service, version, risk, status, time }: DeploymentRowProps) {
  // Determine color coding based on risk score
  let riskColor = 'border-l-[#22C55E]';
  let riskBg = 'bg-[#22C55E]/10 text-[#22C55E]';
  
  if (risk > 80) {
    riskColor = 'border-l-[#EF4444]';
    riskBg = 'bg-[#EF4444]/10 text-[#EF4444]';
  } else if (risk > 60) {
    riskColor = 'border-l-[#F97316]';
    riskBg = 'bg-[#F97316]/10 text-[#F97316]';
  } else if (risk > 30) {
    riskColor = 'border-l-[#EAB308]';
    riskBg = 'bg-[#EAB308]/10 text-[#EAB308]';
  }

  // Environment badge color
  const isProd = status.toLowerCase() === 'production';
  const envBadgeColor = isProd 
    ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20' 
    : 'text-[#4F7FFF] bg-[#4F7FFF]/10 border-[#4F7FFF]/20';

  return (
    <Link 
      href={`/deployments/${id}`}
      className={`block bg-[#13161E] border border-[#2A2F45] border-l-4 ${riskColor} rounded-xl p-4 hover:border-r-[#3D4566] hover:bg-[#1C2030]/60 transition-all group duration-200`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#1C2030] flex items-center justify-center text-[#8B91B5] group-hover:text-[#F0F2FF] transition-colors duration-200">
            <Terminal size={16} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#F0F2FF] flex items-center gap-2">
              {service}
              <span className="text-xs font-mono text-[#8B91B5] bg-[#1C2030] px-2 py-0.5 rounded border border-[#2A2F45]">
                {version}
              </span>
            </h4>
            <div className="flex gap-3 mt-1.5 text-xs text-[#8B91B5]">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${envBadgeColor}`}>
                {status}
              </span>
              <span>•</span>
              <span>{time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-[#8B91B5] font-semibold mb-1 uppercase tracking-wider">Risk Score</div>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${riskBg}`}>
              {risk}
            </span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-[#1C2030] flex items-center justify-center text-[#8B91B5] group-hover:bg-[#4F7FFF] group-hover:text-white transition-all duration-200">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
