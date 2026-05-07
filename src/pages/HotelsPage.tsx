import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Building2, Wifi, Coffee, Wind, ArrowRight, Calendar as CalendarIcon, Users, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { auth, db } from '@/src/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const HotelsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const navigate = useNavigate();

  const hotels = [
    { id: 'h1', name: 'Azure Bay Resort', location: 'Maldives', price: 450, rating: 4.9, image: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&q=80&w=600' },
    { id: 'h2', name: 'The Grand Peak', location: 'Zermatt, Switzerland', price: 380, rating: 4.8, image: 'https://images.unsplash.com/photo-1551882547-ff43c63efe81?auto=format&fit=crop&q=80&w=600' },
    { id: 'h3', name: 'Kyoto Heritage Inn', location: 'Kyoto, Japan', price: 220, rating: 4.7, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600' },
    { id: 'h4', name: 'Urban Oasis Hotel', location: 'Singapore', price: 310, rating: 4.6, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600' },
  ];

  const calculateTotal = () => {
    if (!checkIn || !checkOut || !selectedHotel) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
    return nights * selectedHotel.price;
  };

  const handleBooking = async () => {
    if (!auth.currentUser) {
      toast.error('Please login to book a hotel');
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    try {
      const total = calculateTotal();
      await addDoc(collection(db, 'bookings'), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        packageId: selectedHotel.id,
        packageName: selectedHotel.name,
        type: 'hotel',
        travelDate: checkIn,
        checkOutDate: checkOut,
        guests: guests,
        totalAmount: total,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });

      toast.success('Hotel booked successfully!');
      navigate('/payment-success');
    } catch (error) {
      console.error(error);
      toast.error('Failed to book hotel');
    }
  };

  const filteredHotels = hotels.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-12 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <p className="text-sky-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-3">Premium Accommodations</p>
            <h1 className="text-5xl font-bold tracking-tighter dark:text-white">Luxury Stays</h1>
            <p className="text-slate-500 dark:text-white/40 italic font-light">Elegance meets comfort in our AI-selected resorts.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 h-4 w-4" />
            <Input 
              placeholder="Search by city or hotel name..."
              className="rounded-2xl pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-sky-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHotels.map((hotel, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-[2.5rem] overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl group cursor-pointer hover:border-white/20 transition-all duration-500 shadow-2xl p-1">
                <div className="relative h-80 rounded-[2.2rem] overflow-hidden m-1">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-5 right-5">
                    <Badge className="bg-black/40 backdrop-blur-md text-white border-white/20 font-bold rounded-full px-4 py-2">
                      {hotel.rating} <Star className="ml-1 h-3 w-3 fill-amber-400 text-amber-400 inline" />
                    </Badge>
                  </div>
                  <div className="absolute bottom-5 left-5 flex gap-2">
                    <Badge className="bg-sky-500/20 backdrop-blur-md text-sky-400 border-none"><Wifi size={14} /></Badge>
                    <Badge className="bg-sky-500/20 backdrop-blur-md text-sky-400 border-none"><Coffee size={14} /></Badge>
                    <Badge className="bg-sky-500/20 backdrop-blur-md text-sky-400 border-none"><Wind size={14} /></Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center text-sky-400 font-bold text-[10px] uppercase tracking-widest mb-3">
                    <MapPin size={12} className="mr-2" /> {hotel.location}
                  </div>
                  <h3 className="text-3xl font-bold mb-6 dark:text-white tracking-tighter">{hotel.name}</h3>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Starting at</p>
                      <p className="text-3xl font-bold text-white tracking-tighter">${hotel.price}<span className="text-sm font-normal opacity-40">/night</span></p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => setSelectedHotel(hotel)}
                          className="rounded-2xl travel-gradient px-8 py-6 font-bold shadow-xl shadow-sky-900/20 group/btn"
                        >
                          Book Stay <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-slate-900 border-white/10 text-white rounded-[2rem]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold tracking-tight">Reserve {hotel.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Check-in</label>
                              <Input 
                                type="date" 
                                className="bg-white/5 border-white/10 [color-scheme:dark]" 
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Check-out</label>
                              <Input 
                                type="date" 
                                className="bg-white/5 border-white/10 [color-scheme:dark]" 
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Guests</label>
                            <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/10">
                              <Button variant="ghost" onClick={() => setGuests(Math.max(1, guests - 1))}>-</Button>
                              <span className="font-bold">{guests}</span>
                              <Button variant="ghost" onClick={() => setGuests(guests + 1)}>+</Button>
                            </div>
                          </div>
                          <div className="pt-6 border-t border-white/10">
                             <div className="flex justify-between items-end mb-6">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Price</p>
                                  <p className="text-4xl font-bold text-sky-400 tracking-tighter">${calculateTotal()}</p>
                                </div>
                                <p className="text-xs text-white/40">Inc. taxes & fees</p>
                             </div>
                             <Button onClick={handleBooking} className="w-full travel-gradient h-14 rounded-2xl font-bold text-lg">Confirm Booking</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
