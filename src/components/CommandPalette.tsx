import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Map, Hotel, Car, Home, Settings, ArrowRight, X, Command, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

interface SearchResult {
  id: string;
  title: string;
  type: 'Tour' | 'Hotel' | 'Vehicle' | 'Page';
  icon: React.ReactNode;
  path: string;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const rawResults: any[] = [
    { id: '1', title: 'Tours & Expeditions', type: 'Page', path: '/tours', icon: <Map className="w-4 h-4" /> },
    { id: '1.5', title: 'AI Trip Planner', type: 'Page', path: '/trip-planner', icon: <Sparkles className="w-4 h-4" /> },
    { id: '2', title: 'Luxury Hotels', type: 'Page', path: '/hotels', icon: <Hotel className="w-4 h-4" /> },
    { id: '3', title: 'Elite Rentals', type: 'Page', path: '/vehicles', icon: <Car className="w-4 h-4" /> },
    { id: '4', title: 'User Dashboard', type: 'Page', path: '/dashboard', icon: <Home className="w-4 h-4" /> },
    { id: '5', title: 'Bali Zen Retreat', type: 'Tour', path: '/tours/1', icon: <Map className="w-4 h-4" /> },
    { id: '6', title: 'Swiss Alps Expedition', type: 'Tour', path: '/tours/2', icon: <Map className="w-4 h-4" /> },
    { id: '7', title: 'Kyoto Cultural Journey', type: 'Tour', path: '/tours/3', icon: <Map className="w-4 h-4" /> },
    { id: '8', title: 'Amalfi Coast Luxury', type: 'Tour', path: '/tours/4', icon: <Map className="w-4 h-4" /> },
  ];

  const results: SearchResult[] = (rawResults as SearchResult[]).filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  const toggle = useCallback(() => setIsOpen(open => !open), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="flex items-center p-8 border-b border-white/5">
              <Search className="w-6 h-6 text-sky-400 mr-4" />
              <input
                autoFocus
                placeholder="Where would you like to escape to? (esc to close)"
                className="w-full bg-transparent border-none text-white text-xl placeholder:text-white/20 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
              />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">ESC</span>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4 scrollbar-hide">
              {results.length > 0 ? (
                <div className="space-y-2">
                  <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Discovery Network</p>
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result.path)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                          {result.icon}
                        </div>
                        <div className="text-left">
                          <p className="text-white font-bold">{result.title}</p>
                          <p className="text-[10px] uppercase font-black tracking-widest text-white/40 group-hover:text-sky-400/60 transition-colors">
                            {result.type}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/0 group-hover:text-white/20 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center text-white/20 mx-auto mb-6">
                    <Search className="w-8 h-8" />
                  </div>
                  <p className="text-white/40 font-medium">No destinations matching your query found.</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-black/20 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-black text-white/40">↑↓</div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-black text-white/40">ENTER</div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Select</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-40">
                <Command className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">+ K</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
