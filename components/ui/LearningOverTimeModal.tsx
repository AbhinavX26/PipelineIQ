import React, { useState, useEffect } from 'react';
import { X, TrendingUp, BrainCircuit, Activity } from 'lucide-react';

interface LearningOverTimeModalProps {
  onClose: () => void;
}

export default function LearningOverTimeModal({ onClose }: LearningOverTimeModalProps) {
  const [ingestedCount, setIngestedCount] = useState(10);
  const maxIngested = 500;
  
  // Data for the chart
  const dataPoints = 50; // Total points on X axis
  const chartW = 800;
  const chartH = 300;

  // Simulate accuracy curve: starts low, climbs logarithmically/asymptotically to 98%
  const getAccuracyForCount = (count: number) => {
    // Basic logarithmic curve bounded between ~30% and 98%
    const base = 30;
    const maxAddition = 68;
    const progress = Math.min(count / maxIngested, 1);
    // easing function for natural curve
    const easeOutCirc = Math.sqrt(1 - Math.pow(progress - 1, 2));
    return base + (easeOutCirc * maxAddition);
  };

  const currentAccuracy = getAccuracyForCount(ingestedCount);

  // Generate SVG path for the line up to the current count
  const generatePath = (activeCount: number) => {
    const activePoints = Math.max(1, Math.floor((activeCount / maxIngested) * dataPoints));
    
    let path = '';
    for (let i = 0; i < activePoints; i++) {
      const currentXCount = (i / (dataPoints - 1)) * maxIngested;
      const x = (i / (dataPoints - 1)) * chartW;
      const acc = getAccuracyForCount(currentXCount);
      // Map acc (0-100) to Y coordinate (chartH to 0)
      const y = chartH - (acc / 100) * chartH;
      
      if (i === 0) path += `M ${x} ${y}`;
      else path += ` L ${x} ${y}`;
    }
    return path;
  };

  // Generate area path for the gradient fill
  const generateAreaPath = (activeCount: number) => {
    const linePath = generatePath(activeCount);
    const activePoints = Math.max(1, Math.floor((activeCount / maxIngested) * dataPoints));
    const lastX = ((activePoints - 1) / (dataPoints - 1)) * chartW;
    return `${linePath} L ${lastX} ${chartH} L 0 ${chartH} Z`;
  };

  // Auto-animate on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setIngestedCount(prev => {
        if (prev >= maxIngested) {
          clearInterval(timer);
          return maxIngested;
        }
        return prev + 5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const linePath = generatePath(ingestedCount);
  const areaPath = generateAreaPath(ingestedCount);

  // Calculate the position of the leading dot
  const activePointIndex = Math.max(1, Math.floor((ingestedCount / maxIngested) * dataPoints)) - 1;
  const currentXCount = (activePointIndex / (dataPoints - 1)) * maxIngested;
  const dotX = (activePointIndex / (dataPoints - 1)) * chartW;
  const dotY = chartH - (getAccuracyForCount(currentXCount) / 100) * chartH;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] pointer-events-auto flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-4xl bg-[#13161E] border border-[#2A2F45] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2A2F45]/60 flex justify-between items-center bg-[#1C2030]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#22D3EE]/10 rounded-lg flex items-center justify-center text-[#22D3EE]">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#F0F2FF]">AI Learning Curve Demonstration</h3>
              <p className="text-[10px] text-[#8B91B5] uppercase tracking-wider font-semibold">Risk Prediction Accuracy vs Deployments Ingested</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#8B91B5] hover:text-[#F0F2FF] p-2 hover:bg-[#1C2030] rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1C2030]/40 border border-[#2A2F45] p-4 rounded-xl">
              <div className="text-[10px] text-[#8B91B5] uppercase font-bold mb-1">Deployments Ingested</div>
              <div className="text-2xl font-bold text-[#F0F2FF] font-mono">{ingestedCount}</div>
            </div>
            <div className="bg-[#1C2030]/40 border border-[#2A2F45] p-4 rounded-xl">
              <div className="text-[10px] text-[#8B91B5] uppercase font-bold mb-1">Current Accuracy</div>
              <div className="text-2xl font-bold text-[#22D3EE] font-mono">{currentAccuracy.toFixed(1)}%</div>
            </div>
            <div className="bg-[#1C2030]/40 border border-[#2A2F45] p-4 rounded-xl">
              <div className="text-[10px] text-[#8B91B5] uppercase font-bold mb-1">False Positives</div>
              <div className="text-2xl font-bold text-[#F97316] font-mono">
                {Math.max(1, Math.floor(100 - currentAccuracy) / 2).toFixed(1)}%
              </div>
            </div>
            <div className="bg-[#1C2030]/40 border border-[#2A2F45] p-4 rounded-xl">
              <div className="text-[10px] text-[#8B91B5] uppercase font-bold mb-1">Model Status</div>
              <div className="text-lg font-bold text-[#22C55E] flex items-center gap-2 mt-1">
                <BrainCircuit size={16} /> 
                {ingestedCount > 400 ? 'Optimized' : ingestedCount > 150 ? 'Learning' : 'Initializing'}
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative bg-[#0D0F14] border border-[#2A2F45] rounded-xl p-6 h-[400px] flex flex-col">
            
            {/* Y Axis Labels */}
            <div className="absolute left-4 top-6 bottom-10 flex flex-col justify-between text-[10px] text-[#8B91B5] font-mono">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* SVG Canvas */}
            <div className="flex-1 ml-8 relative border-l border-b border-[#2A2F45]/50">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-[1px] bg-[#2A2F45]/30" />
                ))}
              </div>

              <svg 
                viewBox={`0 0 ${chartW} ${chartH}`} 
                className="absolute inset-0 w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="learnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Area Fill */}
                <path d={areaPath} fill="url(#learnGrad)" className="transition-all duration-75" />
                
                {/* Line */}
                <path d={linePath} fill="none" className="stroke-[#22D3EE] transition-all duration-75" strokeWidth={3} />
                
                {/* Leading Dot */}
                <circle 
                  cx={dotX || 0} cy={dotY || chartH} r={6} 
                  className="fill-[#0D0F14] stroke-[#22D3EE] stroke-[3] transition-all duration-75" 
                />
                
                {/* Pulse around dot */}
                <circle 
                  cx={dotX || 0} cy={dotY || chartH} r={12} 
                  className="fill-[#22D3EE]/30 animate-pulse transition-all duration-75" 
                />
              </svg>
            </div>

            {/* X Axis Labels */}
            <div className="ml-8 mt-2 flex justify-between text-[10px] text-[#8B91B5] font-mono">
              <span>0</span>
              <span>125</span>
              <span>250</span>
              <span>375</span>
              <span>500+</span>
            </div>
          </div>

          {/* Interactive Slider */}
          <div className="bg-[#1C2030]/50 border border-[#2A2F45] p-5 rounded-xl space-y-4">
            <div className="flex justify-between items-center text-xs text-[#8B91B5] font-bold uppercase tracking-wider">
              <span>Interactive Scrubber</span>
              <span>Simulate Timeline</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max={maxIngested} 
              value={ingestedCount}
              onChange={(e) => setIngestedCount(Number(e.target.value))}
              className="w-full h-2 bg-[#0D0F14] rounded-lg appearance-none cursor-pointer border border-[#2A2F45] accent-[#22D3EE]"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
