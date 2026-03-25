import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  MapPin,
} from "lucide-react";
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

// Sample cart items data
const initialCartItems = [
  {
    id: 1,
    name: "Anggur",
    farmer: "Pak Budi - Lembong",
    weight: "1Kg",
    price: 15000,
    quantity: 1,
    image: imageFarmer2,
  },
  {
    id: 2,
    name: "Wortel",
    farmer: "Pak Budi - Lembong",
    weight: "1Kg",
    price: 15000,
    quantity: 1,
    image: imageFarmer3,
  },
  {
    id: 3,
    name: "Bawang Merah",
    farmer: "Pak Budi - Lembong",
    weight: "1Kg",
    price: 12000,
    quantity: 1,
    image: imageFarmer1,
  },
];

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

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedLocation, setSelectedLocation] = useState("Hub Bandung");

  const [active, setActive] = useState("Katalog");
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

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = 0;
  const shippingCost = 15000;
  const total = subtotal - discount + shippingCost;

  const breadcrumb = ["Beranda", "Keranjang Belanja"];

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
            <h1 className="text-4xl font-extrabold mb-4">Keranjang Belanja</h1>
            <p className=" text-sm max-w-2xl">
              Periksa kembali produk pilihan Anda sebelum melanjutkan ke
              pembayaran.
            </p>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto w-full px-6 mt-2 2xl:mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="flex-1">
            {/* Payment Security Banner */}
            <div className="bg-[#FEF9E6] border border-[#EEC044]/30 rounded-lg p-4 mb-6 flex items-start gap-3">
              <ShieldCheck className="text-[#4BAF47] w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#1F1E17]">
                  Pembayaran Aman
                </p>
                <p className="text-xs text-gray-600">
                  Pesanan Anda diamankan dengan sistem Rekening Bersama. Dana
                  akan diteruskan kepada petani setelah produk diterima dengan
                  baik.
                </p>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-[#1F1E17]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          <b>Dari Petani:</b> {item.farmer}
                        </p>
                        <p className="text-xs text-gray-500">
                          <b>Berat:</b> {item.weight}
                        </p>
                        <p className="text-[#4BAF47] font-semibold mt-2">
                          Rp. {item.price.toLocaleString("id-ID")}/kg
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="flex flex-col gap justify-between items-end text-right ">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="hover:text-red-500 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex justify-center items-center gap-2">
                      {/* Quantity Controls */}
                      <p className="font-bold text-[#1F1E17]">
                        Rp.{" "}
                        {(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>

                      <div className="flex items-center border border-[#ECE7E2] rounded-md">
                        <span className="flex justify-center items-center text-xs w-8">
                          {item.quantity}
                        </span>
                        <div className="border-l">
                          <div className="border-b">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center hover:border-[#4BAF47] hover:text-[#4BAF47] transition"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center hover:border-[#4BAF47] hover:text-[#4BAF47] transition"
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-gray-500">Keranjang belanja Anda kosong</p>
                <Link
                  to="/katalog"
                  className="inline-block mt-4 bg-[#4BAF47] text-white px-6 py-2 rounded-md text-sm hover:bg-[#3E9440] transition"
                >
                  Mulai Belanja
                </Link>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96">
            {/* Location Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-[#4BAF47]" />
                <h3 className="font-semibold text-[#1F1E17]">
                  Pilih Lokasi Pengiriman:
                </h3>
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#4BAF47] bg-white"
              >
                <option value="Hub Bandung">Hub Bandung</option>
                <option value="Bandung Barat">Bandung Barat</option>
                <option value="Bandung Timur">Bandung Timur</option>
                <option value="Bandung Selatan">Bandung Selatan</option>
              </select>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-lg text-[#1F1E17] mb-4">
                Ringkasan Pesanan
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    Rp. {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Diskon (0%)</span>
                  <span className="text-red-500">
                    -Rp. {discount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkos Kirim</span>
                  <span className="font-semibold">
                    Rp. {shippingCost.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rp. {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
                  cartItems.length > 0
                    ? "bg-[#4BAF47] hover:bg-[#3E9440] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Lanjut ke Pembayaran
              </button>
            </div>
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
