import React, { useState } from 'react';
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
  Clock
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell
} from 'recharts';

const SALES_DATA = [
  { day: 'Sen', sales: 450000, market: 350000 },
  { day: 'Sel', sales: 520000, market: 350000 },
  { day: 'Rab', sales: 680000, market: 350000 },
  { day: 'Kam', sales: 410000, market: 350000 },
  { day: 'Jum', sales: 590000, market: 350000 },
  { day: 'Sab', sales: 880000, market: 350000 },
  { day: 'Min', sales: 950000, market: 350000 },
];

const TRANSACTIONS = [
  { id: 'TX-001', date: '23 Mar 2026', desc: 'Pencairan Dana Escrow (INV-20260323-001)', amount: 150000, status: 'Berhasil', type: 'income' },
  { id: 'TX-002', date: '23 Mar 2026', desc: 'Biaya Layanan AgriConnect (2%)', amount: -3000, status: 'Dipotong', type: 'fee' },
  { id: 'TX-003', date: '22 Mar 2026', desc: 'Pencairan Dana Escrow (INV-20260322-044)', amount: 1250000, status: 'Berhasil', type: 'income' },
  { id: 'TX-004', date: '21 Mar 2026', desc: 'Penarikan Saldo ke BRI (Siti Aminah)', amount: -5000000, status: 'Berhasil', type: 'withdraw' },
];

