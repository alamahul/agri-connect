import React, { useState } from 'react';
import { Bell, Shield, Users, Package, AlertOctagon, CheckCircle2, Filter, Trash2, MoreVertical, Search, Settings, ArrowRight, ExternalLink } from 'lucide-react';

const AdminNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'Keamanan', 'User', 'Sengketa', 'Sistem'];

  const initialNotifications = [
    {
      id: 1,
      type: 'Keamanan',
      title: 'Percobaan Login Mencurigakan',
      message: 'Sistem mendeteksi percobaan login berkali-kali dari IP 192.168.1.100 (Jakarta). Akun "admin_agro" telah dikunci sementara.',
      time: '1 menit yang lalu',
      icon: <Shield className="text-red-600" size={20} />,
      bgColor: 'bg-red-50',
      unread: true,
      priority: 'High',
      actionLabel: 'Audit Keamanan'
    },
    {
      id: 2,
      type: 'Sengketa',
      title: 'Laporan Sengketa Baru #DIS-0021',
      message: 'Pelanggan "Andi" melaporkan sayur busuk dari Petani "Sugeng". Segera tinjau Pohon Keputusan Sengketa.',
      time: '15 menit yang lalu',
      icon: <AlertOctagon className="text-amber-600" size={20} />,
      bgColor: 'bg-amber-50',
      unread: true,
      priority: 'Medium',
      actionLabel: 'Selesaikan Sengketa'
    },
    {
      id: 3,
      type: 'User',
      title: 'Verifikasi KYC Petani Baru',
      message: '12 petani baru dari wilayah Jawa Barat menunggu verifikasi dokumen identitas.',
      time: '1 jam yang lalu',
      icon: <Users className="text-blue-600" size={20} />,
      bgColor: 'bg-blue-50',
      unread: true,
      priority: 'Low',
      actionLabel: 'Buka KYC Center'
    },
    {
      id: 4,
      type: 'Sistem',
      title: 'Laporan Investor Siap Unduh',
      message: 'Sistem telah selesai men-generate Laporan Kinerja Kuartal 1. File PDF tersedia di Export Center.',
      time: 'Kemarin, 09:00',
      icon: <CheckCircle2 className="text-emerald-600" size={20} />,
      bgColor: 'bg-emerald-50',
      unread: false,
      priority: 'Low',
      actionLabel: 'Lihat Laporan'
    },
    {
      id: 5,
      type: 'Sistem',
      title: 'Update Database SLA',
      message: 'Konfigurasi Auto-Payout SLA telah diperbarui oleh SuperAdmin menjadi "Jumat Sore".',
      time: '2 hari yang lalu',
      icon: <Settings className="text-gray-600" size={20} />,
      bgColor: 'bg-gray-50',
      unread: false,
      priority: 'Low',
      actionLabel: 'Cek Log Perubahan'
    }
  ];

  const filteredNotifications = activeFilter === 'Semua' 
    ? initialNotifications 
    : initialNotifications.filter(n => n.type === activeFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <h1 className="text-2xl font-black text-neutral-800 tracking-tight">Pusat Komando Notifikasi</h1>
          </div>
          <p className="text-sm text-gray-500">Monitor seluruh aktivitas platform, keamanan, dan sengketa pengguna secara real-time.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded text-xs font-bold text-gray-700 hover:bg-neutral-800 hover:text-white transition-all shadow-sm">
            <CheckCircle2 size={14} />
            Tandai Selesai
          </button>
          <button className="p-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition-all shadow-md">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Control Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-wrap items-center gap-2 p-1 bg-gray-100 rounded-lg">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded text-xs font-black transition-all uppercase tracking-wider ${
                activeFilter === filter 
                  ? 'bg-neutral-800 text-white shadow-lg' 
                  : 'text-gray-500 hover:text-neutral-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative group min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-neutral-800 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Cari ID Sengketa atau User..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:border-neutral-800 rounded text-xs font-medium outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Admin Notifications List */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-5 md:p-6 transition-all hover:bg-gray-50/80 cursor-pointer flex gap-5 items-start ${notif.unread ? 'relative overflow-hidden' : ''}`}
              >
                {notif.unread && (
                  <div className={`absolute top-0 left-0 bottom-0 w-1 ${
                    notif.priority === 'High' ? 'bg-red-500' : 
                    notif.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></div>
                )}
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-white/50 ${notif.bgColor}`}>
                  {notif.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-bold text-neutral-800">{notif.title}</h3>
                        {notif.priority === 'High' && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-black rounded uppercase">Urgent</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        {notif.message}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-gray-400 block mb-1">{notif.time}</span>
                      <span className="text-[10px] font-black text-neutral-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 uppercase tracking-tighter italic">#{notif.id}AD</span>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-xs font-black text-neutral-800 hover:text-emerald-600 transition-colors bg-gray-100 px-3 py-1.5 rounded-lg group">
                        {notif.actionLabel}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-neutral-800 transition-colors">
                        <ExternalLink size={12} />
                        Lihat Log
                      </button>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-neutral-800 hover:bg-gray-100 rounded transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
              <Bell size={48} className="text-gray-200" />
              <CheckCircle2 size={24} className="text-emerald-500 absolute -bottom-1 -right-1" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800">Sistem Berjalan Normal</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              Tidak ada notifikasi baru yang perlu penanganan Admin saat ini.
            </p>
          </div>
        )}
      </div>

      {/* Command Center Quick Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 p-6 rounded-2xl text-white relative group cursor-pointer overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <h4 className="text-lg font-black tracking-tight mb-2">Audit Keamanan Sistem</h4>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">Cek daftar IP yang terblokir dan aktivitas login mencurigakan untuk menjaga integritas data AgriConnect.</p>
          <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
            Jalankan Audit Sekarang <ArrowRight size={14} />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-900 p-6 rounded-2xl text-white relative group cursor-pointer overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <h4 className="text-lg font-black tracking-tight mb-2">Decision Tree Sengketa</h4>
          <p className="text-xs text-emerald-100/70 leading-relaxed mb-4">Butuh bantuan menyelesaikan konflik? Gunakan Interactive Dispute Tree untuk keputusan yang objektif.</p>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
            Buka Pohon Keputusan <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
