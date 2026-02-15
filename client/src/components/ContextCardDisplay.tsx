import React from 'react';
import { motion } from 'framer-motion';
import { Region } from '@/lib/story-data';
import { Button } from '@/components/ui/button';

interface ContextCardDisplayProps {
  region: Region;
  onContinue: () => void;
}

export function ContextCardDisplay({ region, onContinue }: ContextCardDisplayProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Before you begin</p>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{region.name} Region</h2>
        <p className="text-sm text-slate-400 mt-2">Here's some context about the energy challenges in this area.</p>
      </motion.div>

      {region.contextCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 sm:p-6"
        >
          <h3 className="font-serif font-bold text-white text-base sm:text-lg mb-2">{card.title}</h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{card.text}</p>
          <a
            href={card.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[11px] font-mono text-slate-500 hover:text-primary transition-colors"
          >
            Source: {card.source} &#8599;
          </a>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-4 flex justify-center"
      >
        <Button
          data-testid="button-context-continue"
          size="lg"
          onClick={onContinue}
          className="px-10"
        >
          Begin Reading
        </Button>
      </motion.div>
    </div>
  );
}
