import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  Star, 
  Compass, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Flame, 
  Sparkle,
  MessageSquare,
  Award,
  Crown,
  PlaneTakeoff,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '../lib/utils';
import { DESTINATIONS } from '../data/destinations';
import { toast } from 'sonner';

export const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeReel, setActiveReel] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/tours?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/tours');
    }
  };

  // Select a few key destinations for the high-fidelity curated bento grid
  const bentoTours = DESTINATIONS.slice(0, 4).map((dest, idx) => {
    const sizes = ['large', 'small', 'medium', 'small'];
    const matches = ['99%', '96%', '94%', '91%'];
    return {
      ...dest,
      size: sizes[idx] || 'small',
      match: matches[idx] || '95%',
    };
  });

  // Trending short packages to highlight
  const trendingPackages = DESTINATIONS.slice(4, 8);

  const stats = [
    { value: '15+', label: 'Elite Havens' },
    { value: '₹12 Cr+', label: 'Saved Bookings' },
    { value: '25,000+', label: 'VVIP Members' },
    { value: '4.98', label: 'Luxury Class Rating' },
  ];

  const memberships = [
    {
      tier: 'Voyager Club',
      price: '₹25,000',
      period: 'annually',
      description: 'Perfect for experiential travelers seeking boutique comfort and priority services.',
      perks: [
        'Premium 5-Star Boutique Concierge access',
        'Simulated offline digital wallet (₹5,000 complimentary bonus)',
        '10% off luxury vehicle fleet selection',
        'Complimentary entry passes to private city hubs'
      ],
      popular: false,
      color: 'from-blue-600/20 to-indigo-600/20'
    },
    {
      tier: 'Imperial Elite',
      price: '₹85,000',
      period: 'annually',
      description: 'The preferred corporate and leisure membership for elite global travel enthusiasts.',
      perks: [
        'Personal dedicated lifestyle concierge manager',
        'Simulated offline digital wallet (₹20,000 complimentary bonus)',
        'Unlimited luxury business-class airport transfers',
        'Guaranteed suite upgrades at partner hotels',
        'Free high-speed local shuttle services'
      ],
      popular: true,
      color: 'from-amber-600/35 to-rose-600/35'
    },
    {
      tier: 'Royal Sovereign',
      price: '₹1,80,000',
      period: 'annually',
      description: 'The ultimate pinnacle of elite bespoke leisure. Unlimited possibilities for you and your kin.',
      perks: [
        'Private chartered flight arrangements & coordination',
        'Simulated offline digital wallet (₹50,000 complimentary bonus)',
        'Lifetime access to royal events and private wine soirées',
        '24/7 dedicated medical & legal premium insurance proxy',
        'Tailor-made itineraries reviewed by global travelers'
      ],
      popular: false,
      color: 'from-purple-600/20 to-pink-600/20 font-black'
    }
  ];

  const travelReels = [
    {
      id: 1,
      title: 'Switzerland Peaks',
      location: 'Zermatt Chalets',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
      duration: '0:15'
    },
    {
      id: 2,
      title: 'Maldives Overwater',
      location: 'Maafushi Atoll',
      thumbnail: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600',
      duration: '0:22'
    },
    {
      id: 3,
      title: 'Dubai Desert Sunset',
      location: 'Al Maha Oasis',
      thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600',
      duration: '0:18'
    },
    {
      id: 4,
      title: 'Tokyo Neon Nights',
      location: 'Shibuya Crossing',
      thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=600',
      duration: '0:30'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-amber-400 selection:text-black">
      
      {/* Fullscreen Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0 scale-110">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950 z-10" />
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 12, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic Global Travel" 
            className="w-full h-full object-cover select-none object-[70%_50%]"
            onError={(e: any) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000'; }}
          />
        </div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Elegant Premium Tag */}
            <div className="inline-flex items-center gap-2 mb-2 bg-white/5 border border-white/10 backdrop-blur-2xl px-6 py-2.5 rounded-full uppercase tracking-[0.35em] font-black text-[10px] text-amber-400 shadow-2xl">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>THE SUPREME PARADIGM OF LUXURY</span>
            </div>
            
            {/* Display Typography */}
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
              Savor the Majestic.<br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Traverse Royal Destines.
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              Doff the standard. Engage in curated high-fidelity encounters. Fully simulated luxury payment, offline wallets, and elite custom itineraries tailored precisely to your budget.
            </p>

            {/* Redesigned Floating Glassmorphic Search Bar */}
            <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/15 p-3 rounded-3xl md:rounded-full max-w-5xl mx-auto shadow-[0_30px_70px_rgba(0,0,0,0.8)] border-t-white/20">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex-1 w-full relative group">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-400 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <Input 
                    placeholder="Search premium havens (e.g., Kerala, Bali, Switzerland)" 
                    className="bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 pl-14 h-14 font-medium text-sm md:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="hidden md:block w-px h-8 bg-white/15" />
                <div className="flex-1 w-full relative">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 h-5 w-5" />
                  <Input 
                    type="date"
                    className="bg-transparent border-none text-white focus-visible:ring-0 pl-14 h-14 [color-scheme:dark] font-medium"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 h-14 px-10 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
                >
                  Embark Expedition
                </Button>
              </div>
            </div>

            {/* Elegant Floating Features / Live Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto px-4">
              {[
                { label: 'DELUXE REUNIONS', value: '15+ Grand Havens', icon: <Compass className="w-4 h-4 text-amber-400" /> },
                { label: 'VVIP AIR TRANSPORTS', value: 'Indian Jets', icon: <PlaneTakeoff className="w-4 h-4 text-amber-500" /> },
                { label: 'CURRENCY TRANSPARENCY', value: 'Rupees Standard', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
                { label: 'BESPOKE TOURS', value: '100% Custom', icon: <Crown className="w-4 h-4 text-amber-500" /> },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className="bg-slate-900/35 border border-white/5 backdrop-blur-2xl rounded-2xl p-4 text-left shadow-lg flex items-center gap-3.5 hover:border-amber-400/25 duration-300 transition-all cursor-pointer hover:-translate-y-1 select-none"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-amber-400">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] font-normal text-white/40">{stat.label}</p>
                    <p className="text-xs font-black tracking-tight text-white mt-0.5">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Endless Horizontal Rolling Ribbon */}
      <section className="bg-slate-950 py-5 border-y border-white/5 relative overflow-hidden flex">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 animate-[marquee_40s_linear_infinite]">
            <div className="flex gap-16 mr-16 items-center text-[10px] uppercase font-bold tracking-[0.4em] text-white/30">
              {['SWITZERLAND', 'DUBAI', 'MALDIVES', 'PARIS', 'BALI', 'KASHMIR', 'TOKYO', 'SINGAPORE', 'GOA'].map((name, j) => (
                <span key={j} className="flex items-center gap-3">
                  <Sparkle className="w-3 h-3 text-amber-500/80" />
                  {name} <span className="opacity-40">• INR RETREATS</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Curated Bento Grid of Destinations */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-amber-400 font-extrabold tracking-[0.3em] uppercase text-[10px] mb-3">ELITE SELECTIONS</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                Curated Imperial Havens
              </h2>
              <p className="text-slate-400 text-base md:text-lg">
                Behold four of our most supreme, multi-faceted luxury packages. Styled and coded for deep aesthetic resonance. Fully formatted in ₹ INR.
              </p>
            </div>
            
            <Link to="/tours" className="group">
              <div className="w-32 h-32 rounded-full border border-white/10 flex flex-col items-center justify-center hover:scale-105 duration-500 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all cursor-pointer">
                <span className="font-extrabold uppercase text-[9px] tracking-widest flex items-center gap-1">
                  All Tours <ArrowRight className="w-3 h-3 group-hover:translate-x-1 duration-300" />
                </span>
                <span className="text-[9px] font-medium text-slate-500 group-hover:text-amber-950 mt-1">15 Destinations</span>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
            {bentoTours.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={cn(
                  "relative rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/10 bg-slate-900/30 backdrop-blur-md shadow-2xl transition-all duration-700 hover:border-white/20",
                  dest.size === 'large' ? "md:col-span-2 md:row-span-2" : 
                  dest.size === 'medium' ? "md:col-span-2 md:row-span-1" :
                  "md:col-span-1 md:row-span-1"
                )}
                onClick={() => navigate(`/tours/${dest.id}`)}
              >
                {/* Background Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                
                <motion.img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 bg-slate-900 text-slate-500" 
                  onError={(e: any) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200'; }}
                />
                
                {/* Float Badges */}
                <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                  <Badge className="bg-slate-950/85 backdrop-blur-xl text-amber-400 border-white/10 font-black tracking-widest text-[9px] px-4 py-2 rounded-full uppercase">
                    ₹{dest.price.toLocaleString('en-IN')}
                  </Badge>
                  <Badge className="bg-white/10 backdrop-blur-md text-white font-extrabold tracking-widest text-[9px] px-4 py-1.5 rounded-full uppercase">
                    {dest.match} MATCH
                  </Badge>
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[10px] font-black tracking-widest">{dest.rating} ELITE CLASS</span>
                  </div>
                  <h3 className={cn("font-black text-white tracking-tighter leading-none mb-2", dest.size === 'large' ? "text-3xl md:text-5xl" : "text-2xl")}>
                    {dest.title}
                  </h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-black mb-3 block">
                    {dest.location} • {dest.duration}
                  </p>
                  
                  {dest.size === 'large' && (
                    <p className="text-white/60 font-medium text-sm max-w-sm mb-4 line-clamp-2 md:line-clamp-3">
                      {dest.description}
                    </p>
                  )}
                  
                  <div className="flex items-center text-amber-400 group-hover:text-white transition-colors font-black uppercase text-[9px] tracking-widest">
                    Expedition Details <ArrowRight size={12} className="ml-1.5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Package Highlights */}
      <section className="py-24 bg-slate-900/30 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-amber-400 font-extrabold tracking-[0.3em] uppercase text-[10px] mb-3">HIGH LEVEL TRENDING</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Trending Global Escapes</h2>
            <p className="text-slate-400 mt-3">Discover spectacular retreats trending globally with VIP itineraries and premium flight coordinates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {trendingPackages.map((tour, idx) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                className="group relative rounded-[2rem] overflow-hidden bg-slate-950 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl p-1 shrink-0"
              >
                <div className="relative h-56 rounded-[1.8rem] overflow-hidden m-0.5 bg-slate-900">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform bg-slate-900 text-slate-500" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-slate-950/85 backdrop-blur-md text-white font-bold rounded-full px-3 py-1 text-[10px] uppercase border-white/10">
                      {tour.rating} <Star className="ml-1 h-3 w-3 fill-amber-400 text-amber-400 inline" />
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" /> {tour.location}
                  </div>
                  <h4 className="text-lg font-black text-white leading-snug line-clamp-1 mb-4">{tour.title}</h4>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Fare Begins</p>
                      <p className="text-lg font-black text-white">₹{tour.price.toLocaleString('en-IN')}</p>
                    </div>
                    <Button 
                      onClick={() => navigate(`/tours/${tour.id}`)}
                      size="sm" 
                      className="bg-white/10 hover:bg-amber-500 hover:text-slate-950 rounded-xl font-bold uppercase tracking-widest text-[9px] px-4 py-2 transition-all"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Travel Reels Showcase */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-amber-400 font-black tracking-[0.3em] uppercase text-[10px] mb-3">VIRTUAL EXPEDITIONS</p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">VVIP Immersive Travel Reels</h2>
              <p className="text-slate-400 mt-2">Catch real unfiltered luxury updates sent live from private yacht decks and premium chalets.</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-amber-400 text-slate-950 font-black tracking-widest text-[9px] px-4 py-1.5 rounded-full uppercase">LIVE TICKER</Badge>
              <Badge className="bg-white/5 border border-white/10 text-slate-300 font-extrabold tracking-widest text-[9px] px-4 py-1.5 rounded-full uppercase">15 CHANNELS</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {travelReels.map((reel) => (
              <div 
                key={reel.id}
                className="relative rounded-[2rem] h-[360px] md:h-[450px] overflow-hidden group cursor-pointer border border-white/10 hover:border-amber-400/50 transition-all duration-500 shadow-2xl bg-slate-900"
                onMouseEnter={() => setActiveReel(reel.id)}
                onMouseLeave={() => setActiveReel(null)}
              >
                {/* Shading overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 z-10 transition-all duration-300" />
                <img 
                  src={reel.thumbnail} 
                  alt={reel.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 duration-1000 transition-all bg-slate-900 text-slate-500" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800'; }}
                />
                
                {/* Play Button Indicator */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.div 
                    animate={{ scale: activeReel === reel.id ? 1.15 : 1 }}
                    className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-transparent transition-all duration-500"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </motion.div>
                </div>

                {/* Duration indicator */}
                <div className="absolute top-4 right-4 z-20 bg-slate-950/70 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold">
                  {reel.duration}
                </div>

                {/* Info and location */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h4 className="text-white font-black text-lg leading-tight tracking-tight">{reel.title}</h4>
                  <p className="text-[10px] text-amber-400 font-black tracking-widest uppercase mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" /> {reel.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Imperial Tier Membership Packages */}
      <section className="py-24 bg-slate-900/10 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-amber-400 font-black tracking-[0.3em] uppercase text-[10px] mb-3">LIFESTYLE MEMBERSHIPS</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">The Imperial Travel Clubs</h2>
            <p className="text-slate-400 mt-3">Choose an elite subscription tier. Unlock complimentary offline wallet bonuses, private concierges, and premier vehicle rental discounts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberships.map((club, i) => (
              <div 
                key={i}
                className={cn(
                  "relative rounded-[2.5rem] border p-8 flex flex-col justify-between transition-all duration-500",
                  club.popular 
                    ? "border-amber-400 bg-gradient-to-b from-amber-950/20 via-slate-950 to-slate-950 shadow-[0_20px_50px_rgba(245,158,11,0.08)] scale-102" 
                    : "border-white/10 bg-slate-900/20 backdrop-blur-md hover:border-white/20"
                )}
              >
                {club.popular && (
                  <div className="absolute top-0 right-12 -translate-y-1/2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
                    MOST PRESTIGIOUS TIER
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className={cn("w-5 h-5", club.popular ? "text-amber-400" : "text-white/40")} />
                    <span className="font-black text-xs uppercase tracking-widest text-slate-400">{club.tier}</span>
                  </div>
                  
                  <div className="flex items-baseline gap-1 my-6">
                    <span className="text-5xl font-black tracking-tight text-white">{club.price}</span>
                    <span className="text-xs text-slate-400">/ {club.period}</span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                    {club.description}
                  </p>

                  <div className="w-full h-px bg-white/10 my-6" />

                  <ul className="space-y-4 mb-8">
                    {club.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-3 text-xs text-slate-300">
                        <Sparkle className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => {
                    toast.success(`Welcome to the ${club.tier}! Our elite coordinators will connect with you.`);
                  }}
                  className={cn(
                    "w-full h-12 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all",
                    club.popular 
                      ? "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/20" 
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  )}
                >
                  Acquire Membership
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Real-time Statistics Grid */}
      <section className="bg-slate-950 py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="pt-8 md:pt-0">
                <p className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};
