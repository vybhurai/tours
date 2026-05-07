import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { ToursPage } from './pages/ToursPage';
import { TourDetailsPage } from './pages/TourDetailsPage';
import { HotelsPage } from './pages/HotelsPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { AIChatbot } from './components/AIChatbot';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:gradient-bg text-slate-900 dark:text-white transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/tours/:id" element={<TourDetailsPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Fallback routes */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Footer />
          <AIChatbot />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
