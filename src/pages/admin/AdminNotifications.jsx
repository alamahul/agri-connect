import React, { useState } from 'react';
import { Bell, Shield, Users, Package, AlertOctagon, CheckCircle2, Filter, Trash2, MoreVertical, Search, Settings, ArrowRight, ExternalLink } from 'lucide-react';

const AdminNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  const filters = ['Semua', 'Keamanan', 'User', 'Sengketa', 'Sistem'];

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Keamanan',
      title: 'Percobaan Login Mencurigakan',
      message: 'Sistem mendeteksi percobaan login berkali-kali dari IP 192.168.1.100 (Jakarta). Akun "admin_agro" telah dikunci sementara.',
      time: '1 menit yang lalu',
      icon: <Shield className="text-red-600" size={20} />,
      bgColor: 'bg-red-50 border-red-100',
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
      bgColor: 'bg-amber-50 border-amber-100',
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
      bgColor: 'bg-blue-50 border-blue-100',
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
      bgColor: 'bg-emerald-50 border-emerald-100',
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
      bgColor: 'bg-gray-50 border-gray-200',
      unread: false,
      priority: 'Low',
      actionLabel: 'Cek Log Perubahan'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
    showNotification("Seluruh Notifikasi Ditandai Selesai");
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    showNotification("Notifikasi Dihapus dari Log Sistem");
  };

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    const matchFilter = activeFilter === 'Semua' || n.type === activeFilter;
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">

      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-neutral-900 border border-neutral-700 text-white px-6 py-4 rounded-[6px] shadow-2xl flex items-center gap-3">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <p className="text-[11px] font-black uppercase tracking-widest">{toast}</p>
          </div>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            {unreadCount > 0 ? (
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"></span>
            ) : (
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            )}
            <h1 className="text-2xl font-black text-neutral-800 tracking-tight italic uppercase">Pusat Komando Notifikasi</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase ml-2">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-[11px] font-black tracking-widest uppercase text-gray-400">Monitor seluruh aktivitas platform, keamanan, dan sengketa pengguna secara real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={markAllAsRead} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-[6px] text-[10px] font-black uppercase tracking-widest text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shadow-sm group">
            <CheckCircle2 size={16} className="text-emerald-500 group-hover:text-emerald-400" />
            Tandai Selesai
          </button>
          <button onClick={() => showNotification("Pengaturan Log Notifikasi Terbuka")} className="p-3 bg-neutral-900 text-white rounded-[6px] hover:bg-emerald-600 transition-all shadow-md">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Control Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-wrap items-center gap-2 p-1.5 bg-gray-100 rounded-[6px] border border-gray-200">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-[4px] text-[9px] font-black transition-all uppercase tracking-widest ${activeFilter === filter
                  ? 'bg-neutral-900 text-white shadow-md scale-[1.02]'
                  : 'text-gray-500 hover:text-neutral-900 hover:bg-gray-200'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative group/search min-w-[300px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ID Sengketa atau User..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-[6px] text-xs font-bold outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Admin Notifications List */}
      <div className="bg-white rounded-[6px] shadow-2xl border border-gray-100 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-6 transition-all group flex gap-5 items-start relative ${notif.unread ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-100 opacity-90'} border-b border-gray-100 last:border-b-0`}
              >
                {notif.unread && (
                  <div className={`absolute top-0 left-0 bottom-0 w-1 ${notif.priority === 'High' ? 'bg-red-500' :
                      notif.priority === 'Medium' ? 'bg-amber-500' : 'bg-indigo-500'
                    }`}></div>
                )}

                <div onClick={() => toggleReadStatus(notif.id)} className={`w-14 h-14 rounded-[6px] flex items-center justify-center flex-shrink-0 shadow-sm border cursor-pointer hover:scale-105 transition-transform ${notif.bgColor}`} title="Tandai Baca / Belum Baca">
                  {notif.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`text-base font-black tracking-tight ${notif.unread ? 'text-neutral-900' : 'text-gray-500'}`}>{notif.title}</h3>
                        {notif.priority === 'High' && notif.unread && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[9px] font-black rounded uppercase tracking-wider animate-pulse border border-red-200">Urgent Required</span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold leading-relaxed max-w-3xl">
                        {notif.message}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="bg-gray-100 px-3 py-1.5 rounded-[4px] border border-gray-200 mb-1 inline-block">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">#{notif.id}AD-LOG</span>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 block uppercase tracking-widest">{notif.time}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <button onClick={() => showNotification(`Menjalankan: ${notif.actionLabel}`)} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-[6px] group/btn transition-all shadow-sm ${notif.unread ? 'bg-neutral-900 text-white hover:bg-emerald-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                        {notif.actionLabel}
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => showNotification(`Membuka Data Mentah Log #${notif.id}`)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-neutral-900 hover:bg-gray-100 px-4 py-3 rounded-[6px] transition-colors">
                        <ExternalLink size={14} />
                        Raw Log
                      </button>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => deleteNotification(notif.id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-[6px] transition-all shadow-sm bg-white">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 xl:py-40 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative border-4 border-white shadow-xl">
              <Shield size={40} className="text-gray-300" />
              <CheckCircle2 size={28} className="text-emerald-500 absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-sm" />
            </div>
            <h3 className="text-2xl font-black text-neutral-900 tracking-tighter italic uppercase">Sistem Berjalan Normal</h3>
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mt-2 max-w-sm leading-relaxed">
              Tidak ada log notifikasi yang sesuai filter. Semua peringatan telah ditangani.
            </p>
          </div>
        )}
      </div>

      {/* Command Center Quick Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div onClick={() => showNotification("Fitur Audit Keamanan Terbuka")} className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 p-8 rounded-[6px] text-white relative group cursor-pointer overflow-hidden shadow-2xl hover:-translate-y-1 transition-all">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none mb-3">Audit Keamanan Sistem</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-relaxed mb-8 max-w-xs">Cek daftar IP terblokir dan aktivitas login mencurigakan untuk menjaga integritas AgriConnect.</p>
          <div className="flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
            Jalankan Audit Penuh <ArrowRight size={16} />
          </div>
        </div>

        <div onClick={() => showNotification("Fitur Decision Tree Terbuka")} className="bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-900 p-8 rounded-[6px] text-white relative group cursor-pointer overflow-hidden shadow-2xl hover:-translate-y-1 transition-all">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <h4 className="text-xl font-black uppercase tracking-tighter italic leading-none mb-3">Decision Tree Sengketa</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100/60 leading-relaxed mb-8 max-w-xs">Bantuan penyelesaian konflik menggunakan Interactive Dispute Tree untuk keputusan objektif.</p>
          <div className="flex items-center gap-3 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
            Buka Pohon Keputusan <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
