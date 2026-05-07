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
  Menu,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { db } from '@/src/lib/firebase';
import { collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    pendingApprovals: 0,
    activeUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const bookingsSnap = await getDocs(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')));
      const usersSnap = await getDocs(collection(db, 'users'));
      
      const bookingsList = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
      setBookings(bookingsList);

      const revenue = bookingsList.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
      const pending = bookingsList.filter(b => b.status === 'pending').length;

      setStats({
        totalRevenue: revenue,
        totalBookings: bookingsList.length,
        pendingApprovals: pending,
        activeUsers: usersSnap.size
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
      toast.success(`Booking ${status} successfully`);
      fetchAdminData();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Management</h1>
            <p className="text-slate-500">Control center for bookings, users, and content.</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="rounded-xl">Add New Package</Button>
            <Button className="travel-gradient rounded-xl">Generate Report</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Total Bookings', value: stats.totalBookings, icon: Package, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Pending Approvals', value: stats.pendingApprovals, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Active Users', value: stats.activeUsers, icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                    <h4 className="text-2xl font-bold">{stat.value}</h4>
                  </div>
                  <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bookings Table */}
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 px-8 py-6">
            <CardTitle>Recent Booking Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-8 py-4 font-semibold">User</th>
                    <th className="px-8 py-4 font-semibold">Package</th>
                    <th className="px-8 py-4 font-semibold">Date</th>
                    <th className="px-8 py-4 font-semibold">Amount</th>
                    <th className="px-8 py-4 font-semibold">Status</th>
                    <th className="px-8 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                             {booking.userName?.[0]}
                           </div>
                           <span className="text-sm font-medium">{booking.userName || 'Unknown User'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm">{booking.packageName}</span>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500">
                        {new Date(booking.travelDate).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-700">
                        ${booking.totalAmount}
                      </td>
                      <td className="px-8 py-5">
                        <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : 'destructive'} className="capitalize px-3 py-1 rounded-full text-xs">
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-right space-x-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button size="icon" variant="ghost" onClick={() => handleStatusUpdate(booking.id, 'confirmed')} className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full">
                              <CheckCircle size={18} />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleStatusUpdate(booking.id, 'cancelled')} className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full">
                              <XCircle size={18} />
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost" className="rounded-full h-8 px-3 text-xs">View</Button>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={6} className="px-8 py-20 text-center text-slate-400">
                        No bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
