import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  BookMarked, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  CreditCard, 
  Map, 
  Settings, 
  LogOut, 
  Compass,
  History,
  Plane,
  Sparkles,
  Users,
  Leaf
} from 'lucide-react';
import { localDb } from '@/src/lib/localDb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRecommendations, generateTripPlan } from '@/src/lib/ai';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [plannerInput, setPlannerInput] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchDashboardData(userData.uid || userData.username); // Fallback if uid missing
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateItinerary = async () => {
    if (!plannerInput.trim()) return;
    setIsPlanning(true);
    try {
      const plan = await generateTripPlan(plannerInput);
      if (plan) {
        setGeneratedItinerary(plan);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPlanning(false);
    }
  };
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const getBookingsByDate = (date: Date) => {
    return recentBookings.filter(booking => {
      const bDate = new Date(booking.travelDate);
      return bDate.getDate() === date.getDate() &&
             bDate.getMonth() === date.getMonth() &&
             bDate.getFullYear() === date.getFullYear();
    });
  };

  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));

  const fetchDashboardData = async (uid: string) => {
    try {
      const userBookings = localDb.getUserBookings(uid);
      setRecentBookings(userBookings.slice(0, 5));
      
      // AI Recommendations
      const res = await getRecommendations({ budget: 'medium', interests: ['nature', 'adventure'] });
      setRecommendations(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'confirmed') return 'bg-teal-500/20 text-teal-400 border-none';
    if (s === 'pending') return 'bg-amber-500/20 text-amber-400 border-none';
    if (s === 'cancelled' || s === 'failed') return 'bg-rose-500/20 text-rose-400 border-none';
    return 'bg-slate-500/20 text-slate-400 border-none';
  };

  if (!user && !isLoading) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center p-8 glass rounded-3xl max-w-md w-full">
        <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-600">
           <LogOut size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="text-slate-500 mb-6">Please login to view your personal dashboard and bookings.</p>
        <Button className="travel-gradient w-full rounded-full" onClick={() => navigate('/')}>Return to Login</Button>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="p-8 text-center bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-teal-400 opacity-50" />
              <Avatar className="h-24 w-24 mx-auto mb-6 border-4 border-white/20 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <AvatarImage src={user?.photoURL} />
                <AvatarFallback className="bg-sky-500 text-white font-bold text-2xl">{user?.displayName?.[0] || user?.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl dark:text-white tracking-tight leading-tight mb-1">{user?.displayName || user?.username}</h3>
              <p className="text-[10px] text-sky-400 font-bold uppercase tracking-[0.2em] mb-6">Gold Member</p>
              <Button variant="outline" size="sm" className="w-full rounded-2xl border-slate-200 dark:border-white/10 text-xs font-bold py-5 hover:bg-sky-500 hover:text-white transition-all">Edit Profile</Button>
            </div>

            <nav className="space-y-2">
              {[
                { icon: BarChart3, label: 'Overview' },
                { icon: BookMarked, label: 'My Bookings' },
                { icon: Map, label: 'Plan a Trip' },
                { icon: History, label: 'Trip History' },
                { icon: CreditCard, label: 'Payments' },
                { icon: Settings, label: 'Settings' },
              ].map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full justify-start rounded-2xl px-5 py-7 text-sm font-medium transition-all ${activeTab === item.label ? 'bg-white/20 dark:bg-white/10 text-slate-900 dark:text-white shadow-lg border border-white/20' : 'text-slate-500 dark:text-white/40 hover:bg-white/10 hover:text-sky-600'}`}
                >
                  <item.icon className={`mr-4 h-5 w-5 ${activeTab === item.label ? 'text-sky-500' : ''}`} />
                  {item.label}
                </Button>
              ))}
            </nav>

            <Card className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 overflow-hidden relative">
               <div className="relative z-10">
                 <p className="text-[10px] text-white/40 mb-2 uppercase tracking-widest font-bold">My Wallet</p>
                 <p className="text-2xl font-bold dark:text-white">₹3,50,000</p>
                 <button className="mt-4 w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl text-[10px] uppercase tracking-widest font-black text-slate-950 hover:opacity-95 shadow-lg shadow-amber-500/10">Top Up Wallet</button>
               </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-10">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
               <div>
                  <h2 className="text-4xl font-bold dark:text-white tracking-tighter">{activeTab}</h2>
                  <p className="text-slate-500 dark:text-white/40 font-light italic text-sm">AI personalized insights for your next journey.</p>
               </div>
               <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-2xl p-1 border border-white/10">
                  <Badge variant="ghost" className={`px-4 py-2 font-bold ${activeTab === 'Overview' ? 'text-sky-400' : 'text-white/20'}`}>Week</Badge>
                  <Badge variant="ghost" className="px-4 py-2 font-bold text-white/20">Month</Badge>
               </div>
            </header>

            {activeTab === 'Overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                   <Card className="border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />
                      <div className="flex items-center gap-4 mb-6 text-sky-400">
                        <Plane size={24} />
                      </div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Elite Expeditions</p>
                      <h4 className="text-4xl font-bold text-white tracking-tighter">{recentBookings.length}</h4>
                   </Card>
                   <Card className="border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
                      <div className="flex items-center gap-4 mb-6 text-teal-400">
                         <Calendar size={24} />
                      </div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Upcoming</p>
                      <h4 className="text-4xl font-bold text-white tracking-tighter">2</h4>
                   </Card>
                   <Card className="border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
                      <div className="flex items-center gap-4 mb-6 text-amber-400">
                         <Sparkles size={24} />
                      </div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Loyalty Points</p>
                      <h4 className="text-4xl font-bold text-white tracking-tighter">4.2k</h4>
                   </Card>
                   <Card className="border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
                      <div className="flex items-center gap-4 mb-6 text-emerald-400">
                         <Leaf size={24} />
                      </div>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Carbon Offset</p>
                      <h4 className="text-4xl font-bold text-white tracking-tighter">12.5t</h4>
                   </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Travel DNA - Unique Feature */}
                  <Card className="lg:col-span-2 border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                           <Sparkles size={20} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white tracking-tight leading-none">Travel DNA</h4>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-black mt-1">AI Personality Profile</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {[
                          { label: 'Adventure', value: 85, color: 'bg-sky-500' },
                          { label: 'Culture', value: 42, color: 'bg-teal-500' },
                          { label: 'Luxury', value: 68, color: 'bg-amber-500' },
                          { label: 'Serenity', value: 25, color: 'bg-rose-500' },
                        ].map((dna, i) => (
                          <div key={i} className="space-y-2">
                             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                                <span>{dna.label}</span>
                                <span>{dna.value}%</span>
                             </div>
                             <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 whileInView={{ width: `${dna.value}%` }}
                                 transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                                 className={`h-full ${dna.color} shadow-[0_0_15px_rgba(14,165,233,0.3)]`} 
                               />
                             </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 p-6 bg-white/5 rounded-[2rem] border border-white/10">
                        <p className="text-xs text-white/60 italic font-light leading-relaxed">
                          "You're a <span className="text-sky-400 font-bold">High-Octane Explorer</span> with a taste for refined summits. We suggest focusing on the Swiss Alps expedition next."
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Recent Bookings */}
                  <Card className="lg:col-span-3 border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                      <CardTitle className="text-2xl font-bold dark:text-white tracking-tight">Recent Bookings</CardTitle>
                      <Button variant="ghost" onClick={() => setActiveTab('My Bookings')} className="text-sky-400 font-bold text-sm">View all</Button>
                    </CardHeader>
                    <CardContent className="p-2">
                      {recentBookings.length > 0 ? (
                        <div className="space-y-1">
                          {recentBookings.map((booking, i) => (
                            <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 rounded-3xl transition-all group cursor-pointer">
                              <div className="flex items-center space-x-5">
                                <div className="bg-sky-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                                  {booking.type === 'hotel' ? <Calendar size={24} /> : booking.type === 'vehicle' ? <Plane size={24} /> : <Compass size={24} />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-bold text-white leading-tight">{booking.packageName}</p>
                                    <Badge variant="outline" className="text-[8px] uppercase tracking-tighter h-4 border-white/10 text-white/40">{booking.type || 'tour'}</Badge>
                                  </div>
                                  <p className="text-xs text-white/40 font-light mt-1">{new Date(booking.travelDate).toLocaleDateString()} • {booking.guests || 1} Pers</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-white mb-1">₹{(booking.totalAmount || booking.totalPrice || 0).toLocaleString('en-IN')}</p>
                                <Badge className={`${getStatusBadge(booking.status)} px-4 py-1.5 rounded-full uppercase tracking-widest text-[9px] font-black`}>
                                  {booking.status || 'pending'}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-16 text-center text-white/20">
                          <BookMarked className="mx-auto mb-4 scale-150" />
                          <p className="text-sm font-bold uppercase tracking-widest">No recent bookings</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* AI Recommendations */}
                  <Card className="lg:col-span-2 border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <CardHeader className="p-8 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black">
                          <Sparkles size={16} />
                        </div>
                        <CardTitle className="text-2xl font-bold dark:text-white tracking-tight">AI Picks</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-2 space-y-2">
                       {recommendations.map((rec, i) => (
                         <div key={i} className="p-2 bg-white/5 hover:bg-white/10 rounded-[2rem] border border-white/5 flex gap-5 transition-all group cursor-pointer">
                            <div className="w-24 h-24 rounded-3xl shrink-0 overflow-hidden m-1 bg-slate-900">
                               <img src={`https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=240`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-900 text-slate-500" />
                            </div>
                            <div className="py-2 pr-4 flex flex-col justify-center">
                               <h5 className="font-bold text-white leading-tight mb-1">{rec.title}</h5>
                               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-3">{rec.location}</p>
                               <div className="flex items-center justify-between">
                                  <span className="text-sky-400 font-bold text-lg">{rec.price}</span>
                                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/10 text-white"><ChevronRight size={16} /></Button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === 'My Bookings' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Calendar Sidebar */}
                  <Card className="lg:col-span-5 border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                    
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </h3>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-full text-white/40 hover:text-white hover:bg-white/10">
                          <ChevronLeft size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-full text-white/40 hover:text-white hover:bg-white/10">
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                        <span key={d} className="text-[10px] font-black text-white/20 uppercase tracking-widest">{d}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                        const day = i + 1;
                        const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                        const hasBookings = getBookingsByDate(date).length > 0;
                        const isSelected = selectedDate?.getDate() === day &&
                                          selectedDate?.getMonth() === viewDate.getMonth() &&
                                          selectedDate?.getFullYear() === viewDate.getFullYear();
                        const isToday = new Date().toDateString() === date.toDateString();

                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedDate(date)}
                            className={`
                              relative h-10 w-10 md:h-12 md:w-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all
                              ${isSelected ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/40 ring-2 ring-sky-500/20' : 'text-white/60 hover:bg-white/5'}
                              ${isToday && !isSelected ? 'border border-sky-500/30 text-sky-400' : ''}
                            `}
                          >
                            {day}
                            {hasBookings && !isSelected && (
                              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                          {recentBookings.slice(0, 3).map((b, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-900">
                              <img src={`https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=100`} className="w-full h-full object-cover bg-slate-900 text-slate-500" />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-white/40 font-medium">You have <span className="text-sky-400 font-bold">{recentBookings.length}</span> upcoming adventures</p>
                      </div>
                    </div>
                  </Card>

                  {/* Listings Side */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                       <div>
                          <h4 className="text-2xl font-bold text-white tracking-tight">
                            {selectedDate ? selectedDate.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }) : 'Your Bookings'}
                          </h4>
                          <p className="text-white/40 text-xs mt-1 italic font-light">
                            {selectedDate ? `Reviewing plans for this specific day.` : 'Select a date to view detailed itinerary.'}
                          </p>
                       </div>
                       <Button variant="ghost" onClick={() => setSelectedDate(null)} className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-sky-400">View All</Button>
                    </div>

                    <div className="space-y-4">
                      {(selectedDate ? getBookingsByDate(selectedDate) : recentBookings).length > 0 ? (
                        (selectedDate ? getBookingsByDate(selectedDate) : recentBookings).map((booking, i) => (
                          <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] p-6 hover:bg-white/10 transition-all cursor-pointer group relative overflow-hidden">
                              <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-6">
                                  <div className="w-20 h-20 rounded-3xl overflow-hidden relative shadow-2xl bg-slate-900">
                                      <img src={`https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=200`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-900 text-slate-500" />
                                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                         {booking.type === 'hotel' ? <Calendar className="text-white" /> : booking.type === 'vehicle' ? <Plane className="text-white" /> : <Compass className="text-white" />}
                                      </div>
                                  </div>
                                  <div>
                                      <div className="flex items-center gap-3 mb-2">
                                        <h5 className="text-xl font-bold text-white tracking-tight leading-none">{booking.packageName}</h5>
                                        <Badge variant="secondary" className="bg-sky-500/10 text-sky-400 border-none text-[8px] h-4 uppercase tracking-[0.1em] font-black">{booking.type || 'tour'}</Badge>
                                      </div>
                                      <div className="flex items-center gap-3 text-white/40">
                                        <div className="flex items-center text-xs bg-slate-950/40 px-2.5 py-1 rounded-full"><Users size={10} className="mr-1.5 text-sky-400" /> {booking.guests || 1} Person</div>
                                        <div className="flex items-center text-xs bg-slate-950/40 px-2.5 py-1 rounded-full"><Sparkles size={10} className="mr-1.5 text-amber-400" /> Premium</div>
                                      </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                   <p className="text-2xl font-black text-white tracking-tighter mb-2">₹{(booking.totalAmount || booking.totalPrice || 0).toLocaleString('en-IN')}</p>
                                   <Badge className={`${getStatusBadge(booking.status)} px-4 py-1.5 rounded-full uppercase tracking-widest text-[9px] font-black`}>
                                      {booking.status || 'pending'}
                                   </Badge>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))
                      ) : (
                        <div className="p-20 text-center glass rounded-[3rem] border-white/5">
                           <div className="bg-white/5 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white/20">
                             <Calendar size={32} />
                           </div>
                           <h5 className="text-white font-bold text-xl mb-2">No Bookings Found</h5>
                           <p className="text-white/40 text-sm font-light italic">There are no adventures scheduled for this date.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Plan a Trip' && (
              <div className="space-y-8">
                <Card className="border-white/10 bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full -mr-32 -mt-32" />
                  <div className="relative z-10 max-w-2xl">
                    <Sparkles className="text-amber-400 mb-6" size={40} />
                    <h3 className="text-4xl font-bold text-white mb-6 tracking-tighter">AI Itinerary Planner</h3>
                    <p className="text-white/40 text-lg font-light mb-8 leading-relaxed">Describe your dream trip in one sentence and let our AI curate a perfect 3-day experience for you.</p>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input 
                        placeholder="e.g. A relaxing 3-day surf trip in Bali with local food..."
                        className="rounded-2xl h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 px-6 flex-1"
                        value={plannerInput}
                        onChange={(e) => setPlannerInput(e.target.value)}
                      />
                      <Button 
                        onClick={handleGenerateItinerary}
                        disabled={isPlanning}
                        className="rounded-2xl h-14 travel-gradient px-8 font-bold shadow-xl shadow-sky-900/20"
                      >
                        {isPlanning ? 'Generating...' : 'Plan My Trip'}
                      </Button>
                    </div>
                  </div>
                </Card>

                {generatedItinerary && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-bold text-white">Your Itinerary: {generatedItinerary.destination}</h4>
                      <Button variant="ghost" className="text-sky-400 font-bold">Save Itinerary</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {generatedItinerary.days.map((day: any, i: number) => (
                        <Card key={i} className="border-white/10 bg-white/5 backdrop-blur-md rounded-[2rem] p-8 shadow-xl">
                          <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-4">Day {day.day}</p>
                          <h5 className="text-xl font-bold text-white mb-6">{day.title}</h5>
                          <ul className="space-y-4">
                            {day.activities.map((act: string, j: number) => (
                              <li key={j} className="flex items-start gap-3 text-white/60 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                                {act}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
