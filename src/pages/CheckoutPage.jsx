import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Wallet,
  QrCode,
  Building2,
  Lock,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useAlert } from "../contexts/AlertContext";
import { useState, useEffect } from "react";
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
    image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Wortel",
    farmer: "Pak Budi - Lembong",
    weight: "1Kg",
    price: 15000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Bawang Merah",
    farmer: "Pak Budi - Lembong",
    weight: "1Kg",
    price: 12000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1565685225009-fc85d9109c80?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [cartItems] = useState(initialCartItems);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [active, setActive] = useState("Katalog");
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login?redirect=/checkout");
      } else if (user.role !== "pembeli") {
        showAlert("Akses Terbatas", "Hanya akun Pelanggan yang dapat melakukan transaksi. Harap masuk sebagai Pelanggan.", "warning");
        navigate("/cart");
      }
    }
  }, [user, loading, navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = 0;
  const shippingCost = 15000;
  const total = subtotal - discount + shippingCost;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessOverlay(true);
    }, 2000);
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-[#4BAF47]" size={48} />
      </div>
    );
  }

  const breadcrumb = ["Beranda", "Keranjang Belanja", "Checkout"];

  return (
    <div className="flex flex-col text-[#1F1E17] bg-white min-h-screen">
      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Header Section */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm mb-4">
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-1 sm:mx-2 text-gray-400">/</span>}
                <Link
                  to={index === 0 ? "/" : index === 1 ? "/cart" : "#"}
                  className={`${index === breadcrumb.length - 1
                    ? "text-[#EEC044] font-bold"
                    : "hover:text-[#EEC044]"
                    } transition`}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1E17]">Selesaikan Pembayaran</h1>
              <p className="text-sm text-gray-500 mt-1">Konfirmasi detail pesanan dan pilih metode pembayaran Anda.</p>
            </div>
            <Link to="/cart" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#4BAF47] transition w-fit">
              <ChevronLeft size={18} />
              Kembali ke Keranjang
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Order Items & Address */}
          <div className="flex-1 space-y-6">
            {/* Address Confirmation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-[#4BAF47]" />
                  <h3 className="font-bold text-[#1F1E17]">Alamat Pengiriman</h3>
                </div>
                <button className="text-[#4BAF47] text-xs font-bold hover:underline bg-[#4BAF47]/10 px-3 py-1.5 rounded-full transition">Ubah Alamat</button>
              </div>
              <div className="p-6">
                <p className="font-bold text-base text-[#1F1E17]">{user?.fullName}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Jl. Merdeka No. 45, Babakan Ciamis, Kec. Sumur Bandung, <br />
                  Kota Bandung, Jawa Barat 40117
                </p>
                <p className="text-sm text-gray-500 mt-3 flex items-center gap-2 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  0812-3456-7890
                </p>
              </div>
            </div>

            {/* Product List (Summary) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-[#1F1E17]">Detail Pesanan</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-[#1F1E17]">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.farmer}</p>
                      <div className="flex justify-between items-end mt-1">
                        <p className="text-xs text-[#878680]">{item.quantity} x Rp. {item.price.toLocaleString("id-ID")}</p>
                        <p className="text-sm font-bold text-[#1F1E17]">Rp. {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[#FEF9E6]/50 rounded-b-xl flex items-start gap-3">
                <ShieldCheck className="text-[#4BAF47] w-5 h-5 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Pesanan Anda diamankan dengan sistem **Rekening Bersama**. Dana akan diteruskan kepada petani setelah produk diterima dengan baik.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Payment & Action */}
          <div className="lg:w-[400px]">
            <div className="sticky top-24 space-y-6">
              {/* Payment Methods */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-[#1F1E17] mb-6 flex items-center gap-2 uppercase text-xs tracking-wider">
                  Metode Pembayaran
                </h3>
                <div className="space-y-3">
                  {/* AgriWallet */}
                  <div
                    onClick={() => setPaymentMethod("wallet")}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === "wallet" ? "border-[#4BAF47] bg-[#4BAF47]/5 shadow-md shadow-[#4BAF47]/5" : "border-gray-50 hover:border-gray-100 bg-gray-50/50"}`}
                  >
                    <div className={`p-3 rounded-lg ${paymentMethod === "wallet" ? "bg-[#4BAF47] text-white" : "bg-white text-gray-400 shadow-sm"}`}>
                      <Wallet size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-[#1F1E17]">AgriWallet</p>
                      <p className={`text-xs font-medium ${paymentMethod === "wallet" ? "text-[#4BAF47]" : "text-gray-400"}`}>Saldo: Rp. 150.000</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "wallet" ? "border-[#4BAF47]" : "border-gray-300"}`}>
                      {paymentMethod === "wallet" && <div className="w-2.5 h-2.5 rounded-full bg-[#4BAF47]" />}
                    </div>
                  </div>

                  {/* QRIS */}
                  <div
                    onClick={() => setPaymentMethod("qris")}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === "qris" ? "border-[#4BAF47] bg-[#4BAF47]/5 shadow-md shadow-[#4BAF47]/5" : "border-gray-50 hover:border-gray-100 bg-gray-50/50"}`}
                  >
                    <div className={`p-3 rounded-lg ${paymentMethod === "qris" ? "bg-[#4BAF47] text-white" : "bg-white text-gray-400 shadow-sm"}`}>
                      <QrCode size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-[#1F1E17]">QRIS</p>
                      <p className="text-xs text-gray-400">Bayar via e-wallet</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "qris" ? "border-[#4BAF47]" : "border-gray-300"}`}>
                      {paymentMethod === "qris" && <div className="w-2.5 h-2.5 rounded-full bg-[#4BAF47]" />}
                    </div>
                  </div>

                  {/* VA */}
                  <div
                    onClick={() => setPaymentMethod("va")}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === "va" ? "border-[#4BAF47] bg-[#4BAF47]/5 shadow-md shadow-[#4BAF47]/5" : "border-gray-50 hover:border-gray-100 bg-gray-50/50"}`}
                  >
                    <div className={`p-3 rounded-lg ${paymentMethod === "va" ? "bg-[#4BAF47] text-white" : "bg-white text-gray-400 shadow-sm"}`}>
                      <Building2 size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-[#1F1E17]">Virtual Account</p>
                      <p className="text-xs text-gray-400">Transfer antar bank</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "va" ? "border-[#4BAF47]" : "border-gray-300"}`}>
                      {paymentMethod === "va" && <div className="w-2.5 h-2.5 rounded-full bg-[#4BAF47]" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rincian Tagihan & Button */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-sm mb-6 flex items-center justify-between text-[#1F1E17]">
                  TOTAL PEMBAYARAN
                  <span className="text-[10px] font-normal text-gray-400 tracking-widest">(PPN 0%)</span>
                </h3>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal Belanja</span>
                    <span className="font-semibold text-[#1F1E17]">Rp. {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Biaya Pengiriman</span>
                    <span className="font-semibold text-[#1F1E17]">Rp. {shippingCost.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 mt-4 flex justify-between items-center">
                    <span className="text-base font-bold text-[#1F1E17]">Total Bayar</span>
                    <span className="text-2xl font-black text-[#4BAF47]">Rp. {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-[#4BAF47] hover:bg-[#3E9440] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#4BAF47]/20 group"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sedang Memproses...
                    </>
                  ) : (
                    <>
                      <Lock size={18} className="transition-transform group-hover:scale-110" />
                      Bayar Sekarang
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed">
                  Dengan mengklik tombol di atas, Anda menyetujui Ketentuan Layanan <br /> dan Kebijakan Privasi AgriConnect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>

      {/* Success Overlay */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#24231D]/90 backdrop-blur-md animate-in fade-in duration-500">
          <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#4BAF47]"></div>

            <div className="relative mb-8">
              <div className="w-24 h-24 bg-[#4BAF47]/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={64} className="text-[#4BAF47] animate-in zoom-in spin-in-12 duration-700" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 flex items-center justify-center">
                <div className="w-full h-full border-4 border-[#4BAF47] rounded-full animate-ping opacity-20" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-[#1F1E17] mb-3">Pembayaran Berhasil!</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Tagihan telah dibayar melalui <span className="font-bold text-[#4BAF47] uppercase">{paymentMethod === 'wallet' ? 'AgriWallet' : paymentMethod}</span>.
              Dana Anda telah diamankan di Escrow. <br />
              <b>Petani Pak Budi</b> sedang menyiapkan produk Anda.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/pelanggan/orders")}
                className="w-full bg-[#4BAF47] text-white py-4 rounded-xl font-bold hover:bg-[#3E9440] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#4BAF47]/20"
              >
                Lacak Pesanan Saya
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full bg-white border border-gray-100 text-[#1F1E17] py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
