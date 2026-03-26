import React, { useState, useEffect } from 'react';
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
   Activity,
   Save,
   RotateCcw,
   Play,
   Pause,
   VolumeX,
   CheckCircle
} from 'lucide-react';

const AdminArticles = () => {
   const [viewMode, setViewMode] = useState('List'); // 'List' or 'Editor'
   const [showVoiceModal, setShowVoiceModal] = useState(false);
   const [voiceState, setVoiceState] = useState('processing'); // 'processing' or 'ready'
   const [activeTab, setActiveTab] = useState('Published');
   const [searchQuery, setSearchQuery] = useState('');
   const [toast, setToast] = useState(null);

   // Editor State
   const [editorId, setEditorId] = useState(null);
   const [editorTitle, setEditorTitle] = useState('');
   const [editorContent, setEditorContent] = useState('');
   const [editorCategory, setEditorCategory] = useState('Customer App');

   const [articles, setArticles] = useState([
      { id: 1, title: 'Cara Menyimpan Tomat agar Tidak Cepat Busuk', views: 5200, category: 'Customer App', impact: 45, date: '22 Mar 2026', status: 'Published' },
      { id: 2, title: 'Tips Menghadapi Hama Wereng pada Padi', views: 3100, category: 'Farmer App', impact: 120, date: '21 Mar 2026', status: 'Published' },
      { id: 3, title: 'Resep Jus Tomat Sehat untuk Imunitas', views: 1500, category: 'Customer App', impact: 88, date: '20 Mar 2026', status: 'Draft' },
      { id: 4, title: 'Update Harga Cabai Nasional Minggu Ini', views: 8900, category: 'Farmer App', impact: 0, date: '19 Mar 2026', status: 'Published' },
   ]);

   const topics = [
      { title: 'Hama Wereng', count: 150, type: 'Farmer Search' },
      { title: 'Cara Daftarkan Lahan', count: 85, type: 'Farmer Search' },
      { title: 'Olahan Terong', count: 210, type: 'Customer Search' },
   ];

   const showNotification = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
   };

   const filteredArticles = articles.filter(art => {
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = art.status === activeTab;
      return matchesSearch && matchesTab;
   });

   const handleDelete = (id) => {
      setArticles(prev => prev.filter(art => art.id !== id));
      showNotification("Artikel berhasil dihapus!");
   };

   const handleEdit = (art) => {
      setEditorId(art.id);
      setEditorTitle(art.title);
      setEditorContent("Ini adalah konten pre-saved untuk artikel: " + art.title + ". Dalam sistem nyata, ini akan mengambil data dari database.");
      setEditorCategory(art.category);
      setViewMode('Editor');
   };

   const handlePublish = () => {
      if (!editorTitle) return showNotification("Judul tidak boleh kosong!");

      const newArt = {
         id: editorId || Date.now(),
         title: editorTitle,
         views: editorId ? articles.find(a => a.id === editorId).views : 0,
         category: editorCategory,
         impact: editorId ? articles.find(a => a.id === editorId).impact : 0,
         date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
         status: 'Published'
      };

      if (editorId) {
         setArticles(prev => prev.map(a => a.id === editorId ? newArt : a));
         showNotification("Artikel berhasil diupdate!");
      } else {
         setArticles(prev => [newArt, ...prev]);
         showNotification("Artikel baru dipublikasikan!");
      }

      setViewMode('List');
      resetEditor();
   };

   const resetEditor = () => {
      setEditorId(null);
      setEditorTitle('');
      setEditorContent('');
      setEditorCategory('Customer App');
   };

   const generateAIContent = () => {
      const aiText = "\n\n[REKOMENDASI AI AGRIBOT]\nBerdasarkan data cuaca di Jawa Barat minggu depan, disarankan untuk menyemprotkan pestisida alami pada pagi hari. Pastikan kelembaban tanah tetap di angka 60% untuk hasil panen yang optimal. Petani Lembang telah melaporkan kenaikan hasil 15% dengan metode ini.";
      setEditorContent(prev => prev + aiText);
      showNotification("AI Co-Writer menambahkan rekomendasi!");
   };

   const startVoiceSynthesis = () => {
      setVoiceState('processing');
      setShowVoiceModal(true);
      setTimeout(() => {
         setVoiceState('ready');
      }, 3000);
   };

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500 relative">

         {/* Toast Notification */}
         {toast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 border-2 border-emerald-400 text-white px-8 py-4 rounded-[6px] shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-10">
               <ShieldCheck className="text-emerald-400" size={24} />
               <p className="text-xs font-black uppercase tracking-widest">{toast}</p>
            </div>
         )}

         {/* 1. Header & AI Radar (Trend Analyzer) */}
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl flex flex-col md:flex-row gap-8 items-center group">
               <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-neutral-200 group-hover:rotate-12 transition-transform">
                        <BarChart3 size={24} />
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Konten Performa</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Real-time Impact Analytics</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-100 hover:bg-white transition-all hover:shadow-lg">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Total Pembaca</p>
                        <p className="text-2xl font-black text-neutral-900 tracking-tighter">18.7K <TrendingUp size={14} className="inline text-emerald-500 ml-1" /></p>
                     </div>
                     <div className="p-4 bg-gray-50 rounded-[6px] border border-gray-100 hover:bg-white transition-all hover:shadow-lg">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Avg. Conversion</p>
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
                        <div key={i} className="bg-white/40 p-3 rounded-[6px] border border-white/20 flex justify-between items-center backdrop-blur-sm group/item hover:bg-white transition-all">
                           <div>
                              <p className="text-[9px] font-black uppercase text-neutral-900">{t.title}</p>
                              <p className="text-[7px] font-bold opacity-60 uppercase">Pencarian Gagal: {t.count}</p>
                           </div>
                           <button
                              onClick={() => { resetEditor(); setEditorTitle(t.title); setViewMode('Editor'); }}
                              className="p-2 bg-neutral-900 text-white rounded-[6px] shadow-xl hover:scale-110 active:scale-95 transition-all"
                           >
                              <Plus size={12} />
                           </button>
                        </div>
                     ))}
                  </div>

                  <p className="text-[8px] font-bold text-neutral-900 uppercase leading-relaxed max-w-[200px] italic">
                     💡 150 petani mencari <span className="underline decoration-neutral-900 underline-offset-4 font-black">Hama Wereng</span> minggu ini. Buat panduannya sekarang!
                  </p>
               </div>
            </div>
         </section>

         {/* 2. Main Content Module */}
         <section className="bg-white rounded-[6px] border border-gray-100 shadow-2xl overflow-hidden min-h-[800px] animate-in slide-in-from-bottom-10 duration-700">

            {/* CMS Toolbar */}
            <div className="p-4 border-b border-gray-50 flex flex-col lg:flex-row items-center justify-between bg-gray-50/50 gap-4">
               <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
                  {['Published', 'Draft', 'Archived'].map(tab => (
                     <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setViewMode('List'); }}
                        className={`px-8 py-4 rounded-[6px] text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-neutral-900 text-white shadow-xl' : 'text-gray-400 hover:text-neutral-900'}`}
                     >
                        {tab} ({articles.filter(a => a.status === tab).length})
                     </button>
                  ))}
               </div>

               <div className="flex items-center gap-4 w-full lg:w-auto">
                  <div className="relative group flex-1 lg:flex-none">
                     <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari Judul..."
                        className="pl-14 pr-8 h-[55px] bg-white border border-gray-100 rounded-[6px] text-[10px] font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all w-full lg:w-64"
                     />
                  </div>

                  {viewMode === 'List' ? (
                     <button
                        onClick={() => { resetEditor(); setViewMode('Editor'); }}
                        className="flex items-center gap-3 px-8 h-[55px] bg-emerald-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl whitespace-nowrap"
                     >
                        <Plus size={16} /> Artikel Baru
                     </button>
                  ) : (
                     <button
                        onClick={() => setViewMode('List')}
                        className="flex items-center gap-3 px-8 h-[55px] bg-white border border-gray-100 text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm whitespace-nowrap"
                     >
                        <X size={16} /> Batal
                     </button>
                  )}
               </div>
            </div>

            {viewMode === 'List' ? (
               /* CMS LIST VIEW */
               <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 gap-6">
                     {filteredArticles.map((art, i) => (
                        <div key={i} className="group bg-white p-6 lg:p-8 rounded-[6px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col lg:flex-row items-center justify-between gap-8 cursor-pointer relative overflow-hidden">
                           <div className="flex items-center gap-8 flex-1 w-full">
                              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-50 rounded-[6px] flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all transform group-hover:rotate-12 duration-500 shadow-inner shrink-0">
                                 <FileText size={art.title.length > 30 ? 24 : 32} />
                              </div>
                              <div className="flex-1">
                                 <div className="flex items-center gap-4 mb-2">
                                    <span className={`px-3 py-1 text-[8px] font-black uppercase rounded-[6px] tracking-widest ${art.category.includes('Farmer') ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>{art.category}</span>
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">{art.date}</span>
                                 </div>
                                 <h3 className="text-base lg:text-lg font-black text-neutral-900 uppercase tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">{art.title}</h3>
                                 <div className="flex items-center gap-6 mt-4">
                                    <div className="flex items-center gap-2">
                                       <Eye size={12} className="text-gray-300" />
                                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{art.views.toLocaleString()} Views</p>
                                    </div>
                                    <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                    <div className="flex items-center gap-2">
                                       <ShoppingCart size={12} className="text-emerald-500" />
                                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{art.impact} Transaksi</p>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all lg:translate-x-10 lg:group-hover:translate-x-0 duration-500 w-full lg:w-auto justify-end">
                              <button onClick={() => handleEdit(art)} className="p-4 bg-white shadow-xl rounded-[6px] text-neutral-400 hover:text-indigo-600 hover:shadow-indigo-100 transition-all border border-gray-50"><Edit3 size={18} /></button>
                              <button onClick={() => handleDelete(art.id)} className="p-4 bg-white shadow-xl rounded-[6px] text-neutral-400 hover:text-red-500 hover:shadow-red-100 transition-all border border-gray-50"><Trash2 size={18} /></button>
                              <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-2xl">
                                 <ChevronRight size={20} />
                              </div>
                           </div>
                        </div>
                     ))}
                     {filteredArticles.length === 0 && (
                        <div className="p-20 text-center text-gray-400 font-black uppercase tracking-widest italic text-sm">Tidak ada artikel ditemukan di tab ini.</div>
                     )}
                  </div>
               </div>
            ) : (
               /* AI SMART EDITOR VIEW */
               <div className="flex flex-col lg:flex-row h-full min-h-[800px] animate-in zoom-in-95 duration-500">

                  {/* Main Writing Area */}
                  <div className="flex-1 p-8 lg:p-24 bg-white overflow-y-auto max-h-[8000px] scrollbar-hide">
                     <div className="max-w-3xl mx-auto space-y-12">
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <span className="px-4 py-1.5 bg-neutral-900 text-white text-[9px] font-black uppercase tracking-widest rounded-[6px]">{editorId ? 'Editing' : 'New Draft'}</span>
                              <span className="text-[9px] font-black text-gray-300 uppercase italic">Status: Menunggu Publikasi</span>
                           </div>
                           <input
                              value={editorTitle}
                              onChange={(e) => setEditorTitle(e.target.value)}
                              type="text"
                              placeholder="Ketik Judul Artikel Disini..."
                              className="w-full text-4xl lg:text-5xl font-black text-neutral-900 uppercase tracking-tighter outline-none placeholder:text-gray-100 border-none bg-transparent leading-none italic"
                           />
                        </div>

                        <div className="flex items-center gap-4 md:gap-6 border-y border-gray-50 py-6 overflow-x-auto scrollbar-hide">
                           <button className="p-3 bg-gray-50 rounded-[6px] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shrink-0"><ImageIcon size={18} /></button>
                           <button className="p-3 bg-gray-50 rounded-[6px] text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all shrink-0"><Youtube size={18} /></button>
                           <button className="p-3 bg-emerald-50 text-emerald-600 rounded-[6px] hover:bg-emerald-600 hover:text-white transition-all italic font-black text-[9px] px-6 shrink-0">ADD PRODUCT LINK</button>
                           <div className="w-px h-8 bg-gray-100 shrink-0"></div>
                           <button
                              onClick={generateAIContent}
                              className="p-3 bg-indigo-50 text-indigo-600 rounded-[6px] flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all font-black text-[9px] px-6 shrink-0"
                           >
                              <Bot size={14} /> CO-WRITER AI
                           </button>
                        </div>

                        <textarea
                           value={editorContent}
                           onChange={(e) => setEditorContent(e.target.value)}
                           placeholder="Klik di sini untuk mulai menulis cerita sukses pertanian..."
                           className="w-full min-h-[600px] text-lg font-medium text-neutral-600 outline-none border-none bg-transparent leading-relaxed scrollbar-hide resize-none"
                        ></textarea>
                     </div>
                  </div>

                  {/* Right Sidebar: Distribution & Settings */}
                  <div className="w-full lg:w-96 bg-gray-50 border-l border-gray-100 p-8 lg:p-12 space-y-10">

                     {/* Target Audience */}
                     <div className="space-y-6">
                        <h3 className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-3 italic">
                           <Layout size={14} className="text-indigo-600" /> Kategori & Target
                        </h3>
                        <div className="space-y-3">
                           {['Aplikasi Petani', 'Aplikasi Pelanggan'].map(tag => (
                              <label key={tag} className="flex items-center gap-4 p-5 bg-white rounded-[6px] border border-gray-100 shadow-sm cursor-pointer hover:border-indigo-600 hover:scale-105 transition-all">
                                 <input
                                    type="radio"
                                    name="category"
                                    checked={editorCategory === (tag === 'Aplikasi Petani' ? 'Farmer App' : 'Customer App')}
                                    onChange={() => setEditorCategory(tag === 'Aplikasi Petani' ? 'Farmer App' : 'Customer App')}
                                    className="w-5 h-5 accent-indigo-600"
                                 />
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
                              <div className="w-10 h-10 bg-emerald-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-lg">
                                 <Mic size={20} />
                              </div>
                              <h4 className="text-sm font-black uppercase tracking-tighter italic">AgriVoice AI</h4>
                           </div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed opacity-80">Konversi teks ke Podcast untuk membantu petani lansia di ladang.</p>
                           <button
                              onClick={startVoiceSynthesis}
                              className="w-full py-4 bg-white text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 hover:scale-105 transition-all shadow-xl"
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

                     <div className="space-y-4 pt-6">
                        <button
                           onClick={handlePublish}
                           className="w-full py-6 bg-emerald-600 text-white rounded-[6px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-neutral-900 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                        >
                           <CheckCircle size={18} /> Publish Sekarang
                        </button>
                        <button
                           onClick={() => { setActiveTab('Draft'); handlePublish(); }}
                           className="w-full py-4 bg-white text-neutral-900 border border-gray-100 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                        >
                           <Save size={14} /> Simpan Draft
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </section>

         {/* --- MODAL: AGRIVOICE PROCESSING --- */}
         {showVoiceModal && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 text-center">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setShowVoiceModal(false)}></div>
               <div className="bg-white w-full max-w-xl rounded-[6px] p-10 lg:p-20 shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 overflow-hidden">

                  {voiceState === 'processing' ? (
                     <div className="animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-neutral-100 text-neutral-900 rounded-[6px] flex items-center justify-center mx-auto mb-10 overflow-hidden relative">
                           <Activity size={40} className="animate-pulse" />
                           <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Synthesizing Voice...</h3>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-4 mb-10">AgriVoice sedang mengubah teks artikel ke Audio Bahasa Indonesia (Natural)</p>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-12">
                           <div className="h-full bg-emerald-500 w-[75%] rounded-full animate-in slide-in-from-left duration-[3000ms]"></div>
                        </div>
                        <button onClick={() => setShowVoiceModal(false)} className="w-full py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl">Batalkan Sintesis</button>
                     </div>
                  ) : (
                     <div className="animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[6px] flex items-center justify-center mx-auto mb-6 shadow-xl">
                           <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Audio Podcast Ready!</h3>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-4">Konten audio berhasil di-generate dan siap disematkan.</p>

                        {/* Audio Waveform UI */}
                        <div className="bg-gray-50 p-6 rounded-[6px] border border-gray-100 my-8 flex items-center gap-4">
                           <button className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                              <Play size={20} fill="currentColor" />
                           </button>
                           <div className="flex-1 h-8 flex items-end gap-1 px-4">
                              {[30, 70, 45, 90, 60, 40, 80, 50, 65, 30, 50, 75, 40, 85, 95, 40, 60, 30, 70, 50, 40].map((h, i) => (
                                 <div key={i} className="flex-1 bg-emerald-500/30 rounded-full group hover:bg-emerald-500 transition-all" style={{ height: `${h}%` }}></div>
                              ))}
                           </div>
                           <p className="text-[9px] font-black text-neutral-400">03:45</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <button onClick={() => setShowVoiceModal(false)} className="py-4 bg-emerald-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-neutral-900 transition-all">Sematkan Audio</button>
                           <button onClick={() => setShowVoiceModal(false)} className="py-4 bg-gray-50 text-neutral-400 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">Hapus</button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         )}

      </div>
   );
};

export default AdminArticles;
