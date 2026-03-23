import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Save } from 'lucide-react';

const AdminSettings = () => {
  const [notif, setNotif] = useState({ sengketa: true, userBaru: true, sistemError: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Admin</h1>
        <p className="text-sm text-gray-500">Konfigurasi akun dan preferensi panel administrator.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded border border-gray-100 shadow-sm p-6 text-center">
            <div className="w-20 h-20 rounded bg-slate-800 flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">AD</div>
            <h3 className="font-extrabold text-gray-900">Administrator</h3>
            <p className="text-sm text-gray-500 mt-0.5">Superadmin AgriConnect</p>
            <div className="mt-4 pt-4 border-t border-gray-100 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Level Akses</span>
                <span className="font-bold text-gray-900">Superadmin</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Terakhir Login</span>
                <span className="font-bold text-gray-900">22 Mar 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          {/* Profile */}
          <div className="bg-white rounded border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
              <User size={18} className="text-agri-700" /> Informasi Akun
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Admin</label>
                  <input defaultValue="Admin AgriConnect" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                  <input defaultValue="admin@agriconnect.id" type="email" className="w-full" />
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-agri-700 hover:bg-agri-800 text-white font-bold text-sm rounded transition-all shadow-md">
                <Save size={16} /> Simpan
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Bell size={18} className="text-agri-700" /> Notifikasi Admin
            </h2>
            <div className="space-y-4">
              {[
                { key: 'sengketa', label: 'Sengketa Escrow Baru', desc: 'Notifikasi saat ada transaksi yang masuk ke status sengketa' },
                { key: 'userBaru', label: 'Petani Baru Mendaftar', desc: 'Alert saat ada akun petani yang menunggu verifikasi' },
                { key: 'sistemError', label: 'Peringatan Sistem', desc: 'Notifikasi masalah teknis atau anomali platform' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotif(p => ({ ...p, [item.key]: !p[item.key] }))}
                    className={`w-12 h-6 rounded transition-all flex-shrink-0 relative ${notif[item.key] ? 'bg-agri-600' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded shadow transition-all ${notif[item.key] ? 'left-6' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Lock size={18} className="text-agri-700" /> Keamanan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Password Saat Ini</label>
                <input type="password" placeholder="••••••••" className="w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Password Baru</label>
                  <input type="password" placeholder="Min. 12 karakter" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Konfirmasi</label>
                  <input type="password" placeholder="Ulangi password" className="w-full" />
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded transition-all">
                <Lock size={16} /> Ubah Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
