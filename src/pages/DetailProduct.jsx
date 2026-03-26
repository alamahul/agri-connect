import { useNavigate, Link } from "react-router-dom";
import { Shield, Star, ShoppingCart, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import imageFarmer1 from "./../assets/farmer1.png";
import imageFarmer3 from "./../assets/farmer3.png";
import sponsor from "./../assets/sponsor-section.png";
import tomatoPlaceholder from "./../assets/farmer2.jpeg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const otherProducts = [
  {
    id: 1,
    name: "Cabai Merah Segar",
    category: "Sayuran",
    price: 35000,
    unit: "kg",
    rating: 4.5,
    image: imageFarmer1,
    farmer: "Pak Suparman",
  },
  {
    id: 2,
    name: "Kentang Premium",
    category: "Sayuran",
    price: 18000,
    unit: "kg",
    rating: 4.3,
    image: imageFarmer3,
    farmer: "Pak Budi",
  },
  {
    id: 3,
    name: "Wortel Organik",
    category: "Sayuran",
    price: 22000,
    unit: "kg",
    rating: 4.6,
    image: imageFarmer1,
    farmer: "Bu Dewi",
  },
  {
    id: 4,
    name: "Jeruk Medan",
    category: "Buah",
    price: 38000,
    unit: "kg",
    rating: 4.4,
    image: imageFarmer3,
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

  const product = {
    id: 1,
    name: "Tomat",
    price: 15000,
    unit: "kg",
    rating: 4.5,
    reviewCount: 1,
    image: tomatoPlaceholder,
    description:
      "Alqiam hendrerit a augue insuscipit. Etiam aliquam massa quis des mauris commodo venenatis ligula commodo leez sed blandit convallis dignissim onec vel pellentesque neque.",
    fullDescription: `Lorem ipsum dolor sit amet sectetur adipiscin elit cras feulat antesed ces condimentum viverra duis autem nim convallis id diam vitae duis eget dictum erosin dictum sem. Vivamus sed molestie sapien aliquam et facilisis arcu dult molestie augue suspendisse sodales tortor nunced quis cto ligula posuere cursus keuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecated cupidatat non proident.
      Aliquam et facilisis arcuet olestie augue. Suspendisse sodales tortor nunc quis auctor ligula posuere cursus duis aute irure dolor in reprehenderit in voluptate velit esse cill doloreeu fugiat nulla pariatur excepteur sint occaecated cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. Vivaus sed dellly molestie sapien. Aliquam et facilisis arcuet molestie augue.`,
    farmer: "Pak Tani",
  };

  const reviews = [
    {
      id: 1,
      name: "Kevin Martin",
      date: "Jul 10, 2022",
      rating: 5,
      comment:
        "Tomatnya berkualitas bagus dan terlihat segar seperti baru dipanen. Rasanya manis dengan sedikit asam yang pas. Sangat cocok digunakan untuk masakan, salad, maupun jus.",
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
            <div className="flex items-center gap-2 mb-2 pb-5 border-b border-[#EBECE2]">
              <span className="text-xs sm:text-sm text-[#878680]">
                ({product.reviewCount} Ulasan Pelanggan)
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#878680] mb-6 leading-relaxed">
              {product.description}
            </p>

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

            {/* Dilindungi Sistem Escrow */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <Shield size={18} className="text-[#EEC044]" />
              <p className="text-xs sm:text-sm text-gray-500">
                Dilindungi Sistem Escrow
              </p>
            </div>
          </div>
        </div>

        {/* Deskripsi Produk */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F1E17] mb-4 border-b border-gray-200 pb-2">
            Deskripsi Produk
          </h2>
          <div className="text-sm sm:text-base text-[#878680] leading-relaxed whitespace-pre-line">
            {product.fullDescription}
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

          <h3 className="text-xl sm:text-2xl font-bold text-[#1F1E17] mb-4 sm:mb-6">
            Lahat Produk Lainnya
          </h3>

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
