import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  RotateCcw,
  MapPin,
  AlertTriangle,
  MessageSquare,
  X,
  Send,
  Search,
  Truck,
  Wallet,
  UserCheck,
  ShieldCheck,
  Camera,
  CheckCircle,
  Mail,
  ChevronRight,
  Bot
} from 'lucide-react';

const USER_GUIDE = [
  {
    id: 'escrow',
    q: "A. Cara Kerja Sistem Escrow (Rekening Bersama)",
    a: "Uang Anda tidak langsung diberikan ke petani. AgriConnect menahan dana Anda dengan aman dalam sistem rekening bersama. Dana baru dicairkan ke petani SETELAH Anda menekan tombol 'Pesanan Diterima' dan memastikan hasil panen dalam kondisi segar. Jika ada masalah, dana tetap diam di sistem sampai mediasi selesai."
  },
  {
    id: 'refund',
    q: "B. Prosedur Komplain & Uang Kembali (Refund)",
    a: "Jika hasil panen layu atau rusak saat tiba: 1) JANGAN tekan tombol 'Diterima'. 2) Ambil foto produk yang rusak. 3) Tekan tombol 'Komplain/Retur' pada menu Pesananku. Dana Anda di sistem Escrow akan otomatis dikembalikan 100% setelah divalidasi oleh tim admin kami."
  },
  {
    id: 'address',
    q: "C. Panduan Mengubah Alamat Pengiriman",
    a: "Masuk ke menu Pengaturan > Daftar Alamat > Klik 'Tambah Alamat Baru' atau pilih alamat yang sudah ada untuk diubah. Anda bisa menggeser pin di peta untuk memastikan lokasi pengantaran yang sangat presisi bagi kurir kami."
  },
  {
    id: 'preorder',
    q: "D. Cara Menggunakan Fitur 'Panen Besok'",
    a: "Pilih produk berlogo 'Panen Besok' di dashboard. Lakukan pembayaran (DP atau Lunas) seperti biasa. Sistem kami akan mengirimkan pengingat H-1 sebelum petani memanen pesanan Anda agar Anda siap menerima kesegaran langsung dari kebun."
  }
];

const SEARCH_SUGGESTIONS = [
  "Sayur layu saat sampai",
  "Cara ganti alamat utama",
  "Kapan dana masuk ke petani?",
  "Cara refund uang muka (DP)",
  "Ubah jadwal pengiriman"
];

