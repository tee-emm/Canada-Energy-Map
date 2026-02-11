import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImpactMeterProps {
  stats: {
    warmth: number;
    reliability: number;
    affordability: number;
    agency: number;
  };
  className?: string;
  compact?: boolean;
}

export function ImpactMeter({ stats, className, compact }: ImpactMeterProps) {
  const categories = [
    { key: 'warmth', label: 'Warmth', color: 'bg-[var(--color-chart-2)]', icon: '🔥' },
    { key: 'reliability', label: 'Reliability', color: 'bg-[var(--color-chart-1)]', icon: '⚡' },
    { key: 'affordability', label: 'Affordability', color: 'bg-[var(--color-chart-3)]', icon: '💰' },
    { key: 'agency', label: 'Agency', color: 'bg-[var(--color-chart-4)]', icon: '🗣️' },
  ] as const;

  return (
    <div className={cn("bg-card/90 backdrop-blur border border-white/10 p-4 rounded-xl", className)}>
      {!compact && <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Impact Meter</h3>}
      
      <div className={cn("grid gap-4", compact ? "grid-cols-4" : "grid-cols-1")}>
        {categories.map((cat) => {
          // Normalize -5 to +5 range to 0-100%
          const value = stats[cat.key as keyof typeof stats];
          const percentage = Math.min(100, Math.max(0, ((value + 5) / 10) * 100));
          
          return (
            <div key={cat.key} className="flex flex-col gap-1">
              {!compact && (
                <div className="flex justify-between text-xs font-medium">
                  <span className="flex items-center gap-2 opacity-80">{cat.icon} {cat.label}</span>
                  <span>{value > 0 ? '+' : ''}{value}</span>
                </div>
              )}
              
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden relative group">
                 {compact && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                         <span className="text-[8px] text-white">{cat.label}</span>
                    </div>
                 )}
                <motion.div 
                  className={cn("h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]", cat.color)}
                  initial={{ width: '50%' }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 15 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
