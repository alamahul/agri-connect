import React, { useState, useEffect } from 'react';
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
   Activity,
   CheckCircle2,
   Clock,
   Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const AdminAnalytics = () => {
   const [timeRange, setTimeRange] = useState('Tahun Berjalan');
   const [region, setRegion] = useState('Semua Wilayah');
   const [isExporting, setIsExporting] = useState(false);
   const [exportProgress, setExportProgress] = useState(0);
   const [toast, setToast] = useState(null);

   // DYNAMIC DATA GENERATION SIMULATION
   const [impactData, setImpactData] = useState([
      { name: 'Jan', middleman: 12000, agrico: 18500 },
      { name: 'Feb', middleman: 11500, agrico: 19200 },
      { name: 'Mar', middleman: 12500, agrico: 21000 },
      { name: 'Apr', middleman: 13000, agrico: 22800 },
      { name: 'Mei', middleman: 12200, agrico: 24500 },
      { name: 'Jun', middleman: 13500, agrico: 27000 },
   ]);

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
         value: region === 'Jawa Barat' ? 'Rp 2.150.000.000' : 'Rp 5.230.000.000',
         prev: '+32.5%',
         icon: <DollarSign size={24} />,
         color: 'bg-neutral-900',
         sub: 'Total transaksi bruto bulan ini'
      },
      {
         label: 'Platform Revenue (Take Rate)',
         value: region === 'Jawa Barat' ? 'Rp 43.000.000' : 'Rp 104.600.000',
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

   const showNotification = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
   };

   // REAL EXCEL EXPORT FUNCTION
   const exportToExcel = () => {
      setIsExporting(true);
      setExportProgress(20);

      setTimeout(() => {
         setExportProgress(60);
         const ws = XLSX.utils.json_to_sheet(marketDemand);
         const wb = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(wb, ws, "Market Intel");
         
         setExportProgress(90);
         setTimeout(() => {
            XLSX.writeFile(wb, `AgriConnect_MarketIntel_${region.replace(/\s/g, '_')}.xlsx`);
            setIsExporting(false);
            setExportProgress(100);
            showNotification("Dataset Excel Berhasil Diunduh!");
         }, 500);
      }, 800);
   };

   // REAL PDF EXPORT FUNCTION
   const exportToPDF = () => {
      setIsExporting(true);
      setExportProgress(20);

      setTimeout(() => {
         setExportProgress(50);
         const doc = new jsPDF();
         
         // Add Title
         doc.setFontSize(22);
         doc.text('AGRICONNECT INVESTOR REPORT', 20, 20);
         doc.setFontSize(10);
         doc.text(`Wilayah: ${region} | Periode: ${timeRange}`, 20, 30);
         doc.text(`Tanggal Cetak: ${new Date().toLocaleString()}`, 20, 35);
         
         // Add Financial Data
         doc.setFontSize(14);
         doc.text('IKHTISAR KEUANGAN', 20, 50);
         const financeData = financialStats.map(stat => [stat.label, stat.value]);
         autoTable(doc, {
            startY: 55,
            head: [['Metrik', 'Nilai']],
            body: financeData,
            theme: 'striped',
         });

         setExportProgress(80);

         // Add Market Intel
         doc.text('INTELIJEN PASAR (GAP SUPPLY/DEMAND)', 20, doc.lastAutoTable.finalY + 15);
         const tableData = marketDemand.map(item => [item.name, `${item.sales} Kg`, `${item.demand} Searches`, `+${item.gap} Kg`]);
         autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 20,
            head: [['Komoditas', 'Penjualan', 'Permintaan', 'Gap']],
            body: tableData,
         });

         setExportProgress(100);
         setTimeout(() => {
            doc.save(`AgriConnect_InvestorReport_${region.replace(/\s/g, '_')}.pdf`);
            setIsExporting(false);
            showNotification("Investor PDF Berhasil Diunduh!");
         }, 500);
      }, 1000);
   };

   const handleExecuteStrategy = () => {
      showNotification("Strategi AI: Broadcast Edukasi dikirim ke 1,240 Petani!");
   };

   // Effect to simulate data change on region/time change
   useEffect(() => {
      const multiplier = region === 'Semua Wilayah' ? 1 : 0.6;
      setImpactData(prev => prev.map(d => ({
         ...d,
         agrico: Math.floor(d.agrico * (0.9 + Math.random() * 0.2) * multiplier),
         middleman: Math.floor(d.middleman * (0.9 + Math.random() * 0.2) * multiplier)
      })));
   }, [region, timeRange]);

   return (
      <div className="space-y-10 pb-32 animate-in fade-in duration-500 relative">

         {/* Toast Notification */}
         {toast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 border-2 border-amber-400 text-white px-8 py-4 rounded-[6px] shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-10">
               <ShieldCheck className="text-amber-400" size={24} />
               <p className="text-xs font-black uppercase tracking-widest">{toast}</p>
            </div>
         )}

         {/* EXPORT MODAL/OVERLAY */}
         {isExporting && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-neutral-950/60 backdrop-blur-md">
               <div className="bg-white p-12 rounded-[6px] shadow-2xl w-full max-w-md text-center space-y-8 animate-in zoom-in-95">
                  <div className="w-20 h-20 bg-gray-100 text-neutral-900 rounded-[6px] flex items-center justify-center mx-auto relative overflow-hidden">
                     <Loader2 size={32} className="animate-spin" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Generating Report</h3>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-3">Compiling Institutional Data...</p>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-neutral-900 transition-all duration-300" style={{ width: `${exportProgress}%` }}></div>
                  </div>
                  <p className="text-[10px] font-black text-neutral-900">{exportProgress}% Complete</p>
               </div>
            </div>
         )}

         {/* 1. HEADER & EXPORT CENTER */}
         <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-neutral-200 shrink-0 group hover:rotate-12 transition-transform">
                  <BarChart3 size={32} />
               </div>
               <div>
                  <h1 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Intelligence Dashboard</h1>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 italic">Institutional Grade Reporting & Analytics • {region}</p>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
               <div className="flex gap-2 bg-gray-50 p-2 rounded-[6px] border border-gray-100 shadow-inner w-full md:w-auto">
                  <div className="relative flex-1 md:flex-none">
                     <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="w-full pl-6 pr-10 py-3 bg-transparent text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
                     >
                        <option>Harian</option>
                        <option>Mingguan</option>
                        <option>Kuartal 1</option>
                        <option>Tahun Berjalan</option>
                     </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                  </div>
                  <div className="w-px h-6 bg-gray-200 my-auto"></div>
                  <div className="relative flex-1 md:flex-none">
                     <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full pl-6 pr-10 py-3 bg-transparent text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer"
                     >
                        <option>Semua Wilayah</option>
                        <option>Jawa Barat</option>
                        <option>Jawa Tengah</option>
                        <option>Bali</option>
                     </select>
                     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                  </div>
               </div>

               <div className="flex gap-3 w-full md:w-auto">
                  <button onClick={exportToPDF} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border border-gray-200 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm">
                     <FileText size={16} /> Investor PDF
                  </button>
                  <button onClick={exportToExcel} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                     <DownloadCloud size={16} /> Ekspor Data
                  </button>
               </div>
            </div>
         </section>

         {/* 2. FINANCIAL KPI CARDS */}
         <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financialStats.map((stat, i) => (
               <div key={i} className={`p-8 rounded-[6px] border border-gray-100 shadow-xl relative overflow-hidden group transition-all hover:-translate-y-2 ${stat.color.includes('neutral') ? 'bg-neutral-900 text-white' : stat.color.includes('emerald') ? 'bg-emerald-600 text-white' : 'bg-amber-400 text-neutral-900'}`}>
                  <div className="relative z-10">
                     <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-[6px] shadow-lg">{stat.icon}</div>
                        <span className="flex items-center gap-1 text-[10px] font-black px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">
                           <ArrowUpRight size={12} /> {stat.prev}
                        </span>
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">{stat.label}</p>
                     <h3 className="text-3xl font-black tracking-tighter mt-2 group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                     <p className="text-[9px] font-bold uppercase mt-4 opacity-50 italic">{stat.sub}</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                     {stat.icon}
                  </div>
               </div>
            ))}
         </section>

         {/* 3. SOCIAL IMPACT SESSION */}
         <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[6px] border border-gray-100 shadow-2xl space-y-8 animate-in slide-in-from-left duration-700">
               <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                     <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic flex items-center gap-3">
                        Kesejahteraan Petani <Heart size={18} fill="#ef4444" className="text-red-500" />
                     </h3>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 italic">Net Income Comparison (Farmer per Harvest)</p>
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
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }} />
                        <YAxis hide />
                        <Tooltip
                           contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '15px' }}
                           itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                        />
                        <Area type="monotone" dataKey="agrico" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorAgri)" animationDuration={1500} />
                        <Area type="monotone" dataKey="middleman" stroke="#f87171" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>

               <div className="p-6 bg-emerald-50 rounded-[6px] border border-emerald-100 flex items-center gap-6">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-[6px] flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
                     <TrendingUp size={28} />
                  </div>
                  <p className="text-[11px] font-black text-emerald-900 uppercase leading-snug tracking-tighter italic">
                     Petani mitra mendapatkan <span className="text-xl underline decoration-emerald-300 underline-offset-4">+40%</span> margin lebih bersih di {region} berkat efisiensi logistik.
                  </p>
               </div>
            </div>

            <div className="bg-[#fdfcf9] p-10 rounded-[6px] border border-gray-100 shadow-2xl space-y-8 animate-in slide-in-from-right duration-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                  <Leaf size={180} />
               </div>
               <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div>
                     <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Pencegahan Food Loss</h3>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 italic whitespace-nowrap">Zero Waste Agricultural Mission (Impact Map)</p>
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
                              animationDuration={1500}
                           >
                              {foodLossData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                              ))}
                           </Pie>
                           <Tooltip />
                        </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-4xl font-black text-neutral-900 italic tracking-tighter leading-none">{region === 'Jawa Barat' ? '650' : '1,500'}</p>
                        <p className="text-[10px] font-black uppercase text-emerald-600 mt-1">KG SAVED</p>
                     </div>
                  </div>

                  <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed max-w-sm italic">
                     Berkat fitur <span className="text-neutral-900 font-black underline decoration-amber-400 underline-offset-4">Panen Besok (Pre-Order)</span>, hasil bumi dipanen hanya ketika pembeli sudah terkonfirmasi.
                  </p>

                  <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="p-5 bg-white rounded-[6px] border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                        <p className="text-xl font-black text-neutral-900">Rp {region === 'Jawa Barat' ? '18' : '45'}jt+</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase mt-1 italic">Value Preserved</p>
                     </div>
                     <div className="p-5 bg-white rounded-[6px] border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                        <p className="text-xl font-black text-neutral-900">{region === 'Jawa Barat' ? '120' : '320'} Ha</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase mt-1 italic">Efficiency Area</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 4. MARKET INTELLIGENCE & AI INSIGHTS */}
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-[6px] border border-gray-100 shadow-2xl p-6 lg:p-10 space-y-8 animate-in slide-in-from-bottom-5 duration-700">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                     <Globe size={24} />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Market Intelligence</h3>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Supply vs Demand Mapping ({region})</p>
                  </div>
               </div>

               <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left min-w-[600px]">
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
                                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                       <div className="h-full bg-neutral-900 rounded-full transition-all duration-1000" style={{ width: `${(item.sales / item.demand) * 100}%` }}></div>
                                    </div>
                                    <span className="text-[10px] font-black">{item.sales} Kg</span>
                                 </div>
                              </td>
                              <td className="py-6">
                                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{item.demand} Searches</span>
                              </td>
                              <td className="py-6 text-right">
                                 <span className={`px-4 py-2 rounded-[6px] text-[9px] font-black uppercase tracking-widest ${item.gap > 500 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {item.gap > 0 ? `+${item.gap} Kg` : 'Full Filled'}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            <div className="bg-neutral-900 p-8 lg:p-10 rounded-[6px] shadow-2xl relative overflow-hidden group">
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

                     <div className="p-6 bg-white/5 backdrop-blur-md rounded-[6px] border border-white/10 space-y-4 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-2 text-emerald-400">
                           <Activity size={12} className="animate-pulse" />
                           <span className="text-[8px] font-black uppercase tracking-widest italic leading-none">Trend Prediction</span>
                        </div>
                        <p className="text-base font-bold text-gray-200 uppercase leading-relaxed tracking-tight italic">
                           "Tren pencarian sayur organik naik <span className="text-emerald-400">+50%</span> di area {region === 'Semua Wilayah' ? 'Jabodetabek' : region}."
                        </p>
                        <div className="pt-4 border-t border-white/10">
                           <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed italic">
                              Rekomendasi: Kirim broadcast "Edukasi Tanam Organik" ke petani mitra di {region === 'Semua Wilayah' ? 'Jawa Barat & Bali' : region}.
                           </p>
                        </div>
                     </div>
                  </div>

                  <button 
                     onClick={handleExecuteStrategy}
                     className="w-full py-6 bg-amber-400 text-neutral-900 rounded-[6px] text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-white hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                  >
                     Eksekusi Strategi <ArrowRight size={18} />
                  </button>
               </div>
            </div>
         </section>

      </div>
   );
};

export default AdminAnalytics;
