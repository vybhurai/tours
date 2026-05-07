import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, User, LogOut, Menu, X, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth, googleProvider } from '@/src/lib/firebase';
import { onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { toast } from 'sonner';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setUser(user);
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setIsAdmin(userDoc.data().role === 'admin');
          } else {
            // New user registration
            const userData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: 'user',
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, userData);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Auth State Error:", error);
        toast.error("Failed to sync user data");
      } finally {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleLogin = async () => {
    console.log("Login button clicked");
    toast.info("Opening Google sign-in...");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        console.log("Login successful:", result.user.email);
        toast.success(`Welcome, ${result.user.displayName}!`);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error.code === 'auth/popup-blocked') {
        toast.error("Please allow popups to sign in");
      } else if (error.code === 'auth/cancelled-popup-request') {
        // User closed the popup, don't show error
        console.log("Popup cancelled by user");
      } else {
        toast.error("Failed to login: " + (error.message || "Unknown error"));
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/20 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SmartTour</span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            <Link to="/tours" className="text-slate-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-white transition-colors text-sm font-medium">Explore Tours</Link>
            <Link to="/trip-planner" className="flex items-center gap-2 text-slate-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-white transition-colors text-sm font-bold">
              <Sparkles className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform" /> 
              <span>AI Planner</span>
            </Link>
            <Link to="/hotels" className="text-slate-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-white transition-colors text-sm font-medium">Hotel Stays</Link>
            <Link to="/vehicles" className="text-slate-600 dark:text-white/60 hover:text-sky-600 dark:hover:text-white transition-colors text-sm font-medium">Vehicle Rental</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8 ring-2 ring-sky-500/20 ring-offset-2">
                    <AvatarImage src={user.photoURL} />
                    <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <ShieldAlert className="mr-2 h-4 w-4" /> Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLogin} className="travel-gradient text-white rounded-full px-6">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
