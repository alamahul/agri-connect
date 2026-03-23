import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Sprout, ArrowRight, MapPin, FileText, CheckCircle } from 'lucide-react';

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState('pembeli');
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'petani' && step === 1) {
      setStep(2);
      return;
    }
    setSubmitted(true);
    setTimeout(() => navigate('/login'), 2500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={48} className="text-emerald-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-500 text-sm">
            {role === 'petani'
              ? 'Your farmer account is being verified. Our team will contact you within 1–2 business days.'
              : 'Welcome to AgriConnect! Redirecting to login page...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-xl border border-gray-200 p-8 md:p-10 rounded">
        <div className="mb-8">
          <Link to="/" className="text-xl font-extrabold text-emerald-800 tracking-tight">AgriConnect.</Link>
          <h1 className="text-2xl font-extrabold text-gray-900 mt-4">Create New Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join us and support local Indonesian farmers.</p>
        </div>

        {/* Role Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => { setRole('pembeli'); setStep(1); }}
            className={`flex-1 flex flex-col items-center gap-2 py-4 border-2 transition-all rounded ${role === 'pembeli' ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <User size={24} className={role === 'pembeli' ? 'text-emerald-800' : 'text-gray-400'} />
            <span className={`text-sm font-bold ${role === 'pembeli' ? 'text-emerald-800' : 'text-gray-500'}`}>Buyer</span>
          </button>
          <button
            onClick={() => { setRole('petani'); setStep(1); }}
            className={`flex-1 flex flex-col items-center gap-2 py-4 border-2 transition-all rounded ${role === 'petani' ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <Sprout size={24} className={role === 'petani' ? 'text-emerald-800' : 'text-gray-400'} />
            <span className={`text-sm font-bold ${role === 'petani' ? 'text-emerald-800' : 'text-gray-500'}`}>Farmer</span>
          </button>
        </div>

        {/* Step indicator for Farmer */}
        {role === 'petani' && (
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-emerald-700' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <span className="text-xs text-gray-500 font-semibold ml-2">{step === 1 ? 'Personal Info' : 'Land Verification'}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Step 1 — Common fields */}
          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">First Name</label>
                  <input type="text" placeholder="John" className="w-full" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                <input type="email" placeholder="name@email.com" className="w-full" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                <input type="tel" placeholder="+62 812-xxxx-xxxx" className="w-full" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" className="w-full pr-12" required />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 2 — Farmer verification */}
          {step === 2 && role === 'petani' && (
            <>
              <div className="bg-amber-50 border border-amber-200 p-4 mb-2 rounded">
                <p className="text-xs font-bold text-amber-800 flex items-center gap-2">
                  <FileText size={14} /> Verification required to become an AgriConnect Farmer Partner
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Farm / Store Name</label>
                <input type="text" placeholder='Example: "Sugeng Garden"' className="w-full" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Land Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Village/District, City, Province" className="w-full pl-10" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Upload Identity Card (KTP)</label>
                <div className="border-2 border-dashed border-gray-300 p-6 text-center hover:border-emerald-700 transition-colors cursor-pointer rounded">
                  <FileText size={28} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload KTP photo</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG — Max. 5MB</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Main Commodity</label>
                <select className="w-full" required>
                  <option value="">Select main commodity...</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Grains / Cereals</option>
                  <option>Spices</option>
                  <option>Mixed</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 transition-all shadow-md mt-2 rounded"
            style={{ minHeight: '44px' }}
          >
            {role === 'petani' && step === 1 ? 'Continue to Land Verification' : 'Register Now'}
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-700 font-bold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
