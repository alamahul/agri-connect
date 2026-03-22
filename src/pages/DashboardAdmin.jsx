import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Settings, LogOut, ShieldAlert } from 'lucide-react';

const DashboardAdmin = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <ShieldAlert className="text-emerald-600" size={24} />
          Admin Portal
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 font-medium">Admin: {user?.name || 'Agri Admin'}</span>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-white shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <Settings size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Sistem Overview</h2>
            <p className="text-slate-500 text-sm">Kelola seluruh aktivitas platform AgriConnect dari sini.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px] text-center">
            <Users size={40} className="text-slate-300 mb-3" />
            <h3 className="font-semibold text-slate-700">Manajemen Pengguna</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xs">Pengaturan akses dan verifikasi petani serta pembeli akan tampil di sini.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
