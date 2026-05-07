import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Gauge, Fuel, Cog, ArrowRight, Car, Calendar as CalendarIcon, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { auth, db } from '@/src/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const VehiclesPage = () => {
  const [vehicleType, setVehicleType] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const vehicles = [
    { id: 'v1', name: 'Porsche Taycan', type: 'Electric', price: 250, specs: '0-60 in 2.6s', image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=600', location: 'Dubai' },
    { id: 'v2', name: 'Range Rover Sport', type: 'Luxury SUV', price: 180, specs: 'All-Terrain V8', image: 'https://images.unsplash.com/photo-1563720223185-11003d516905?auto=format&fit=crop&q=80&w=600', location: 'London' },
    { id: 'v3', name: 'Tesla Model S Plaid', type: 'Electric', price: 190, specs: '1,020 hp', image: 'https://images.unsplash.com/photo-1617788138017-80ad422432a9?auto=format&fit=crop&q=80&w=600', location: 'Los Angeles' },
    { id: 'v4', name: 'Mercedes S-Class', type: 'Luxury Sedan', price: 220, specs: 'Exec Lounge', image: 'https://images.unsplash.com/photo-1554670628-1ebd33d1eaa4?auto=format&fit=crop&q=80&w=600', location: 'Paris' },
  ];

  const calculateTotal = () => {
    if (!startDate || !endDate || !selectedVehicle) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
    return days * selectedVehicle.price;
  };

  const handleBooking = async () => {
    if (!auth.currentUser) {
      toast.error('Please login to reserve a vehicle');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select pickup and return dates');
      return;
    }

    try {
      const total = calculateTotal();
      await addDoc(collection(db, 'bookings'), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        packageId: selectedVehicle.id,
        packageName: selectedVehicle.name,
        type: 'vehicle',
        travelDate: startDate,
        endDate: endDate,
        totalAmount: total,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });

      toast.success('Vehicle reserved successfully!');
      navigate('/payment-success');
    } catch (error) {
      console.error(error);
      toast.error('Failed to reserve vehicle');
    }
  };

  const filteredVehicles = vehicleType === 'All' 
    ? vehicles 
    : vehicles.filter(v => v.type.includes(vehicleType));

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <p className="text-sky-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-3">Arrive in Style</p>
            <h1 className="text-5xl font-bold tracking-tighter dark:text-white">Vehicle Rental</h1>
            <p className="text-slate-500 dark:text-white/40 italic font-light">Direct delivery to your airport or hotel doorstep.</p>
          </div>
          <div className="flex bg-white/5 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-2xl">
             {['All', 'Electric', 'Luxury', 'SUV'].map((type) => (
                <Button 
                  key={type}
                  variant={vehicleType === type ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="rounded-xl h-10 px-6 font-bold text-xs uppercase"
                  onClick={() => setVehicleType(type)}
                >
                  {type}
                </Button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVehicles.map((vehicle, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-[2.5rem] overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl group cursor-pointer hover:border-white/20 transition-all duration-500 shadow-2xl p-1">
                <div className="relative h-72 rounded-[2.2rem] overflow-hidden m-1">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-5 left-5">
                    <Badge className="bg-black/40 backdrop-blur-md text-white border-white/20 font-bold rounded-full px-4 py-2 uppercase tracking-widest text-[10px]">
                      {vehicle.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center text-sky-400 font-bold text-[10px] uppercase tracking-widest mb-3">
                    <MapPin size={12} className="mr-2" /> {vehicle.location}
                  </div>
                  <h3 className="text-3xl font-bold mb-6 dark:text-white tracking-tighter">{vehicle.name}</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <Gauge size={20} className="text-sky-400 mb-2" />
                      <p className="text-[10px] text-white/40 uppercase font-black">{vehicle.specs}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <Fuel size={20} className="text-sky-400 mb-2" />
                      <p className="text-[10px] text-white/40 uppercase font-black">Full EV</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <Cog size={20} className="text-sky-400 mb-2" />
                      <p className="text-[10px] text-white/40 uppercase font-black">Auto</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Daily Rate</p>
                      <p className="text-3xl font-bold text-white tracking-tighter">${vehicle.price}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger
                        className="rounded-2xl travel-gradient px-8 py-6 font-bold shadow-xl shadow-sky-900/20 group/btn inline-flex items-center justify-center text-white"
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        Reserve <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-slate-900 border-white/10 text-white rounded-[2rem]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold tracking-tight">Reserve {vehicle.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Pickup Date</label>
                              <Input 
                                type="date" 
                                className="bg-white/5 border-white/10 [color-scheme:dark]" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Return Date</label>
                              <Input 
                                type="date" 
                                className="bg-white/5 border-white/10 [color-scheme:dark]" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="pt-6 border-t border-white/10">
                             <div className="flex justify-between items-end mb-6">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Rental Cost</p>
                                  <p className="text-4xl font-bold text-sky-400 tracking-tighter">${calculateTotal()}</p>
                                </div>
                                <p className="text-xs text-white/40">Includes insurance</p>
                             </div>
                             <Button onClick={handleBooking} className="w-full travel-gradient h-14 rounded-2xl font-bold text-lg">Confirm Reservation</Button>
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