const CustomerHelp = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [chatMsgs, setChatMsgs] = useState([
    { sender: 'bot', text: 'Halo! Saya AgriBot. Apakah panduan di atas sudah menjawab pertanyaan Anda? Atau Anda butuh bantuan langsung membatalkan pesanan/melacak barang?' }
  ]);

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-500">

      {/* 1. Header & Smart Search (Hero Section) */}
      <section className="text-center space-y-8 bg-gradient-to-b from-white to-gray-50/50 p-10 rounded-[6px] border border-gray-100 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">Ada yang bisa kami bantu hari ini, <span className="text-amber-500 uppercase tracking-tighter">Siti Aminah</span>?</h1>
          <p className="text-gray-500 font-medium">Temukan solusi cepat untuk kenyamanan belanja hasil panen Anda.</p>
        </div>

        <div className="max-w-2xl mx-auto relative group">
          <input
            type="text"
            placeholder="Ketik kendala Anda (misal: 'sayur layu', 'uang kembali')..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
            className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-neutral-100 outline-none focus:ring-2 focus:ring-amber-400 transition-all text-sm font-medium"
          />

          {/* Auto-complete Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full left-0 w-full mt-3 bg-white rounded-3xl shadow-2xl border border-gray-50 z-30 p-4 animate-in zoom-in-95 duration-200">
              <div className="space-y-1">
                {SEARCH_SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchQuery(s);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-amber-50 rounded-2xl flex items-center justify-between group transition-colors"
                  >
                    <span className="text-sm font-bold text-gray-700">{s}</span>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-amber-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Sesi "User Guide Umum" (Accordion) */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
            <HelpCircle size={20} />
          </div>
          <h2 className="text-xl font-black text-neutral-900 uppercase">Panduan Utama AgriConnect</h2>
        </div>

        <div className="space-y-3">
          {USER_GUIDE.map((faq, i) => (
            <div key={i} className={`bg-white rounded-3xl border transition-all duration-300 ${openFaq === i ? 'border-amber-400 shadow-xl shadow-amber-50' : 'border-gray-100 hover:border-gray-200 shadow-sm'}`}>
              <button
                className="flex items-center justify-between w-full p-6 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-sm font-black text-neutral-900 uppercase tracking-tight">{faq.q}</span>
                <div className={`p-1 rounded-lg transition-transform duration-300 ${openFaq === i ? 'bg-amber-100 text-amber-600 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="h-px bg-gray-50 mb-4"></div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Kategori Kendala Berbasis Kartu (Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Truck size={32} />, title: "Lacak Pengiriman", desc: "Pantau real-time posisi kurir Anda.", color: "bg-indigo-50 text-indigo-600", border: "border-indigo-100" },
          { icon: <Wallet size={32} />, title: "Kendala Pembayaran", desc: "Solusi gagal bayar atau refund DP.", color: "bg-amber-50 text-amber-600", border: "border-amber-100" },
          { icon: <UserCheck size={32} />, title: "Info Petani Mitra", desc: "Lihat transparansi proses kurasi petani.", color: "bg-green-50 text-green-600", border: "border-green-100" },
        ].map((card, i) => (
          <div key={i} className={`group bg-white p-8 rounded-[6px] border ${card.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer`}>
            <div className={`w-16 h-16 ${card.color} rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
              {card.icon}
            </div>
            <h3 className="text-lg font-black text-gray-900 uppercase mb-2">{card.title}</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* 5. Formulir Kontak Darurat (Ticketing) */}
      <section className="max-w-3xl mx-auto bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden">
        {isSubmitted ? (
          <div className="p-20 text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-100 animate-bounce">
              <Mail size={40} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Pesan Terkirim!</h2>
            <p className="text-sm text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full border border-green-100">
              Tim AgriConnect akan membalas ke email Anda maksimal dalam 2 jam.
            </p>
          </div>
        ) : (
          <>
            <div className="p-8 border-b border-gray-50 flex items-center gap-4 bg-gray-50/50">
              <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-white">
                <Mail size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 uppercase">Hubungi Tim Support</h2>
                <p className="text-xs text-gray-400 font-bold uppercase">Kami hadir 24/7 untuk sengketa & kendala teknis.</p>
              </div>
            </div>
            <form onSubmit={handleSubmitTicket} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Kategori Masalah</label>
                  <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-amber-400 transition-all">
                    <option>Pilih Kategori</option>
                    <option>Produk Rusak/Layu</option>
                    <option>Masalah Pembayaran</option>
                    <option>Kurir Tidak Sopan</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nomor Invoice (Opsional)</label>
                  <input type="text" placeholder="INV-2026..." className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-amber-400 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Deskripsi Masalah</label>
                <textarea rows={4} placeholder="Ceritakan detail kendala Anda..." className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mt-4">
                <div className="flex-1">
                  <button type="button" className="w-full flex items-center justify-center gap-3 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/30 transition-all">
                    <Camera size={20} />
                    Lampirkan Foto Produk
                  </button>
                </div>
                <button type="submit" className="flex-1 bg-neutral-900 hover:bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-neutral-200 transition-all active:scale-95">
                  Kirim Pesan
                </button>
              </div>
            </form>
          </>
        )}
      </section>

      {/* 4. Integrasi AgriBot AI (Floating) */}
      <div className="fixed bottom-8 right-8 z-[100] group flex flex-col items-end gap-4">

        {/* Chat Window */}
        {isChatOpen && (
          <div className="bg-white w-80 sm:w-96 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
            {/* Header */}
            <div className="bg-neutral-900 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-black shadow-lg shadow-amber-400/20">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-tight">AgriBot AI</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Online Now</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 h-96 p-6 overflow-y-auto bg-gray-50/50 space-y-6 custom-scrollbar">
              {chatMsgs.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-xs font-medium shadow-sm leading-relaxed ${msg.sender === 'user' ? 'bg-amber-400 text-black rounded-3xl rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-3xl rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Quick Replies */}
              {!chatMsgs.some(m => m.sender === 'user') && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Lacak Pesanan Saya", "Bicara dengan Manusia", "Cara Klaim Promo"].map((btn, i) => (
                    <button key={i} className="px-3 py-2 bg-white border border-amber-200 rounded-full text-[10px] font-black text-amber-600 hover:bg-amber-400 hover:text-white transition-all shadow-sm">
                      {btn}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                placeholder="Ketik pesan..."
                className="flex-1 px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              />
              <button className="w-10 h-10 bg-neutral-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-all shadow-lg">
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`
            w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:rotate-12
            ${isChatOpen ? 'bg-white text-gray-900 border-2 border-gray-100' : 'bg-neutral-900 text-white animate-bounce'}
          `}
        >
          {isChatOpen ? <X size={28} /> : <Bot size={32} />}
        </button>
      </div>

    </div>
  );
};

export default CustomerHelp;
