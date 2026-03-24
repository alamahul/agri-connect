import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
  Mail,
  ShieldAlert,
  Globe,
  Zap,
} from 'lucide-react';

const AdminLoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginStep, setLoginStep] = useState(1); // 1: Initial, 2: 2FA/OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  // IP/Location Tracking Simulation
  const systemInfo = {
    ip: '192.168.1.1',
    location: 'Jakarta, Indonesia'
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginStep === 1) {
      setLoginStep(2);
      return;
    }
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-manrope">
      {/* Background Micro-elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="w-full max-w-5xl bg-white shadow-2xl border border-gray-100 rounded-[6px] overflow-hidden flex flex-col lg:flex-row relative z-10 animate-in fade-in zoom-in-95 duration-700 h-[600px]">
        {/* LEFT PANEL: Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 w-[40%] bg-neutral-900 border-r-8 border-indigo-600">
          <div>
            <Link to="/" className="text-3xl font-black text-white tracking-tighter italic">AgriConnect<span className="text-indigo-500">.</span></Link>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] mt-3">Internal Command Center</p>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-white leading-none tracking-tighter uppercase italic">System Oversight Protocol</h2>
              <p className="text-sm font-medium text-white/60 leading-relaxed italic">
                Platform management with high-level encryption and real-time monitoring. Access restricted to authorized personnel.
              </p>
            </div>

            <div className="p-8 rounded-[6px] border border-white/10 flex items-center gap-6 bg-indigo-600/10 shadow-2xl">
              <div className="w-14 h-14 rounded-[6px] flex items-center justify-center shrink-0 bg-indigo-600 text-white shadow-xl">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xs text-white uppercase tracking-widest italic">Escrow Protection</p>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Certified 2026 Ecosystem</p>
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

        {/* RIGHT PANEL: Auth Form */}
        <div className="flex-1 p-8 lg:p-20 flex flex-col justify-center">
          <div className="mb-12 text-center lg:text-left">
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3 italic">Pintu Masuk Admin</p>
            <h1 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none mb-2 underline decoration-indigo-600 decoration-8 underline-offset-8">Admin Access</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic leading-none mt-6">Kredensial khusus staf internal korporat AgriConnect.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="flex items-center gap-4 p-4 bg-indigo-50 border border-indigo-100 rounded-[6px]">
              <ShieldAlert size={20} className="text-indigo-600 animate-pulse" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest leading-none mb-1">Security Protocol Required</p>
                <p className="text-[8px] font-bold text-indigo-400 uppercase italic leading-none">Your IP: {systemInfo.ip} ({systemInfo.location})</p>
              </div>
            </div>

            {loginStep === 1 ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Corporate Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600" size={18} />
                      <input
                        type="email"
                        placeholder="name.staff@agriconnect.com"
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all font-manrope"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Secure Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600" size={18} />
                      <input
                        type={showPass ? 'text' : 'password'}
                        placeholder="Minimal 12 Karakter"
                        className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all font-manrope"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-indigo-600"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-900 text-white font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-3"
                >
                  Authenticate Identity <CheckCircle2 size={18} />
                </button>
              </div>
            ) : (
              <div className="space-y-10 animate-in zoom-in-95 duration-500">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter">Two-Factor Authentication</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest max-w-[280px] mx-auto italic">Masukkan kode 6-digit dari aplikasi Authy/Google Authenticator.</p>
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
                      className="w-full aspect-square text-center bg-white border-2 border-indigo-600 text-2xl font-black rounded-[6px] shadow-2xl shadow-indigo-100 outline-none animate-pulse"
                      required
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-black py-5 rounded-[6px] text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
                >
                  Verify Access <Zap size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setLoginStep(1)}
                  className="w-full text-[9px] font-black text-gray-300 hover:text-indigo-600 uppercase tracking-widest transition-colors italic"
                >
                  Kembali ke login email
                </button>
              </div>
            )}
          </form>

          <p className="text-center text-[9px] font-black text-gray-300 mt-12 uppercase italic leading-loose">
            Hubungi IT Support jika Anda kehilangan akses atau token 2FA.<br />
            <span className="text-indigo-500">Strict Monitoring Active.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

const CheckCircle2 = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
