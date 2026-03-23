import { useNavigate, Link } from 'react-router-dom';
import { Sprout, ArrowRight, BarChart3, Package, ShoppingBag, ShieldCheck, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const features = [
  { icon: BarChart3, title: 'Sales Analytics', desc: 'Monitor sales trends and performance in real-time' },
  { icon: Package, title: 'Digital Warehouse', desc: 'Manage agricultural product inventory with ease' },
  { icon: ShoppingBag, title: 'Order Management', desc: 'Track all incoming orders in one dashboard' },
  { icon: ShieldCheck, title: 'Safe & Trusted', desc: 'Your data is protected with advanced encryption' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDashboardRedirect = () => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'petani') {
      navigate('/petani/dashboard');
    } else if (user.role === 'pembeli') {
      navigate('/pelanggan/dashboard');
    } else if (user.role === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex flex-col">
      {/* Navbar */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-500 rounded-[6px] flex items-center justify-center">
            <Sprout size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">AgriConnect</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold px-2 sm:px-4 py-2 transition-colors"
              >
                <LogIn size={16} />
                <span className="hidden sm:inline">Log In</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-4 py-2 rounded-[6px] transition-colors"
              >
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleDashboardRedirect}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-4 py-2 rounded-[6px] transition-colors"
            >
              Go to Dashboard
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-[6px] mb-6">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          #1 Agricultural Management Platform in Indonesia
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-5">
          Manage Agricultural Business{' '}
          <span className="text-emerald-400">Smarter</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          AgriConnect helps Indonesian farmers manage warehouse, orders, and sales analytics in one integrated platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {!user ? (
            <>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-[6px] transition-all hover:shadow-lg hover:shadow-emerald-500/25 text-sm"
              >
                Join as AgriConnect Partner
                <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <button
              onClick={handleDashboardRedirect}
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-[6px] transition-all hover:shadow-lg hover:shadow-emerald-500/25 text-sm"
            >
              Continue to Dashboard
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 max-w-4xl w-full">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/10 rounded-[6px] p-5 text-left hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 bg-emerald-500/20 rounded-[6px] flex items-center justify-center mb-3">
                <f.icon size={18} className="text-emerald-400" />
              </div>
              <p className="text-white font-semibold text-sm mb-1">{f.title}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-500 text-xs">
        © 2026 AgriConnect. Indonesian Farmer Platform.
      </footer>
    </div>
  );
};

export default LandingPage;
