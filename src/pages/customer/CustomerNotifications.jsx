import React, { useState } from 'react';
import {
   Bell,
   ShoppingBag,
   Info,
   Star,
   CheckCircle2,
   Clock,
   Filter,
   Trash2,
   MoreVertical,
   X,
   ChevronRight,
   ShieldCheck,
   AlertCircle,
   ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerNotifications = () => {
   const navigate = useNavigate();
   const [activeFilter, setActiveFilter] = useState('Semua');
   const [selectedNotif, setSelectedNotif] = useState(null);
   const [showDetailModal, setShowDetailModal] = useState(false);

   const [notifications, setNotifications] = useState([
      {
         id: 1,
         type: 'Transaksi',
         title: 'Pesanan Terkirim',
         message: 'Hore! Pesanan Tomat Roma (2kg) Anda sedang dalam perjalanan oleh kurir.',
         time: '2 menit yang lalu',
         fullDate: '25 Maret 2026, 20:28 WIB',
         icon: <ShoppingBag className="text-emerald-600" size={20} />,
         bgColor: 'bg-emerald-50',
         unread: true,
         actionLabel: 'Lacak Pesanan'
      },
      {
         id: 2,
         type: 'Info',
         title: 'Panen Baru Tersedia',
         message: 'Pak Sugeng baru saja mengupdate stok Cabai Rawit. Cek sekarang sebelum kehabisan!',
         time: '1 jam yang lalu',
         fullDate: '25 Maret 2026, 19:30 WIB',
         icon: <Bell className="text-amber-600" size={20} />,
         bgColor: 'bg-amber-50',
         unread: true,
         actionLabel: 'Lihat Produk'
      },
      {
         id: 3,
         type: 'Promo',
         title: 'Voucher Ongkir Gratis',
         message: 'Gunakan kode AGRIFREE untuk gratis ongkir s/d Rp 20.000 hari ini.',
         time: '5 jam yang lalu',
         fullDate: '25 Maret 2026, 15:00 WIB',
         icon: <Star className="text-purple-600" size={20} />,
         bgColor: 'bg-purple-50',
         unread: false,
         actionLabel: 'Klaim Voucher'
      },
      {
         id: 4,
         type: 'Transaksi',
         title: 'Pembayaran Berhasil',
         message: 'Pembayaran untuk pesanan #INV-9921 telah kami terima. Terima kasih!',
         time: 'Kemarin, 14:20',
         fullDate: '24 Maret 2026, 14:20 WIB',
         icon: <CheckCircle2 className="text-blue-600" size={20} />,
         bgColor: 'bg-blue-50',
         unread: false,
         actionLabel: 'Lihat Invoice'
      },
      {
         id: 5,
         type: 'Info',
         title: 'Pemeliharaan Sistem',
         message: 'Sistem akan melakukan pemeliharaan rutin pada pukul 00:00 WIB nanti.',
         time: 'Kemarin, 10:00',
         fullDate: '24 Maret 2026, 10:00 WIB',
         icon: <Clock className="text-gray-600" size={20} />,
         bgColor: 'bg-gray-50',
         unread: false
      }
   ]);

   const filters = ['Semua', 'Transaksi', 'Info', 'Promo'];

   const filteredNotifications = activeFilter === 'Semua'
      ? notifications
      : notifications.filter(n => n.type === activeFilter);

   const handleMarkAsRead = (id) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
   };

   const handleMarkAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
   };

   const handleDelete = (e, id) => {
      e.stopPropagation();
      setNotifications(prev => prev.filter(n => n.id !== id));
   };

   const handleDeleteAll = () => {
      if (window.confirm('Hapus semua notifikasi?')) {
         setNotifications([]);
      }
   };

   const handleOpenDetail = (notif) => {
      setSelectedNotif(notif);
      setShowDetailModal(true);
      handleMarkAsRead(notif.id);
   };

   return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-20">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Notifikasi</h1>
               <p className="text-sm text-gray-400 font-medium">Informasi terbaru mengenai transaksi dan pembaruan hasil panen.</p>
            </div>
            <div className="flex items-center gap-2">
               <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-neutral-900 hover:text-white transition-all shadow-sm active:scale-95"
               >
                  <CheckCircle2 size={16} />
                  Tandai Dibaca
               </button>
               <button
                  onClick={handleDeleteAll}
                  className="p-3 bg-white border border-gray-100 rounded-2xl text-red-500 hover:bg-red-50 transition-all shadow-sm active:scale-95"
                  title="Hapus Semua"
               >
                  <Trash2 size={20} />
               </button>
            </div>
         </div>

         {/* Filters */}
         <div className="flex items-center gap-2 p-1.5 bg-gray-50 rounded-2xl w-fit border border-gray-100">
            {filters.map(filter => (
               <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter
                        ? 'bg-neutral-900 text-white shadow-xl shadow-neutral-200'
                        : 'text-gray-400 hover:text-neutral-900 hover:bg-white'
                     }`}
               >
                  {filter}
               </button>
            ))}
         </div>

         {/* Notifications List */}
         <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
               filteredNotifications.map((notif) => (
                  <div
                     key={notif.id}
                     onClick={() => handleOpenDetail(notif)}
                     className={`group p-6 rounded-[6px] border transition-all cursor-pointer flex gap-5 items-start relative
                        ${notif.unread
                           ? 'bg-amber-50/20 border-amber-100 shadow-lg shadow-amber-50/50'
                           : 'bg-white border-gray-50 hover:border-gray-200 hover:shadow-xl hover:shadow-neutral-100'}
                     `}
                  >
                     {notif.unread && (
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-400 rounded-l-full"></div>
                     )}

                     <div className={`p-4 rounded-2xl flex-shrink-0 transition-transform group-hover:scale-110 duration-300 ${notif.bgColor}`}>
                        {notif.icon}
                     </div>

                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{notif.type}</span>
                              {notif.unread && (
                                 <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                              )}
                           </div>
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                              {notif.time}
                           </span>
                        </div>

                        <h3 className={`text-base font-black text-neutral-900 leading-tight mb-2 ${notif.unread ? '' : 'opacity-80'}`}>
                           {notif.title}
                        </h3>

                        <p className={`text-sm leading-relaxed ${notif.unread ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                           {notif.message}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <button className="text-[10px] font-black uppercase tracking-widest text-neutral-900 hover:text-amber-600 transition-colors flex items-center gap-1">
                                 Lihat Detail <ChevronRight size={12} />
                              </button>
                              <button
                                 onClick={(e) => handleDelete(e, notif.id)}
                                 className="text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                 Hapus
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-gray-50">
                  <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                     <Bell size={48} className="text-gray-200" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 uppercase">Belum ada notifikasi</h3>
                  <p className="text-sm text-gray-400 mt-2 font-medium max-w-xs">
                     Pemberitahuan tentang transaksi, radar panen, dan info platform akan muncul di sini.
                  </p>
               </div>
            )}
         </div>

         {/* Settings Shortcut */}
         <div className="bg-neutral-900 rounded-[6px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="z-10 text-center md:text-left">
               <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <ShieldCheck className="text-amber-400" size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">Preferensi Anda</span>
               </div>
               <h3 className="text-xl font-black uppercase">Atur Notifikasi</h3>
               <p className="text-sm text-gray-400 mt-1 font-medium italic">Pilih jenis informasi yang ingin dikirimkan ke WhatsApp Anda.</p>
            </div>
            <button
               onClick={() => navigate('/pelanggan/settings')}
               className="px-10 py-4 bg-white text-neutral-900 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-amber-400 transition-all z-10 shadow-xl active:scale-95 flex items-center gap-3"
            >
               Buka Pengaturan <ArrowRight size={16} />
            </button>
         </div>

         {/* Detail Modal */}
         {showDetailModal && selectedNotif && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowDetailModal(false)}></div>
               <div className="bg-white rounded-[6px] p-10 w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-500">
                  <button
                     onClick={() => setShowDetailModal(false)}
                     className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-xl transition-all"
                  >
                     <X size={20} className="text-gray-400" />
                  </button>

                  <div className="mb-8">
                     <div className={`w-16 h-16 ${selectedNotif.bgColor} rounded-3xl flex items-center justify-center mb-6`}>
                        {selectedNotif.icon}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2 block">{selectedNotif.type}</span>
                     <h2 className="text-2xl font-black text-neutral-900 leading-tight mb-2">{selectedNotif.title}</h2>
                     <p className="text-xs font-medium text-gray-400 uppercase tracking-tight">{selectedNotif.fullDate}</p>
                  </div>

                  <div className="p-8 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
                     <p className="text-gray-700 leading-relaxed font-medium">
                        {selectedNotif.message}
                     </p>
                  </div>

                  <div className="flex flex-col gap-3">
                     {selectedNotif.actionLabel && (
                        <button className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-black transition-all">
                           {selectedNotif.actionLabel}
                        </button>
                     )}
                     <button
                        onClick={() => setShowDetailModal(false)}
                        className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                     >
                        Tutup
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default CustomerNotifications;
