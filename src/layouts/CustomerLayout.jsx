import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, HelpCircle, Settings, Menu, Bell, Star, ChevronLeft, ChevronRight, LogOut, Clock, FileText } from 'lucide-react';
import { CUSTOMER_STATS } from '../data/dummyCustomer';
import logoOnly from '../assets/logo-only.png';

const CustomerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/pelanggan/dashboard' },
    { icon: <ShoppingBag size={20} />, label: 'Pesananku', path: '/pelanggan/orders' },
    { icon: <Clock size={20} />, label: 'Panen Besok', path: '/pelanggan/preorder' },
    { icon: <FileText size={20} />, label: 'Riwayat', path: '/pelanggan/history' },
    { icon: <HelpCircle size={20} />, label: 'Bantuan', path: '/pelanggan/help' },
    { icon: <Settings size={20} />, label: 'Pengaturan', path: '/pelanggan/settings' },
  ];

  const notifications = [
    { id: 1, title: 'Pesanan Terkirim', message: 'Pesanan Tomat Anda sudah dikirim oleh Pak Budi', time: '5mnt yang lalu', unread: true },
    { id: 2, title: 'Panen Baru', message: 'Ada panen jagung baru 2KM dari lokasi Anda!', time: '1jam yang lalu', unread: true },
    { id: 3, title: 'Voucher Baru', message: 'Selamat! Anda mendapatkan voucher Bebas Ongkir', time: '3jam yang lalu', unread: false },
  ];

  const suggestions = [
    { id: 1, name: 'Bawang Merah', category: 'Produk' },
    { id: 2, name: 'Bawang Putih', category: 'Produk' },
    { id: 3, name: 'Pak Budi', category: 'Petani' },
    { id: 4, name: 'Bayam', category: 'Produk' },
  ].filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
          <img src={logoOnly} alt="logo agriconnect" className="w-10 h-10 object-contain" />
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

        {/* Badge section */}
        <div className={`p-4 border-t border-neutral-700 transition-all duration-300 ${isMinimized ? 'hidden' : 'block'}`}>
          <div className="m-2 p-3 bg-neutral-700/50 rounded border border-neutral-600">
            <div className="flex items-center gap-2 mb-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">Status Anda</span>
            </div>
            <p className="text-sm font-bold text-white">{CUSTOMER_STATS.badge}</p>
            <p className="text-xs text-gray-400 mt-1">{CUSTOMER_STATS.loyaltyPoints} poin loyalitas</p>
          </div>
        </div>

        {/* Toggle Button Minimalized (Desktop Only) */}
        <div className="hidden md:block p-4 border-t border-neutral-700">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-full flex items-center justify-center p-2 rounded bg-neutral-700 text-white hover:bg-neutral-600 transition-colors"
            title={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
          >
            {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-neutral-800 border-b border-gray-700 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
          <div className="flex items-center flex-1 gap-4">
            <button
              className="p-2 md:hidden text-gray-400 hover:bg-neutral-700 hover:text-white rounded"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Global Search */}
            <div className="relative max-w-md w-full hidden sm:block">
              <div className="relative group/search">
                <input
                  type="text"
                  placeholder="Cari komoditas atau petani..."
                  className="w-full h-10 pl-10 pr-4 rounded-lg bg-neutral-700 border-transparent focus:bg-neutral-600 focus:border-amber-400 focus:ring-0 text-white text-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  onFocus={() => setShowSearchSuggestions(true)}
                />
              </div>

              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {suggestions.length > 0 ? (
                    suggestions.map(s => (
                      <button
                        key={s.id}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between group"
                        onClick={() => {
                          setSearchQuery(s.name);
                          setShowSearchSuggestions(false);
                        }}
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600">{s.name}</span>
                        <span className="text-[10px] uppercase tracking-wider text-gray-400">{s.category}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">Tidak ada hasil</div>
                  )}
                  <div className="absolute inset-0 z-[-1]" onClick={() => setShowSearchSuggestions(false)}></div>
                </div>
              )}
              {showSearchSuggestions && <div className="fixed inset-0 z-[-1]" onClick={() => setShowSearchSuggestions(false)}></div>}
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto relative">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded transition-colors ${isNotificationsOpen ? 'bg-neutral-700 text-white' : 'text-gray-400 hover:bg-neutral-700 hover:text-white'}`}
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded border-2 border-neutral-800"></span>
              </button>

              {/* Notification Pop-up */}
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsNotificationsOpen(false)}></div>
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                      <span className="font-bold text-gray-900">Notifikasi</span>
                      <button className="text-xs text-amber-600 font-semibold hover:underline">Tandai semua dibaca</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${notif.unread ? 'bg-amber-50/50' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-bold text-gray-900">{notif.title}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{notif.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-2.5 text-xs text-gray-500 font-medium bg-gray-50 hover:bg-gray-100 transition-colors">
                      Lihat Semua Notifikasi
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-4 hover:bg-neutral-700/50 p-2 rounded-lg transition-colors group"
            >
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-gray-100 leading-none">{CUSTOMER_STATS.name}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">{CUSTOMER_STATS.location}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-amber-500/30 flex items-center justify-center text-black font-extrabold shadow-sm relative group-hover:scale-105 transition-transform">
                SA
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-neutral-800 rounded-full"></div>
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
                    <p className="text-sm font-bold text-gray-900 leading-none">{CUSTOMER_STATS.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">{CUSTOMER_STATS.location}</p>
                  </div>

                  <NavLink
                    to="/pelanggan/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} />
                    <span>Pengaturan</span>
                  </NavLink>

                  <div className="md:hidden px-4 py-2 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                    <Bell size={16} />
                    <span>Notifikasi</span>
                  </div>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Handle logout logic here
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1"
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

export default CustomerLayout;
