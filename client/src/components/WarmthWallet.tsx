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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-slate-900/95 border-t-4 border-accent rounded-sm shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-mono text-accent text-sm uppercase tracking-widest">Warmth Wallet</h3>
          <span data-testid="text-wallet-budget" className="font-mono text-sm font-bold text-white bg-white/10 px-3 py-1 rounded">
            Budget: ${budget}
          </span>
        </div>
        <p className="text-lg font-serif italic mb-6 text-white/90">"{event.prompt}"</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  "group relative flex flex-col items-start p-4 border transition-all rounded text-left",
                  canAfford
                    ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-accent/50 cursor-pointer"
                    : "bg-white/[0.02] border-white/5 cursor-not-allowed opacity-50"
                )}
              >
                <span className={cn("font-bold text-base mb-1 transition-colors", canAfford && "group-hover:text-accent")}>{option.label}</span>
                <span className={cn(
                  "text-xs font-mono px-2 py-1 rounded",
                  cost > 0
                    ? canAfford ? "text-red-400 bg-red-950/30" : "text-red-500 bg-red-950/50"
                    : "text-green-400 bg-green-950/30"
                )}>
                  {option.costLabel}
                </span>
                
                {!canAfford && (
                  <span className="text-[10px] font-mono text-red-400 mt-2">Can't afford</span>
                )}

                <div className="absolute bottom-2 right-2 flex gap-1">
                   {Object.entries(option.impact).map(([key, val]) => (
                     <span key={key} className={cn("text-[10px] px-1 rounded", val && val > 0 ? "text-green-400" : "text-red-400")}>
                       {val && val > 0 ? '+' : ''}{val} {key.slice(0,1).toUpperCase()}
                     </span>
                   ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
