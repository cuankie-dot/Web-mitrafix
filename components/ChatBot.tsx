
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Rocket } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya MitraAI dari Mitrafix. Ada yang bisa saya bantu terkait solusi IT bisnis Anda?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiMsg = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: aiMsg || "Terjadi kesalahan. Silakan coba lagi." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-mitrafix-orange p-1.5 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">MitraAI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Online Now</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-mitrafix-orange text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya seputar layanan Mitrafix..."
              className="flex-1 bg-slate-50 border-none px-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-mitrafix-orange transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-mitrafix-orange text-white p-2.5 rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-mitrafix-orange text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 hover:scale-110 transition-all group relative"
        >
          <div className="absolute -top-12 right-0 bg-white text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Ada yang bisa dibantu?
          </div>
          <MessageSquare className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
