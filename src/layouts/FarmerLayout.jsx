import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Box, ShoppingBag, BarChart3, HelpCircle, Settings, Menu, X, ChevronLeft, ChevronRight, User, LogOut, ShoppingCart, Bell, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logoOnly from '../assets/logo-only.png';

const FarmerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Pesanan Baru', message: 'Ada pesanan masuk untuk 5kg Bawang Merah', time: '5mnt yang lalu', unread: true },
    { id: 2, title: 'Stok Menipis', message: 'Stok Tomat Roma sisa 2kg, segera update!', time: '1jam yang lalu', unread: true },
    { id: 3, title: 'Dana Cair', message: 'Dana Rp 500.000 telah masuk ke saldo Anda', time: '3jam yang lalu', unread: false },
  ];

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/petani/dashboard' },
    { icon: <Box size={20} />, label: 'Gudang Produk', path: '/petani/inventory' },
    { icon: <ShoppingCart size={20} />, label: 'Pesanan', path: '/petani/orders' },
    { icon: <BarChart3 size={20} />, label: 'Analisis Penjualan', path: '/petani/analytics' },
    { icon: <HelpCircle size={20} />, label: 'Bantuan', path: '/petani/help' },
    { icon: <Settings size={20} />, label: 'Pengaturan', path: '/petani/settings' },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-neutral-800 transform transition-all duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-64 ${isMinimized ? 'md:w-20' : 'md:w-64'}
        md:translate-x-0 md:static
      `}>
        <div className={`h-20 flex items-center px-6 gap-3 ${isMinimized ? 'md:justify-center md:px-0' : ''}`}>
          <img src={logoOnly} alt="logo" className="w-10 h-10 object-contain" />
          <span className={`text-xl font-extrabold text-white tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${isMinimized ? 'md:hidden' : 'block'}`}>
            AgriConnect
          </span>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded text-sm font-semibold transition-all
                ${isMinimized ? 'md:justify-center md:px-0 md:hover:ml-0' : 'hover:ml-8'}
                ${isActive
                  ? 'bg-amber-400 text-black'
                  : 'text-white hover:text-white hover:bg-neutral-700'}
              `}
              title={isMinimized ? item.label : ''}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isMinimized ? 'md:hidden' : 'block'}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Home & Toggle Button Section */}
        <div className="p-4 border-t border-neutral-700 space-y-2">
          <NavLink
            to="/"
            className={`
              flex items-center gap-3 px-4 py-2 rounded text-sm font-bold transition-all
              ${isMinimized ? 'md:justify-center md:px-0' : 'hover:bg-neutral-700'}
              text-gray-400 hover:text-white
            `}
            title="Beranda Utama"
          >
            <div className="flex-shrink-0">
              <Home size={20} />
            </div>
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isMinimized ? 'md:hidden' : 'block'}`}>
              Beranda Utama
            </span>
          </NavLink>

          <div className="hidden md:block">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-full flex items-center justify-center p-2 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors"
              title={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
            >
              {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-neutral-800 border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="p-2 md:hidden text-gray-400 hover:bg-neutral-700 hover:text-white rounded"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            {/* Back to Home Button removed from here */}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-bold text-gray-100">Panel Petani</p>
            <p className="text-xs text-gray-400">AgriConnect – TECHSOFT 2026</p>
          </div>

          <div className="flex items-center gap-4 ml-auto relative">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded transition-colors ${isNotificationsOpen ? 'bg-neutral-700 text-white' : 'text-gray-400 hover:bg-neutral-700 hover:text-white'}`}
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded border-2 border-neutral-800"></span>
              </button>

              {/* Notification Pop-up */}
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsNotificationsOpen(false)}></div>
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                      <span className="font-bold text-gray-900">Notifikasi</span>
                      <button className="text-xs text-emerald-600 font-semibold hover:underline">Baca semua</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${notif.unread ? 'bg-emerald-50/50' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-bold text-gray-900">{notif.title}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{notif.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                    <NavLink
                      to="/petani/notifications"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="w-full py-2.5 text-xs text-center text-gray-500 font-medium bg-gray-50 hover:bg-gray-100 transition-colors block"
                    >
                      Lihat Semua Notifikasi
                    </NavLink>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-4 hover:bg-neutral-700/50 p-2 rounded-lg transition-colors group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-100 leading-none">Pak Sugeng</p>
                <p className="text-[10px] text-gray-200 font-medium mt-1 uppercase tracking-wider">Mitra Petani Indramayu</p>
              </div>
              <div className="w-10 h-10 rounded bg-amber-400 border-2 border-agri-100 flex items-center justify-center text-black font-bold shadow-sm relative">
                PS
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-neutral-800 rounded-full"></div>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                    <p className="text-sm font-bold text-gray-900 leading-none">Pak Sugeng</p>
                    <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">Mitra Petani</p>
                  </div>

                  <NavLink
                    to="/"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-amber-600 font-bold hover:bg-amber-50 transition-colors border-b border-gray-100"
                  >
                    <Home size={16} />
                    <span>Beranda Utama</span>
                  </NavLink>

                  <NavLink
                    to="/petani/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} />
                    <span>Pengaturan</span>
                  </NavLink>

                  <NavLink
                    to="/petani/help"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-50"
                  >
                    <HelpCircle size={16} />
                    <span>Pusat Bantuan</span>
                  </NavLink>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Handle logout logic here
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                  >
                    <LogOut size={16} />
                    <span>Keluar</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerLayout;