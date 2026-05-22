import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Home, CreditCard, ArrowRight, Printer, Share2, Calendar, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { localDb } from '@/src/lib/localDb';
import { toast } from 'sonner';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const txParam = searchParams.get('txCode');
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (bookingId) {
      const bList = localDb.getBookings();
      const match = bList.find((b: any) => b.id === bookingId);
      if (match) {
        setBooking(match);
      }
    }
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Receipt receipt-link copied to clipboard!');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950/40 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full"
      >
        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-slate-900">
          {/* Header */}
          <div className="travel-gradient h-36 flex flex-col items-center justify-center relative px-6 text-center text-white">
            <div className="absolute -bottom-8 bg-white dark:bg-slate-900 p-3 rounded-full shadow-lg border border-slate-50 dark:border-white/5">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
          </div>

          <CardContent className="pt-12 pb-10 px-8 text-center printable-area">
            <h1 className="text-3xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">Booking Confirmed!</h1>
            <p className="text-sm text-slate-500 dark:text-white/40 mb-8 max-w-sm mx-auto leading-relaxed">
              Pack your bags! Your payment has been authorized and your reservation vouchers are issued.
            </p>

            {/* Simulated Downloadable Invoice Section */}
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-2xl p-6 text-left mb-8 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/60 dark:border-white/5">
                <div>
                  <span className="text-[9px] font-bold text-sky-500 uppercase tracking-widest">OFFICIAL INVOICE</span>
                  <h4 className="text-sm font-black text-slate-800 dark:text-white">{booking?.packageName || 'Slow-travel Package'}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Receipt No.</span>
                  <p className="font-mono text-xs font-bold text-slate-900 dark:text-teal-400">{booking?.paymentRef || txParam || 'TXN-PENDING'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                <div>
                  <span className="text-slate-400 flex items-center gap-1"><User className="w-3 h-3 text-sky-400" /> Beneficiary:</span>
                  <p className="font-bold text-slate-800 dark:text-white mt-0.5">{booking?.userName || 'Traveler Session'}</p>
                </div>
                <div>
                  <span className="text-slate-400 flex items-center gap-1"><FileText className="w-3 h-3 text-sky-400" /> Booking Reference:</span>
                  <p className="font-mono font-bold text-slate-800 dark:text-white mt-0.5">{booking?.id || bookingId || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3 text-sky-400" /> Transaction Date:</span>
                  <p className="font-semibold text-slate-800 dark:text-white mt-0.5">
                    {booking?.paymentTimestamp ? new Date(booking.paymentTimestamp).toLocaleString() : new Date().toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 flex items-center gap-1"><CreditCard className="w-3 h-3 text-sky-400" /> Payment Route:</span>
                  <p className="font-semibold text-slate-800 dark:text-white mt-0.5">Secure Credit Merchant</p>
                </div>
              </div>

              {/* Items Summary Table */}
              <div className="border-t border-slate-200/60 dark:border-white/5 pt-4 space-y-2">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Billing Specification</span>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-500 dark:text-slate-400">{booking?.packageName} ({booking?.guests || 1} traveler{booking?.guests > 1 ? 's' : ''})</span>
                  <span className="font-bold text-slate-800 dark:text-white">₹{(booking?.totalAmount || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-slate-500 dark:text-slate-400">Merchant Service Taxes (VAT Exempt)</span>
                  <span className="text-slate-400 font-medium">₹0.00</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 dark:border-white/10 pt-3 mt-2 text-sm font-black">
                  <span className="text-slate-900 dark:text-white text-xs uppercase tracking-wider">Total Paid (INR):</span>
                  <span className="text-sky-500 text-base">₹{(booking?.totalAmount || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Operations Tool Bar */}
            <div className="flex gap-4 mb-8 no-print">
              <Button onClick={handlePrint} variant="outline" className="flex-1 rounded-xl h-12 border-slate-200 flex gap-2">
                <Printer className="w-4 h-4" /> Download/Print Invoice
              </Button>
              <Button onClick={handleShare} variant="outline" className="rounded-xl h-12 px-4 border-slate-200 flex gap-2">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </div>
            
            <div className="flex flex-col gap-3 no-print">
              <Link to="/dashboard" className="w-full">
                <Button className="w-full h-12 rounded-xl travel-gradient shadow-lg font-bold">
                  Go to Personal Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/" className="w-full">
                <Button variant="ghost" className="w-full h-12 rounded-xl border border-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 font-medium">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

