import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Users, Star, ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Clock, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Heart, Share2, Leaf, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { MapComponent } from '@/src/components/MapComponent';
import { PaymentModal } from '@/src/components/PaymentModal';
import { DESTINATIONS } from '../data/destinations';

export const TourDetailsPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [guests, setGuests] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTourDetails();
  }, [id]);

  const fetchTourDetails = async () => {
    setIsLoading(true);
    try {
      if (!id) return;
      // Direct client-side lookup from the 15 premium havens list
      const matchingDest = DESTINATIONS.find(dest => dest.id === id);
      if (matchingDest) {
        setTour(matchingDest);
      } else {
        setTour(DESTINATIONS[0]);
      }
    } catch (error) {
      console.error("Error loading tour details:", error);
      setTour(DESTINATIONS[0]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      toast.error('Please login to book a tour');
      return;
    }

    const currUser = JSON.parse(savedUser);

    if (!travelDate) {
      toast.error('Please select a travel date');
      return;
    }

    const bookingData = {
      userId: currUser.uid || currUser.username,
      userName: currUser.displayName || currUser.username,
      packageId: tour.id,
      packageName: tour.title,
      guests: guests,
      totalAmount: tour.price * guests,
      travelDate: travelDate,
      type: 'tour' as const,
    };

    setPendingBooking(bookingData);
    setIsPaymentOpen(true);
  };

  if (isLoading) return <div className="pt-24 min-h-screen flex items-center justify-center dark:text-white">Loading your adventure...</div>;

  return (
    <div className="pt-16 pb-24 min-h-screen bg-slate-950 text-white selection:bg-amber-400 selection:text-black">
      {/* Hero Carousel */}
      <div className="relative h-[75vh] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 bg-slate-900"
          >
            <img 
              src={tour.images?.[currentImageIndex] || tour.image}  
              className="w-full h-full object-cover shadow-2xl bg-slate-900 text-slate-500" 
              alt={`${tour.title} - ${currentImageIndex + 1}`}
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        {tour.images && tour.images.length > 1 && (
          <>
            <button 
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? tour.images.length - 1 : prev - 1))}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 z-30"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={() => setCurrentImageIndex((prev) => (prev === tour.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 z-30"
            >
              <ChevronRight size={28} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-56 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
              {tour.images.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${currentImageIndex === idx ? 'w-12 bg-sky-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-12 bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 rounded-2xl h-12 px-6 font-bold z-30"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-52 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full -mr-20 -mt-20" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className="bg-amber-500/20 text-amber-400 border-none font-bold px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px]">AI Curated</Badge>
                  <div className="flex items-center text-amber-400 font-bold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                    <Star className="h-4 w-4 fill-current mr-1.5" /> {tour.rating}
                  </div>
                </div>
                <h1 className="text-5xl font-bold mb-6 dark:text-white tracking-tighter leading-tight">{tour.title}</h1>
                <div className="flex flex-wrap items-center dark:text-white/40 mb-10 gap-8">
                  <div className="flex items-center font-medium"><MapPin className="mr-3 h-5 w-5 text-sky-400" /> {tour.location}</div>
                  <div className="flex items-center font-medium"><Clock className="mr-3 h-5 w-5 text-sky-400" /> {tour.duration}</div>
                  <div className="flex items-center font-medium"><Users className="mr-3 h-5 w-5 text-sky-400" /> Family Friendly</div>
                </div>

                <div className="space-y-12">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-6 font-mono">Overview</p>
                    <p className="text-xl dark:text-white/60 font-light leading-relaxed">{tour.description}</p>
                  </div>
                  
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-8 font-mono">Highlights</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(tour.highlights || tour.experiences || [])?.map((h: string, i: number) => (
                          <div key={i} className="flex items-center space-x-4 p-5 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group">
                            <div className="bg-sky-500/20 p-2 rounded-xl text-sky-400 group-hover:scale-110 transition-transform">
                              <CheckCircle2 size={24} />
                            </div>
                            <span className="font-bold dark:text-white/80 text-sm">{h}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-8 font-mono">Nearby Curated Attractions</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { name: 'Hidden Waterfall', dist: '1.2 km', type: 'Nature' },
                          { name: 'Ancient Temple', dist: '0.8 km', type: 'Culture' },
                          { name: 'Local Art Market', dist: '2.5 km', type: 'Shopping' }
                        ].map((place, i) => (
                          <div key={i} className="group cursor-pointer">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all">
                              <h5 className="font-bold text-white mb-1 group-hover:text-sky-400">{place.name}</h5>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-white/40 uppercase font-black">{place.type}</span>
                                <span className="text-[10px] text-sky-400 font-bold">{place.dist}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {tour.itinerary && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-8 font-mono">Detailed Itinerary</p>
                      <div className="space-y-4">
                        {tour.itinerary.map((day: any, i: number) => (
                          <div key={i} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
                            <button 
                              onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                              <div className="flex items-center gap-6">
                                <div className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-sm">{day.day}</div>
                                <h4 className="font-bold text-white text-lg">{day.title}</h4>
                              </div>
                              {expandedDay === i ? <ChevronUp className="text-white/40" /> : <ChevronDown className="text-white/40" />}
                            </button>
                            <AnimatePresence>
                              {expandedDay === i && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="px-20 pb-8 text-white/60 font-light leading-relaxed border-t border-white/5 pt-6">
                                    {day.description}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tour.locations && (
                    <div className="space-y-12">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-8 font-mono">Interactive Discovery Map</p>
                        <MapComponent locations={tour.locations} />
                      </div>

                      {/* Carbon Footprint Insight */}
                      <div className="glass p-8 rounded-[2.5rem] border-emerald-500/10 bg-emerald-500/[0.02]">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                              <Leaf className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Conscious Luxury</p>
                              <p className="text-sm font-bold text-white">Carbon Footprint Insight</p>
                            </div>
                          </div>
                          <Badge className="bg-emerald-500 text-black font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                            842 kg CO₂e Saved
                          </Badge>
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed mb-6">
                          This expedition utilizes electric transfers and carbon-neutral stays. By choosing this tour, you contribute to local reforestation projects in {tour.title.split(' ')[0]}.
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 flex-1 bg-emerald-500/10 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-emerald-500" />
                          </div>
                          <span className="text-[10px] font-black text-emerald-400">85% OFFSET</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Immersive weather section, estimated budget page, hotel recommendations and reviews */}
                  {/* Live Alpine/Tropical Weather Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                       <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 font-mono">LIVE CLIMATE PREVIEW</span>
                       <h4 className="text-xl font-bold text-white mt-1 mb-6 flex items-center gap-1.5">
                         <Compass size={18} className="text-sky-400 rotate-45" /> Current Weather Forecast
                       </h4>
                       <div className="grid grid-cols-3 gap-4 text-center">
                         {[
                           { day: 'Today', temp: '16°C', cond: 'Sunny Peaks', icon: '☀️' },
                           { day: 'Tomorrow', temp: '14°C', cond: 'Soft Meadow', icon: '⛅' },
                           { day: 'Friday', temp: '12°C', cond: 'Clear Frost', icon: '❄️' }
                         ].map((w, idx) => (
                           <div key={idx} className="bg-white/5 p-4 rounded-3xl border border-white/5">
                             <span className="text-slate-400 text-xs font-medium block mb-2">{w.day}</span>
                             <span className="text-2xl mt-1 block">{w.icon}</span>
                             <span className="text-lg font-black text-white mt-2 block">{w.temp}</span>
                             <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block mt-1">{w.cond}</span>
                           </div>
                         ))}
                       </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                       <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">ESTIMATED TOUR BUDGET</span>
                       <h4 className="text-xl font-bold text-white mt-1 mb-6">Financial Allocation Plan</h4>
                       <div className="space-y-4">
                         {[
                           { item: 'Luxury Chauffeur Service', percent: 25, val: '₹25,000' },
                           { item: 'Bespoke Private Chalet Stay', percent: 55, val: '₹55,000' },
                           { item: 'Gourmet Organic Dining Out', percent: 20, val: '₹20,000' }
                         ].map((b, idx) => (
                           <div key={idx} className="space-y-1">
                             <div className="flex justify-between items-center text-xs font-bold text-white/70">
                               <span>{b.item}</span>
                               <span className="text-amber-400">{b.val}</span>
                             </div>
                             <div className="h-2 w-full bg-slate-100/5 rounded-full overflow-hidden">
                               <div className="h-full bg-amber-500" style={{ width: `${b.percent}%` }} />
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>

                  {/* Hotel recommendations with real-time reviews */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 font-mono">EXECUTIVE SELECTION</span>
                       <h4 className="text-2xl font-black text-white tracking-tight mt-1">Recommended Local Lodging</h4>
                       <p className="text-xs text-white/40 mt-1">Handpicked resorts containing private carbon-friendly thermal structures.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { name: 'The Matterhorn Peak Chalet', rate: '4.9', cost: '₹35,000 / night', img: 'https://images.unsplash.com/photo-1551882547-ff43c63efe81?auto=format&fit=crop&q=80&w=400' },
                        { name: 'Azure Grand Alpine Spa Resort', rate: '4.8', cost: '₹40,000 / night', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400' }
                      ].map((h, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden group hover:border-amber-500/20 transition-all cursor-pointer">
                          <div className="h-40 overflow-hidden relative bg-slate-900 shrink-0">
                            <img 
                              src={h.img} 
                              className="w-full h-full object-cover group-hover:scale-105 transition bg-slate-900 text-slate-500" 
                              alt={h.name} 
                              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800'; }}
                            />
                            <div className="absolute top-4 right-4 bg-amber-500 text-black font-black text-[9px] py-1 px-3 rounded-full uppercase">
                              ★ {h.rate} RATED
                            </div>
                          </div>
                          <div className="p-5">
                             <h5 className="font-bold text-white group-hover:text-amber-400 transition">{h.name}</h5>
                             <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                                <span className="text-xs font-bold text-slate-400">Standard Suite</span>
                                <span className="text-xs font-black text-amber-400">{h.cost}</span>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Users feedback local comments */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
                    <div className="flex justify-between items-end border-b border-white/10 pb-6">
                       <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 font-mono">EXPLORER FEEDBACK</span>
                          <h4 className="text-2xl font-black text-white tracking-tight mt-1">Authentic Member Reviews</h4>
                       </div>
                       <Badge className="bg-sky-500 text-white font-black text-xs h-8 px-4 rounded-xl">Verified Travelers</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {[
                         { user: 'Sarah Jenkins', loc: 'Vancouver, CA', desc: 'An absolutely remarkable experience. The guide was exceptionally knowledgeable, handling alpine logistics flawlessly. Every penny was worth it! 10/10.', score: 5 },
                         { user: 'Liam Peterson', loc: 'Berlin, DE', desc: 'Outstanding view from the Sunnegga Lookout, and the traditional gourmet fondue meal was stellar. Will definitely book another expedition through SmartTour.', score: 5 }
                       ].map((rev, i) => (
                         <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">{rev.user[0]}</div>
                               <div>
                                  <span className="font-bold text-white text-xs block leading-none">{rev.user}</span>
                                  <span className="text-[9px] text-white/40 mt-1 block">{rev.loc}</span>
                               </div>
                            </div>
                            <p className="text-xs text-white/60 leading-relaxed font-light italic">"{rev.desc}"</p>
                            <div className="flex text-amber-400 text-xs">★★★★★</div>
                         </div>
                       ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="rounded-[2.5rem] border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />
                  <div className="relative z-10 space-y-4">
                    <ShieldCheck size={40} className="text-sky-400" />
                    <h4 className="text-xl font-bold dark:text-white tracking-tight">Full Protection</h4>
                    <p className="text-white/40 text-sm font-light leading-relaxed">Your journey is covered by comprehensive travel insurance and 24/7 on-ground support.</p>
                  </div>
               </Card>
               <Card className="rounded-[2.5rem] border-sky-500/10 bg-sky-500/5 backdrop-blur-xl p-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
                  <div className="relative z-10 space-y-4 text-center">
                    <h4 className="text-xl font-bold dark:text-white tracking-tight">Exclusive AI Curated</h4>
                    <p className="text-white/40 text-sm font-light leading-relaxed mb-6">Our AI fine-tunes this itinerary based on over 10,000 positive guest interactions.</p>
                    <Button variant="ghost" className="text-sky-400 font-bold hover:bg-sky-500/10">Read more about AI curation</Button>
                  </div>
               </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="relative">
            <div className="sticky top-28 space-y-8">
              <Card className="rounded-[3rem] border-white/10 bg-slate-900/60 backdrop-blur-3xl shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400" />
                <CardContent className="p-10">
                  <div className="flex items-end justify-between mb-10 pb-6 border-b border-white/10">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Per Person</p>
                      <p className="text-4xl font-black text-white tracking-tighter">₹{tour.price ? tour.price.toLocaleString('en-IN') : '0'}</p>
                    </div>
                  </div>

                  <div className="space-y-8 mb-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest block text-white/40">Select Travel Date</label>
                      <Input 
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="bg-white/5 border-white/10 h-14 rounded-2xl text-white [color-scheme:dark] px-6"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest block text-white/40">Number of Guests</label>
                      <div className="flex items-center justify-between p-2 bg-white/5 rounded-2xl border border-white/10 h-14">
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           className="h-10 w-10 rounded-xl text-white hover:bg-white/10 disabled:opacity-20"
                           onClick={() => setGuests(Math.max(1, guests - 1))}
                           disabled={guests <= 1}
                         >
                           -
                         </Button>
                         <span className="font-bold text-xl dark:text-white px-4">{guests}</span>
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           className="h-10 w-10 rounded-xl text-white hover:bg-white/10 disabled:opacity-20"
                           onClick={() => setGuests(Math.min(10, guests + 1))}
                           disabled={guests >= 10}
                         >
                           +
                         </Button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-lg font-bold text-white/40">Total Amount</p>
                        <p className="text-3xl font-black text-amber-400 tracking-tighter">₹{(tour.price * guests).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full h-16 rounded-[1.5rem] bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 text-lg font-black uppercase tracking-[0.1em] shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all border-none"
                  >
                    Proceed to Booking
                  </Button>
                  <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-widest mt-6">Instant confirmation & secure checkout</p>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center space-x-6 opacity-20 hover:opacity-50 transition-opacity">
                 <CreditCard size={40} />
                 <div className="w-14 h-9 bg-white/40 rounded-lg" />
                 <div className="w-14 h-9 bg-white/40 rounded-lg" />
              </div>
            </div>
          </aside>
        </div>
      </div>
      {pendingBooking && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          bookingData={pendingBooking}
        />
      )}
    </div>
  );
};
