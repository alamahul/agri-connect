import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Sprout,
  ArrowRight,
  MapPin,
  FileText,
  CheckCircle2,
  Smartphone,
  MessageCircle,
  ShieldCheck,
  Camera,
  Upload,
  LocateFixed,
  Bot,
  Zap,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle
} from 'lucide-react';
import logoOnly from '../assets/logo-only.png';

const RegisterPage = () => {
  const [role, setRole] = useState('pelanggan'); // pelanggan, petani
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLahanLocked, setIsLahanLocked] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleGpsLock = () => {
    // Simulation
    setIsLahanLocked(true);
    setTimeout(() => {
      // Mock success
    }, 1000);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (role === 'pelanggan') {
      if (step === 1) setStep(2); // OTP Verify
      else setIsSubmitted(true);
    } else if (role === 'petani') {
      if (step < 4) setStep(step + 1);
      else setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-manrope">
        <div className="max-w-xl w-full bg-white p-20 rounded-[6px] border border-gray-100 shadow-2xl text-center space-y-10 animate-in zoom-in-95 duration-700">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[6px] flex items-center justify-center mx-auto shadow-xl animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-neutral-900 uppercase italic tracking-tighter">Registrasi Berhasil!</h2>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest italic leading-relaxed">
              {role === 'petani'
                ? 'Data Anda sedang masuk dalam antrean audit tim KYC. Verifikasi lahan dilakukan maksimal dalam 1x24 Jam.'
                : 'Selamat datang di AgriConnect! Akun Anda sudah siap digunakan untuk transaksi perdana.'}
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-neutral-900 text-white font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Lanjut ke Dashboard <ArrowRight size={18} className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  }

  const renderPelangganSteps = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      {step === 1 ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Nama Lengkap Sesuai KTP</label>
            <input type="text" placeholder="Budi Raharjo" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-manrope" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Nomor WhatsApp Aktif</label>
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-[6px] overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
              <div className="px-4 py-4 border-r border-gray-200 text-xs font-black text-neutral-900">
                +62
              </div>
              <input
                type="tel"
                placeholder="8xx xxxx xxxx"
                className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-manrope"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 group">
            Kirim Kode Verifikasi <MessageCircle size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="space-y-10 animate-in zoom-in-95 duration-500">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[6px] flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-black text-neutral-900 uppercase italic tracking-tighter">Masukkan Kode OTP</h3>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic">OTP dikirimkan ke nomor +62 {phoneNumber}</p>
          </div>
          <div className="flex gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-full aspect-square text-center bg-white border border-gray-100 rounded-[6px] text-xl font-black focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-md"
                required
              />
            ))}
          </div>
          <div className="text-center space-y-4">
            <button type="submit" className="w-full bg-emerald-600 text-white font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-700 transition-all">Verifikasi Akun</button>
            <button type="button" className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic hover:text-emerald-600">Kirim ulang OTP (00:59)</button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPetaniSteps = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">

      {/* Progress Tracker Petani */}
      <div className="flex bg-gray-50 p-2 rounded-[6px] border border-gray-100 shadow-inner relative overflow-hidden">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`flex-1 flex flex-col items-center gap-1.5 py-4 transition-all relative z-10 ${step === s ? 'text-neutral-900 translate-y-[-2px]' : 'text-gray-300'}`}>
            <div className={`w-8 h-8 rounded-[6px] flex items-center justify-center font-black text-[10px] shadow-sm ${step === s ? 'bg-white text-emerald-600 shadow-xl' : 'bg-transparent text-gray-300'}`}>{s}</div>
            <span className={`text-[8px] font-black uppercase tracking-widest ${step === s ? 'opacity-100' : 'opacity-40 italic'}`}>
              {s === 1 ? 'Data Dasar' : s === 2 ? 'KTP Verify' : s === 3 ? 'Geotagging' : 'Review'}
            </span>
          </div>
        ))}
        {/* Progress bar background indicator would be nice but simple active state works */}
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="bg-amber-50 p-4 rounded-[6px] border border-amber-100 flex items-center gap-4">
            <Zap size={20} className="text-amber-600 animate-pulse" fill="currentColor" />
            <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest leading-relaxed">
              Mulai Langkah Pertama Sebagai Mitra Strategis AgriConnect. Masukkan Data Valid Sesuai KTP.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Nama Sesuai KTP</label>
              <input type="text" placeholder="Budi Santoso" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Nomor WhatsApp Petani</label>
              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-[6px] overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                <div className="px-4 py-4 border-r border-gray-200 text-xs font-black text-neutral-900">
                  +62
                </div>
                <input type="tel" placeholder="8xx xxxx xxxx" className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none" required />
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 group">
            Lanjut Verifikasi <MessageCircle size={18} className="group-hover:translate-x-1" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Validasi Identitas (KYC)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group border-2 border-dashed border-gray-200 p-8 rounded-[6px] text-center hover:border-emerald-500 hover:bg-emerald-50/10 transition-all cursor-pointer">
                <Camera size={32} className="mx-auto text-gray-300 group-hover:text-emerald-500 mb-4" />
                <p className="text-[10px] font-black uppercase text-neutral-900 tracking-tighter italic">Upload Foto KTP</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter underline mt-1 italic">Format: JPG/PNG</p>
              </div>
              <div className="group border-2 border-dashed border-gray-200 p-8 rounded-[6px] text-center hover:border-emerald-500 hover:bg-emerald-50/10 transition-all cursor-pointer">
                <User size={32} className="mx-auto text-gray-300 group-hover:text-emerald-500 mb-4" />
                <p className="text-[10px] font-black uppercase text-neutral-900 tracking-tighter italic">Swafoto dengan KTP</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter underline mt-1 italic">Pencahayaan Terang</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={handlePrev} className="flex-1 border border-gray-100 py-4 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-50">Kembali</button>
            <button type="submit" className="flex-[2] bg-neutral-900 text-white py-4 rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">Konfirmasi Foto <ChevronRight size={16} /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="text-center space-y-4 mb-10">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[6px] flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <locateFixed size={40} />
            </div>
            <h3 className="text-xl font-black text-neutral-900 uppercase italic tracking-tighter">Penentuan Titik Jemput</h3>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest max-w-[280px] mx-auto italic leading-relaxed">Silakan berada di lokasi ladang dan tekan tombol di bawah untuk mengunci koordinat logistik.</p>
          </div>

          <div className={`p-8 rounded-[6px] border-2 transition-all ${isLahanLocked ? 'bg-emerald-50 border-emerald-500' : 'bg-gray-50 border-gray-100 shadow-inner italic uppercase text-[10px] text-gray-300 font-black text-center'}`}>
            {isLahanLocked ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MapPin className="text-emerald-600" />
                  <div>
                    <p className="text-xs font-black text-neutral-900">LAT: -6.1754, LONG: 106.8272</p>
                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Koordinat Lahan Terkunci</p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsLahanLocked(false)} className="px-5 py-2 border border-emerald-100 rounded-[6px] text-[9px] font-black text-emerald-600 bg-white">RE-SCAN</button>
              </div>
            ) : 'Menunggu Koordinat GPS...'}
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={handlePrev} className="flex-1 border border-gray-100 py-4 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-50">Back</button>
            <button
              type="button"
              onClick={handleGpsLock}
              className={`flex-[2] py-5 rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all ${isLahanLocked ? 'bg-neutral-900 text-white' : 'bg-emerald-600 text-white animate-pulse'}`}
              disabled={isLahanLocked}
            >
              {isLahanLocked ? 'GPS LOCKED' : 'Kunci Lokasi Lahan'} <locateFixed size={18} />
            </button>
          </div>

          {isLahanLocked && (
            <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-[6px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl animate-in slide-in-from-bottom duration-500">Lanjutkan Ke Review <ArrowRight size={18} className="inline ml-2" /></button>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="space-y-8 animate-in fade-in duration-500 text-center">
          <div className="space-y-4">
            <Bot size={48} className="mx-auto text-neutral-900" />
            <h3 className="text-2xl font-black text-neutral-900 uppercase italic tracking-tighter leading-none">Final Review</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Periksa kembali data Anda sebelum masuk proses moderasi admin.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-[6px] border border-gray-100 text-left space-y-6 shadow-inner">
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-gray-300 uppercase italic text-[9px]">ID MITRA</span>
              <span className="font-extrabold text-neutral-900 uppercase tracking-tighter">AGRI-MITRA-PENDING</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-gray-300 uppercase italic text-[9px]">STATUS KYC</span>
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-[6px] font-black text-[9px]">WAITING SCAN</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-gray-300 uppercase italic text-[9px]">ALUR DANA</span>
              <span className="font-extrabold text-emerald-600 uppercase tracking-tighter italic">ESCROW SYSTEM ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-red-50 p-4 rounded-[6px]">
            <AlertCircle size={20} className="text-red-500 shrink-0" />
            <p className="text-[9px] font-black text-red-700 uppercase tracking-widest leading-relaxed text-left">
              Dengan mendaftar, saya menjamin orisinalitas produk sayur yang dijual dan bersedia mengikuti akad Escrow AgriConnect.
            </p>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={handlePrev} className="flex-1 border border-gray-100 py-4 rounded-[6px] text-[10px] font-black uppercase tracking-widest">Re-Audit</button>
            <button type="submit" className="flex-[2] bg-neutral-900 text-white py-5 rounded-[6px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-emerald-800 transition-all flex items-center justify-center gap-3">Selesaikan Registrasi <CheckCircle2 size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-manrope">

      {/* Visual background details */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-500/10 to-transparent"></div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-[6px] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-700 h-full lg:min-h-[700px]">

        {/* SIDE GRAPHIC FOR BRANDING */}
        <div className={`hidden lg:flex flex-col justify-between p-20 w-[35%] transition-all duration-1000 ${role === 'petani' ? 'bg-neutral-800 border-r-8 border-amber-400' : 'bg-neutral-800 border-r-8 border-green-600'}`}>
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-3xl font-black text-white tracking-tighter italic"> <img src={logoOnly} alt="logo" className="w-10 h-10" />AgriConnect<span className={role === 'petani' ? 'text-amber-400' : 'text-emerald-500'}>.</span></Link>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em]">Registrasi Platform 2026</p>
          </div>

          <div className="space-y-8">
            <div className="w-16 h-1 bg-white/20"></div>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              {role === 'petani' ? 'Mari Tumbuhkan Ekonomi Ladang' : 'Pangan Segar Untuk Keluarga'}
            </h2>
            <p className="text-sm text-white/50 leading-relaxed font-medium italic">
              {role === 'petani'
                ? 'Kami membantu petani modern mengakses pasar lebih luas dengan dukungan logistik & proteksi dana.'
                : 'Dapatkan akses langsung ke ribuan mitra petani lokal dengan jaminan kualitas dan harga yang fair.'}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-white/10 overflow-hidden flex items-center justify-center text-[10px] font-black font-manrope text-white/40">M{i}</div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-amber-400 flex items-center justify-center text-[18px] font-black text-neutral-900 shadow-xl">+</div>
            </div>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest italic leading-none">Mitra & Pembeli<br />Sedang Bergabung...</p>
          </div>
        </div>

        {/* REGISTRATION FORM AREA */}
        <div className="flex-1 p-8 lg:p-20 flex flex-col justify-center overflow-y-auto max-h-[900px] lg:max-h-none">
          <div className="mb-10 lg:mb-16">
            <h1 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none flex items-center gap-4">
              Buat Akun <Zap size={28} className={role === 'petani' ? 'text-amber-400' : 'text-emerald-500'} fill="currentColor" />
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic mt-4 leading-none inline-block border-b-2 border-gray-50 pb-2">Lupakan password rumit, gunakan WhatsApp & verifikasi biometrik.</p>
          </div>

          {/* Role Choice */}
          {step === 1 && (
            <div className="flex gap-1 bg-gray-100 p-1.5 rounded-[6px] border border-gray-100 shadow-inner mb-12 relative overflow-hidden">
              <div
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-4px)] bg-white rounded-[6px] shadow-2xl transition-all duration-500 ease-in-out z-0`}
                style={{
                  left: role === 'pelanggan' ? '6px' : 'calc(50% - 2px)',
                }}
              />
              <button
                onClick={() => { setRole('pelanggan'); setStep(1); }}
                className={`flex-1 flex items-center justify-center gap-3 py-4 relative z-10 transition-colors ${role === 'pelanggan' ? 'text-neutral-900' : 'text-gray-300'}`}
              >
                <User size={20} className={role === 'pelanggan' ? 'text-emerald-600' : ''} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">Daftar Pelanggan</span>
              </button>
              <button
                onClick={() => { setRole('petani'); setStep(1); }}
                className={`flex-1 flex items-center justify-center gap-3 py-4 relative z-10 transition-colors ${role === 'petani' ? 'text-neutral-900' : 'text-gray-300'}`}
              >
                <Sprout size={20} className={role === 'petani' ? 'text-amber-500' : ''} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">Daftar Mitra Petani</span>
              </button>
            </div>
          )}

          <form onSubmit={handleNext}>
            {role === 'pelanggan' ? renderPelangganSteps() : renderPetaniSteps()}
          </form>

          {/* Footer Back Link */}
          <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
              Sudah punya akun? <Link to="/login" className="text-emerald-800 underline decoration-2 underline-offset-4 ml-1">Masuk Sekarang</Link>
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[9px] font-black text-gray-300 uppercase italic">Pelayanan 24/7</span>
              <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
              <span className="text-[9px] font-black text-gray-300 uppercase italic">Bantuan AI Bot</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
