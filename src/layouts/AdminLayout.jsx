import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Package, FileText, BarChart3, HelpCircle, Settings, Menu, Shield, ChevronLeft, ChevronRight, LogOut, Database, Bell, Home } from 'lucide-react';
import logoOnly from '../assets/logo-only.png';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'Security Alert', message: 'Suspicious login attempt from IP 192.168.1.100', time: '1min ago', unread: true },
    { id: 2, title: 'New Dispute', message: 'User "Andi" filed a dispute #DIS-0021', time: '15min ago', unread: true },
    { id: 3, title: 'KYC Pending', message: '12 new farmers awaiting verification', time: '1hr ago', unread: true },
  ];

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Database size={20} />, label: 'Data Master', path: '/admin/data' },
    { icon: <Users size={20} />, label: 'Manajemen User', path: '/admin/users' },
    { icon: <Package size={20} />, label: 'Produk & Pesanan', path: '/admin/products' },
    { icon: <FileText size={20} />, label: 'Artikel', path: '/admin/articles' },
    { icon: <BarChart3 size={20} />, label: 'Analisis & Laporan', path: '/admin/analytics' },
    { icon: <HelpCircle size={20} />, label: 'Bantuan', path: '/admin/help' },
    { icon: <Settings size={20} />, label: 'Pengaturan', path: '/admin/settings' },
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
          <img src={logoOnly} alt="logo agriconnect" className="w-10 h-10 object-contain" />
          <div className={`transition-all duration-300 ${isMinimized ? 'md:hidden' : 'block'}`}>
            <span className="text-xl font-extrabold text-white tracking-tight whitespace-nowrap block">
              AgriConnect
            </span>
            <div className="flex items-center gap-1 mt-0.5 whitespace-nowrap">
              <Shield size={10} className="text-amber-400" />
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Admin Panel</span>
            </div>
          </div>
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
            <p className="text-sm font-bold text-gray-100">Panel Administrator</p>
            <p className="text-xs text-gray-400">AgriConnect – TECHSOFT 2026</p>
          </div>

          <div className="flex items-center gap-4 ml-auto relative">
            <div className="hidden lg:flex items-center gap-2 bg-neutral-700/50 px-3 py-2 rounded">
              <div className="w-2 h-2 bg-green-500 rounded animate-pulse"></div>
              <span className="text-xs font-bold text-gray-200">Sistem Online</span>
            </div>

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
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right text-left">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                      <span className="font-bold text-gray-900 uppercase tracking-tighter text-xs">System Alerts</span>
                      <button className="text-[10px] text-red-600 font-black hover:underline uppercase tracking-widest">Clear all</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${notif.unread ? 'bg-red-50/30 border-l-2 border-red-500' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[11px] font-black text-gray-900 uppercase">{notif.title}</span>
                            <span className="text-[9px] text-gray-400 font-bold">{notif.time}</span>
                          </div>
                          <p className="text-[10px] text-gray-500 font-medium leading-tight">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                    <NavLink
                      to="/admin/notifications"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="w-full py-2.5 text-[10px] text-center text-neutral-800 font-black bg-gray-50 hover:bg-neutral-800 hover:text-white transition-all block uppercase tracking-widest"
                    >
                      Open Command Center
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
                <p className="text-sm font-bold text-gray-100 leading-none">Admin AgriConnect</p>
                <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Superadmin</p>
              </div>
              <div className="w-10 h-10 rounded bg-amber-400 border-2 border-amber-200 flex items-center justify-center text-black font-bold shadow-sm relative">
                AD
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
                    <p className="text-sm font-bold text-gray-900 leading-none">Admin AgriConnect</p>
                    <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">Superadmin</p>
                  </div>

                  <div className="md:hidden px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded animate-pulse"></div>
                      <span className="text-[10px] font-bold text-neutral-700">Sistem Online</span>
                    </div>
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
                    to="/admin/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} />
                    <span>Pengaturan</span>
                  </NavLink>

                  <NavLink
                    to="/admin/help"
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

export default AdminLayout;
