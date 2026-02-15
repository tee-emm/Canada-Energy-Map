import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapController } from '@/components/MapController';
import { LetterInterface } from '@/components/LetterInterface';
import { ImpactMeter } from '@/components/ImpactMeter';
import { Region, STORIES, RegionId } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import { CanadaSVG } from '@/components/CanadaSVG';

const initialBudgets: Record<RegionId, number> = {
  north: STORIES.north.budget,
  city: STORIES.city.budget,
  rural: STORIES.rural.budget,
  medical: STORIES.medical.budget,
};

export default function Home() {
  const [view, setView] = useState<'intro' | 'map' | 'letter' | 'summary'>('intro');
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [currentLetterId, setCurrentLetterId] = useState<string | null>(null);
  const [completedRegions, setCompletedRegions] = useState<RegionId[]>([]);
  const [budgets, setBudgets] = useState<Record<RegionId, number>>(initialBudgets);
  
  const [stats, setStats] = useState({
    warmth: 0,
    reliability: 0,
    affordability: 0,
    agency: 0
  });

  const handleSelectRegion = (region: Region) => {
    setCurrentRegion(region);
    setCurrentLetterId(region.letters[0].id);
    setView('letter');
  };

  const updateStats = (impact: Partial<typeof stats>) => {
    setStats(prev => ({
      warmth: prev.warmth + (impact.warmth || 0),
      reliability: prev.reliability + (impact.reliability || 0),
      affordability: prev.affordability + (impact.affordability || 0),
      agency: prev.agency + (impact.agency || 0),
    }));
  };

  const spendBudget = (cost: number) => {
    if (!currentRegion) return;
    setBudgets(prev => ({
      ...prev,
      [currentRegion.id]: Math.max(0, prev[currentRegion.id] - cost),
    }));
  };

  const handleLetterStepComplete = (nextId?: string) => {
    if (nextId) {
       setCurrentLetterId(nextId);
    } else {
       handleRegionComplete();
    }
  };

  const handleRegionComplete = () => {
    if (currentRegion) {
      const newCompleted = Array.from(new Set([...completedRegions, currentRegion.id]));
      setCompletedRegions(newCompleted);
      
      if (newCompleted.length === Object.keys(STORIES).length) {
        setView('summary');
      } else {
        setView('map');
      }
    }
    setCurrentRegion(null);
    setCurrentLetterId(null);
  };

  const getCurrentLetter = () => {
    if (!currentRegion || !currentLetterId) return null;
    return currentRegion.letters.find(l => l.id === currentLetterId);
  };

  const currentLetter = getCurrentLetter();
  const currentBudget = currentRegion ? budgets[currentRegion.id] : 0;

  return (
    <div className="h-[100dvh] w-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
           <motion.div
             key="intro"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
             transition={{ duration: 1.2 }}
             className="relative w-full h-full flex items-center justify-center bg-slate-950 overflow-y-auto"
           >
              <div className="absolute inset-0 z-0 opacity-30 flex items-center justify-center">
                 <CanadaSVG className="w-[80%] h-[80%] max-w-[900px] blur-[2px]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
              </div>

              <div className="relative z-10 max-w-xl w-full text-center space-y-6 p-6 sm:p-8">
                 <motion.div
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.5, duration: 0.8 }}
                 >
                   <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold tracking-tighter text-white mb-3 drop-shadow-2xl">
                     Powerline<br/><span className="text-accent italic">Penpals</span>
                   </h1>
                   <div className="h-1 w-20 bg-accent mx-auto mb-4 rounded-full" />
                 </motion.div>

                 <motion.div
                   className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-xs text-slate-400 font-mono tracking-wide"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.7, duration: 0.8 }}
                 >
                    <div className="flex flex-col items-center gap-1.5">
                       <span className="w-7 h-7 rounded-full border border-slate-600 flex items-center justify-center text-accent text-xs">1</span>
                       <span>Select Region</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                       <span className="w-7 h-7 rounded-full border border-slate-600 flex items-center justify-center text-accent text-xs">2</span>
                       <span>Make Choices</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                       <span className="w-7 h-7 rounded-full border border-slate-600 flex items-center justify-center text-accent text-xs">3</span>
                       <span>Balance Impact</span>
                    </div>
                 </motion.div>

                 <motion.p 
                   className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-md mx-auto"
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.8, duration: 0.8 }}
                 >
                   When the grid fails, choices are all we have left.
                   <br/><span className="text-xs text-slate-500 mt-3 block uppercase tracking-widest">An interactive anthology of energy poverty in Canada</span>
                 </motion.p>

                 <motion.div
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 1.5, duration: 0.8 }}
                 >
                   <Button 
                     data-testid="button-begin"
                     size="lg" 
                     className="text-base sm:text-lg px-10 py-6 sm:py-8 rounded-full bg-white text-slate-900 hover:bg-accent hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,200,100,0.5)]"
                     onClick={() => setView('map')}
                   >
                     Begin Journey
                   </Button>
                 </motion.div>
              </div>
           </motion.div>
        )}

        {view === 'map' && (
          <motion.div 
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full relative"
          >
            <header className="absolute top-0 left-0 right-0 z-30 p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent">
              <div>
                <h1 className="text-lg sm:text-xl font-serif font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span className="text-accent text-xl sm:text-2xl">&#9889;</span>
                  Powerline Penpals
                </h1>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-0.5">A Canada Story Map of Energy Poverty</p>
              </div>
              
              <div className="w-full sm:w-56">
                <ImpactMeter stats={stats} compact={true} className="bg-transparent border-0 p-0" />
              </div>
            </header>

            <MapController 
              onSelectRegion={handleSelectRegion} 
              completedRegions={completedRegions}
            />

            <footer className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950/80 to-transparent text-xs text-slate-500 text-center">
              Regions explored: {completedRegions.length} / {Object.keys(STORIES).length}
            </footer>
          </motion.div>
        )}

        {view === 'letter' && currentRegion && currentLetter && (
          <motion.div 
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col bg-slate-950"
          >
            <header className="shrink-0 px-4 py-3 flex items-center justify-between border-b border-white/10 bg-slate-950">
              <div className="flex items-center gap-2">
                <button
                  data-testid="button-back-to-map"
                  onClick={() => { setView('map'); setCurrentRegion(null); setCurrentLetterId(null); }}
                  className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>&larr;</span> Map
                </button>
                <span className="text-white/20">|</span>
                <h1 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
                  <span className="text-accent">&#9889;</span>
                  {currentRegion.name}
                </h1>
              </div>
              <div className="w-40 sm:w-52">
                <ImpactMeter stats={stats} compact={true} className="bg-transparent border-0 p-0" />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto">
              <div className="w-full px-4 py-6 sm:py-8">
                <LetterInterface 
                  key={currentLetter.id}
                  letter={currentLetter}
                  regionName={currentRegion.name}
                  budget={currentBudget}
                  startingBudget={currentRegion.budget}
                  onChoice={(c) => {
                    updateStats(c.impact);
                    spendBudget(c.cost || 0);
                  }}
                  onWalletDecision={(opt) => {
                    updateStats(opt.impact);
                    spendBudget(opt.cost || 0);
                  }}
                  onComplete={handleLetterStepComplete}
                />
              </div>
            </div>
          </motion.div>
        )}

        {view === 'summary' && (
          <motion.div 
             key="summary"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="w-full h-full overflow-y-auto bg-slate-950"
          >
            <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                 <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Your Impact Profile</h2>
                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                      Across Canada, you prioritized choices that balanced <strong className="text-accent">survival</strong> with <strong className="text-primary">dignity</strong>.
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {Object.entries(budgets).map(([regionId, remaining]) => {
                        const region = STORIES[regionId as RegionId];
                        const spent = region.budget - remaining;
                        return (
                          <div key={regionId} className="bg-white/5 border border-white/10 rounded-lg p-3">
                            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">{region.name}</div>
                            <div className="font-mono text-white">${remaining} <span className="text-slate-500">left</span></div>
                            <div className="text-xs text-red-400/70 font-mono">-${spent} spent</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="py-4">
                       <ImpactMeter stats={stats} className="bg-transparent border-0 p-0" />
                    </div>

                    <div className="flex gap-3">
                      <Button data-testid="button-restart" onClick={() => window.location.reload()} size="lg" className="w-full">
                        Restart Journey
                      </Button>
                      <Button data-testid="button-share" variant="outline" size="lg" className="w-full" onClick={() => alert("Thank you for playing.")}>
                        Share Results
                      </Button>
                    </div>
                 </div>

                 <div className="bg-[#f7f5f0] p-6 sm:p-8 rounded-lg rotate-1 shadow-2xl relative">
                    <h3 className="font-serif text-slate-800 text-xl sm:text-2xl font-bold mb-5 border-b-2 border-slate-300 pb-2">Passport</h3>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                       {Object.values(STORIES).map((region) => (
                         <div key={region.id} className="aspect-square border-2 border-slate-300 border-dashed rounded-lg flex items-center justify-center p-3">
                            {completedRegions.includes(region.id) ? (
                              <div className="text-center rotate-[-12deg]">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-slate-800 flex items-center justify-center mb-1.5 mx-auto">
                                   <span className="text-lg sm:text-2xl font-bold text-slate-800">{region.name.slice(0,3).toUpperCase()}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Verified</span>
                              </div>
                            ) : (
                              <span className="text-slate-300 text-sm italic">Empty</span>
                            )}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
