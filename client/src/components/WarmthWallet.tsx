import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Letter } from '@/lib/story-data';

interface WarmthWalletProps {
  event: NonNullable<Letter['walletEvent']>;
  onSelect: (option: any) => void;
  budget: number;
}

export function WarmthWallet({ event, onSelect, budget }: WarmthWalletProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scaleY: 0.95 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ transformOrigin: 'bottom center' }}
      className="p-4 sm:p-5 bg-slate-900 border-b-4 border-accent rounded-lg"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-mono text-accent text-xs uppercase tracking-widest">Warmth Wallet</h3>
        <span data-testid="text-wallet-budget" className="font-mono text-xs font-bold text-white bg-white/10 px-2.5 py-1 rounded">
          Budget: ${budget}
        </span>
      </div>
      <p className="text-sm sm:text-base font-serif italic mb-4 text-white/90 leading-relaxed">"{event.prompt}"</p>
      
      <div className="grid grid-cols-1 gap-3">
        {event.options.map((option) => {
          const cost = option.cost || 0;
          const canAfford = budget >= cost;

          return (
            <button
              key={option.id}
              data-testid={`button-wallet-${option.id}`}
              onClick={() => canAfford && onSelect(option)}
              disabled={!canAfford}
              className={cn(
                "group flex flex-col items-start p-3 sm:p-4 border transition-all rounded-lg text-left",
                canAfford
                  ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-accent/50 cursor-pointer"
                  : "bg-white/[0.02] border-white/5 cursor-not-allowed opacity-50"
              )}
            >
              <div className="flex items-start justify-between gap-2 w-full">
                <span className={cn("font-medium text-sm leading-snug transition-colors", canAfford && "group-hover:text-accent")}>
                  {option.label}
                </span>
                <span className={cn(
                  "shrink-0 text-xs font-mono px-2 py-0.5 rounded",
                  cost > 0
                    ? canAfford ? "text-red-400 bg-red-950/30" : "text-red-500 bg-red-950/50"
                    : "text-green-400 bg-green-950/30"
                )}>
                  {option.costLabel}
                </span>
              </div>
              
              <div className="flex gap-1.5 mt-2">
                {Object.entries(option.impact).map(([key, val]) => (
                  <span key={key} className={cn("text-[10px] px-1.5 py-0.5 rounded bg-white/5", val && val > 0 ? "text-green-400" : "text-red-400")}>
                    {val && val > 0 ? '+' : ''}{val} {key.slice(0,3)}
                  </span>
                ))}
              </div>

              {!canAfford && (
                <span className="text-[10px] font-mono text-red-400 mt-1">Can't afford</span>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
