import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Map as MapIcon, 
  Sprout, 
  Search,
  Zap,
  Bot
} from 'lucide-react';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-manrope">
      
      {/* Visual background details - Consistent with Auth Pages */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-600/20 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-500/10 to-transparent"></div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-[6px] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-700 flex flex-col lg:flex-row h-full lg:min-h-[500px]">
        
        {/* LEFT PANEL: Branding & Visual */}
        <div className="hidden lg:flex flex-col justify-between p-16 w-[40%] bg-neutral-800 border-r-8 border-green-600">
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-black text-white tracking-tighter italic flex items-center gap-2">
              <Sprout className="text-green-500" />
              AgriConnect<span className="text-amber-400">.</span>
            </Link>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em]">Sistem Navigasi Platform</p>
          </div>

          <div className="space-y-8">
            <div className="w-16 h-1 bg-white/20"></div>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              Oops! Koordinat Tidak Ditemukan
            </h2>
            <p className="text-sm text-white/50 leading-relaxed font-medium italic">
              Sepertinya Anda tersesat di luar batas ladang kami. Halaman yang Anda cari tidak tersedia dalam database AgriConnect.
            </p>
          </div>

          <div className="flex items-center gap-6 opacity-40">
             <MapIcon className="text-white" size={32} />
             <div className="h-10 w-px bg-white/20"></div>
             <p className="text-[10px] text-white font-black uppercase tracking-widest italic">Error Code: 404<br/>Lost in Transit</p>
          </div>
        </div>

        {/* RIGHT PANEL: Interaction Area */}
        <div className="flex-1 p-8 lg:p-20 flex flex-col justify-center text-center lg:text-left">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-[6px] text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap size={14} fill="currentColor" /> Out of Bounds
            </div>
            <h1 className="text-7xl lg:text-9xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none mb-4 decoration-green-600 decoration-8 underline-offset-8">
              404
            </h1>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest italic mt-8 leading-relaxed max-w-sm lg:max-w-none mx-auto lg:mx-0">
              Jangan khawatir, asisten AI kami dapat membantu Anda kembali ke jalur yang benar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-100 text-neutral-900 font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-gray-50 transition-all active:scale-95"
            >
              <ArrowLeft size={18} /> Kembali
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-3 bg-green-600 text-white font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-green-700 transition-all active:scale-95 group"
            >
              Ke Beranda <Home size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-50 flex items-center gap-4 text-gray-300">
             <Bot size={24} />
             <p className="text-[9px] font-black uppercase tracking-[0.2em] italic">
               "Saran AgriBot: Mungkin ada kesalahan penulisan URL atau tautan sudah kedaluwarsa."
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Error404;
