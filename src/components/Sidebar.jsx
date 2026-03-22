import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Warehouse,
  PackageSearch,
  BarChart3,
  HelpCircle,
  LogOut,
  Sprout,
  X,
  User,
} from 'lucide-react';

const navItems = [
  { path: '/petani/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/petani/gudang', icon: Warehouse, label: 'Gudang Produk' },
  { path: '/petani/pesanan', icon: PackageSearch, label: 'Manajemen Pesanan' },
  { path: '/petani/analisis', icon: BarChart3, label: 'Analisis Penjualan' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    navigate('/');
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-56 flex-shrink-0
        bg-white border-r border-slate-200 flex flex-col shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0 lg:shadow-sm lg:z-auto
      `}
    >
      {/* Brand Header */}
      <div className="px-4 py-3.5 bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/20 rounded-[6px] flex items-center justify-center">
            <Sprout size={15} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-none">AgriConnect</h1>
            <p className="text-emerald-200 text-[10px] mt-0.5">Platform Petani</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-[6px] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav label */}
      <div className="px-3 pt-4 pb-1.5">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
          Menu Utama
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 rounded-[6px] text-sm font-medium transition-all duration-150 group ${isActive
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-7 h-7 rounded-[6px] flex items-center justify-center flex-shrink-0 transition-colors ${isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'
                    }`}
                >
                  <item.icon size={14} />
                </span>
                <span className="text-[13px]">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1 h-4 bg-emerald-500 rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-2 py-3 border-t border-slate-100 space-y-0.5">
        <NavLink
          to="/petani/profil"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-2 px-2.5 py-2 rounded-[6px] text-xs font-medium transition-colors ${isActive
              ? 'bg-slate-100 text-slate-800'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`
          }
        >
          <User size={13} />
          <span>Profil Saya</span>
        </NavLink>
        <NavLink
          to="/petani/bantuan"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-2 px-2.5 py-2 rounded-[6px] text-xs font-medium transition-colors ${isActive
              ? 'bg-slate-100 text-slate-800'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`
          }
        >
          <HelpCircle size={13} />
          <span>Bantuan</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-2.5 py-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-[6px] text-xs font-medium transition-colors"
        >
          <LogOut size={13} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;