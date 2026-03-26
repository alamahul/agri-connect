import React, { useState, useMemo } from 'react';
import {
   DollarSign,
   TrendingUp,
   Award,
   Lock,
   Wallet,
   ChevronRight,
   Download,
   Bot,
   Zap,
   AlertTriangle,
   CheckCircle2,
   ArrowUpRight,
   Filter,
   BarChart as BarChartIcon,
   PieChart as PieChartIcon,
   Calendar,
   FileText,
   Star,
   Clock,
   Loader2,
   X,
   ShieldCheck,
   ChevronDown,
   RefreshCcw,
   History
} from 'lucide-react';
import {
   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
   ReferenceLine, Cell
} from 'recharts';

const FILTER_DATA = {
   'Hari Ini': {
      sales: [
         { day: '08:00', sales: 150000 },
         { day: '10:00', sales: 450000 },
         { day: '12:00', sales: 200000 },
         { day: '14:00', sales: 680000 },
         { day: '16:00', sales: 410000 },
         { day: '18:00', sales: 590000 },
         { day: '20:00', sales: 300000 },
      ],
      omzet: 'Rp 2.880.000',
      locked: 'Rp 150.000',
      top: 'Tomat Ceri (25 Kg)',
      market: 350000
   },
   'Minggu Ini': {
      sales: [
         { day: 'Sen', sales: 450000 },
         { day: 'Sel', sales: 520000 },
         { day: 'Rab', sales: 680000 },
         { day: 'Kam', sales: 410000 },
         { day: 'Jum', sales: 590000 },
         { day: 'Sab', sales: 880000 },
         { day: 'Min', sales: 950000 },
      ],
      omzet: 'Rp 4.480.000',
      locked: 'Rp 850.000',
      top: 'Cabai Rawit (80 Kg)',
      market: 400000
   },
   'Bulan Ini': {
      sales: [
         { day: 'M-1', sales: 8500000 },
         { day: 'M-2', sales: 12500000 },
         { day: 'M-3', sales: 11000000 },
         { day: 'M-4', sales: 15800000 },
      ],
      omzet: 'Rp 47.800.000',
      locked: 'Rp 5.500.000',
      top: 'Jagung Manis (1.2 Ton)',
      market: 10000000
   }
};

const TRANSACTIONS = [
   { id: 'TX-001', date: '21 Mar 2026', desc: 'Pencairan Dana Escrow (INV-001)', amount: 150000, status: 'Berhasil', type: 'income' },
   { id: 'TX-002', date: '21 Mar 2026', desc: 'Biaya Layanan AgriConnect (2%)', amount: -3000, status: 'Dipotong', type: 'fee' },
   { id: 'TX-003', date: '20 Mar 2026', desc: 'Pencairan Dana Escrow (INV-044)', amount: 1250000, status: 'Berhasil', type: 'income' },
   { id: 'TX-004', date: '19 Mar 2026', desc: 'Penarikan Saldo ke BRI (Siti Aminah)', amount: -5000000, status: 'Berhasil', type: 'withdraw' },
];

