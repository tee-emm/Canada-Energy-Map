import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Letter, Choice } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { WarmthWallet } from './WarmthWallet';
import paperTexture from '../assets/paper-texture.png';

interface LetterInterfaceProps {
  letter: Letter;
  onChoice: (choice: Choice) => void;
  onWalletDecision: (option: any) => void;
  onComplete: (nextId?: string) => void;
  regionName: string;
  budget: number;
  startingBudget: number;
}

export function LetterInterface({ letter, onChoice, onWalletDecision, onComplete, regionName, budget, startingBudget }: LetterInterfaceProps) {
  const [phase, setPhase] = useState<'reading' | 'choices' | 'wallet' | 'done'>('reading');
  const [selectedNextId, setSelectedNextId] = useState<string | undefined>(undefined);

  const handleChoice = (c: Choice) => {
    onChoice(c);
    setSelectedNextId(c.nextId);
    
    if (letter.walletEvent) {
      setPhase('wallet');
    } else {
      setPhase('done');
    }
  };

  const handleWallet = (opt: any) => {
    onWalletDecision(opt);
    setPhase('done');
  };

  const budgetPercent = startingBudget > 0 ? Math.max(0, Math.min(100, (budget / startingBudget) * 100)) : 0;

  return (
    <div className="relative w-full max-w-2xl mx-auto h-full flex flex-col justify-center p-4 md:p-8">
      <motion.div 
        key={letter.id}
        initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative bg-[#f7f5f0] text-slate-800 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)] min-h-[60vh] flex flex-col"
        style={{ 
          backgroundImage: `url(${paperTexture})`,
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute top-8 right-8 w-24 h-24 border-4 border-slate-300/50 rounded-full flex items-center justify-center rotate-12 opacity-60 pointer-events-none">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-widest text-slate-400">Postmark</div>
            <div className="text-sm font-bold text-slate-500">{regionName}</div>
            <div className="text-xs text-slate-400">{letter.day}</div>
          </div>
        </div>

        <div className="absolute top-4 left-4 right-28 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono shrink-0">Budget</span>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className={cn("h-full rounded-full", budgetPercent > 30 ? "bg-emerald-500" : budgetPercent > 10 ? "bg-amber-500" : "bg-red-500")}
                initial={false}
                animate={{ width: `${budgetPercent}%` }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              />
            </div>
            <span data-testid="text-budget" className={cn("text-sm font-mono font-bold tabular-nums", budgetPercent > 30 ? "text-emerald-700" : budgetPercent > 10 ? "text-amber-700" : "text-red-700")}>
              ${budget}
            </span>
          </div>
        </div>

        <div className="font-serif text-lg leading-relaxed space-y-4 max-w-prose relative z-10 mt-6">
           <div className="text-sm font-sans uppercase tracking-widest text-slate-400 mb-6">Incoming Transmission</div>
           
           <div dangerouslySetInnerHTML={{ __html: letter.content }} />
           
           <div className="mt-8 font-hand text-2xl text-slate-600">
             - {letter.sender}
           </div>
        </div>

        <div className="mt-auto pt-8 border-t border-slate-200">
          <AnimatePresence mode="wait">
            {phase === 'reading' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-sm text-slate-500 font-sans uppercase tracking-wide mb-4">How do you respond?</p>
                <div className="grid gap-3">
                  {letter.choices.map((choice) => {
                    const cost = choice.cost || 0;
                    const canAfford = budget >= cost;
                    
                    return (
                      <button
                        key={choice.id}
                        data-testid={`button-choice-${choice.id}`}
                        onClick={() => canAfford && handleChoice(choice)}
                        disabled={!canAfford}
                        className={cn(
                          "text-left px-6 py-4 border-2 rounded-lg font-serif italic transition-all relative",
                          canAfford
                            ? "bg-white border-slate-100 hover:border-slate-400 hover:shadow-lg text-slate-700 cursor-pointer"
                            : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span>"{choice.text}"</span>
                          {cost > 0 && (
                            <span className={cn(
                              "shrink-0 text-xs font-mono font-bold px-2 py-1 rounded not-italic",
                              canAfford ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"
                            )}>
                              -${cost}
                            </span>
                          )}
                          {cost === 0 && (
                            <span className="shrink-0 text-xs font-mono px-2 py-1 rounded not-italic bg-emerald-50 text-emerald-600">
                              Free
                            </span>
                          )}
                        </div>
                        {!canAfford && (
                          <div className="text-xs font-sans not-italic mt-2 text-red-500">
                            Can't afford (need ${cost})
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {phase === 'wallet' && letter.walletEvent && (
              <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/4 md:translate-y-12 z-20">
                 <WarmthWallet event={letter.walletEvent} onSelect={handleWallet} budget={budget} />
              </div>
            )}

            {phase === 'done' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-8"
              >
                 <div className="w-16 h-16 bg-slate-800 text-white rounded-full flex items-center justify-center text-2xl mb-2">
                   {selectedNextId ? '\u2192' : '\u2713'}
                 </div>
                 <p className="font-serif italic text-slate-600">
                   {selectedNextId ? 'Waiting for reply...' : 'Chapter Complete'}
                 </p>
                 <Button onClick={() => onComplete(selectedNextId)} className="w-full max-w-xs">
                   {selectedNextId ? 'Continue' : 'Return to Map'}
                 </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
