import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ArrowRight, Star, Compass, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '../lib/utils';

export const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/tours?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/tours');
    }
  };

  const bentoDestinations = [
    { 
      name: 'Bali, Indonesia', 
      price: '$899', 
      match: '98%', 
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
      size: 'large',
      description: 'Find inner peace among ancient temples and sacred forests.'
    },
    { 
      name: 'Santorini, Greece', 
      price: '$1299', 
      match: '95%', 
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
      size: 'small',
      description: 'Iconic sunsets over the azure Aegean.'
    },
    { 
      name: 'Kyoto, Japan', 
      price: '$1499', 
      match: '92%', 
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
      size: 'medium',
      description: 'A delicate dance between history and tomorrow.'
    },
    { 
      name: 'Swiss Alps, CH', 
      price: '$1899', 
      match: '89%', 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
      size: 'small',
      description: 'Pristine peaks and alpine adventure.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <div className="absolute inset-0 bg-slate-900/40 dark:bg-sky-950/70 z-10" />
          <motion.img 
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="Travel Hero" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 bg-white/10 dark:bg-sky-500/20 text-white dark:text-sky-400 border border-white/20 dark:border-sky-500/50 backdrop-blur-xl px-5 py-2 rounded-full uppercase tracking-[0.3em] font-black text-[9px]">
              <Sparkles className="w-3 h-3" />
              Explore the unconventional
            </div>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85]">
              Adventure Awaits,<br />
              <span className="text-sky-400">Discover Yourself</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 dark:text-white/60 mb-12 max-w-2xl mx-auto font-medium leading-relaxed bg-black/20 backdrop-blur-sm rounded-3xl p-6">
              AI-powered personalized travel recommendations curated based on your unique travel DNA.
            </p>

            <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-2 rounded-3xl md:rounded-full max-w-4xl mx-auto shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="flex-1 w-full relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 h-5 w-5" />
                  <Input 
                    placeholder="Where to next?" 
                    className="bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 pl-14 h-14 font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="hidden md:block w-px h-8 bg-white/10" />
                <div className="flex-1 w-full relative">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 h-5 w-5" />
                  <Input 
                    type="date"
                    className="bg-transparent border-none text-white focus-visible:ring-0 pl-14 h-14 [color-scheme:dark] font-medium"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="w-full md:w-auto travel-gradient h-14 px-12 rounded-full font-black text-white uppercase tracking-widest text-xs shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Expedition Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Featured Destinations */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950 pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-sky-500 dark:text-sky-400 font-black tracking-[0.4em] uppercase text-[9px] mb-4">Elite Curation</p>
              <h2 className="text-5xl md:text-7xl font-black dark:text-white tracking-tighter leading-none mb-6">Unrivaled Destinations</h2>
              <p className="text-slate-500 dark:text-white/40 text-lg">Our top-tier picks, analyzed and verified by Discovery AI for your unique profile.</p>
            </div>
            <Link to="/tours">
              <div className="w-40 h-40 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:scale-110 transition-all duration-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-sky-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 font-black uppercase text-[10px] tracking-widest flex items-center">
                  All Tours <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[900px]">
            {bentoDestinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={cn(
                  "relative rounded-[3rem] overflow-hidden group cursor-pointer border border-slate-200 dark:border-white/10 shadow-2xl",
                  dest.size === 'large' ? "md:col-span-2 md:row-span-2" : 
                  dest.size === 'medium' ? "md:col-span-2 md:row-span-1" :
                  "md:col-span-1 md:row-span-1"
                )}
                onClick={() => navigate('/tours')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                <motion.img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                
                <div className="absolute top-8 left-8 z-20 flex flex-wrap gap-2">
                  <Badge className="bg-white/10 backdrop-blur-xl text-white border-white/20 font-black tracking-widest text-[9px] uppercase px-4 py-2 rounded-full">
                    {dest.price}
                  </Badge>
                  <Badge className="bg-sky-500 text-white font-black tracking-widest text-[9px] uppercase px-4 py-2 rounded-full shadow-lg shadow-sky-500/40">
                    {dest.match} MATCH
                  </Badge>
                </div>

                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="flex items-center gap-2 mb-2 text-sky-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-black tracking-widest">4.9 PREMIUM</span>
                  </div>
                  <h3 className={cn("font-black text-white tracking-tighter leading-none mb-3", dest.size === 'large' ? "text-4xl md:text-6xl" : "text-3xl")}>
                    {dest.name}
                  </h3>
                  {dest.size === 'large' && (
                    <p className="text-white/60 font-medium max-w-sm mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {dest.description}
                    </p>
                  )}
                  <div className="flex items-center text-white/40 group-hover:text-white transition-colors font-black uppercase text-[10px] tracking-widest">
                    Veiw Package Details <ArrowRight size={14} className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Travel With SmartTours?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We combine artificial intelligence with human passion to create unforgettable journeys.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Compass className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">AI Recommendations</h3>
              <p className="text-slate-600">Smart algorithms that learn your preferences to suggest the perfect trip.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Secure Bookings</h3>
              <p className="text-slate-600">Encrypted payments and verified partners across 150+ countries.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">24/7 AI Assistance</h3>
              <p className="text-slate-600">Our intelligent chatbot is always awake to help you with anything.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
