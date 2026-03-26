import { useNavigate, Link } from "react-router-dom";
import {
  Trash2,
  ShieldCheck,
  MapPin,
  Truck,
  Store,
  Package,
  Leaf
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import { useState } from "react";
import sponsor from "./../assets/sponsor-section.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const initialCartItems = [
  {
    id: 1,
    name: "Anggur Probolinggo",
    farmer: "Pak Rahmat",
    location: "Probolinggo",
    weight: 1,
    price: 45000,
    quantity: 1,
    isPreOrder: false,
    image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Wortel Organik Lembang",
    farmer: "Pak Budi",
    location: "Lembang",
    weight: 1,
    price: 18000,
    quantity: 2,
    isPreOrder: true,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Bawang Merah Brebes",
    farmer: "Bu Susi",
    location: "Brebes",
    weight: 1,
    price: 32000,
    quantity: 1,
    isPreOrder: false,
    image: "https://images.unsplash.com/photo-1565685225009-fc85d9109c80?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [deliveryType, setDeliveryType] = useState("home"); // "home" or "pickup"
  const [selectedLocation, setSelectedLocation] = useState("Hub Bandung");
  const [ecoPackaging, setEcoPackaging] = useState(true);
  const [active, setActive] = useState("Katalog");
  const { showAlert } = useAlert();

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
  
  const totalWeight = cartItems.reduce(
    (sum, item) => sum + item.weight * item.quantity,
    0,
  );

  const discount = 0;
  const shippingCost = deliveryType === "home" ? 15000 : 0;
  const total = subtotal - discount + shippingCost;

  const handleNextStep = () => {
    if (!user) {
      navigate("/login?redirect=/checkout");
    } else if (user.role !== "pembeli") {
      showAlert("Akses Terbatas", "Hanya akun Pelanggan yang dapat melakukan transaksi. Harap masuk sebagai Pelanggan.", "warning");
    } else {
      navigate("/checkout");
    }
  };

  const breadcrumb = ["Beranda", "Keranjang Belanja"];

  return (
    <div className="flex flex-col text-[#1F1E17] bg-white">
      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Breadcrumb & Title */}
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
                        <p 
                          className="text-[10px] sm:text-xs text-[#878680] mt-1 hover:text-[#4BAF47] transition-colors cursor-pointer inline-block"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/petani/1`);
                          }}
                        >
                          <b>Dari Petani:</b> {item.farmer} • {item.location}
                        </p>
                        
                        {/* Status Panen / Split Order */}
                        <div className="mt-2 flex flex-wrap gap-2">
                           {item.isPreOrder ? (
                             <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 border border-orange-200 rounded-md text-orange-700">
                               <Leaf size={12} className="shrink-0" />
                               <span className="text-[10px] font-bold uppercase italic">🌱 Dipanen & Dikirim Besok Pagi</span>
                             </div>
                           ) : (
                             <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 border border-green-200 rounded-md text-[#15803D]">
                               <Package size={12} className="shrink-0" />
                               <span className="text-[10px] font-bold uppercase italic">📦 Siap Dikirim Hari Ini</span>
                             </div>
                           )}
                        </div>

                        <p className="text-[#4BAF47] font-bold mt-2 text-sm">
                          Rp. {item.price.toLocaleString("id-ID")} <span className="text-[10px] font-normal text-gray-400">/ {item.weight}kg</span>
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
                  to="/catalog"
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
              <h4 className="font-bold text-[#1F1E17] mb-4 text-sm uppercase tracking-wide">Metode Pengiriman</h4>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setDeliveryType("home")}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all ${deliveryType === "home" ? 'border-[#4BAF47] bg-green-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className={`mt-0.5 p-1.5 rounded-full ${deliveryType === "home" ? 'bg-[#4BAF47] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Truck size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#1F1E17]">Antar ke Rumah</p>
                    <p className="text-[10px] text-gray-500">Alamat: Jl. Sudirman No. 1, Bandung</p>
                  </div>
                  {deliveryType === "home" && <div className="ml-auto w-2 h-2 rounded-full bg-[#4BAF47]" />}
                </button>

                <button 
                  onClick={() => setDeliveryType("pickup")}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all ${deliveryType === "pickup" ? 'border-[#4BAF47] bg-green-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className={`mt-0.5 p-1.5 rounded-full ${deliveryType === "pickup" ? 'bg-[#4BAF47] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Store size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#1F1E17]">Self-Pickup (Ambil Sendiri)</p>
                    <p className="text-[10px] text-gray-500">Di {selectedLocation} - <span className="text-[#4BAF47] font-bold">Bebas Ongkir!</span></p>
                  </div>
                  {deliveryType === "pickup" && <div className="ml-auto w-2 h-2 rounded-full bg-[#4BAF47]" />}
                </button>
              </div>

              {deliveryType === "pickup" && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                   <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Pilih Lokasi Hub</label>
                   <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#4BAF47] bg-white font-medium"
                   >
                    <option value="Hub Bandung">Hub Bandung Central</option>
                    <option value="Hub Lembang">Hub Lembang (Utara)</option>
                    <option value="Hub Ciwidey">Hub Ciwidey (Selatan)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-lg text-[#1F1E17] mb-4">
                Ringkasan Pesanan
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartItems.length} Barang)</span>
                  <span className="font-semibold">
                    Rp. {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Berat</span>
                  <span className="font-semibold italic">
                    {totalWeight} Kg
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Diskon (0%)</span>
                  <span className="text-red-500">
                    -Rp. {discount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkos Kirim {deliveryType === 'pickup' && '(Pickup)'}</span>
                  <span className={`font-bold ${deliveryType === 'pickup' ? 'text-[#4BAF47]' : ''}`}>
                    {deliveryType === 'pickup' ? 'GRATIS' : `Rp. ${shippingCost.toLocaleString("id-ID")}`}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-base sm:text-lg">
                    <span>Total Tagihan</span>
                    <span className="text-[#15803D]">Rp. {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

              {/* ESG - Eco Packaging Checkbox */}
              <div className="mt-6 p-3 bg-green-50 border border-green-100 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="mt-1">
                    <input 
                      type="checkbox" 
                      className="accent-[#4BAF47] w-4 h-4"
                      checked={ecoPackaging}
                      onChange={(e) => setEcoPackaging(e.target.checked)}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1F1E17] flex items-center gap-1.5">
                      <Leaf size={14} className="text-[#4BAF47]" />
                      Kemasan Ramah Lingkungan
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                      Daun pisang & kardus daur ulang tanpa plastik. (Bebas Sampah!)
                    </p>
                  </div>
                </label>
              </div>

              <button
                onClick={handleNextStep}
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${cartItems.length > 0
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
