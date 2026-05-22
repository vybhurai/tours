import React, { useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import { Check, ChevronDown, Sparkle, X, Calendar, Users, MapPin, Loader2 } from 'lucide-react';

// ==========================================
// 1. ANIMATED CONTAINER / ENTRANCE PRESETS
// ==========================================
interface AnimatedContainerProps extends Omit<HTMLMotionProps<'div'>, 'direction' | 'children'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  animateOnce?: boolean;
}

export const AnimatedContainer = ({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 30,
  animateOnce = true,
  ...props
}: AnimatedContainerProps) => {
  const getInitial = () => {
    if (direction === 'none') return { opacity: 0 };
    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    const amount = direction === 'up' || direction === 'left' ? distance : -distance;
    return { opacity: 0, [axis]: amount };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: animateOnce, margin: '-10px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom deluxe cubic-bezier (out-quart)
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 2. LUXURY BUTTON
// ==========================================
interface LuxuryButtonProps extends Omit<HTMLMotionProps<'button'>, 'size' | 'children'> {
  variant?: 'gold' | 'glass' | 'outline' | 'slate' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const LuxuryButton = React.forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant = 'gold', size = 'md', isLoading = false, leftIcon, rightIcon, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-4 h-9 text-xs rounded-xl font-bold uppercase tracking-wider',
      md: 'px-6 h-12 text-xs rounded-2xl font-black uppercase tracking-widest',
      lg: 'px-8 h-14 text-sm rounded-[1.25rem] font-black uppercase tracking-[0.15em]',
      xl: 'px-10 h-16 text-base rounded-[1.5rem] font-black uppercase tracking-[0.2em]',
    };

    const variantClasses = {
      gold: 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-[0_10px_35px_rgba(245,158,11,0.15)] border-none relative overflow-hidden group',
      glass: 'bg-white/10 dark:bg-white/5 border border-white/15 dark:border-white/10 text-white hover:bg-white hover:text-slate-950 backdrop-blur-md shadow-xl',
      outline: 'bg-transparent border border-amber-400/40 text-amber-400 hover:bg-amber-400 hover:text-slate-950 transition-colors',
      slate: 'bg-slate-900 border border-slate-800 text-white hover:bg-slate-800',
      ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center font-sans tracking-widest cursor-pointer transition-all duration-300 select-none border focus:outline-none focus:ring-2 focus:ring-amber-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {/* Shimmer Overlay for Gold Button */}
        {variant === 'gold' && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
        )}
        
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current mr-2" />
        ) : leftIcon ? (
          <span className="mr-2.5 flex items-center">{leftIcon}</span>
        ) : null}

        <span className="relative z-10">{children}</span>

        {!isLoading && rightIcon && <span className="ml-2.5 flex items-center">{rightIcon}</span>}
      </motion.button>
    );
  }
);
LuxuryButton.displayName = 'LuxuryButton';

// ==========================================
// 3. LUXURY BADGE
// ==========================================
interface LuxuryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'emerald' | 'sky' | 'slate' | 'rose';
  size?: 'sm' | 'md' | 'lg';
}

export const LuxuryBadge = ({ className, variant = 'gold', size = 'md', children, ...props }: LuxuryBadgeProps) => {
  const sizeClasses = {
    sm: 'text-[9px] px-2.5 py-0.5 rounded-full tracking-[1.5px] uppercase font-bold',
    md: 'text-[10px] px-3.5 py-1 rounded-full tracking-[2px] uppercase font-black',
    lg: 'text-xs px-5 py-1.5 rounded-full tracking-[3px] uppercase font-black',
  };

  const variantClasses = {
    gold: 'bg-amber-400/10 text-amber-400 border border-amber-400/20 shadow-sm',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm',
    sky: 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm',
    slate: 'bg-white/5 text-white/50 border border-white/10 shadow-sm',
    rose: 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <Sparkle size={8} className="mr-1.5 animate-pulse text-current" />
      {children}
    </span>
  );
};

// ==========================================
// 4. LUXURY CARD
// ==========================================
interface LuxuryCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'glass' | 'slate' | 'glowing';
  hoverEffect?: 'lift' | 'scale' | 'none';
  children: React.ReactNode;
}

