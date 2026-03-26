import React, { useState, useEffect } from 'react';
import {
   Package,
   AlertTriangle,
   CheckCircle2,
   Search,
   ShieldOff,
   ShieldCheck,
   EyeOff,
   Truck,
   Calendar,
   MapPin,
   ExternalLink,
   ChevronRight,
   Bot,
   Zap,
   Box,
   MoreVertical,
   X,
   Trash2,
   Edit3,
   Filter,
   Layers,
   Activity,
   Wind,
   ShieldAlert,
   TrendingUp,
   Clock,
   MousePointer2,
   AlertCircle,
   RotateCcw,
   ArrowRight,
   BarChart3,
   Globe,
   Navigation,
   DollarSign,
   Tag,
   Star,
   Scale,
   History,
   MessageCircle,
   Fingerprint,
   Smartphone,
   Info,
   Lock,
   Timer,
   PlayCircle,
   LayoutGrid,
   List,
   AlertOctagon,
   Gavel,
   History as HistoryIcon,
   Check,
   TrendingDown,
   Sparkles,
   Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminProducts = () => {
   const [activeTab, setActiveTab] = useState('Produk');
   const [orderViewMode, setOrderViewMode] = useState('Kanban');
   const [showDisputeModal, setShowDisputeModal] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [showMajeureModal, setShowMajeureModal] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [categoryFilter, setCategoryFilter] = useState('Semua');
   const [toast, setToast] = useState(null);

   // Mock Orders Data (Stateful for simulation)
   const [orders, setOrders] = useState([
      { id: 'ORD-101', invoice: 'INV/2026/AC/001', item: 'Tomat Ceri Lembang', total: 145000, customer: 'Andi Supriadi', farmer: 'Pak Budi', status: 'Menunggu Diproses', timer: 18, type: 'Reguler' },
      { id: 'ORD-102', invoice: 'INV/2026/AC/002', item: 'Beras Merah 5kg', total: 85000, customer: 'Sinta Dewi', farmer: 'Ibu Siti', status: 'Menunggu Diproses', timer: 0, type: 'Reguler' },
      { id: 'ORD-103', invoice: 'INV/2026/AC/003', item: 'Jagung Manis 20kg', total: 250000, customer: 'Rudi Hermawan', farmer: 'Pak Hendra (Lembang)', status: 'Diproses Petani', isPreOrder: true, harvestDate: '25 Mar 2026', type: 'Pre-Order' },
      { id: 'ORD-104', invoice: 'INV/2026/AC/004', item: 'Cabai Rawit 2kg', total: 170000, customer: 'Maya Putri', farmer: 'Pak Sugeng', status: 'Dalam Perjalanan', courier: 'AgriFleet', hub: 'Hub Bandung Tengah', lastUpdate: 3, type: 'Reguler' },
      { id: 'ORD-105', invoice: 'INV/2026/AC/005', item: 'Melon Super', total: 320000, customer: 'Budi Santoso', farmer: 'Pak Jono', status: 'Dalam Perjalanan', courier: 'SiCepat', hub: 'Hub Jakarta Selatan', lastUpdate: 28, type: 'Reguler', deliveredFor: 52 },
      { id: 'ORD-106', invoice: 'INV/2026/AC/006', item: 'Apel Malang 5kg', total: 210000, customer: 'Rina Rose', farmer: 'Pak Malik', status: 'Komplain & Retur', disputeReason: 'Tomat hancur saat diterima', evidence: { buyer: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400', farmer: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400' } },
      { id: 'ORD-107', invoice: 'INV/2026/AC/007', item: 'Bawang Merah 10kg', total: 450000, customer: 'Doni Tata', farmer: 'Pak Anwar', status: 'Selesai', deliveredAt: '20 Mar 2026', type: 'Reguler' },
      { id: 'ORD-108', invoice: 'INV/2026/AC/008', item: 'Kentang Dieng 50kg', total: 1200000, customer: 'Eko Sulistyo', farmer: 'Ibu Fatma', status: 'Dalam Perjalanan', courier: 'Internal Truck', hub: 'Tiba di Tujuan', deliveredFor: 52, type: 'Reguler' },
      { id: 'ORD-109', invoice: 'INV/2026/AC/009', item: 'Wortel Organik', total: 55000, customer: 'Solehah', farmer: 'Pak Hendra', status: 'Menunggu Diproses', timer: 12, type: 'Reguler' },
      { id: 'ORD-110', invoice: 'INV/2026/AC/010', item: 'Madu Hutan', total: 180000, customer: 'Zaki', farmer: 'Lembang Bee', status: 'Diproses Petani', type: 'Pre-Order', harvestDate: '26 Mar 2026' },
   ]);

   const kanbanStages = [
      { id: 'Menunggu Diproses', label: 'Escrow (Processing)', color: 'bg-blue-50/50 text-blue-600', border: 'border-blue-200' },
      { id: 'Diproses Petani', label: 'Packaging / Harvest', color: 'bg-amber-50/50 text-amber-600', border: 'border-amber-200' },
      { id: 'Dalam Perjalanan', label: 'Active Logistics', color: 'bg-indigo-50/50 text-indigo-600', border: 'border-indigo-200' },
      { id: 'Komplain & Retur', label: 'Dispute / Mediation', color: 'bg-red-50/50 text-red-600', border: 'border-red-200' },
      { id: 'Selesai', label: 'Success (Cleared)', color: 'bg-emerald-50/50 text-emerald-600', border: 'border-emerald-200' },
   ];

   const [products, setProducts] = useState([
      { id: 'PRD-001', name: 'Tomat Ceri Lembang', farmer: 'Pak Budi', price: 25000, marketPrice: 22000, stock: 120, status: 'Active', area: 'Bandung Selatan', category: 'Sayuran', grade: 'A+', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
      { id: 'PRD-002', name: 'Cabai Rawit Merah', farmer: 'Ibu Siti', price: 85000, marketPrice: 82000, stock: 45, status: 'Active', area: 'Cianjur', category: 'Buah', grade: 'B', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
      { id: 'PRD-003', name: 'Wortel Organik', farmer: 'Pak Hendra', price: 150000, marketPrice: 45000, stock: 10, status: 'Flagged', area: 'Lembang', category: 'Sayuran', grade: 'A', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400' },
      { id: 'PRD-004', name: 'Jagung Manis', farmer: 'Pak Sugeng', price: 15000, marketPrice: 14500, stock: 500, status: 'Active', area: 'Garut', category: 'Grosir', grade: 'A+', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400' },
      { id: 'PRD-005', name: 'Beras Merah Cianjur', farmer: 'Ibu Fatma', price: 22000, marketPrice: 21500, stock: 1000, status: 'Active', area: 'Cianjur', category: 'Grosir', grade: 'Premium', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
   ]);

   const priceTrendData = [
      { day: 'Sen', price: 20000, supply: 120 }, { day: 'Sel', price: 22000, supply: 140 }, { day: 'Rab', price: 19000, supply: 90 }, { day: 'Kam', price: 25000, supply: 200 }, { day: 'Jum', price: 24000, supply: 180 }, { day: 'Sab', price: 28000, supply: 250 }, { day: 'Min', price: 30000, supply: 300 },
   ];

   const showNotification = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
   };

   const filteredProducts = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.farmer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'Semua' || p.category === categoryFilter;
      const isVisible = p.status !== 'Hidden';
      return matchesSearch && matchesCategory && isVisible;
   });

   const filteredOrders = orders.filter(o => {
      return o.invoice.toLowerCase().includes(searchQuery.toLowerCase()) || o.item.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || o.farmer.toLowerCase().includes(searchQuery.toLowerCase());
   });

   // ADVANCED ACTIONS - Actually mutating state
   const handleForceComplete = () => {
      setOrders(prev => prev.map(o => {
         if (o.deliveredFor >= 48 && o.status === 'Dalam Perjalanan') {
            return { ...o, status: 'Selesai', deliveredAt: new Date().toLocaleDateString() };
         }
         return o;
      }));
      showNotification("Eksekusi Massal Berhasil! Dana diteruskan ke petani.");
   };

   const handleModeration = (p, action) => {
      if (action === "Sembunyikan") {
         setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, status: 'Hidden' } : prod));
         showNotification(`Produk ${p.name} disembunyikan dari pasar!`);
      } else if (action === "Flagged") {
         setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, status: 'Flagged' } : prod));
         showNotification(`Produk ${p.name} ditandai untuk mediasi harga!`);
      } else if (action === "Active") {
         setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, status: 'Active' } : prod));
         showNotification(`Status Produk ${p.name} kembali Aktif!`);
      }
   };

   const handleRefundDispute = (isRefund) => {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: isRefund ? 'Refunded' : 'Selesai', resolution: isRefund ? 'Full Refund to Customer' : 'Payment to Farmer' } : o));
      showNotification(isRefund ? "Refund Berhasil Diproses!" : "Dispute Ditolak, Dana Cair ke Petani!");
      setShowDisputeModal(false);
      setSelectedOrder(null);
   };

   const handleForceMajeureRefund = () => {
      const affectedCount = orders.filter(o => o.status !== 'Selesai' && o.status !== 'Refunded').length;
      setOrders(prev => prev.map(o => (o.status !== 'Selesai' && o.status !== 'Refunded') ? { ...o, status: 'Refunded', resolution: 'Force Majeure Protocol' } : o));
      showNotification(`AUTORISASI BERHASIL! ${affectedCount} Pesanan di-refund massal.`);
      setShowMajeureModal(false);
   };

   const handleAdjustMargin = () => {
      setProducts(prev => prev.map(p => {
         if (p.price > p.marketPrice * 1.5) {
            return { ...p, price: Math.floor(p.marketPrice * 1.1), status: 'Active' };
         }
         return p;
      }));
      showNotification("Algoritma AI: Harga disesuaikan mendekati rata-rata pasar!");
   };

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500 relative">

         {/* Toast Notification Simulation */}
         {toast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 border-2 border-amber-400 text-white px-8 py-4 rounded-[6px] shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-10">
               <ShieldCheck className="text-amber-400" size={24} />
               <p className="text-xs font-black uppercase tracking-widest">{toast}</p>
            </div>
         )}

         {/* 1. Header & Quick Metriks */}
         <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[6px] border border-gray-100 shadow-xl flex items-center gap-5 group hover:-translate-y-1 transition-all">
               <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[6px] flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-100">
                  <Box size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Produk</p>
                  <p className="text-xl font-black text-neutral-900 tracking-tighter mt-1">{products.filter(p => p.status !== 'Hidden').length} SKU</p>
               </div>
            </div>
            <div className="bg-white p-6 rounded-[6px] border border-gray-100 shadow-xl flex items-center gap-5 group hover:-translate-y-1 transition-all">
               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[6px] flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-lg shadow-emerald-100">
                  <CheckCircle2 size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Verifikasi Lolos</p>
                  <p className="text-xl font-black text-neutral-900 tracking-tighter mt-1">98%</p>
               </div>
            </div>
            <div className="bg-white p-6 rounded-[6px] border border-gray-100 shadow-xl flex items-center gap-5 group hover:-translate-y-1 transition-all border-l-8 border-l-red-500">
               <div className="w-14 h-14 bg-red-50 text-red-600 rounded-[6px] flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg shadow-red-100 animate-pulse">
                  <AlertOctagon size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none">Status Kritis (SLA)</p>
                  <p className="text-xl font-black text-neutral-900 tracking-tighter mt-1">{orders.filter(o => o.status === 'Komplain & Retur' || (o.status === 'Dalam Perjalanan' && o.lastUpdate > 24)).length} Pesanan</p>
               </div>
            </div>
            <div className="bg-neutral-900 p-6 rounded-[6px] shadow-xl flex items-center gap-5 group hover:bg-amber-500 transition-all cursor-pointer overflow-hidden relative" onClick={() => setShowMajeureModal(true)}>
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={60} />
               </div>
               <div className="w-14 h-14 bg-white/20 text-white rounded-[6px] flex items-center justify-center backdrop-blur-md">
                  <Sparkles size={24} />
               </div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest leading-none group-hover:text-white">AI Mode</p>
                  <p className="text-sm font-black text-white uppercase tracking-tighter mt-1">Market Insight</p>
               </div>
            </div>
         </section>

         {/* 2. Main Module Switcher */}
         <section className="bg-white rounded-[6px] border border-gray-100 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
            <div className="p-4 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center bg-gray-50/50">
               <div className="flex gap-2">
                  {['Produk', 'Pesanan', 'Market Trends'].map(tab => (
                     <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
                        className={`px-12 py-5 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-neutral-900 text-white shadow-2xl' : 'text-gray-400 hover:text-neutral-900'}`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>
               <div className="px-8 flex items-center gap-6 mt-4 lg:mt-0">
                  <div className="relative flex items-center group">
                     <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari SKU, Petani, Invoice..."
                        className="pl-14 pr-8 h-[60px] bg-white border border-gray-200 rounded-[6px] text-xs font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all w-64 lg:w-80"
                     />
                  </div>
                  {activeTab === 'Pesanan' && (
                     <div className="flex bg-white p-2 rounded-[6px] border border-gray-100 shadow-sm h-[60px] items-center">
                        <button onClick={() => setOrderViewMode('Kanban')} className={`p-3 rounded-[6px] transition-all flex items-center gap-2 ${orderViewMode === 'Kanban' ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400'}`}>
                           <LayoutGrid size={18} />
                        </button>
                        <button onClick={() => setOrderViewMode('Table')} className={`p-3 rounded-[6px] transition-all flex items-center gap-2 ${orderViewMode === 'Table' ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400'}`}>
                           <List size={20} />
                        </button>
                     </div>
                  )}
               </div>
            </div>

            {/* CONTENT AREA */}
            <div className="min-h-[800px] bg-gray-50/20">

               {/* TAB: PRODUK */}
               {activeTab === 'Produk' && (
                  <div className="p-6 md:p-10 animate-in fade-in duration-500 space-y-8">
                     <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                        <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide w-full md:w-auto">
                           <div className="flex bg-white p-1.5 rounded-[6px] border border-gray-100 shadow-sm">
                              {['Semua', 'Sayuran', 'Buah', 'Grosir'].map(cat => (
                                 <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-6 py-2.5 rounded-[6px] text-[9px] font-black uppercase tracking-widest transition-all ${categoryFilter === cat ? 'bg-neutral-900 text-white shadow-lg' : 'hover:bg-gray-50 text-gray-400'}`}
                                 >
                                    {cat}
                                 </button>
                              ))}
                           </div>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                           <button onClick={() => setProducts(prev => prev.map(p => ({ ...p, status: 'Active' })))} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white border border-gray-100 text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                              <RotateCcw size={16} /> Reset Semua
                           </button>
                           <button onClick={() => showNotification("Fitur Batch Moderasi Diaktifkan!")} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                              <Zap size={16} /> Batch Moderasi
                           </button>
                        </div>
                     </div>

                     <div className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[1000px]">
                           <thead>
                              <tr className="bg-gray-50/50">
                                 <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Komoditas & Grade</th>
                                 <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Petani & Lokasi</th>
                                 <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">Analisis Harga</th>
                                 <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">Stok Aktif</th>
                                 <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Moderasi</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                              {filteredProducts.map((p, i) => (
                                 <tr key={i} className={`group hover:bg-gray-50/50 transition-all ${p.status === 'Flagged' ? 'bg-red-50/30' : ''}`}>
                                    <td className="px-10 py-8">
                                       <div className="flex items-center gap-6">
                                          <div className="w-20 h-20 bg-gray-100 rounded-[6px] overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500 border-4 border-white shrink-0">
                                             <img src={p.image} className="w-full h-full object-cover" />
                                          </div>
                                          <div>
                                             <div className="flex items-center gap-3 mb-1">
                                                <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{p.name}</p>
                                                <span className="px-2 py-0.5 bg-neutral-900 text-white text-[8px] font-black rounded uppercase">{p.grade}</span>
                                             </div>
                                             <p className="text-[9px] text-gray-400 font-bold tracking-[0.2em] italic uppercase">{p.category} • {p.id}</p>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="px-6 py-8">
                                       <div className="flex items-center gap-3 mb-1">
                                          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                             <ShieldCheck size={12} className="text-emerald-600" />
                                          </div>
                                          <p className="text-xs font-black text-neutral-900 uppercase">{p.farmer}</p>
                                       </div>
                                       <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ml-9 whitespace-nowrap">{p.area}</p>
                                    </td>
                                    <td className="px-6 py-8 text-center">
                                       <div className="space-y-1">
                                          <p className={`text-sm font-black ${p.status === 'Flagged' ? 'text-red-600 animate-pulse' : 'text-neutral-900'}`}>Rp {p.price.toLocaleString()}</p>
                                          <div className="flex items-center justify-center gap-2">
                                             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Pasar: {p.marketPrice.toLocaleString()}</p>
                                             {p.price > p.marketPrice * 1.5 ? <TrendingUp size={10} className="text-red-500" /> : <TrendingDown size={10} className="text-emerald-500" />}
                                          </div>
                                       </div>
                                    </td>
                                    <td className="px-6 py-8 text-center">
                                       <p className="text-sm font-black text-neutral-900">{p.stock} Kg</p>
                                       <div className="w-24 h-1.5 bg-gray-100 rounded-full mx-auto mt-2 overflow-hidden">
                                          <div className={`h-full rounded-full ${p.stock < 50 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (p.stock / 1000) * 100)}%` }}></div>
                                       </div>
                                    </td>
                                    <td className="px-10 py-8 text-right whitespace-nowrap">
                                       <div className="flex items-center justify-end gap-3 lg:translate-x-10 lg:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                          <button
                                             onClick={() => handleModeration(p, "Sembunyikan")}
                                             className="p-4 bg-white shadow-xl rounded-[6px] text-red-500 hover:bg-neutral-900 hover:text-white transition-all border border-gray-100"
                                          >
                                             <EyeOff size={18} />
                                          </button>
                                          <button
                                             onClick={() => handleModeration(p, p.status === 'Flagged' ? 'Active' : 'Flagged')}
                                             className={`p-4 bg-white shadow-xl rounded-[6px] transition-all border border-gray-100 ${p.status === 'Flagged' ? 'text-emerald-500 hover:bg-neutral-900 hover:text-white' : 'text-amber-500 hover:bg-neutral-900 hover:text-white'}`}
                                          >
                                             {p.status === 'Flagged' ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                              {filteredProducts.length === 0 && (
                                 <tr><td colSpan="5" className="p-20 text-center text-gray-400 font-black uppercase italic text-xs tracking-widest">Produk Tidak Ditemukan</td></tr>
                              )}
                           </tbody>
                        </table>
                     </div>
                  </div>
               )}

               {/* TAB: PESANAN */}
               {activeTab === 'Pesanan' && (
                  <div className="min-h-[800px] bg-gray-50/30">

                     {/* FORCE COMPLETE WIDGET */}
                     <div className="p-6 md:p-10 pb-0">
                        <div className="bg-emerald-600 p-8 rounded-[6px] text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-200 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                              <CheckCircle2 size={120} />
                           </div>
                           <div className="relative z-10 space-y-2">
                              <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none">Force Complete Intelligence</h3>
                              <p className="text-xs text-emerald-100 font-bold uppercase tracking-widest opacity-80 leading-relaxed max-w-xl">
                                 <span className="underline decoration-white underline-offset-4 font-mono">{orders.filter(o => o.deliveredFor >= 48 && o.status === 'Dalam Perjalanan').length} ORDERS READY</span> untuk pencairan dana Escrow otomatis ke petani berdasarkan data konfirmasi logistik.
                              </p>
                           </div>
                           <button onClick={handleForceComplete} className="relative z-10 px-10 py-5 bg-white text-emerald-600 rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-110 active:scale-95 transition-all w-full lg:w-auto">
                              Eksekusi Massal <Zap size={14} className="inline ml-2" />
                           </button>
                        </div>
                     </div>

                     {orderViewMode === 'Kanban' ? (
                        <div className="flex gap-6 p-6 md:p-10 overflow-x-auto scrollbar-hide pb-20 custom-scrollbar">
                           {kanbanStages.map((stage, idx) => (
                              <div key={idx} className="w-[300px] space-y-6 flex-shrink-0">
                                 {/* STAGE HEADER */}
                                 <div className={`p-4 rounded-[6px] border-2 bg-white flex items-center justify-between shadow-lg ${stage.border}`}>
                                    <div className="flex items-center gap-3">
                                       <div className={`p-2 rounded-[6px] shadow-inner ${stage.color}`}>
                                          {stage.id === 'Menunggu Diproses' && <Timer size={16} />}
                                          {stage.id === 'Diproses Petani' && <Wind size={16} />}
                                          {stage.id === 'Dalam Perjalanan' && <Truck size={16} />}
                                          {stage.id === 'Komplain & Retur' && <Gavel size={16} />}
                                          {stage.id === 'Selesai' && <Check size={16} />}
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-900 leading-none">{stage.label}</p>
                                       </div>
                                    </div>
                                    <span className="bg-neutral-900 text-white w-7 h-7 rounded-[6px] flex items-center justify-center text-[10px] font-black shadow-lg shadow-neutral-900/40">
                                       {filteredOrders.filter(o => o.status === stage.id).length}
                                    </span>
                                 </div>

                                 {/* CARDS */}
                                 <div className="space-y-4">
                                    {filteredOrders.filter(o => o.status === stage.id).map((o, oIdx) => (
                                       <div
                                          key={oIdx}
                                          onClick={() => { setSelectedOrder(o); if (o.status === 'Komplain & Retur') setShowDisputeModal(true); }}
                                          className={`p-6 bg-white rounded-[6px] border-2 border-transparent shadow-sm hover:shadow-xl hover:border-neutral-900/10 hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden
                                       ${o.status === 'Menunggu Diproses' && o.timer === 0 ? 'bg-red-50 border-red-200 ring-2 ring-red-500/10' : ''}
                                       ${o.status === 'Dalam Perjalanan' && o.lastUpdate > 24 ? 'border-amber-200 ring-2 ring-amber-500/10' : ''}
                                     `}
                                       >
                                          {/* ALERT OVERLAYS */}
                                          {(o.status === 'Menunggu Diproses' && o.timer === 0) && (
                                             <div className="absolute top-0 left-0 right-0 bg-red-600 text-white py-1 text-center text-[7px] font-black uppercase tracking-[0.2em] italic">Petani Off-link</div>
                                          )}
                                          {(o.status === 'Dalam Perjalanan' && o.lastUpdate > 24) && (
                                             <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white py-1 text-center text-[7px] font-black uppercase tracking-[0.2em] italic animate-pulse">SLA Warning</div>
                                          )}

                                          <div className="flex justify-between items-start mb-4">
                                             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-mono truncate w-32">{o.invoice}</p>
                                             {o.status === 'Menunggu Diproses' && (
                                                <div className={`flex items-center gap-1.5 ${o.timer === 0 ? 'text-red-500' : 'text-blue-500'}`}>
                                                   <Timer size={12} />
                                                   <span className="text-[9px] font-black uppercase">{o.timer}H</span>
                                                </div>
                                             )}
                                          </div>

                                          <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight mb-2 leading-tight">{o.item}</h4>
                                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate">{o.customer} ⟶ {o.farmer}</p>

                                          <div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-5">
                                             <div>
                                                <p className="text-lg font-black text-neutral-900 tracking-tighter leading-none">Rp {(o.total / 1000).toFixed(0)}K</p>
                                             </div>
                                             <div className="flex gap-2">
                                                {o.deliveredFor >= 48 && o.status === 'Dalam Perjalanan' && (
                                                   <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-[6px] animate-pulse" title="Ready to Force Complete"><Zap size={14} /></div>
                                                )}
                                                <div className="w-10 h-10 bg-gray-50 rounded-[6px] flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all transform group-hover:scale-110">
                                                   <ChevronRight size={18} />
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                    {filteredOrders.filter(o => o.status === stage.id).length === 0 && (
                                       <div className="p-10 border-2 border-dashed border-gray-100 rounded-[6px] text-center text-[9px] font-black text-gray-300 uppercase italic">Kosong</div>
                                    )}
                                 </div>
                              </div>
                           ))}
                           {/* SPECIAL DISPLAY FOR REFUNDED (Hidden from standard stages) */}
                           <div className="w-[300px] opacity-50 grayscale hover:grayscale-0 transition-all">
                              <div className="p-4 rounded-[6px] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-between mb-6">
                                 <p className="text-[10px] font-black uppercase text-gray-400">Refund History</p>
                                 <span className="bg-gray-300 text-white w-7 h-7 rounded-[6px] flex items-center justify-center text-[10px] font-black">
                                    {orders.filter(o => o.status === 'Refunded').length}
                                 </span>
                              </div>
                              <div className="space-y-4">
                                 {orders.filter(o => o.status === 'Refunded').map((o, idx) => (
                                    <div key={idx} className="p-4 bg-white border border-gray-100 rounded-[6px]">
                                       <p className="text-[8px] font-bold text-red-500 uppercase mb-1">Canceled / Refunded</p>
                                       <p className="text-[10px] font-black text-neutral-900 uppercase">{o.item}</p>
                                       <p className="text-[8px] text-gray-400 mt-1 uppercase italic">{o.resolution}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     ) : (
                        <div className="p-6 md:p-10 animate-in fade-in duration-500">
                           <div className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden overflow-x-auto">
                              <table className="w-full text-left min-w-[800px]">
                                 <thead>
                                    <tr className="bg-gray-50/50">
                                       <th className="px-10 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Inv #</th>
                                       <th className="px-6 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Komoditas & Supplier</th>
                                       <th className="px-6 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Escrow flow</th>
                                       <th className="px-10 py-5 text-right text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-gray-50">
                                    {filteredOrders.map((o, i) => (
                                       <tr key={i} className="group hover:bg-gray-50 transition-all cursor-pointer" onClick={() => setSelectedOrder(o)}>
                                          <td className="px-10 py-6 text-[10px] font-mono font-black text-neutral-900">{o.invoice}</td>
                                          <td className="px-6 py-6 font-black text-[10px] text-neutral-900 uppercase">{o.item} ⟶ {o.farmer}</td>
                                          <td className="px-6 py-6 font-black text-[10px] text-emerald-600">Rp {o.total.toLocaleString()}</td>
                                          <td className="px-10 py-6 text-right">
                                             <span className={`px-3 py-1 rounded-[6px] text-[8px] font-black uppercase tracking-widest ${o.status === 'Refunded' ? 'bg-red-100 text-red-600' : 'bg-gray-100'}`}>
                                                {o.status}
                                             </span>
                                          </td>
                                       </tr>
                                    ))}
                                    {filteredOrders.length === 0 && (
                                       <tr><td colSpan="4" className="p-20 text-center text-gray-300 font-black uppercase text-xs">Data Tidak Ditemukan</td></tr>
                                    )}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     )}
                  </div>
               )}

               {/* TAB: MARKET TRENDS */}
               {activeTab === 'Market Trends' && (
                  <div className="p-6 md:p-10 animate-in zoom-in-95 duration-700 space-y-10">
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 bg-neutral-900 p-8 md:p-12 rounded-[6px] text-white shadow-2xl relative overflow-hidden group">
                           <div className="absolute right-0 top-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[2s]"><TrendingUp size={200} /></div>
                           <div className="flex flex-col md:flex-row items-center justify-between mb-12 relative z-10 gap-6">
                              <div className="flex items-center gap-6">
                                 <div className="w-16 h-16 bg-emerald-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-lg shrink-0">
                                    <DollarSign size={28} />
                                 </div>
                                 <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-none italic">Market Price Trends</h3>
                                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-2">Data Real-time Agribisnis Nasional</p>
                                 </div>
                              </div>
                              <div className="flex bg-white/10 p-1.5 rounded-[6px] border border-white/10 w-full md:w-auto">
                                 <button className="flex-1 md:flex-none px-6 py-2.5 rounded-[6px] bg-white text-neutral-900 text-[9px] font-black uppercase tracking-widest shadow-xl transition-all">7 Hari</button>
                                 <button className="flex-1 md:flex-none px-6 py-2.5 rounded-[6px] text-white text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">30 Hari</button>
                              </div>
                           </div>
                           <div className="h-[350px] w-full mt-10 relative z-10">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={priceTrendData}>
                                    <defs>
                                       <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                       </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} dy={15} />
                                    <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                                    <Tooltip cursor={{ stroke: '#10b981', strokeWidth: 2 }} contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '20px', padding: '15px' }} />
                                    <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorPrice)" />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                        <div className="space-y-6">
                           <div className="bg-amber-400 p-10 rounded-[6px] text-neutral-900 shadow-xl relative overflow-hidden group h-full flex flex-col justify-between">
                              <div className="absolute right-[-10%] top-[-10%] opacity-10 rotate-12 transition-transform"><Wind size={200} /></div>
                              <div className="relative z-10">
                                 <div className="w-14 h-14 bg-white rounded-[6px] shadow-lg mb-8 flex items-center justify-center"><Zap size={28} className="text-amber-500" /></div>
                                 <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-6 italic">Supply Shortage Alert</h4>
                                 <div className="space-y-4">
                                    <div className="p-5 bg-white/40 rounded-[6px] border border-white/20 backdrop-blur-sm flex justify-between items-center group/item hover:bg-white transition-all">
                                       <div>
                                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Cabai Rawit</p>
                                          <p className="text-sm font-black uppercase">Cianjur & Garut</p>
                                       </div>
                                       <div className="text-right">
                                          <p className="text-sm font-black text-red-600">Low Supply</p>
                                          <p className="text-[9px] font-bold">+15% Hike</p>
                                       </div>
                                    </div>
                                    <div className="p-5 bg-white/40 rounded-[6px] border border-white/20 backdrop-blur-sm flex justify-between items-center group/item hover:bg-white transition-all">
                                       <div>
                                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Tomat Lembang</p>
                                          <p className="text-sm font-black uppercase">Lembang</p>
                                       </div>
                                       <div className="text-right">
                                          <p className="text-sm font-black text-emerald-600">High Supply</p>
                                          <p className="text-[9px] font-bold">Stable</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <button onClick={handleAdjustMargin} className="w-full mt-10 py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-red-600 transition-all relative z-10">
                                 Sesuaikan Margin Otomatis
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

            </div>
         </section>

         {/* --- MODALS --- */}
         {showDisputeModal && selectedOrder && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
               <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setShowDisputeModal(false)}></div>
               <div className="bg-white w-full max-w-6xl rounded-[6px] relative z-10 shadow-3xl animate-in zoom-in-95 duration-500 flex flex-col lg:flex-row overflow-hidden border-[6px] md:border-[12px] border-white max-h-[95vh]">
                  <div className="flex-1 p-8 md:p-12 bg-red-50/30 overflow-y-auto custom-scrollbar">
                     <div className="flex items-center gap-6 mb-10 text-left">
                        <div className="w-16 h-16 bg-red-500 text-white rounded-[6px] flex items-center justify-center shadow-lg shrink-0">
                           <Smartphone size={32} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Bukti Komplain Pembeli</h3>
                           <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mt-1 italic">{selectedOrder.customer}</p>
                        </div>
                     </div>
                     <div className="aspect-video bg-white rounded-[6px] shadow-xl overflow-hidden mb-8 border-4 border-white">
                        <img src={selectedOrder.evidence?.buyer || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'} className="w-full h-full object-cover" />
                     </div>
                     <div className="bg-white p-8 rounded-[6px] border border-red-100 text-left">
                        <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">Deskripsi Komplain</p>
                        <p className="text-sm font-medium text-neutral-900 leading-relaxed italic">"{selectedOrder.disputeReason}"</p>
                     </div>
                  </div>
                  <div className="flex-1 p-8 md:p-12 bg-emerald-50/30 overflow-y-auto custom-scrollbar">
                     <div className="flex items-center gap-6 mb-10 text-left">
                        <div className="w-16 h-16 bg-emerald-500 text-white rounded-[6px] flex items-center justify-center shadow-lg shrink-0">
                           <Box size={32} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Bukti Packing Petani</h3>
                           <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1 italic">{selectedOrder.farmer}</p>
                        </div>
                     </div>
                     <div className="aspect-video bg-white rounded-[6px] shadow-xl overflow-hidden mb-8 border-4 border-white">
                        <img src={selectedOrder.evidence?.farmer || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400'} className="w-full h-full object-cover" />
                     </div>
                     <div className="bg-white p-8 rounded-[6px] border border-emerald-100 flex items-center justify-between text-left">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Status Terverifikasi AI</p>
                        <span className="px-3 py-1 bg-emerald-100 text-[8px] font-black uppercase rounded-[6px] text-emerald-600 italic">Fresh Capture Verified</span>
                     </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-neutral-900/95 backdrop-blur-xl border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex items-center gap-6 text-left">
                        <Gavel size={24} className="text-white" />
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Keputusan Mutlak Admin</p>
                           <p className="text-sm font-black text-white uppercase italic">Dana Escrow: Rp {selectedOrder.total.toLocaleString()}</p>
                        </div>
                     </div>
                     <div className="flex gap-4 w-full md:w-auto">
                        <button onClick={() => handleRefundDispute(true)} className="flex-1 md:flex-none px-8 py-5 bg-red-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-red-900/20">Refund Penuh</button>
                        <button onClick={() => handleRefundDispute(false)} className="flex-1 md:flex-none px-8 py-5 bg-emerald-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-900/20">Tolak & Cairkan</button>
                        <button onClick={() => setShowDisputeModal(false)} className="flex-1 md:flex-none px-8 py-5 bg-white text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Batal</button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {showMajeureModal && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 text-center">
               <div className="absolute inset-0 bg-red-950/80 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setShowMajeureModal(false)}></div>
               <div className="bg-white w-full max-w-3xl rounded-[6px] p-10 md:p-20 shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 border-[10px] border-red-50">
                  <div className="w-28 h-28 bg-red-100 text-red-600 rounded-[6px] flex items-center justify-center mx-auto mb-10 shadow-2xl animate-bounce">
                     <Wind size={56} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter mb-4 leading-none italic">Emergency Mode Access</h2>
                  <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-12 leading-relaxed">Otorisasi Pembatalan Massal & Refund 100% via Brankas Escrow (Protokol Force Majeure)</p>
                  <div className="space-y-4">
                     <button onClick={handleForceMajeureRefund} className="w-full py-8 bg-red-600 text-white rounded-[6px] font-black uppercase text-sm tracking-[0.2em] shadow-2xl hover:bg-neutral-900 transition-all border-b-8 border-red-800 active:border-b-0 active:translate-y-2">Authorize Refund Massal</button>
                     <button onClick={() => setShowMajeureModal(false)} className="w-full py-5 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-neutral-900 transition-colors border border-gray-100 rounded-[6px]">Abort Protocol</button>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default AdminProducts;
