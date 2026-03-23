import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Shield, Database } from 'lucide-react';

const FAQ_DATA = [
  { q: "Bagaimana cara memverifikasi akun petani baru?", a: "Buka menu 'Manajemen Pengguna' > filter 'Menunggu Verifikasi' > review data KTP dan lokasi lahan yang diunggah > klik 'Verifikasi' jika sesuai atau 'Tolak' jika tidak memenuhi syarat." },
  { q: "Bagaimana cara menangani sengketa Escrow?", a: "Ketika ada sengketa: (1) Buka menu 'Produk & Pesanan', (2) Klik 'Mediasi' pada pesanan yang bersengketa, (3) Lihat bukti dari kedua pihak, (4) Putuskan pelepasan atau pengembalian dana. Semua keputusan tercatat dalam sistem." },
  { q: "Bagaimana cara mengekspor laporan penjualan?", a: "Buka menu 'Analisis & Laporan' > pilih rentang tanggal > klik 'Ekspor PDF' untuk laporan ringkasan atau 'Ekspor Excel' untuk data mentah yang dapat diolah lebih lanjut." },
  { q: "Apa yang harus dilakukan jika ada pengguna yang melanggar kebijakan?", a: "Buka profil pengguna di 'Manajemen Pengguna' > klik 'Blokir'. Akun yang diblokir tidak dapat login atau melakukan transaksi. Untuk kasus pelanggaran berat, gunakan opsi 'Hapus Akun' yang tersedia di detail profil pengguna." },
  { q: "Bagaimana cara mengelola konten artikel edukasi?", a: "Buka menu 'Artikel' > klik 'Artikel Baru' untuk membuat konten baru. Isi judul, kategori, dan konten > simpan sebagai 'Draft' atau langsung 'Tayang'. Artikel yang ditayangkan akan muncul di halaman publik AgriConnect." },
];

const AdminHelp = () => {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pusat Bantuan Admin</h1>
        <p className="text-sm text-gray-500">Panduan operasional khusus Administrator AgriConnect.</p>
      </div>

      {/* Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <Shield size={24} className="text-agri-700" />, title: "Manajemen Pengguna", desc: "Panduan verifikasi, blokir, dan hapus akun petani/pelanggan", bg: "bg-agri-50 border-agri-100" },
          { icon: <Database size={24} className="text-blue-600" />, title: "Operasional Escrow", desc: "Prosedur mediasi sengketa dan pelepasan dana Escrow", bg: "bg-blue-50 border-blue-100" },
          { icon: <BookOpen size={24} className="text-amber-600" />, title: "Kelola Master Data", desc: "Pengaturan kategori, hub logistik, dan konfigurasi platform", bg: "bg-amber-50 border-amber-100" },
        ].map((c, i) => (
          <div key={i} className={`p-5 rounded border ${c.bg} cursor-pointer hover:shadow-md transition-shadow`}>
            <div className="mb-3">{c.icon}</div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h3>
            <p className="text-xs text-gray-600">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Escrow Operations Guide */}
      <div className="bg-white rounded border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Shield size={20} className="text-blue-600" /> Panduan Mediasi Sengketa Escrow
        </h2>
        <p className="text-sm text-gray-500 mb-6">Langkah resmi penanganan sengketa transaksi di platform.</p>
        <div className="space-y-4">
          {[
            { step: "1", title: "Terima Laporan Sengketa", desc: "Sengketa diajukan oleh pelanggan melalui halaman pesanan. Anda akan menerima notifikasi dan kasus masuk ke antrian di menu Produk & Pesanan.", c: "bg-blue-700" },
            { step: "2", title: "Kumpulkan Bukti Kedua Pihak", desc: "Lihat foto/video produk dari pelanggan dan konfirmasi pengiriman dari petani. Kedua bukti tersedia di panel detail mediasi.", c: "bg-amber-600" },
            { step: "3", title: "Putuskan Resolusi", desc: "Pilih salah satu: (A) Lepas dana ke petani jika produk terbukti sesuai, atau (B) Kembalikan dana ke pelanggan jika produk terbukti rusak/tidak sesuai.", c: "bg-red-700" },
            { step: "4", title: "Dokumentasikan Keputusan", desc: "Setiap keputusan mediasi otomatis terdokumentasi dalam sistem audit log. Kedua pihak akan menerima notifikasi email.", c: "bg-agri-700" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className={`w-8 h-8 rounded ${item.c} text-white font-black text-sm flex items-center justify-center flex-shrink-0`}>{item.step}</div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <HelpCircle size={20} className="text-gray-700" /> Pertanyaan Operasional
        </h2>
        <div className="divide-y divide-gray-100">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className="py-4">
              <button className="flex justify-between items-start w-full text-left gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-bold text-gray-900">{faq.q}</span>
                {openFaq === i ? <ChevronUp size={18} className="text-gray-400 flex-shrink-0 mt-0.5" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />}
              </button>
              {openFaq === i && <p className="text-sm text-gray-600 leading-relaxed mt-3 pr-6">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHelp;
