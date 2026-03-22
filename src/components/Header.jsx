import { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Menu, ShoppingBag, AlertTriangle, Banknote, Check, LogOut, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../data/dummyData';

const notifIcon = (type) => {
  if (type === 'order') return <ShoppingBag size={14} className="text-blue-500" />;
  if (type === 'stock') return <AlertTriangle size={14} className="text-red-500" />;
  return <Banknote size={14} className="text-emerald-500" />;
};

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between shadow-sm flex-shrink-0 z-10 relative">
      {/* Left */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-[6px] text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-slate-800 font-bold text-sm tracking-tight">AgriConnect</span>
          <span className="hidden sm:inline text-slate-300 text-sm">|</span>
          <span className="hidden sm:inline text-slate-400 text-xs">Dashboard Petani</span>
        </div>
      </div>

      {/* Center — Search */}
      <div className="flex-1 max-w-xs mx-4 hidden sm:block">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari produk, pesanan..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[6px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Notification Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
            className="relative p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-[6px] transition-colors"
            aria-label="Notifikasi"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-[6px] shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Notifikasi</p>
                <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">Tandai semua dibaca</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-blue-50/40' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-slate-100 rounded-[6px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {notifIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                          {!n.isRead && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 text-center">
                <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">Lihat semua notifikasi</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-[6px] hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
          >
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <User size={14} />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-slate-700 leading-tight">Bapak Petani</p>
              <p className="text-[10px] text-slate-400 leading-tight">Pemilik Lahan</p>
            </div>
            <ChevronDown size={12} className={`text-slate-400 ml-0.5 hidden md:block transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-[6px] shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">Bapak Petani</p>
                <p className="text-[11px] text-slate-500 mt-0.5">petani@agriconnect.id</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setProfileOpen(false); navigate('/petani/profil'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left"
                >
                  <UserCircle size={14} className="text-slate-400" />
                  Profil Saya
                </button>
                <button
                  onClick={() => { setProfileOpen(false); navigate('/petani/bantuan'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left"
                >
                  <Check size={14} className="text-slate-400" />
                  Bantuan
                </button>
              </div>
              <div className="py-1 border-t border-slate-100">
                <button
                  onClick={() => { setProfileOpen(false); navigate('/'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut size={14} />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;