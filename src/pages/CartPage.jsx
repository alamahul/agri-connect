import { useNavigate, Link } from "react-router-dom";
import {
  Trash2,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";
import imageFarmer1 from "./../assets/farmer1.png";
import imageFarmer2 from "./../assets/farmer2.jpeg";
import imageFarmer3 from "./../assets/farmer3.png";
import sponsor from "./../assets/sponsor-section.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedLocation, setSelectedLocation] = useState("Hub Bandung");
  const [active, setActive] = useState("Katalog");
  const [isMobileMenuOpen] = useState(false);
  const [setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
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
      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Breadcrumb & Title - Responsive */}
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
            Keranjang Belanja
          </h1>
          <p className="text-xs sm:text-sm max-w-2xl">
            Periksa kembali produk pilihan Anda sebelum melanjutkan ke
            pembayaran.
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 mt-2 2xl:mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
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
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="text-center sm:text-left">
                        <h3 className="font-bold text-base sm:text-lg text-[#1F1E17]">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#878680] mt-1">
                          <b>Dari Petani:</b> {item.farmer}
                        </p>
                        <p className="text-xs text-[#878680]">
                          <b>Berat:</b> {item.weight}
                        </p>
                        <p className="text-[#4BAF47] font-semibold mt-2">
                          Rp. {item.price.toLocaleString("id-ID")}/kg
                        </p>
                      </div>

                      {/* Item Total and Actions */}
                      <div className="flex flex-row sm:flex-col items-center mt-3 sm:items-end justify-between gap-4 sm:gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hover:text-red-500 transition p-1"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="flex justify-center items-center gap-2">
                          <p className="font-bold text-sm sm:text-base text-[#1F1E17]">
                            Rp.{" "}
                            {(item.price * item.quantity).toLocaleString(
                              "id-ID",
                            )}
                          </p>

                          {/* Price and Quantity */}
                          <div>
                            <div className="flex items-center border border-[#ECE7E2] rounded-md">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 sm:px-3 py-1 sm:py1.5 text-[#1F1E17] rounded-none border-r border-[#ECE7E2] hover:bg-gray-100 transition"
                              >
                                -
                              </button>
                              <span className="w-8 sm:w-10 text-center py-1 sm:py1.5 text-[#1F1E17] font-medium text-sm">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 sm:px-3 py-1 sm:py1.5 text-[#1F1E17] rounded-none border-l border-[#ECE7E2] hover:bg-gray-100 transition"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-[#878680]">Keranjang belanja Anda kosong</p>
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
                  <div className="flex justify-between font-bold text-base sm:text-lg">
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
                    : "bg-gray-300 text-[#878680] cursor-not-allowed"
                }`}
              >
                Lanjut ke Pembayaran
              </button>
            </div>
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
