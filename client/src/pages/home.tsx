import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapController } from '@/components/MapController';
import { LetterInterface } from '@/components/LetterInterface';
import { ImpactMeter } from '@/components/ImpactMeter';
import { Region, STORIES, RegionId } from '@/lib/story-data';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [view, setView] = useState<'map' | 'letter' | 'summary'>('map');
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [completedRegions, setCompletedRegions] = useState<RegionId[]>([]);
  
  const [stats, setStats] = useState({
    warmth: 0,
    reliability: 0,
    affordability: 0,
    agency: 0
  });

  const handleSelectRegion = (region: Region) => {
    setCurrentRegion(region);
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

  const handleLetterComplete = () => {
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
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-accent text-3xl">⚡</span>
            Powerline Penpals
          </h1>
          <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">A Canada Story Map of Energy Poverty</p>
        </div>
        
        <div className="pointer-events-auto transition-opacity duration-500" style={{ opacity: view === 'summary' ? 0 : 1 }}>
           <ImpactMeter stats={stats} compact={true} className="w-64" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          {view === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <MapController 
                onSelectRegion={handleSelectRegion} 
                completedRegions={completedRegions}
              />
            </motion.div>
          )}

          {view === 'letter' && currentRegion && (
            <motion.div 
              key="letter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="w-full max-w-4xl pt-20 pb-10">
                 <LetterInterface 
                   letter={currentRegion.letters[0]}
                   regionName={currentRegion.name}
                   onChoice={(c) => updateStats(c.impact)}
                   onWalletDecision={(opt) => updateStats(opt.impact)}
                   onComplete={handleLetterComplete}
                 />
              </div>
            </motion.div>
          )}

          {view === 'summary' && (
            <motion.div 
               key="summary"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="absolute inset-0 z-30 bg-slate-950 flex flex-col items-center justify-center p-8 overflow-y-auto"
            >
              <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                    <h2 className="text-4xl font-serif font-bold text-white mb-2">Your Impact Profile</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      Across Canada, you prioritized choices that balanced <strong className="text-accent">survival</strong> with <strong className="text-primary">dignity</strong>.
                    </p>
                    
                    <div className="py-8">
                       <ImpactMeter stats={stats} className="bg-transparent border-0 p-0" />
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={() => window.location.reload()} size="lg" className="w-full">
                        Restart Journey
                      </Button>
                      <Button variant="outline" size="lg" className="w-full" onClick={() => alert("Thank you for playing.")}>
                        Share Results
                      </Button>
                    </div>
                 </div>

                 {/* Passport Stamps Grid */}
                 <div className="bg-[#f7f5f0] p-8 rounded-lg rotate-2 shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/src/assets/paper-texture.png')] opacity-50 pointer-events-none rounded-lg" />
                    <h3 className="font-serif text-slate-800 text-2xl font-bold mb-6 relative z-10 border-b-2 border-slate-300 pb-2">Passport</h3>
                    
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                       {Object.values(STORIES).map((region) => (
                         <div key={region.id} className="aspect-square border-2 border-slate-300 border-dashed rounded-lg flex items-center justify-center p-4">
                            {completedRegions.includes(region.id) ? (
                              <div className="text-center rotate-[-12deg]">
                                <div className="w-16 h-16 rounded-full border-4 border-slate-800 flex items-center justify-center mb-2 mx-auto">
                                   <span className="text-2xl font-bold text-slate-800">{region.name.slice(0,3).toUpperCase()}</span>
                                </div>
                                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Verified</span>
                              </div>
                            ) : (
                              <span className="text-slate-300 text-sm italic">Empty</span>
                            )}
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Status */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none flex justify-between items-end text-xs text-slate-500">
        <div>
           {view !== 'summary' && `Regions explored: ${completedRegions.length} / ${Object.keys(STORIES).length}`}
        </div>
      </footer>
    </div>
  );
}
