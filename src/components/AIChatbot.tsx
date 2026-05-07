import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { travelChat } from '@/src/lib/chat';
import { cn } from '../lib/utils';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, text: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const aiResponse = await travelChat(message, history);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a slight delay in my travel network. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="glass w-80 md:w-96 h-[600px] mb-6 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border-white/20 dark:border-white/10"
          >
            {/* Header */}
            <div className="travel-gradient p-6 flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-xl border border-white/20">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-widest uppercase">Discovery AI</h3>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Elite Concierge</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:scale-110 transition-transform text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 dark:bg-slate-900/40 bg-slate-50/50 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="text-center py-12 px-6">
                  <div className="bg-sky-500/10 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-sky-400 border border-sky-500/20 shadow-inner">
                    <Bot size={40} />
                  </div>
                  <h4 className="font-black text-lg mb-3 tracking-tight dark:text-white">Your Personal Expedition Architect</h4>
                  <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed max-w-[200px] mx-auto">
                    Where shall your curiosity lead you today? Ask for bespoke itineraries or secret highlights.
                  </p>
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed shadow-sm",
                    m.role === 'user' 
                      ? 'bg-sky-500 text-white rounded-tr-none font-medium' 
                      : 'bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-white/10 dark:border-white/5 backdrop-blur-sm rounded-tl-none'
                  )}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 dark:bg-white/5 p-4 rounded-3xl border border-white/10 dark:border-white/5 rounded-tl-none flex space-x-2 items-center text-sky-400">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Scouting routes...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-black/40 backdrop-blur-2xl">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative group"
              >
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Design my dream escape..."
                  className="rounded-2xl h-14 bg-slate-50 dark:bg-white/5 border-none dark:border-white/10 text-sm focus-visible:ring-sky-500/20 pl-6 pr-14 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!message.trim() || isLoading}
                  className="absolute right-2 top-2 w-10 h-10 rounded-xl travel-gradient flex items-center justify-center text-white shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-[2rem] travel-gradient text-white shadow-[0_20px_40px_-5px_rgba(14,165,233,0.5)] ring-4 ring-white/10 hover:shadow-[0_25px_50px_-8px_rgba(14,165,233,0.6)] transition-all duration-500 flex items-center justify-center group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare size={28} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-sky-600 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
