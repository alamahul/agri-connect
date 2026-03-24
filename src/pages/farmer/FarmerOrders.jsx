import React, { useState } from 'react';
import {
   MoreHorizontal,
   Package,
   Truck,
   CheckCircle,
   Clock,
   ChevronRight,
   ShieldCheck,
   MessageCircle,
   MapPin,
   Navigation,
   Calendar,
   AlertCircle,
   X,
   Printer,
   PenTool,
   Phone,
   Search,
   Zap,
   Bot,
   Image as ImageIcon,
   ArrowRight
} from 'lucide-react';

const FARMER_ORDERS = [
   {
      id: 'ORD-20260323-001',
      customer: 'Siti Aminah',
      items: [{ name: 'Tomat Ceri', qty: 10, unit: 'Kg' }, { name: 'Bayam', qty: 5, unit: 'Ikat' }],
      total: 150000,
      status: 'Pesanan Baru',
      date: '23 Mar 2026, 10:00 WIB',
      distance: '15 KM',
      location: 'Bandung',
      isPreOrder: false,
      escrowLocked: true
   },
   {
      id: 'ORD-20260323-002',
      customer: 'Resto Sedap Malam',
      items: [{ name: 'Wortel Brastagi', qty: 25, unit: 'Kg' }],
      total: 300000,
      status: 'Perlu Dikemas',
      date: '23 Mar 2026, 08:30 WIB',
      distance: '22 KM',
      location: 'Cimahi',
      isPreOrder: false,
      escrowLocked: true
   },
   {
      id: 'ORD-20260323-003',
      customer: 'Bapak Sugeng',
      items: [{ name: 'Jagung Manis', qty: 5, unit: 'Kg' }],
      total: 60000,
      status: 'Dikirim',
      date: '22 Mar 2026, 14:00 WIB',
      distance: '5 KM',
      location: 'Lembang',
      isPreOrder: true,
      escrowLocked: true
   },
   {
      id: 'ORD-20260323-004',
      customer: 'Ibu Ratna',
      items: [{ name: 'Cabai Rawit', qty: 2, unit: 'Kg' }],
      total: 90000,
      status: 'Komplain',
      date: '21 Mar 2026, 11:00 WIB',
      distance: '12 KM',
      location: 'Bandung',
      complaintNote: 'Sayur layu saat diterima.',
      complaintImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      isPreOrder: false
   }
];

