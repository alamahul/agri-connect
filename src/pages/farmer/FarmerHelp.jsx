import React, { useState, useMemo } from 'react';
import {
   Search,
   Mic,
   ChevronDown,
   BookOpen,
   PlayCircle,
   MessageCircle,
   PhoneCall,
   Bot,
   Volume2,
   X,
   CheckCircle2,
   ShieldCheck,
   Zap,
   ArrowRight,
   UserCheck,
   Package,
   Clock,
   HelpCircle,
   Video,
   ExternalLink,
   Send
} from 'lucide-react';

const FAQS = [
   {
      q: 'Kapan uang saya bisa ditarik ke rekening?',
      a: 'Uang Anda aman di Brankas AgriConnect (Escrow). Uang akan otomatis masuk ke "Saldo Siap Tarik" maksimal 1x24 jam setelah pembeli menekan tombol "Pesanan Diterima".'
   },
   {
      q: 'Bagaimana kalau pembeli bohong bilang sayur busuk?',
      a: 'Jangan khawatir! Pembeli wajib melampirkan foto bukti. Tim Admin AgriConnect akan mengecek foto tersebut. Jika terbukti kesalahan ada pada kurir logistik, uang Anda tetap akan cair 100%. Ini adalah komitmen kami menjaga kejujuran di platform.'
   },
   {
      q: 'Cara mematikan toko saat sedang libur/gagal panen',
      a: 'Buka menu "Gudang Produk", lalu geser tombol hijau menjadi abu-abu (Off) pada produk Anda. Pembeli tidak akan bisa memesan sampai Anda menghidupkannya lagi. Sangat praktis untuk mengelola ekspektasi pelanggan.'
   },
   {
      q: 'Apa itu fitur "Obral Cepat" dan kapan harus dipakai?',
      a: 'Fitur ini membantu Anda menghabiskan stok yang sudah dipanen lebih dari 2 hari. Dengan diskon 20%, sistem akan memprioritaskan produk Anda ke pembeli terdekat agar tidak busuk sia-sia di gudang.'
   },
   {
      q: 'Berapa biaya layanan AgriConnect untuk petani?',
      a: 'Kami hanya memotong 2% dari total penjualan Anda untuk biaya pemeliharaan sistem dan asuransi keamanan Escrow. Tidak ada biaya pendaftaran atau iuran bulanan bagi petani mitra.'
   },
   {
      q: 'Bagaimana cara meningkatkan Rating & Bintang Toko?',
      a: 'Kuncinya adalah Kecepatan & Kejujuran. Pastikan foto produk sesuai aslinya, kemas pesanan dengan rapi (pakai koran/besek), dan balas chat pembeli dengan ramah.'
   },
   {
      q: 'Apakah saya bisa mengubah jadwal panen Pre-Order?',
      a: 'Bisa! Jika ada kendala cuaca, Anda bisa menggeser tanggal panen di menu Manajemen Pesanan. Sistem AgriBot akan otomatis mengirimkan pesan permintaan maaf dan jadwal baru ke pembeli.'
   },
   {
      q: 'Bagaimana jika kurir tidak datang menjemput?',
      a: 'Klik tombol "Panggil Ulang Kurir" di detail pesanan Anda. Jika dalam 30 menit belum ada respon, gunakan tombol "Jalur Darurat Admin" di bawah halaman ini untuk bantuan manual.'
   },
   {
      q: 'Dapatkan saya meminjam modal (KUR) lewat aplikasi?',
      a: 'AgriConnect bekerja sama dengan bank mitra. Anda bisa mengunduh "Laporan Bulanan" di menu Analisis sebagai syarat lampiran pengajuan modal (KUR) yang sudah terverifikasi sistem.'
   }
];

