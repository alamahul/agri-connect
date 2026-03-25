import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logoText from "../assets/logo-text.png";
import imageFarmer1 from "../assets/farmer1.png";
import imageFarmer2 from "../assets/farmer2.jpeg";
import imageFarmer3 from "../assets/farmer3.png";
import linkIcon1 from "../assets/Link - icon.png";
import linkIcon2 from "../assets/Link - icon (1).png";
import linkIcon3 from "../assets/Link - icon (2).png";
import linkIcon4 from "../assets/Link - icon (3).png";
import garis from "../assets/garis.png";
import telepon from "../assets/icon-telepon.png";
import email from "../assets/icon-email.png";
import map from "../assets/icon-map.png";
import kirim from "../assets/kirim.png";
import sponsor from "../assets/sponsor-section.png";
import searchIcon from "../assets/search-icon.png";

const socialLinks = [
  { icon: linkIcon1, url: "#" },
  { icon: linkIcon2, url: "#" },
  { icon: linkIcon3, url: "#" },
  { icon: linkIcon4, url: "#" },
];

const kontakList = [
  {
    icon: telepon,
    text: "089987789987",
  },
  {
    icon: email,
    text: "agri_connect@gmail.com",
  },
  {
    icon: map,
    text: "Jl. Raya Sukajadi No. 80\nBandung, Jawa Barat, Indonesia",
  },
];

