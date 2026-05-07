import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, MapPin, Star, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { db } from '@/src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import { Map as MapIcon, Grid } from 'lucide-react';

export const ToursPage = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchTerm(search);
    }
    fetchTours();
  }, [location]);

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'tour_packages'));
      const tourData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (tourData.length > 0) {
        setTours(tourData);
      } else {
        // Fallback mock data if DB is empty
        setTours([
          {
            id: '1',
            title: 'Bali Serenity Retreat',
            location: 'Ubud, Bali',
            price: 1200,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
            category: 'Relaxation'
          },
          {
            id: '2',
            title: 'Swiss Alps Expedition',
            location: 'Zermatt, Switzerland',
            price: 2500,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
            category: 'Adventure'
          },
          {
            id: '3',
            title: 'Kyoto Cultural Journey',
            location: 'Kyoto, Japan',
            price: 1800,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600',
            category: 'Cultural'
          },
          {
            id: '4',
            title: 'Amalfi Coast Luxury',
            location: 'Positano, Italy',
            price: 3200,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
            category: 'Luxury'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tour.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = tour.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="pt-24 pb-12 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
             <p className="text-sky-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-3">AI Discovery Engine</p>
            <h1 className="text-5xl font-bold tracking-tighter dark:text-white">The World is Yours</h1>
            <p className="text-slate-500 dark:text-white/40 italic font-light">Explore 100+ AI-curated premium tour packages.</p>
          </div>
          <div className="flex bg-white/5 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-2xl">
             <Button 
               variant={view === 'grid' ? 'secondary' : 'ghost'} 
               size="sm" 
               className="rounded-xl h-10 px-6 font-bold text-xs uppercase"
               onClick={() => setView('grid')}
             >
               <Grid size={16} className="mr-2" /> Grid
             </Button>
             <Button 
               variant={view === 'map' ? 'secondary' : 'ghost'} 
               size="sm" 
               className="rounded-xl h-10 px-6 font-bold text-xs uppercase"
               onClick={() => setView('map')}
             >
               <MapIcon size={16} className="mr-2" /> Map
             </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters */}
          <aside className="w-full lg:w-80 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center text-sky-400">
                  <Filter size={18} />
                </div>
                <h3 className="font-bold text-lg dark:text-white tracking-tight">Search Filters</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-white/40">Search Destination</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 h-4 w-4" />
                    <Input 
                      placeholder="e.g. Bali, Japan..."
                      className="rounded-2xl pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-sky-500/20"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-white/40">Max Price (${priceRange[1]})</label>
                  <Slider 
                    defaultValue={[0, 5000]} 
                    max={5000} 
                    step={100}
                    className="py-4"
                    onValueChange={(val) => {
                      if (Array.isArray(val)) {
                        setPriceRange(val);
                      } else if (typeof val === 'number') {
                        setPriceRange([0, val]);
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest mb-4 block text-white/40">Categories</label>
                  <div className="grid grid-cols-1 gap-3">
                    {['Adventure', 'Cultural', 'Relaxation', 'Luxury', 'Ecotourism'].map((cat, i) => (
                      <label key={i} className="flex items-center space-x-3 text-sm text-white/60 cursor-pointer group hover:text-white transition-all">
                        <div className="w-5 h-5 rounded-md border border-white/10 flex items-center justify-center group-hover:border-sky-500 transition-colors">
                           <input type="checkbox" className="opacity-0 absolute" />
                           <div className="w-2 h-2 bg-sky-500 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                        <span className="font-medium">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full travel-gradient rounded-2xl h-12 font-bold shadow-xl shadow-sky-900/20">Apply Filters</Button>
              </div>
            </div>
          </aside>

          {/* Main View */}
          <div className="flex-1">
            {view === 'grid' ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Showing {filteredTours.length} packages</p>
                  <select className="bg-transparent text-xs font-bold uppercase tracking-widest text-sky-400 border-none focus:ring-0 cursor-pointer">
                    <option>Most Popular</option>
                    <option>Price (Low to High)</option>
                    <option>Price (High to Low)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {isLoading ? (
                    Array(4).fill(0).map((_, i) => (
                      <Card key={i} className="rounded-[2.5rem] bg-white/5 border-white/10 h-96 animate-pulse" />
                    ))
                  ) : (
                    filteredTours.map((tour, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card className="rounded-[2.5rem] overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl group cursor-pointer hover:border-white/20 transition-all duration-500 shadow-2xl p-1">
                          <div className="relative h-72 rounded-[2.2rem] overflow-hidden m-1">
                             <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                             <div className="absolute top-5 left-5">
                               <Badge className="bg-black/40 backdrop-blur-md text-white border-white/20 font-bold rounded-full px-3 py-1">
                                 {tour.rating} <Star className="ml-1 h-3 w-3 fill-amber-400 text-amber-400 inline" />
                               </Badge>
                             </div>
                             <button className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-sky-600 transition-all flex items-center justify-center">
                               <Calendar size={20} />
                             </button>
                          </div>
                          <CardContent className="p-8">
                            <div className="flex items-center text-sky-400 font-bold text-[10px] uppercase tracking-widest mb-3">
                               <MapPin size={12} className="mr-2" /> {tour.location}
                            </div>
                            <h3 className="text-2xl font-bold mb-6 dark:text-white tracking-tight">{tour.title}</h3>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                               <div>
                                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Start from</p>
                                  <p className="text-3xl font-bold text-white tracking-tighter">${tour.price}</p>
                               </div>
                               <Link to={`/tours/${tour.id}`}>
                                  <Button className="rounded-2xl travel-gradient px-8 py-6 font-bold shadow-xl shadow-sky-900/20 group/btn">
                                    Book <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                                  </Button>
                               </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <Card className="rounded-[3rem] border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl h-[700px] overflow-hidden relative">
                <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-10" />
                  <div className="absolute inset-0 bg-sky-950 opacity-30" />
                </div>
                
                <div className="relative z-10 w-full h-full p-12 flex flex-col items-center justify-center text-center">
                   <div className="w-24 h-24 bg-sky-500/20 rounded-[2rem] flex items-center justify-center text-sky-400 mb-8 border border-sky-500/30">
                      <MapIcon size={48} />
                   </div>
                   <h3 className="text-4xl font-bold mb-4 text-white tracking-tighter">Global Travel Canvas</h3>
                   <p className="text-white/40 max-w-md mb-10 font-light leading-relaxed">
                     Navigate our exclusive worldwide destinations through a sleek visual interface.
                   </p>
                   
                   <div className="flex flex-wrap justify-center gap-3">
                     {tours.map((t, i) => (
                       <Badge key={i} variant="secondary" className="bg-white/5 border-white/10 text-white/80 px-4 py-2 rounded-xl backdrop-blur-md">
                         {t.location}
                       </Badge>
                     ))}
                   </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
