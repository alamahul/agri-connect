import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sprout, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const LoginPage = ({ role }) => {
  const validRole = role === 'pembeli' || role === 'admin' ? role : 'petani'; // Default/Fallback to petani
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.registeredEmail || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Harap isi semua kolom.');
      return;
    }

    try {
      setError('');
      setIsSubmitting(true);
      const user = await login(email, password);

      if (user.role !== validRole) {
        throw new Error(`Akun Anda terdaftar sebagai ${user.role}, bukan ${validRole}.`);
      }

      // Redirect to the originally requested page, or their role dashboard
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (validRole === 'petani') navigate('/petani/dashboard', { replace: true });
        else if (validRole === 'pembeli') navigate('/pembeli/dashboard', { replace: true });
        else if (validRole === 'admin') navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      if (err.message && err.message.includes('terdaftar sebagai')) {
         setError(err.message);
      } else {
         setError('Email atau password salah.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4 hover:scale-105 transition-transform">
            <Sprout size={24} className="text-white" />
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Login {validRole === 'pembeli' ? 'Pembeli' : validRole === 'admin' ? 'Admin' : 'Petani'}</h1>
          <p className="text-slate-400 text-sm text-center">Masuk ke akun {validRole} Anda untuk melanjutkan.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder=""
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all sm:text-sm"
                  placeholder=""
                />
              </div>
              <div className="flex justify-end pt-1">
                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Lupa Password?</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/25 mt-2"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Masuk'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Belum punya akun?{' '}
            <Link to={`/register/${validRole === 'admin' ? 'petani' : validRole}`} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Daftar sekarang
            </Link>
          </p>


        </div>
      </div>
    </div>
  );
};

export default LoginPage;
