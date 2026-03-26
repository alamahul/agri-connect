import React, { useState, useMemo } from 'react';
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
   ArrowRight,
   CheckCircle2,
   Loader2,
   ChevronDown,
   ExternalLink,
   Send,
   Timer
} from 'lucide-react';

const FarmerOrders = () => {
   const [orders, setOrders] = useState([
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
   ]);

   const [activeTab, setActiveTab] = useState('Pesanan Baru');
   const [searchQuery, setSearchQuery] = useState('');
   const [showProcessModal, setShowProcessModal] = useState(false);
   const [showComplaintModal, setShowComplaintModal] = useState(false);
   const [showHarvestDetails, setShowHarvestDetails] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [processingStatus, setProcessingStatus] = useState(null); // 'printing', 'calling', etc.
   const [openMenuId, setOpenMenuId] = useState(null);

   const counts = useMemo(() => {
      return {
         'Pesanan Baru': orders.filter(o => o.status === 'Pesanan Baru').length,
         'Perlu Dikemas': orders.filter(o => o.status === 'Perlu Dikemas').length,
         'Dikirim': orders.filter(o => o.status === 'Dikirim').length,
         'Selesai': orders.filter(o => o.status === 'Selesai').length,
         'Komplain': orders.filter(o => o.status === 'Komplain').length,
      };
   }, [orders]);

   const tabs = [
      { label: 'Pesanan Baru', count: counts['Pesanan Baru'], color: 'text-red-500 bg-red-50' },
      { label: 'Perlu Dikemas', count: counts['Perlu Dikemas'], color: 'text-amber-500 bg-amber-50' },
      { label: 'Dikirim', count: counts['Dikirim'], color: 'text-blue-500 bg-blue-50' },
      { label: 'Selesai', count: counts['Selesai'], color: 'text-emerald-500 bg-emerald-50' },
      { label: 'Komplain', count: counts['Komplain'], color: 'text-red-600 bg-red-100' },
   ];

   const filteredOrders = useMemo(() => {
      return orders.filter(o => {
         const matchesTab = o.status === activeTab;
         const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.customer.toLowerCase().includes(searchQuery.toLowerCase());
         return matchesTab && matchesSearch;
      });
   }, [orders, activeTab, searchQuery]);

   const updateOrderStatus = (id, newStatus) => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
   };

   const handleProcessNext = () => {
      if (!selectedOrder) return;
      
      setProcessingStatus('calling');
      setTimeout(() => {
         const nextStatusMap = {
            'Pesanan Baru': 'Perlu Dikemas',
            'Perlu Dikemas': 'Dikirim',
            'Dikirim': 'Selesai'
         };
         updateOrderStatus(selectedOrder.id, nextStatusMap[selectedOrder.status]);
         setShowProcessModal(false);
         setProcessingStatus(null);
         setSelectedOrder(null);
      }, 1500);
   };

   const handleCancelOrder = (id) => {
      if (window.confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
         setOrders(prev => prev.filter(o => o.id !== id));
         setOpenMenuId(null);
      }
   };

   const handlePrintInvoice = () => {
      alert('Sedang menyiapkan dokumen (Simulation)...');
      setOpenMenuId(null);
   };

   const handleChatWA = (customer) => {
      const message = encodeURIComponent(`Halo ${customer}, saya dari Mitra AgriConnect ingin mengonfirmasi pesanan Anda...`);
      window.open(`https://wa.me/628123456789?text=${message}`, '_blank');
   };

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500">

         {/* Pre-Order Banner */}
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

               <button
                  onClick={() => setShowHarvestDetails(true)}
                  className="bg-white text-neutral-900 px-8 py-4 rounded-[6px] font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl active:scale-95"
               >
                  Lihat Rincian Panen
               </button>
            </div>
         </section>

         {/* Navigation Tabs */}
         <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex overflow-x-auto scrollbar-hide gap-3 p-1 w-full md:w-auto">
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

            <div className="relative w-full md:w-72 group">

               <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari Order / Nama..."
                  className="w-full pl-10 pr-4 py-4 bg-white border border-gray-100 rounded-[6px] text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-amber-400 transition-all shadow-sm"
               />
            </div>
         </div>

         {/* Order List */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
               <div key={order.id} className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col group animate-in slide-in-from-bottom-4">

                  {/* Header */}
                  <div className="p-8 border-b border-gray-50 flex justify-between items-start gap-4">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{order.date}</p>
                        <h3 className="text-sm font-black text-neutral-900 uppercase">{order.id}</h3>
                        <div className="flex items-center gap-1.5 mt-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-[6px] w-fit">
                           <Navigation size={12} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Tujuan: {order.location} ({order.distance})</span>
                        </div>
                     </div>
                     <div className="relative">
                        <button 
                           onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === order.id ? null : order.id);
                           }}
                           className={`p-3 rounded-[6px] transition-all ${openMenuId === order.id ? 'bg-neutral-900 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                        >
                           <MoreHorizontal size={20} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openMenuId === order.id && (
                           <>
                              <div className="fixed inset-0 z-[60]" onClick={() => setOpenMenuId(null)}></div>
                              <div className="absolute right-0 mt-2 w-56 bg-white rounded-[6px] shadow-2xl border border-gray-100 py-2 z-[70] animate-in fade-in zoom-in-95 duration-200">
                                 <button 
                                    onClick={() => {
                                       setSelectedOrder(order);
                                       setOpenMenuId(null);
                                    }}
                                    className="w-full px-6 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors group"
                                 >
                                    <Package size={16} className="text-gray-400 group-hover:text-neutral-900" />
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest group-hover:text-neutral-900">Lihat Detail</span>
                                 </button>
                                 <button 
                                    onClick={handlePrintInvoice}
                                    className="w-full px-6 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors group"
                                 >
                                    <Printer size={16} className="text-gray-400 group-hover:text-neutral-900" />
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest group-hover:text-neutral-900">Cetak Invoice</span>
                                 </button>
                                 {order.status === 'Pesanan Baru' && (
                                    <div className="mt-2 pt-2 border-t border-gray-50">
                                       <button 
                                          onClick={() => handleCancelOrder(order.id)}
                                          className="w-full px-6 py-3 text-left flex items-center gap-3 hover:bg-red-50 transition-colors group"
                                       >
                                          <X size={16} className="text-red-400" />
                                          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Batalkan Pesanan</span>
                                       </button>
                                    </div>
                                 )}
                              </div>
                           </>
                        )}
                     </div>
                  </div>

                  {/* Customer Profile */}
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
                     <button
                        onClick={() => handleChatWA(order.customer)}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                     >
                        <MessageCircle size={16} /> Chat (WA)
                     </button>
                  </div>

                  {/* Order Items */}
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

                        {order.escrowLocked && (
                           <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-[6px] border border-emerald-100">
                              <ShieldCheck size={16} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Lunas: Escrow Aktif</span>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="p-8 pt-0">
                     {order.status === 'Pesanan Baru' && (
                        <button
                           onClick={() => {
                              setSelectedOrder(order);
                              setShowProcessModal(true);
                           }}
                           className="w-full bg-neutral-900 hover:bg-black text-white py-5 rounded-[6px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                           Terima & Kemas Pesanan <ArrowRight size={18} />
                        </button>
                     )}
                     {order.status === 'Perlu Dikemas' && (
                        <button
                           onClick={() => {
                              setSelectedOrder(order);
                              setShowProcessModal(true);
                           }}
                           className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 py-5 rounded-[6px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                           Siap Kirim Sekarang <Truck size={18} />
                        </button>
                     )}
                     {order.status === 'Dikirim' && (
                        <div className="flex gap-2">
                           <div className="flex-1 bg-blue-50 text-blue-600 py-5 rounded-[6px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                              <Timer size={14} /> Dalam Perjalanan
                           </div>
                           <button className="px-5 bg-gray-50 text-gray-400 rounded-[6px] hover:bg-gray-100 transition-all">
                              <ExternalLink size={18} />
                           </button>
                        </div>
                     )}
                     {order.status === 'Selesai' && (
                        <div className="bg-emerald-50 text-emerald-600 py-5 rounded-[6px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                           <CheckCircle2 size={16} /> Pesanan Selesai & Dana Cair
                        </div>
                     )}
                     {order.status === 'Komplain' && (
                        <button
                           onClick={() => {
                              setSelectedOrder(order);
                              setShowComplaintModal(true);
                           }}
                           className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-[6px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                           Cek Detail Komplain <AlertCircle size={18} />
                        </button>
                     )}
                  </div>
               </div>
            )) : (
               <div className="col-span-full py-32 text-center bg-gray-50/50 rounded-[6px] border border-dashed border-gray-200 flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                     <Package size={40} className="text-gray-200" />
                  </div>
                  <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">Tidak ada record "{activeTab}"</h3>
                  <button
                     onClick={() => setActiveTab('Pesanan Baru')}
                     className="mt-4 text-xs font-black text-amber-500 hover:underline cursor-pointer"
                  >
                     Lihat Pesanan Baru
                  </button>
               </div>
            )}
         </div>

         {/* --- MODALS --- */}

         {/* Process Order Modal */}
         {showProcessModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => !processingStatus && setShowProcessModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 p-10 text-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[6px] flex items-center justify-center mx-auto mb-6">
                     {selectedOrder?.status === 'Pesanan Baru' ? <Package size={40} /> : <Truck size={40} />}
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-2">
                     {selectedOrder?.status === 'Pesanan Baru' ? 'Pesanan Siap Dikemas?' : 'Panggil Kurir Logistik?'}
                  </h2>
                  <p className="text-sm text-gray-400 font-medium mb-10 leading-relaxed">
                     {selectedOrder?.status === 'Pesanan Baru'
                        ? 'Pilih cara pelabelan yang paling mudah untuk Anda di kebun saat ini.'
                        : 'Pastikan barang sudah terbungkus rapi sesuai standar AgriConnect.'}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                     {selectedOrder?.status === 'Pesanan Baru' ? (
                        <>
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
                        </>
                     ) : (
                        <>
                           <button className="p-6 border-2 border-blue-400 bg-blue-50 rounded-[6px] text-center space-y-2 group transition-all">
                              <Phone size={24} className="mx-auto text-blue-600 mb-2 group-hover:scale-110" />
                              <p className="text-xs font-black text-neutral-900 uppercase leading-tight">Panggil Kurir</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase">Pikap ke Lahan</p>
                           </button>
                           <button className="p-6 border-2 border-gray-100 bg-white hover:border-blue-400 rounded-[6px] text-center space-y-2 group transition-all">
                              <MapPin size={24} className="mx-auto text-gray-400 mb-2 group-hover:text-blue-600 transition-colors" />
                              <p className="text-xs font-black text-neutral-900 uppercase leading-tight">Antar Sendiri</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase">Ke Agen Terdekat</p>
                           </button>
                        </>
                     )}
                  </div>

                  <div className="space-y-3">
                     <button
                        onClick={handleProcessNext}
                        disabled={processingStatus === 'calling'}
                        className="w-full py-5 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                     >
                        {processingStatus === 'calling' ? (
                           <>
                              <Loader2 size={18} className="animate-spin" />
                              Menghubungkan...
                           </>
                        ) : (
                           selectedOrder?.status === 'Pesanan Baru' ? 'Selesai & Lanjut Proses' : 'Konfirmasi Pengiriman'
                        )}
                     </button>
                     <button
                        disabled={processingStatus === 'calling'}
                        onClick={() => setShowProcessModal(false)}
                        className="w-full py-5 bg-gray-50 text-gray-400 px-6 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 transition-all"
                     >
                        Batal
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* Complaint Modal */}
         {showComplaintModal && selectedOrder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowComplaintModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="p-8 border-b border-gray-50 bg-red-50/50 flex items-center justify-between shrink-0">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                           <AlertCircle size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-red-600 uppercase tracking-tight">Sengketa Pesanan</h3>
                           <p className="text-[9px] text-red-400 font-bold uppercase tracking-widest">Mediasi Kualitas</p>
                        </div>
                     </div>
                     <button onClick={() => setShowComplaintModal(false)} className="p-2 hover:bg-red-100 rounded-[6px] transition-colors text-red-400">
                        <X size={24} />
                     </button>
                  </div>

                  <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                     <div className="grid grid-cols-1 gap-8">
                        <div>
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3">Foto Bukti Pembeli</label>
                           <div className="aspect-video bg-gray-100 rounded-[6px] overflow-hidden border-4 border-white shadow-xl max-w-md mx-auto">
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
                        <div className="w-12 h-12 bg-amber-400 rounded-[6px] flex items-center justify-center shrink-0">
                           <Bot size={24} className="text-neutral-900" />
                        </div>
                        <p className="text-[11px] text-white leading-relaxed font-medium">
                           <span className="font-black text-amber-400 block mb-1 uppercase tracking-tight">AI AgriBot Mediator</span>
                           "Sistem mendeteksi suhu kurir terlalu tinggi. Disarankan <span className="text-amber-400 font-black text-xs">Split Refund (50:50)</span> karena kelalaian pihak logistik."
                        </p>
                     </div>
                  </div>

                  <div className="p-8 border-t border-gray-50 flex gap-4 shrink-0 bg-white">
                     <button className="flex-1 py-4 bg-gray-50 text-gray-500 rounded-[6px] font-black uppercase text-[10px] tracking-widest transition-all">
                        Batal
                     </button>
                     <button className="flex-1 py-4 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3">
                        Hubungi Admin
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* Harvest Details Modal */}
         {showHarvestDetails && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md" onClick={() => setShowHarvestDetails(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-2xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 p-10 overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Detail Panen Besok</h2>
                     <button onClick={() => setShowHarvestDetails(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={24} />
                     </button>
                  </div>

                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                     <div className="bg-emerald-50 p-6 rounded-[6px] border border-emerald-100 flex items-start gap-4">
                        <Zap size={24} className="text-emerald-600 mt-1" />
                        <div>
                           <p className="text-sm font-black text-emerald-900 uppercase tracking-tight">Kebutuhan Mendesak</p>
                           <p className="text-xs text-emerald-700 font-medium mt-1">8 pembeli sudah melunasi Pre-order Jagung Manis. Anda perlu menyiapkan total 50kg sebelum pukul 07:00 WIB.</p>
                        </div>
                     </div>

                     <div className="bg-gray-50 p-6 rounded-[6px] space-y-4">
                        {[
                           { name: 'Siti Aminah', qty: '10 Kg', area: 'Lembang Lahan A' },
                           { name: 'Bapak Sugeng', qty: '5 Kg', area: 'Lembang Lahan A' },
                           { name: 'Resto Sedap Malam', qty: '15 Kg', area: 'Cimahi Lahan B' },
                        ].map((buyer, i) => (
                           <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                              <div>
                                 <p className="text-xs font-black text-neutral-900 uppercase tracking-tight">{buyer.name}</p>
                                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{buyer.area}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-sm font-black text-neutral-900">{buyer.qty}</p>
                                 <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded">Lunas</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <button
                     onClick={() => setShowHarvestDetails(false)}
                     className="w-full mt-8 py-5 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3"
                  >
                     <Send size={18} /> Kirim Notifikasi Persiapan Panen
                  </button>
               </div>
            </div>
         )}

      </div>
   );
};

export default FarmerOrders;





