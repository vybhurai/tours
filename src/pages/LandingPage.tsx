import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ArrowRight, Star, Compass, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/40 dark:bg-sky-950/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="Travel Hero" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-white/10 dark:bg-sky-500/20 text-white dark:text-sky-400 border-white/20 dark:border-sky-500/50 backdrop-blur-md px-4 py-1 uppercase tracking-widest font-bold text-[10px]">
              Explore the unconventional
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
              Adventure Awaits,<br />
              <span className="gradient-text">Discover Yourself</span>
            </h1>
            <p className="text-xl text-slate-200 dark:text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              AI-powered personalized travel recommendations curated based on your unique travel DNA.
            </p>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl md:rounded-full max-w-4xl mx-auto shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="flex-1 w-full relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 h-5 w-5" />
                  <Input 
                    placeholder="Where to next?" 
                    className="bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 pl-14 h-14"
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
                    className="bg-transparent border-none text-white focus-visible:ring-0 pl-14 h-14 [color-scheme:dark]"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="w-full md:w-auto travel-gradient h-14 px-12 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
                >
                  Search Tours
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-32 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="text-sky-500 dark:text-sky-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-3">AI Curated Destintions</p>
              <h2 className="text-4xl md:text-5xl font-bold dark:text-white tracking-tight">Popular Getaways</h2>
            </div>
            <Button 
              variant="ghost" 
              className="text-sky-600 dark:text-sky-400 font-bold group"
              onClick={() => navigate('/tours')}
            >
              View all <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Bali, Indonesia', price: '$899', match: '98%', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600' },
              { name: 'Santorini, Greece', price: '$1299', match: '95%', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600' },
              { name: 'Kyoto, Japan', price: '$1499', match: '92%', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600' },
              { name: 'Swiss Alps, CH', price: '$1899', match: '89%', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600' }
            ].map((dest, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md rounded-[2.5rem] p-1 border cursor-pointer hover:border-white/20 transition-all duration-500 shadow-2xl">
                  <div className="relative h-72 rounded-[2rem] overflow-hidden m-1 mb-4">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/40 backdrop-blur-md text-white border-white/20 font-bold rounded-full px-3 py-1">{dest.price}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">{dest.match} Match</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 pt-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl dark:text-white tracking-tight">{dest.name}</h3>
                      <div className="flex items-center text-amber-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-bold ml-1">4.9</span>
                      </div>
                    </div>
                    <Link to="/tours" className="block w-full">
                      <button className="w-full py-3 bg-white/10 dark:bg-sky-500/10 border border-white/10 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-sky-500 hover:text-white transition-all duration-300">
                        Explore Package
                      </button>
                    </Link>
                  </CardContent>
                </Card>
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
