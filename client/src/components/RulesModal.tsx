import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RulesModalProps {
  open: boolean;
  onClose: () => void;
}

export function RulesModal({ open, onClose }: RulesModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    closeRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-slate-900 border border-white/15 rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-slate-900/95 backdrop-blur border-b border-white/10">
              <h2 id="rules-title" className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <span className="text-accent">&#9889;</span> How to Play
              </h2>
              <button
                ref={closeRef}
                data-testid="button-close-rules"
                onClick={onClose}
                aria-label="Close rules"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
              >
                &#10005;
              </button>
            </div>

            <div className="px-5 py-5 space-y-6 text-sm text-slate-300 leading-relaxed">
              <section>
                <h3 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">1</span>
                  Choose a Region
                </h3>
                <p>
                  Start by tapping a glowing marker on the map. Each one represents a real
                  person dealing with energy poverty somewhere in Canada. Tap once to
                  preview their story, tap again to begin.
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">2</span>
                  Read Letters &amp; Respond
                </h3>
                <p>
                  Each character sends you letters describing their situation. After
                  reading, you'll pick a response — your tone and decisions shape the
                  story. Some responses cost money from the character's budget, others
                  are free.
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">3</span>
                  The Warmth Wallet
                </h3>
                <p>
                  After some letters, a <strong className="text-accent">Warmth Wallet</strong> decision
                  appears. This is a budget tradeoff — each character has limited money, and
                  you must decide how they spend it. Choices have real costs shown in
                  dollar amounts, and some options become unavailable if the budget runs low.
                </p>
                <div className="mt-2 bg-white/5 border border-white/10 rounded-lg p-3 text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400">$500</span>
                    <span className="text-slate-400">— Lusa (Iqaluit)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400">$900</span>
                    <span className="text-slate-400">— Mary (Saskatchewan)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400">$1300</span>
                    <span className="text-slate-400">— Vihaan (Toronto)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400">$600</span>
                    <span className="text-slate-400">— Levi (Halifax)</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">4</span>
                  Impact Meter
                </h3>
                <p>
                  Every choice nudges four scores that track the consequences of your
                  decisions:
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/5 rounded-lg px-3 py-2 flex items-center gap-2">
                    <span>&#128293;</span> <strong className="text-white">Warmth</strong> — physical comfort &amp; heating
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 flex items-center gap-2">
                    <span>&#9889;</span> <strong className="text-white">Reliability</strong> — power stability
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 flex items-center gap-2">
                    <span>&#128176;</span> <strong className="text-white">Affordability</strong> — financial security
                  </div>
                  <div className="bg-white/5 rounded-lg px-3 py-2 flex items-center gap-2">
                    <span>&#128483;&#65039;</span> <strong className="text-white">Agency</strong> — autonomy &amp; voice
                  </div>
                </div>
                <p className="mt-2 text-slate-400 text-xs">
                  Scores range from -5 to +5. The bars in the header show your
                  cumulative balance across all regions.
                </p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">5</span>
                  Complete All Regions
                </h3>
                <p>
                  Finish all four characters' stories to unlock your final
                  Impact Profile and Passport — a summary of every choice you
                  made and how it affected each community.
                </p>
              </section>

              <div className="border-t border-white/10 pt-4 text-center text-xs text-slate-500">
                There are no wrong answers — only difficult tradeoffs.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
