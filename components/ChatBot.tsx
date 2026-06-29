
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Rocket, Sparkles } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useData } from '../context/DataContext';

const ChatBot: React.FC = () => {
  const { isChatOpen, setIsChatOpen, pendingChatMessage, setPendingChatMessage } = useData();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya MitraAI dari Mitrafix. Ada yang bisa saya bantu terkait solusi IT bisnis Anda?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Handle automatic messages from other components
  useEffect(() => {
    if (pendingChatMessage) {
      handleSend(pendingChatMessage);
      setPendingChatMessage(null);
      if (!isChatOpen) setIsChatOpen(true);
    }
  }, [pendingChatMessage]);

  const handleSend = async (forcedMessage?: string) => {
    const messageToSend = forcedMessage || input;
    if (!messageToSend.trim() || isLoading) return;

    if (!forcedMessage) setInput('');
    
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsLoading(true);

    try {
      const aiMsg = await getAIResponse(messageToSend);
      setMessages(prev => [...prev, { role: 'model', text: aiMsg || "Terjadi kesalahan. Silakan coba lagi." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Maaf, sistem sedang sibuk. Silakan hubungi via WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isChatOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="bg-slate-900 p-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-mitrafix-orange p-2 rounded-xl shadow-lg shadow-sky-400/20">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">MitraAI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Always Active</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)} 
              className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-5 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-mitrafix-orange text-white rounded-tr-none shadow-md shadow-sky-400/10 font-medium' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white border-t border-slate-100 shrink-0">
            <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 focus-within:border-mitrafix-orange focus-within:ring-2 focus-within:ring-sky-100 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya apapun ke AI..."
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:outline-none"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-mitrafix-orange text-white p-3 rounded-xl hover:bg-sky-400 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-sky-400/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Powered by Gemini Flash
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-mitrafix-orange text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-sky-400/40 hover:scale-110 active:scale-95 transition-all group relative"
        >
          <div className="absolute -top-14 right-0 bg-white text-slate-900 text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
            Butuh Bantuan Cepat?
          </div>
          <MessageSquare className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