export const LuxuryCard = ({
  className,
  variant = 'glass',
  hoverEffect = 'lift',
  children,
  ...props
}: LuxuryCardProps) => {
  const variantClasses = {
    glass: 'bg-slate-900/60 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[2.5rem]',
    slate: 'bg-slate-900 border border-slate-800/80 shadow-xl rounded-[2rem]',
    glowing: 'bg-slate-950 border border-white/5 shadow-2xl rounded-[3rem] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-amber-400/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none',
  };

  const hoverAnimate = () => {
    if (hoverEffect === 'lift') return { y: -8, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)' };
    if (hoverEffect === 'scale') return { scale: 1.025 };
    return {};
  };

  return (
    <motion.div
      whileHover={hoverAnimate()}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className={cn('relative overflow-hidden p-8', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 5. LUXURY SECTION TITLE
// ==========================================
interface LuxurySectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  highlightWord?: string;
}

export const LuxurySectionTitle = ({
  className,
  subtitle,
  title,
  description,
  align = 'center',
  highlightWord,
  ...props
}: LuxurySectionTitleProps) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end',
  };

  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) return title;
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
          {highlightWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn('flex flex-col space-y-4 max-w-4xl mb-16', alignmentClasses[align], className)} {...props}>
      {subtitle && (
        <div className="inline-flex items-center gap-1.5 bg-amber-400/5 border border-amber-400/10 px-4 py-1.5 rounded-full uppercase tracking-[0.3em] font-black text-[9px] text-amber-400">
          <Sparkle size={10} className="animate-pulse" />
          <span>{subtitle}</span>
        </div>
      )}
      
      <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05] text-white">
        {renderTitle()}
      </h2>
      
      {description && (
        <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

// ==========================================
// 6. LUXURY INPUT FIELD
// ==========================================
interface LuxuryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
}

export const LuxuryInput = React.forwardRef<HTMLInputElement, LuxuryInputProps>(
  ({ className, label, type = 'text', leftIcon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 ml-1 block">
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-amber-400 transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white text-sm focus:outline-none focus:border-amber-400/70 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 placeholder:text-white/20 select-text',
              leftIcon ? 'pl-14' : '',
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);
LuxuryInput.displayName = 'LuxuryInput';

// ==========================================
// 7. LUXURY DROPDOWN
// ==========================================
interface LuxuryDropdownProps {
  label?: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
}

export const LuxuryDropdown = ({ label, options, selected, onChange, className }: LuxuryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      {label && (
        <label className="text-[10px] uppercase font-black tracking-[0.2em] text-white/40 ml-1 block">
          {label}
        </label>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white text-xs uppercase tracking-widest font-black flex items-center justify-between hover:bg-white/10 hover:border-white/20 transition-all text-left cursor-pointer focus:outline-none',
          className
        )}
      >
        <span>{selected}</span>
        <ChevronDown size={14} className={cn('text-white/40 transition-transform duration-300', isOpen ? 'rotate-180 text-amber-400' : '')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-out overlay */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full py-4 px-6 text-left text-xs uppercase tracking-widest font-black transition-colors',
                    selected === option
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 8. LUXURY MODAL
// ==========================================
interface LuxuryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const LuxuryModal = ({ isOpen, onClose, title, subtitle, children }: LuxuryModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-10"
          >
            {/* Top Amber Bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600" />
            
            <div className="p-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-8 pb-4 border-b border-white/5">
                <div>
                  {subtitle && <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 font-mono">{subtitle}</p>}
                  <h3 className="text-2xl font-black text-white mt-1 uppercase tracking-tight">{title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable container */}
              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// 9. LUXURY LOADER
// ==========================================
export const LuxuryLoader = () => {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Outer spinning dash ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        className="absolute w-20 h-20 rounded-full border border-dashed border-amber-400/45"
      />
      {/* Inner fast spinning glow ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
        className="absolute w-14 h-14 rounded-full border border-t-amber-400 border-r-transparent border-b-transparent border-l-transparent shadow-[0_0_15px_rgba(245,158,11,0.2)]"
      />
      {/* Center ambient pulsing dot */}
      <motion.div
        animate={{ scale: [0.85, 1.15, 0.85] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="w-4 h-4 rounded-full bg-amber-400"
      />
    </div>
  );
};

// ==========================================
// 10. LUXURY SKELETON
// ==========================================
export const LuxurySkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'relative bg-white/5 overflow-hidden rounded-2xl border border-white/5 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:animate-shimmer',
        className
      )}
    />
  );
};

// ==========================================
// 11. LUXURY PRICING CARD
// ==========================================
interface LuxuryPricingCardProps {
  tier: string;
  price: string;
  period: string;
  description: string;
  perks: string[];
  popular?: boolean;
  onSelect?: () => void;
  btnText?: string;
  color?: string;
}

export const LuxuryPricingCard = ({
  tier,
  price,
  period,
  description,
  perks,
  popular = false,
  onSelect,
  btnText = 'Acquire Membership',
  color = 'from-amber-600/35 to-rose-600/35',
}: LuxuryPricingCardProps) => {
  return (
    <LuxuryCard
      variant={popular ? 'glowing' : 'glass'}
      hoverEffect="lift"
      className={cn(
        'relative overflow-hidden flex flex-col justify-between h-full p-10 border-t-4',
        popular ? 'border-t-amber-400 scale-[1.02] md:scale-105 z-10' : 'border-t-white/10'
      )}
    >
      <div className="space-y-8">
        {popular && (
          <div className="absolute top-5 right-5 bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            Highly Acquired
          </div>
        )}

        <div>
          <h4 className="text-xl font-bold tracking-wider text-white uppercase">{tier}</h4>
          <p className="text-slate-400 text-xs mt-2 font-light leading-relaxed">{description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">{price}</span>
          <span className="text-slate-500 font-mono text-xs">/ {period}</span>
        </div>

        <ul className="space-y-4">
          {perks.map((perk, i) => (
            <li key={i} className="flex items-start text-xs text-slate-300 font-medium leading-normal gap-3">
              <div className="mt-0.5 rounded-lg bg-amber-400/10 p-1 text-amber-400 select-none">
                <Check size={12} strokeWidth={3} />
              </div>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 pt-6 border-t border-white/5">
        <LuxuryButton
          onClick={onSelect}
          variant={popular ? 'gold' : 'glass'}
          className="w-full text-center"
        >
          {btnText}
        </LuxuryButton>
      </div>
    </LuxuryCard>
  );
};

// ==========================================
// 12. LUXURY BOOKING CARD
// ==========================================
interface LuxuryBookingCardProps {
  packageName: string;
  location: string;
  guests: number;
  travelDate: string;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  onActionClick?: () => void;
  actionText?: string;
  thumbnail?: string;
}

export const LuxuryBookingCard = ({
  packageName,
  location,
  guests,
  travelDate,
  totalAmount,
  status,
  onActionClick,
  actionText = 'Review Suite Details',
  thumbnail,
}: LuxuryBookingCardProps) => {
  const getStatusBadgeVariant = () => {
    if (status === 'confirmed') return 'emerald';
    if (status === 'cancelled') return 'rose';
    return 'gold';
  };

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center text-left text-white shadow-xl hover:border-amber-400/30 transition-all duration-300">
      {/* Thumbnail */}
      {thumbnail && (
        <div className="w-full md:w-44 h-28 rounded-2xl overflow-hidden relative border border-white/5">
          <img src={thumbnail} className="w-full h-full object-cover" alt={packageName} />
        </div>
      )}

      {/* Primary specs */}
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <LuxuryBadge variant={getStatusBadgeVariant()} size="sm">
            {status}
          </LuxuryBadge>
          <div className="flex items-center text-[11px] text-white/40 uppercase tracking-widest font-bold">
            <MapPin size={12} className="mr-1.5 text-amber-400" />
            {location}
          </div>
        </div>

        <h4 className="text-xl font-bold uppercase tracking-tight text-white leading-tight">{packageName}</h4>

        <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-amber-400" />
            DATE: {travelDate}
          </span>
          <span className="flex items-center gap-2">
            <Users size={14} className="text-amber-400" />
            {guests} VIP GUEST{guests > 1 ? 'S' : ''}
          </span>
        </div>
      </div>

      {/* Cash outline & active action */}
      <div className="w-full md:w-auto text-right flex flex-col items-stretch md:items-end justify-between self-stretch pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
        <div className="mb-4 md:mb-0">
          <p className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-none">VVIP Total Cost</p>
          <p className="text-2xl font-black text-amber-400 tracking-tighter mt-1">₹{totalAmount.toLocaleString('en-IN')}</p>
        </div>

        {onActionClick && (
          <button
            onClick={onActionClick}
            className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-amber-400 transition-colors uppercase cursor-pointer"
          >
            {actionText} →
          </button>
        )}
      </div>
    </div>
  );
};
