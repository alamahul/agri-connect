import React, { useState, useEffect } from 'react';
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
   FileSearch,
   Download,
   ExternalLink,
   Send,
   CheckCircle
} from 'lucide-react';

const AdminHelp = () => {
   const [activeSection, setActiveSection] = useState('SOP');
   const [searchQuery, setSearchQuery] = useState('');
   const [isSandboxActive, setIsSandboxActive] = useState(false);
   const [disputeStep, setDisputeStep] = useState(0);
   const [showSOPModal, setShowSOPModal] = useState(false);
   const [isTicketSending, setIsTicketSending] = useState(false);
   const [toast, setToast] = useState(null);

   const showNotification = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
   };

   // MOCK DATA: AI Suggested Queries
   const suggestedQueries = [
      "Kebijakan Return Sayur Rusak",
      "Cara Reset PIN Farmer",
      "Prosedur Sengketa Logistik",
      "Batas Waktu Escrow"
   ];

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
            { label: "Kurir", recommendation: "Eskalasi ke Hub Logistik (JNE/Ninja). Klaim asuransi pengiriman penuh." },
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

   const handleTicketSubmit = (e) => {
      e.preventDefault();
      setIsTicketSending(true);
      setTimeout(() => {
         setIsTicketSending(false);
         showNotification("Tiket Berhasil Dikirim ke Tim Developer!");
         e.target.reset();
      }, 2000);
   };

   return (
      <div className={`space-y-10 pb-32 animate-in fade-in duration-500 relative ${isSandboxActive ? 'bg-emerald-50/20' : ''}`}>

         {/* Toast Notification */}
         {toast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[250] bg-neutral-900 border-2 border-amber-400 text-white px-8 py-4 rounded-[6px] shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-10">
               <ShieldCheck className="text-amber-400" size={24} />
               <p className="text-xs font-black uppercase tracking-widest">{toast}</p>
            </div>
         )}

         {/* SANDBOX MODE OVERLAY */}
         {isSandboxActive && (
            <>
               <div className="fixed inset-0 z-[50] pointer-events-none border-[12px] border-emerald-500/20 animate-pulse"></div>
               <div className="fixed bottom-10 right-10 z-[150] bg-emerald-600 text-white px-8 py-6 rounded-[6px] shadow-2xl flex flex-col gap-2 items-center text-center animate-in slide-in-from-bottom-10">
                  <Monitor size={32} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight">Training Environment<br />ACTIVE</p>
                  <button
                     onClick={() => { setIsSandboxActive(false); showNotification("Kembali ke Sistem Utama"); }}
                     className="mt-4 px-6 py-2 bg-neutral-900 text-white rounded-[6px] text-[8px] font-black uppercase tracking-widest hover:bg-red-500 transition-all"
                  >
                     Exit Sandbox
                  </button>
               </div>
            </>
         )}

         {/* 1. SMART SOP ENGINE (Hero) */}
         <section className="bg-neutral-900 p-12 lg:p-24 rounded-[6px] text-center space-y-12 relative overflow-hidden shadow-2xl group/engine">
            <div className="absolute top-0 left-0 p-12 opacity-5 scale-150 rotate-12 group-hover/engine:scale-110 transition-transform duration-[10s]">
               <Bot size={200} />
            </div>
            <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
               <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-xl shadow-amber-400/20 rotate-3 transition-transform hover:rotate-0">
                     <Bot size={32} fill="white" />
                  </div>
               </div>
               <h1 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">Internal Smart SOP Engine</h1>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-loose max-w-2xl mx-auto">Tanyakan AgriBot AI untuk solusi masalah operasional, hukum, atau sengketa secara instan dari database SOP resmi AgriConnect.</p>

               <div className="max-w-3xl mx-auto space-y-8">
                  {/* Search Input Container */}
                  <div className="relative group">
                     <input
                        type="text"
                        placeholder="Ketik masalah atau kasus (Contoh: Potong saldo Escrow untuk ongkir)..."
                        className="w-full pl-20 pr-10 py-8 bg-white border border-gray-200 rounded-[6px] text-sm font-bold text-neutral-900 outline-none focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all placeholder-gray-400 shadow-2xl relative z-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                     />
                  </div>

                  {/* AI Quick Suggestions */}
                  <div className="flex flex-wrap justify-center gap-3">
                     {suggestedQueries.map(q => (
                        <button
                           key={q}
                           onClick={() => setSearchQuery(q)}
                           className="px-5 py-2.5 bg-white/5 hover:bg-white hover:text-neutral-900 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-400 transition-all active:scale-95"
                        >
                           {q}
                        </button>
                     ))}
                  </div>

                  {/* SOP Core Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-white/10">
                     <button onClick={() => setShowSOPModal(true)} className="py-5 bg-amber-400 text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">
                        <FileSearch size={16} /> Baca Dokumen SOP Penuh
                     </button>
                     <button onClick={() => showNotification("Draft SOP Berhasil Diunduh")} className="py-5 bg-white/5 border border-white/10 text-white rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-3">
                        <Download size={16} /> Unduh SOP (PDF)
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* 2. MAIN HELP SECTIONS */}
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Decision Tree (Left - 2cols) */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-10 animate-in slide-in-from-left duration-700 min-h-[550px] flex flex-col justify-between group/tree hover:border-indigo-600/30 transition-all cursor-default">
                  <div>
                     <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-[6px] flex items-center justify-center shadow-xl shadow-indigo-100 group-hover/tree:scale-110 transition-transform">
                           <Layers size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Decision Wizard: Customer Support</h3>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 italic">Protokol Penanganan Konflik & Sengketa AgriConnect</p>
                        </div>
                     </div>

                     {/* Dynamic Tree Step */}
                     <div className="space-y-10">
                        <div className="p-10 bg-gray-50 rounded-[6px] border border-gray-100 relative overflow-hidden group/step hover:bg-neutral-900 transition-all duration-500">
                           <div className="absolute top-0 right-0 p-10 opacity-5 group-hover/step:translate-x-4 transition-transform">
                              <ShieldCheck size={120} />
                           </div>
                           <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 italic group-hover/step:text-amber-400 transition-colors tracking-[0.3em]">Langkah {disputeStep + 1}</h4>
                           <p className="text-2xl lg:text-3xl font-black text-neutral-900 uppercase tracking-tighter leading-tight italic group-hover/step:text-white transition-colors">
                              {decisionTree[disputeStep]?.question || "Analisis Berhasil!"}
                           </p>
                        </div>

                        {decisionTree[disputeStep] ? (
                           <div className="grid grid-cols-2 gap-8">
                              {decisionTree[disputeStep].options.map((opt, i) => (
                                 <button
                                    key={i}
                                    onClick={() => { opt.next !== undefined ? setDisputeStep(opt.next) : setDisputeStep(99); }}
                                    className="py-12 bg-white border-2 border-gray-100 rounded-[6px] text-xs font-black uppercase tracking-[0.2em] text-gray-300 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-2xl transition-all active:scale-95 flex flex-col items-center gap-2"
                                 >
                                    {opt.label}
                                    <ChevronRight size={16} className={`${i === 0 ? 'text-indigo-600' : 'text-red-500'}`} />
                                 </button>
                              ))}
                           </div>
                        ) : (
                           <div className="p-10 bg-emerald-50 border-2 border-emerald-100 rounded-[6px] animate-in zoom-in-95 duration-500 shadow-xl shadow-emerald-100/30">
                              <div className="flex items-center gap-4 mb-6">
                                 <CheckCircle2 className="text-emerald-500 shrink-0" size={32} />
                                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest underline decoration-emerald-200 decoration-4 underline-offset-4">Rekomendasi Keputusan Admin</span>
                              </div>
                              <p className="text-xl lg:text-2xl font-black text-emerald-900 uppercase tracking-tight italic leading-relaxed">
                                 {decisionTree[disputeStep - 1]?.options.find(o => o.recommendation)?.recommendation || "System Recommendation Available"}
                              </p>
                              <div className="grid grid-cols-2 gap-4 mt-12">
                                 <button
                                    onClick={() => setDisputeStep(0)}
                                    className="px-8 py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-xl transition-all flex items-center justify-center gap-3"
                                 >
                                    <Activity size={16} /> Kasus Baru
                                 </button>
                                 <button
                                    onClick={() => { showNotification("Rekomendasi dikirim ke Manager Sengketa"); setDisputeStep(0); }}
                                    className="px-8 py-5 bg-emerald-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 shadow-xl transition-all flex items-center justify-center gap-3"
                                 >
                                    <Send size={16} /> Eksekusi Keputusan
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <Info size={16} className="text-indigo-600" />
                        <p className="text-[9px] text-gray-400 font-bold uppercase italic leading-none">Dokumen Acuan: AgriConnect-SOP-2026-DISPUTE-V2</p>
                     </div>
                     <p className="text-[10px] font-black text-neutral-900 uppercase italic opacity-20">Confidential</p>
                  </div>
               </div>

               {/* IT Ticket & Sandbox (Bot Row) */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* IT BUG ESCALATION */}
                  <div className="bg-white p-10 rounded-[6px] border border-gray-100 shadow-2xl space-y-8 animate-in slide-in-from-bottom-5 duration-700 group/ticket hover:border-red-500/20 transition-all">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-red-600 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-red-100 group-hover/ticket:rotate-12 transition-transform">
                              <Bug size={24} />
                           </div>
                           <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter leading-none italic">IT Hotline Dev</h3>
                        </div>
                        <div className="px-3 py-1 bg-neutral-900 text-white text-[8px] font-black uppercase rounded-full">Online</div>
                     </div>
                     <form onSubmit={handleTicketSubmit} className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-4">Subject Laporan / Bug</label>
                           <input
                              required
                              placeholder="Ketik Masalah Teknis..."
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-red-500/5 focus:border-red-500/20 transition-all"
                           />
                        </div>
                        <div className="flex gap-4">
                           {['Critical', 'Regular'].map(lvl => (
                              <button
                                 type="button"
                                 key={lvl}
                                 className={`flex-1 py-4 border rounded-[6px] text-[9px] font-black uppercase tracking-widest transition-all ${lvl === 'Critical' ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-neutral-900 hover:text-white'}`}
                              >
                                 {lvl}
                              </button>
                           ))}
                        </div>
                        <button
                           disabled={isTicketSending}
                           type="submit"
                           className="w-full py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50"
                        >
                           {isTicketSending ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                           {isTicketSending ? 'MEMPROSES...' : 'KIRIM TIKET IT'}
                        </button>
                     </form>
                  </div>

                  {/* SANDBOX MODE CARD */}
                  <div className="bg-neutral-900 p-10 rounded-[6px] shadow-2xl relative overflow-hidden group">
                     {isSandboxActive && (
                        <div className="absolute inset-0 bg-emerald-500 animate-in fade-in duration-500 opacity-90 transition-all flex items-center justify-center z-20">
                           <div className="text-center space-y-4">
                              <CheckCircle size={60} className="text-neutral-900 mx-auto" />
                              <h4 className="text-2xl font-black text-neutral-900 uppercase">RUNNING</h4>
                              <button onClick={() => setIsSandboxActive(false)} className="px-6 py-2 bg-neutral-900 text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-2xl">Stop Now</button>
                           </div>
                        </div>
                     )}
                     <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                        <Monitor size={100} />
                     </div>
                     <div className="relative z-10 flex flex-col h-full justify-between space-y-8 text-white">
                        <div>
                           <div className="flex items-center gap-3">
                              <h3 className="text-xl font-black uppercase tracking-tighter italic leading-none">Sandbox Mode</h3>
                              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded-full uppercase">Isolated</span>
                           </div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase mt-4 leading-relaxed italic">Aktifkan lingkungan simulasi untuk melatih admin baru tanpa risiko memengaruhi data real-time platform.</p>
                        </div>
                        <button
                           onClick={() => { setIsSandboxActive(!isSandboxActive); if (!isSandboxActive) showNotification("Sandbox Mode Berhasil Diaktifkan"); }}
                           className={`w-full py-10 text-[11px] font-black uppercase tracking-[0.4em] rounded-[6px] transition-all flex flex-col items-center justify-center gap-4 shadow-2xl ${isSandboxActive ? 'bg-red-500 text-white' : 'bg-emerald-500 text-neutral-900 hover:scale-[1.02]'}`}
                        >
                           {isSandboxActive ? <PauseCircle size={40} /> : <PlayCircle size={40} />}
                           {isSandboxActive ? 'TERMINATE' : 'DEVICES READY'}
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Sidebar (Timeline / Changelog) */}
            <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-12 animate-in slide-in-from-right duration-700 sticky top-10 h-fit">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-100 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-inner">
                     <History size={24} />
                  </div>
                  <div>
                     <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter leading-none italic">System Logs</h3>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 italic">Release & Update History</p>
                  </div>
               </div>

               <div className="relative space-y-12 pl-12 border-l-2 border-dashed border-gray-100 italic">
                  {releaseNotes.map((rel, i) => (
                     <div key={i} className="relative group/log cursor-default">
                        {/* Timeline Bullet */}
                        <div className="absolute -left-[64px] top-0 w-12 h-12 bg-white border-2 border-neutral-900 rounded-[6px] flex items-center justify-center font-black text-[10px] z-10 shadow-lg group-hover/log:bg-neutral-900 group-hover/log:text-white transition-all transform group-hover/log:rotate-12">
                           {rel.version.split('.')[1]}
                        </div>

                        <div className="space-y-2">
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none bg-amber-50 px-3 py-1 rounded-full">{rel.version}</span>
                              <h4 className="text-[9px] font-black text-gray-300 uppercase leading-none">{rel.date}</h4>
                           </div>
                           <p className="text-[11px] font-bold text-neutral-900 mt-4 leading-relaxed uppercase tracking-tight group-hover/log:text-indigo-600 transition-colors">{rel.note}</p>
                        </div>
                     </div>
                  ))}
                  <div className="pt-8">
                     <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:gap-6 transition-all group">
                        Manifest Lengkap <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>

         </section>

         {/* SOP PDF VIEWER MODAL */}
         {showSOPModal && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
               <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setShowSOPModal(false)}></div>
               <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[6px] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in zoom-in-95">
                  <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                     <div className="flex items-center gap-4">
                        <FileText className="text-indigo-600" size={24} />
                        <div>
                           <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic italic">Standard Operating Procedure V2.5</h3>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Protocol: Logistics Dispute Resolution • Updated March 2026</p>
                        </div>
                     </div>
                     <button onClick={() => setShowSOPModal(false)} className="p-4 hover:bg-neutral-100 rounded-full transition-all group">
                        <X size={24} className="group-hover:rotate-90 transition-transform" />
                     </button>
                  </div>

                  {/* Mock PDF Content */}
                  <div className="flex-1 overflow-y-auto p-12 lg:p-20 space-y-12">
                     <div className="max-w-3xl mx-auto space-y-10">
                        <section className="space-y-6">
                           <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Halaman 1: Ruang Lingkup</h4>
                           <p className="text-sm font-medium text-gray-500 leading-relaxed uppercase tracking-tight">SOP ini mengatur tentang kebijakan pengembalian dana (refund) dan kompensasi logistik untuk komoditas pangan yang bersifat 'perishable' (mudah rusak) dalam ekosistem AgriConnect.</p>
                        </section>
                        <div className="w-full h-px bg-gray-100"></div>
                        <section className="space-y-6">
                           <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Pasal 4: Kriteria Kerusakan</h4>
                           <ul className="space-y-4">
                              <li className="flex gap-4">
                                 <Check className="text-emerald-500 shrink-0" size={16} />
                                 <p className="text-xs font-black text-neutral-900 uppercase italic">Kategori Ringan (10-20%): Berikan Voucher Platform Rp 15,000.</p>
                              </li>
                              <li className="flex gap-4">
                                 <Check className="text-emerald-500 shrink-0" size={16} />
                                 <p className="text-xs font-black text-neutral-900 uppercase italic">Kategori Menengah (20-50%): Refund Dana 30% dari total invoice.</p>
                              </li>
                              <li className="flex gap-4">
                                 <Check className="text-emerald-500 shrink-0" size={16} />
                                 <p className="text-xs font-black text-neutral-900 uppercase italic">Kategori Berat (&gt;50%): Refund Total 100% dan Peringatan Petani.</p>
                              </li>
                           </ul>
                        </section>
                        <div className="p-10 bg-indigo-50 border-2 border-indigo-100 rounded-[6px] italic space-y-4">
                           <h5 className="font-black text-indigo-900 uppercase text-xs">Catatan Penting:</h5>
                           <p className="text-xs text-indigo-700 leading-relaxed uppercase font-bold">Seluruh keputusan refund wajib melampirkan bukti foto digital dengan metadata koordinat (Geo-tagging) untuk menghindari manipulasi.</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                     <button onClick={() => setShowSOPModal(false)} className="px-10 py-5 bg-neutral-900 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Tutup Dokumen</button>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default AdminHelp;

const Check = ({ className, size }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
   >
      <polyline points="20 6 9 17 4 12" />
   </svg>
);

const Loader2 = ({ className, size }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
   >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
   </svg>
);
