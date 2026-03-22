import { useState } from 'react';
import {
  HelpCircle, ChevronDown, ChevronUp, MessageSquare,
  BookOpen, Phone, Mail
} from 'lucide-react';

const faqs = [
  {
    q: 'Bagaimana cara menambahkan produk baru ke gudang?',
    a: 'Buka menu "Gudang Produk" di sidebar, kemudian klik tombol "Tambah Produk" di pojok kanan atas. Isi formulir detail produk termasuk nama, stok, harga, dan kategori, lalu simpan.',
  },
  {
    q: 'Bagaimana cara memperbarui status pesanan?',
    a: 'Buka halaman "Manajemen Pesanan", temukan pesanan yang ingin diperbarui, klik tombol "Detail" di baris pesanan tersebut. Di halaman detail, Anda dapat mengubah status menjadi Diproses, Dikirim, atau Selesai.',
  },
  {
    q: 'Apa arti indikator "Stok Kritis"?',
    a: 'Stok Kritis berarti jumlah stok produk telah berada di bawah 10% dari kapasitas maksimum yang ditetapkan. Segera lakukan restok untuk menghindari kehabisan produk saat ada pesanan masuk.',
  },
  {
    q: 'Bagaimana cara membaca grafik Analisis Penjualan?',
    a: 'Halaman Analisis Penjualan menampilkan tren pendapatan bulanan dalam bentuk grafik bar, dan tren jumlah pesanan dalam grafik garis. Bagian bawah menampilkan proporsi penjualan per jenis produk dalam bentuk bar indikator.',
  },
  {
    q: 'Apakah data saya aman di AgriConnect?',
    a: 'Ya, seluruh data Anda dienkripsi menggunakan standar industri (AES-256). Server kami berlokasi di Indonesia dan telah memenuhi standar keamanan ISO 27001. Kami tidak membagikan data Anda kepada pihak ketiga tanpa izin.',
  },
  {
    q: 'Bagaimana cara menghubungi tim dukungan?',
    a: 'Anda dapat menghubungi tim kami melalui email support@agriconnect.id atau melalui WhatsApp di +62 800-AGRI-CONNECT (Senin–Jumat, 08.00–17.00 WIB). Biasanya kami merespons dalam waktu 1×24 jam.',
  },
];

const guides = [
  { icon: '🌾', title: 'Memulai dengan AgriConnect', desc: 'Panduan lengkap setup awal akun dan konfigurasi profil toko Anda.' },
  { icon: '📦', title: 'Mengelola Inventaris Gudang', desc: 'Cara efektif mengatur stok, kategori produk, dan peringatan stok menipis.' },
  { icon: '🛒', title: 'Memproses Pesanan Masuk', desc: 'Alur kerja dari pesanan diterima hingga pengiriman ke pembeli.' },
  { icon: '📊', title: 'Memahami Laporan Penjualan', desc: 'Cara mem-baca grafik tren dan menggunakan data untuk keputusan bisnis.' },
];

const BantuanPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-800">Bantuan & Panduan</h2>
        <p className="text-xs text-slate-500 mt-0.5">Temukan jawaban dan pelajari cara menggunakan AgriConnect</p>
      </div>

      {/* Quick Guide */}
      <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={15} className="text-emerald-600" />
          <h3 className="text-sm font-semibold text-slate-800">Panduan Cepat</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {guides.map((g) => (
            <div
              key={g.title}
              className="flex items-start gap-3 p-3 border border-slate-100 rounded-[6px] hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span className="text-xl leading-none mt-0.5">{g.icon}</span>
              <div>
                <p className="text-xs font-semibold text-slate-800">{g.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={15} className="text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-800">Pertanyaan yang Sering Diajukan</h3>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-[6px] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-semibold text-slate-800 pr-4">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp size={14} className="text-slate-400 flex-shrink-0" />
                  : <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
                }
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600 leading-relaxed pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-[6px] border border-emerald-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={15} className="text-emerald-700" />
          <h3 className="text-sm font-semibold text-emerald-800">Masih butuh bantuan?</h3>
        </div>
        <p className="text-xs text-emerald-700 mb-4">Tim dukungan kami siap membantu Anda setiap hari kerja.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:support@agriconnect.id"
            className="flex items-center gap-2 bg-white text-emerald-700 text-xs font-semibold px-4 py-2.5 rounded-[6px] border border-emerald-200 hover:bg-emerald-50 transition-colors"
          >
            <Mail size={13} />
            support@agriconnect.id
          </a>
          <a
            href="tel:+6280082746"
            className="flex items-center gap-2 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-[6px] hover:bg-emerald-700 transition-colors"
          >
            <Phone size={13} />
            +62 800-AGRI
          </a>
        </div>
      </div>
    </div>
  );
};

export default BantuanPage;
