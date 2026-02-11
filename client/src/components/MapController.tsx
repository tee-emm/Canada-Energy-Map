import React from 'react';
import { Region, RegionId, STORIES } from '@/lib/story-data';
import { cn } from '@/lib/utils';
import { CanadaSVG } from './CanadaSVG';

interface MapControllerProps {
  onSelectRegion: (region: Region) => void;
  completedRegions: RegionId[];
}

export function MapController({ onSelectRegion, completedRegions }: MapControllerProps) {
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center">
       <div
         className="relative"
         style={{
           width: 'min(90vw, 90vh)',
           height: 'min(90vw, 90vh)',
         }}
       >
          <div className="absolute inset-0 z-0 opacity-90">
            <CanadaSVG className="w-full h-full" />
          </div>

          {Object.values(STORIES).map((region) => {
            const isCompleted = completedRegions.includes(region.id);
            
            return (
              <button
                key={region.id}
                data-testid={`button-region-${region.id}`}
                className="absolute z-10 group cursor-pointer"
                style={{
                  top: region.coordinates.top,
                  left: region.coordinates.left,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => onSelectRegion(region)}
              >
                <div className="relative flex flex-col items-center">
                   <div className="relative w-8 h-8">
                     <div className={cn(
                       "absolute inset-0 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                       isCompleted 
                         ? "bg-emerald-500 border-emerald-300 text-emerald-900" 
                         : "bg-slate-900/80 group-hover:bg-slate-700/90"
                     )}
                     style={{
                       color: isCompleted ? undefined : region.themeColor,
                       borderColor: isCompleted ? undefined : region.themeColor,
                       boxShadow: isCompleted
                         ? '0 0 12px rgba(16,185,129,0.6)'
                         : `0 0 20px ${region.themeColor}, 0 0 40px ${region.themeColor}50`,
                     }}
                     >
                       {isCompleted && <span className="text-xs font-bold">✓</span>}
                     </div>
                     
                     {!isCompleted && (
                       <span
                         className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                         style={{ backgroundColor: region.themeColor, opacity: 0.35 }}
                       />
                     )}
                   </div>

                   <span className="mt-2 text-xs font-bold uppercase tracking-widest text-white/90 bg-black/60 px-3 py-1 rounded backdrop-blur-sm whitespace-nowrap border border-white/10 group-hover:bg-black/80 group-hover:border-white/30 transition-colors">
                     {region.name}
                   </span>
                </div>
              </button>
            );
          })}
       </div>

       <div className="absolute inset-0 pointer-events-none z-[1]"
         style={{
           background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgb(2 6 23) 100%)',
         }}
       />
       
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm font-light z-20 text-center">
          <p data-testid="text-map-instructions">Select a glowing region to begin a chapter.</p>
       </div>
    </div>
  );
}
