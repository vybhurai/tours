import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { travelChat } from '@/src/lib/chat';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

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
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having a technical glitch. How else can I help?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-80 md:w-96 h-[550px] mb-6 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-white/20 dark:border-white/10"
          >
            {/* Header */}
            <div className="amber-gradient p-6 flex items-center justify-between text-black">
              <div className="flex items-center space-x-3">
                <div className="bg-black/10 p-2.5 rounded-2xl backdrop-blur-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">AI Concierge</h3>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Ready to help</span>
                  </div>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)} className="hover:bg-black/10 text-black rounded-full">
                <X size={20} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 dark:bg-black/40 bg-slate-50/50">
              {messages.length === 0 && (
                <div className="text-center py-10 px-6">
                  <div className="bg-sky-500/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-sky-400 border border-sky-500/20">
                    <Bot size={32} />
                  </div>
                  <h4 className="font-bold mb-2 dark:text-white">SmartTour AI</h4>
                  <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">Ask me about your travel plans, budget tracking, or custom AI-curated itineraries!</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-sky-500 text-white rounded-tr-none shadow-lg shadow-sky-500/20' 
                      : 'bg-white/10 dark:bg-white/5 text-slate-900 dark:text-white shadow-sm border border-white/10 dark:border-white/5 backdrop-blur-sm rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 dark:bg-white/5 p-4 rounded-3xl border border-white/10 dark:border-white/5 rounded-tl-none animate-pulse flex space-x-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-black/20 backdrop-blur-xl">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center space-x-3"
              >
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="rounded-2xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-sm focus-visible:ring-amber-500/20 p-6"
                />
                <Button size="icon" type="submit" className="rounded-2xl amber-gradient shrink-0 w-12 h-12 shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform">
                  <Send size={20} className="text-black" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full amber-gradient text-black shadow-2xl shadow-amber-500/40 ring-4 ring-white/10 hover:scale-105 transition-all duration-300 p-0"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </Button>
    </div>
  );
};
