import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Tambahkan Outlet dan NavLink
import { LayoutDashboard, Box, ShoppingCart, BarChart3, HelpCircle, Settings, Menu, X } from 'lucide-react';

const FarmerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/petani/dashboard' },
    { icon: <Box size={20} />, label: 'Gudang Produk', path: '/petani/inventory' },
    { icon: <ShoppingCart size={20} />, label: 'Pesanan', path: '/petani/orders' },
    { icon: <BarChart3 size={20} />, label: 'Analisis Penjualan', path: '/petani/analytics' },
    { icon: <HelpCircle size={20} />, label: 'Bantuan', path: '/petani/help' },
    { icon: <Settings size={20} />, label: 'Pengaturan', path: '/petani/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-['Plus_Jakarta_Sans']">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static
      `}>
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <span className="text-xl font-extrabold text-green-700 tracking-tight">AgriConnect.</span>
        </div>
        
        <nav className="p-4 space-y-1">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)} // Tutup sidebar di mobile setelah klik
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                ${isActive 
                  ? 'bg-green-600 text-white shadow-md shadow-green-200' 
                  : 'text-gray-500 hover:bg-green-50 hover:text-green-700'}
              `}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <button 
            className="p-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-none">Pak Sugeng</p>
              <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">Mitra Petani Indramayu</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-700 border-2 border-green-100 flex items-center justify-center text-white font-bold shadow-sm">
              PS
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Outlet akan merender komponen sesuai path di App.jsx */}
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerLayout;