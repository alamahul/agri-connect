import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Filter, 
  Calendar, 
  Globe, 
  DownloadCloud, 
  FileText, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  Heart, 
  Leaf, 
  Bot, 
  Sparkles, 
  ArrowRight,
  History,
  Info,
  ChevronDown,
  BarChart3,
  Activity
} from 'lucide-react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('Tahun Berjalan');
  const [region, setRegion] = useState('Semua Wilayah');

  // MOCK DATA for Social Impact
  const impactData = [
    { name: 'Jan', middleman: 12000, agrico: 18500 },
    { name: 'Feb', middleman: 11500, agrico: 19200 },
    { name: 'Mar', middleman: 12500, agrico: 21000 },
    { name: 'Apr', middleman: 13000, agrico: 22800 },
    { name: 'Mei', middleman: 12200, agrico: 24500 },
    { name: 'Jun', middleman: 13500, agrico: 27000 },
  ];

  const foodLossData = [
    { name: 'Terselamatkan (Pre-Order)', value: 1500, color: '#10b981' },
    { name: 'Potensi Food Loss', value: 450, color: '#e5e7eb' },
  ];

  const marketDemand = [
    { name: 'Tomat Ceri', sales: 500, demand: 550, gap: 50 },
    { name: 'Cabai Rawit', sales: 1200, demand: 1800, gap: 600 },
    { name: 'Kangkung Hidroponik', sales: 0, demand: 2000, gap: 2000 },
    { name: 'Beras Pandan Wangi', sales: 850, demand: 900, gap: 50 },
  ];

  const financialStats = [
    { 
      label: 'Gross Merchandise Value (GMV)', 
      value: 'Rp 5.230.000.000', 
      prev: '+32.5%', 
      icon: <DollarSign size={24} />, 
      color: 'bg-neutral-900', 
      sub: 'Total transaksi bruto bulan ini' 
    },
    { 
      label: 'Platform Revenue (Take Rate)', 
      value: 'Rp 104.600.000', 
      prev: '+18.2%', 
      icon: <Zap size={24} />, 
      color: 'bg-amber-400 text-neutral-900', 
      sub: 'Keuntungan bersih biaya layanan' 
    },
    { 
      label: 'Escrow Success Ratio', 
      value: '98.5%', 
      prev: '+1.2%', 
      icon: <ShieldCheck size={24} />, 
      color: 'bg-emerald-600', 
      sub: 'Rasio penyelesaian tanpa sengketa' 
    },
  ];

  return (
    <div className="space-y-10 pb-32 animate-in fade-in duration-500">
      
      {/* 1. HEADER & EXPORT CENTER */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-neutral-200">
            <BarChart3 size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Intelligence Dashboard</h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 italic">Institutional Grade Reporting & Analytics</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2 bg-gray-50 p-2 rounded-full border border-gray-100 shadow-inner">
             <div className="relative">
                <select 
                   value={timeRange} 
                   onChange={(e) => setTimeRange(e.target.value)}
                   className="pl-6 pr-10 py-3 bg-transparent text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
                >
                   <option>Harian</option>
                   <option>Mingguan</option>
                   <option>Kuartal 1</option>
                   <option>Tahun Berjalan</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
             </div>
             <div className="w-px h-6 bg-gray-200 my-auto"></div>
             <div className="relative">
                <select 
                   value={region} 
                   onChange={(e) => setRegion(e.target.value)}
                   className="pl-6 pr-10 py-3 bg-transparent text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
                >
                   <option>Semua Wilayah</option>
                   <option>Jawa Barat</option>
                   <option>Jawa Tengah</option>
                   <option>Bali</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
             </div>
          </div>
          
          <div className="flex gap-3">
             <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm">
                <FileText size={16} /> Investor PDF
             </button>
             <button className="flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                <DownloadCloud size={16} /> Ekspor Data
             </button>
          </div>
        </div>
      </section>

      {/* 2. FINANCIAL KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financialStats.map((stat, i) => (
          <div key={i} className={`p-8 rounded-[6px] border border-gray-100 shadow-xl relative overflow-hidden group ${stat.color.includes('neutral') ? 'bg-neutral-900 text-white' : stat.color.includes('emerald') ? 'bg-emerald-600 text-white' : 'bg-amber-400 text-neutral-900'}`}>
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-[6px]">{stat.icon}</div>
                  <span className="flex items-center gap-1 text-[10px] font-black px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">
                     <ArrowUpRight size={12} /> {stat.prev}
                  </span>
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">{stat.label}</p>
               <h3 className="text-2xl font-black tracking-tighter mt-2">{stat.value}</h3>
               <p className="text-[9px] font-bold uppercase mt-4 opacity-50">{stat.sub}</p>
            </div>
            {/* Background Texture */}
            <div className="absolute -right-4 -bottom-4 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-0 duration-700">
               {stat.icon}
            </div>
          </div>
        ))}
      </section>

      {/* 3. SOCIAL IMPACT SESSION (Wow Factor) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Farmer Welfare Chart */}
         <div className="bg-white p-10 rounded-[6px] border border-gray-100 shadow-2xl space-y-8 animate-in slide-in-from-left duration-700">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic flex items-center gap-3">
                     Kesejahteraan Petani <Heart size={18} fill="#ef4444" className="text-red-500" />
                  </h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 italic">Comparison of Net Income per Harvest (IDR)</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase text-emerald-500">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> AgriConnect
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase text-red-400">
                     <div className="w-2 h-2 bg-red-400 rounded-full"></div> Tengkulak
                  </div>
               </div>
            </div>

            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={impactData}>
                     <defs>
                        <linearGradient id="colorAgri" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }} />
                     <YAxis hide />
                     <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}
                     />
                     <Area type="monotone" dataKey="agrico" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorAgri)" />
                     <Area type="monotone" dataKey="middleman" stroke="#f87171" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            
            <div className="p-6 bg-emerald-50 rounded-[6px] border border-emerald-100 flex items-center gap-6">
               <div className="w-12 h-12 bg-emerald-500 text-white rounded-[6px] flex items-center justify-center shrink-0">
                  <TrendingUp size={24} />
               </div>
               <p className="text-[11px] font-black text-emerald-900 uppercase leading-snug tracking-tighter italic">
                  Petani AgriConnect mendapatkan <span className="text-xl underline decoration-emerald-300 underline-offset-4">+40%</span> pendapatan lebih tinggi dibandingkan tengkulak tradisional.
               </p>
            </div>
         </div>

         {/* Food Loss Prevention Meter */}
         <div className="bg-[#fdfcf9] p-10 rounded-[6px] border border-gray-100 shadow-2xl space-y-8 animate-in slide-in-from-right duration-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <Leaf size={180} />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
               <div>
                  <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Pencegahan Food Loss</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">Zero Waste Agricultural Mission</p>
               </div>

               <div className="w-full h-64 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={foodLossData}
                           cx="50%"
                           cy="50%"
                           innerRadius={65}
                           outerRadius={95}
                           paddingAngle={8}
                           dataKey="value"
                        >
                           {foodLossData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <p className="text-4xl font-black text-neutral-900 italic tracking-tighter">1,500 <span className="text-sm">KG</span></p>
                     <p className="text-[8px] font-black uppercase text-emerald-500 mt-1">Terselamatkan</p>
                  </div>
               </div>

               <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed max-w-sm">
                  Berkat fitur <span className="text-neutral-900 underline decoration-amber-400 underline-offset-4 leading-loose">Panen Besok (Pre-Order)</span>, kita telah mencegah sayuran membusuk di lahan sebelum terjual.
               </p>

               <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="p-5 bg-white rounded-[6px] border border-gray-100 shadow-sm">
                     <p className="text-xl font-black text-neutral-900">Rp 45jt+</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase mt-1">Nilai Ekonomi Diselamatkan</p>
                  </div>
                  <div className="p-5 bg-white rounded-[6px] border border-gray-100 shadow-sm">
                     <p className="text-xl font-black text-neutral-900">320 Ha</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase mt-1">Area Lahan Efisien</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. MARKET INTELLIGENCE & AI INSIGHTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Commodity Intel Table */}
         <div className="lg:col-span-2 bg-white rounded-[6px] border border-gray-100 shadow-2xl p-10 space-y-8 animate-in slide-in-from-bottom-5 duration-700">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center">
                  <Globe size={24} />
               </div>
               <div>
                  <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Market Intelligence</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Supply vs Demand Mapping Analysis</p>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-gray-50">
                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Komoditas</th>
                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Penjualan Aktif</th>
                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Volume Pencarian</th>
                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Potensi (Gap)</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {marketDemand.map((item, i) => (
                        <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                           <td className="py-6 pr-4">
                              <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{item.name}</p>
                           </td>
                           <td className="py-6">
                              <div className="flex items-center gap-2">
                                 <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-neutral-900 rounded-full" style={{ width: `${(item.sales/item.demand)*100}%` }}></div>
                                 </div>
                                 <span className="text-[10px] font-black">{item.sales} Kg</span>
                              </div>
                           </td>
                           <td className="py-6">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{item.demand} Searches</span>
                           </td>
                           <td className="py-6 text-right">
                              <span className={`px-4 py-1.5 rounded-[6px] text-[9px] font-black uppercase tracking-widest ${item.gap > 500 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                                 {item.gap > 0 ? `+${item.gap} Kg` : 'Full Filled'}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* AgriBot AI Suggestion Box */}
         <div className="bg-neutral-900 p-10 rounded-[6px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
               <Bot size={180} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-xl shadow-amber-400/20">
                        <Sparkles size={24} fill="white" />
                     </div>
                     <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none italic">AgriBot Insight</h3>
                  </div>
                  
                  <div className="p-6 bg-white/5 backdrop-blur-md rounded-[6px] border border-white/10 space-y-4">
                     <div className="flex items-center gap-2 text-emerald-400">
                        <Activity size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest italic leading-none">Trend Prediction</span>
                     </div>
                     <p className="text-sm font-bold text-gray-200 uppercase leading-relaxed tracking-tight italic">
                        "Tren pencarian sayur organik naik <span className="text-emerald-400">+50%</span> di area Jakarta Selatan."
                     </p>
                     <div className="pt-4 border-t border-white/10">
                        <p className="text-[9px] text-gray-400 font-bold uppercase leading-relaxed italic">
                           Rekomendasi: Kirim broadcast "Edukasi Tanam Organik" ke petani mitra di Bogor & Lembang.
                        </p>
                     </div>
                  </div>
               </div>

               <button className="w-full py-6 bg-amber-400 text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                  Eksekusi Strategi <ArrowRight size={16} />
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default AdminAnalytics;





