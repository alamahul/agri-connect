import React, { useState } from 'react';
import {
   Plus,
   Edit3,
   Trash2,
   Eye,
   Search,
   TrendingUp,
   Bot,
   Zap,
   FileText,
   Users,
   Volume2,
   Share2,
   ShoppingCart,
   ArrowRight,
   CheckCircle2,
   MessageCircle,
   Sparkles,
   Image as ImageIcon,
   Youtube,
   Layout,
   ShieldCheck,
   Mic,
   BarChart3,
   X,
   Type,
   Maximize2,
   Bell,
   Check,
   ChevronRight,
   MoreVertical,
   Calendar,
   Layers,
   Activity
} from 'lucide-react';

const AdminArticles = () => {
   const [viewMode, setViewMode] = useState('List'); // 'List' or 'Editor'
   const [showVoiceModal, setShowVoiceModal] = useState(false);
   const [activeTab, setActiveTab] = useState('Published');

   const articles = [
      { id: 1, title: 'Cara Menyimpan Tomat agar Tidak Cepat Busuk', views: 5200, category: 'Customer App', impact: 45, date: '22 Mar 2026', status: 'Published' },
      { id: 2, title: 'Tips Menghadapi Hama Wereng pada Padi', views: 3100, category: 'Farmer App', impact: 120, date: '21 Mar 2026', status: 'Published' },
      { id: 3, title: 'Resep Jus Tomat Sehat untuk Imunitas', views: 1500, category: 'Customer App', impact: 88, date: '20 Mar 2026', status: 'Draft' },
      { id: 4, title: 'Update Harga Cabai Nasional Minggu Ini', views: 8900, category: 'Farmer App', impact: 0, date: '19 Mar 2026', status: 'Published' },
   ];

   const topics = [
      { title: 'Hama Wereng', count: 150, type: 'Farmer Search' },
      { title: 'Cara Daftarkan Lahan', count: 85, type: 'Farmer Search' },
      { title: 'Olahan Terong', count: 210, type: 'Customer Search' },
   ];

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500">

         {/* 1. Header & AI Radar (Trend Analyzer) */}
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Stats */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl flex flex-col md:flex-row gap-8 items-center">
               <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-neutral-200">
                        <BarChart3 size={24} />
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Konten Performa</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Real-time Impact Analytics</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Pembaca</p>
                        <p className="text-2xl font-black text-neutral-900 tracking-tighter">18.7K <TrendingUp size={14} className="inline text-emerald-500 ml-1" /></p>
                     </div>
                     <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg. Conversion</p>
                        <p className="text-2xl font-black text-neutral-900 tracking-tighter">12.4% <Zap size={14} className="inline text-amber-500 ml-1" /></p>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-px h-px md:h-32 bg-gray-100"></div>
               <div className="flex-1">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <Sparkles size={12} /> Artikel Terpopuler
                  </p>
                  <h3 className="text-sm font-black text-neutral-900 uppercase leading-snug">"Cara Menyimpan Tomat agar Tidak Cepat Busuk"</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">5,200 Pembaca • 45 Transaksi</p>
               </div>
            </div>

            {/* AgriBot Topic Suggestions */}
            <div className="bg-amber-400 p-8 rounded-[6px] shadow-xl shadow-amber-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <Bot size={120} />
               </div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                     <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic flex items-center gap-3">
                        AgriBot Radar <Zap size={18} fill="currentColor" />
                     </h3>
                     <p className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest mt-2 opacity-60 italic">AI Topic Suggestions</p>
                  </div>

                  <div className="my-6 space-y-3">
                     {topics.slice(0, 2).map((t, i) => (
                        <div key={i} className="bg-white/40 p-3 rounded-[6px] border border-white/20 flex justify-between items-center backdrop-blur-sm">
                           <div>
                              <p className="text-[9px] font-black uppercase text-neutral-900">{t.title}</p>
                              <p className="text-[7px] font-bold opacity-60">Pencarian Gagal: {t.count}</p>
                           </div>
                           <button onClick={() => setViewMode('Editor')} className="p-2 bg-neutral-900 text-white rounded-[6px] shadow-xl hover:scale-110 transition-all">
                              <Plus size={12} />
                           </button>
                        </div>
                     ))}
                  </div>

                  <p className="text-[8px] font-bold text-neutral-900 uppercase leading-relaxed max-w-[200px]">
                     💡 150 petani mencari <span className="underline decoration-neutral-900 underline-offset-4">Hama Wereng</span> minggu ini. Buat panduannya sekarang!
                  </p>
               </div>
            </div>
         </section>

         {/* 2. Main Content Module */}
         <section className="bg-white rounded-[6px] border border-gray-100 shadow-2xl overflow-hidden min-h-[800px] animate-in slide-in-from-bottom-10 duration-700">

            {/* CMS Toolbar */}
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
               <div className="flex gap-2">
                  {['Published', 'Draft', 'Archived'].map(tab => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-3 rounded-[6px] text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-neutral-900 text-white shadow-xl' : 'text-gray-400 hover:text-neutral-900'}`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>
               <div className="flex gap-4">
                  {viewMode === 'List' ? (
                     <button
                        onClick={() => setViewMode('Editor')}
                        className="flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                     >
                        <FileText size={16} /> Artikel Baru
                     </button>
                  ) : (
                     <button
                        onClick={() => setViewMode('List')}
                        className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
                     >
                        <X size={16} /> Tutup Editor
                     </button>
                  )}
               </div>
            </div>

            {viewMode === 'List' ? (
               /* CMS LIST VIEW */
               <div className="p-10 space-y-8 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 gap-6">
                     {articles.map((art, i) => (
                        <div key={i} className="group bg-white p-8 rounded-[6px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col lg:flex-row items-center justify-between gap-8 cursor-pointer relative overflow-hidden">
                           <div className="flex items-center gap-8 flex-1">
                              <div className="w-20 h-20 bg-gray-50 rounded-[6px] flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all transform group-hover:rotate-12 duration-500 shadow-inner">
                                 <FileText size={32} />
                              </div>
                              <div>
                                 <div className="flex items-center gap-4 mb-2">
                                    <span className={`px-3 py-1 text-[8px] font-black uppercase rounded-[6px] tracking-widest ${art.category.includes('Farmer') ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>{art.category}</span>
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">{art.date}</span>
                                 </div>
                                 <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter leading-none">{art.title}</h3>
                                 <div className="flex items-center gap-6 mt-4">
                                    <div className="flex items-center gap-2">
                                       <Eye size={12} className="text-gray-300" />
                                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{art.views} Views</p>
                                    </div>
                                    <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                    <div className="flex items-center gap-2">
                                       <ShoppingCart size={12} className="text-emerald-500" />
                                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{art.impact} Transaksi Berhasil</p>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0 duration-500">
                              <button className="p-4 bg-white shadow-xl rounded-[6px] text-neutral-400 hover:text-indigo-600 hover:shadow-indigo-100 transition-all"><Edit3 size={20} /></button>
                              <button className="p-4 bg-white shadow-xl rounded-[6px] text-neutral-400 hover:text-red-500 hover:shadow-red-100 transition-all"><Trash2 size={20} /></button>
                              <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-2xl">
                                 <ChevronRight size={20} />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ) : (
               /* AI SMART EDITOR VIEW (Medium Style) */
               <div className="flex flex-col lg:flex-row h-full min-h-[800px] animate-in zoom-in-95 duration-500">

                  {/* Main Writing Area */}
                  <div className="flex-1 p-12 lg:p-24 bg-white overflow-y-auto max-h-[800px] scrollbar-hide">
                     <div className="max-w-3xl mx-auto space-y-12">
                        <div className="space-y-4">
                           <span className="px-4 py-1.5 bg-neutral-900 text-white text-[9px] font-black uppercase tracking-widest rounded-[6px]">Drafting Mode</span>
                           <input
                              type="text"
                              placeholder="Jelas, Berani, dan Bermanfaat"
                              className="w-full text-5xl font-black text-neutral-900 uppercase tracking-tighter outline-none placeholder:text-gray-100 border-none bg-transparent leading-none italic"
                           />
                        </div>

                        <div className="flex items-center gap-6 border-b border-gray-50 pb-6">
                           <button className="p-3 bg-gray-50 rounded-[6px] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"><ImageIcon size={18} /></button>
                           <button className="p-3 bg-gray-50 rounded-[6px] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"><Youtube size={18} /></button>
                           <button className="p-3 bg-emerald-50 text-emerald-600 rounded-[6px] hover:bg-emerald-600 hover:text-white transition-all italic font-black text-[10px] px-6">ADD PRODUCT BLOCK</button>
                           <div className="w-px h-8 bg-gray-100"></div>
                           <button className="p-3 bg-indigo-50 text-indigo-600 rounded-[6px] flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all font-black text-[10px] px-6">
                              <Bot size={14} /> CO-WRITER AI
                           </button>
                        </div>

                        <textarea
                           placeholder="Klik di sini untuk mulai menulis cerita sukses pertanian..."
                           className="w-full min-h-[400px] text-lg font-medium text-neutral-600 outline-none border-none bg-transparent leading-relaxed scrollbar-hide"
                        ></textarea>
                     </div>
                  </div>

                  {/* Right Sidebar: Distribution & Settings */}
                  <div className="w-full lg:w-96 bg-gray-50 border-l border-gray-100 p-12 space-y-10">

                     {/* Target Audience */}
                     <div className="space-y-6">
                        <h3 className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-3">
                           <Target size={14} className="text-indigo-600" /> Distribusi Target
                        </h3>
                        <div className="space-y-3">
                           {['Aplikasi Petani', 'Aplikasi Pelanggan'].map(tag => (
                              <label key={tag} className="flex items-center gap-4 p-5 bg-white rounded-[6px] border border-gray-100 shadow-sm cursor-pointer hover:border-indigo-600 transition-all">
                                 <input type="checkbox" className="w-5 h-5 rounded-full accent-indigo-600 border-2 border-gray-200" />
                                 <span className="text-[10px] font-black uppercase text-neutral-900 tracking-tighter">{tag}</span>
                              </label>
                           ))}
                        </div>
                     </div>

                     {/* AgriVoice (Wow Factor) */}
                     <div className="bg-neutral-900 p-8 rounded-[6px] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute right-[-10%] bottom-[-10%] opacity-10 group-hover:scale-125 transition-transform duration-[4s]">
                           <Volume2 size={150} />
                        </div>
                        <div className="relative z-10 space-y-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-400 text-neutral-900 rounded-[6px] flex items-center justify-center">
                                 <Mic size={20} />
                              </div>
                              <h4 className="text-sm font-black uppercase tracking-tighter italic">AgriVoice AI</h4>
                           </div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed">Ubah teks menjadi Audio Podcast untuk membantu petani lansia di ladang.</p>
                           <button
                              onClick={() => setShowVoiceModal(true)}
                              className="w-full py-4 bg-white text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
                           >
                              Generate Audio
                           </button>
                        </div>
                     </div>

                     {/* Push Notification Toggle */}
                     <div className="p-8 bg-white rounded-[6px] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <Bell size={18} className="text-amber-500" />
                              <p className="text-[10px] font-black uppercase text-neutral-900">Push Alert</p>
                           </div>
                           <div className="w-10 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-white rounded-full translate-x-4"></div>
                           </div>
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase leading-relaxed italic">Kirim notifikasi lonceng ke seluruh pengguna yang ditargetkan.</p>
                     </div>

                     <button
                        onClick={() => { setViewMode('List'); }}
                        className="w-full py-6 bg-emerald-600 text-white rounded-[6px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-neutral-900 hover:-translate-y-1 transition-all"
                     >
                        Publish Sekarang
                     </button>
                  </div>
               </div>
            )}
         </section>

         {/* --- MODAL: AGRIVOICE PROCESSING --- */}
         {showVoiceModal && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 text-center">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setShowVoiceModal(false)}></div>
               <div className="bg-white w-full max-w-xl rounded-[6px] p-20 shadow-2xl relative z-10 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-neutral-100 text-neutral-900 rounded-[6px] flex items-center justify-center mx-auto mb-10 overflow-hidden relative">
                     <Activity size={40} className="animate-pulse" />
                     <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Synthesizing Voice...</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-4 mb-10">AgriVoice sedang mengubah teks artikel ke Audio Bahasa Indonesia (Natural)</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-12">
                     <div className="h-full bg-emerald-500 w-[65%] rounded-full animate-in slide-in-from-left duration-1000"></div>
                  </div>
                  <button onClick={() => setShowVoiceModal(false)} className="w-full py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl">Batalkan Sintesis</button>
               </div>
            </div>
         )}

      </div>
   );
};

export default AdminArticles;

const Target = ({ className, size }) => (
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
   </svg>
);





