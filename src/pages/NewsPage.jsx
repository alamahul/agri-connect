import { useNavigate, Link, useParams } from "react-router-dom";
import { Calendar, ChevronRight, Share2, Heart, Bookmark } from "lucide-react";
import { useState } from "react";
import imageFarmer4 from "./../assets/farmer4.jpeg";
import imageFarmer5 from "./../assets/farmer5.jpeg";
import imageFarmer6 from "./../assets/farmer6.jpeg";
import sponsor from "./../assets/sponsor-section.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const newsData = {
  1: {
    id: 1,
    title: "AgriConnect Bantu Petani Milenial Tingkatkan Hasil Panen 40%",
    excerpt:
      "Program pelatihan digital farming yang dilakukan AgriConnect bersama Kementerian Pertanian berhasil meningkatkan produktivitas petani milenial hingga 40% dalam 6 bulan.",
    fullContent: `Program pelatihan digital farming yang dilakukan AgriConnect bersama Kementerian Pertanian telah menunjukkan hasil yang luar biasa. Dalam kurun waktu 6 bulan, produktivitas petani milenial yang mengikuti program ini berhasil meningkat hingga 40%.
      Program ini mencakup pelatihan penggunaan aplikasi pertanian digital, manajemen lahan modern, serta akses pasar langsung melalui platform AgriConnect. Para petani milenial juga dibekali dengan pengetahuan tentang sistem escrow yang menjamin keamanan transaksi mereka.
      "Saya sangat terbantu dengan program ini. Sebelumnya saya hanya bisa menjual hasil panen ke tengkulak dengan harga murah. Sekarang, saya bisa menjual langsung ke konsumen melalui AgriConnect dan mendapatkan harga yang lebih baik," ujar Budi, salah satu peserta program asal Lembang.
      Keberhasilan program ini mendapat apresiasi dari Kementerian Pertanian. "AgriConnect telah membuktikan bahwa teknologi digital dapat menjadi solusi nyata bagi permasalahan petani. Kami berharap program ini dapat diperluas ke lebih banyak daerah," kata perwakilan Kementerian Pertanian.
      AgriConnect berencana untuk terus mengembangkan program ini dan menjangkau lebih banyak petani milenial di seluruh Indonesia. Targetnya, pada akhir tahun 2026, sebanyak 10.000 petani milenial akan tergabung dalam program ini.`,
    date: "15 Maret 2026",
    image: imageFarmer4,
    category: "Program Petani",
    author: "Tim AgriConnect",
    readTime: "5 menit",
  },
  2: {
    id: 2,
    title: "Sistem Escrow AgriConnect Raih Penghargaan Inovasi Digital",
    excerpt:
      "Sistem pembayaran aman Rekening Bersama (Escrow) dari AgriConnect mendapatkan penghargaan sebagai inovasi digital terbaik di ajang Techsoft 2026.",
    fullContent: `Sistem pembayaran aman Rekening Bersama (Escrow) yang dikembangkan AgriConnect berhasil meraih penghargaan sebagai inovasi digital terbaik dalam ajang Techsoft 2026. Penghargaan ini diberikan atas kontribusi AgriConnect dalam menciptakan solusi transaksi yang aman bagi petani dan pembeli.
      Sistem escrow ini memastikan bahwa dana pembeli akan disimpan dengan aman hingga barang diterima dengan baik. Setelah pembeli mengonfirmasi penerimaan barang, dana baru akan diteruskan kepada petani. Sistem ini melindungi kedua belah pihak dari potensi penipuan.
      "Kami sangat bangga dengan penghargaan ini. Ini adalah bukti bahwa inovasi yang kami hadirkan benar-benar memberikan manfaat bagi masyarakat, terutama petani dan pembeli," ujar CEO AgriConnect dalam sambutannya.
      Penghargaan ini juga menjadi motivasi bagi AgriConnect untuk terus mengembangkan fitur-fitur inovatif lainnya. Ke depan, AgriConnect berencana untuk mengintegrasikan teknologi blockchain untuk meningkatkan transparansi dan keamanan transaksi.`,
    date: "5 Maret 2026",
    image: imageFarmer5,
    category: "Penghargaan",
    author: "Tim AgriConnect",
    readTime: "4 menit",
  },
  3: {
    id: 3,
    title: "Kemitraan Strategis dengan 500 Petani Lokal di Jawa Barat",
    excerpt:
      "AgriConnect resmi bermitra dengan lebih dari 500 petani lokal di wilayah Jawa Barat untuk memastikan ketersediaan produk segar sepanjang tahun.",
    fullContent: `AgriConnect resmi menjalin kemitraan strategis dengan lebih dari 500 petani lokal di wilayah Jawa Barat. Kemitraan ini bertujuan untuk memastikan ketersediaan produk segar sepanjang tahun serta memberikan kepastian harga yang adil bagi petani.
      Melalui kemitraan ini, AgriConnect akan membantu petani dalam hal pemasaran, pendampingan teknis, serta akses ke pasar yang lebih luas. Para petani mitra juga akan mendapatkan pelatihan mengenai praktik pertanian berkelanjutan.
      "Kami sangat antusias dengan kemitraan ini. Dengan adanya AgriConnect, kami tidak perlu khawatir lagi tentang penjualan hasil panen. Harga yang kami terima pun lebih baik," ungkap Ibu Siti, salah satu petani mitra.
      Kemitraan ini juga menjadi langkah awal AgriConnect untuk memperluas jangkauan ke daerah-daerah lain di Indonesia. Targetnya, pada tahun 2027, AgriConnect dapat bermitra dengan 5.000 petani lokal di seluruh Indonesia.`,
    date: "20 Februari 2026",
    image: imageFarmer6,
    category: "Kemitraan",
    author: "Tim AgriConnect",
    readTime: "3 menit",
  },
};

