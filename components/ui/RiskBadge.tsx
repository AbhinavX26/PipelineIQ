export default function RiskBadge({ score }: { score: number }) {
  let colorClass = 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20';
  let label = 'Low';
  
  if (score > 80) { 
    colorClass = 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20'; 
    label = 'High'; 
  } else if (score > 60) { 
    colorClass = 'text-[#F97316] bg-[#F97316]/10 border-[#F97316]/20'; 
    label = 'Elevated'; 
  } else if (score > 30) { 
    colorClass = 'text-[#EAB308] bg-[#EAB308]/10 border-[#EAB308]/20'; 
    label = 'Medium'; 
  }

  return (
    <div className="flex flex-col items-end relative group select-none">
      {/* Glow shadow ring on hover */}
      <div className="absolute -inset-0.5 rounded-lg bg-[#4F7FFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
      
      <div className={`border font-extrabold px-3 py-1 rounded-lg text-lg tracking-tight font-mono shadow-sm ${colorClass} group-hover:scale-105 transition-transform duration-200`}>
        {score}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest mt-1 text-[#8B91B5]">{label} Risk</span>
    </div>
  );
}