const FarmerAnalytics = () => {
  const [filter, setFilter] = useState('Minggu Ini');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 text-white p-4 rounded-[6px] shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{label}, 25 Maret</p>
          <div className="space-y-1">
             <p className="text-sm font-black">Pendapatan: <span className="text-emerald-400">Rp {payload[0].value.toLocaleString('id-ID')}</span></p>
             <p className="text-[10px] font-bold text-gray-400 italic">"Laku 50 Kg Jagung Manis"</p>
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
            <h2 className="text-3xl font-black text-neutral-900 tracking-tighter">Rp 3.500.000</h2>
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
            <h2 className="text-3xl font-black text-neutral-900 tracking-tighter">Rp 500.000</h2>
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
            <h2 className="text-2xl font-black text-neutral-900 uppercase leading-tight">Tomat Ceri <span className="text-sm font-bold text-gray-400">(120 Kg)</span></h2>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* 2. Grafik Analisis Penjualan */}
         <div className="lg:col-span-2 bg-white rounded-[6px] border border-gray-100 shadow-xl flex flex-col pt-8">
            <div className="px-10 mb-8 flex items-center justify-between">
               <div>
                  <h3 className="text-xl font-black text-neutral-900 uppercase">Performa Penjualan Harian</h3>
                  <p className="text-xs text-gray-500 font-medium">Bandingkan pendapatan Anda dengan harga rata-rata tengkulak.</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase">AgriConnect</span>
                  <div className="w-3 h-3 bg-red-400 rounded-full ml-2"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase">Tengkulak</span>
               </div>
            </div>
            
            <div className="h-[350px] w-full px-4 pb-4">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SALES_DATA} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
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
                        tickFormatter={(v) => `Rp${v/1000}k`}
                     />
                     <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                     
                     {/* Reference Line for Middleman Price */}
                     <ReferenceLine 
                        y={350000} 
                        stroke="#f87171" 
                        strokeDasharray="8 8" 
                        strokeWidth={2}
                        label={{ position: 'right', value: 'Rata-rata Tengkulak', fill: '#f87171', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}
                     />

                     <Bar dataKey="sales" radius={[12, 12, 12, 12]} barSize={24}>
                        {SALES_DATA.map((entry, index) => (
                           <Cell 
                             key={`cell-${index}`} 
                             fill={entry.sales >= 600000 ? '#10b981' : '#d1fae5'} 
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
            
            <div className="flex items-center gap-6 mb-10">
               <div className="w-16 h-16 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-2xl shadow-amber-400/40 relative">
                  <Bot size={32} />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-neutral-900 animate-pulse"></div>
               </div>
               <div>
                  <h3 className="text-xl font-black uppercase leading-tight">AgriBot Insight</h3>
                  <p className="text-amber-400 text-[10px] font-black uppercase tracking-widest">Analisis Cerdas Minggu Ini</p>
               </div>
            </div>

            <div className="space-y-8 relative z-10">
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-emerald-400">
                     <TrendingUp size={18} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Prediksi Tren</span>
                  </div>
                  <p className="text-sm font-medium text-gray-300 leading-relaxed">
                     Pencarian <span className="text-white font-black">"Cabai Rawit"</span> naik 40%. Cuaca diprediksi hujan lebat. Saran: Buka slot "Panen Besok" sekarang.
                  </p>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-red-400">
                     <AlertTriangle size={18} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Peringatan Performa</span>
                  </div>
                  <p className="text-sm font-medium text-gray-300 leading-relaxed">
                     2 pesanan Kangkung batal karena pengiriman telat. Saran: Panen dilakukan <span className="text-white font-black">Pagi Hari</span> sebelum jam 10.
                  </p>
               </div>

               <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 text-amber-400 mb-3">
                     <Star size={18} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Apresiasi Anda</span>
                  </div>
                  <p className="text-lg font-black text-white italic leading-tight">
                     "Selamat! Anda menyelamatkan 200 Kg sayur bulan ini."
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* 4. Rincian Laporan Keuangan */}
      <section className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden flex flex-col md:flex-row">
         <div className="p-10 flex-1 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-black text-neutral-900 uppercase">Riwayat Pencairan Escrow</h3>
               <button className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-neutral-900 transition-colors uppercase tracking-widest">
                  Lihat Semua <ChevronRight size={14} />
               </button>
            </div>

            <div className="space-y-4">
               {TRANSACTIONS.map(tx => (
                  <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50/50 rounded-[6px] border border-transparent hover:border-gray-100 hover:bg-white transition-all group">
                     <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-[6px] flex items-center justify-center shrink-0 shadow-sm ${
                           tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 
                           tx.type === 'fee' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                        }`}>
                           {tx.type === 'income' ? <ArrowUpRight size={20} /> : tx.type === 'fee' ? <Zap size={20} /> : <Wallet size={20} />}
                        </div>
                        <div>
                           <p className="text-sm font-black text-neutral-900 group-hover:text-emerald-700 transition-colors">{tx.desc}</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{tx.date} • {tx.id}</p>
                        </div>
                     </div>
                     <div className="mt-4 sm:mt-0 text-right">
                        <p className={`text-lg font-black tracking-tight ${tx.amount > 0 ? 'text-emerald-600' : 'text-neutral-900'}`}>
                           {tx.amount > 0 ? '+' : ''} Rp {tx.amount.toLocaleString('id-ID')}
                        </p>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-[6px] border ${
                           tx.status === 'Berhasil' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
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
                  <div className="w-10 h-10 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center">
                     <Wallet size={20} />
                  </div>
                  <h4 className="font-black text-neutral-900 uppercase text-xs tracking-widest">Dompet AgriConnect</h4>
               </div>
               <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 italic">Saldo Siap Tarik</p>
                  <h3 className="text-4xl font-black text-neutral-900 tracking-tighter">Rp 12.450.000</h3>
               </div>
               
               <div className="mt-10 space-y-4">
                  <button className="w-full bg-neutral-900 hover:bg-black text-white py-5 rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
                     Tarik Saldo Sekarang <Download size={18} />
                  </button>
                  <button className="w-full bg-white border border-gray-200 hover:border-amber-400 text-gray-600 py-4 rounded-[6px] font-black uppercase text-[10px] tracking-widest transition-all shadow-sm">
                     Ubah Rekening Bank
                  </button>
               </div>
            </div>

            {/* 5. Cetak Laporan Keuangan */}
            <div className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl relative group">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-[6px] flex items-center justify-center">
                     <FileText size={24} />
                  </div>
                  <div>
                     <p className="text-xs font-black text-neutral-900 uppercase">Laporan Bulanan</p>
                     <p className="text-[10px] font-bold text-gray-400 italic">Klik untuk Pengajuan KUR Bank</p>
                  </div>
               </div>
               <button className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 py-3 rounded-[6px] font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2">
                  <Download size={14} /> Unduh Laporan (PDF)
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default FarmerAnalytics;