const FarmerOrders = () => {
   const [activeTab, setActiveTab] = useState('Pesanan Baru');
   const [showProcessModal, setShowProcessModal] = useState(false);
   const [showComplaintModal, setShowComplaintModal] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);

   const tabs = [
      { label: 'Pesanan Baru', count: 3, color: 'text-red-500 bg-red-50' },
      { label: 'Perlu Dikemas', count: 5, color: 'text-amber-500 bg-amber-50' },
      { label: 'Dikirim', count: 2, color: 'text-blue-500 bg-blue-50' },
      { label: 'Selesai', count: 128, color: 'text-emerald-500 bg-emerald-50' },
      { label: 'Komplain', count: 1, color: 'text-red-600 bg-red-100' },
   ];

   const filteredOrders = FARMER_ORDERS.filter(o => o.status === activeTab);

   const handleProcess = (order) => {
      setSelectedOrder(order);
      setShowProcessModal(true);
   };

   const handleViewComplaint = (order) => {
      setSelectedOrder(order);
      setShowComplaintModal(true);
   };

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500">

         {/* 4. Manajemen Khusus "Panen Besok" (Pre-Order Banner) */}
         <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 rounded-[6px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-amber-400 rounded-[6px] flex items-center justify-center text-neutral-900 shadow-xl shadow-amber-400/20 animate-bounce-slow">
                     <Calendar size={32} />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black uppercase tracking-tight">Jadwal Panen Besok</h2>
                     <p className="text-amber-400 font-bold text-sm">Selasa, 24 Maret 2026</p>
                  </div>
               </div>

               <div className="flex gap-8 border-l border-white/10 pl-8">
                  <div className="text-center">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Kebutuhan</p>
                     <p className="text-3xl font-black leading-none text-white">50 <span className="text-lg opacity-50">Kg</span></p>
                     <p className="text-[10px] font-bold text-amber-400 uppercase mt-2 tracking-tighter">Jagung Manis</p>
                  </div>
                  <div className="text-center border-l border-white/10 pl-8">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Dari</p>
                     <p className="text-3xl font-black leading-none text-white">8</p>
                     <p className="text-[10px] font-bold text-amber-400 uppercase mt-2 tracking-tighter">Pembeli</p>
                  </div>
               </div>

               <button className="bg-white text-neutral-900 px-8 py-4 rounded-[6px] font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl active:scale-95">
                  Lihat Rincian Panen
               </button>
            </div>
         </section>

         {/* 1. Navigasi Status Pesanan (Tabs) */}
         <div className="flex overflow-x-auto scrollbar-hide gap-3 p-1">
            {tabs.map(tab => (
               <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`
               flex items-center gap-3 px-6 py-4 rounded-[6px] whitespace-nowrap transition-all duration-300 font-black text-xs uppercase tracking-widest
               ${activeTab === tab.label
                        ? 'bg-neutral-900 text-white shadow-xl shadow-neutral-200 scale-105'
                        : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'}
             `}
               >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-[6px] text-[10px] ${activeTab === tab.label ? 'bg-amber-400 text-neutral-900' : tab.color}`}>
                     {tab.count}
                  </span>
               </button>
            ))}
         </div>

         {/* List Orders */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
               <div key={order.id} className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col group">

                  {/* Header Kartu */}
                  <div className="p-8 border-b border-gray-50 flex justify-between items-start gap-4">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{order.date}</p>
                        <h3 className="text-sm font-black text-neutral-900 uppercase">{order.id}</h3>
                        <div className="flex items-center gap-1.5 mt-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-[6px] w-fit">
                           <Navigation size={12} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Tujuan: {order.location} ({order.distance})</span>
                        </div>
                     </div>
                     <div className="p-3 bg-gray-50 rounded-[6px] text-gray-400">
                        <MoreHorizontal size={20} />
                     </div>
                  </div>

                  {/* Profil Pembeli */}
                  <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50 bg-gray-50/30">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center font-black text-xs">
                           {order.customer[0]}
                        </div>
                        <div>
                           <p className="text-xs font-black text-neutral-900 uppercase">{order.customer}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Pembeli Loyal</p>
                        </div>
                     </div>
                     <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
                        <MessageCircle size={16} /> Chat (WA)
                     </button>
                  </div>

                  {/* Items List */}
                  <div className="p-8 space-y-4 flex-1">
                     <div className="space-y-2">
                        {order.items.map((item, i) => (
                           <div key={i} className="flex justify-between items-center text-sm">
                              <span className="font-bold text-gray-600">{item.name}</span>
                              <span className="font-black text-neutral-900">{item.qty} {item.unit}</span>
                           </div>
                        ))}
                     </div>

                     <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Pendapatan</p>
                           <p className="text-xl font-black text-neutral-900 tracking-tight">Rp {order.total.toLocaleString('id-ID')}</p>
                        </div>

                        {/* Validasi Keamanan Escrow */}
                        {order.escrowLocked && (
                           <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-[6px] border border-emerald-100 group-hover:scale-105 transition-transform animate-pulse">
                              <ShieldCheck size={16} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Lunas: Escrow Aktif</span>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Main Action Area */}
                  <div className="p-8 pt-0">
                     {order.status === 'Pesanan Baru' && (
                        <button
                           onClick={() => handleProcess(order)}
                           className="w-full bg-neutral-900 hover:bg-black text-white py-5 rounded-[6px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                           Terima & Kemas Pesanan <ArrowRight size={18} />
                        </button>
                     )}
                     {order.status === 'Perlu Dikemas' && (
                        <button
                           onClick={() => handleProcess(order)}
                           className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 py-5 rounded-[6px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                           Siap Kirim Sekarang <Truck size={18} />
                        </button>
                     )}
                     {order.status === 'Komplain' && (
                        <button
                           onClick={() => handleViewComplaint(order)}
                           className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-[6px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                           Cek Detail Komplain <AlertCircle size={18} />
                        </button>
                     )}
                  </div>
               </div>
            )) : (
               <div className="col-span-2 py-32 text-center bg-gray-50/50 rounded-[6px] border border-dashed border-gray-200 flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                     <Package size={40} className="text-gray-200" />
                  </div>
                  <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">Tidak ada pesanan aktif</h3>
               </div>
            )}
         </div>

         {/* --- MODALS --- */}

         {/* 3. Alur Memproses Pesanan Modal */}
         {showProcessModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowProcessModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 p-10 text-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[6px] flex items-center justify-center mx-auto mb-6">
                     <Package size={40} />
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-2">Pesanan Siap Dikemas?</h2>
                  <p className="text-sm text-gray-400 font-medium mb-10 leading-relaxed">Pilih cara pelabelan yang paling mudah untuk Anda di kebun saat ini.</p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <button className="p-6 border-2 border-amber-400 bg-amber-50 rounded-[6px] text-center space-y-2 group transition-all">
                        <Printer size={24} className="mx-auto text-amber-600 mb-2 group-hover:scale-110" />
                        <p className="text-xs font-black text-neutral-900 uppercase leading-tight">Cetak Label</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">Thermal Printer</p>
                     </button>
                     <button className="p-6 border-2 border-gray-100 bg-white hover:border-amber-400 rounded-[6px] text-center space-y-2 group transition-all">
                        <PenTool size={24} className="mx-auto text-gray-400 mb-2 group-hover:text-amber-600 transition-colors" />
                        <p className="text-xs font-black text-neutral-900 uppercase leading-tight">Tulis Tangan</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">Kode Booking</p>
                     </button>
                  </div>

                  <div className="space-y-3">
                     <button
                        onClick={() => setShowProcessModal(false)}
                        className="w-full py-5 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95"
                     >
                        Panggil Kurir Logistik
                     </button>
                     <button
                        onClick={() => setShowProcessModal(false)}
                        className="w-full py-5 bg-gray-50 text-gray-400 px-6 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 transition-all"
                     >
                        Batal, Kembali Ke Daftar
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 5. Penanganan Komplain & Retur Modal */}
         {showComplaintModal && selectedOrder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowComplaintModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-2xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
                  <div className="p-10 border-b border-gray-50 bg-red-50/50 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-red-600 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                           <AlertCircle size={28} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-red-600 uppercase tracking-tight">Sengketa Pesanan</h3>
                           <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Mediasi Masalah Kualitas</p>
                        </div>
                     </div>
                     <button onClick={() => setShowComplaintModal(false)} className="p-2 hover:bg-red-100 rounded-[6px] transition-colors text-red-400">
                        <X size={24} />
                     </button>
                  </div>

                  <div className="p-10 space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Foto Bukti Pembeli</label>
                           <div className="aspect-square bg-gray-100 rounded-[6px] overflow-hidden border-4 border-white shadow-xl">
                              <img src={selectedOrder.complaintImage} className="w-full h-full object-cover" alt="" />
                           </div>
                        </div>
                        <div className="space-y-6">
                           <div>
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Catatan Pembeli</label>
                              <p className="text-sm font-medium text-gray-600 bg-gray-50 p-4 rounded-[6px] border border-gray-100">"{selectedOrder.complaintNote}"</p>
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Status Dana</label>
                              <div className="bg-amber-50 border border-amber-100 p-4 rounded-[6px] flex items-center gap-3">
                                 <Clock size={20} className="text-amber-500" />
                                 <span className="text-xs font-bold text-amber-700">Dana ditahan di Escrow (Mediasi)</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-neutral-900 rounded-[6px] p-6 flex items-center gap-6 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>
                        <div className="w-14 h-14 bg-amber-400 rounded-[6px] flex items-center justify-center shrink-0">
                           <Bot size={28} className="text-neutral-900" />
                        </div>
                        <p className="text-xs text-white leading-relaxed font-medium">
                           <span className="font-black text-amber-400 block mb-1 uppercase tracking-tight">AI AgriBot Mediator</span>
                           "Sistem mendeteksi suhu kurir terlalu tinggi selama perjalanan. Disarankan <span className="text-amber-400 font-black">Split Refund (50:50)</span> karena kelalaian pihak logistik. Klik di bawah untuk bantuan admin."
                        </p>
                     </div>

                     <div className="flex gap-4">
                        <button className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-[6px] font-black uppercase text-xs tracking-widest transition-all">
                           Ajukan Banding
                        </button>
                        <button className="flex-1 py-4 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3">
                           <Phone size={16} /> Hubungi Admin
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default FarmerOrders;





