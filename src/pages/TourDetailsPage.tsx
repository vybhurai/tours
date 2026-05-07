import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Users, Star, ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Clock, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Heart, Share2, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { auth, db } from '@/src/lib/firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { toast } from 'sonner';
import { MapComponent } from '@/src/components/MapComponent';

export const TourDetailsPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [guests, setGuests] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTourDetails();
  }, [id]);

  const fetchTourDetails = async () => {
    try {
      if (!id) return;
      const tourDoc = await getDoc(doc(db, 'tour_packages', id));
      if (tourDoc.exists()) {
        setTour({ id: tourDoc.id, ...tourDoc.data() });
      } else {
        // Mock fallback for demo - specific data for different fallback IDs
        const fallbackData: Record<string, any> = {
          '1': {
            title: 'Bali Serenity Retreat',
            location: 'Ubud, Bali',
            price: 1200,
            rating: 4.8,
            description: 'Experience the ultimate serene getaway in the heart of Bali. This 7-day retreat combines yoga sessions, traditional spa treatments, and visits to ancient temples. Perfect for slow-travel enthusiasts and spiritual seekers.',
            images: [
              'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
              'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600'
            ],
            highlights: ['Daily Zen Yoga & Meditation', 'Guided Ubud Monkey Forest Visit', 'Traditional 2-Hour Balinese Spa', 'Chef-led Organic Cooking Class', 'Water Temple Purification Ceremony'],
            duration: '7 Days / 6 Nights',
            locations: [
              { name: 'Ubud Village (Start)', lat: -8.5069, lng: 115.2625 },
              { name: 'Tirta Empul Water Temple', lat: -8.4116, lng: 115.2897 },
              { name: 'Tegallalang Rice Terraces', lat: -8.4350, lng: 115.2789 },
              { name: 'Mount Batur Base', lat: -8.2417, lng: 115.3858 }
            ]
          },
          '2': {
            title: 'Swiss Alps Expedition',
            location: 'Zermatt, Switzerland',
            price: 2500,
            rating: 4.9,
            description: 'Conquer the majestic peaks of Switzerland. This adventure takes you through the heart of the Alps, offering breathtaking views, high-altitude hiking, and cozy stays in mountain chalets.',
            images: [
              'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200',
              'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600'
            ],
            highlights: ['Matterhorn Summit Views', 'Glacier Express Train Ride', 'Alpine Village Exploration', 'Gourmet Fondue Experience', 'Mountain Biking Downhill Trails'],
            duration: '5 Days / 4 Nights',
            locations: [
              { name: 'Zermatt Village', lat: 46.0207, lng: 7.7491 },
              { name: 'Gornergrat Railway', lat: 45.9833, lng: 7.7833 },
              { name: 'Sunnegga Lookout', lat: 46.0167, lng: 7.7667 },
              { name: 'The Matterhorn', lat: 45.9763, lng: 7.6586 }
            ]
          },
          '3': {
            title: 'Kyoto Cultural Journey',
            location: 'Kyoto, Japan',
            price: 1800,
            rating: 4.7,
            description: 'Dive deep into the rich traditions of Japan. Visit stunning golden pavilions, participate in authentic tea ceremonies, and walk through the iconic Fushimi Inari gates.',
            images: [
              'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200',
              'https://images.unsplash.com/photo-1490806678282-46289ba80e8e?auto=format&fit=crop&q=80&w=600'
            ],
            highlights: ['Private Tea Ceremony', 'Arashiyama Bamboo Grove Walk', 'Geisha District Evening Tour', 'Zen Garden Meditation', 'Traditional Kaiseki Dinner'],
            duration: '6 Days / 5 Nights',
            locations: [
              { name: 'Kyoto Station', lat: 34.9858, lng: 135.7588 },
              { name: 'Fushimi Inari-taisha', lat: 34.9671, lng: 135.7727 },
              { name: 'Kinkaku-ji', lat: 35.0394, lng: 135.7292 },
              { name: 'Arashiyama Bamboo Grove', lat: 35.0158, lng: 135.6720 },
              { name: 'Gion District', lat: 35.0037, lng: 135.7750 }
            ]
          },
          '4': {
            title: 'Amalfi Coast Luxury',
            location: 'Positano, Italy',
            price: 3200,
            rating: 4.9,
            description: 'Indulge in Italian luxury along the most beautiful coastline in the world. Stunning cliffside views, private boat tours, and Michelin-starred dining await.',
            images: [
              'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200',
              'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=600'
            ],
            highlights: ['Private Boat Tour to Capri', 'Positano Sunset Dining', 'Limoncello Workshop', 'Pompeii Guided Vist', 'Luxury Cliffside Resort Stay'],
            duration: '5 Days / 4 Nights',
            locations: [
              { name: 'Naples Airport', lat: 40.8844, lng: 14.2908 },
              { name: 'Pompeii Excavation Site', lat: 40.7489, lng: 14.4848 },
              { name: 'Positano Village', lat: 40.6281, lng: 14.4850 },
              { name: 'Amalfi Town', lat: 40.6333, lng: 14.6000 },
              { name: 'Island of Capri', lat: 40.5500, lng: 14.2333 }
            ]
          }
        };

        const baseTour = fallbackData[id || ''] || fallbackData['1'];
        setTour({
          id: id || '1',
          ...baseTour,
          itinerary: [
            { day: 1, title: 'Arrival & Welcome Dinner', description: 'Arrive and transfer to our luxury retreat. Enjoy a traditional welcome ceremony and a multi-course organic dinner under the stars.' },
            { day: 2, title: 'Local Exploration', description: 'Guided tour of the most iconic local landmarks and cultural sites.' },
            { day: 3, title: 'Nature & Adventure', description: 'Immerse yourself in the natural beauty of the region with guided hikes and activities.' },
            { day: 4, title: 'Wellness & Spa', description: 'A day dedicated to relaxation and rejuvenation with premium spa treatments.' },
            { day: 5, title: 'Farewell & Departure', description: 'Final group breakfast and transfer back to the airport for your journey home.' }
          ]
        });
      }
    } catch (error) {
       console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!auth.currentUser) {
      toast.error('Please login to book a tour');
      return;
    }

    if (!travelDate) {
      toast.error('Please select a travel date');
      return;
    }

    try {
      const bookingData = {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        packageId: tour.id,
        packageName: tour.title,
        guests: guests,
        totalAmount: tour.price * guests,
        status: 'confirmed',
        travelDate: travelDate,
        type: 'tour',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      
      toast.success('Tour booked successfully! Processing payment...');
      setTimeout(() => {
        navigate('/payment-success');
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error('Failed to process booking');
    }
  };

  if (isLoading) return <div className="pt-24 min-h-screen flex items-center justify-center dark:text-white">Loading your adventure...</div>;

  return (
    <div className="pt-16 pb-24 min-h-screen">
      {/* Hero Carousel */}
      <div className="relative h-[75vh] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <img 
              src={tour.images?.[currentImageIndex] || tour.image}  
              className="w-full h-full object-cover shadow-2xl" 
              alt={`${tour.title} - ${currentImageIndex + 1}`}
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
                        {tour.highlights?.map((h: string, i: number) => (
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
                <div className="absolute top-0 left-0 w-full h-1 bg-sky-400" />
                <CardContent className="p-10">
                  <div className="flex items-end justify-between mb-10 pb-6 border-b border-white/10">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Per Person</p>
                      <p className="text-4xl font-bold text-white tracking-tighter">${tour.price}</p>
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
                        <p className="text-3xl font-bold text-sky-400 tracking-tighter">${tour.price * guests}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    className="w-full h-16 rounded-[1.5rem] travel-gradient text-lg font-black uppercase tracking-[0.1em] shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
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
    </div>
  );
};
