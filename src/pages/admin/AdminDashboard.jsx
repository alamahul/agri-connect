import React, { useState, useMemo } from 'react';
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
   MapPin,
   ShoppingBag,
   TrendingUp,
   Users,
   ChevronDown,
   Loader2,
   Clock,
} from 'lucide-react';
import {
   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for Leaflet default icon issues in Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: markerIcon2x,
   iconUrl: markerIcon,
   shadowUrl: markerShadow,
});

// Custom markers for different status
const createIcon = (color) => new L.Icon({
   iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});

const redIcon = createIcon('red');
const greenIcon = createIcon('green');
const goldIcon = createIcon('gold');
const blueIcon = createIcon('blue');

const CHART_DATA = [
   { name: 'Sen', val: 4000, users: 400 },
   { name: 'Sel', val: 7000, users: 450 },
   { name: 'Rab', val: 5500, users: 500 },
   { name: 'Kam', val: 9000, users: 600 },
   { name: 'Jum', val: 11000, users: 580 },
   { name: 'Sab', val: 8000, users: 620 },
   { name: 'Min', val: 6500, users: 650 },
];

const AdminDashboard = () => {
   const [showKYCModal, setShowKYCModal] = useState(false);
   const [showDisputeModal, setShowDisputeModal] = useState(false);
   const [selectedFarmer, setSelectedFarmer] = useState(null);
   const [selectedDispute, setSelectedDispute] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [toast, setToast] = useState(null);
   const [timeRange, setTimeRange] = useState('Minggu Ini');

   const stats = [
      { label: 'Transaksi Berjalan', val: 'Rp 45.320.000', sub: '+12% dari hari ini', icon: DollarSign, color: 'text-indigo-600 bg-indigo-50 border-indigo-100', trend: 'up' },
      { label: 'Brankas Escrow', val: 'Rp 12.890.000', sub: 'Dana Terproteksi', icon: Lock, color: 'text-amber-600 bg-amber-50 border-amber-100', trend: 'stable' },
      { label: 'Sengketa Aktif', val: '5 Tiket', sub: 'Resolusi Terbuka', icon: AlertCircle, color: 'text-red-600 bg-red-50 border-red-100', trend: 'down' },
      { label: 'Verifikasi Petani', val: '12 Orang', sub: 'Pending KYC', icon: UserPlus, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', trend: 'up' },
   ];

   const showNotification = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
   };

   const handleApproveKYC = () => {
      setIsLoading(true);
      setTimeout(() => {
         setIsLoading(false);
         setShowKYCModal(false);
         showNotification('Petani Berhasil Diverifikasi & Aktif!');
      }, 1500);
   };

   const handleSettleDispute = (decision) => {
      setIsLoading(true);
      setTimeout(() => {
         setIsLoading(false);
         setShowDisputeModal(false);
         showNotification(`Dispute Selesai: Keputusan [${decision}] Diterapkan.`);
      }, 1500);
   };

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500 relative">

         {/* Toast Notification Simulation */}
         {toast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 text-white px-8 py-4 rounded-[6px] shadow-2xl border-2 border-emerald-500 flex items-center gap-4 animate-in slide-in-from-top-10">
               <CheckCircle2 className="text-emerald-500" size={24} />
               <p className="text-xs font-black uppercase tracking-widest">{toast}</p>
            </div>
         )}

         {/* 1. Header & Command Center Info */}
         <section className="bg-white p-10 rounded-[6px] border border-gray-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>

            <div className="flex items-center gap-6 relative z-10">
               <div className="w-16 h-16 bg-neutral-900 border-b-4 border-emerald-500 text-white rounded-[6px] flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-all">
                  <ShieldCheck size={32} />
               </div>
               <div>
                  <h1 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase">Admin Command <span className="text-emerald-600 italic">Center</span></h1>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Sistem Operasional 100% | Escrow Monitor On</p>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto relative z-10">
               <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 flex items-center gap-2 text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                  <TrendingUp size={14} /> Volume Hari Ini: +45%
               </div>
               <div className="relative group w-full sm:w-80">
                  <input
                     placeholder="ID Invoice / Nama Mitra..."
                     className="w-full bg-gray-50 border border-gray-100 pl-12 pr-6 py-4 rounded-[6px] text-xs font-bold focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-inner"
                  />
               </div>
            </div>
         </section>

         {/* 2. Kartu Metrik Utama */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
               <div key={i} className={`p-8 rounded-[6px] border bg-white shadow-xl hover:-translate-y-2 transition-all duration-300 group ${s.trend === 'up' ? 'border-b-4 border-b-emerald-400' : s.trend === 'down' ? 'border-b-4 border-b-red-400' : 'border-b-4 border-b-amber-400'}`}>
                  <div className="flex justify-between items-start mb-6">
                     <div className={`w-14 h-14 rounded-[6px] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${s.color}`}>
                        <s.icon size={28} />
                     </div>
                     <button className="p-2 text-gray-300 hover:text-neutral-900 transition-colors">
                        <MoreVertical size={20} />
                     </button>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <div className="flex items-end gap-2">
                     <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{s.val}</h2>
                  </div>
                  <p className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${s.trend === 'up' ? 'text-emerald-600' : s.trend === 'down' ? 'text-red-500' : 'text-amber-600'}`}>
                     {s.sub}
                  </p>
               </div>
            ))}
         </div>

         {/* 3. Monitoring Keuangan & Grafik Arus Kas */}
         <section className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h3 className="text-2xl font-black text-neutral-900 uppercase">Monitoring Arus Kas & Pertumbuhan</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">Pantauan Escrow Platform Sepekan Terakhir</p>
               </div>
               <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-[6px] shadow-inner">
                  {['Hari Ini', 'Minggu Ini', 'Bulan Ini'].map(r => (
                     <button
                        key={r}
                        onClick={() => setTimeRange(r)}
                        className={`px-4 py-2 rounded-[4px] text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === r ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400 hover:text-neutral-900'}`}
                     >
                        {r}
                     </button>
                  ))}
               </div>
            </div>

            <div className="p-10">
               <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={CHART_DATA}>
                        <defs>
                           <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                           </linearGradient>
                           <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                           dataKey="name"
                           axisLine={false}
                           tickLine={false}
                           tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                           dy={10}
                        />
                        <YAxis
                           hide={true}
                        />
                        <Tooltip
                           contentStyle={{
                              backgroundColor: '#171717',
                              border: 'none',
                              borderRadius: '6px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                           }}
                           itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                           labelStyle={{ display: 'none' }}
                        />
                        <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                        <Area type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 p-8 bg-gray-50/50 border border-gray-100 rounded-[6px]">
                  <div className="flex items-center gap-6">
                     <div className="w-12 h-12 bg-white rounded-[6px] shadow-sm flex items-center justify-center text-emerald-500">
                        <TrendingUp size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest line-through">Biaya Operasional</p>
                        <p className="text-xl font-black text-neutral-900 uppercase tracking-tighter">Rp 2.450.000 <span className="text-[10px] text-red-500">-2%</span></p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="w-12 h-12 bg-white rounded-[6px] shadow-sm flex items-center justify-center text-indigo-500">
                        <Users size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pertumbuhan Mitra</p>
                        <p className="text-xl font-black text-neutral-900 uppercase tracking-tighter">840 Mitra <span className="text-[10px] text-emerald-500">+15%</span></p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 4. Modul Verifikasi Petani Baru (KYC) */}
            <div className="lg:col-span-2 bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden flex flex-col pt-10">
               <div className="px-10 mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                     <div className="p-3 bg-neutral-900 text-emerald-400 rounded-[6px] shadow-lg">
                        <UserPlus size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-neutral-900 uppercase">Antrian KYC Petani</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Verifikasi Lokasi & Identitas Lahan</p>
                     </div>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest underline underline-offset-4 decoration-2">
                     Lihat Seluruh Antrian <ChevronRight size={14} />
                  </button>
               </div>

               <div className="flex-1 overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left">
                     <thead className="bg-gray-50/50">
                        <tr>
                           <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Informasi Mitra</th>
                           <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Wilayah Lahan</th>
                           <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Data</th>
                           <th className="px-10 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Control</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {[
                           { name: 'Pak Budi Santoso', location: 'Lembang, Bandung', time: '2 jam lalu', id: 'KYC-8812', avatarColor: 'bg-emerald-500' },
                           { name: 'Ibu Siti Aminah', location: 'Cianjur, Jabar', time: '5 jam lalu', id: 'KYC-9021', avatarColor: 'bg-amber-500' },
                           { name: 'Sugeng Pranoto', location: 'Malang, Jatim', time: '8 jam lalu', id: 'KYC-1234', avatarColor: 'bg-indigo-500' },
                           { name: 'Dedi Kurniawan', location: 'Garut, Jabar', time: '12 jam lalu', id: 'KYC-5541', avatarColor: 'bg-red-500' },
                        ].map((p, i) => (
                           <tr key={i} className="group hover:bg-gray-50/50 transition-colors border-l-4 border-l-transparent hover:border-l-emerald-500">
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 ${p.avatarColor} text-white rounded-[6px] flex items-center justify-center font-black text-sm shadow-lg group-hover:scale-110 transition-transform`}>
                                       {p.name[0]}
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{p.name}</p>
                                       <p className="text-[9px] text-gray-400 font-bold tracking-widest">{p.id} • Terdaftar {p.time}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-6">
                                 <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase italic">
                                    <MapPin size={12} className="text-red-500" /> {p.location}
                                 </div>
                              </td>
                              <td className="px-6 py-6">
                                 <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 italic">Menunggu Review</span>
                                 </div>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <button
                                    onClick={() => { setSelectedFarmer(p); setShowKYCModal(true); }}
                                    className="bg-neutral-900 hover:bg-black text-white px-4 py-2.5 rounded-[6px] text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                                 >
                                    Tinjau Berkas
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* 5. AgriBot Analytics Widget (Platform Intel) */}
            <div className="bg-neutral-900 rounded-[6px] p-10 text-white shadow-2xl relative overflow-hidden group border-4 border-white/5 flex flex-col justify-between min-h-[500px]">
               <div className="absolute right-[-10%] top-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>

               <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-12">
                     <div className="w-20 h-20 bg-emerald-500 text-white rounded-[6px] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] relative group-hover:rotate-12 transition-transform">
                        <Bot size={44} />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-4 border-neutral-900 animate-bounce"></div>
                     </div>
                     <div>
                        <h3 className="text-2xl font-black uppercase leading-tight tracking-tighter">AgriBot <span className="text-emerald-400 italic">Intel</span></h3>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Asisten Analitik Platform v2.0</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="p-6 bg-white/5 rounded-[6px] border border-white/10 hover:bg-white/10 transition-all group/card">
                        <div className="flex items-center gap-4 text-red-400 mb-3">
                           <AlertCircle size={20} />
                           <span className="text-xs font-black uppercase tracking-widest">Peringatan Supply Cabai</span>
                        </div>
                        <p className="text-xs font-medium text-gray-300 leading-relaxed">
                           Sektor Lembang melaporkan cuaca ekstrem. Stok cabai diprediksi berkurang <span className="text-red-400 font-bold italic">40%</span>. Harga pasar kemungkinan naik Rp 5.000/kg.
                        </p>
                        <button className="mt-4 text-[9px] font-black text-emerald-400 uppercase tracking-widest hover:underline">Siapkan Notifikasi Radar Harga</button>
                     </div>

                     <div className="p-6 bg-white/5 rounded-[6px] border border-white/10 hover:bg-white/10 transition-all cursor-crosshair">
                        <div className="flex items-center gap-4 text-emerald-400 mb-3">
                           <Zap size={20} />
                           <span className="text-xs font-black uppercase tracking-widest">Hot Demand: Tomat</span>
                        </div>
                        <p className="text-xs font-medium text-gray-300 leading-relaxed">
                           Wilayah Jakarta Selatan mengalami lonjakan permintaan Tomat Beef. <span className="text-emerald-400 font-bold italic">1.200 Pesanan Baru</span> dalam 12 jam terakhir.
                        </p>
                     </div>
                  </div>
               </div>

               <button className="w-full py-5 bg-white text-neutral-900 rounded-[6px] font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-emerald-400 hover:text-white transition-all flex items-center justify-center gap-3 relative z-10">
                  <RefreshCw size={18} className="animate-spin-slow" /> Generate Laporan Strategis AI
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 6. Dispute Resolution (Escrow Hub) */}
            <div className="bg-white rounded-[6px] border border-gray-100 shadow-xl p-10 flex flex-col">
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 bg-red-50 text-red-500 rounded-[6px] flex items-center justify-center shadow-lg shadow-red-50">
                        <Activity size={28} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Pusat Sengketa Escrow</h3>
                        <p className="text-[10px] text-red-400 font-extrabold uppercase tracking-widest italic">Arbitrase & Mediasi Berbasis Bukti</p>
                     </div>
                  </div>
                  <div className="px-4 py-2 bg-red-600 text-white rounded-full text-[10px] font-black uppercase animate-pulse shadow-lg">
                     5 Tiket Urgent
                  </div>
               </div>

               <div className="space-y-4">
                  {[
                     { id: 'TX-8082', problem: 'Tomat Hancur di Perjalanan', customer: 'Resto Maharaja', status: 'Pending Mediasi', amount: 'Rp 850.000', icon: '🍎' },
                     { id: 'TX-9121', problem: 'Wortel Tidak Sesuai Spek', customer: 'Siti Aminah', status: 'Tinjau Bukti', amount: 'Rp 1.200.000', icon: '🥕' },
                  ].map((d, i) => (
                     <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50/50 rounded-[6px] border border-transparent hover:border-red-100 hover:bg-white transition-all group gap-4">
                        <div className="flex items-center gap-6">
                           <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">{d.icon}</div>
                           <div>
                              <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{d.problem}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{d.id} • Dari: <span className="text-neutral-900">{d.customer}</span></p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6 justify-between sm:justify-end">
                           <div className="text-right">
                              <p className="text-xs font-black text-neutral-900 italic">{d.amount}</p>
                              <p className="text-[9px] text-red-500 font-black uppercase tracking-tighter">{d.status}</p>
                           </div>
                           <button
                              onClick={() => { setSelectedDispute(d); setShowDisputeModal(true); }}
                              className="bg-red-600 text-white px-4 py-2 rounded-[6px] text-[9px] font-black uppercase tracking-widest hover:bg-neutral-900 transition-all shadow-xl active:scale-95"
                           >
                              Mediasi
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* 7. Live Logistics Map Heatmap dengan Leaflet */}
            <div className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden relative min-h-[500px] border-4 border-white group z-0">
               <div className="p-8 absolute top-0 left-0 right-0 z-[1000] pointer-events-none">
                  <div className="flex items-center justify-between">
                     <div className="bg-white/95 backdrop-blur-md p-4 rounded-[6px] border border-gray-100 shadow-2xl flex items-center gap-4 pointer-events-auto">
                        <div className="w-12 h-12 bg-indigo-500 text-white rounded-[6px] flex items-center justify-center shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                           <Truck size={24} />
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tighter leading-none">Mitra Kurir Aktif</h4>
                           <div className="flex items-center gap-2 mt-1">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                              <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">86 Unit Beroperasi</p>
                           </div>
                        </div>
                     </div>
                     <button className="bg-white/95 p-3 rounded-[6px] shadow-2xl border border-gray-100 text-gray-400 hover:text-neutral-900 transition-all pointer-events-auto active:scale-90">
                        <RefreshCw size={20} className="hover:rotate-180 transition-transform duration-500" />
                     </button>
                  </div>
               </div>

               <div className="w-full h-full absolute inset-0">
                  <MapContainer
                     center={[-6.9175, 107.6191]} // Fokus Area Jabar/Bandung
                     zoom={10}
                     scrollWheelZoom={true}
                     style={{ height: '100%', width: '100%' }}
                  >
                     <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                     <Marker position={[-7.123, 107.456]} icon={greenIcon}>
                        <Popup><p className="font-bold uppercase text-[10px]">Lembah Lembang (Produsen)</p></Popup>
                     </Marker>
                     <Marker position={[-6.208, 106.845]} icon={blueIcon}>
                        <Popup><p className="font-bold uppercase text-[10px]"> डिमांड Jakarta Selatan (Hot Zone)</p></Popup>
                     </Marker>
                     <Marker position={[-7.000, 107.500]} icon={redIcon}>
                        <Popup><p className="font-bold uppercase text-[10px]">Sengketa TX-8082 (Active Dispute)</p></Popup>
                     </Marker>
                     <Marker position={[-6.917, 107.619]} icon={goldIcon}>
                        <Popup><p className="font-bold uppercase text-[10px]">Bandung Logistics Hub</p></Popup>
                     </Marker>
                  </MapContainer>
               </div>

               {/* Heatmap Legend Overlay */}
               <div className="absolute bottom-6 left-6 p-5 bg-white/95 backdrop-blur-md rounded-[6px] border border-gray-100 shadow-2xl space-y-3 z-[1000]">
                  <p className="text-[9px] font-black text-neutral-900 uppercase tracking-[0.1em] border-b border-gray-100 pb-2">Legenda Logistik</p>
                  <div className="space-y-2">
                     <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.5)]"></span>
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">Sengketa / Masalah</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">Sentra Produksi</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
                        <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter">Zona Permintaan</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* --- MODALS --- */}

         {/* 3. KYC Modal (Tinjau Profil Petani) - Responsif */}
         {showKYCModal && selectedFarmer && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setShowKYCModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-3xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden flex flex-col md:flex-row border-t-8 border-emerald-500 max-h-[90vh]">
                  <div className="flex-1 p-6 md:p-8 space-y-6 md:space-y-8 overflow-y-auto custom-scrollbar">
                     <div className="flex items-center gap-4 md:gap-5">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center font-black text-xl md:text-2xl shadow-2xl rotate-3">
                           {selectedFarmer.name[0]}
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="text-lg md:text-xl font-black text-neutral-900 uppercase tracking-tighter">{selectedFarmer.name}</h3>
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest rounded-full">Review</span>
                           </div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic flex items-center gap-2">
                              <MapPin size={12} className="text-red-500" /> {selectedFarmer.location}
                           </p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-3">
                           <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                              <FileText size={14} className="text-emerald-500" /> Dokumen KTP
                           </label>
                           <div className="aspect-[3/2] bg-gray-50 rounded-[6px] overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center relative group">
                              <img src="https://images.unsplash.com/photo-1621252179027-94459d278660?w=600" className="w-full h-full object-cover blur-[1px] opacity-40" alt="KTP Mock" />
                              <ShieldCheck size={48} className="text-emerald-300 absolute" />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                              <MapIcon size={14} className="text-emerald-500" /> Foto Lahan
                           </label>
                           <div className="aspect-[3/2] bg-gray-100 rounded-[6px] overflow-hidden border-2 border-white relative group">
                              <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt="Lahan" />
                           </div>
                        </div>
                     </div>

                     <div className="p-5 md:p-6 bg-emerald-50 border border-emerald-100 rounded-[6px] flex items-center gap-4 md:gap-5 relative group">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-emerald-500 rounded-[6px] flex items-center justify-center shadow-md">
                           <MapPin size={24} />
                        </div>
                        <div className="flex-1">
                           <p className="text-[9px] md:text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-0.5 italic">Titik Terverifikasi ✓</p>
                           <p className="text-[11px] md:text-xs font-black text-neutral-900 uppercase tracking-tighter">-7.12354 , 107.45678</p>
                        </div>
                     </div>
                  </div>

                  <div className="w-full md:w-[260px] p-6 md:p-8 bg-gray-50 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 shrink-0">
                     <div className="space-y-5 md:space-y-6">
                        <div>
                           <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-widest border-b-2 border-emerald-500 inline-block pb-1 mb-4">Ringkasan</h4>
                           <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:space-y-3">
                              {['KTP Valid', 'Lahan Asli', 'Reputasi 85'].map((item, id) => (
                                 <div key={id} className="flex items-center justify-between bg-white md:bg-transparent p-2 md:p-0 rounded-[4px] border md:border-none border-gray-100">
                                    <span className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">{item}</span>
                                    <span className="text-[7px] md:text-[8px] font-black text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-[4px]">OK</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-row md:flex-col gap-3 mt-6 md:mt-8">
                        <button
                           onClick={handleApproveKYC}
                           disabled={isLoading}
                           className="flex-1 md:w-full py-4 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                           {isLoading ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} className="text-emerald-500" />}
                           Konfirmasi
                        </button>
                        <button
                           onClick={() => setShowKYCModal(false)}
                           className="px-4 md:w-full py-2 text-red-500/50 hover:text-red-600 rounded-[6px] font-black uppercase text-[8px] tracking-widest transition-all"
                        >
                           Batal
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 4. Dispute Resolution Modal (Split View) - Responsif */}
         {showDisputeModal && selectedDispute && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowDisputeModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-4xl max-h-[90vh] relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col overflow-hidden border-t-8 border-red-600">

                  <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-white relative z-10 shrink-0">
                     <div className="flex items-center gap-4 md:gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-[6px] flex items-center justify-center shadow-xl">
                           <AlertCircle size={24} />
                        </div>
                        <div>
                           <div className="flex items-center gap-2 md:gap-3 mb-0.5">
                              <h3 className="text-lg md:text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none">Arbitrase Escrow</h3>
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[7px] md:text-[8px] font-black uppercase rounded-full tracking-widest">Urgent</span>
                           </div>
                           <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest italic leading-none">{selectedDispute.id} • {selectedDispute.problem}</p>
                        </div>
                     </div>
                     <button onClick={() => setShowDisputeModal(false)} className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 hover:bg-neutral-900 hover:text-white rounded-[6px] transition-all flex items-center justify-center group shadow-inner">
                        <XCircle size={18} md:size={20} className="group-hover:rotate-90 transition-transform" />
                     </button>
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 overflow-y-auto custom-scrollbar bg-gray-50/50">
                     <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                        <div className="flex items-center justify-between border-b border-blue-50 pb-2">
                           <div className="flex items-center gap-3 text-blue-600">
                              <ShoppingBag size={18} className="fill-blue-50" />
                              <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Bukti Pembeli</h4>
                           </div>
                        </div>
                        <div className="aspect-video bg-white rounded-[6px] border-2 border-white shadow-xl overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600" className="w-full h-full object-cover" alt="Proof" />
                        </div>
                        <div className="p-5 bg-white rounded-[6px] border border-blue-50 shadow-sm">
                           <p className="text-[11px] md:text-xs font-medium text-neutral-800 leading-relaxed italic">
                              "Barang sampai dalam kondisi hancur, tidak layak konsumsi."
                           </p>
                        </div>
                     </div>

                     <div className="p-6 md:p-8 space-y-6 md:space-y-8 bg-emerald-50/20">
                        <div className="flex items-center justify-between border-b border-emerald-50 pb-2">
                           <div className="flex items-center gap-3 text-emerald-600">
                              <Truck size={18} className="fill-emerald-50" />
                              <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Data Logistik</h4>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                           <div className="p-3 md:p-4 bg-white rounded-[6px] border border-emerald-50 shadow-md flex flex-col items-center text-center gap-2">
                              <Clock size={16} className="text-emerald-500" />
                              <p className="text-[7px] md:text-[8px] font-black text-neutral-900 uppercase">Tepat Waktu ✓</p>
                           </div>
                           <div className="p-3 md:p-4 bg-white rounded-[6px] border border-emerald-50 shadow-md flex flex-col items-center text-center gap-2">
                              <Zap size={16} className="text-amber-500" />
                              <p className="text-[7px] md:text-[8px] font-black text-amber-600 uppercase italic">Suhu 38°C !</p>
                           </div>
                        </div>
                        <div className="p-5 bg-white rounded-[6px] border border-emerald-100 shadow-sm relative overflow-hidden group">
                           <Bot size={40} className="absolute -right-3 -top-3 opacity-5" />
                           <h5 className="text-[8px] md:text-[9px] font-black text-emerald-700 uppercase tracking-widest mb-1">Analisis AI</h5>
                           <p className="text-[10px] md:text-[11px] font-medium text-neutral-800 leading-relaxed italic">
                              Indikasi kerusakan akibat suhu logistik ekstrim selama perjalanan.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="p-6 md:p-8 bg-neutral-900 border-t-4 border-emerald-500 flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
                     <div className="text-center md:text-left hidden sm:block">
                        <h5 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest mb-0.5">Keputusan Akhir</h5>
                        <p className="text-[8px] md:text-[9px] text-gray-400 font-bold">Tentukan alur dana bagi kedua belah pihak.</p>
                     </div>
                     <div className="flex flex-wrap gap-2 md:gap-3 justify-center w-full md:w-auto">
                        <button
                           onClick={() => handleSettleDispute('Refund 100%')}
                           className="flex-1 sm:flex-initial px-3 md:px-5 py-3 bg-red-600 text-white rounded-[6px] font-black uppercase text-[7px] md:text-[8px] tracking-widest shadow-lg hover:bg-red-700 active:scale-95 transition-all"
                        >
                           Refund
                        </button>
                        <button
                           onClick={() => handleSettleDispute('Cairkan 100%')}
                           className="flex-1 sm:flex-initial px-3 md:px-5 py-3 bg-emerald-500 text-white rounded-[6px] font-black uppercase text-[7px] md:text-[8px] tracking-widest shadow-lg hover:bg-emerald-600 active:scale-95 transition-all"
                        >
                           Pencairan
                        </button>
                        <button
                           onClick={() => handleSettleDispute('Bagi Beban')}
                           className="flex-1 sm:flex-initial px-3 md:px-5 py-3 bg-amber-400 text-neutral-900 rounded-[6px] font-black uppercase text-[7px] md:text-[8px] tracking-widest shadow-lg hover:bg-amber-500 active:scale-95 transition-all"
                        >
                           Bagi Beban
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
