import React, { useState } from 'react';
import { Bell, ShoppingCart, Package, Info, CheckCircle2, AlertTriangle, Filter, Trash2, MoreVertical, Search, ArrowRight } from 'lucide-react';

const FarmerNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'Pesanan Baru', 'Stok & Gudang', 'Info Sistem'];

  const initialNotifications = [
    {
      id: 1,
      type: 'Pesanan Baru',
      title: 'Pesanan Baru Masuk!',
      message: 'Pelanggan "Siti Aminah" baru saja memesan 5kg Bawang Merah. Segera proses sebelum jam 17:00.',
      time: '3 menit yang lalu',
      icon: <ShoppingCart className="text-emerald-600" size={20} />,
      bgColor: 'bg-emerald-50',
      unread: true,
      actionLabel: 'Lihat Pesanan',
      link: '/petani/orders'
    },
    {
      id: 2,
      type: 'Stok & Gudang',
      title: 'Peringatan Stok Rendah',
      message: 'Stok Tomat Roma Anda tersisa 2kg lagi. Segera update jika panen sudah siap.',
      time: '2 jam yang lalu',
      icon: <Package className="text-amber-600" size={20} />,
      bgColor: 'bg-amber-50',
      unread: true,
      actionLabel: 'Update Stok',
      link: '/petani/inventory'
    },
    {
      id: 3,
      type: 'Info Sistem',
      title: 'Pencairan Dana Berhasil',
      message: 'Dana sebesar Rp 1.250.000 dari transaksi #TX-8821 telah dicairkan ke saldo Anda.',
      time: 'Kemarin, 16:45',
      icon: <CheckCircle2 className="text-blue-600" size={20} />,
      bgColor: 'bg-blue-50',
      unread: false,
      actionLabel: 'Cek Saldo',
      link: '/petani/analytics'
    },
    {
      id: 4,
      type: 'Info Sistem',
      title: 'Update Syarat & Ketentuan',
      message: 'Terdapat pembaruan pada komisi platform mulai bulan depan. Harap baca detailnya.',
      time: '2 hari yang lalu',
      icon: <Info className="text-purple-600" size={20} />,
      bgColor: 'bg-purple-50',
      unread: false,
      actionLabel: 'Baca Detail',
      link: '/petani/help'
    },
    {
      id: 5,
      type: 'Stok & Gudang',
      title: 'Produk Kadaluarsa?',
      message: 'Sistem mendeteksi Bawang Putih Anda sudah terdaftar selama 14 hari tanpa update.',
      time: '3 hari yang lalu',
      icon: <AlertTriangle className="text-red-600" size={20} />,
      bgColor: 'bg-red-50',
      unread: false,
      actionLabel: 'Cek Produk',
      link: '/petani/inventory'
    }
  ];

  const filteredNotifications = activeFilter === 'Semua' 
    ? initialNotifications 
    : initialNotifications.filter(n => n.type === activeFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-800">Pusat Notifikasi Mitra</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau pesanan, stok, dan informasi penting lainnya untuk kelancaran bisnis Anda.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 text-sm font-bold text-gray-700 transition-all rounded">
            <CheckCircle2 size={16} />
            Baca Semua
          </button>
          <div className="w-px h-6 bg-gray-200"></div>
          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all rounded">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded text-sm font-bold whitespace-nowrap transition-all ${
                activeFilter === filter 
                  ? 'bg-neutral-800 text-white shadow-md' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Cari notifikasi..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:border-emerald-500 focus:bg-white rounded text-sm outline-none transition-all"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="grid gap-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`group relative bg-white rounded-xl border p-4 md:p-6 transition-all hover:border-emerald-200 hover:shadow-lg flex flex-col md:flex-row gap-4 md:items-center ${notif.unread ? 'border-l-4 border-l-emerald-500 border-emerald-100 shadow-sm' : 'border-gray-100'}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.bgColor}`}>
                {notif.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${
                    notif.type === 'Pesanan Baru' ? 'bg-emerald-100 text-emerald-700' :
                    notif.type === 'Stok & Gudang' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {notif.type}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">• {notif.time}</span>
                </div>
                <h3 className="text-base font-bold text-neutral-800 group-hover:text-emerald-700 transition-colors">{notif.title}</h3>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">{notif.message}</p>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0 ml-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-emerald-600 hover:text-white text-emerald-600 text-xs font-extrabold rounded transition-all whitespace-nowrap">
                  {notif.actionLabel}
                  <ArrowRight size={14} />
                </button>
                <button className="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              {notif.unread && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full border-4 border-white md:hidden"></div>
              )}
            </div>
          ))
        ) : (
          <div className="py-24 bg-white rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Bell size={44} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800">Tidak ada notifikasi</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              Kami akan memberitahu Anda di sini jika ada pesanan baru atau stok yang perlu diperiksa.
            </p>
          </div>
        )}
      </div>

      {/* Pro Tip Card */}
      <div className="bg-emerald-900 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex items-start gap-4 z-10 relative">
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <Star className="text-amber-400 fill-amber-400" size={24} />
          </div>
          <div>
            <h4 className="text-lg font-bold">Tips Tingkatkan Penjualan</h4>
            <p className="text-sm text-emerald-100/70 mt-1 max-w-xl">
              Gunakan fitur <span className="text-amber-400 font-bold">Panen Besok</span> untuk mengumumkan hasil panen lebih awal. Petani yang rajin update stok mendapatkan prioritas di halaman utama pelanggan!
            </p>
            <button className="mt-4 text-sm font-bold text-amber-400 hover:underline">Pelajari Selengkapnya</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerNotifications;
