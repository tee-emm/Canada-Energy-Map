import React from 'react';
import { motion } from 'framer-motion';
import { Region, RegionId, STORIES } from '@/lib/story-data';
import { cn } from '@/lib/utils';
import { CanadaSVG } from './CanadaSVG';

interface MapControllerProps {
  onSelectRegion: (region: Region) => void;
  completedRegions: RegionId[];
}

const MARKER_POSITIONS: Record<RegionId, { top: string; left: string }> = {
  north: { top: '30%', left: '25%' },
  rural: { top: '62%', left: '43%' },
  city: { top: '68%', left: '58%' },
  medical: { top: '78%', left: '76%' },
};

export function MapController({ onSelectRegion, completedRegions }: MapControllerProps) {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
       <div
         className="absolute"
         style={{
           width: '130vw',
           height: '130vw',
           left: '50%',
           top: '50%',
           transform: 'translate(-50%, -62%)',
         }}
       >
          <div className="absolute inset-0 z-0 opacity-90">
            <CanadaSVG className="w-full h-full" />
          </div>
       </div>

       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none z-[1]" />

       {Object.values(STORIES).map((region) => {
         const isCompleted = completedRegions.includes(region.id);
         const pos = MARKER_POSITIONS[region.id];
         
         return (
           <motion.button
             key={region.id}
             data-testid={`button-region-${region.id}`}
             className="absolute z-10"
             style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
             onClick={() => onSelectRegion(region)}
             whileHover={{ scale: 1.15 }}
             whileTap={{ scale: 0.95 }}
           >
             <div className="relative flex flex-col items-center">
                <div className="relative">
                  <div className={cn(
                    "relative z-10 w-7 h-7 rounded-full border-2 transition-all duration-500 flex items-center justify-center",
                    isCompleted 
                      ? "bg-emerald-500 border-emerald-300 text-emerald-900" 
                      : "bg-slate-900/80 hover:bg-slate-800"
                  )}
                  style={{
                    color: isCompleted ? undefined : region.themeColor,
                    borderColor: isCompleted ? undefined : region.themeColor,
                    boxShadow: isCompleted ? undefined : `0 0 20px ${region.themeColor}, 0 0 40px ${region.themeColor}40`,
                  }}
                  >
                    {isCompleted && <span className="text-xs font-bold">✓</span>}
                  </div>
                  
                  {!isCompleted && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: region.themeColor, opacity: 0.4 }}
                    />
                  )}
                </div>

                <span className="mt-2 text-xs font-bold uppercase tracking-widest text-white/90 bg-black/60 px-3 py-1 rounded backdrop-blur-sm whitespace-nowrap border border-white/10">
                  {region.name}
                </span>
             </div>
           </motion.button>
         );
       })}
       
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm font-light z-20 text-center">
          <p data-testid="text-map-instructions">Select a glowing region to begin a chapter.</p>
       </div>
    </div>
  );
}
