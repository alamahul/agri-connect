import { useNavigate, Link } from "react-router-dom";
import { Shield, Star, Lock, MapPin, Bot } from "lucide-react";
import { useState } from "react";
import imageFarmer1 from "./../assets/farmer1.png";
import imageFarmer2 from "./../assets/farmer2.jpeg";
import imageFarmer3 from "./../assets/farmer3.png";
import sponsor from "./../assets/sponsor-section.png";
import searchIcon from "./../assets/search-icon.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const products = [
  {
    id: 1,
    name: "Cabai Merah Segar",
    category: "Sayuran",
    price: 35000,
    unit: "kg",
    rating: 4.9,
    soldCount: 120,
    image: "https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Cabai merah segar langsung dari petani, kualitas terbaik.",
    farmer: "Pak Suparman",
    location: "Lembang",
    distance: 12,
    isPreOrder: false,
  },
  {
    id: 2,
    name: "Tomat Organik",
    category: "Sayuran",
    price: 25000,
    unit: "kg",
    rating: 4.8,
    soldCount: 85,
    image: "https://plus.unsplash.com/premium_photo-1770609621373-3e35cdeaf42c?q=80&w=503&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tomat organik tanpa pestisida, manis dan segar.",
    farmer: "Bu Siti",
    location: "Ciwidey",
    distance: 35,
    isPreOrder: true,
  },
  {
    id: 3,
    name: "Kentang Premium",
    category: "Sayuran",
    price: 18000,
    unit: "kg",
    rating: 4.3,
    soldCount: 210,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Kentang premium ukuran besar, cocok untuk berbagai masakan.",
    farmer: "Pak Budi",
    location: "Pangalengan",
    distance: 28,
    isPreOrder: false,
  },
  {
    id: 4,
    name: "Wortel Organik",
    category: "Sayuran",
    price: 22000,
    unit: "kg",
    rating: 4.6,
    soldCount: 150,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Wortel import segar, kaya vitamin A.",
    farmer: "Bu Dewi",
    location: "Lembang",
    distance: 15,
    isPreOrder: true,
  },
  {
    id: 5,
    name: "Apel Manalagi",
    category: "Buah",
    price: 45000,
    unit: "kg",
    rating: 4.7,
    soldCount: 65,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Apel manalagi segar, renyah dan manis.",
    farmer: "Pak Hendra",
    location: "Malang",
    distance: 120,
    isPreOrder: false,
  },
  {
    id: 6,
    name: "Jeruk Medan",
    category: "Buah",
    price: 38000,
    unit: "kg",
    rating: 4.4,
    soldCount: 92,
    image: "https://images.unsplash.com/photo-1636277009869-b182eb55347d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Jeruk medan manis, kaya vitamin C.",
    farmer: "Bu Ratna",
    location: "Medan",
    distance: 1500,
    isPreOrder: false,
  },
  {
    id: 7,
    name: "Bawang Merah",
    category: "Sayuran",
    price: 32000,
    unit: "kg",
    rating: 4.2,
    soldCount: 300,
    image: "https://images.unsplash.com/photo-1565685225009-fc85d9109c80?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Bawang merah segar, aroma khas untuk masakan.",
    farmer: "Pak Joko",
    location: "Brebes",
    distance: 250,
    isPreOrder: false,
  },
  {
    id: 8,
    name: "Pisang Ambon",
    category: "Buah",
    price: 28000,
    unit: "sisir",
    rating: 4.5,
    soldCount: 110,
    image: "https://plus.unsplash.com/premium_photo-1675731118330-08c71253af17?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Pisang ambon manis, cocok untuk camilan sehat.",
    farmer: "Bu Lina",
    location: "Lampung",
    distance: 400,
    isPreOrder: false,
  },
  {
    id: 9,
    name: "Broccoli Organik",
    category: "Sayuran",
    price: 30000,
    unit: "kg",
    rating: 4.9,
    soldCount: 45,
    image: "https://images.unsplash.com/photo-1757332334626-8dadb145540d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Broccoli organik segar, kaya serat and antioksidan.",
    farmer: "Pak Rudi",
    location: "Lembang",
    distance: 14,
    isPreOrder: true,
  },
  {
    id: 10,
    name: "Semangka Merah",
    category: "Buah",
    price: 15000,
    unit: "kg",
    rating: 4.3,
    soldCount: 180,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Semangka merah manis, segar untuk pelepas dahaga.",
    farmer: "Bu Ani",
    location: "Indramayu",
    distance: 110,
    isPreOrder: false,
  },
  {
    id: 11,
    name: "Bayam Hijau",
    category: "Sayuran",
    price: 12000,
    unit: "ikat",
    rating: 4.1,
    soldCount: 500,
    image: "https://plus.unsplash.com/premium_photo-1701699257548-8261a687236f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Bayam hijau segar, kaya zat besi.",
    farmer: "Pak Slamet",
    location: "Cisarua",
    distance: 22,
    isPreOrder: true,
  },
  {
    id: 12,
    name: "Mangga Harum Manis",
    category: "Buah",
    price: 55000,
    unit: "kg",
    rating: 4.8,
    soldCount: 220,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Mangga harum manis legit, buah favorit keluarga.",
    farmer: "Bu Yanti",
    location: "Cirebon",
    distance: 130,
    isPreOrder: false,
  },
];

