import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapController } from '@/components/MapController';
import { LetterInterface } from '@/components/LetterInterface';
import { ImpactMeter } from '@/components/ImpactMeter';
import { Region, STORIES, RegionId } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import canadaMap from '../assets/canada-map.png';

export default function Home() {
  const [view, setView] = useState<'intro' | 'map' | 'letter' | 'summary'>('intro');
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [currentLetterId, setCurrentLetterId] = useState<string | null>(null);
  const [completedRegions, setCompletedRegions] = useState<RegionId[]>([]);
  
  const [stats, setStats] = useState({
    warmth: 0,
    reliability: 0,
    affordability: 0,
    agency: 0
  });

  const handleSelectRegion = (region: Region) => {
    setCurrentRegion(region);
    // Automatically select the first letter of the region
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

  const handleLetterStepComplete = (nextId?: string) => {
    if (nextId) {
       // Proceed to next letter in the chain
       setCurrentLetterId(nextId);
    } else {
       // Region complete
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

  // Helper to find current letter object
  const getCurrentLetter = () => {
    if (!currentRegion || !currentLetterId) return null;
    return currentRegion.letters.find(l => l.id === currentLetterId);
  };

  const currentLetter = getCurrentLetter();

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto transition-opacity duration-500" style={{ opacity: view === 'intro' ? 0 : 1 }}>
          <h1 className="text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-accent text-3xl">⚡</span>
            Powerline Penpals
          </h1>
          <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">A Canada Story Map of Energy Poverty</p>
        </div>
        
        <div className="pointer-events-auto transition-opacity duration-500" style={{ opacity: (view === 'summary' || view === 'intro') ? 0 : 1 }}>
           <ImpactMeter stats={stats} compact={true} className="w-64" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          {view === 'intro' && (
             <motion.div
               key="intro"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
               transition={{ duration: 1.2 }}
               className="relative w-full h-full flex items-center justify-center bg-slate-950"
             >
                {/* Background Video/Image Parallax Effect */}
                <div className="absolute inset-0 z-0 opacity-40 scale-105 animate-pulse-slow">
                   <img src={canadaMap} className="w-full h-full object-cover blur-sm" alt="Background Map" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-2xl text-center space-y-8 p-8">
                   <motion.div
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.5, duration: 0.8 }}
                   >
                     <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-white mb-4 drop-shadow-2xl">
                       Powerline<br/><span className="text-accent italic">Penpals</span>
                     </h1>
                     <div className="h-1 w-24 bg-accent mx-auto mb-6 rounded-full" />
                   </motion.div>

                   <motion.div
                     className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8 text-xs md:text-sm text-slate-400 font-mono tracking-wide"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.7, duration: 0.8 }}
                   >
                      <div className="flex flex-col items-center gap-2">
                         <span className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-accent">1</span>
                         <span>Select Region</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <span className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-accent">2</span>
                         <span>Make Choices</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <span className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-accent">3</span>
                         <span>Balance Impact</span>
                      </div>
                   </motion.div>

                   <motion.p 
                     className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-lg mx-auto"
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.8, duration: 0.8 }}
                   >
                     When the grid fails, choices are all we have left.
                     <br/><span className="text-sm text-slate-500 mt-4 block uppercase tracking-widest">An interactive anthology of energy poverty in Canada</span>
                   </motion.p>

                   <motion.div
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 1.5, duration: 0.8 }}
                   >
                     <Button 
                       size="lg" 
                       className="text-lg px-12 py-8 rounded-full bg-white text-slate-900 hover:bg-accent hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,200,100,0.5)]"
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
              className="w-full h-full"
            >
              <MapController 
                onSelectRegion={handleSelectRegion} 
                completedRegions={completedRegions}
              />
            </motion.div>
          )}

          {view === 'letter' && currentRegion && currentLetter && (
            <motion.div 
              key="letter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="w-full max-w-4xl pt-20 pb-10">
                 {/* Key forces remount on letter change for animation */}
                 <LetterInterface 
                   key={currentLetter.id}
                   letter={currentLetter}
                   regionName={currentRegion.name}
                   onChoice={(c) => updateStats(c.impact)}
                   onWalletDecision={(opt) => updateStats(opt.impact)}
                   onComplete={handleLetterStepComplete}
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
           {(view !== 'summary' && view !== 'intro') && `Regions explored: ${completedRegions.length} / ${Object.keys(STORIES).length}`}
        </div>
      </footer>
    </div>
  );
}
