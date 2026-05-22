import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Gauge, Fuel, Cog, ArrowRight, Car, Calendar as CalendarIcon, Users, BatteryCharging, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { PaymentModal } from '@/src/components/PaymentModal';
import { useNavigate } from 'react-router-dom';

export const VehiclesPage = () => {
  const [vehicleType, setVehicleType] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<any>(null);
  const navigate = useNavigate();

  const vehicles = [
    { 
      id: 'v1', name: 'Ferrari F8 Tributo', type: 'Luxury Sports', price: 45000, 
      image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800', 
      location: 'Dubai',
      features: [
        { label: '0-100', value: '2.9s', icon: <Zap size={20} className="text-sky-400 mb-2" /> },
        { label: 'Top Speed', value: '340 km/h', icon: <Gauge size={20} className="text-sky-400 mb-2" /> },
        { label: 'Horsepower', value: '710 HP', icon: <Cog size={20} className="text-sky-400 mb-2" /> },
      ]
    },
    { 
      id: 'v2', name: 'Mercedes-AMG G 63', type: 'Luxury SUV', price: 25000, 
      image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800', 
      location: 'London',
      features: [
        { label: '0-100', value: '4.5s', icon: <Zap size={20} className="text-sky-400 mb-2" /> },
        { label: 'Horsepower', value: '577 HP', icon: <Cog size={20} className="text-sky-400 mb-2" /> },
        { label: 'Top Speed', value: '220 km/h', icon: <Gauge size={20} className="text-sky-400 mb-2" /> },
      ]
    },
    { 
      id: 'v3', name: 'Tesla Model S Plaid', type: 'Electric', price: 16500, 
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800', 
      location: 'Los Angeles',
      features: [
        { label: 'Full Charge', value: '45 mins', icon: <BatteryCharging size={20} className="text-sky-400 mb-2" /> },
        { label: 'Range', value: '600 km', icon: <MapPin size={20} className="text-sky-400 mb-2" /> },
        { label: 'Capacity', value: '100 kWh', icon: <Zap size={20} className="text-sky-400 mb-2" /> },
      ]
    },
    { 
      id: 'v4', name: 'BMW 7 Series', type: 'Luxury Sedan', price: 32000, 
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800', 
      location: 'Paris',
      features: [
        { label: '0-100', value: '4.8s', icon: <Zap size={20} className="text-sky-400 mb-2" /> },
        { label: 'Horsepower', value: '563 HP', icon: <Cog size={20} className="text-sky-400 mb-2" /> },
        { label: 'Top Speed', value: '250 km/h', icon: <Gauge size={20} className="text-sky-400 mb-2" /> },
      ]
    },
  ];

  const calculateTotal = () => {
    if (!startDate || !endDate || !selectedVehicle) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
    return days * selectedVehicle.price;
  };

  const handleBooking = async () => {
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      toast.error('Please login to reserve a vehicle');
      return;
    }

    const currUser = JSON.parse(savedUser);

    if (!startDate || !endDate) {
      toast.error('Please select pickup and return dates');
      return;
    }

    const total = calculateTotal();
    const bookingData = {
      userId: currUser.uid || currUser.username,
      userName: currUser.displayName || currUser.username,
      packageId: selectedVehicle.id,
      packageName: selectedVehicle.name,
      type: 'vehicle' as const,
      startDate: startDate,
      endDate: endDate,
      travelDate: startDate,
      guests: 1,
      totalAmount: total,
    };

    setPendingBooking(bookingData);
    setIsPaymentOpen(true);
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
          {filteredVehicles.length === 0 ? (
            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                 <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-2 tracking-tight">No Vehicles Found</h3>
              <p className="text-slate-500 dark:text-white/40 mb-8 max-w-sm">Try adjusting your filters.</p>
              <Button onClick={() => setVehicleType('All')} variant="outline" className="border-sky-500/50 text-sky-400 hover:bg-sky-500/10 rounded-xl px-8 h-12 uppercase tracking-widest text-[10px] font-black">
                Reset Filters
              </Button>
            </div>
          ) : filteredVehicles.map((vehicle, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-[2.5rem] overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl group cursor-pointer hover:border-white/20 transition-all duration-500 shadow-2xl p-1 h-full flex flex-col">
                <div className="relative h-72 rounded-[2.2rem] overflow-hidden m-1 bg-slate-900 shrink-0">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 text-slate-500 bg-slate-900" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  <div className="absolute top-5 left-5 z-10">
                    <Badge className="bg-slate-950/40 backdrop-blur-md text-white border-white/20 font-bold rounded-full px-4 py-2 uppercase tracking-widest text-[10px]">
                      {vehicle.type}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
                </div>
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center text-sky-400 font-bold text-[10px] uppercase tracking-widest mb-3">
                    <MapPin size={12} className="mr-2" /> {vehicle.location}
                  </div>
                  <h3 className="text-3xl font-bold mb-6 dark:text-white tracking-tighter group-hover:text-amber-400 transition-colors duration-300">{vehicle.name}</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8 flex-1 content-start">
                    {vehicle.features.map((feature, idx) => (
                      <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                        {feature.icon}
                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">{feature.label}</p>
                        <p className="text-xs text-white font-black">{feature.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Daily Rate</p>
                      <p className="text-3xl font-black text-white tracking-tighter">₹{vehicle.price.toLocaleString('en-IN')}</p>
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
                                  <p className="text-4xl font-bold text-sky-400 tracking-tighter">₹{calculateTotal().toLocaleString('en-IN')}</p>
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
         {pendingBooking && (
          <PaymentModal
            isOpen={isPaymentOpen}
            onClose={() => setIsPaymentOpen(false)}
            bookingData={pendingBooking}
          />
        )}
      </div>
    </div>
  );
};
