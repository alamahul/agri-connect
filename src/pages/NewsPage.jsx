import { useNavigate, Link } from "react-router-dom";
import { Calendar, ChevronRight, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { newsData } from "../data/newsData";
import sponsor from "./../assets/sponsor-section.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NewsPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Berita");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    ...new Set(Object.values(newsData).map((item) => item.category)),
  ];

  const filteredNews = useMemo(() => {
    return Object.values(newsData).filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const breadcrumb = ["Beranda", "Berita"];

  return (
    <div className="flex flex-col text-[#1F1E17] bg-white min-h-screen">
      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Hero Section */}
      <div className="relative w-full flex flex-col">
        <div className="flex flex-col justify-center px-4 sm:px-6">
          <div className="max-w-6xl mx-auto w-full py-6 sm:py-8 2xl:py-0 2xl:pt-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-1 sm:mx-2">/</span>
                  )}
                  <Link
                    to={index === 0 ? "/" : "/berita"}
                    className={`${
                      index === breadcrumb.length - 1
                        ? "text-[#EEC044]"
                        : "hover:text-[#EEC044]"
                    } transition text-xs sm:text-sm`}
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-4">
              Berita & Artikel
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl text-gray-600">
              Dapatkan informasi terkini seputar dunia pertanian modern, tips
              panen, dan cerita sukses mitra petani AgriConnect di seluruh
              Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Content Section */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Search and Categories */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Categories Tab */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#4BAF47] text-white shadow-md shadow-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari berita..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4BAF47] shadow-sm transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-50 transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate(`/berita/${item.id}`);
                }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#EEC044] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1F1E17] mb-3 line-clamp-2 group-hover:text-[#4BAF47] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center text-[#4BAF47] text-sm font-bold group-hover:translate-x-1 transition-transform">
                    Baca Selengkapnya
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Tidak ada berita ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ganti kata kunci atau kategori pencarian Anda.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Semua");
              }}
              className="mt-6 text-[#4BAF47] font-bold hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>

      {/* Sponsor Section */}
      <div className="mt-8">
        <img
          src={sponsor}
          alt="sponsor section"
          className="w-full object-cover h-auto"
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsPage;
