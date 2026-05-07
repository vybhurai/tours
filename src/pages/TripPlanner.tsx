import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wallet, MapPin, Calendar, Compass, Send, Loader2, Share2, Download, Zap } from 'lucide-react';
import { travelChat } from '@/src/lib/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Markdown from 'react-markdown';

export const TripPlanner = () => {
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [destination, setDestination] = useState('');
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateTrip = async () => {
    if (!interests || !budget) return;
    setIsLoading(true);
    setItinerary(null);

    const prompt = `Create a custom ${budget} budget trip plan for ${destination || 'a surprise mystery destination'} based on these interests: ${interests}. 
    Include:
    1. A catchy title for the trip.
    2. A day-by-day itinerary (3-5 days).
    3. Estimated cost breakdown.
    4. Why this matches the "Discovery Travel" luxury vibe.
    Format your response in beautiful Markdown.`;

    try {
      const response = await travelChat(prompt, []);
      setItinerary(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Form Side */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 bg-sky-500/20 text-sky-400 border border-sky-500/50 backdrop-blur-xl px-5 py-2 rounded-full uppercase tracking-[0.3em] font-black text-[9px]">
                <Sparkles className="w-3 h-3" />
                Next-Gen Planning
              </div>
              <h1 className="text-6xl font-black tracking-tighter leading-none mb-6">
                AI Expedition <br />
                <span className="text-sky-400">Architect</span>
              </h1>
              <p className="text-white/40 text-lg max-w-md">
                Describe your desires, set your capital, and let Discovery AI synthesize your perfect escape.
              </p>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border-white/10 space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-sky-400 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Desired Destination
                </label>
                <Input 
                  placeholder="e.g. Kyoto, Japan or 'Suprise Me'"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-sky-500/20 text-white"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-sky-400 flex items-center gap-2">
                  <Wallet className="w-3 h-3" /> Total Budget (USD)
                </label>
                <Input 
                  placeholder="e.g. $5,000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-sky-500/20 text-white"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-sky-400 flex items-center gap-2">
                  <Compass className="w-3 h-3" /> Interests & Vibe
                </label>
                <textarea 
                  placeholder="e.g. Traditional tea ceremonies, street photography, hidden jazz bars, luxury ryokans..."
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 h-32 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-white placeholder:text-white/20"
                />
              </div>

              <Button 
                onClick={generateTrip}
                disabled={isLoading || !interests || !budget}
                className="w-full h-16 travel-gradient rounded-2xl font-black text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-sky-500/20 uppercase tracking-widest text-xs"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Synthesizing Itinerary...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 fill-current text-white" />
                    Engineer My Escape
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Result Side */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {itinerary ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass p-10 rounded-[3rem] border-white/10 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 flex gap-2">
                    <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white/40 hover:text-white">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="markdown-body prose prose-invert prose-sky max-w-none">
                    <Markdown>{itinerary}</Markdown>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full travel-gradient flex items-center justify-center text-white">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white">Discovery AI</p>
                        <p className="text-[9px] text-white/40 uppercase tracking-widest">Verified Itinerary</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-sky-500/50 text-sky-400 rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6">
                      Book This Expedition
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[700px] rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.02]">
                  <div className="w-24 h-24 bg-sky-500/10 rounded-[2.5rem] flex items-center justify-center text-sky-400 mb-8 border border-sky-500/20">
                    <Compass className="w-10 h-10 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Awaiting Parameters</h3>
                  <p className="text-white/20 max-w-xs mx-auto">
                    Configure your constraints on the left to materialize your bespoke luxury expedition.
                  </p>
                  
                  <div className="mt-12 grid grid-cols-2 gap-4 w-full opacity-30">
                    <div className="h-24 bg-white/5 rounded-3xl" />
                    <div className="h-24 bg-white/5 rounded-3xl" />
                    <div className="h-48 col-span-2 bg-white/5 rounded-3xl" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
