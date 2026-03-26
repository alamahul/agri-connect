import { useNavigate, Link } from "react-router-dom";
import { Shield, Star, ShoppingCart, CreditCard, User, MapPin, Leaf, Calendar, Zap, Sparkles, Lock, Bot } from "lucide-react";
import { useState } from "react";
import sponsor from "./../assets/sponsor-section.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import imageFarmer2 from "./../assets/farmer2.jpeg";

const otherProducts = [
  {
    id: 1,
    name: "Cabai Merah Segar",
    category: "Sayuran",
    price: 35000,
    unit: "kg",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Pak Suparman",
  },
  {
    id: 2,
    name: "Kentang Premium",
    category: "Sayuran",
    price: 18000,
    unit: "kg",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Pak Budi",
  },
  {
    id: 3,
    name: "Wortel Organik",
    category: "Sayuran",
    price: 22000,
    unit: "kg",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1663441041574-274dc77d17bb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Bu Dewi",
  },
  {
    id: 4,
    name: "Jeruk Medan",
    category: "Buah",
    price: 38000,
    unit: "kg",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1636277009869-b182eb55347d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Bu Ratna",
  },
];

const ProductDetailPage = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("Katalog");
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [saveInfo, setSaveInfo] = useState(false);

  const product = {
    id: 1,
    name: "Tomat Organik Premium",
    price: 15000,
    unit: "kg",
    rating: 4.8,
    reviewCount: 12,
    image: "https://plus.unsplash.com/premium_photo-1770609621373-3e35cdeaf42c?q=80&w=503&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tomat organik pilihan yang ditanam dengan cinta oleh petani lokal Ciwidey. Memiliki tekstur padat, rasa manis-asam seimbang, dan kaya akan vitamin C serta Lycopene.",
    farmer: {
      name: "Bu Siti",
      group: "Kelompok Tani Mekar Sari",
      location: "Ciwidey, Kab. Bandung",
      distance: 15,
      avatar: imageFarmer2
    },
    status: {
      type: "preorder",
      label: "Panen Besok",
      description: "Sedang Ditanam (Estimasi Panen & Pengiriman: Besok Pagi jam 06.00)"
    },
    specs: {
      method: "Organik (Tanpa Pestisida)",
      altitude: "1.200 mdpl",
      grade: "Grade A (Sortir Ketat)",
      aiTip: "AgriBot menyarankan simpan di suhu kulkas 4°C agar tetap segar hingga 7 hari."
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Budi Santoso",
      date: "24 Mar 2024",
      rating: 5,
      comment: "Luar biasa! Fitur Panen Besok benar-benar bikin beda. Tomat sampai di rumah masih ada titik embunnya, seger banget seperti metik sendiri di kebun Bu Siti.",
    },
    {
      id: 2,
      name: "Ibu Retno",
      date: "22 Mar 2024",
      rating: 4,
      comment: "Baru kali ini belanja sayur online tapi tahu persis siapa petaninya. Terasa lebih tenang dan dukung ekonomi lokal. Kualitas tomatnya juga Grade A, jempol!",
    },
  ];

  const breadcrumb = ["Beranda", "Katalog Produk", "Tomat"];

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 999));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    console.log(`Menambahkan ${quantity} kg tomat ke keranjang`);
    alert(`${quantity} kg Tomat telah ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    console.log(`Membeli ${quantity} kg tomat sekarang`);
    alert(`Checkout untuk ${quantity} kg Tomat`);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewEmail || !reviewText) {
      alert("Harap isi semua field!");
      return;
    }
    console.log({
      name: reviewName,
      email: reviewEmail,
      rating: reviewRating,
      review: reviewText,
      saveInfo,
    });
    alert("Terima kasih atas ulasan Anda!");
    setReviewText("");
    setReviewName("");
    setReviewEmail("");
    setReviewRating(5);
    setSaveInfo(false);
  };

  const renderStars = (rating, size = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star
            key={i}
            size={size}
            className="fill-[#EEC044] text-[#EEC044]"
          />,
        );
      } else {
        stars.push(<Star key={i} size={size} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col text-[#1F1E17] bg-white min-h-screen">
      {/* Navbar */}
      <Navbar active={active} setActive={setActive} />

      {/* Hero Section */}
      <div className="relative w-full flex flex-col">
        {/* Breadcrumb */}
        <div className="flex flex-col justify-center px-4 sm:px-6">
          <div className="max-w-6xl mx-auto w-full py-6 sm:py-8 2xl:py-0 2xl:pt-8">
            <div className="flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
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
              Detail Produk
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl">
              Kualitas terbaik, kesegaran terjaga, langsung dari petani ke meja
              makan Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Product Detail Content */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x400?text=Tomat";
              }}
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1E17] mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl sm:text-2xl text-[#15803D]">
                Rp {product.price.toLocaleString("id-ID")}/{product.unit}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#EBECE2]">
              <div className="flex">
                {renderStars(product.rating, 16)}
              </div>
              <span className="text-xs sm:text-sm text-[#878680] font-medium">
                ({product.reviewCount} Ulasan Terverifikasi)
              </span>
            </div>

            {/* Farmer Traceability Profile */}
            <div 
              className="bg-green-50/50 border border-green-100 rounded-xl p-3 sm:p-4 mb-6 hover:bg-green-100 hover:border-green-300 transition-all cursor-pointer group"
              onClick={() => navigate(`/petani/1`)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={product.farmer.avatar}
                    alt={product.farmer.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm bg-gray-200"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=" + product.farmer.name + "&background=4BAF47&color=fff";
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#4BAF47] p-0.5 rounded-full">
                    <Shield size={10} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#4BAF47] font-bold uppercase tracking-wider mb-0.5 group-hover:text-green-700 transition-colors">Penanam Lokal</p>
                  <h4 className="text-sm sm:text-base font-bold text-[#1F1E17] leading-tight group-hover:text-[#15803D] transition-colors">{product.farmer.name}</h4>
                  <p className="text-[11px] text-[#878680]">{product.farmer.group}</p>
                </div>
                <div className="text-right border-l border-green-100 pl-3 group-hover:border-green-300 transition-colors">
                  <div className="flex items-center gap-1 justify-end text-[#4BAF47]">
                    <MapPin size={12} fill="currentColor" className="opacity-20" />
                    <span className="text-[11px] font-bold">{product.farmer.location}</span>
                  </div>
                  <p className="text-[10px] text-[#878680]">Jarak: <span className="text-[#4BAF47] font-bold">{product.farmer.distance} KM</span></p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#878680] mb-6 leading-relaxed italic border-l-4 border-[#EEC044] pl-4">
              "{product.description}"
            </p>

            {/* Freshness Status Indicator */}
            <div className="mb-6 p-3 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-start gap-2">
                {product.status.type === 'preorder' ? (
                  <Leaf size={18} className="text-orange-600 mt-0.5" />
                ) : (
                  <Zap size={18} className="text-[#4BAF47] mt-0.5" />
                )}
                <div>
                  <p className="text-xs font-bold text-orange-800 flex items-center gap-2">
                    STATUS: {product.status.label.toUpperCase()}
                  </p>
                  <p className="text-[11px] text-orange-700 leading-tight mt-0.5">
                    {product.status.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Jumlah Pembelian */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-[#1F1E17]">
                Jumlah Pembelian
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#ECE7E2] rounded-md">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    className="px-3 sm:px-3 py-1.5 sm:py-2 text-[#1F1E17] rounded-none border-r border-[#ECE7E2] hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <p className="w-10 sm:w-12 text-center py-1.5 sm:py-2 text-[#1F1E17] font-medium text-sm sm:text-base">
                    {quantity}
                  </p>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="px-3 sm:px-3 py-1.5 sm:py-2 text-[#1F1E17] rounded-none border-l border-[#ECE7E2] hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-[#1F1E17]">{product.unit}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-[#4BAF47] hover:bg-[#3E9440] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-md transition text-sm sm:text-base"
              >
                <ShoppingCart size={16} />
                Tambah ke Keranjang
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-md transition text-sm sm:text-base"
              >
                <CreditCard size={16} />
                Beli Sekarang
              </button>
            </div>

            {/* Dilindungi Sistem Escrow - High Contrast */}
            <div className="flex items-center justify-center gap-2.5 py-3 bg-green-50 rounded-lg border border-green-200">
              <Lock size={18} className="text-[#15803D] fill-[#15803D]/10" />
              <p className="text-xs sm:text-sm font-bold text-[#15803D] uppercase tracking-wide">
                100% Pembayaran Aman dengan Sistem Escrow
              </p>
            </div>
          </div>
        </div>

        {/* Spesifikasi Panen Agritech */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F1E17] mb-6 border-b-2 border-[#4BAF47] pb-2 inline-block">
            Spesifikasi Panen & Traceability
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <Zap size={20} className="text-[#4BAF47]" />
              </div>
              <div>
                <p className="text-[11px] text-[#878680] uppercase font-bold tracking-wider">Metode Tanam</p>
                <p className="text-sm font-bold text-[#1F1E17]">{product.specs.method}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <MapPin size={20} className="text-[#4BAF47]" />
              </div>
              <div>
                <p className="text-[11px] text-[#878680] uppercase font-bold tracking-wider">Ketinggian Kebun</p>
                <p className="text-sm font-bold text-[#1F1E17]">{product.specs.altitude}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <Shield size={20} className="text-[#4BAF47]" />
              </div>
              <div>
                <p className="text-[11px] text-[#878680] uppercase font-bold tracking-wider">Standar Kualitas</p>
                <p className="text-sm font-bold text-[#1F1E17]">{product.specs.grade}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50/30 rounded-xl border-2 border-dashed border-green-200">
            <div className="flex items-center gap-3">
              <Bot size={24} className="text-[#4BAF47]" />
              <p className="text-xs sm:text-sm text-[#1F1E17] font-medium leading-relaxed">
                <span className="font-bold text-[#4BAF47]">Saran AgriBot:</span> {product.specs.aiTip}
              </p>
            </div>
          </div>
        </div>

        {/* Ulasan Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F1E17] mb-4 border-b border-gray-200 pb-2">
            {product.reviewCount} Ulasan untuk {product.name}
          </h2>

          {/* Reviews List */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <div>
                    <h3 className="font-semibold text-[#1F1E17] text-sm sm:text-base">
                      {review.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(review.rating, 16)}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#878680]">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Tambahkan Ulasan Anda Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-[#1F1E17] mb-4">
              Tambahkan Ulasan Anda
            </h3>

            <form onSubmit={handleSubmitReview}>
              {/* Checkbox Save Info */}
              <div className="mb-4">
                <label className="flex items-center gap-2 text-xs sm:text-sm text-[#878680] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Simpan nama, email, dan situs web saya di browser ini untuk
                  komentar berikutnya.
                </label>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-[#1F1E17]">
                  Bagaimana pendapat Anda tentang produk ini?
                </label>
                <div className="flex gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={20}
                        className={
                          star <= reviewRating
                            ? "fill-[#EEC044] text-[#EEC044]"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Ulasan Text */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-[#1F1E17]">
                  Ulasan Anda
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                  className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#4BAF47] focus:border-[#4BAF47] outline-none"
                  placeholder="Tulis ulasan Anda di sini..."
                ></textarea>
              </div>

              {/* Nama lengkap */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-[#1F1E17]">
                  Nama lengkap
                </label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#4BAF47] focus:border-[#4BAF47] outline-none"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              {/* Alamat Email */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-[#1F1E17]">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#4BAF47] focus:border-[#4BAF47] outline-none"
                  placeholder="email@example.com"
                />
              </div>

              <button
                type="submit"
                className="bg-[#4BAF47] hover:bg-[#3E9440] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-md transition text-sm w-full sm:w-auto"
              >
                Kirim Ulasan
              </button>
            </form>
          </div>
        </div>

        {/* Dukung Petani Lokal & Lahat Produk Lainnya Section */}
        <div>
          <div className="bg-[#F3F3F3] rounded-lg p-6 sm:p-8 mb-6 sm:mb-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              Dukung Petani Lokal
            </h2>
            <p className="text-xs sm:text-sm text-[#878680] max-w-2xl mx-auto">
              Kami menyediakan berbagai sayur dan buah segar yang dipanen
              langsung dari kebun terbaik, dengan kualitas terjaga dan rasa
              alami untuk memenuhi kebutuhan sehari-hari Anda.
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1F1E17] flex items-center gap-2">
              <Sparkles size={24} className="text-[#EEC044] fill-[#EEC044]/20" />
              AgriBot Merekomendasikan untuk Anda
            </h3>
            <p className="text-xs sm:text-sm text-[#878680] mt-1 italic">
              "Pelanggan yang membeli Tomat biasanya juga membeli bahan-bahan ini untuk membuat Sambal atau Sayur Sop yang lezat."
            </p>
          </div>

          {/* Product Grid - 4 products responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {otherProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="pt-2 px-2">
                  <div className="relative h-32 sm:h-40 overflow-hidden bg-gray-100 rounded-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x200?text=Product";
                      }}
                    />
                    <span className="absolute top-2 left-2 bg-[#EEC044] text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="pb-2 pt-2 sm:pt-3 px-2">
                  <h3 className="font-bold text-xs sm:text-sm text-[#1F1E17] truncate">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs sm:text-md text-[#15803D]">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[10px] sm:text-xs text-[#15803D] ml-0.5 sm:ml-1">
                        /{item.unit}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 mt-2 w-full flex justify-center items-center bg-[#F3F3F3] border border-[#D9D9D9] rounded-sm">
                      <p className="text-[8px] sm:text-[10px]">
                        Dari Petani:{" "}
                        <span className="text-[#1F1E17]">{item.farmer}</span>
                      </p>
                    </div>

                    <button className="w-full bg-[#4BAF47] hover:bg-[#3E9440] text-white text-[10px] sm:text-xs py-1 font-semibold rounded-sm transition-colors duration-200 mb-1">
                      Beli Sekarang
                    </button>

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
      <div id="kontak-section">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetailPage;
