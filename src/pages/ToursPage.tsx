import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Filter, Search, MapPin, Star, Calendar, ArrowRight, Grid, Map as MapIcon, RotateCcw, ShieldAlert } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Link, useLocation } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { cn } from '../lib/utils';
import { MapComponent } from '../components/MapComponent';

export const ToursPage = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default');
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
      // Direct load from client-side luxury destinations module in INR (₹)
      setTours(DESTINATIONS);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamically extract unique categories from data to ensure 100% accurate filter matching
  const categories = useMemo(() => {
    const cats = Array.from(new Set(DESTINATIONS.map(d => d.category)));
    return ['All', ...cats];
  }, []);

  const filteredTours = useMemo(() => {
    let result = tours.filter(tour => {
      // Multi-word case-insensitive deep search
      const searchVal = searchTerm.trim().toLowerCase();
      const matchesSearch = !searchVal || 
                            tour.title?.toLowerCase().includes(searchVal) || 
                            tour.location?.toLowerCase().includes(searchVal) ||
                            tour.category?.toLowerCase().includes(searchVal) ||
                            tour.description?.toLowerCase().includes(searchVal) ||
                            tour.highlights?.some((h: string) => h.toLowerCase().includes(searchVal)) ||
                            tour.experiences?.some((h: string) => h.toLowerCase().includes(searchVal));

      // Defensive price range check
      const maxPrice = priceRange[1] !== undefined ? priceRange[1] : 500000;
      const matchesPrice = tour.price <= maxPrice;

      // Category matching
      const matchesCategory = selectedCategory === 'All' || tour.category === selectedCategory;

      return matchesSearch && matchesPrice && matchesCategory;
    });

    // Handle sort
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [tours, searchTerm, priceRange, selectedCategory, sortBy]);

  // Aggregate locations of currently filtered tours for map visual pins
  const mapLocations = useMemo(() => {
    return filteredTours.flatMap(tour => tour.locations || []);
  }, [filteredTours]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange([0, 500000]);
    setSortBy('default');
  };

  return (
    <div className="pt-24 pb-12 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <p className="text-amber-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-3">AI Discovery Engine</p>
            <h1 className="text-5xl font-bold tracking-tighter dark:text-white">The World is Yours</h1>
            <p className="text-slate-500 dark:text-white/40 italic font-light">Explore 100+ AI-curated premium tour packages.</p>
          </div>
          <div className="flex bg-white/5 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-2xl">
            <Button 
              variant={view === 'grid' ? 'secondary' : 'ghost'} 
              size="sm" 
              className={cn("rounded-xl h-10 px-6 font-bold text-xs uppercase", view === 'grid' ? "bg-amber-400 text-slate-950 hover:bg-amber-400/90" : "text-white hover:bg-white/10")}
              onClick={() => setView('grid')}
            >
              <Grid size={16} className="mr-2" /> Grid
            </Button>
            <Button 
              variant={view === 'map' ? 'secondary' : 'ghost'} 
              size="sm" 
              className={cn("rounded-xl h-10 px-6 font-bold text-xs uppercase", view === 'map' ? "bg-amber-400 text-slate-950 hover:bg-amber-400/90" : "text-white hover:bg-white/10")}
              onClick={() => setView('map')}
            >
              <MapIcon size={16} className="mr-2" /> Map
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters */}
          <aside className="w-full lg:w-80 space-y-8">
            <div className="bg-slate-950/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center text-amber-400">
                    <Filter size={18} />
                  </div>
                  <h3 className="font-bold text-lg dark:text-white tracking-tight">Search Filters</h3>
                </div>
                {(searchTerm || selectedCategory !== 'All' || priceRange[1] < 500000) && (
                  <button 
                    onClick={handleResetFilters}
                    className="text-[10px] uppercase font-black text-amber-400 flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                  >
                    <RotateCcw size={10} /> Clear
                  </button>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-white/40">Search Destination</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 h-4 w-4" />
                    <Input 
                      placeholder="e.g. Kerala, Bali, Swiss..."
                      className="rounded-2xl pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-amber-500/25"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-white/40">
                    Max Price (₹{(priceRange[1] ?? 500000).toLocaleString('en-IN')})
                  </label>
                  <Slider 
                    defaultValue={[500000]} 
                    value={[priceRange[1]]}
                    max={500000} 
                    step={10000}
                    className="py-4"
                    onValueChange={(val) => {
                      if (Array.isArray(val) && val.length > 0) {
                        setPriceRange([0, val[0]]);
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest mb-4 block text-white/40">Categories</label>
                  <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {categories.map((cat, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "flex items-center space-x-3 text-[10px] uppercase tracking-widest font-black p-3 rounded-xl border text-left transition-all duration-300",
                          selectedCategory === cat 
                            ? "bg-amber-400 text-slate-950 border-transparent shadow-lg shadow-amber-400/10" 
                            : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <span>{cat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleResetFilters} 
                  className="w-full bg-slate-950 text-amber-400 hover:bg-white hover:text-slate-950 rounded-2xl h-12 font-bold shadow-xl border border-white/5"
                >
                  Reset Defaults
                </Button>
              </div>
            </div>
          </aside>

          {/* Main View */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                Showing {filteredTours.length} {filteredTours.length === 1 ? 'package' : 'packages'}
              </p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-white/10 text-xs font-bold uppercase tracking-widest text-amber-400 rounded-xl px-4 py-2 focus:ring-amber-400 focus:border-amber-400 cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: Highest Elite</option>
              </select>
            </div>

            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <Card key={i} className="rounded-[2.5rem] bg-white/5 border-white/5 border h-[420px] overflow-hidden flex flex-col justify-end p-8 gap-4 animate-pulse">
                      <div className="h-6 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                      <div className="h-12 w-full bg-white/10 rounded-2xl mt-4" />
                    </Card>
                  ))
                ) : filteredTours.length === 0 ? (
                  <div className="col-span-full py-20 px-8 flex flex-col items-center justify-center text-center bg-slate-950/45 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-3xl">
                    <div className="w-16 h-16 bg-amber-400/10 rounded-2xl flex items-center justify-center text-amber-300 mb-6 border border-amber-400/20">
                      <ShieldAlert size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">No Royal Havens Found</h3>
                    <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed font-light">
                      We couldn't find any premium packages matching your search criteria. Try modifying your search or reset the filters to start fresh.
                    </p>
                    <Button 
                      onClick={handleResetFilters}
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-2xl h-12 px-8 active:scale-95 transition-all duration-300 border-none shadow-[0_10px_25px_rgba(245,158,11,0.25)]"
                    >
                      Reset Journey Settings
                    </Button>
                  </div>
                ) : (
                  filteredTours.map((tour, i) => (
                    <motion.div 
                      key={tour.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.5 }}
                    >
                      <Card className="rounded-[2.5rem] overflow-hidden border-white/5 bg-slate-950/30 backdrop-blur-xl group cursor-pointer hover:border-amber-400/30 transition-all duration-500 shadow-2xl p-1 h-full flex flex-col">
                        <div className="relative h-72 rounded-[2.2rem] overflow-hidden m-1 bg-slate-900 shrink-0">
                          <img 
                            src={tour.image} 
                            alt={tour.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] text-slate-500 bg-slate-900" 
                            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800'; }}
                          />
                          <div className="absolute top-5 left-5">
                            <Badge className="bg-slate-950/75 backdrop-blur-md text-white border-white/10 font-black rounded-full px-3 py-1">
                              {tour.rating} <Star className="ml-1 h-3 w-3 fill-amber-400 text-amber-400 inline" />
                            </Badge>
                          </div>
                          <div className="absolute top-5 right-5">
                            <Badge className="bg-amber-400 text-slate-950 font-extrabold rounded-full px-3 py-1 border-none text-[9px] uppercase tracking-wider">
                              {tour.duration}
                            </Badge>
                          </div>
                          <button className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/15 text-white hover:bg-amber-400 hover:text-slate-950 transition-all duration-300 flex items-center justify-center z-10">
                            <Calendar size={18} />
                          </button>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                        </div>
                        <CardContent className="p-8 flex-1 flex flex-col">
                          <div className="flex items-center text-amber-400 font-extrabold text-[10px] uppercase tracking-widest mb-3">
                            <MapPin size={12} className="mr-2 text-amber-400/80" /> {tour.location}
                          </div>
                          <h3 className="text-2xl font-bold mb-4 dark:text-white tracking-tight group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 md:mr-4">{tour.title}</h3>
                          <p className="text-xs text-white/40 line-clamp-2 font-light leading-relaxed mb-6 flex-1">{tour.description}</p>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-white/15 mt-auto">
                            <div>
                              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">Start from</p>
                              <p className="text-3xl font-black text-white tracking-tighter mt-1">₹{tour.price ? tour.price.toLocaleString('en-IN') : '0'}</p>
                            </div>
                            <Link to={`/tours/${tour.id}`}>
                              <Button className="rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 font-extrabold uppercase tracking-widest text-[10px] text-slate-950 px-8 py-6 shadow-xl group/btn transition-all duration-300 active:scale-95 border-none">
                                Book <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="rounded-[3rem] border border-white/10 overflow-hidden relative shadow-3xl bg-slate-950/20">
                  <MapComponent locations={mapLocations} zoom={mapLocations.length === 1 ? 9 : 4} />
                </div>

                <div className="bg-slate-950/25 p-8 rounded-[2.5rem] border border-white/10 shadow-3xl">
                  <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4">Routes Included in Filters</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {filteredTours.length === 0 ? (
                      <p className="text-xs text-white/40 italic font-light">No destinations matched by filters to map.</p>
                    ) : (
                      filteredTours.map((t) => (
                        <Link to={`/tours/${t.id}`} key={t.id}>
                          <Badge variant="secondary" className="bg-white/5 border border-white/5 hover:border-amber-400/20 text-white/80 hover:text-white px-4 py-2.5 rounded-xl backdrop-blur-md cursor-pointer transition-all duration-300 text-[10px] uppercase tracking-wider font-extrabold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 animate-ping" />
                            {t.location}
                          </Badge>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
