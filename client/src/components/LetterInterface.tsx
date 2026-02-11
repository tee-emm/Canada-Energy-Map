import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Letter, Choice } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WarmthWallet } from './WarmthWallet';
import paperTexture from '../assets/paper-texture.png';

interface LetterInterfaceProps {
  letter: Letter;
  onChoice: (choice: Choice) => void;
  onWalletDecision: (option: any) => void;
  onComplete: () => void;
  regionName: string;
}

export function LetterInterface({ letter, onChoice, onWalletDecision, onComplete, regionName }: LetterInterfaceProps) {
  const [phase, setPhase] = useState<'reading' | 'choices' | 'wallet' | 'done'>('reading');

  const handleChoice = (c: Choice) => {
    onChoice(c);
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

  return (
    <div className="relative w-full max-w-2xl mx-auto h-full flex flex-col justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative bg-[#f7f5f0] text-slate-800 p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.5)] min-h-[60vh] flex flex-col"
        style={{ 
          backgroundImage: `url(${paperTexture})`,
          backgroundSize: 'cover'
        }}
      >
        {/* Stamp */}
        <div className="absolute top-8 right-8 w-24 h-24 border-4 border-slate-300/50 rounded-full flex items-center justify-center rotate-12 opacity-60 pointer-events-none">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-widest text-slate-400">Postmark</div>
            <div className="text-sm font-bold text-slate-500">{regionName}</div>
            <div className="text-xs text-slate-400">{letter.day}</div>
          </div>
        </div>

        {/* Content */}
        <div className="font-serif text-lg leading-relaxed space-y-4 max-w-prose relative z-10">
           <div className="text-sm font-sans uppercase tracking-widest text-slate-400 mb-6">Incoming Transmission</div>
           
           <div dangerouslySetInnerHTML={{ __html: letter.content }} />
           
           <div className="mt-8 font-hand text-2xl text-slate-600">
             - {letter.sender}
           </div>
        </div>

        {/* Interaction Area */}
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
                  {letter.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="text-left px-6 py-4 bg-white border-2 border-slate-100 hover:border-slate-400 hover:shadow-lg transition-all rounded-lg font-serif text-slate-700 italic"
                    >
                      "{choice.text}"
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'wallet' && letter.walletEvent && (
              <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/4 md:translate-y-12 z-20">
                 <WarmthWallet event={letter.walletEvent} onSelect={handleWallet} />
              </div>
            )}

            {phase === 'done' && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-8"
              >
                 <div className="w-16 h-16 bg-slate-800 text-white rounded-full flex items-center justify-center text-2xl mb-2">
                   ✓
                 </div>
                 <p className="font-serif italic text-slate-600">Response Sent</p>
                 <Button onClick={onComplete} className="w-full max-w-xs">Return to Map</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
