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
    name: 'Jamie',
    age: '17',
    avatar: '🧑‍🎓',
    location: 'Yukon Territory',
    challenge: 'Surviving rolling blackouts and diesel dependency in a remote northern community',
    quote: 'Do you guys down south actually get 24/7 power? Sounds fake.',
  },
  city: {
    name: 'Elena',
    age: '34',
    avatar: '👩‍💼',
    location: 'Toronto, Ontario',
    challenge: 'Choosing between heating and eating in a crumbling high-rise apartment',
    quote: 'The thermostat says 22° but it feels like a lie.',
  },
  rural: {
    name: 'Walter',
    age: '68',
    avatar: '👨‍🌾',
    location: 'Rural Saskatchewan',
    challenge: 'Keeping a family farm alive when energy costs devour every harvest',
    quote: 'The grain dryer costs more to run than the crop is worth.',
  },
  medical: {
    name: 'Sarah',
    age: '41',
    avatar: '👩‍⚕️',
    location: 'Atlantic Canada',
    challenge: 'Protecting a medically fragile child when the power grid fails',
    quote: "My son's ventilator has a 4-hour battery. After that, I'm on my own.",
  },
};

export function MapController({ onSelectRegion, completedRegions }: MapControllerProps) {
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);

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
            const persona = PERSONAS[region.id];
            const isHovered = hoveredRegion === region.id;
            
            return (
              <div
                key={region.id}
                className="absolute z-10"
                style={{
                  top: region.coordinates.top,
                  left: region.coordinates.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  data-testid={`button-region-${region.id}`}
                  className="group cursor-pointer relative"
                  onClick={() => onSelectRegion(region)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
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

                <div
                  className={cn(
                    "absolute left-1/2 bottom-full mb-4 -translate-x-1/2 w-72 pointer-events-none transition-all duration-300 origin-bottom",
                    isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
                  )}
                  style={{ zIndex: 50 }}
                >
                  <div
                    className="rounded-xl border border-white/15 p-5 backdrop-blur-xl shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.92))',
                      boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${region.themeColor}20`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-xl border-2"
                        style={{ borderColor: region.themeColor, backgroundColor: `${region.themeColor}15` }}
                      >
                        {persona.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm" data-testid={`text-persona-name-${region.id}`}>
                          {persona.name}, {persona.age}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{persona.location}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {persona.challenge}
                    </p>

                    <div className="flex items-center gap-2 mb-3 bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-[10px] uppercase tracking-widest text-slate-500">Budget</span>
                      <span className="font-mono text-sm font-bold text-emerald-400">${region.budget}</span>
                    </div>

                    <div className="border-t border-white/10 pt-3">
                      <p className="text-xs italic text-slate-400 font-serif leading-relaxed">
                        "{persona.quote}"
                      </p>
                    </div>

                    <div className="mt-3 text-[10px] uppercase tracking-widest font-bold text-center" style={{ color: region.themeColor }}>
                      {isCompleted ? '✓ Completed' : 'Click to begin'}
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
       
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm font-light z-20 text-center">
          <p data-testid="text-map-instructions">Hover over a region to meet someone. Click to begin their story.</p>
       </div>
    </div>
  );
}
