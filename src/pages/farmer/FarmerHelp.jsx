import React, { useState } from 'react';
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
   ExternalLink
} from 'lucide-react';

const FarmerHelp = () => {
   const [activeAccordion, setActiveAccordion] = useState(null);
   const [isAgriBotOpen, setIsAgriBotOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [isRecording, setIsRecording] = useState(false);

   const toggleAccordion = (index) => {
      setActiveAccordion(activeAccordion === index ? null : index);
   };

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
      { id: 3, title: 'Penjelasan Sistem Panen Besok', duration: '3:15', thumb: 'https://images.unsplash.com/photo-1523348830342-d0187cf0c283?w=400' }
   ];

   const handleVoiceSearch = () => {
      setIsRecording(true);
      setTimeout(() => {
         setIsRecording(false);
         setSearchQuery('Cara tarik uang jualan');
      }, 2000);
   };

   return (
      <div className="space-y-12 pb-32 animate-in fade-in duration-500">

         {/* 1. Header & Voice Search Sections */}
         <section className="bg-white p-10 rounded-[6px] border border-gray-100 shadow-xl flex flex-col items-center text-center space-y-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="space-y-2">
               <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">Halo Pak Budi! ☀ </h1>
               <p className="text-gray-500 font-medium">Ada yang bisa AgriConnect bantu hari ini?</p>
            </div>

            <div className="w-full max-w-2xl relative flex items-center gap-4">
               <div className="relative flex-1">
                  <input
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Ketik kendala Anda di sini..."
                     className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold focus:ring-2 focus:ring-emerald-400 outline-none transition-all"
                  />
               </div>
               <button
                  onClick={handleVoiceSearch}
                  className={`w-16 h-16 rounded-[6px] flex items-center justify-center shadow-xl transition-all active:scale-95 group ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 hover:bg-emerald-600'}`}
               >
                  <Mic size={28} className="text-white group-hover:scale-110 transition-transform" />
               </button>
            </div>
            {isRecording && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-bounce">Mendengarkan suara Anda...</p>}
         </section>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 2. Buku Saku Petani (User Guide) */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center gap-4 px-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-[6px] shadow-sm">
                     <BookOpen size={24} />
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Buku Saku Petani</h2>
                     <p className="text-sm text-gray-400 font-medium italic">Panduan paling sering ditanyakan Bapak/Ibu Petani.</p>
                  </div>
               </div>

               <div className="space-y-4">
                  {FAQS.map((faq, i) => (
                     <div key={i} className="bg-white rounded-[6px] border border-gray-100 shadow-sm overflow-hidden group">
                        <button
                           onClick={() => toggleAccordion(i)}
                           className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                        >
                           <span className="text-sm font-black text-neutral-900 uppercase text-left">{faq.q}</span>
                           <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${activeAccordion === i ? 'rotate-180' : ''}`} />
                        </button>
                        {activeAccordion === i && (
                           <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                              <div className="h-px bg-gray-100 mb-6"></div>
                              <p className="text-sm text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                              <div className="mt-6 flex gap-2">
                                 <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-[6px] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                    <CheckCircle2 size={12} /> Terverifikasi Tim Admin
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>

            {/* 3. Pojok Belajar (Video Tutorials) */}
            <div className="space-y-6">
               <div className="flex items-center gap-4 px-4">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-[6px] shadow-sm">
                     <Video size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Pojok Belajar</h2>
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
                        <h4 className="text-sm font-black text-neutral-900 uppercase group-hover:text-emerald-600 transition-colors">{video.title}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Tutorial Singkat</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* 5. Hubungi Admin (Jalur Cepat) */}
         <section className="bg-emerald-50 rounded-[6px] border-2 border-dashed border-emerald-200 p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-emerald-400 transition-colors">
            <div className="flex gap-6 items-center">
               <div className="w-20 h-20 bg-white rounded-[6px] flex items-center justify-center text-emerald-500 shadow-xl shadow-emerald-200 group-hover:rotate-6 transition-transform">
                  <PhoneCall size={40} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-neutral-900 uppercase">Jalur Darurat Admin</h3>
                  <p className="text-emerald-700 font-medium">Bicara langsung dengan manusia jika AI tidak bisa membantu.</p>
               </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
               <button className="bg-white border-2 border-emerald-500 text-emerald-600 px-8 py-5 rounded-[6px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
                  <MessageCircle size={18} /> Chat WhatsApp
               </button>
               <button className="bg-neutral-900 text-white px-8 py-5 rounded-[6px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-neutral-200">
                  <PhoneCall size={18} /> Telepon Langsung
               </button>
            </div>
         </section>

         {/* 4. AgriBot Khusus Petani (Floating Assistant) */}
         <div className="fixed bottom-8 right-8 z-[100]">
            <button
               onClick={() => setIsAgriBotOpen(!isAgriBotOpen)}
               className={`w-20 h-20 rounded-[6px] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 relative ${isAgriBotOpen ? 'bg-red-500' : 'bg-neutral-900'}`}
            >
               {isAgriBotOpen ? <X size={32} className="text-white" /> : <Bot size={40} className="text-amber-400" />}
               {!isAgriBotOpen && (
                  <div className="absolute -top-1 -right-1 bg-emerald-500 px-2 py-1 rounded-[6px] text-[8px] font-black text-white shadow-lg animate-bounce uppercase tracking-tighter">Penyuluh AI</div>
               )}
            </button>

            {isAgriBotOpen && (
               <div className="absolute bottom-24 right-0 w-[400px] h-[550px] bg-white rounded-[6px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                  {/* Chat Header */}
                  <div className="bg-neutral-900 p-8 flex items-center gap-4">
                     <div className="w-14 h-14 bg-amber-400 rounded-[6px] flex items-center justify-center text-neutral-900 shadow-lg">
                        <Bot size={28} />
                     </div>
                     <div>
                        <h4 className="text-white font-black uppercase tracking-tighter">AgriBot Penyuluh</h4>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Siap Membantu 24/7</p>
                        </div>
                     </div>
                  </div>

                  {/* Chat Content */}
                  <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-gray-50/30">
                     <div className="bg-white p-5 rounded-[6px] shadow-sm border border-gray-100 italic text-sm text-gray-600">
                        "Halo Pak Budi, ada kendala teknis aplikasi, atau Bapak ingin tanya soal tren harga pasar hari ini?"
                     </div>
                     <div className="flex justify-end">
                        <div className="bg-emerald-500 text-white p-5 rounded-[6px] shadow-lg shadow-emerald-200 text-sm font-bold flex items-center gap-3">
                           <Volume2 size={16} /> [Voice Note Sent]
                        </div>
                     </div>
                     <div className="bg-white p-5 rounded-[6px] shadow-sm border border-gray-100 text-sm text-gray-600">
                        <span className="font-black text-neutral-900 block mb-1">AGRIBOT:</span>
                        "Kurir atas nama <span className="text-emerald-600 font-black uppercase">Jajang</span> sedang dalam perjalanan menuju lokasi Anda. Estimasi tiba dalam <span className="font-black">15 menit lagi</span>."
                     </div>
                  </div>

                  {/* Chat Input */}
                  <div className="p-8 bg-white border-t border-gray-100">
                     <div className="flex gap-4">
                        <button className="w-14 h-14 bg-gray-100 text-gray-400 rounded-[6px] flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                           <Mic size={24} />
                        </button>
                        <input placeholder="Tulis pesan..." className="flex-1 bg-gray-50 border border-transparent rounded-[6px] px-6 py-4 text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-inner" />
                        <button className="w-14 h-14 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-xl active:scale-95">
                           <ArrowRight size={20} />
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





