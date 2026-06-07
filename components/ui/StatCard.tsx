import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({ title, value, trend, icon: Icon, color }: StatCardProps) {
  // Logic for colorizing the trend based on context:
  // - Decreasing risk or incidents is GOOD (green)
  // - Increasing deployments is GOOD (green)
  // - Decreasing uptime or services up is BAD (red)
  const isDown = trend.includes('↓') || trend.includes('-');
  
  let isGood = true;
  if (title.toLowerCase().includes('incident') && isDown) {
    isGood = true; // incidents down is good
  } else if (title.toLowerCase().includes('risk') && isDown) {
    isGood = true; // risk down is good
  } else if (title.toLowerCase().includes('deploy') && isDown) {
    isGood = false; // deployments down is bad/neutral
  } else if (title.toLowerCase().includes('services') && isDown) {
    isGood = false; // service health down is bad
  } else if (!isDown && (title.toLowerCase().includes('incident') || title.toLowerCase().includes('risk'))) {
    isGood = false; // risk/incidents up is bad
  }

  const trendColorClass = isGood 
    ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20' 
    : 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20';

  return (
    <div className="card-bg rounded-xl p-5 flex flex-col justify-between relative overflow-hidden group">
      {/* Background glow hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F7FFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-[#8B91B5] uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-lg bg-[#1C2030] ${color || 'text-[#8B91B5]'} group-hover:scale-110 transition-transform duration-200`}>
          <Icon size={16} />
        </div>
      </div>
      
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-3xl font-bold tracking-tight text-[#F0F2FF]">{value}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${trendColorClass}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
