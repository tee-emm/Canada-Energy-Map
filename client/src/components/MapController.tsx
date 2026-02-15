import React, { useState } from 'react';
import { Region, RegionId, STORIES } from '@/lib/story-data';
import { cn } from '@/lib/utils';
import { CanadaSVG } from './CanadaSVG';

interface MapControllerProps {
  onSelectRegion: (region: Region) => void;
  completedRegions: RegionId[];
}

interface Persona {
  name: string;
  age: string;
  avatar: string;
  location: string;
  challenge: string;
  quote: string;
}

const PERSONAS: Record<RegionId, Persona> = {
  north: {
    name: 'Lusa',
    age: '16\u201319',
    avatar: '\uD83D\uDCDA',
    location: 'Iqaluit, Nunavut',
    challenge: 'Finishing school while rationing one hour of power a day in a remote community',
    quote: 'If you only had one hour of power a day, what would you choose to protect?',
  },
  city: {
    name: 'Vihaan',
    age: '22\u201335',
    avatar: '\uD83C\uDFE2',
    location: 'Toronto, Ontario',
    challenge: 'Keeping his mom\u2019s medical device running through building outages and rising arrears',
    quote: 'It only takes one bad night for things to turn south, y\u2019know?',
  },
  rural: {
    name: 'Mary',
    age: '70\u201385',
    avatar: '\uD83C\uDFE0',
    location: 'Rural Saskatchewan',
    challenge: 'Choosing between heat and groceries as bills spike in an aging home',
    quote: 'If you were me, would you keep the heat going or buy groceries?',
  },
  medical: {
    name: 'Levi',
    age: '28\u201340',
    avatar: '\uD83D\uDC68\u200D\uD83D\uDC66',
    location: 'Halifax, Nova Scotia',
    challenge: 'Keeping his son cool and safe during heat waves in a suburban basement unit with no AC',
    quote: 'I want to be a responsible parent, and I don\u2019t want Carter\u2019s teachers to think I\u2019m neglecting him.',
  },
};

export function MapController({ onSelectRegion, completedRegions }: MapControllerProps) {
  const [activeRegion, setActiveRegion] = useState<RegionId | null>(null);

  const handleRegionClick = (region: Region) => {
    if (activeRegion === region.id) {
      onSelectRegion(region);
    } else {
      setActiveRegion(region.id);
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden flex items-center justify-center" onClick={(e) => {
      if ((e.target as HTMLElement).closest('[data-region-marker]')) return;
      setActiveRegion(null);
    }}>
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
            const persona = PERSONAS[region.id];
            const isActive = activeRegion === region.id;
            
            return (
              <div
                key={region.id}
                className="absolute z-10"
                data-region-marker
                style={{
                  top: region.coordinates.top,
                  left: region.coordinates.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  data-testid={`button-region-${region.id}`}
                  className="group cursor-pointer relative"
                  onClick={(e) => { e.stopPropagation(); handleRegionClick(region); }}
                  onMouseEnter={() => setActiveRegion(region.id)}
                  onMouseLeave={() => setActiveRegion(null)}
                >
                  <div className="relative flex flex-col items-center">
                     <div className="relative w-7 h-7 sm:w-8 sm:h-8">
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
                           : `0 0 15px ${region.themeColor}, 0 0 30px ${region.themeColor}50`,
                       }}
                       >
                         {isCompleted && <span className="text-xs font-bold">{'\u2713'}</span>}
                       </div>
                       
                       {!isCompleted && (
                         <span
                           className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                           style={{ backgroundColor: region.themeColor, opacity: 0.35 }}
                         />
                       )}
                     </div>

                     <span className="mt-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/90 bg-black/60 px-2 py-0.5 sm:px-3 sm:py-1 rounded backdrop-blur-sm whitespace-nowrap border border-white/10 group-hover:bg-black/80 group-hover:border-white/30 transition-colors">
                       {region.name}
                     </span>
                  </div>
                </button>

                <div
                  className={cn(
                    "absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-60 sm:w-72 pointer-events-none transition-all duration-300 origin-bottom",
                    isActive ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
                  )}
                  style={{ zIndex: 50 }}
                >
                  <div
                    className="rounded-xl border border-white/15 p-4 sm:p-5 backdrop-blur-xl shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.92))',
                      boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${region.themeColor}20`,
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg sm:text-xl border-2 shrink-0"
                        style={{ borderColor: region.themeColor, backgroundColor: `${region.themeColor}15` }}
                      >
                        {persona.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm truncate" data-testid={`text-persona-name-${region.id}`}>
                          {persona.name}, {persona.age}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">{persona.location}</div>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed mb-2.5">
                      {persona.challenge}
                    </p>

                    <div className="flex items-center gap-2 mb-2.5 bg-white/5 rounded-lg px-2.5 py-1.5">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500">Budget</span>
                      <span className="font-mono text-sm font-bold text-emerald-400">${region.budget}</span>
                    </div>

                    <div className="border-t border-white/10 pt-2.5">
                      <p className="text-[11px] sm:text-xs italic text-slate-400 font-serif leading-relaxed">
                        "{persona.quote}"
                      </p>
                    </div>

                    <div className="mt-2.5 text-[10px] uppercase tracking-widest font-bold text-center" style={{ color: region.themeColor }}>
                      {isCompleted ? '\u2713 Completed' : 'Click to begin'}
                    </div>
                  </div>

                  <div
                    className="w-3 h-3 rotate-45 mx-auto -mt-1.5 border-r border-b border-white/15"
                    style={{ background: 'rgba(30,41,59,0.92)' }}
                  />
                </div>
              </div>
            );
          })}
       </div>

       <div className="absolute inset-0 pointer-events-none z-[1]"
         style={{
           background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgb(2 6 23) 100%)',
         }}
       />
       
       <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs sm:text-sm font-light z-20 text-center px-4">
          <p data-testid="text-map-instructions">Tap a region to meet someone. Tap again to begin their story.</p>
       </div>
    </div>
  );
}
