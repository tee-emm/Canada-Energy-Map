import React from 'react';
import { motion } from 'framer-motion';
import { Region, RegionId, STORIES } from '@/lib/story-data';
import { cn } from '@/lib/utils';
import { CanadaSVG } from './CanadaSVG';

interface MapControllerProps {
  onSelectRegion: (region: Region) => void;
  completedRegions: RegionId[];
}

export function MapController({ onSelectRegion, completedRegions }: MapControllerProps) {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-slate-950 overflow-hidden flex items-center justify-center">
       <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90">
          <CanadaSVG className="w-[90%] h-[90%] max-w-[1200px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
       </div>

       {Object.values(STORIES).map((region) => {
         const isCompleted = completedRegions.includes(region.id);
         
         return (
           <motion.button
             key={region.id}
             className="absolute group z-10"
             style={{ top: region.coordinates.top, left: region.coordinates.left }}
             onClick={() => onSelectRegion(region)}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.95 }}
           >
             <div className="relative flex flex-col items-center">
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all duration-500 flex items-center justify-center shadow-[0_0_15px_currentColor]",
                  isCompleted 
                    ? "bg-emerald-500 border-emerald-300 text-emerald-900" 
                    : "bg-slate-900/80 border-white/50 text-transparent hover:border-white hover:bg-slate-800"
                )}
                style={{ color: isCompleted ? undefined : region.themeColor, borderColor: isCompleted ? undefined : region.themeColor }}
                >
                  {isCompleted && <span className="text-xs">✓</span>}
                </div>
                
                {!isCompleted && (
                  <div 
                    className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: region.themeColor }} 
                  />
                )}

                <span className="mt-2 text-xs font-bold uppercase tracking-widest text-white/80 bg-black/50 px-2 py-1 rounded backdrop-blur-sm group-hover:text-white transition-colors border border-transparent group-hover:border-white/20">
                  {region.name}
                </span>
             </div>
           </motion.button>
         );
       })}
       
       <div className="absolute bottom-8 left-8 max-w-sm text-white/60 text-sm font-light">
          <p>Select a glowing region to begin a chapter.</p>
       </div>
    </div>
  );
}
