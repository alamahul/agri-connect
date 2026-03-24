import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  Lock,
  Fingerprint,
  MessageCircle,
  Chrome,
  Apple,
  Bot,
  Zap,
  Sprout,
  User,
} from 'lucide-react';
import logoOnly from '../assets/logo-only.png';

const LoginPage = () => {
  const [role, setRole] = useState('pelanggan'); // pelanggan, petani
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setPin(['', '', '', '', '', '']);
  };

  const handlePinChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      // Auto focus next input
      if (value && index < 5) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'petani') navigate('/petani/dashboard');
    else navigate('/pelanggan/dashboard');
  };

  const renderPelangganContent = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="space-y-4">
        <div className="relative">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block italic">
            Nomor WhatsApp
          </label>

          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-[6px] overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">

            {/* Prefix +62 */}
            <div className="px-4 py-4 border-r border-gray-200 text-xs font-black text-neutral-900">
              +62
            </div>

            {/* Input */}
            <input
              id="WhatsAppNumber"
              type="tel"
              placeholder="812 3456 7890"
              className="w-full px-4 py-4 bg-transparent text-sm font-bold outline-none font-manrope"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-black py-4 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
        >
          Masuk via WhatsApp <MessageCircle size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          type="button"
          className="w-full bg-white text-neutral-900 border border-gray-100 font-black py-4 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
        >
          Gunakan PIN 6-Digit <Lock size={16} />
        </button>
      </div>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
        <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-gray-300 italic">Atau masuk dengan</span></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button type="button" className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-[6px] hover:bg-gray-50 transition-all shadow-sm group">
          <div className="w-8 h-8 rounded-[6px] bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
            <Chrome size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900 italic">Google</span>
        </button>
        <button type="button" className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-[6px] hover:bg-gray-50 transition-all shadow-sm group">
          <div className="w-8 h-8 rounded-[6px] bg-neutral-100 text-neutral-900 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all">
            <Apple size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900 italic">Apple ID</span>
        </button>
      </div>
    </div>
  );

  const renderPetaniContent = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="bg-amber-50 p-4 rounded-[6px] border border-amber-100 flex items-center gap-4">
        <Bot size={20} className="text-amber-600 animate-bounce" />
        <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest leading-relaxed">
          Hai Mitra Petani! Masukkan Nomor WA dan PIN ATM Anda untuk mulai berjualan.
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
            Nomor WhatsApp Petani
          </label>

          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-[6px] overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-emerald-500">

            {/* Prefix (icon +62) */}
            <div className="flex items-center gap-2 px-4 py-4 border-r border-gray-200">
              <Smartphone size={16} className="text-emerald-600" />
              <span className="text-xs font-black text-neutral-900">+62</span>
            </div>

            {/* Input */}
            <input
              type="tel"
              placeholder="8xx xxxx xxxx"
              className="w-full px-4 py-4 bg-transparent text-sm font-bold outline-none font-manrope"
              required
            />

          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">PIN 6-Digit</label>
            <button type="button" className="text-[9px] font-black text-emerald-600 uppercase italic">Lupa PIN?</button>
          </div>
          <div className="flex gap-2">
            {pin.map((digit, idx) => (
              <input
                key={idx}
                id={`pin-${idx}`}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="w-full aspect-square text-center bg-white border border-gray-100 rounded-[6px] text-xl font-black focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-md"
                required
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="w-full bg-emerald-800 text-white font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-900 transition-all flex items-center justify-center gap-3"
        >
          Masuk Sekarang <ArrowRight size={18} />
        </button>
        <button type="button" className="flex items-center justify-center gap-3 py-4 text-emerald-600 hover:text-emerald-700 transition-colors group">
          <div className="p-2 bg-emerald-50 rounded-[6px] group-hover:scale-110 transition-transform shadow-sm">
            <Fingerprint size={24} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Gunakan Sidik Jari</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-manrope">
      {/* Background Micro-elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="w-full max-w-5xl bg-white shadow-2xl border border-gray-100 rounded-[6px] overflow-hidden flex flex-col lg:flex-row relative z-10 animate-in fade-in zoom-in-95 duration-700">

        {/* LEFT PANEL */}
        <div className={`hidden lg:flex flex-col justify-between p-16 w-[40%] transition-colors duration-1000 ${role === 'petani' ? 'bg-neutral-800 border-r-8 border-amber-400' :
          'bg-neutral-800 border-r-8 border-green-600'
          }`}>
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-3xl font-black text-white tracking-tighter italic"
            >
              <img src={logoOnly} alt="logo" className="w-10 h-10" />
              <span>
                AgriConnect<span className="text-amber-400">.</span>
              </span>
            </Link>

            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] mt-3">
              {role === 'petani' ? 'Mitra Strategis' : 'Demand Platform'}
            </p>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-white leading-none tracking-tighter uppercase italic">
                {role === 'petani' ? 'Panen Hari Ini Cuan Nanti' : 'Pangan Segar Langsung Ladang'}
              </h2>
              <p className="text-sm font-medium text-white/60 leading-relaxed italic">
                {role === 'petani' ? 'Mendukung petani modern dengan sistem transaksi yang transparan dan dukungan logistik.' :
                  'Menghubungkan Anda langsung dengan petani lokal terverifikasi dengan perlindungan Escrow aktif.'}
              </p>
            </div>

            <div className={`p-8 rounded-[6px] border border-white/10 flex items-center gap-6 bg-white/5 shadow-2xl`}>
              <div className={`w-14 h-14 rounded-[6px] flex items-center justify-center shrink-0 bg-amber-400 text-neutral-900 shadow-xl shadow-amber-400/20`}>
                <Zap size={32} />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xs text-white uppercase tracking-widest italic">Ekosistem Terverifikasi</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Platform Terpercaya 2026</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-10 border-t border-white/5 opacity-40">
            <p className="text-[9px] font-black text-white uppercase tracking-widest">Version v4.0.2</p>
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-8 lg:p-20 flex flex-col justify-center">
          <div className="mb-12">
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-3 italic">Pintu Masuk Sistem</p>
            <h1 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none mb-2 underline decoration-green-600 decoration-8 underline-offset-8">Selamat Datang</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic leading-none mt-6">Pilih peran Anda dan akses pusat kendali AgriConnect.</p>
          </div>

          {/* Role Switcher */}
          <div className="bg-gray-50 p-1.5 rounded-[6px] border border-gray-100 shadow-inner flex mb-12 relative overflow-hidden">
            <div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-4px)] bg-white rounded-[6px] shadow-2xl transition-all duration-500 ease-in-out z-0"
              style={{
                left: role === 'pelanggan' ? '6px' : 'calc(50% - 2px)',
              }}
            />
            <button
              onClick={() => handleRoleChange('pelanggan')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 relative z-10 transition-colors ${role === 'pelanggan' ? 'text-neutral-900' : 'text-gray-300 hover:text-gray-400'}`}
            >
              <User size={20} className={role === 'pelanggan' ? 'text-emerald-600' : ''} />
              <span className="text-[9px] font-black uppercase tracking-widest italic tracking-[0.2em]">Pelanggan</span>
            </button>
            <button
              onClick={() => handleRoleChange('petani')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 relative z-10 transition-colors ${role === 'petani' ? 'text-neutral-900' : 'text-gray-300 hover:text-gray-400'}`}
            >
              <Sprout size={20} className={role === 'petani' ? 'text-emerald-600' : ''} />
              <span className="text-[9px] font-black uppercase tracking-widest italic tracking-[0.2em]">Petani</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {role === 'pelanggan' && renderPelangganContent()}
            {role === 'petani' && renderPetaniContent()}
          </form>

          <p className="text-center text-[11px] font-bold text-gray-400 mt-12 bg-gray-50/50 py-4 rounded-[6px] italic">
            Belum punya akun?{' '}
            <Link to="/register" className="text-emerald-700 font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4 ml-1">
              Daftar {role === 'petani' ? 'Sebagai Mitra' : 'Sekarang'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