const relatedNews = [
  {
    id: 1,
    title: "AgriConnect Bantu Petani Milenial Tingkatkan Hasil Panen 40%",
    excerpt:
      "Program pelatihan digital farming yang dilakukan AgriConnect bersama Kementerian Pertanian berhasil meningkatkan produktivitas petani milenial hingga 40% dalam 6 bulan.",
    date: "15 Maret 2026",
    image: imageFarmer4,
    category: "Program Petani",
  },
  {
    id: 2,
    title: "Sistem Escrow AgriConnect Raih Penghargaan Inovasi Digital",
    excerpt:
      "Sistem pembayaran aman Rekening Bersama (Escrow) dari AgriConnect mendapatkan penghargaan sebagai inovasi digital terbaik di ajang Techsoft 2026.",
    date: "5 Maret 2026",
    image: imageFarmer5,
    category: "Penghargaan",
  },
  {
    id: 3,
    title: "Kemitraan Strategis dengan 500 Petani Lokal di Jawa Barat",
    excerpt:
      "AgriConnect resmi bermitra dengan lebih dari 500 petani lokal di wilayah Jawa Barat untuk memastikan ketersediaan produk segar sepanjang tahun.",
    date: "20 Februari 2026",
    image: imageFarmer6,
    category: "Kemitraan",
  },
];

const NewsDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [active, setActive] = useState("Berita");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const news = newsData[id] || newsData[1];
  const otherRelatedNews = relatedNews.filter((item) => item.id !== news.id);

  const breadcrumb = ["Beranda", "Berita", news.title];

  const handleShare = () => {
    alert("Fitur share akan segera tersedia!");
  };

  return (
    <div className="flex flex-col text-[#1F1E17] bg-white min-h-screen">
      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Hero Section*/}
      <div className="relative w-full flex flex-col">
        <div className="flex flex-col justify-center px-4 sm:px-6">
          <div className="max-w-6xl mx-auto w-full py-6 sm:py-8 2xl:py-0 2xl:pt-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-1 sm:mx-2">/</span>}
                  <Link
                    to={index === 0 ? "/" : index === 1 ? "/news" : "#"}
                    className={`${
                      index === breadcrumb.length - 1
                        ? "text-[#EEC044]"
                        : "hover:text-[#EEC044]"
                    } transition text-xs sm:text-sm`}
                  >
                    {item.length > 30 ? `${item.substring(0, 30)}...` : item}
                  </Link>
                </div>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-4">
              Berita & Artikel
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl">
              Informasi terbaru seputar pertanian dan perkembangan AgriConnect.
            </p>
          </div>
        </div>
      </div>

      {/* News Detail Content */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8 sm:mb-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="bg-[#EEC044] text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
              {news.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F1E17] mb-4 leading-tight">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 pb-5 border-b border-[#EBECE2]">
            <div className="flex items-center gap-2 text-sm text-[#878680]">
              <Calendar size={16} />
              <span>{news.date}</span>
            </div>
            <div className="text-[#878680]">•</div>
            <div className="flex items-center gap-2 text-sm text-[#878680]">
              <span>Oleh {news.author}</span>
            </div>
            <div className="text-[#878680]">•</div>
            <div className="flex items-center gap-2 text-sm text-[#878680]">
              <span>{news.readTime} membaca</span>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg overflow-hidden mb-8">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1200x600?text=Berita";
              }}
            />
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                liked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Heart size={18} className={liked ? "fill-red-500" : ""} />
              <span className="text-sm">Suka</span>
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                bookmarked
                  ? "bg-yellow-50 border-yellow-200 text-yellow-600"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Bookmark
                size={18}
                className={bookmarked ? "fill-yellow-500" : ""}
              />
              <span className="text-sm">Simpan</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
            >
              <Share2 size={18} />
              <span className="text-sm">Bagikan</span>
            </button>
          </div>

          {/* Content */}
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            <div className="text-[#878680] leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {news.fullContent}
            </div>
          </div>
        </div>

        {/* Related News Section */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F1E17] border-b border-gray-200 pb-2">
              Artikel Terkait
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherRelatedNews.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x250?text=Berita";
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-[#EEC044] text-white text-[10px] font-semibold px-2 py-1 rounded-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-[#878680] text-xs mb-2">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1F1E17] mb-2 line-clamp-2 group-hover:text-[#4BAF47] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#878680] text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="mt-3 flex items-center text-[#4BAF47] text-xs font-semibold group-hover:gap-2 transition-all">
                    Baca Selengkapnya
                    <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to News Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/news")}
              className="border border-[#4BAF47] text-[#4BAF47] hover:bg-[#4BAF47] hover:text-white transition-all duration-300 px-6 py-2 rounded-md font-semibold text-sm"
            >
              Lihat Semua Berita
            </button>
          </div>
        </div>
      </div>

      {/* Sponsor Section */}
      <div className="mt-12 sm:mt-10">
        <img
          src={sponsor}
          alt="sponsor"
          className="w-full"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Footer */}
      <div id="kontak-section">
        <Footer />
      </div>
    </div>
  );
};

export default NewsDetailPage;
