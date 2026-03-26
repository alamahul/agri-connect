import { useNavigate, Link, useParams } from "react-router-dom";
import { Calendar, ChevronRight, Share2, Heart, Bookmark } from "lucide-react";
import { useState } from "react";
import { newsData, relatedNews } from "../data/newsData";
import sponsor from "./../assets/sponsor-section.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
                  {index > 0 && <span className="mx-1 sm:mx-2 text-gray-400">/</span>}
                  <Link
                    to={index === 0 ? "/" : index === 1 ? "/berita" : "#"}
                    className={`${index === breadcrumb.length - 1
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
            <p className="text-xs sm:text-sm max-w-2xl text-gray-600">
              Informasi terbaru seputar pertanian dan perkembangan AgriConnect.
            </p>
          </div>
        </div>
      </div>

      {/* News Detail Content */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8 sm:mb-12">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-[#EEC044] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-sm">
              {news.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1E17] mb-6 leading-tight">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={18} className="text-[#4BAF47]" />
              <span>{news.date}</span>
            </div>
            <div className="hidden sm:block text-gray-300">|</div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-semibold text-[#4BAF47]">Penulis:</span>
              <span>{news.author}</span>
            </div>
            <div className="hidden sm:block text-gray-300">|</div>
            <div className="flex items-center gap-2 text-sm text-gray-400 italic">
              <span>{news.readTime} membaca</span>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-green-100">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-auto object-cover max-h-[600px]"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1200x600?text=Berita";
              }}
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-gray-100">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300 ${liked
                  ? "bg-red-50 border-red-200 text-red-500 shadow-sm"
                  : "bg-white border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400"
                }`}
            >
              <Heart size={20} className={liked ? "fill-red-500" : ""} />
              <span className="text-sm font-bold">Suka</span>
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300 ${bookmarked
                  ? "bg-yellow-50 border-yellow-200 text-yellow-600 shadow-sm"
                  : "bg-white border-gray-200 text-gray-500 hover:border-yellow-200 hover:text-yellow-600"
                }`}
            >
              <Bookmark
                size={20}
                className={bookmarked ? "fill-yellow-500" : ""}
              />
              <span className="text-sm font-bold">Simpan</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[#4BAF47] hover:text-white hover:border-[#4BAF47] transition-all duration-300"
            >
              <Share2 size={20} />
              <span className="text-sm font-bold">Bagikan</span>
            </button>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed text-lg sm:text-xl whitespace-pre-line font-medium border-l-4 border-[#4BAF47] pl-8 py-2 mb-12">
              {news.excerpt}
            </div>
            <div className="text-gray-600 leading-loose whitespace-pre-line text-base sm:text-lg">
              {news.fullContent}
            </div>
          </div>
        </div>

        {/* Related News Section */}
        <div className="mt-24 pt-16 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1E17]">
              Artikel Terkait Lainnya
            </h2>
            <Link to="/berita" className="text-[#4BAF47] font-bold hover:underline flex items-center">
              Lihat Semua <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherRelatedNews.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-50"
                onClick={() => {
                   window.scrollTo({ top: 0, behavior: "smooth" });
                   navigate(`/berita/${item.id}`);
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#EEC044] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-[#1F1E17] mb-3 line-clamp-2 group-hover:text-[#4BAF47] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <div className="mt-4 flex items-center text-[#4BAF47] text-sm font-bold group-hover:translate-x-1 transition-transform">
                    Baca Selengkapnya
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsor Section */}
      <div className="mt-16">
        <img
          src={sponsor}
          alt="sponsor Section"
          className="w-full object-cover h-auto"
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