const ProductCatalog = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("Katalog");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const breadcrumb = ["Beranda", "Katalog Produk"];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      
      let matchesDistance = true;
      if (distanceFilter === "dekat") matchesDistance = product.distance <= 30;
      else if (distanceFilter === "jauh") matchesDistance = product.distance > 30;
      
      return matchesSearch && matchesCategory && matchesDistance;
    })
    .sort((a, b) => {
      if (sortBy === "termurah") {
        return a.price - b.price;
      } else if (sortBy === "termahal") {
        return b.price - a.price;
      }
      return 0;
    });

  const categories = ["Sayuran", "Buah"];

  return (
    <div className="flex flex-col text-[#1F1E17] bg-white">
      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Breadcrumb & Title*/}
      <div className="flex flex-col justify-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full py-6 sm:py-8 2xl:py-0 2xl:pt-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4">
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-1 sm:mx-2">/</span>}
                <Link
                  to={index === 0 ? "/" : "#"}
                  className={`${index === breadcrumb.length - 1
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
            Katalog Produk
          </h1>
          <p className="text-xs sm:text-sm max-w-2xl">
            Temukan berbagai sayur dan buah segar pilihan terbaik untuk
            kebutuhan Anda.
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 2xl:mt-2">
        <div className="w-full p-4 sm:p-6 flex flex-col items-center">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-end gap-3 w-full max-w-5xl">
            {/* Search */}
            <div className="flex-1 min-w-[200px] sm:min-w-[300px]">
              <label className="block text-xs sm:text-sm font-semibold mb-2 text-[#1F1E17]">
                Cari Produk
              </label>
              <div className="flex border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-green-500">
                <input
                  type="text"
                  placeholder="Tanya AgriBot: Cari bahan untuk masak Sayur Sop..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full !text-xs sm:text-sm placeholder:text-xs outline-none !border-0 focus:ring-0"
                />
                <button className="bg-[#4BAF47] hover:bg-[#3E9440] px-2 m-1 flex items-center justify-center rounded-sm">
                  <img src={searchIcon} alt="search" className="w-3 sm:w-4" />
                </button>
              </div>
            </div>

            {/* Kategori */}
            <div className="min-w-[150px] sm:min-w-[200px]">
              <label className="block text-xs sm:text-sm font-semibold mb-2 text-[#1F1E17]">
                Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md !text-xs placeholder:text-xs sm:text-xs focus-within:ring-1 focus-within:ring-green-500"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Jarak */}
            <div className="min-w-[150px] sm:min-w-[200px]">
              <label className="block text-xs sm:text-sm font-semibold mb-2 text-[#1F1E17]">
                Jarak Pengiriman
              </label>
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs sm:text-xs focus-within:ring-1 focus-within:ring-green-500"
              >
                <option value="">Semua Jarak</option>
                <option value="dekat">Dekat (≤ 30 KM)</option>
                <option value="jauh">Jauh (&gt; 30 KM)</option>
              </select>
            </div>

            {/* Harga */}
            <div className="min-w-[150px] sm:min-w-[200px]">
              <label className="block text-xs sm:text-sm font-semibold mb-2 text-[#1F1E17]">
                Urutkan Harga
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs sm:text-xs focus-within:ring-1 focus-within:ring-green-500"
              >
                <option value="">Default</option>
                <option value="termurah">Termurah</option>
                <option value="termahal">Termahal</option>
              </select>
            </div>
          </div>

          {/* Product Grid*/}
          <div className="w-full max-w-5xl mt-6 sm:mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Product Image */}
                  <div className="pt-2 px-2">
                    <div className="relative h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden bg-gray-100 rounded-sm">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/200x200?text=Product";
                        }}
                      />
                      {product.isPreOrder ? (
                        <span className="absolute top-0 left-0 bg-orange-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1.5 rounded-br-lg shadow-lg flex items-center gap-1">
                          🌱 Panen Besok
                        </span>
                      ) : (
                        <span className="absolute top-2 left-2 bg-[#EEC044] text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="pb-2 pt-2 sm:pt-3 px-2">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1F1E17] line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Social Proof: Rating & Sold */}
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-gray-700">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">|</span>
                      <span className="text-[10px] font-medium text-gray-500 italic">Terjual {product.soldCount} {product.unit}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-1">
                      <div>
                        <span className="text-sm sm:text-base font-bold text-[#15803D]">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-[10px] sm:text-xs text-[#15803D] ml-0.5 sm:ml-1">
                          /{product.unit}
                        </span>
                      </div>
                    </div>

                    {/* Dari Petani dengan Jarak & Lokasi */}
                    <div 
                      className="mb-2 mt-2 w-full p-1.5 bg-gray-50 border border-gray-200 rounded-md hover:bg-green-50/50 hover:border-[#4BAF47]/30 transition-all cursor-pointer group/farmer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/petani/1`);
                      }}
                    >
                      <div className="flex items-start gap-1">
                        <MapPin size={10} className="mt-0.5 text-[#4BAF47] shrink-0" />
                        <div className="leading-tight text-left">
                          <p className="text-[9px] font-bold text-[#1F1E17] line-clamp-1 group-hover/farmer:text-[#4BAF47] transition-colors">
                            {product.farmer} • {product.location}
                          </p>
                          <p className={`text-[8px] font-bold ${product.distance <= 30 ? 'text-[#4BAF47]' : 'text-red-500'}`}>
                            Jarak: {product.distance} KM {product.distance <= 30 ? '(Dekat)' : '(Jauh)'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <button
                      className="w-full bg-[#4BAF47] hover:bg-[#3E9440] text-white text-[10px] sm:text-xs py-1.5 font-bold rounded-md transition-all duration-200 mb-2 shadow-sm active:scale-95 uppercase"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle buy now
                        console.log(`Buying ${product.name}`);
                      }}
                    >
                      Beli Sekarang
                    </button>

                    {/* Dilindungi Sistem Escrow - Improved Contrast */}
                    <div className="flex items-center justify-center gap-1.5 py-1.5 bg-green-50/50 rounded-lg border border-green-100">
                      <Lock size={12} className="text-[#15803D] fill-[#15803D]/10" />
                      <p className="text-[9px] font-black text-[#15803D] uppercase tracking-tighter">
                        Dana Aman dengan Escrow
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-sm sm:text-base">
                  Tidak ada produk yang ditemukan
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setDistanceFilter("");
                    setSortBy("");
                  }}
                  className="mt-3 sm:mt-4 text-[#4BAF47] hover:underline text-sm"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sponsor Section */}
      <div className="mt-12 sm:mt-20">
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
      <div id="kontak-section" className="">
        <Footer />
      </div>
    </div>
  );
};

export default ProductCatalog;
