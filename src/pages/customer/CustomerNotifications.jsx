import React, { useState } from 'react';
import { Bell, ShoppingBag, Info, Star, CheckCircle2, Clock, Filter, Trash2, MoreVertical } from 'lucide-react';

const CustomerNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'Transaksi', 'Info', 'Promo'];

  const initialNotifications = [
    {
      id: 1,
      type: 'Transaksi',
      title: 'Pesanan Terkirim',
      message: 'Hore! Pesanan Tomat Roma (2kg) Anda sedang dalam perjalanan oleh kurir.',
      time: '2 menit yang lalu',
      icon: <ShoppingBag className="text-emerald-600" size={20} />,
      bgColor: 'bg-emerald-50',
      unread: true
    },
    {
      id: 2,
      type: 'Info',
      title: 'Panen Baru Tersedia',
      message: 'Pak Sugeng baru saja mengupdate stok Cabai Rawit. Cek sekarang sebelum kehabisan!',
      time: '1 jam yang lalu',
      icon: <Bell className="text-amber-600" size={20} />,
      bgColor: 'bg-amber-50',
      unread: true
    },
    {
      id: 3,
      type: 'Promo',
      title: 'Voucher Ongkir Gratis',
      message: 'Gunakan kode AGRIFREE untuk gratis ongkir s/d Rp 20.000 hari ini.',
      time: '5 jam yang lalu',
      icon: <Star className="text-purple-600" size={20} />,
      bgColor: 'bg-purple-50',
      unread: false
    },
    {
      id: 4,
      type: 'Transaksi',
      title: 'Pembayaran Berhasil',
      message: 'Pembayaran untuk pesanan #INV-9921 telah kami terima. Terima kasih!',
      time: 'Kemarin, 14:20',
      icon: <CheckCircle2 className="text-blue-600" size={20} />,
      bgColor: 'bg-blue-50',
      unread: false
    },
    {
      id: 5,
      type: 'Info',
      title: 'Pemeliharaan Sistem',
      message: 'Sistem akan melakukan pemeliharaan rutin pada pukul 00:00 WIB nanti.',
      time: 'Kemarin, 10:00',
      icon: <Clock className="text-gray-600" size={20} />,
      bgColor: 'bg-gray-50',
      unread: false
    }
  ];

  const filteredNotifications = activeFilter === 'Semua' 
    ? initialNotifications 
    : initialNotifications.filter(n => n.type === activeFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-800">Pusat Notifikasi</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola dan lihat semua pemberitahuan transaksi serta info platform Anda.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <CheckCircle2 size={16} />
            Tandai Semua Dibaca
          </button>
          <button className="p-2 bg-white border border-gray-200 rounded text-red-600 hover:bg-red-50 transition-all shadow-sm" title="Hapus Semua">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg w-fit">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded text-sm font-bold transition-all ${
              activeFilter === filter 
                ? 'bg-white text-neutral-800 shadow-sm' 
                : 'text-gray-500 hover:text-neutral-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-4 md:p-6 transition-all hover:bg-gray-50 cursor-pointer flex gap-4 items-start ${notif.unread ? 'bg-amber-50/30' : ''}`}
              >
                <div className={`p-3 rounded-lg flex-shrink-0 ${notif.bgColor}`}>
                  {notif.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className={`text-base font-bold text-neutral-800 ${notif.unread ? 'pr-6 relative' : ''}`}>
                        {notif.title}
                        {notif.unread && (
                          <span className="absolute top-1.5 right-0 w-2 h-2 bg-amber-500 rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      {notif.time}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button className="text-xs font-bold text-emerald-600 hover:underline">
                      Lihat Detail
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-xs font-bold text-gray-400 hover:text-red-500">
                      Hapus
                    </button>
                  </div>
                </div>
                <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded rotate-90 md:rotate-0">
                  <MoreVertical size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Bell size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800">Belum ada notifikasi</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xs">
              Pemberitahuan tentang transaksi, info panen, dan promo akan muncul di sini.
            </p>
          </div>
        )}
      </div>

      {/* Settings Shortcut */}
      <div className="bg-neutral-800 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="z-10">
          <h3 className="text-lg font-bold">Atur Preferensi Notifikasi</h3>
          <p className="text-sm text-gray-400 mt-1">Sesuaikan jenis notifikasi apa saja yang ingin Anda terima via WA atau Aplikasi.</p>
        </div>
        <button className="px-6 py-2.5 bg-amber-400 text-black text-sm font-extrabold rounded hover:bg-amber-300 transition-all z-10 whitespace-nowrap">
          Buka Pengaturan
        </button>
      </div>
    </div>
  );
};

export default CustomerNotifications;
