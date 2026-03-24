import React, { useState } from 'react';
import {
   Search,
   Bot,
   Zap,
   ChevronRight,
   ShieldCheck,
   MessageCircle,
   AlertOctagon,
   Terminal,
   History,
   Monitor,
   UploadCloud,
   CheckCircle2,
   X,
   HelpCircle,
   ChevronDown,
   FileText,
   Settings,
   LifeBuoy,
   Bug,
   PlayCircle,
   PauseCircle,
   ArrowRight,
   Info,
   Layers,
   Activity,
   UserCheck,
} from 'lucide-react';

const AdminHelp = () => {
   const [activeSection, setActiveSection] = useState('SOP');
   const [searchQuery, setSearchQuery] = useState('');
   const [isSandboxActive, setIsSandboxActive] = useState(false);
   const [disputeStep, setDisputeStep] = useState(0);

   // MOCK DATA: Decision Tree
   const decisionTree = [
      {
         question: "Apakah pelanggan melampirkan foto sayur rusak?",
         options: [
            { label: "Ya", next: 1 },
            { label: "Tidak", recommendation: "Tolak Sengketa. Minta pelanggan mengunggah bukti valid dalam 24 jam." }
         ]
      },
      {
         question: "Apakah kerusakan lebih dari 50% dari volume pesanan?",
         options: [
            { label: "Ya", recommendation: "Full Refund (100% Escrow) ke pelanggan. Produk tidak perlu dikembalikan." },
            { label: "Tidak", next: 2 }
         ]
      },
      {
         question: "Apakah kesalahan ada pada kurir (logistik) atau petani?",
         options: [
            { label: "Kurir", recommendation: "Eskalasi ke Hub Logistik. Klaim asuransi pengiriman." },
            { label: "Petani", recommendation: "Partial Refund (30-50%) ke pelanggan. Berikan peringatan (Strike 1) pada petani." }
         ]
      }
   ];

   const releaseNotes = [
      { version: "v2.5.1", date: "24 Mar 2026", note: "Optimasi sistem pencarian SOP berbasis AI (AgriBot)." },
      { version: "v2.4.0", date: "20 Mar 2026", note: "Penambahan filter area pada Radar Panen Besok (Pre-Order)." },
      { version: "v2.3.2", date: "15 Mar 2026", note: "Pembaruan algoritma deteksi anomali harga pasar." },
      { version: "v2.2.0", date: "10 Mar 2026", note: "Integrasi sistem logistik pihak ketiga (JNE/Ninja Xpress)." },
   ];

   return (
      <div className={`space-y-10 pb-32 animate-in fade-in duration-500 relative ${isSandboxActive ? 'bg-emerald-50/30' : ''}`}>

         {/* SANDBOX MODE INDICATOR */}
         {isSandboxActive && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-10 py-3 rounded-[6px] flex items-center gap-4 shadow-2xl animate-bounce">
               <PlayCircle size={20} />
               <p className="text-[10px] font-black uppercase tracking-[0.2em]">Sandbox Mode Active  EThis is a Simulation</p>
               <button onClick={() => setIsSandboxActive(false)} className="hover:scale-110 transition-all"><X size={18} /></button>
            </div>
         )}

         {/* 1. SMART SOP ENGINE (Hero) */}
         <section className="bg-neutral-900 p-12 lg:p-20 rounded-[6px] text-center space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 p-12 opacity-5 scale-150 rotate-12">
               <Bot size={200} />
            </div>
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
               <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-xl shadow-amber-400/20 rotate-3 transition-transform hover:rotate-0">
                     <Bot size={32} fill="white" />
                  </div>
               </div>
               <h1 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Internal Smart SOP Engine</h1>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-loose max-w-xl mx-auto">Tanyakan AgriBot AI untuk solusi masalah operasional, hukum, atau sengketa secara instan dari dokumen SOP resmi perusahaan.</p>

               <div className="relative group max-w-2xl mx-auto">
                  <input
                     type="text"
                     placeholder="Ketik masalah atau kasus (Contoh: Potong saldo Escrow untuk ongkir)..."
                     className="w-full pl-20 pr-10 py-8 bg-white/5 border border-white/10 rounded-[6px] text-sm font-bold text-white outline-none focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all placeholder:text-gray-600"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                     <div className="absolute top-full left-0 right-0 mt-6 bg-white p-8 rounded-[6px] shadow-3xl text-left border border-gray-100 animate-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                           <Zap size={18} className="text-amber-500" />
                           <span className="text-[10px] font-black text-neutral-900 uppercase tracking-widest underline decoration-amber-400 decoration-4 underline-offset-4">AgriBot AI Response</span>
                        </div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase leading-relaxed mb-6 italic">"Untuk kasus pemotongan saldo Escrow guna biaya retur, ikuti langkah berikut:"</p>
                        <div className="space-y-4">
                           <div className="flex gap-4 p-4 bg-gray-50 rounded-[6px]">
                              <div className="w-8 h-8 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center text-xs font-black shrink-0">1</div>
                              <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-tight leading-snug">Pastikan sengketa sudah di tahap 'Diterima Admin'. Beralih ke tab Finansial di detail pesanan.</p>
                           </div>
                           <div className="flex gap-4 p-4 bg-gray-50 rounded-[6px]">
                              <div className="w-8 h-8 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center text-xs font-black shrink-0">2</div>
                              <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-tight leading-snug">Klik 'Adjust Balance', pilih kategori 'Logistics Compensation'. Masukkan nominal sesuai resi kurir.</p>
                           </div>
                        </div>
                        <button className="w-full mt-8 py-4 bg-amber-400 text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Buka Manual SOP Lengkap (PDF)</button>
                     </div>
                  )}
               </div>
            </div>
         </section>

         {/* 2. MAIN HELP SECTIONS */}
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Decision Tree (Left - 2cols) */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-10 animate-in slide-in-from-left duration-700 min-h-[500px] flex flex-col justify-between">
                  <div>
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-[6px] flex items-center justify-center">
                           <Layers size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Pohon Keputusan Sengketa</h3>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Interaktive SOP Standardization Tool</p>
                        </div>
                     </div>

                     {/* Dynamic Tree Step */}
                     <div className="space-y-10">
                        <div className="p-8 bg-gray-50 rounded-[6px] border border-gray-100 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 opacity-5">
                              <ShieldCheck size={100} />
                           </div>
                           <h4 className="text-sm font-black text-neutral-700 uppercase tracking-widest mb-2 italic">Langkah {disputeStep + 1}</h4>
                           <p className="text-2xl font-black text-neutral-900 uppercase tracking-tighter leading-tight italic">{decisionTree[disputeStep]?.question || "Rekomendasi Akhir"}</p>
                        </div>

                        {decisionTree[disputeStep] ? (
                           <div className="grid grid-cols-2 gap-6">
                              {decisionTree[disputeStep].options.map((opt, i) => (
                                 <button
                                    key={i}
                                    onClick={() => opt.next !== undefined ? setDisputeStep(opt.next) : setDisputeStep(99)}
                                    className="py-10 bg-white border-2 border-gray-100 rounded-[6px] text-xs font-black uppercase tracking-widest text-neutral-400 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-2xl transition-all"
                                 >
                                    {opt.label}
                                 </button>
                              ))}
                           </div>
                        ) : (
                           <div className="p-8 bg-emerald-50 border-2 border-emerald-100 rounded-[6px] animate-in zoom-in-95 duration-500">
                              <div className="flex items-center gap-3 mb-4">
                                 <CheckCircle2 className="text-emerald-500" size={24} />
                                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest underline decoration-emerald-200 decoration-4 underline-offset-4">SOP Recommendation</span>
                              </div>
                              <p className="text-xl font-black text-emerald-900 uppercase tracking-tight italic leading-relaxed">
                                 {decisionTree[disputeStep - 1]?.options.find(o => o.recommendation)?.recommendation || "Lakukan Pengembalian Dana Sebagian (Partial Refund) 30%."}
                              </p>
                              <button
                                 onClick={() => setDisputeStep(0)}
                                 className="mt-10 px-8 py-4 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-neutral-900 shadow-xl transition-all flex items-center gap-2"
                              >
                                 Reset Case <ChevronRight size={14} />
                              </button>
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="pt-8 border-t border-gray-50 flex items-center gap-4">
                     <Info size={16} className="text-indigo-600" />
                     <p className="text-[9px] text-gray-400 font-bold uppercase italic leading-none">Keputusan ini berdasarkan protokol operasional AgriConnect 2026.</p>
                  </div>
               </div>

               {/* IT Ticket & Sandbox (Bot Row) */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* IT BUG ESCALATION */}
                  <div className="bg-white p-10 rounded-[6px] border border-gray-100 shadow-2xl space-y-8 animate-in slide-in-from-bottom-5 duration-700">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-600 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-red-100">
                           <Bug size={24} />
                        </div>
                        <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter leading-none italic">IT Hotline Portal</h3>
                     </div>
                     <form className="space-y-4">
                        <div className="space-y-1">
                           <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Subject Masalah</label>
                           <input placeholder="Contoh: Tomat tidak muncul di peta..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-[10px] font-bold outline-none focus:ring-2 focus:ring-red-600/10" />
                        </div>
                        <div className="flex gap-3">
                           <div className="flex-1 py-4 bg-red-50 text-red-600 rounded-[6px] text-[9px] font-black uppercase text-center cursor-pointer border border-red-100">CRITICAL</div>
                           <div className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-[6px] text-[9px] font-black uppercase text-center cursor-pointer border border-gray-100">MEDIUM</div>
                        </div>
                        <button type="button" className="w-full py-4 bg-neutral-900 text-white rounded-[6px] text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
                           <UploadCloud size={14} /> Kirim Tiket
                        </button>
                     </form>
                  </div>

                  {/* SANDBOX MODE CARD */}
                  <div className="bg-neutral-900 p-10 rounded-[6px] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                        <Monitor size={100} />
                     </div>
                     <div className="relative z-10 flex flex-col h-full justify-between space-y-6 text-white">
                        <div>
                           <h3 className="text-lg font-black uppercase tracking-tighter italic leading-none flex items-center gap-3">Sandbox Training <Activity size={18} className="text-emerald-400" /></h3>
                           <p className="text-[9px] text-gray-400 font-bold uppercase mt-2 leading-relaxed italic">Simulasi lingkungan pelatihan untuk Admin baru tanpa risiko data asli.</p>
                        </div>
                        <button
                           onClick={() => setIsSandboxActive(!isSandboxActive)}
                           className={`w-full py-8 text-[10px] font-black uppercase tracking-[0.3em] rounded-[6px] transition-all flex items-center justify-center gap-4 ${isSandboxActive ? 'bg-red-500 text-white shadow-red-200' : 'bg-emerald-500 text-neutral-900 shadow-xl'}`}
                        >
                           {isSandboxActive ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
                           {isSandboxActive ? 'STOP SIMULATION' : 'ENTER SANDBOX'}
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Sidebar (Timeline / Changelog) */}
            <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-12 animate-in slide-in-from-right duration-700">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-100 text-neutral-900 rounded-[6px] flex items-center justify-center">
                     <History size={24} />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Release Notes</h3>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 italic">System Evolution Track</p>
                  </div>
               </div>

               <div className="relative space-y-12 pl-10 border-l border-gray-100 italic">
                  {releaseNotes.map((rel, i) => (
                     <div key={i} className="relative">
                        {/* Timeline Bullet */}
                        <div className="absolute -left-[50px] top-0 w-8 h-8 bg-white border-2 border-neutral-900 rounded-[6px] flex items-center justify-center font-black text-[8px] z-10 shadow-lg">{rel.version.split('.')[1]}</div>

                        <div>
                           <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest leading-none">{rel.version}</span>
                           <h4 className="text-[10px] font-black text-neutral-900 uppercase mt-1 italic leading-none">{rel.date}</h4>
                           <p className="text-[11px] font-bold text-gray-400 mt-4 leading-relaxed uppercase tracking-tighter">{rel.note}</p>
                        </div>
                     </div>
                  ))}
                  <div className="pt-6">
                     <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:gap-4 transition-all">Lihat Seluruh Historis <ArrowRight size={14} /></button>
                  </div>
               </div>
            </div>

         </section>

      </div>
   );
};

export default AdminHelp;