const VIDEOS = [
   { id: 1, title: 'Cara Packing Tomat Agar Tidak Pecah', duration: '1:45', thumb: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
   { id: 2, title: 'Menentukan Harga Jual Bebas Tengkulak', duration: '2:30', thumb: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400' },
   { id: 3, title: 'Penjelasan Sistem Panen Besok', duration: '3:15', thumb: 'https://plus.unsplash.com/premium_photo-1669122521521-ec56bb491405?q=80&w=400' }
];

const FarmerHelp = () => {
   const [activeAccordion, setActiveAccordion] = useState(null);
   const [isAgriBotOpen, setIsAgriBotOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [isRecording, setIsRecording] = useState(false);
   const [messages, setMessages] = useState([
      { role: 'bot', text: 'Halo Pak Budi, ada yang bisa AgriBot bantu? Ketik masalah Anda atau gunakan tombol suara.' }
   ]);
   const [inputValue, setInputValue] = useState('');

   const toggleAccordion = (index) => {
      setActiveAccordion(activeAccordion === index ? null : index);
   };

   const handleVoiceSearch = () => {
      setIsRecording(true);
      setTimeout(() => {
         setIsRecording(false);
         setSearchQuery('Cara tarik uang jualan');
      }, 2000);
   };

   const filteredFaqs = useMemo(() => {
      return FAQS.filter(faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()));
   }, [searchQuery]);

   const handleSendMessage = () => {
      if (!inputValue.trim()) return;
      const newMessages = [...messages, { role: 'user', text: inputValue }];
      setMessages(newMessages);
      setInputValue('');

      setTimeout(() => {
         setMessages(prev => [...prev, {
            role: 'bot',
            text: 'Informasi diterima. Tim Kami sedang mengecek kendala tersebut. Silakan tunggu update di notifikasi ya Pak!'
         }]);
      }, 1000);
   };

   const handleContactSupport = (type) => {
      alert(`Menghubungkan ke ${type} Admin AgriConnect... (Simulasi)`);
   };

   return (
      <div className="space-y-12 pb-32 animate-in fade-in duration-500">

         {/* 1. Header & Voice Search Sections */}
         <section className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-xl flex flex-col items-center text-center space-y-8 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
            <div className="absolute left-0 bottom-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl"></div>

            <div className="space-y-3 relative z-10">
               <h1 className="text-4xl font-black text-neutral-900 tracking-tighter uppercase">Halo Pak Budi! ☀</h1>
               <p className="text-gray-500 font-medium">Temukan jawaban atau bicara langsung dengan pendamping AgriConnect.</p>
            </div>

            <div className="w-full max-w-2xl relative flex items-center gap-4 z-10">
               <div className="relative flex-1">
                  <input
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Cari solusi kendala Anda..."
                     className="w-full pl-16 pr-6 py-6 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold focus:ring-4 focus:ring-emerald-400/20 focus:bg-white outline-none transition-all shadow-inner"
                  />
               </div>
               <button
                  onClick={handleVoiceSearch}
                  className={`w-16 h-16 rounded-[6px] flex items-center justify-center shadow-xl transition-all active:scale-95 group ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200'}`}
               >
                  <Mic size={28} className="text-white group-hover:scale-110 transition-transform" />
               </button>
            </div>
            {isRecording && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-bounce">Mendengarkan suara Bapak...</p>}
         </section>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 2. Buku Saku Petani (User Guide) */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-neutral-900 text-amber-400 rounded-[6px] shadow-lg">
                        <BookOpen size={24} />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Buku Saku Petani</h2>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Panduan Cepat & FAQ</p>
                     </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-tight">
                     <ShieldCheck size={12} className="text-emerald-500" /> Terverifikasi
                  </div>
               </div>

               <div className="space-y-4">
                  {filteredFaqs.length > 0 ? filteredFaqs.map((faq, i) => (
                     <div key={i} className="bg-white rounded-[6px] border border-gray-100 shadow-sm overflow-hidden group hover:border-emerald-200 transition-colors">
                        <button
                           onClick={() => toggleAccordion(i)}
                           className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                        >
                           <div className="flex items-center gap-4">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${activeAccordion === i ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                 {i + 1}
                              </span>
                              <span className="text-sm font-black text-neutral-900 uppercase text-left tracking-tight">{faq.q}</span>
                           </div>
                           <ChevronDown size={20} className={`text-gray-300 transition-transform duration-300 ${activeAccordion === i ? 'rotate-180 text-emerald-500' : ''}`} />
                        </button>
                        {activeAccordion === i && (
                           <div className="px-8 pb-8 transition-all animate-in slide-in-from-top-4 duration-300">
                              <div className="h-px bg-gray-50 mb-6 mx-2"></div>
                              <div className="flex gap-4">
                                 <div className="w-1.5 h-auto bg-emerald-500 rounded-full shrink-0"></div>
                                 <div className="space-y-4">
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{faq.a}</p>
                                    <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                                       Lihat Detail Panduan <ArrowRight size={14} />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  )) : (
                     <div className="py-20 text-center bg-gray-50/50 rounded-[6px] border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Pencarian Tidak Ditemukan</p>
                     </div>
                  )}
               </div>
            </div>

            {/* 3. Pojok Belajar (Video Tutorials) */}
            <div className="space-y-6">
               <div className="flex items-center gap-4 px-4">
                  <div className="p-3 bg-amber-400 text-neutral-900 rounded-[6px] shadow-lg">
                     <Video size={24} />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Pojok Belajar</h2>
                     <p className="text-[10px] text-gray-400 font-bold italic uppercase tracking-widest">Video Tutorial</p>
                  </div>
               </div>

               <div className="space-y-4">
                  {VIDEOS.map((video) => (
                     <div key={video.id} className="bg-white p-4 rounded-[6px] border border-gray-100 shadow-sm group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                        <div className="relative aspect-video rounded-[6px] overflow-hidden mb-4">
                           <img src={video.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                           <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors flex items-center justify-center">
                              <PlayCircle size={48} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                           </div>
                           <span className="absolute bottom-3 right-3 bg-neutral-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-[6px] text-[10px] font-black uppercase tracking-widest">{video.duration}</span>
                        </div>
                        <h4 className="text-sm font-black text-neutral-900 uppercase group-hover:text-emerald-600 transition-colors tracking-tight">{video.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tutorial Singkat</p>
                           <ExternalLink size={12} className="text-gray-300 group-hover:text-neutral-900" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* 5. Hubungi Admin (Jalur Cepat) */}
         <section className="bg-emerald-100/50 rounded-[6px] border-4 border-white shadow-xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 group">
            <div className="flex gap-6 items-center">
               <div className="w-20 h-20 bg-white rounded-[6px] flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-100 group-hover:scale-110 transition-transform">
                  <PhoneCall size={36} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">Jalur Darurat Admin</h3>
                  <p className="text-emerald-700 font-medium">Klik untuk bicara langsung dengan pendamping AgriConnect.</p>
               </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <button
                  onClick={() => handleContactSupport('WhatsApp')}
                  className="bg-white border-2 border-emerald-500 text-emerald-600 px-8 py-5 rounded-[6px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all shadow-lg active:scale-95"
               >
                  <MessageCircle size={18} /> Chat WhatsApp
               </button>
               <button
                  onClick={() => handleContactSupport('Telepon')}
                  className="bg-neutral-900 text-white px-8 py-5 rounded-[6px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95"
               >
                  <PhoneCall size={18} /> Telepon Langsung
               </button>
            </div>
         </section>

         {/* 4. AgriBot Khusus Petani (Floating Assistant) */}
         <div className="fixed bottom-10 right-10 z-[100]">
            <button
               onClick={() => setIsAgriBotOpen(!isAgriBotOpen)}
               className={`w-20 h-20 rounded-[6px] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 relative ${isAgriBotOpen ? 'bg-red-500' : 'bg-neutral-900'}`}
            >
               {isAgriBotOpen ? <X size={32} className="text-white" /> : <Bot size={40} className="text-amber-400" />}
               {!isAgriBotOpen && (
                  <div className="absolute -top-1 -right-1 bg-emerald-500 px-2 py-1 rounded-[6px] text-[8px] font-black text-white shadow-lg animate-bounce uppercase tracking-tighter">Bantuan AI</div>
               )}
            </button>

            {isAgriBotOpen && (
               <div className="absolute bottom-24 right-0 w-[400px] h-[550px] bg-white rounded-[6px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                  {/* Chat Header */}
                  <div className="bg-neutral-900 p-8 flex items-center gap-4 border-b border-amber-400/20">
                     <div className="w-12 h-12 bg-amber-400 rounded-[6px] flex items-center justify-center text-neutral-900 shadow-lg">
                        <Bot size={24} />
                     </div>
                     <div>
                        <h4 className="text-white font-black uppercase text-sm tracking-widest">AgriBot Penyuluh</h4>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Online Siap Bantu</p>
                        </div>
                     </div>
                  </div>

                  {/* Chat Content */}
                  <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-gray-50/30">
                     {messages.map((m, idx) => (
                        <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-[85%] p-4 rounded-[6px] text-sm shadow-sm ${m.role === 'user' ? 'bg-emerald-500 text-white font-bold' : 'bg-white border border-gray-100 text-gray-600'}`}>
                              {m.text}
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-8 bg-white border-t border-gray-100">
                     <div className="flex gap-3">
                        <input
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                           placeholder="Tulis pesan..."
                           className="flex-1 bg-gray-50 border border-transparent rounded-[6px] px-6 py-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-inner"
                        />
                        <button
                           onClick={handleSendMessage}
                           className="w-14 h-14 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-xl active:scale-95 hover:bg-black transition-colors"
                        >
                           <Send size={18} />
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>

      </div>
   );
};

export default FarmerHelp;
