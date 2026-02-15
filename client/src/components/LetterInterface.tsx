import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Letter, Choice } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { WarmthWallet } from './WarmthWallet';

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
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-4 py-2 mb-4 flex items-center gap-3">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-mono shrink-0">Budget</span>
        <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", budgetPercent > 30 ? "bg-emerald-500" : budgetPercent > 10 ? "bg-amber-500" : "bg-red-500")}
            initial={false}
            animate={{ width: `${budgetPercent}%` }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          />
        </div>
        <span data-testid="text-budget" className={cn("text-sm font-mono font-bold tabular-nums", budgetPercent > 30 ? "text-emerald-400" : budgetPercent > 10 ? "text-amber-400" : "text-red-400")}>
          ${budget}
        </span>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-xs text-slate-500 font-mono shrink-0">{regionName}</span>
        <span className="text-xs text-slate-500">{letter.day}</span>
      </div>

      <motion.div 
        key={letter.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#faf8f4] text-slate-800 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden"
      >
        <div className="px-5 py-4 sm:px-8 sm:py-6 md:px-10 md:py-8">
          <div className="text-xs font-sans uppercase tracking-widest text-slate-400 mb-4">Incoming Transmission</div>
          
          <div className="font-serif text-base sm:text-lg leading-relaxed space-y-3 letter-content">
            <div dangerouslySetInnerHTML={{ __html: letter.content }} />
          </div>
           
          <div className="mt-6 font-hand text-xl sm:text-2xl text-slate-500">
            — {letter.sender}
          </div>
        </div>

        <AnimatePresence>
          {phase === 'wallet' && letter.walletEvent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="overflow-hidden"
            >
              <div className="px-5 py-4 sm:px-8 sm:py-5 md:px-10 md:py-5">
                <WarmthWallet event={letter.walletEvent} onSelect={handleWallet} budget={budget} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-slate-200 px-5 py-4 sm:px-8 sm:py-6 md:px-10 md:py-6 bg-[#f5f3ee]">
          <AnimatePresence mode="wait">
            {phase === 'reading' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                <p className="text-xs text-slate-500 font-sans uppercase tracking-wide mb-3">How do you respond?</p>
                <div className="grid gap-2.5">
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
                          "text-left px-4 py-3 border rounded-lg font-serif italic transition-all text-sm sm:text-base",
                          canAfford
                            ? "bg-white border-slate-200 hover:border-slate-400 hover:shadow-md text-slate-700 cursor-pointer"
                            : "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="leading-snug">"{choice.text}"</span>
                          {cost > 0 && (
                            <span className={cn(
                              "shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded not-italic",
                              canAfford ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"
                            )}>
                              -${cost}
                            </span>
                          )}
                          {cost === 0 && (
                            <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded not-italic bg-emerald-50 text-emerald-600">
                              Free
                            </span>
                          )}
                        </div>
                        {!canAfford && (
                          <div className="text-xs font-sans not-italic mt-1 text-red-500">
                            Can't afford (need ${cost})
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {phase === 'wallet' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-2 py-3"
              >
                <p className="text-xs text-slate-500 font-sans uppercase tracking-wide">Make your budget decision above</p>
              </motion.div>
            )}

            {phase === 'done' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center gap-3 py-4"
              >
                 <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl">
                   {selectedNextId ? '\u2192' : '\u2713'}
                 </div>
                 <p className="font-serif italic text-slate-500 text-sm">
                   {selectedNextId ? 'Waiting for reply...' : 'Chapter Complete'}
                 </p>
                 <Button data-testid="button-continue" onClick={() => onComplete(selectedNextId)} className="w-full max-w-xs">
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
