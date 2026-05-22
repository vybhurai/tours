import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, CheckCircle2, XCircle, ShieldCheck, RefreshCw, Smartphone, Wallet, Shield } from 'lucide-react';
import { localDb, Booking } from '@/src/lib/localDb';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    userId: string;
    userName: string;
    packageId: string;
    packageName: string;
    type: 'tour' | 'hotel' | 'vehicle';
    startDate?: string;
    endDate?: string;
    travelDate?: string;
    guests: number;
    totalAmount: number;
    roomType?: string;
    vehicleType?: string;
    location?: string;
  };
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, bookingData }) => {
  const [step, setStep] = useState<'confirm' | 'processing' | 'success' | 'cancelled'>('confirm');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'crypto'>('card');
  const [loaderMessage, setLoaderMessage] = useState('Initiating secure gateway...');
  const [bookingRef, setBookingRef] = useState('');
  const [refNum, setRefNum] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePayYes = () => {
    setStep('processing');
    
    // Step 1: Gateway Link
    setTimeout(() => {
      setLoaderMessage('Contacting payment merchant and validating deposit...');
    }, 1000);

    // Step 2: Clearing check
    setTimeout(() => {
      setLoaderMessage('Securing travel vouchers and verifying itinerary space...');
    }, 2000);

    // Step 3: Success state
    setTimeout(() => {
      const txCode = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Save confirmed booking in localDb
      const newBooking = localDb.addBooking({
        ...bookingData,
        status: 'confirmed',
        paymentRef: txCode,
        paymentTimestamp: new Date().toISOString()
      });

      setBookingRef(newBooking.id);
      setRefNum(txCode);
      setStep('success');
      toast.success('Payment authorized and verified!');
    }, 3200);
  };

  const handlePayNo = () => {
    setStep('cancelled');
    
    // Save pending booking in localDb
    const newBooking = localDb.addBooking({
      ...bookingData,
      status: 'pending'
    });

    setBookingRef(newBooking.id);
    toast.error('Payment cancelled. Reservation saved as Pending.');
    setRefNum('ST-PND-' + Math.random().toString(36).substr(2, 5).toUpperCase());
  };

  const handleSuccessRedirect = () => {
    onClose();
    navigate(`/payment-success?bookingId=${bookingRef}&txCode=${refNum}`);
  };

  const handleBackToPlanner = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 'confirm' ? onClose : undefined}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl z-10"
        >
          {step === 'confirm' && (
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-500 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    <Shield className="w-3.5 h-3.5" /> Secure Checkout
                  </div>
                  <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Complete Payment?</h3>
                  <p className="text-xs text-slate-500 dark:text-white/40 mt-1">Confirm your luxury premium reservation.</p>
                </div>
              </div>

              {/* Booking Info Box */}
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-5 rounded-2xl mb-6 space-y-3.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{bookingData.type} package</span>
                    <h4 className="text-base font-bold text-slate-950 dark:text-white leading-tight mt-0.5">{bookingData.packageName}</h4>
                  </div>
                  <span className="text-lg font-black text-sky-500">₹{bookingData.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="border-t border-slate-100 dark:border-white/5 pt-3 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Traveler:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{bookingData.userName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Details:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                      {bookingData.guests} Guest{bookingData.guests > 1 ? 's' : ''}
                      {bookingData.roomType ? ` • ${bookingData.roomType}` : ''}
                      {bookingData.vehicleType ? ` • ${bookingData.vehicleType}` : ''}
                    </p>
                  </div>
                </div>

                {bookingData.travelDate && (
                  <div className="border-t border-slate-100 dark:border-white/5 pt-3 text-xs flex justify-between">
                    <span className="text-slate-400">Booking Date:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{bookingData.travelDate}</span>
                  </div>
                )}
                {bookingData.startDate && (
                  <div className="border-t border-slate-100 dark:border-white/5 pt-3 text-xs flex justify-between">
                    <span className="text-slate-400">Duration Period:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{bookingData.startDate} to {bookingData.endDate}</span>
                  </div>
                )}
              </div>

              {/* Payment Methods Selection */}
              <div className="mb-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/40 mb-3.5 block ml-1">Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', name: 'Credit Card', icon: CreditCard },
                    { id: 'wallet', name: 'PayWallet', icon: Wallet },
                    { id: 'crypto', name: 'Secure Pay', icon: Smartphone }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex flex-col items-center justify-center p-3.5 border rounded-2xl transition-all cursor-pointer ${
                        paymentMethod === method.id
                          ? 'border-sky-500 bg-sky-500/10 text-sky-500'
                          : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <method.icon className="w-5 h-5 mb-1.5" />
                      <span className="text-[11px] font-bold">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Secure statement */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-emerald-500/10 border border-emerald-500/10 dark:bg-emerald-500/5 p-3 rounded-xl mb-6">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Simulating an AES-256 secure encrypted sandbox transaction. Money will not be deducted.</span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handlePayNo}
                  className="py-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 font-bold text-sm transition-all cursor-pointer"
                >
                  No, Hold Booking
                </button>
                <button 
                  onClick={handlePayYes}
                  className="py-4 rounded-xl travel-gradient hover:opacity-90 text-white font-bold text-sm transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Yes, Pay Now
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
                className="w-16 h-16 border-4 border-sky-400 border-t-transparent rounded-full flex items-center justify-center mb-6"
              />
              <span className="text-xl font-bold text-slate-900 dark:text-white">Security Transit Active</span>
              <p className="text-xs text-slate-400 mt-2 max-w-sm h-8 flex items-center justify-center transition-colors">
                {loaderMessage}
              </p>
              
              <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden mt-6 max-w-xs">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.2, ease: 'easeInOut' }}
                  className="h-full bg-sky-500"
                />
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="p-8 text-center flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, 0] }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Payment Authorized!</h3>
              <p className="text-xs text-slate-500 dark:text-white/40 mt-1 max-w-sm">Your booking reference #{bookingRef} is now confirmed. Safe travels!</p>

              <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl w-full my-6 text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-emerald-400">{refNum}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Authorized:</span>
                  <span className="font-semibold text-slate-800 dark:text-white">Yes, simulated deposit</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Terminal:</span>
                  <span className="text-slate-400 font-mono">AIS-CLR-RUN-NODE</span>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={handleSuccessRedirect}
                  className="flex-1 py-4 rounded-xl travel-gradient hover:opacity-90 text-white font-bold text-sm transition-all cursor-pointer"
                >
                  View Invoice & Receipt
                </button>
              </div>
            </div>
          )}

          {step === 'cancelled' && (
            <div className="p-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6">
                <XCircle className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Payment Cancelled</h3>
              <p className="text-xs text-slate-500 dark:text-white/40 mt-1 max-w-sm">We have saved your travel spots! The reservation status has been set to Pending.</p>

              <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-2xl w-full my-6 text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Order Reference:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-white">{bookingRef}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-amber-500 uppercase">PENDING APPROVAL</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Payment Status:</span>
                  <span className="text-rose-400">Unpaid / Deferred</span>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 font-bold text-sm transition-all cursor-pointer"
                >
                  Go Back to Tour Page
                </button>
                <button 
                  onClick={handleBackToPlanner}
                  className="flex-1 py-4 rounded-xl travel-gradient text-white font-bold text-sm transition-all cursor-pointer"
                >
                  Manage on Dashboard
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