// Sample product data (12 items for 4x3 grid) with farmer names
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
    name: "Wortel Import",
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
  const { user } = useAuth();

  const [active, setActive] = useState("Katalog");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const menu = ["Beranda", "Tentang Kami", "Katalog", "Kontak Kami"];

  const handleDashboardRedirect = () => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "petani") {
      navigate("/petani/dashboard");
    } else if (user.role === "pembeli") {
      navigate("/pelanggan/dashboard");
    } else if (user.role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  const breadcrumb = ["Beranda", "Katalog Produk"];

  // Filter and sort products
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

  // Get unique categories for dropdown
  const categories = ["Sayuran", "Buah"];

  return (
    <div className="flex flex-col text-[#1F1E17] bg-white">
      {/* Hero Section with Navbar */}
      <div className="relative w-full flex flex-col bg-cover bg-top bg-no-repeat">
        {/* Navbar */}
        <nav className="bg-[#24231D] px-6 py-4 flex items-center justify-between w-full border-b border-white/10">
          <div className="w-60 text-white rounded-[6px] flex items-center justify-center">
            <Link to="/">
              <img
                src={logoText}
                alt="logo agriconnect"
                className="w-40 2xl:w-60 object-contain cursor-pointer"
              />
            </Link>
          </div>

          <div>
            <div className="flex justify-center items-center gap-16">
              <div>
                <ul className="text-white text-[12px] 2xl:text-base flex gap-8">
                  {menu.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        onClick={() => setActive(item)}
                        className={`${
                          active === item ? "text-[#EEC044]" : "text-white"
                        } hover:text-[#EEC044] transition-all duration-300 ease-in-out`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-[17px]">
                {!user ? (
                  <>
                    <button
                      onClick={handleDashboardRedirect}
                      className="flex items-center gap-2 bg-[#4BAF47] hover:bg-[#3E9440] text-white text-[12px] 2xl:text-sm font-semibold px-4 py-2 rounded-[4px]"
                    >
                      Gabung sebagai Pembeli
                    </button>
                    <button
                      onClick={handleDashboardRedirect}
                      className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-[12px] 2xl:text-sm font-semibold px-4 py-2 rounded-[4px]"
                    >
                      Gabung sebagai Petani
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleDashboardRedirect}
                    className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-[12px] 2xl:text-sm font-semibold px-4 py-2 rounded-[4px]"
                  >
                    Dashboard
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb & Title */}
        <div className="flex flex-col justify-center px-6">
          <div className="max-w-6xl mx-auto w-full py-8 2xl:py-0 2xl:pt-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-4">
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  <Link
                    to={index === 0 ? "/" : "#"}
                    className={`${
                      index === breadcrumb.length - 1
                        ? "text-[#EEC044]"
                        : "hover:text-[#EEC044]"
                    } transition`}
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold mb-4">Katalog Produk</h1>
            <p className=" text-sm max-w-2xl">
              Temukan berbagai sayur dan buah segar pilihan terbaik untuk
              kebutuhan Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto w-full px-6 2xl:mt-2">
        <div className="w-full p-6 flex flex-col items-center">
          <div className="flex flex-wrap items-end gap-3 w-full max-w-5xl">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="flex border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-green-500">
                <input
                  type="text"
                  placeholder="Cari Produk Pertanian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 !text-xs placeholder:text-xs outline-none !border-0 focus:ring-0"
                />
                <button className="bg-[#4BAF47] hover:bg-[#3E9440] px-2 m-1 flex items-center justify-center rounded-sm">
                  <img src={searchIcon} alt="search" className="w-4" />
                </button>
              </div>
            </div>

            {/* Kategori */}
            <div className="min-w-[200px]">
              <label className="block text-sm font-semibold mb-2 text-[#1F1E17]">
                Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs focus-within:ring-1 focus-within:ring-green-500"
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
            <div className="min-w-[200px]">
              <label className="block text-sm font-semibold mb-2">Harga</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs focus-within:ring-1 focus-within:ring-green-500"
              >
                <option value="">Default</option>
                <option value="termurah">Termurah</option>
                <option value="termahal">Termahal</option>
              </select>
            </div>
          </div>

          {/* Product Grid - 4x3 Cards */}
          <div className="w-full max-w-5xl mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  {/* Product Image with padding left, right, and top */}
                  <div className="pt-2 px-2">
                    <div className="relative h-48 overflow-hidden bg-gray-100 rounded-sm">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-[#EEC044] text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="pb-2 pt-1 px-2">
                    <h3 className="font-bold text-sm text-[#1F1E17] line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-md text-[#15803D]">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-xs text-[#15803D] ml-1">
                          /{product.unit}
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Dari Petani */}
                      <div className="mb-1 mt-2 w-full flex justify-center items-center bg-[#F3F3F3] border border-[#D9D9D9] rounded-sm">
                        <p className="text-[10px]">
                          Dari Petani:{" "}
                          <span className="text-[#1F1E17]">
                            {product.farmer}
                          </span>
                        </p>
                      </div>

                      {/* Buy Button */}
                      <button className="w-full bg-[#4BAF47] hover:bg-[#3E9440] text-white text-xs py-1 font-semibold rounded-sm transition-colors duration-200 mb-1">
                        Beli Sekarang
                      </button>

                      {/* Dilindungi Sistem Escrow */}
                      <div className="flex items-center justify-center gap-1">
                        <Shield size={12} className="text-[#EEC044]" />
                        <p className="text-[10px] text-gray-400">
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
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Tidak ada produk yang ditemukan
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setSortBy("");
                  }}
                  className="mt-4 text-[#4BAF47] hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <img src={sponsor} alt="sponsor" />
      </div>

      {/* Footer */}
      <div>
        <footer className="flex justify-around bottom-0 bg-[#24231D] text-center py-24 text-[#A5A49A] text-xs flex-wrap gap-8">
          <div className="text-start">
            <img src={logoText} alt="logo" className="w-[11rem]" />
            <p className="w-[12rem] mt-2 leading-loose">
              Proyek ini dikembangkan khusus sebagai inovasi digital dalam ajang
              TECHSOFT 2026.
            </p>
            <div className="mt-3">
              <ul className="flex gap-2">
                {socialLinks.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.url}
                      className="block hover:scale-110 transition"
                    >
                      <img
                        src={item.icon}
                        alt={`icon-${index}`}
                        className="w-8 h-8"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-start w-52">
            <div>
              <p className="text-lg font-bold text-white">Kontak</p>
            </div>
            <div>
              <img src={garis} className="w-14" alt="garis" />
            </div>
            <ul>
              {kontakList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 mb-3 text-white"
                >
                  <img src={item.icon} className="object-contain w-3" alt="" />
                  <p className="text-xs whitespace-pre-line">{item.text}</p>
                </li>
              ))}
            </ul>

            <div className="flex">
              <input
                type="text"
                placeholder="Masukkan Alamat Email"
                className="!border-0 !rounded-r-none rounded-l-lg !text-[10px] placeholder:text-[10px] placeholder:font-semibold p-2 flex-1"
              />
              <div className="bg-[#4BAF47] hover:bg-[#3E9440] p-3 flex justify-center items-center rounded-r-lg cursor-pointer">
                <a href="#">
                  <img src={kirim} className="w-3" alt="kirim" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div>
        <footer className="flex justify-around bottom-0 bg-[#1F1E17] text-center py-6 text-[#A5A49A] text-xs flex-wrap gap-4">
          <p>© All Copyright 2026 by CuanDev</p>
          <p className="flex gap-3">
            <span>Terms of Use</span>
            <span>|</span>
            <span>Privacy Policy</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CartPage;