const FarmerAnalytics = () => {
   const [filter, setFilter] = useState('Minggu Ini');
   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
   const [withdrawStep, setWithdrawStep] = useState(1); // 1: input, 2: pin, 3: success
   const [withdrawAmount, setWithdrawAmount] = useState('12450000');
   const [isRefreshingInsight, setIsRefreshingInsight] = useState(false);
   const [isDownloading, setIsDownloading] = useState(false);

   const activeData = useMemo(() => FILTER_DATA[filter], [filter]);

   const handleRefreshInsight = () => {
      setIsRefreshingInsight(true);
      setTimeout(() => setIsRefreshingInsight(false), 2000);
   };

   const handleDownloadReport = () => {
      setIsDownloading(true);
      setTimeout(() => {
         setIsDownloading(false);
         alert('Laporan berhasil diunduh (Simulation)');
      }, 2500);
   };

   const handleWithdraw = () => {
      if (withdrawStep === 1) setWithdrawStep(2);
      else if (withdrawStep === 2) {
         setTimeout(() => setWithdrawStep(3), 1500);
      } else {
         setShowWithdrawModal(false);
         setWithdrawStep(1);
      }
   };

   const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
         return (
            <div className="bg-neutral-900 text-white p-4 rounded-[6px] shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{label}</p>
               <div className="space-y-1">
                  <p className="text-sm font-black">Pendapatan: <span className="text-emerald-400">Rp {payload[0].value.toLocaleString('id-ID')}</span></p>
                  <p className="text-[10px] font-bold text-gray-400 italic">"Performa Penjualan Optimis"</p>
               </div>
            </div>
         );
      }
      return null;
   };

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500">

         {/* 1. Header & Financial Summary */}
         <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Analisis & Keuangan</h1>
               <p className="text-gray-500 mt-1 font-medium">Pantau kesehatan finansial kebun Anda secara transparan.</p>
            </div>

            <div className="flex bg-white p-1.5 rounded-[6px] border border-gray-100 shadow-sm gap-1 self-start">
               {['Hari Ini', 'Minggu Ini', 'Bulan Ini'].map(t => (
                  <button
                     key={t}
                     onClick={() => setFilter(t)}
                     className={`px-6 py-2.5 rounded-[6px] text-xs font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400 hover:text-neutral-900 hover:bg-gray-50'}`}
                  >
                     {t}
                  </button>
               ))}
            </div>
         </section>

         {/* Summary Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
               <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-emerald-200">
                     <DollarSign size={28} />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-[6px] text-[10px] font-black uppercase">
                     <ArrowUpRight size={14} /> +12%
                  </div>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Omzet Kotor ({filter})</p>
               <h2 className="text-3xl font-black text-neutral-900 tracking-tighter">{activeData.omzet}</h2>
            </div>

            <div className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all"></div>
               <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-lg shadow-amber-200">
                     <Lock size={28} />
                  </div>
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-[6px] uppercase">Dana Escrow</span>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Dana Tertahan</p>
               <h2 className="text-3xl font-black text-neutral-900 tracking-tighter">{activeData.locked}</h2>
            </div>

            <div className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
               <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-indigo-500 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-indigo-200">
                     <Award size={28} />
                  </div>
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-[6px] uppercase">Paling Cuan</span>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Komoditas Terlaris</p>
               <h2 className="text-2xl font-black text-neutral-900 uppercase leading-tight">{activeData.top}</h2>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 2. Grafik Analisis Penjualan */}
            <div className="lg:col-span-2 bg-white rounded-[6px] border border-gray-100 shadow-xl flex flex-col pt-8">
               <div className="px-10 mb-8 flex items-center justify-between">
                  <div>
                     <h3 className="text-xl font-black text-neutral-900 uppercase">Performa Penjualan</h3>
                     <p className="text-xs text-gray-500 font-medium">Bandingkan pendapatan Anda dengan harga rata-rata market.</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                     <span className="text-[10px] font-black text-gray-400 uppercase">AgriConnect</span>
                     <div className="w-3 h-3 bg-red-400 rounded-full ml-2"></div>
                     <span className="text-[10px] font-black text-gray-400 uppercase">Market</span>
                  </div>
               </div>

               <div className="h-[350px] w-full px-4 pb-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={activeData.sales} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                           dataKey="day"
                           axisLine={false}
                           tickLine={false}
                           tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }}
                           dy={10}
                        />
                        <YAxis
                           axisLine={false}
                           tickLine={false}
                           tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                           tickFormatter={(v) => `Rp${v / 1000}k`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

                        <ReferenceLine
                           y={activeData.market}
                           stroke="#f87171"
                           strokeDasharray="8 8"
                           strokeWidth={2}
                           label={{ position: 'right', value: 'Avg Market', fill: '#f87171', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}
                        />

                        <Bar dataKey="sales" radius={[4, 4, 4, 4]} barSize={24}>
                           {activeData.sales.map((entry, index) => (
                              <Cell
                                 key={`cell-${index}`}
                                 fill={entry.sales >= activeData.market ? '#10b981' : '#d1fae5'}
                                 className="hover:fill-emerald-600 transition-all duration-300"
                              />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* 3. Insight AI (AgriBot) */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[6px] p-10 text-white shadow-2xl relative overflow-hidden group border-4 border-amber-400/20">
               <div className="absolute right-[-20%] top-[-10%] w-64 h-64 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all"></div>

               <div className="flex items-center justify-between mb-10 w-full relative z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-2xl relative group-hover:scale-110 transition-transform">
                        <Bot size={28} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-900 animate-pulse"></div>
                     </div>
                     <div>
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-amber-400 mb-0.5">AgriBot Insight</h3>
                        <p className="text-xl font-black uppercase leading-tight">Analisis Baru</p>
                     </div>
                  </div>
                  <button
                     onClick={handleRefreshInsight}
                     disabled={isRefreshingInsight}
                     className="p-3 bg-white/5 hover:bg-white/10 rounded-[6px] text-amber-400 shadow-xl transition-all active:scale-90 disabled:opacity-50"
                  >
                     <RefreshCcw size={18} className={isRefreshingInsight ? 'animate-spin text-white' : ''} />
                  </button>
               </div>

               <div className={`space-y-8 relative z-10 transition-all duration-500 ${isRefreshingInsight ? 'blur-md opacity-50 scale-95 pointer-events-none' : 'blur-0 opacity-100 scale-100'}`}>
                  <div className="space-y-3">
                     <div className="flex items-center gap-3 text-emerald-400">
                        <TrendingUp size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Prediksi Tren</span>
                     </div>
                     <p className="text-sm font-medium text-gray-300 leading-relaxed">
                        Pencarian <span className="text-white font-black">"{filter === 'Hari Ini' ? 'Tomat Ceri' : 'Cabai Rawit'}"</span> naik tajam pagi ini. Saran: Sesuaikan harga untuk slot pre-order besok.
                     </p>
                  </div>

                  <div className="space-y-3">
                     <div className="flex items-center gap-3 text-red-400">
                        <AlertTriangle size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Efisiensi Biaya</span>
                     </div>
                     <p className="text-sm font-medium text-gray-300 leading-relaxed">
                        Biaya logistik di wilayah Anda naik 5%. Pertimbangkan penggunaan <span className="text-white font-black">Kurir Rekanan AgriConnect</span> untuk menghemat Rp 50.000/minggu.
                     </p>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                     <div className="flex items-center gap-3 text-amber-400 mb-3">
                        <Award size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Pencapaian</span>
                     </div>
                     <p className="text-lg font-black text-white italic leading-tight">
                        "Pertahankan kualitas, rating toko Anda naik menjadi 4.9 bintang!"
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* 4. Rincian Laporan Keuangan */}
         <section className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="p-10 flex-1 border-b md:border-b-0 md:border-r border-gray-100">
               <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                     <History className="text-neutral-900" size={24} />
                     <h3 className="text-xl font-black text-neutral-900 uppercase">Aktivitas Terakhir</h3>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-neutral-900 transition-colors uppercase tracking-widest">
                     Lihat Semua <ChevronRight size={14} />
                  </button>
               </div>

               <div className="space-y-4">
                  {TRANSACTIONS.map(tx => (
                     <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50/50 rounded-[6px] border border-transparent hover:border-gray-100 hover:bg-white transition-all group">
                        <div className="flex items-center gap-5">
                           <div className={`w-12 h-12 rounded-[6px] flex items-center justify-center shrink-0 shadow-sm ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' :
                              tx.type === 'fee' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                              }`}>
                              {tx.type === 'income' ? <ArrowUpRight size={20} /> : tx.type === 'fee' ? <Zap size={20} /> : <Wallet size={20} />}
                           </div>
                           <div>
                              <p className="text-sm font-black text-neutral-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{tx.desc}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{tx.date} • {tx.id}</p>
                           </div>
                        </div>
                        <div className="mt-4 sm:mt-0 text-right">
                           <p className={`text-lg font-black tracking-tight ${tx.amount > 0 ? 'text-emerald-600' : 'text-neutral-900'}`}>
                              {tx.amount > 0 ? '+' : ''} Rp {tx.amount.toLocaleString('id-ID')}
                           </p>
                           <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-[6px] border ${tx.status === 'Berhasil' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                              }`}>
                              {tx.status}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Withdrawal Sidebar */}
            <div className="p-10 md:w-[400px] bg-gray-50/50 flex flex-col justify-between space-y-10">
               <div>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                        <Wallet size={20} />
                     </div>
                     <h4 className="font-black text-neutral-900 uppercase text-xs tracking-widest">Dompet AgriConnect</h4>
                  </div>
                  <div className="space-y-1">
                     <p className="text-xs font-bold text-gray-400 italic">Saldo Siap Tarik</p>
                     <h3 className="text-4xl font-black text-neutral-900 tracking-tighter">Rp 12.450.000</h3>
                  </div>

                  <div className="mt-10 space-y-4">
                     <button
                        onClick={() => {
                           setWithdrawStep(1);
                           setShowWithdrawModal(true);
                        }}
                        className="w-full bg-neutral-900 hover:bg-black text-white py-5 rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                     >
                        Tarik Saldo Sekarang <Download size={18} />
                     </button>
                     <button className="w-full bg-white border border-gray-200 hover:border-amber-400 text-gray-600 py-4 rounded-[6px] font-black uppercase text-[10px] tracking-widest transition-all shadow-sm">
                        Ubah Rekening Bank
                     </button>
                  </div>
               </div>

               {/* 5. Cetak Laporan Keuangan */}
               <div className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-amber-400/10 transition-all"></div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                     <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-[6px] flex items-center justify-center shadow-sm">
                        <FileText size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-black text-neutral-900 uppercase tracking-tight">Laporan Bulanan</p>
                        <p className="text-[10px] font-bold text-gray-400 italic">Export Transaksi Pajak & KUR</p>
                     </div>
                  </div>
                  <button
                     onClick={handleDownloadReport}
                     disabled={isDownloading}
                     className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 py-3 rounded-[6px] font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                     {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={14} />}
                     {isDownloading ? 'Mengekspor...' : 'Unduh Laporan (PDF)'}
                  </button>
               </div>
            </div>
         </section>

         {/* --- MODALS --- */}

         {/* SECURE WITHDRAWAL MODAL */}
         {showWithdrawModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => withdrawStep !== 2 && setShowWithdrawModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">

                  {withdrawStep !== 3 && (
                     <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-xl">
                              <Wallet size={24} />
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Tarik Dana</h3>
                              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Saldo: Rp 12.450.000</p>
                           </div>
                        </div>
                        <button onClick={() => setShowWithdrawModal(false)} className="p-2 hover:bg-white rounded-[6px] text-gray-400 transition-colors">
                           <X size={24} />
                        </button>
                     </div>
                  )}

                  <div className="p-10">
                     {withdrawStep === 1 && (
                        <div className="space-y-8">
                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                 Nominal Penarikan
                              </label>

                              <div className="flex items-center bg-gray-50 border border-gray-100 rounded-[6px] overflow-hidden focus-within:ring-4 focus-within:ring-neutral-100 transition-all">

                                 {/* Prefix Rp */}
                                 <div className="px-6 py-8 text-2xl font-black text-neutral-300 border-r border-gray-200">
                                    Rp
                                 </div>

                                 {/* Input */}
                                 <input
                                    type="text"
                                    value={parseInt(withdrawAmount || 0).toLocaleString('id-ID')}
                                    onChange={(e) => setWithdrawAmount(e.target.value.replace(/\D/g, ''))}
                                    className="w-full px-6 py-8 bg-transparent text-4xl font-black text-neutral-900 outline-none tracking-tighter"
                                 />

                              </div>
                           </div>

                           <div className="bg-amber-50 p-6 rounded-[6px] border border-amber-100 flex items-start gap-4">
                              <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={20} />
                              <div>
                                 <p className="text-xs font-black text-amber-900 uppercase tracking-tight">Ketentuan Penarikan</p>
                                 <ul className="text-[10px] text-amber-700 font-medium space-y-1 mt-1 list-disc pl-4">
                                    <li>Penarikan maksimal 1x 24 jam.</li>
                                    <li>Estimasi dana masuk 5-15 menit (Real-time).</li>
                                    <li>Pastikan nomor rekening aktif.</li>
                                 </ul>
                              </div>
                           </div>

                           <button
                              onClick={handleWithdraw}
                              className="w-full bg-neutral-900 text-white py-6 rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl transition-all hover:bg-black active:scale-95"
                           >
                              Lanjut Ke Keamanan
                           </button>
                        </div>
                     )}

                     {withdrawStep === 2 && (
                        <div className="text-center space-y-10 py-10">
                           <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-sm relative">
                              <ShieldCheck size={48} />
                              <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
                           </div>
                           <div className="space-y-2">
                              <h4 className="text-xl font-black text-neutral-900 uppercase tracking-tighter">Masukkan PIN Transaksi</h4>
                              <p className="text-sm text-gray-400 font-medium">Harap masukkan 6 digit PIN untuk otorisasi keamanan.</p>
                           </div>
                           <div className="flex justify-center gap-3">
                              {[1, 2, 3, 4, 5, 6].map(i => (
                                 <div key={i} className="w-12 h-16 bg-gray-50 border-2 border-gray-100 rounded-[6px] flex items-center justify-center font-black text-2xl text-neutral-400">
                                    •
                                 </div>
                              ))}
                           </div>
                           <button
                              onClick={handleWithdraw}
                              className="w-full bg-neutral-900 text-white py-6 rounded-[6px] font-black uppercase text-xs tracking-widest"
                           >
                              Verifikasi & Konfirmasi
                           </button>
                        </div>
                     )}

                     {withdrawStep === 3 && (
                        <div className="text-center space-y-8 py-10 animate-in zoom-in duration-500">
                           <div className="w-32 h-32 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
                              <CheckCircle2 size={64} />
                           </div>
                           <div className="space-y-2">
                              <h3 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">Berhasil!</h3>
                              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                 Dana sebesar <span className="font-black text-neutral-900 underline">Rp {parseInt(withdrawAmount).toLocaleString('id-ID')}</span> sedang diproses ke rekening Anda.
                              </p>
                           </div>
                           <div className="bg-gray-50 p-6 rounded-[6px] border border-gray-100 flex items-center justify-center gap-3 group">
                              <History size={18} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                              <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">ID Transaksi: AgriWithdraw-20260323</span>
                           </div>
                           <button
                              onClick={() => setShowWithdrawModal(false)}
                              className="w-full py-6 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl"
                           >
                              Kembali Ke Dashboard
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default FarmerAnalytics;
