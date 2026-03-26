import { useNavigate, Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { useState, useEffect } from "react";
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
    rating: 4.5,
    image: imageFarmer1,
    description: "Cabai merah segar langsung dari petani, kualitas terbaik.",
    farmer: "Pak Suparman",
  },
  {
    id: 2,
    name: "Tomat Organik",
    category: "Sayuran",
    price: 25000,
    unit: "kg",
    rating: 4.8,
    image: imageFarmer2,
    description: "Tomat organik tanpa pestisida, manis dan segar.",
    farmer: "Bu Siti",
  },
  {
    id: 3,
    name: "Kentang Premium",
    category: "Sayuran",
    price: 18000,
    unit: "kg",
    rating: 4.3,
    image: imageFarmer3,
    description: "Kentang premium ukuran besar, cocok untuk berbagai masakan.",
    farmer: "Pak Budi",
  },
  {
    id: 4,
    name: "Wortel Organik",
    category: "Sayuran",
    price: 22000,
    unit: "kg",
    rating: 4.6,
    image: imageFarmer1,
    description: "Wortel import segar, kaya vitamin A.",
    farmer: "Bu Dewi",
  },
  {
    id: 5,
    name: "Apel Manalagi",
    category: "Buah",
    price: 45000,
    unit: "kg",
    rating: 4.7,
    image: imageFarmer2,
    description: "Apel manalagi segar, renyah dan manis.",
    farmer: "Pak Hendra",
  },
  {
    id: 6,
    name: "Jeruk Medan",
    category: "Buah",
    price: 38000,
    unit: "kg",
    rating: 4.4,
    image: imageFarmer3,
    description: "Jeruk medan manis, kaya vitamin C.",
    farmer: "Bu Ratna",
  },
  {
    id: 7,
    name: "Bawang Merah",
    category: "Sayuran",
    price: 32000,
    unit: "kg",
    rating: 4.2,
    image: imageFarmer1,
    description: "Bawang merah segar, aroma khas untuk masakan.",
    farmer: "Pak Joko",
  },
  {
    id: 8,
    name: "Pisang Ambon",
    category: "Buah",
    price: 28000,
    unit: "sisir",
    rating: 4.5,
    image: imageFarmer2,
    description: "Pisang ambon manis, cocok untuk camilan sehat.",
    farmer: "Bu Lina",
  },
  {
    id: 9,
    name: "Broccoli Organik",
    category: "Sayuran",
    price: 30000,
    unit: "kg",
    rating: 4.9,
    image: imageFarmer3,
    description: "Broccoli organik segar, kaya serat dan antioksidan.",
    farmer: "Pak Rudi",
  },
  {
    id: 10,
    name: "Semangka Merah",
    category: "Buah",
    price: 15000,
    unit: "kg",
    rating: 4.3,
    image: imageFarmer1,
    description: "Semangka merah manis, segar untuk pelepas dahaga.",
    farmer: "Bu Ani",
  },
  {
    id: 11,
    name: "Bayam Hijau",
    category: "Sayuran",
    price: 12000,
    unit: "ikat",
    rating: 4.1,
    image: imageFarmer2,
    description: "Bayam hijau segar, kaya zat besi.",
    farmer: "Pak Slamet",
  },
  {
    id: 12,
    name: "Mangga Harum Manis",
    category: "Buah",
    price: 55000,
    unit: "kg",
    rating: 4.8,
    image: imageFarmer3,
    description: "Mangga harum manis legit, buah favorit keluarga.",
    farmer: "Bu Yanti",
  },
];

const CartPage = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("Katalog");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isMobileMenuOpen] = useState(false);
  const [setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const breadcrumb = ["Beranda", "Katalog Produk"];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
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
                  placeholder="Cari Produk Pertanian..."
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

            {/* Harga */}
            <div className="min-w-[150px] sm:min-w-[200px]">
              <label className="block text-xs sm:text-sm font-semibold mb-2 text-[#1F1E17]">
                Harga
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
                      <span className="absolute top-2 left-2 bg-[#EEC044] text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="pb-2 pt-2 sm:pt-3 px-2">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1F1E17] line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs sm:text-md text-[#15803D]">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-[10px] sm:text-xs text-[#15803D] ml-0.5 sm:ml-1">
                          /{product.unit}
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Dari Petani */}
                      <div className="mb-1 mt-2 w-full flex justify-center items-center bg-[#F3F3F3] border border-[#D9D9D9] rounded-sm">
                        <p className="text-[8px] sm:text-[10px]">
                          Dari Petani:{" "}
                          <span className="text-[#1F1E17]">
                            {product.farmer}
                          </span>
                        </p>
                      </div>

                      {/* Buy Button */}
                      <button
                        className="w-full bg-[#4BAF47] hover:bg-[#3E9440] text-white text-[10px] sm:text-xs py-1 font-semibold rounded-sm transition-colors duration-200 mb-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle buy now
                          console.log(`Buying ${product.name}`);
                        }}
                      >
                        Beli Sekarang
                      </button>

                      {/* Dilindungi Sistem Escrow */}
                      <div className="flex items-center justify-center gap-1">
                        <Shield size={10} className="text-[#EEC044]" />
                        <p className="text-[8px] sm:text-[10px] text-gray-400">
                          Dilindungi Sistem Escrow
                        </p>
                      </div>
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

export default CartPage;
