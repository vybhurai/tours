import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plane, User, LogOut, Menu, X, ShieldAlert, Sparkles, Compass, Sun, Moon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { localDb } from '@/src/lib/localDb';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

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

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [adminSignUpKey, setAdminSignUpKey] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Session expiration and load check
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      const loginTime = Number(localStorage.getItem('session_start_time') || '0');
      const isRemember = localStorage.getItem('session_remember_me') === 'true';
      
      const twoHours = 2 * 60 * 60 * 1000;
      if (!isRemember && loginTime && (Date.now() - loginTime > twoHours)) {
        // Session expired
        localStorage.removeItem('currentUser');
        localStorage.removeItem('session_start_time');
        localStorage.removeItem('admin_authorized');
        setUser(null);
        setIsAdmin(false);
        toast.info("Your secure login session expired. Please sign in again.");
      } else {
        setUser(userData);
        setIsAdmin(userData.role === 'admin');
      }
    }
  }, []);

  const handleLocalAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        if (authMode === 'signup') {
          // Check if username is admin but missing validation key
          const isTryingToBeAdmin = username.trim().toLowerCase() === 'admin';
          if (isTryingToBeAdmin && adminSignUpKey.trim().toUpperCase() !== 'ADMIN123') {
            toast.error("Invalid Admin Verification Key. Normal users cannot register as 'admin'.");
            setIsLoading(false);
            return;
          }

          const existing = localDb.findUser(username);
          if (existing) {
            toast.error("That username is already registered. Please choose another.");
            setIsLoading(false);
            return;
          }

          const role = isTryingToBeAdmin ? 'admin' : 'user';
          const newUser = localDb.createUser(username, password, displayName || username, role);
          
          if (newUser) {
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            localStorage.setItem('session_start_time', Date.now().toString());
            localStorage.setItem('session_remember_me', rememberMe ? 'true' : 'false');
            if (role === 'admin') {
              localStorage.setItem('admin_authorized', 'true');
            }
            setUser(newUser);
            setIsAdmin(newUser.role === 'admin');
            setIsAuthDialogOpen(false);
            toast.success("Account created successfully!");
            navigate('/dashboard');
          } else {
            toast.error("Failed to register. Password checks or missing details.");
          }
        } else {
          // Login
          const authenticated = localDb.authenticateUser(username, password);
          if (authenticated) {
            localStorage.setItem('currentUser', JSON.stringify(authenticated));
            localStorage.setItem('session_start_time', Date.now().toString());
            localStorage.setItem('session_remember_me', rememberMe ? 'true' : 'false');
            if (authenticated.role === 'admin') {
              localStorage.setItem('admin_authorized', 'true');
            }
            setUser(authenticated);
            setIsAdmin(authenticated.role === 'admin');
            setIsAuthDialogOpen(false);
            toast.success(`Welcome back, ${authenticated.displayName || authenticated.username}!`);
            navigate('/dashboard');
          } else {
            toast.error("Invalid username or password credentials.");
          }
        }
      } catch (error) {
        console.error("Authentication Simulation Error:", error);
        toast.error("An error occurred during authentication.");
      } finally {
        setIsLoading(false);
      }
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('session_start_time');
    localStorage.removeItem('admin_authorized');
    setUser(null);
    setIsAdmin(false);
    setIsLogoutConfirmOpen(false);
    toast.success("Signout complete. Your local session has been closed.");
    navigate('/');
  };

  const navLinks = [
    { name: 'Explore Tours', path: '/tours' },
    { name: 'AI Planner', path: '/trip-planner', icon: <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" /> },
    { name: 'Hotel Stays', path: '/hotels' },
    { name: 'Vehicle Rental', path: '/vehicles' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/45 dark:bg-slate-950/45 backdrop-blur-3xl border-b border-white/5 active:dark:bg-slate-950/60 shadow-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Authentic Deluxe Logo */}
          <Link to="/" className="flex items-center space-x-3 group select-none">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 8 }}
              transition={{ type: "spring", stiffness: 450, damping: 12 }}
              className="w-10 h-10 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20"
            >
              <Plane className="h-5 w-5 text-slate-950 fill-current rotate-45" />
            </motion.div>
            <span className="text-xl font-black tracking-[0.10em] uppercase text-white font-mono flex items-center gap-0.5">
              Smart<span className="text-amber-400">Tour</span>
            </span>
          </Link>
 
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={cn(
                    "relative text-xs uppercase tracking-widest font-black py-2 cursor-pointer transition-colors duration-300 flex items-center gap-2 select-none",
                    isActive ? "text-amber-400" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.icon || null}
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator" 
                      className="absolute bottom-[-6px] left-0 right-0 h-[2.5px] bg-amber-400 rounded-full" 
                      transition={{ type: "spring", stiffness: 380, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
 
          {/* Actions & Buttons */}
          <div className="flex items-center space-x-3">
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-10 w-10 rounded-full p-0 border border-white/10 hover:border-amber-400 transition-all overflow-hidden flex items-center justify-center bg-transparent cursor-pointer">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                      <AvatarFallback className="bg-amber-500 text-black font-black">{user.displayName?.[0] || user.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900 border border-white/10 rounded-2xl p-2 mt-2 shadow-2xl">
                  <div className="flex items-center gap-3 p-3 mb-2 bg-white/5 rounded-xl">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                      <AvatarFallback className="bg-amber-500 text-slate-950 font-bold text-xs">{user.displayName?.[0] || user.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold truncate max-w-[120px] text-white">{user.displayName || user.username}</span>
                      <span className="text-[10px] text-white/40 truncate max-w-[120px]">@{user.username}</span>
                    </div>
                  </div>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')} className="focus:bg-amber-400 focus:text-slate-950 text-white rounded-lg cursor-pointer py-2.5 gap-3 text-xs uppercase tracking-wider font-extrabold focus:font-black">
                      <ShieldAlert className="w-4 h-4" /> Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="focus:bg-white/5 text-white rounded-lg cursor-pointer py-2.5 gap-3 text-xs uppercase tracking-wider font-extrabold">
                    <User className="w-4 h-4 text-amber-400" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5 my-1" />
                  <DropdownMenuItem onClick={() => setIsLogoutConfirmOpen(true)} className="focus:bg-rose-500/10 text-rose-400 focus:text-rose-300 rounded-lg cursor-pointer py-2.5 gap-3 text-xs uppercase tracking-wider font-extrabold">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogTrigger className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-widest rounded-full px-6 active:scale-95 transition-all h-10 flex items-center justify-center border-none shadow-[0_10px_20px_rgba(245,158,11,0.15)] cursor-pointer">
                    Login
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border border-white/10 p-0 overflow-hidden rounded-[2.5rem] max-w-md shadow-3xl">
                  <div className="p-10">
                    <div className="flex flex-col items-center mb-8">
                      <div className="w-16 h-16 bg-amber-400/10 rounded-2xl flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-400/5">
                        <Plane size={32} className="rotate-45" />
                      </div>
                      <h2 className="text-2.5xl font-black tracking-tight text-white uppercase font-sans">
                        {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
                      </h2>
                      <p className="text-white/40 text-[11px] uppercase tracking-wider font-bold mt-2">
                        {authMode === 'login' ? 'Login to continue your luxury trip' : 'Join our premium global community'}
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
                      
                      {authMode === 'signup' && username.trim().toLowerCase() === 'admin' && (
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black tracking-widest text-red-500 ml-1">ADMIN REGISTRATION VERIFICATION KEY</label>
                          <Input 
                            type="password"
                            placeholder="Enter administrative code" 
                            className="bg-red-500/5 border-red-500/20 text-red-400 placeholder:text-red-500/35 h-12 rounded-xl focus:ring-red-500/20"
                            value={adminSignUpKey}
                            onChange={(e) => setAdminSignUpKey(e.target.value)}
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

                      <div className="flex items-center space-x-2 py-1 select-none">
                        <input
                          type="checkbox"
                          id="remember_me"
                          className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500 bg-transparent cursor-pointer"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember_me" className="text-xs text-slate-500 dark:text-white/40 cursor-pointer font-medium">
                          Remember my travel session
                        </label>
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
            
            {/* Mobile Hamburger toggle button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-xl border border-white/10 transition-colors cursor-pointer ml-1"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Deluxe Mobile Menu Dropdown Slider */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-slate-950/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 py-3 px-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black transition-all",
                        isActive 
                          ? "bg-amber-400 text-slate-950" 
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.icon || <Compass className="w-4 h-4 text-amber-500" />}
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deluxe Logout Confirmation Modal */}
      <Dialog open={isLogoutConfirmOpen} onOpenChange={setIsLogoutConfirmOpen}>
        <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 p-8 rounded-3xl max-w-sm text-center">
          <div className="w-14 h-14 bg-rose-500/15 border border-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 mx-auto mb-4">
            <LogOut size={24} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Confirm Sign Out</h3>
          <p className="text-xs text-slate-500 dark:text-white/40 mt-1 max-w-xs mx-auto leading-relaxed">
            Are you sure you want to end your secure luxury travel session? Your offline itinerary records will remain safely saved in this browser.
          </p>
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setIsLogoutConfirmOpen(false)} 
              className="flex-1 rounded-xl h-11 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-white/5 dark:text-white cursor-pointer"
            >
              Stay Logged In
            </Button>
            <Button 
              onClick={handleLogout} 
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl h-11 text-xs cursor-pointer"
            >
              Sign Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};
