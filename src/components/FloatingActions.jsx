import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, MessageSquare, Bot, X, Send, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FloatingActions = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo! Saya AI AgriConnect. Ada yang bisa saya bantu terkait belanja pangan sehat hari ini?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Don't show on specific pages if needed
  const hiddenOn = ['/login', '/register', '/adminAgriConnect/login'];
  if (hiddenOn.includes(location.pathname)) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, newMsg]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Terima kasih atas pertanyaannya! Saya sedang mempelajari query Anda. Untuk informasi lebih lanjut mengenai produk segar, Anda bisa melihat di menu Katalog.",
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 pointer-events-none">
      {/* Chat Window */}
      {isChatOpen && (
        <div className="w-[320px] sm:w-[380px] h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-2 animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
          {/* Header */}
          <div className="bg-[#4BAF47] p-4 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">AgriConnect AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/80 font-medium tracking-wider">ONLINE</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 text-sm leading-relaxed ${
                  msg.isBot 
                    ? 'bg-white text-[#1F1E17] rounded-2xl rounded-tl-none shadow-sm' 
                    : 'bg-[#4BAF47] text-white rounded-2xl rounded-tr-none shadow-md shadow-[#4BAF47]/10'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 bg-gray-50 text-sm px-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-[#4BAF47] transition"
            />
            <button type="submit" className="bg-[#4BAF47] text-white p-2.5 rounded-xl hover:bg-[#3E9440] transition shadow-md shadow-[#4BAF47]/20">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* Cart Button */}
        {location.pathname !== '/cart' && location.pathname !== '/checkout' && (
          <button 
            onClick={() => navigate('/cart')}
            className="w-14 h-14 bg-white text-[#1F1E17] border border-gray-100 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group relative"
          >
            <ShoppingCart size={24} className="group-hover:text-[#4BAF47] transition-colors" />
            <span className="absolute -top-1 -right-1 bg-[#EE4D2D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              3
            </span>
            <div className="absolute right-16 bg-[#1F1E17] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest shadow-xl">
              Keranjang
            </div>
          </button>
        )}

        {/* AI Bot Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 ${isChatOpen ? 'bg-white text-[#4BAF47]' : 'bg-[#4BAF47] text-white'} rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group relative border-2 ${isChatOpen ? 'border-[#4BAF47]' : 'border-transparent'}`}
        >
          {isChatOpen ? <X size={28} /> : <Bot size={28} className="animate-in fade-in zoom-in" />}
          
          {/* Label persistent on Landing Page */}
          {location.pathname === '/' && (
            <div className="absolute right-16 bg-[#4BAF47] text-white text-[10px] font-black px-3 py-2 rounded-xl whitespace-nowrap shadow-xl border-b-4 border-[#337a35] animate-bounce">
              Tanya AgriBot 🤖
            </div>
          )}

          <div className="absolute right-16 bg-[#1F1E17] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest shadow-xl">
            Tanya AI
          </div>
          
          {/* Notification Badge for AI */}
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 bg-[#EEC044] w-4 h-4 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingActions;
