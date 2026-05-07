import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Home, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { db } from '@/src/lib/firebase';
import { updateDoc, doc } from 'firebase/firestore';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    if (bookingId) {
      updateBookingStatus();
    }
  }, [bookingId]);

  const updateBookingStatus = async () => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId!), {
        paymentStatus: 'paid',
        status: 'confirmed'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
          <div className="travel-gradient h-32 flex items-center justify-center relative">
             <div className="absolute -bottom-10 bg-white p-4 rounded-full shadow-lg">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
             </div>
          </div>
          <CardContent className="pt-16 pb-12 px-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Pack your bags! Your trip has been confirmed. You can find all the details and your invoice in your dashboard.
            </p>
            
            <div className="space-y-4">
              <Link to="/dashboard">
                <Button className="w-full h-12 rounded-full travel-gradient shadow-lg">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full h-12 rounded-full border-slate-200">
                  <Home className="mr-2 h-4 w-4" /> Return Home
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-center text-xs text-slate-400">
                <CreditCard className="mr-2 h-3 w-3" /> Booking ID: {bookingId || '---'}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
