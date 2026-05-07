import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, User, LogOut, Menu, X, ShieldAlert, Sparkles, Compass, Sun, Moon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/src/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTheme } from 'next-themes';

import { toast } from 'sonner';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAdmin(userData.role === 'admin');
    }
  }, []);

  const handleLocalAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a brief processing time for better UX
    setTimeout(() => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

        if (authMode === 'signup') {
          // Check if username already exists
          const existingUser = storedUsers.find((u: any) => u.username === username.trim().toLowerCase());
          if (existingUser) {
            toast.error("Username already taken. Please choose another.");
            setIsLoading(false);
            return;
          }

          const newUser = {
            uid: 'u-' + Math.random().toString(36).substr(2, 9),
            username: username.trim().toLowerCase(),
            password: password, // Note: In a production app, never store passwords in plain text
            displayName: displayName || username,
            role: username.toLowerCase() === 'admin' ? 'admin' : 'user',
            createdAt: new Date().toISOString()
          };

          storedUsers.push(newUser);
          localStorage.setItem('users', JSON.stringify(storedUsers));
          
          // Auto-login after signup
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          setUser(newUser);
          setIsAdmin(newUser.role === 'admin');
          toast.success("Account created successfully!");
        } else {
          // Login logic
          const foundUser = storedUsers.find(
            (u: any) => u.username === username.trim().toLowerCase() && u.password === password
          );

          if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            setUser(foundUser);
            setIsAdmin(foundUser.role === 'admin');
            toast.success(`Welcome back, ${foundUser.displayName}!`);
          } else {
            toast.error("Invalid username or password.");
            setIsLoading(false);
            return;
          }
        }

        setIsAuthDialogOpen(false);
        navigate('/dashboard');
      } catch (error) {
        console.error("Auth Error:", error);
        toast.error("Authentication failed.");
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAdmin(false);
    toast.success("Logged out successfully");
    navigate('/');
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
                <DropdownMenuTrigger className="relative h-10 w-10 rounded-full p-0 border border-slate-200 dark:border-white/10 hover:border-sky-500 transition-all overflow-hidden flex items-center justify-center bg-transparent">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                      <AvatarFallback className="bg-sky-500 text-white font-bold">{user.displayName?.[0] || user.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-2xl p-2 mt-2">
                  <div className="flex items-center gap-3 p-3 mb-2 bg-slate-50 dark:bg-white/5 rounded-xl">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                      <AvatarFallback className="bg-sky-500 text-[10px] text-white">{user.displayName?.[0] || user.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold truncate max-w-[120px] dark:text-white">{user.displayName || user.username}</span>
                      <span className="text-[10px] text-slate-500 dark:text-white/40 truncate max-w-[120px]">@{user.username}</span>
                    </div>
                  </div>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')} className="focus:bg-sky-500/10 focus:text-sky-500 rounded-lg cursor-pointer py-2.5 gap-3">
                      <ShieldAlert className="w-4 h-4" /> Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="focus:bg-slate-100 dark:focus:bg-white/5 rounded-lg cursor-pointer py-2.5 gap-3">
                    <User className="w-4 h-4" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 my-1" />
                  <DropdownMenuItem onClick={handleLogout} className="focus:bg-rose-50 dark:focus:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg cursor-pointer py-2.5 gap-3">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogTrigger className="travel-gradient text-white rounded-full px-6 font-bold shadow-lg shadow-sky-500/20 active:scale-95 transition-all h-10 flex items-center justify-center">
                    Login
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 p-0 overflow-hidden rounded-3xl max-w-md">
                  <div className="p-8">
                    <div className="flex flex-col items-center mb-8">
                      <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 mb-4">
                        <Plane size={32} className="rotate-45" />
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                      </h2>
                      <p className="text-slate-500 dark:text-white/40 text-sm mt-2">
                        {authMode === 'login' ? 'Login to continue your journey' : 'Join our global travel community'}
                      </p>
                    </div>

                    <form onSubmit={handleLocalAuth} className="space-y-4">
                      {authMode === 'signup' && (
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-white/40 ml-1">Full Name</label>
                          <Input 
                            placeholder="John Doe" 
                            className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 h-12 rounded-xl focus:ring-sky-500/20 dark:text-white"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-white/40 ml-1">Username</label>
                        <Input 
                          type="text" 
                          placeholder="traveler123" 
                          className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 h-12 rounded-xl focus:ring-sky-500/20 dark:text-white"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-white/40 ml-1">Password</label>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 h-12 rounded-xl focus:ring-sky-500/20 dark:text-white"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full h-12 travel-gradient hover:opacity-90 text-white font-bold rounded-xl mt-4 transition-all"
                      >
                        {isLoading ? 'Processing...' : (authMode === 'login' ? 'Login' : 'Sign Up')}
                      </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                      <div className="text-center">
                        <button 
                          onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                          className="text-slate-500 dark:text-white/40 text-xs hover:text-sky-500 transition-colors font-medium"
                        >
                          {authMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                        </button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
