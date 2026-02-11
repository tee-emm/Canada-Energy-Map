import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Letter } from '@/lib/story-data';

interface WarmthWalletProps {
  event: NonNullable<Letter['walletEvent']>;
  onSelect: (option: any) => void;
}

export function WarmthWallet({ event, onSelect }: WarmthWalletProps) {
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
        <h3 className="font-mono text-accent text-sm uppercase tracking-widest mb-2">Warmth Wallet™</h3>
        <p className="text-lg font-serif italic mb-6 text-white/90">"{event.prompt}"</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {event.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className="group relative flex flex-col items-start p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all rounded text-left"
            >
              <span className="font-bold text-base mb-1 group-hover:text-accent transition-colors">{option.label}</span>
              <span className="text-xs font-mono text-red-400 bg-red-950/30 px-2 py-1 rounded">{option.costLabel}</span>
              
              <div className="absolute bottom-2 right-2 flex gap-1">
                 {Object.entries(option.impact).map(([key, val]) => (
                   <span key={key} className={cn("text-[10px] px-1 rounded", val && val > 0 ? "text-green-400" : "text-red-400")}>
                     {val && val > 0 ? '+' : ''}{val} {key.slice(0,1).toUpperCase()}
                   </span>
                 ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
