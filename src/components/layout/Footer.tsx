import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-sky-500" />
              <span className="text-xl font-bold text-white">SmartTours</span>
            </div>
            <p className="text-slate-400 text-sm">
              Your intelligent travel companion for finding the perfect destinations and experiences worldwide.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-sky-500 transition-colors"><Facebook size={20} /></Link>
              <Link to="#" className="hover:text-sky-500 transition-colors"><Twitter size={20} /></Link>
              <Link to="#" className="hover:text-sky-500 transition-colors"><Instagram size={20} /></Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tours" className="hover:text-sky-500 transition-colors">All Tours</Link></li>
              <li><Link to="/hotels" className="hover:text-sky-500 transition-colors">Hotels</Link></li>
              <li><Link to="/vehicles" className="hover:text-sky-500 transition-colors">Vehicle Rentals</Link></li>
              <li><Link to="/dashboard" className="hover:text-sky-500 transition-colors">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-sky-500 transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-sky-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-sky-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-sky-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-sky-500 shrink-0" />
                <span>123 Travel Avenue, Adventure City, World 45678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-sky-500 shrink-0" />
                <span>+1 (555) 000-TRAVEL</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-sky-500 shrink-0" />
                <span>hello@smarttours.travel</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} Smart Tours & Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
