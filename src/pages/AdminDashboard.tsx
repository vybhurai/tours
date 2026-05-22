import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  Hotel, 
  Car, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Calendar,
  Layers,
  FileText,
  Activity,
  Plus
} from 'lucide-react';
import { localDb, Booking } from '@/src/lib/localDb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    pendingApprovals: 0,
    activeUsers: 0,
    tourCount: 0,
    hotelCount: 0,
    vehicleCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if current user is admin in session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.role === 'admin' || localStorage.getItem('admin_authorized') === 'true') {
        setAuthorized(true);
        fetchAdminData();
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchAdminData = () => {
    setIsLoading(true);
    try {
      const allBookings = localDb.getBookings();
      setBookings(allBookings);

      const revenue = allBookings.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
      const pending = allBookings.filter(b => b.status === 'pending').length;
      const tours = allBookings.filter(b => b.type === 'tour').length;
      const hotels = allBookings.filter(b => b.type === 'hotel').length;
      const vehicles = allBookings.filter(b => b.type === 'vehicle').length;
      const usersCount = localDb.getUsers().length;

      setStats({
        totalRevenue: revenue,
        totalBookings: allBookings.length,
        pendingApprovals: pending,
        activeUsers: usersCount,
        tourCount: tours,
        hotelCount: hotels,
        vehicleCount: vehicles
      });
    } catch (error) {
       console.error(error);
       toast.error('Failed to load local admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyKey = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Secret Admin keys (accept 'ADMIN123' or 'admin123')
    if (adminKey.trim().toUpperCase() === 'ADMIN123' || adminKey.trim() === 'ADMIN_KEY_2026') {
      localStorage.setItem('admin_authorized', 'true');
      setAuthorized(true);
      toast.success('Security Clearance Level 3: Granted.');
      fetchAdminData();
    } else {
      toast.error('Invalid administrative secret key.');
    }
  };

  const handleStatusUpdate = (id: string, status: 'confirmed' | 'cancelled') => {
    const randomTx = 'TXN-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const updated = localDb.updateBookingStatus(id, status, status === 'confirmed' ? randomTx : undefined);
    if (updated) {
      toast.success(`Booking ${id} set to ${status.toUpperCase()} successfully`);
      fetchAdminData();
    } else {
      toast.error('Failed to resolve booking status');
    }
  };

  // Rendering verification form if unauthorized
  if (!authorized && !isLoading) {
    return (
      <div className="pt-24 min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-900 border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 travel-gradient" />
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-4 animate-pulse">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Access Restricted</h2>
            <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto">
              Please enter your 6-Digit Administrative Passcode or Admin Verification Key to unlock access.
            </p>
          </div>

          <form onSubmit={handleVerifyKey} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-white/40 ml-1">ADMIN SECRET PASSCODE</label>
              <input 
                type="password"
                placeholder="Enter ADMIN123 to unlock" 
                className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 focus:ring-1 focus:ring-sky-500/30 text-white placeholder-white/20 text-center font-bold tracking-[0.2em] outline-none"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 travel-gradient text-white font-bold rounded-xl mt-4 cursor-pointer">
              Grant Clearance
            </Button>
          </form>

          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="w-full h-11 border border-white/5 hover:bg-white/5 text-xs text-white/55 font-semibold rounded-xl mt-4 gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Safety
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:gradient-bg flex">
      {/* Sidebar navigation */}
      <aside className="hidden lg:flex flex-col w-64 bg-white/50 dark:bg-black/20 border-r border-slate-200/60 dark:border-white/5 py-8 px-4 space-y-2">
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-sky-500/15 border border-sky-500/10 rounded-2xl mb-8">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <div>
            <span className="text-[10px] font-black uppercase text-sky-400 block tracking-widest">CLEARANCE</span>
            <span className="text-xs font-bold text-slate-800 dark:text-white leading-none">ROOT ARCHITECT</span>
          </div>
        </div>

        <button className="flex items-center gap-3.5 px-4 py-3 bg-sky-500/15 border border-sky-500/10 text-sky-500 hover:text-sky-400 rounded-xl text-sm font-bold w-full text-left transition-all">
          <Activity className="w-4 h-4" /> Operations Control
        </button>
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3.5 px-4 py-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-sm font-medium w-full text-left transition-all">
          <Layers className="w-4 h-4" /> Personal Profile
        </button>
        <button onClick={() => navigate('/tours')} className="flex items-center gap-3.5 px-4 py-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-sm font-medium w-full text-left transition-all">
          <FileText className="w-4 h-4" /> Package Setup
        </button>
      </aside>

      {/* Main Container */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Control Center</h1>
            <p className="text-xs text-slate-500 dark:text-white/40 mt-1">Supervise instant transactions, process reservations, and approve client itineraries.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={fetchAdminData} className="rounded-xl border-slate-200 dark:border-white/10 dark:text-white h-11 text-xs">
              Refresh Data
            </Button>
            <Button className="travel-gradient text-white rounded-xl h-11 text-xs font-bold px-5 flex items-center gap-1.5">
              <Plus size={16} /> Deploy New Package
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Platform Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'Total Reservations', value: stats.totalBookings, icon: Package, color: 'text-sky-400', bg: 'bg-sky-500/10' },
            { label: 'Pending Approvals', value: stats.pendingApprovals, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { label: 'Active User count', value: stats.activeUsers, icon: Users, color: 'text-violet-500', bg: 'bg-violet-500/10' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-xl rounded-3xl bg-white dark:bg-slate-900 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-white/30 mb-1">{stat.label}</p>
                    <h4 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">{stat.value}</h4>
                  </div>
                  <div className={`${stat.bg} ${stat.color} p-3.5 rounded-2xl`}>
                    <stat.icon size={22} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dynamic Interactive charts section (custom beautiful CSS visuals instead of package constraints) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <Card className="border-none shadow-xl rounded-3xl bg-white dark:bg-slate-900 lg:col-span-2">
            <CardHeader className="px-8 py-5 border-b border-slate-100 dark:border-white/5">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-white/30">LATEST RESERVATIONS BY CHANNEL</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              {[
                { type: 'Tour Packages', count: stats.tourCount, percent: stats.totalBookings ? Math.round((stats.tourCount / stats.totalBookings) * 100) : 0, color: 'bg-sky-500', desc: 'Curated slower travel voyages' },
                { type: 'Luxury Hotel Stays', count: stats.hotelCount, percent: stats.totalBookings ? Math.round((stats.hotelCount / stats.totalBookings) * 100) : 0, color: 'bg-emerald-500', desc: 'High-end accommodation suite reservations' },
                { type: 'Elite Vehicle Rentals', count: stats.vehicleCount, percent: stats.totalBookings ? Math.round((stats.vehicleCount / stats.totalBookings) * 100) : 0, color: 'bg-indigo-500', desc: 'EVs and luxury SUV hires' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-white">{item.type}</span>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-sky-400">{item.count} items ({item.percent}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-3xl bg-white dark:bg-slate-900">
            <CardHeader className="px-8 py-5 border-b border-slate-100 dark:border-white/5">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-white/30">QUICK TERMINAL CONTROLS</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl flex flex-col gap-1.5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Database Engine</span>
                <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 leading-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                  Local Engine Active
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl flex flex-col gap-1.5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total User registrations</span>
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  {stats.activeUsers} Local Accounts Stored
                </p>
              </div>
              <Button 
                onClick={() => {
                  localStorage.removeItem('admin_authorized');
                  window.location.reload();
                }}
                className="w-full h-11 rounded-xl bg-rose-500/10 border border-rose-500/10 text-rose-500 hover:bg-rose-500/15 text-xs font-bold cursor-pointer"
              >
                Revoke Clearance & Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-white/5 px-8 py-6">
            <CardTitle className="text-base font-black text-slate-950 dark:text-white tracking-tight">Recent Travel Reservations Control List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-black/20 text-slate-500 dark:text-white/40 text-[10px] uppercase tracking-wider border-b border-slate-100 dark:border-white/5">
                  <tr>
                    <th className="px-8 py-4 font-black">User Account</th>
                    <th className="px-8 py-4 font-black">Category Type</th>
                    <th className="px-8 py-4 font-black">Package Item Name</th>
                    <th className="px-8 py-4 font-black">Scheduled Date</th>
                    <th className="px-8 py-4 font-black">Paid Total</th>
                    <th className="px-8 py-4 font-black">State Status</th>
                    <th className="px-8 py-4 font-black text-right">Operational Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {bookings.map((booking, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/10 flex items-center justify-center text-xs font-bold text-sky-500">
                             {booking.userName?.[0]?.toUpperCase() || 'U'}
                           </div>
                           <span className="text-sm font-semibold text-slate-900 dark:text-white">{booking.userName || 'Demo Traveler'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-xs font-bold capitalize text-slate-400">
                        {booking.type}
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{booking.packageName}</span>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500 dark:text-white/55">
                        {booking.travelDate || booking.startDate || 'N/A'}
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-slate-800 dark:text-sky-400">
                        ${booking.totalAmount}
                      </td>
                      <td className="px-8 py-5">
                        <Badge className={`capitalize px-3 py-1 rounded-full text-[10px] font-bold border-none ${
                          booking.status === 'confirmed' 
                            ? 'bg-teal-500/20 text-teal-400' 
                            : booking.status === 'pending' 
                            ? 'bg-amber-500/20 text-amber-400 animate-pulse' 
                            : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-right space-x-2">
                        {booking.status === 'pending' ? (
                          <div className="inline-flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleStatusUpdate(booking.id, 'confirmed')} 
                              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg h-9 px-3.5 gap-1 cursor-pointer"
                            >
                              <CheckCircle size={14} /> Approve Pay
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')} 
                              className="text-rose-500 hover:bg-rose-500/10 border border-rose-500/10 font-bold rounded-lg h-9 px-3 gap-1 cursor-pointer"
                            >
                              <XCircle size={14} /> Decline
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Voucher Finalized</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={7} className="px-8 py-20 text-center text-slate-400">
                        No platform bookings have registered offline yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
