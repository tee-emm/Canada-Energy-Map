import React from 'react';
import { motion } from 'framer-motion';
import { Region } from '@/lib/story-data';
import { Button } from '@/components/ui/button';

interface TakeawayDisplayProps {
  region: Region;
  onContinue: () => void;
}

export function TakeawayDisplay({ region, onContinue }: TakeawayDisplayProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">&#10003;</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{region.name} — Complete</h2>
        <p className="text-sm text-slate-400 mt-2">Here are some things to take away from this story.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 sm:p-6"
      >
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Key Takeaways</h3>
        <div className="space-y-4">
          {region.takeaways.map((takeaway, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex gap-3"
            >
              <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary font-bold mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{takeaway.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/[0.03] border border-white/5 rounded-xl p-4 sm:p-5"
      >
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-3">Sources for this region</h3>
        <div className="space-y-1.5">
          {region.contextCards.map((card, i) => (
            <a
              key={i}
              href={card.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[11px] sm:text-xs text-slate-500 hover:text-primary transition-colors truncate"
            >
              {card.source} — {card.title} &#8599;
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-4 flex justify-center"
      >
        <Button
          data-testid="button-takeaway-continue"
          size="lg"
          onClick={onContinue}
          className="px-10"
        >
          Return to Map
        </Button>
      </motion.div>
    </div>
  );
}
