import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sprout, ShieldCheck, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState('pembeli');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'petani') navigate('/petani/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
    else navigate('/pelanggan/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white shadow-xl border border-gray-200 overflow-hidden rounded">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-between bg-emerald-900 p-10 text-white">
          <div>
            <span className="text-2xl font-extrabold tracking-tight">AgriConnect.</span>
            <p className="text-emerald-200 text-xs mt-1 uppercase tracking-widest font-semibold">TECHSOFT 2026</p>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold leading-tight mb-4">
              Connect Farmers<br />Directly to<br />Your Dining Table
            </h2>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Agribusiness platform with a secure Escrow system — cutting out middleman chains, ensuring farmer prosperity.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 p-4 rounded">
            <ShieldCheck size={32} className="text-amber-300 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">Secure Escrow System</p>
              <p className="text-emerald-200 text-xs">Your funds are held until the harvest arrives safely</p>
            </div>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Log in to continue to your dashboard.</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded">
            {['pembeli', 'petani', 'admin'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-bold capitalize transition-all rounded ${role === r ? 'bg-white text-emerald-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {r === 'pembeli' ? 'Buyer' : r === 'petani' ? 'Farmer' : 'Admin'}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter password"
                  style={{ paddingRight: '3rem' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="text-right mt-1">
                <a href="#" className="text-xs text-emerald-700 font-semibold hover:underline">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 transition-all shadow-md mt-2 rounded"
              style={{ minHeight: '44px' }}
            >
              Log In Now <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-700 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
