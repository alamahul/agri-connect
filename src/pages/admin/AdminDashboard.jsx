import React, { useState } from 'react';
import {
   ShieldCheck,
   Search,
   DollarSign,
   Lock,
   AlertCircle,
   UserPlus,
   Truck,
   Bot,
   Map as MapIcon,
   ChevronRight,
   CheckCircle2,
   XCircle,
   ExternalLink,
   ArrowUpRight,
   Eye,
   MoreVertical,
   Navigation,
   Activity,
   Zap,
   LayoutDashboard,
   RefreshCcw,
   RefreshCw,
   HelpCircle,
   FileText,
   MapPin
} from 'lucide-react';
import {
   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CHART_DATA = [
   { name: '08:00', val: 400 },
   { name: '10:00', val: 700 },
   { name: '12:00', val: 550 },
   { name: '14:00', val: 900 },
   { name: '16:00', val: 1100 },
   { name: '18:00', val: 800 },
   { name: '20:00', val: 650 },
];

const AdminDashboard = () => {
   const [showKYCModal, setShowKYCModal] = useState(false);
   const [showDisputeModal, setShowDisputeModal] = useState(false);
   const [selectedFarmer, setSelectedFarmer] = useState(null);
   const [selectedDispute, setSelectedDispute] = useState(null);

   const stats = [
      { label: 'Transaksi Berjalan', val: 'Rp 45.000.000', sub: '320 Pesanan', icon: DollarSign, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
      { label: 'Brankas Escrow', val: 'Rp 12.500.000', sub: 'Dana Terproteksi', icon: Lock, color: 'text-amber-600 bg-amber-50 border-amber-100' },
      { label: 'Sengketa Aktif', val: '5 Tiket', sub: 'Resolusi Terbuka', icon: AlertCircle, color: 'text-red-600 bg-red-50 border-red-100' },
      { label: 'Verifikasi Petani', val: '12 Orang', sub: 'Pending KYC', icon: UserPlus, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
   ];

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500">

         {/* 1. Header & Pusat Pemantauan Real-Time */}
         <section className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute left-0 top-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-6 relative z-10 w-full lg:w-auto">
               <div className="w-16 h-16 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-2xl">
                  <ShieldCheck size={32} />
               </div>
               <div>
                  <h1 className="text-2xl font-black text-neutral-900 tracking-tighter uppercase">Admin Command Center</h1>
                  <div className="flex items-center gap-2 mt-1">
                     <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Sistem Normal - Escrow Berjalan Lancar</p>
                  </div>
               </div>
            </div>

            <div className="w-full lg:w-96 relative group">

               <input
                  placeholder="Cari ID Invoice, Nama Petani, atau Pelanggan..."
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-xs font-bold outline-none focus:ring-2 focus:ring-neutral-900 transition-all shadow-inner"
               />
            </div>
         </section>

         {/* 2. Kartu Metrik Utama */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
               <div key={i} className={`p-8 rounded-[6px] border bg-white shadow-xl hover:-translate-y-2 transition-all duration-300 group`}>
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-14 h-14 rounded-[6px] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${s.color}`}>
                        <s.icon size={28} />
                     </div>
                     <button className="p-2 text-gray-300 hover:text-neutral-900 transition-colors">
                        <MoreVertical size={20} />
                     </button>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{s.val}</h2>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 italic uppercase tracking-tighter">{s.sub}</p>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* 3. Modul Verifikasi Petani Baru (KYC) */}
            <div className="lg:col-span-2 bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden flex flex-col pt-8">
               <div className="px-10 mb-8 flex items-center justify-between">
                  <div>
                     <h3 className="text-xl font-black text-neutral-900 uppercase">Verifikasi Petani Baru (KYC)</h3>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Memastikan Keaslian Produsen Lokal</p>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest">
                     Lihat Semua <ChevronRight size={14} />
                  </button>
               </div>

               <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-gray-50/50">
                        <tr>
                           <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Calon Petani</th>
                           <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lokasi Lahan</th>
                           <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                           <th className="px-10 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {[
                           { name: 'Pak Budi Santoso', location: 'Lembang, Bandung', time: '2 jam lalu', id: 'FRM-001' },
                           { name: 'Ibu Siti Aminah', location: 'Cianjur, Jabar', time: '5 jam lalu', id: 'FRM-002' },
                           { name: 'Sugeng Pranoto', location: 'Malang, Jatim', time: '8 jam lalu', id: 'FRM-003' },
                        ].map((p, i) => (
                           <tr key={i} className="group hover:bg-gray-50/30 transition-colors">
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center font-black text-xs">
                                       {p.name[0]}
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-sm font-black text-neutral-900 uppercase">{p.name}</p>
                                       <p className="text-[9px] text-gray-400 font-bold tracking-widest">{p.id}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-6">
                                 <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase italic">
                                    <Navigation size={12} className="text-gray-400" /> {p.location}
                                 </div>
                              </td>
                              <td className="px-6 py-6">
                                 <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-[6px] text-[9px] font-black uppercase tracking-widest border border-amber-100">Menunggu</span>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <button
                                    onClick={() => { setSelectedFarmer(p); setShowKYCModal(true); }}
                                    className="bg-neutral-900 text-white px-4 py-2 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                                 >
                                    Tinjau Profil
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* 6. Widget AI Insight untuk Platform (AgriBot) */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[6px] p-10 text-white shadow-2xl relative overflow-hidden group border-4 border-amber-400/20">
               <div className="absolute right-[-20%] top-[-10%] w-64 h-64 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all"></div>

               <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-2xl shadow-amber-400/40 relative group-hover:scale-110 transition-transform duration-500">
                     <Bot size={32} />
                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-neutral-900 animate-pulse"></div>
                  </div>
                  <div>
                     <h3 className="text-xl font-black uppercase leading-tight tracking-tighter">AgriBot Analytics</h3>
                     <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest">Inteligensi Platform Real-Time</p>
                  </div>
               </div>

               <div className="space-y-8 relative z-10">
                  <div className="space-y-3 p-5 bg-white/5 rounded-[6px] border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="flex items-center gap-3 text-red-400">
                        <AlertCircle size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Peringatan Supply</span>
                     </div>
                     <p className="text-xs font-medium text-gray-300 leading-relaxed">
                        3 Petani di area Lembang melaporkan gagal panen. Stok Jagung diprediksi turun <span className="text-red-400 font-black tracking-tight">40%</span> minggu depan.
                     </p>
                  </div>

                  <div className="space-y-3 p-5 bg-white/5 rounded-[6px] border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="flex items-center gap-3 text-emerald-400">
                        <Zap size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Tren Strategis</span>
                     </div>
                     <p className="text-xs font-medium text-gray-300 leading-relaxed">
                        Fitur 'Panen Besok' meningkat <span className="text-emerald-400 font-black tracking-tight">25%</span> bulan ini. Disarankan kirim Push Notification aktivasi Pre-Order.
                     </p>
                  </div>

                  <button className="w-full py-4 bg-amber-400 text-neutral-900 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                     Unduh Laporan Strategis AI <ChevronRight size={14} />
                  </button>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 4. Pusat Resolusi & Sengketa Escrow */}
            <div className="bg-white rounded-[6px] border border-gray-100 shadow-xl p-10 flex flex-col">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-5">
                     <div className="w-12 h-12 bg-red-50 text-red-500 rounded-[6px] flex items-center justify-center">
                        <Activity size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-neutral-900 uppercase">Pusat Sengketa Escrow</h3>
                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Resolusi Masalah & Transparansi</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-[6px] text-[9px] font-black uppercase animate-pulse">
                     5 Tiket Baru
                  </div>
               </div>

               <div className="space-y-4">
                  {[
                     { id: 'INV-001', problem: 'Tomat Ceri Hancur', customer: 'Budi Santoso', status: 'Pending Mediasi', color: 'red' },
                     { id: 'INV-202', problem: 'Wortel Tidak Sesuai Berat', customer: 'Resto Sedap', status: 'Review Admin', color: 'amber' },
                  ].map((d, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-[6px] border border-transparent hover:border-red-100 hover:bg-white transition-all group">
                        <div className="flex items-center gap-5">
                           <div className="w-10 h-10 bg-white rounded-[6px] flex flex-col items-center justify-center shadow-sm text-gray-400">
                              <FileText size={20} />
                           </div>
                           <div>
                              <p className="text-sm font-black text-neutral-900 uppercase">{d.problem}</p>
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{d.id} • Dari: {d.customer}</p>
                           </div>
                        </div>
                        <button
                           onClick={() => { setSelectedDispute(d); setShowDisputeModal(true); }}
                           className="bg-red-600 text-white px-5 py-2.5 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                           Tinjau Sengketa
                        </button>
                     </div>
                  ))}
               </div>
            </div>

            {/* 5. Peta Pemantauan Logistik (Live Heatmap) */}
            <div className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden relative group">
               <div className="p-10 absolute top-0 left-0 right-0 z-10 pointer-events-none">
                  <div className="flex items-center justify-between">
                     <div className="bg-white/90 backdrop-blur-md p-4 rounded-[6px] border border-gray-100 shadow-xl flex items-center gap-5 pointer-events-auto">
                        <div className="w-10 h-10 bg-indigo-500 text-white rounded-[6px] flex items-center justify-center">
                           <MapIcon size={20} />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-neutral-900 uppercase">Live Logistical Map</h4>
                           <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">86 Kurir Aktif</p>
                           </div>
                        </div>
                     </div>
                     <div className="bg-white/90 backdrop-blur-md p-2 rounded-[6px] border border-gray-100 shadow-xl pointer-events-auto">
                        <RefreshCw size={16} className="text-gray-400 animate-spin-slow" />
                     </div>
                  </div>
               </div>

               <div className="w-full h-full min-h-[400px] bg-indigo-50/30 flex items-center justify-center relative">
                  {/* Mockup Heatmap Image */}
                  <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=800" className="w-full h-full object-cover opacity-80" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

                  {/* Animated Pulse Points (Simulating Heatmap) */}
                  <div className="absolute top-[30%] left-[40%] text-emerald-500 animate-bounce duration-1000">
                     <MapPin size={32} className="fill-emerald-100" />
                     <div className="absolute -inset-2 bg-emerald-500/20 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute top-[60%] left-[70%] text-red-500 animate-bounce duration-700">
                     <MapPin size={32} className="fill-red-100" />
                     <div className="absolute -inset-2 bg-red-500/20 rounded-full animate-ping"></div>
                  </div>

                  <div className="absolute bottom-10 left-10 p-5 bg-white/90 backdrop-blur-md rounded-[6px] border border-gray-100 shadow-2xl">
                     <h5 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-3">Legenda Peta</h5>
                     <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                           <span className="text-[9px] font-bold text-gray-500 uppercase">Area Panas (Permintaan)</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                           <span className="text-[9px] font-bold text-gray-500 uppercase">Area Panen (Produsen)</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* --- MODALS --- */}

         {/* 3. KYC Modal (Tinjau Profil Petani) */}
         {showKYCModal && selectedFarmer && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowKYCModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-4xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden flex flex-col md:flex-row">
                  <div className="flex-1 p-10 space-y-8 border-b md:border-b-0 md:border-r border-gray-100">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center font-black text-xl">
                           {selectedFarmer.name[0]}
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">{selectedFarmer.name}</h3>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{selectedFarmer.location}</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Foto KTP / Identitas</label>
                           <div className="aspect-[3/2] bg-gray-100 rounded-[6px] overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 group hover:border-emerald-400 transition-colors">
                              <Eye size={32} />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Foto Lahan & Produk</label>
                           <div className="aspect-[3/2] bg-gray-100 rounded-[6px] overflow-hidden shadow-inner flex items-center justify-center border-2 border-white group cursor-zoom-in">
                              <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=400" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" alt="" />
                           </div>
                        </div>
                     </div>

                     <div className="p-6 bg-gray-50 rounded-[6px] flex items-center gap-5">
                        <div className="w-12 h-12 bg-white text-emerald-500 rounded-[6px] flex items-center justify-center shadow-sm">
                           <Navigation size={24} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Koordinat GPS Lahan</p>
                           <p className="text-sm font-black text-neutral-900">-7.12354 , 107.45678 (Lembang)</p>
                        </div>
                     </div>
                  </div>

                  <div className="w-full md:w-80 p-10 bg-gray-50/50 flex flex-col justify-between">
                     <div className="space-y-6">
                        <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest">Review Keaslian</h4>
                        <div className="space-y-2">
                           <div className="flex items-center gap-3 text-emerald-600">
                              <CheckCircle2 size={16} />
                              <span className="text-[10px] font-black uppercase">Foto Wajah Sama</span>
                           </div>
                           <div className="flex items-center gap-3 text-emerald-600">
                              <CheckCircle2 size={16} />
                              <span className="text-[10px] font-black uppercase">Lokasi Titik Aktif</span>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3 mt-10">
                        <button className="w-full py-5 bg-emerald-500 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-200 active:scale-95 transition-all">
                           Setujui & Aktifkan Toko
                        </button>
                        <button className="w-full py-4 bg-white border border-red-200 text-red-500 rounded-[6px] font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">
                           Tolak / Minta Ulang
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 4. Dispute Resolution Modal (Split View) */}
         {showDisputeModal && selectedDispute && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowDisputeModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-5xl h-[85vh] relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col overflow-hidden">

                  <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-red-600 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                           <AlertCircle size={32} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Arbitrase Sengketa Escrow</h3>
                           <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest italic">{selectedDispute.id} • {selectedDispute.problem}</p>
                        </div>
                     </div>
                     <button onClick={() => setShowDisputeModal(false)} className="p-3 bg-gray-50 hover:bg-neutral-900 hover:text-white rounded-[6px] transition-all">
                        <XCircle size={24} />
                     </button>
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row divide-x divide-gray-100 overflow-hidden">
                     {/* Sisi Kiri: Bukti Pembeli */}
                     <div className="flex-1 p-10 overflow-y-auto space-y-8 bg-blue-50/20">
                        <div className="flex items-center gap-3 text-blue-600">
                           <ShoppingBag size={20} className="fill-blue-50" />
                           <h4 className="text-xs font-black uppercase tracking-widest">Bukti Pembeli: {selectedDispute.customer}</h4>
                        </div>
                        <div className="aspect-video bg-white rounded-[6px] border-4 border-white shadow-xl overflow-hidden transform -rotate-2">
                           <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600" className="w-full h-full object-cover" alt="" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 bg-white p-6 rounded-[6px] shadow-sm border border-blue-100 italic">
                           "Saya terima tomat cerinya jam 4 sore, tapi pas dibuka ternyata sudah banyak yang pecah dan hancur separuh karung."
                        </p>
                     </div>

                     {/* Sisi Kanan: Bukti Petani & Logistik */}
                     <div className="flex-1 p-10 overflow-y-auto space-y-8 bg-emerald-50/20">
                        <div className="flex items-center gap-3 text-emerald-600">
                           <Truck size={20} className="fill-emerald-50" />
                           <h4 className="text-xs font-black uppercase tracking-widest">Logistik & Bukti Pengemasan</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="aspect-square bg-white rounded-[6px] border-4 border-white shadow-lg overflow-hidden flex flex-col items-center justify-center p-4">
                              <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Pukul 09:00</p>
                              <p className="text-xs font-black text-neutral-900 uppercase">Barang Dipickup</p>
                              <div className="mt-2 text-emerald-500"><Truck size={24} /></div>
                           </div>
                           <div className="aspect-square bg-white rounded-[6px] border-4 border-white shadow-lg overflow-hidden flex flex-col items-center justify-center p-4">
                              <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Status Packing</p>
                              <p className="text-xs font-black text-emerald-600 uppercase italic">Standar Thermal</p>
                              <div className="mt-2 text-emerald-500 group-hover:scale-110"><ShieldCheck size={24} /></div>
                           </div>
                        </div>
                        <div className="p-6 bg-white rounded-[6px] border border-emerald-100">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Catatan Logistik AgriBot</p>
                           <p className="text-xs font-medium text-emerald-700 leading-relaxed italic">
                              "Kurir melaporkan suhu perjalanan di atas normal (38°C). Ada indikasi keterlambatan jemput selama 2 jam."
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Action Footer */}
                  <div className="p-10 bg-neutral-900 border-t border-white/5 flex flex-col md:flex-row gap-6">
                     <div className="flex-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Keputusan Arbitrase Admin</p>
                        <p className="text-xs text-white/60">Tentukan alur dana Escrow berdasarkan bukti yang ada.</p>
                     </div>
                     <div className="flex gap-4">
                        <button className="px-6 py-4 bg-red-600 text-white rounded-[6px] font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition-all">
                           Refund 100% (Salah Petani)
                        </button>
                        <button className="px-6 py-4 bg-emerald-500 text-white rounded-[6px] font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition-all">
                           Cairkan ke Petani (Valid)
                        </button>
                        <button className="px-6 py-4 bg-amber-400 text-neutral-900 rounded-[6px] font-black uppercase text-[10px] tracking-widest shadow-lg hover:scale-105 transition-all">
                           Bagi Beban (Salah Logistik)
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default AdminDashboard;





