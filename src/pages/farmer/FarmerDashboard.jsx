import React, { useState } from 'react';
import {
   Sun,
   CloudSun,
   Volume2,
   Wallet,
   Clock,
   CheckCircle,
   ArrowUpRight,
   TrendingUp,
   TrendingDown,
   Star,
   MessageSquare,
   ChevronRight,
   Package,
   Calendar,
   AlertCircle,
   TrendingUpDown as TrendingIcon,
   Bot,
   X,
   ShieldCheck,
   CheckCircle2,
   ArrowRight,
   Mic,
   Banknote,
   Square,
   RotateCw,
   Sparkles
} from 'lucide-react';
import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   ReferenceArea
} from 'recharts';

const PRICE_HISTORY = [
   { day: 'Sen', market: 6000, agri: 12000 },
   { day: 'Sel', market: 5500, agri: 12500 },
   { day: 'Rab', market: 7000, agri: 12000 },
   { day: 'Kam', market: 5000, agri: 13000 },
   { day: 'Jum', market: 4500, agri: 12800 },
   { day: 'Sab', market: 5800, agri: 13500 },
   { day: 'Min', market: 5000, agri: 14000 },
];

const FarmerDashboard = () => {
   const [tasks, setTasks] = useState([
      { id: 1, text: "Kemas 5 Pesanan Tomat Ceri", type: "urgent", count: 5, icon: <Package size={20} /> },
      { id: 2, text: "Jadwal Panen Besok: 50 Kg Wortel", type: "preorder", icon: <Calendar size={20} /> },
      { id: 3, text: "Update Stok Cabai Rawit (Hampir Habis)", type: "stock", icon: <AlertCircle size={20} /> },
   ]);

   const [isSpeaking, setIsSpeaking] = useState(false);
   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
   const [showPriceUpdateModal, setShowPriceUpdateModal] = useState(false);
   const [isWithdrawing, setIsWithdrawing] = useState(false);
   const [currentAgriPrice, setCurrentAgriPrice] = useState(12000);
   const [withdrawStep, setWithdrawStep] = useState(1); // 1: Amount, 2: PIN/Security, 3: Success
   const [isAnalyzing, setIsAnalyzing] = useState(false);

   const handleSpeak = () => {
      if (isSpeaking) {
         window.speechSynthesis.cancel();
         setIsSpeaking(false);
         return;
      }

      if ('speechSynthesis' in window) {
         window.speechSynthesis.cancel();
         setIsSpeaking(true);
         
         const text = `
            Halo Pak Budi, berikut adalah laporan dashboard Anda hari ini. 
            Tugas hari ini: Anda memiliki ${tasks.length} tugas yang perlu diselesaikan segera, termasuk kemasan produk dan jadwal panen wortel. 
            Pantauan harga pasar: Harga tomat ceri Anda stabil di angka Rp ${currentAgriPrice.toLocaleString()} per kilogram, ini jauh lebih baik dibanding harga tengkulak. 
            Performa lahan: Lahan Anda mendapatkan nilai rata-rata 4,9 bintang dengan tingkat kesegaran panen mencapai 98 persen. 
            Notifikasi: Ada 2 pesanan baru yang baru saja masuk dan satu pemberitahuan pencairan dana yang berhasil. 
            Tetap semangat bertani bersama Agrikonek Pak Budi!
         `;
         
         const speech = new SpeechSynthesisUtterance(text);
         speech.lang = 'id-ID';
         speech.rate = 1;
         speech.onend = () => setIsSpeaking(false);
         window.speechSynthesis.speak(speech);
      } else {
         setIsSpeaking(true);
         setTimeout(() => setIsSpeaking(false), 3000);
      }
   };

   const completeTask = (id) => {
      setTasks(prev => prev.filter(t => t.id !== id));
   };

   return (
      <div className="space-y-8 pb-12 animate-in fade-in duration-500">

         {/* 1. Header & Voice Assistant */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
               <div className="w-16 h-16 bg-amber-400 rounded-[6px] flex items-center justify-center text-3xl shadow-xl shadow-amber-200 animate-bounce-slow">
                  ☀           </div>
               <div>
                  <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Selamat Pagi, <span className="text-neutral-900 uppercase">Pak Budi</span>!</h1>
                  <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
                     <CloudSun size={18} className="text-amber-500" /> Cuaca Lembang hari ini cerah (24°C), sangat cocok untuk panen.
                  </p>
               </div>
            </div>

            <button
               onClick={handleSpeak}
               className={`
            group flex items-center gap-4 px-8 py-4 rounded-[6px] font-black uppercase tracking-widest text-sm transition-all shadow-2xl
            ${isSpeaking ? 'bg-amber-400 text-neutral-800 scale-105' : 'bg-neutral-800 text-white hover:bg-black'}
          `}
            >
               <div className={`p-2 rounded-[6px] transition-colors ${isSpeaking ? 'bg-red-500 text-white' : 'bg-white/10'}`}>
                  {isSpeaking ? <Square size={24} fill="white" /> : <Volume2 size={24} />}
               </div>
               <div className="text-left leading-none">
                  <span className="block text-[10px] mb-1 opacity-60">AgriVoice</span>
                  {isSpeaking ? 'Hentikan Suara' : 'Dengar Ringkasan'}
               </div>
            </button>
         </div>

         {/* 2. Financial Cards (Escrow Vault) */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Green Card: Ready to Withdraw */}
            <div className="bg-emerald-600 rounded-[6px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-emerald-100">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                     <div className="p-4 bg-white/10 backdrop-blur-md rounded-[6px] border border-white/10">
                        <Wallet size={32} />
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] uppercase font-black tracking-widest text-emerald-100 mb-1">Saldo Siap Tarik</p>
                        <p className="text-4xl font-black tracking-tighter">Rp 2.450.000</p>
                     </div>
                  </div>
                  <div className="mt-12 flex items-center justify-between gap-4">
                     <button 
                        onClick={() => {
                           setWithdrawStep(1);
                           setShowWithdrawModal(true);
                        }}
                        className="flex-1 bg-white hover:bg-emerald-50 text-emerald-700 py-5 rounded-[6px] font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95"
                     >
                        Tarik Dana ke Rekening
                     </button>
                     <div className="w-14 h-14 bg-emerald-500/50 backdrop-blur-sm rounded-[6px] flex items-center justify-center border border-white/20">
                        <ArrowUpRight size={24} />
                     </div>
                  </div>
               </div>
            </div>

            {/* Yellow Card: Escrow Pending */}
            <div className="bg-amber-500 rounded-[6px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-amber-100">
               <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
               <div className="relative z-10">
                  <div className="flex justify-between items-center mb-10">
                     <div>
                        <p className="text-xs uppercase font-black tracking-widest text-amber-100 mb-1">Dana Diproses Escrow</p>
                        <p className="text-4xl font-black tracking-tighter">Rp 1.800.000</p>
                     </div>
                     <div className="p-4 bg-white/10 backdrop-blur-md rounded-[6px] border border-white/10">
                        <Clock size={32} className="animate-spin-slow" />
                     </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-[6px] border border-white/10">
                     <div className="flex items-start gap-4">
                        <CheckCircle size={20} className="text-white shrink-0 mt-0.5" />
                        <p className="text-xs font-bold leading-relaxed opacity-90">
                           Dana ini aman di brankas AgriConnect dan akan cair otomatis ke saldo Anda setelah pembeli menekan konfirmasi terima barang.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 3. Tugas Hari Ini (To-Do List) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">Tugas Hari Ini</h3>
                     <span className="bg-red-50 text-red-600 px-3 py-1 rounded-[6px] text-[10px] font-black uppercase tracking-widest animate-pulse border border-red-100">Action Required</span>
                  </div>

                  <div className="space-y-4 flex-1">
                     {tasks.length > 0 ? tasks.map(task => (
                        <div
                           key={task.id}
                           onClick={() => completeTask(task.id)}
                           className="group flex items-center justify-between p-5 bg-gray-50 hover:bg-neutral-900 hover:text-white rounded-[6px] cursor-pointer transition-all duration-300 animate-in slide-in-from-left-5"
                        >
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-[6px] flex items-center justify-center transition-colors ${task.type === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                 {task.icon}
                              </div>
                              <div>
                                 <p className="text-xs font-bold tracking-tight">{task.text}</p>
                                 {task.count && <p className="text-[10px] font-bold opacity-50 uppercase mt-0.5">Deadline: Sore ini</p>}
                              </div>
                           </div>
                           <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-amber-400 group-hover:bg-amber-400 flex items-center justify-center transition-all">
                              <CheckCircle size={14} className="text-white opacity-0 group-hover:opacity-100" />
                           </div>
                        </div>
                     )) : (
                        <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                           <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                              <CheckCircle size={32} />
                           </div>
                           <p className="text-sm font-bold text-gray-500">Semua tugas beres! Kerja bagus, Pak.</p>
                        </div>
                     )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <span>Progres Harian</span>
                     <span>{Math.round((3 - tasks.length) / 3 * 100)}% Selesai</span>
                  </div>
               </div>
            </div>

            {/* 4. Widget Pantauan Harga Pasar (Analytics) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
               <div className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl overflow-hidden relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                     <div>
                        <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tight">Pantauan Harga Pasar</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase mt-1">Komoditas: Tomat Ceri Premium</p>
                     </div>
                     <div className="flex gap-4">
                        <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Harga AgriConnect</p>
                        <p className="text-lg font-black text-emerald-600 tracking-tighter">Rp {currentAgriPrice.toLocaleString()}/Kg</p>
                        </div>
                        <div className="border-l border-gray-100 pl-4 text-right">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Harga Tengkulak</p>
                           <p className="text-lg font-black text-red-400 tracking-tighter line-through">Rp 5.000/Kg</p>
                        </div>
                     </div>
                  </div>

                  <div className="h-64 mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={PRICE_HISTORY}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                           <XAxis
                              dataKey="day"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fontWeight: 'bold', fill: '#aaa' }}
                           />
                           <YAxis hide />
                           <Tooltip
                              contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                              itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                           />
                           <Line
                              type="monotone"
                              dataKey="agri"
                              stroke="#059669"
                              strokeWidth={4}
                              dot={{ r: 6, fill: '#059669', strokeWidth: 2, stroke: '#fff' }}
                              activeDot={{ r: 8 }}
                           />
                           <Line
                              type="monotone"
                              dataKey="market"
                              stroke="#f87171"
                              strokeWidth={4}
                              strokeDasharray="5 5"
                              dot={false}
                           />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>

                  <div className="mt-8 bg-neutral-900 rounded-[6px] p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>
                     <div className="w-14 h-14 bg-amber-400 rounded-[6px] flex items-center justify-center shadow-lg shadow-amber-400/20 shrink-0">
                        <Bot size={28} className="text-neutral-900" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-white mb-1 uppercase tracking-tight">AI AgriBot Insight</p>                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                           {isAnalyzing ? (
                              <span className="animate-pulse italic">Sedang menganalisis tren pasar pusat, cuaca lokal, dan permintaan pelanggan...</span>
                           ) : (
                              `"Pak Budi, harga cabai di pasar pusat sedang naik tajam. Disarankan Anda memperbarui harga di Gudang Produk menjadi Rp 40.000/Kg untuk keuntungan maksimal."`
                           )}
                        </p>
                     </div>
                     <button 
                        onClick={() => {
                           setIsAnalyzing(true);
                           setTimeout(() => {
                              setIsAnalyzing(false);
                              setShowPriceUpdateModal(true);
                           }, 2500);
                        }}
                        disabled={isAnalyzing}
                        className="sm:ml-auto w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-neutral-900 rounded-[6px] font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap active:scale-95 flex items-center justify-center gap-2"
                     >
                        {isAnalyzing ? (
                           <RotateCw size={14} className="animate-spin" />
                        ) : (
                           <Sparkles size={14} />
                        )}
                        {isAnalyzing ? 'Menganalisis...' : 'Analisis Ulang Insight'}
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* 5. Ringkasan Performa Lahan (Gamification) */}
         <section className="bg-white p-10 rounded-[6px] border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="absolute right-0 top-0 w-96 h-96 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
               <div className="w-full lg:w-1/3 space-y-6">
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Performa Lahan Anda</p>
                  <div className="flex items-end gap-3 px-2">
                     <h2 className="text-7xl font-black text-neutral-900 leading-none">4.9</h2>
                     <div className="pb-2">
                        <div className="flex text-amber-500 mb-1">
                           <Star size={20} fill="currentColor" />
                           <Star size={20} fill="currentColor" />
                           <Star size={20} fill="currentColor" />
                           <Star size={20} fill="currentColor" />
                           <Star size={20} fill="currentColor" />
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rata-rata ulasan</p>
                     </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded-[6px]">
                     <div className="flex-1 text-center border-r border-gray-200">
                        <p className="text-lg font-black text-neutral-900">128</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Ulasan</p>
                     </div>
                     <div className="flex-1 text-center">
                        <p className="text-lg font-black text-neutral-900">98%</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Kesegaran</p>
                     </div>
                  </div>
               </div>

               <div className="flex-1 space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Suara Meja Makan Pembeli</h3>
                     <button className="text-[10px] font-black text-amber-600 uppercase hover:underline">Lihat Semua Ulasan</button>
                  </div>

                  <div className="space-y-4">
                     {[
                        { user: "Siti Aminah", text: "Tomatnya segar sekali dan ukurannya besar-besar. Terima kasih Pak Budi!", date: "Sore tadi", color: "bg-emerald-50 text-emerald-600" },
                        { user: "Resto Sedap Malam", text: "Wortel berkualitas tinggi, sangat memuaskan untuk stok dapur kami.", date: "Kemarin", color: "bg-blue-50 text-blue-600" },
                     ].map((review, i) => (
                        <div key={i} className="bg-gray-50/50 p-6 rounded-[6px] border border-transparent hover:border-gray-100 transition-all group cursor-pointer">
                           <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 ${review.color} rounded-[6px] flex items-center justify-center font-black text-xs`}>
                                    {review.user[0]}
                                 </div>
                                 <div>
                                    <p className="text-xs font-black text-gray-900 tracking-tight">{review.user}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{review.date}</p>
                                 </div>
                              </div>
                              <div className="flex text-amber-500">
                                 <Star size={12} fill="currentColor" />
                                 <Star size={12} fill="currentColor" />
                                 <Star size={12} fill="currentColor" />
                                 <Star size={12} fill="currentColor" />
                                 <Star size={12} fill="currentColor" />
                              </div>
                           </div>
                           <p className="text-sm italic font-medium text-gray-600 leading-relaxed group-hover:text-neutral-900 transition-colors">
                              "{review.text}"
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* --- INTERACTIVE MODALS --- */}

         {/* 1. Tarik Dana Modal */}
         {showWithdrawModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowWithdrawModal(false)}></div>
               <div className="bg-white rounded-[6px] p-10 w-full max-w-sm relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
                  
                  {withdrawStep === 1 && (
                     <div className="animate-in slide-in-from-right-5 duration-300">
                        <div className="mb-8">
                           <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                              <Banknote size={32} />
                           </div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase leading-tight">Penarikan Dana</h3>
                           <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-tight">Dana akan dikirim ke rekening terdaftar Anda.</p>
                        </div>

                        <div className="space-y-6">
                           <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tujuan Transfer</p>
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" className="w-6" alt="BCA" />
                                 </div>
                                 <div>
                                    <p className="text-xs font-black text-gray-900 uppercase">Bank BCA • 8821xxxx</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">A/N BUDI SETIAWAN</p>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Jumlah Tarik</label>
                              <div className="relative">
                                 <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-400">Rp</span>
                                 <input defaultValue="2.450.000" readOnly className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:ring-0 outline-none" />
                              </div>
                           </div>

                           <button 
                              onClick={() => setWithdrawStep(2)}
                              className="w-full py-5 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                           >
                              Konfirmasi Penarikan
                           </button>
                        </div>
                     </div>
                  )}

                  {withdrawStep === 2 && (
                     <div className="animate-in slide-in-from-right-5 duration-300">
                        <button onClick={() => setWithdrawStep(1)} className="mb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 hover:text-neutral-900">
                           <ChevronRight size={14} className="rotate-180" /> Kembali
                        </button>
                        <div className="mb-8">
                           <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                              <ShieldCheck size={32} />
                           </div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase leading-tight">Keamanan</h3>
                           <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-tight">Masukan PIN AgriConnect untuk verifikasi.</p>
                        </div>

                        <div className="space-y-6">
                           <div className="flex justify-between gap-2">
                              {[1, 2, 3, 4, 5, 6].map(i => (
                                 <div key={i} className="flex-1 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
                                 </div>
                              ))}
                           </div>

                           <button 
                              onClick={() => {
                                 setIsWithdrawing(true);
                                 setTimeout(() => {
                                    setIsWithdrawing(false);
                                    setWithdrawStep(3);
                                 }, 2000);
                              }}
                              disabled={isWithdrawing}
                              className="w-full py-5 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                           >
                              {isWithdrawing ? (
                                 <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                              ) : 'Lanjutkan'}
                           </button>
                        </div>
                     </div>
                  )}

                  {withdrawStep === 3 && (
                     <div className="animate-in zoom-in-95 duration-500 text-center py-4">
                        <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-100">
                           <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-2">Penarikan Berhasil!</h3>
                        <p className="text-xs text-gray-400 font-medium px-4 leading-relaxed italic mb-8">
                           Dana sedang dikirim ke rekening BCA Anda. Mohon cek mutasi dalam 5-10 menit ke depan.
                        </p>
                        <button 
                           onClick={() => setShowWithdrawModal(false)}
                           className="w-full py-4 bg-gray-50 text-neutral-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-100"
                        >
                           Selesai
                        </button>
                     </div>
                  )}

                  <button 
                     onClick={() => setShowWithdrawModal(false)}
                     className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-xl transition-all"
                  >
                     <X size={20} className="text-gray-400" />
                  </button>
               </div>
            </div>
         )}

         {/* 2. Update Harga AI Modal */}
         {showPriceUpdateModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowPriceUpdateModal(false)}></div>
               <div className="bg-white rounded-[6px] p-10 w-full max-w-sm relative z-10 shadow-2xl animate-in zoom-in-95 duration-500">
                  <div className="mb-8">
                     <div className="w-16 h-16 bg-amber-400 text-neutral-900 rounded-2xl flex items-center justify-center mb-4">
                        <Bot size={32} />
                     </div>
                     <h3 className="text-2xl font-black text-neutral-900 uppercase">Input AI Insight</h3>
                     <p className="text-xs text-gray-400 font-medium mt-1">Sesuaikan harga komoditas berdasarkan saran AgriBot.</p>
                  </div>

                  <div className="space-y-6">
                     <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Produk</span>
                           <span className="text-xs font-black text-neutral-900">Cabai Rawit Merah</span>
                        </div>
                        <div className="flex gap-4">
                           <div className="flex-1">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Harga Saat Ini</p>
                              <p className="text-sm font-black text-gray-600 line-through">Rp {currentAgriPrice.toLocaleString()}</p>
                           </div>
                           <div className="flex items-center text-amber-500">
                              <ArrowRight size={20} />
                           </div>
                           <div className="flex-1">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-amber-600">Saran AI</p>
                              <p className="text-lg font-black text-neutral-900 tracking-tighter">Rp 40.000</p>
                           </div>
                        </div>
                     </div>

                     <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                        <p className="text-[10px] text-amber-700 font-bold leading-relaxed italic">
                           "Potensi kenaikan keuntungan sebesar +25% karena stok di pasar induk sedang menipis pagi ini."
                        </p>
                     </div>

                     <div className="flex flex-col gap-3 pt-4">
                        <button 
                           onClick={() => {
                              setCurrentAgriPrice(40000);
                              setShowPriceUpdateModal(false);
                           }}
                           className="w-full py-5 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                        >
                           Terapkan Harga Baru
                        </button>
                        <button 
                           onClick={() => setShowPriceUpdateModal(false)}
                           className="w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all"
                        >
                           Mungkin Nanti
                        </button>
                     </div>
                  </div>

                  <button 
                     onClick={() => setShowPriceUpdateModal(false)}
                     className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-xl transition-all"
                  >
                     <X size={20} className="text-gray-400" />
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default FarmerDashboard;
