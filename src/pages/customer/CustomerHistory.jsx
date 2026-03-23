import React, { useState } from 'react';
import {
   FileText,
   Download,
   TrendingDown,
   CheckCircle,
   Search,
   Calendar as CalendarIcon,
   Package,
   Target,
   Share2,
   ChevronRight,
   ShoppingBag,
   MapPin,
   X,
   ArrowRight,
   ShieldCheck,
   Instagram,
   Facebook,
   MessageCircle,
   Clock,
   ExternalLink
} from 'lucide-react';

const HISTORY_DATA = [
   {
      id: "INV/20260323/AGR/001",
      date: "23 Mar 2026",
      time: "14:00 WIB",
      farmer: "Kebun Pak Budi - Lembang",
      farm: "Lembang, Bandung",
      items: [
         { name: "Tomat Ceri Premium", qty: 5, unit: "Kg", price: 15000, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100" },
         { name: "Wortel Brastagi", qty: 2, unit: "Kg", price: 12000, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100" }
      ],
      productTotal: 99000,
      logistics: 15000,
      serviceFee: 2000,
      marketPrice: 140000,
      status: "Selesai"
   },
   {
      id: "INV/20260310/AGR/042",
      date: "10 Mar 2026",
      time: "09:30 WIB",
      farmer: "Sari Organik Ciwidey",
      farm: "Ciwidey, Kab. Bandung",
      items: [
         { name: "Selada Hidroponik", qty: 3, unit: "Pack", price: 8000, image: "https://images.unsplash.com/photo-1622205313162-be1d5756a43f?w=100" }
      ],
      productTotal: 24000,
      logistics: 12000,
      serviceFee: 2000,
      marketPrice: 45000,
      status: "Selesai"
   },
   {
      id: "INV/20260228/AGR/088",
      date: "28 Feb 2026",
      time: "11:15 WIB",
      farmer: "Kelompok Tani Brebes",
      farm: "Brebes, Jawa Tengah",
      items: [
         { name: "Bawang Merah Super", qty: 5, unit: "Kg", price: 35000, image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=100" }
      ],
      productTotal: 175000,
      logistics: 25000,
      serviceFee: 2000,
      marketPrice: 240000,
      status: "Selesai"
   }
];

const CustomerHistory = () => {
   const [selectedInvoice, setSelectedInvoice] = useState(null);
   const [showShareModal, setShowShareModal] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [filterTime, setFilterTime] = useState('Bulan Ini');
   const [isDownloading, setIsDownloading] = useState(false);
   const [buyAgainStatus, setBuyAgainStatus] = useState(null);

   const filteredHistory = HISTORY_DATA.filter(item =>
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmer.toLowerCase().includes(searchQuery.toLowerCase())
   );

   const handleBuyAgain = (orderId) => {
      setBuyAgainStatus(orderId);
      setTimeout(() => setBuyAgainStatus(null), 3000);
   };

   const handleDownload = () => {
      setIsDownloading(true);
      setTimeout(() => {
         setIsDownloading(false);
         // alert('Invoice downloaded as PDF');
      }, 2000);
   };

   return (
      <div className="space-y-8 pb-12 animate-in fade-in duration-500">
         {/* 1. Header & Filters */}
         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
               <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Riwayat Belanja</h1>
               <p className="text-gray-500 mt-1 font-medium">
                  Terima kasih! Sepanjang tahun ini Anda telah berbelanja langsung dari <span className="text-amber-600 font-bold underline">12 petani lokal</span>.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
               <div className="relative group">
                  <input
                     type="text"
                     placeholder="Cari Invoice atau Petani..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all outline-none w-full sm:w-72 shadow-sm text-sm"
                  />
               </div>
               <select
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
               >
                  <option>Bulan Ini</option>
                  <option>3 Bulan Terakhir</option>
                  <option>Tahun Ini</option>
               </select>
            </div>
         </div>

         {/* 2. Daftar Riwayat (Responsive Grid/Table) */}
         <div className="grid grid-cols-1 gap-4">
            {filteredHistory.length > 0 ? (
               filteredHistory.map((item) => (
                  <div key={item.id} className="bg-white rounded-[2rem] border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                     <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Info */}
                        <div className="flex-1 flex gap-5">
                           <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 group-hover:scale-110 transition-transform">
                              <img src={item.items[0].image} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <div className="flex items-center gap-3 mb-1">
                                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.id}</span>
                                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                 <span className="text-[10px] font-bold text-green-600 uppercase">Selesai Berhasil</span>
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{item.items[0].name} {item.items.length > 1 && `& ${item.items.length - 1} Produk Lainnya`}</h3>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                                 <MapPin size={12} /> {item.farmer}
                              </p>
                           </div>
                        </div>

                        {/* Middle Values (Visible mostly on tablet/desktop) */}
                        <div className="flex gap-8 px-6 lg:border-x border-gray-100 py-2">
                           <div className="text-left lg:text-center">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waktu Selesai</p>
                              <p className="text-sm font-black text-gray-900">{item.date}</p>
                              <p className="text-[10px] text-gray-400 font-bold">{item.time}</p>
                           </div>
                           <div className="text-left lg:text-center">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Belanja</p>
                              <p className="text-sm font-black text-gray-900">Rp {(item.productTotal + item.logistics + item.serviceFee).toLocaleString('id-ID')}</p>
                              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">Hemat {Math.round((1 - (item.productTotal + item.logistics + item.serviceFee) / item.marketPrice) * 100)}%</span>
                           </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-row gap-3 items-center justify-center">
                           <button
                              onClick={() => setSelectedInvoice(item)}
                              className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-black text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-neutral-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                           >
                              <FileText size={16} /> Lihat E-Nota
                           </button>
                           <button
                              onClick={() => handleBuyAgain(item.id)}
                              className={`
                        w-full sm:w-auto px-6 py-3 border-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2
                        ${buyAgainStatus === item.id
                                    ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200'
                                    : 'bg-white border-gray-100 text-gray-600 hover:border-amber-400 hover:text-amber-600'}
                      `}
                           >
                              {buyAgainStatus === item.id ? <CheckCircle size={16} /> : <ShoppingBag size={16} />}
                              {buyAgainStatus === item.id ? 'Ditambahkan!' : 'Beli Lagi'}
                           </button>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <div className="py-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                  <Package size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 font-bold text-lg">Riwayat belanja tidak ditemukan.</p>
                  <p className="text-gray-400 text-sm mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
               </div>
            )}
         </div>

         {/* --- MODALS --- */}

         {/* 3. E-Nota / Invoice Modal */}
         {selectedInvoice && (
            <div className="fixed inset-0 z-[100] flex items-center justify-end">
               <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedInvoice(null)}></div>
               <div className="bg-white h-full w-full max-w-xl relative z-10 shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">

                  {/* Invoice Header */}
                  <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-neutral-50">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">AC</div>
                        <div>
                           <h2 className="text-2xl font-black text-neutral-900 tracking-tighter uppercase leading-none">E-Nota Transparan</h2>
                           <p className="text-xs text-gray-400 font-bold mt-1 tracking-widest">{selectedInvoice.id}</p>
                        </div>
                     </div>
                     <button onClick={() => setSelectedInvoice(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={24} className="text-gray-400" />
                     </button>
                  </div>

                  {/* Invoice Body */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                     {/* Status & Basic Info */}
                     <div className="flex justify-between items-start">
                        <div className="space-y-4">
                           <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-green-100">
                              <CheckCircle size={14} /> LUNAS
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Tanggal Bayar</p>
                              <p className="text-sm font-bold text-gray-900">{selectedInvoice.date}, {selectedInvoice.time}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Penerima</p>
                           <p className="text-sm font-bold text-gray-900">Siti Aminah</p>
                           <p className="text-xs text-gray-400 font-medium">Jl. Kebagusan Raya No. 12, Jakarta</p>
                        </div>
                     </div>

                     {/* Items Section (Uang Petani) */}
                     <section>
                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rincian Hasil Panen</h4>
                           <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded text-[10px] font-bold text-amber-600 border border-amber-100">
                              <ShieldCheck size={12} /> 100% Dana ke Petani
                           </div>
                        </div>
                        <div className="space-y-4">
                           {selectedInvoice.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center group">
                                 <div className="flex items-center gap-4">
                                    <img src={item.image} className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-100" alt="" />
                                    <div>
                                       <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                       <p className="text-xs text-gray-400">{item.qty} {item.unit} @ Rp {item.price.toLocaleString('id-ID')}</p>
                                    </div>
                                 </div>
                                 <p className="text-sm font-bold text-gray-900">Rp {(item.qty * item.price).toLocaleString('id-ID')}</p>
                              </div>
                           ))}
                        </div>
                        <p className="text-[10px] text-amber-500 font-bold italic mt-4 flex items-center gap-1.5 bg-amber-50/50 p-2 rounded-lg">
                           <Info size={12} /> Dana produk di atas telah dikirimkan seutuhnya ke rekening {selectedInvoice.farmer.split(' - ')[0]}.
                        </p>
                     </section>

                     {/* Logistics & Fees */}
                     <section>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Biaya Operasional</h4>
                        <div className="space-y-3">
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-500 font-medium">Ongkos Kirim ({selectedInvoice.farmer.includes('Lembang') ? 'Hub Lembang - Jkt' : 'Hub Mitra - Jkt'})</span>
                              <span className="font-bold text-gray-900">Rp {selectedInvoice.logistics.toLocaleString('id-ID')}</span>
                           </div>
                           <div className="flex justify-between text-sm">
                              <span className="text-gray-500 font-medium">Biaya Layanan (Escrow & Platform)</span>
                              <span className="font-bold text-gray-900">Rp {selectedInvoice.serviceFee.toLocaleString('id-ID')}</span>
                           </div>
                        </div>
                     </section>

                     {/* Grand Total & Savings (Highlight Hijau) */}
                     <div className="bg-neutral-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>

                        <div className="flex justify-between items-end mb-6">
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Bayar</span>
                           <p className="text-4xl font-black tracking-tighter">Rp {(selectedInvoice.productTotal + selectedInvoice.logistics + selectedInvoice.serviceFee).toLocaleString('id-ID')}</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                           <div className="flex justify-between items-center text-xs mb-1">
                              <span className="text-gray-400 font-bold uppercase">Estimasi Harga Pasar</span>
                              <span className="text-gray-400 font-bold line-through">Rp {selectedInvoice.marketPrice.toLocaleString('id-ID')}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-green-400 font-black uppercase tracking-widest text-sm">Hemat Langsung</span>
                              <span className="text-2xl font-black text-green-400">Rp {(selectedInvoice.marketPrice - (selectedInvoice.productTotal + selectedInvoice.logistics + selectedInvoice.serviceFee)).toLocaleString('id-ID')}</span>
                           </div>
                        </div>
                        <p className="text-[10px] text-center text-gray-500 mt-4 font-bold uppercase tracking-wider">*Berdasarkan riset harga pasar komoditas hari ini.</p>
                     </div>
                  </div>

                  {/* 4. Invoice Footer (PDF & Share Impact) */}
                  <div className="p-8 border-t border-gray-100 flex flex-col gap-3">
                     <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full bg-neutral-900 hover:bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-neutral-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                     >
                        {isDownloading ? (
                           <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                           <Download size={20} />
                        )}
                        {isDownloading ? 'Sedang Memproses PDF...' : 'Unduh PDF E-Nota'}
                     </button>
                     <button
                        onClick={() => setShowShareModal(true)}
                        className="w-full bg-white border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-50 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3"
                     >
                        <Share2 size={20} /> Bagikan Dampak Sosial
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 5. Share Story Modal (Growth Hack) */}
         {showShareModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowShareModal(false)}></div>
               <div className="bg-white rounded-[3rem] p-10 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col items-center text-center">
                  <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                     <X size={24} />
                  </button>

                  <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 mb-6 shadow-lg shadow-amber-200 rotate-12">
                     <Share2 size={40} />
                  </div>

                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 leading-none">Ayo Viral-kan <br />Kebaikan Ini!</h2>
                  <p className="text-sm text-gray-500 font-medium mb-8 px-4 leading-relaxed italic">"Hari ini saya hemat <span className="text-green-600 font-bold">Rp {(selectedInvoice.marketPrice - (selectedInvoice.productTotal + selectedInvoice.logistics + selectedInvoice.serviceFee)).toLocaleString('id-ID')}</span> dan membantu <span className="text-neutral-900 font-bold">{selectedInvoice.farmer.split(' - ')[0]}</span> memanen sayur tanpa tengkulak!"</p>

                  <div className="grid grid-cols-3 gap-4 w-full mb-8">
                     <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 via-pink-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                           <Instagram size={28} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Story</span>
                     </button>
                     <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                           <Facebook size={28} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Feed</span>
                     </button>
                     <button className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                           <MessageCircle size={28} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">WhatsApp</span>
                     </button>
                  </div>

                  <button
                     onClick={() => setShowShareModal(false)}
                     className="w-full bg-neutral-900 hover:bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-neutral-200 transition-all"
                  >
                     Siap Bagikan!
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default CustomerHistory;
