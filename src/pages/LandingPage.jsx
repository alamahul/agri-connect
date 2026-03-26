import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Share2,
  Shield,
  Calendar,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "./../contexts/AuthContext";
import logoText from "./../assets/logo-text.png";
import bgHero from "./../assets/bg-hero-fix.jpeg";
import imageFarmer1 from "./../assets/farmer1.png";
import imageFarmer2 from "./../assets/farmer2.jpeg";
import imageFarmer3 from "./../assets/farmer3.png";
import imageFarmer4 from "./../assets/farmer4.jpeg";
import imageFarmer5 from "./../assets/farmer5.jpeg";
import imageFarmer6 from "./../assets/farmer6.jpeg";
import imageFarmer7 from "./../assets/farmer7.jpeg";
import traktor from "./../assets/traktor.png";
import th from "./../assets/th.png";
import tt from "./../assets/tt.png";
import go from "./../assets/go.png";
import bgFarmer from "./../assets/bg-farmer.png";
import number from "./../assets/number.png";
import sponsor from "./../assets/sponsor-section.png";
import searchIcon from "./../assets/search-icon.png";
import Footer from "./../components/Footer";

const features = [
  {
    icon: th,
    title: "Transparansi Harga",
    desc: "Mendapatkan harga terbaik",
  },
  {
    icon: go,
    title: "Gratis Ongkir",
    desc: "Pembelian lebih dari 700rb",
  },
  {
    icon: tt,
    title: "Tanpa Tengkulak",
    desc: "Membuat petani sejahtera",
  },
];

const farmers = [
  {
    name: "Dwi Lestari",
    role: "Petani",
    image: imageFarmer5,
  },
  {
    name: "Siti Aminah",
    role: "Petani",
    image: imageFarmer7,
  },
  {
    name: "Rika Kartika",
    role: "Petani",
    image: imageFarmer6,
  },
];

const newsItems = [
  {
    id: 1,
    title: "AgriConnect Bantu Petani Milenial Tingkatkan Hasil Panen 40%",
    excerpt:
      "Program pelatihan digital farming yang dilakukan AgriConnect bersama Kementerian Pertanian berhasil meningkatkan produktivitas petani milenial hingga 40% dalam 6 bulan.",
    date: "15 Maret 2026",
    image: imageFarmer4,
    category: "Program Petani",
  },
  {
    id: 2,
    title: "Sistem Escrow AgriConnect Raih Penghargaan Inovasi Digital",
    excerpt:
      "Sistem pembayaran aman Rekening Bersama (Escrow) dari AgriConnect mendapatkan penghargaan sebagai inovasi digital terbaik di ajang Techsoft 2026.",
    date: "5 Maret 2026",
    image: imageFarmer5,
    category: "Penghargaan",
  },
  {
    id: 3,
    title: "Kemitraan Strategis dengan 500 Petani Lokal di Jawa Barat",
    excerpt:
      "AgriConnect resmi bermitra dengan lebih dari 500 petani lokal di wilayah Jawa Barat untuk memastikan ketersediaan produk segar sepanjang tahun.",
    date: "20 Februari 2026",
    image: imageFarmer6,
    category: "Kemitraan",
  },
];

const latestProducts = [
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
    name: "Tomat Organik",
    category: "Sayuran",
    price: 25000,
    unit: "kg",
    rating: 4.8,
    image: imageFarmer2,
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
    farmer: "Bu Lina",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [active, setActive] = useState("Beranda");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const menu = ["Beranda", "Tentang Kami", "Katalog", "Kontak Kami"];

  // Get navbar height
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);

    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(latestProducts.map((p) => p.category)),
    ];
    return uniqueCategories;
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...latestProducts];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.farmer.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (sortBy === "termurah") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "termahal") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const navigateToTop = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fungsi untuk scroll dengan offset navbar
  const scrollToElementWithOffset = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offset = navbarHeight + 80; // Tambah offset lebih besar agar judul tidak terpotong
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col text-[#1F1E17] overflow-x-hidden">
      {/* Navbar*/}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <nav
          className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between w-full border-b transition-all duration-300 ${
            isScrolled
              ? "bg-[#24231D] border-white/10"
              : "bg-transparent border-white/10"
          }`}
        >
          <div className="w-28 sm:w-32 md:w-40 lg:w-48 xl:w-60 text-white rounded-[6px] flex items-center justify-center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img
                src={logoText}
                alt="logo agriconnect"
                className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-48 2xl:w-60 object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex justify-center items-center gap-8 xl:gap-16">
              <div>
                <ul className="text-white text-xs xl:text-sm 2xl:text-base flex gap-6 xl:gap-8">
                  {menu.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActive(item);
                          if (item === "Beranda") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else if (item === "Katalog") {
                            navigateToTop("/catalog");
                          } else if (item === "Kontak Kami") {
                            const kontakSection =
                              document.getElementById("kontak-section");
                            if (kontakSection) {
                              scrollToElementWithOffset("kontak-section");
                            }
                          } else if (item === "Tentang Kami") {
                            const aboutSection =
                              document.getElementById("about-section");
                            if (aboutSection) {
                              scrollToElementWithOffset("about-section");
                            }
                          }
                        }}
                        className={`${
                          active === item ? "text-[#EEC044]" : "text-white"
                        } hover:text-[#EEC044] transition-all duration-300 ease-in-out cursor-pointer`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 xl:gap-[17px]">
                {!user ? (
                  <>
                    <button
                      onClick={handleDashboardRedirect}
                      className="flex items-center gap-2 bg-[#4BAF47] hover:bg-[#3E9440] text-white text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 xl:py-2 rounded-[4px] whitespace-nowrap"
                    >
                      Gabung sebagai Pembeli
                    </button>
                    <button
                      onClick={handleDashboardRedirect}
                      className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 xl:py-2 rounded-[4px] whitespace-nowrap"
                    >
                      Gabung sebagai Petani
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleDashboardRedirect}
                    className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 xl:py-2 rounded-[4px]"
                  >
                    Dashboard
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 relative z-50"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Dropdown */}
            <div className="lg:hidden bg-[#24231D] border-t border-white/10 absolute top-full left-0 right-0 z-50 max-h-[calc(100vh-60px)] overflow-y-auto">
              <div className="px-4 py-4 space-y-4">
                <ul className="space-y-3">
                  {menu.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActive(item);
                          closeMobileMenu();
                          if (item === "Beranda") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          } else if (item === "Katalog") {
                            navigateToTop("/catalog");
                          } else if (item === "Kontak Kami") {
                            const kontakSection =
                              document.getElementById("kontak-section");
                            if (kontakSection) {
                              scrollToElementWithOffset("kontak-section");
                            }
                          } else if (item === "Tentang Kami") {
                            const aboutSection =
                              document.getElementById("about-section");
                            if (aboutSection) {
                              scrollToElementWithOffset("about-section");
                            }
                          }
                        }}
                        className={`${
                          active === item ? "text-[#EEC044]" : "text-white"
                        } hover:text-[#EEC044] transition-all duration-300 ease-in-out block py-2`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
                  {!user ? (
                    <>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          handleDashboardRedirect();
                        }}
                        className="flex items-center justify-center gap-2 bg-[#4BAF47] hover:bg-[#3E9440] text-white text-sm font-semibold px-4 py-2 rounded-[4px] w-full"
                      >
                        Gabung sebagai Pembeli
                      </button>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          handleDashboardRedirect();
                        }}
                        className="flex items-center justify-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-sm font-semibold px-4 py-2 rounded-[4px] w-full"
                      >
                        Gabung sebagai Petani
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        handleDashboardRedirect();
                      }}
                      className="flex items-center justify-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-sm font-semibold px-4 py-2 rounded-[4px] w-full"
                    >
                      Dashboard
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hero Section - Add padding top to account for fixed navbar */}
      <div
        className="relative min-h-screen w-full flex flex-col bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${bgHero})`,
        }}
      >
        {/* Hero Content - Responsive with padding top for fixed navbar */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-12 w-full max-w-7xl mx-auto">
            <div className="flex flex-col gap-y-3 text-center lg:text-left max-w-3xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-white tracking-tight">
                Potong Rantai Pasok Sejahterakan Petani Lokal
              </h1>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-4">
                <button
                  onClick={() => {
                    const productSection =
                      document.getElementById("product-section");
                    if (productSection) {
                      scrollToElementWithOffset("product-section");
                    }
                  }}
                  className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-[4px]"
                >
                  Mulai Belanja
                </button>
                <button
                  onClick={() => {
                    const kontakSection =
                      document.getElementById("kontak-section");
                    if (kontakSection) {
                      scrollToElementWithOffset("kontak-section");
                    }
                  }}
                  className="flex items-center gap-2 bg-[#24231D] hover:bg-[#2F2E27] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-[4px]"
                >
                  Kontak Kami
                </button>
              </div>
            </div>

            {/* Gallery - Responsive */}
            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-lg w-96 max-w-md lg:max-w-lg">
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                <figure className="h-28 sm:h-32 md:h-36 lg:h-40 xl:h-48 overflow-hidden rounded-sm">
                  <img
                    src={imageFarmer2}
                    alt="petani"
                    className="w-full h-full object-cover"
                  />
                </figure>
                <figure className="h-28 sm:h-32 md:h-36 lg:h-40 xl:h-48 overflow-hidden rounded-sm">
                  <img
                    src={imageFarmer3}
                    alt="petani"
                    className="w-full h-full object-cover"
                  />
                </figure>
                <figure className="col-span-2 h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 overflow-hidden rounded-sm">
                  <img
                    src={imageFarmer1}
                    alt="petani"
                    className="w-full h-full object-cover"
                  />
                </figure>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Feature Cards - Responsive */}
      <div className="relative flex justify-center -mt-24 sm:-mt-16 md:-mt-14 lg:-mt-14 xl:-mt-14 px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8 2xl:py-9 rounded-md bg-white shadow-xl w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-center px-3 sm:px-4">
              <div className="w-8 h-8 sm:w-10 md:w-12 rounded-[6px] flex items-center justify-center mr-2 sm:mr-3">
                <img
                  src={f.icon}
                  className="w-6 sm:w-7 md:w-8 lg:w-10 xl:w-12"
                  alt={f.title}
                />
              </div>
              <div>
                <p className="text-[#1F1E17] font-extrabold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                  {f.title}
                </p>
                <p className="text-[#878680] text-[10px] sm:text-xs md:text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div
        id="about-section"
        className="flex justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-36 bg-no-repeat bg-left-bottom bg-contain"
        style={{
          backgroundImage: `url(${bgFarmer})`,
        }}
      >
        <div className="pb-32 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0 xl:gap-0 w-full max-w-5xl xl:max-w-5xl 2xl:max-w-6xl">
          <div className="w-full lg:w-full lg:text-left px-8">
            <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6">
              Misi Kami: Memutus Rantai Pasok, Menyejahterakan Petani Lokal
            </h1>
            <div className="text-xs sm:text-sm mb-4 space-y-2">
              <p>
                AgriConnect hadir untuk memangkas jalur distribusi yang panjang.
                Melalui sistem Escrow yang aman, kami memastikan petani
                mendapatkan harga yang adil dan pembeli mendapatkan hasil panen
                segar langsung dari lahan.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <b>Sistem Escrow (Rekening Bersama):</b> Dana aman tersimpan
                  hingga pembeli menerima barang sesuai kualitas.
                </li>
                <li>
                  <b>Teknologi Transparansi Harga:</b> informasi harga pasar
                  terkini untuk memberdayakan petani.
                </li>
              </ul>
            </div>

            <button className="flex items-center gap-2 bg-[#4BAF47] hover:bg-[#3E9440] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-[4px] transition-colors mx-auto lg:mx-0">
              Pelajari Sistem Kami
            </button>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex gap-2 sm:gap-3 item 2xl:justify-end justify-center">
              <div>
                <figure className="w-32 sm:w-40 md:w-44 lg:w-48 xl:w-52 2xl:w-64 h-36 sm:h-44 md:h-48 lg:h-52 xl:h-56 2xl:h-80 overflow-hidden rounded-[25px]">
                  <img
                    src={imageFarmer4}
                    alt="petani"
                    className="w-full h-full object-cover object-[80%_center]"
                  />
                </figure>
                <div className="flex flex-col items-center text-center mt-4">
                  <img
                    src={number}
                    alt="number"
                    className="w-10 sm:w-12 md:w-14 lg:w-16"
                  />
                  <p className="w-24 sm:w-28 md:w-32 text-[10px] sm:text-xs text-[#4BAF47]">
                    MITRA PETANI BERPENGALAMAN
                  </p>
                </div>
              </div>
              <figure className="w-32 sm:w-40 md:w-44 lg:w-48 xl:w-52 2xl:w-64 h-48 sm:h-56 md:h-60 lg:h-64 xl:h-72 2xl:h-full overflow-hidden rounded-[25px]">
                <img
                  src={traktor}
                  alt="traktor"
                  className="w-full h-full object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Section */}
      <div className="w-full">
        <img src={sponsor} alt="sponsor" className="w-full object-contain" />
      </div>

      {/* Product Section Grid */}
      <div
        id="product-section"
        className="w-full bg-white px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center mt-5 md:mt-10"
      >
        <div className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-end gap-3 w-full">
            <div className="flex-1 min-w-[200px] sm:min-w-[300px]">
              <label className="block text-xs sm:text-sm font-semibold mb-2 text-[#1F1E17]">
                Cari Produk
              </label>
              <form
                onSubmit={handleSearch}
                className="flex border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-green-500"
              >
                <input
                  type="text"
                  placeholder="Cari Produk Pertanian..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 !text-xs sm:text-sm placeholder:text-xs outline-none !border-0 focus:ring-0"
                />
                <button
                  type="submit"
                  className="bg-[#4BAF47] hover:bg-[#3E9440] px-2 m-1 flex items-center justify-center rounded-sm"
                >
                  <img src={searchIcon} alt="search" className="w-3 sm:w-4" />
                </button>
              </form>
            </div>

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

          <h1 className="text-xl sm:text-2xl font-extrabold mb-4 sm:mb-6 mt-8">
            Produk Terbaru
          </h1>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">
                Tidak ada produk yang ditemukan
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="pt-2 px-2">
                      <div className="relative h-28 sm:h-32 md:h-36 lg:h-40 overflow-hidden bg-gray-100 rounded-sm">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-[#EEC044] text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="pb-2 pt-2 px-2">
                      <h3 className="font-bold text-xs sm:text-sm text-[#1F1E17] truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-0.5">
                        <div>
                          <span className="text-xs sm:text-sm md:text-base text-[#15803D]">
                            Rp {product.price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-[9px] sm:text-xs text-[#15803D] ml-0.5">
                            /{product.unit}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 mt-1.5 w-full flex justify-center items-center bg-[#F3F3F3] border border-[#D9D9D9] rounded-sm py-0.5">
                          <p className="text-[8px] sm:text-[9px] md:text-[10px]">
                            Dari Petani:{" "}
                            <span className="text-[#1F1E17] font-medium">
                              {product.farmer}
                            </span>
                          </p>
                        </div>
                        <button className="w-full bg-[#4BAF47] hover:bg-[#3E9440] text-white text-[9px] sm:text-[10px] md:text-xs py-1 font-semibold rounded-sm transition-colors duration-200 mb-1">
                          Beli Sekarang
                        </button>
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                          <Shield
                            size={9}
                            className="text-[#EEC044] sm:w-3 sm:h-3"
                          />
                          <p className="text-[7px] sm:text-[8px] md:text-[9px] text-[#878680]">
                            Dilindungi Sistem Escrow
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10 sm:mt-12">
                <button
                  onClick={() => navigateToTop("/catalog")}
                  className="border border-[#4BAF47] text-[#4BAF47] hover:bg-[#4BAF47] hover:text-white transition-all duration-300 px-6 py-2 rounded-md font-semibold text-xs sm:text-sm"
                >
                  Lihat Semua Produk
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Farmers Section */}
      <div className="flex flex-col gap-3 sm:gap-8 mt-8 sm:mt-10 px-4">
        <div className="flex flex-col items-center text-center">
          <p className="font-grace text-[#EEC044] text-base sm:text-lg md:text-xl tracking-wide">
            Dari Kebun Terbaik
          </p>
          <h1 className="font-extrabold text-2xl sm:text-3xl">
            Kenali Para Petani Kami
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-11">
          {farmers.map((item, index) => (
            <div key={index} className="relative mt-3">
              <div className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-52 sm:h-64 md:h-72 lg:h-80 xl:h-96 overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-3/4 -translate-x-1/2 bottom-[-20px] bg-white w-36 sm:w-36 md:w-40 lg:w-44 xl:w-48 px-3 py-2 rounded-xl shadow-md flex items-center gap-2">
                <div className="absolute left-[-12px] bg-[#4BAF47] p-1 rounded-md text-white">
                  <Share2 size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-end ml-4">
                  <p className="font-bold text-[10px] sm:text-xs text-[#1F1E17]">
                    {item.name}
                  </p>
                  <p className="text-[#878680] text-[8px] sm:text-[10px]">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="w-full bg-white py-12 sm:py-16 px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-grace text-[#EEC044] text-base sm:text-lg md:text-xl mb-2">
              Update Terkini
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1E17]">
              Berita & Artikel
            </h2>
            <p className="text-[#878680] text-xs sm:text-sm mt-2">
              Informasi terbaru seputar pertanian dan AgriConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#EEC044] text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-sm">
                    {news.category}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-[#878680] text-[10px] sm:text-xs mb-2">
                    <Calendar size={12} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#1F1E17] mb-2 line-clamp-2 group-hover:text-[#4BAF47] transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-[#878680] text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="mt-3 flex items-center text-[#4BAF47] text-xs sm:text-sm font-semibold group-hover:gap-2 transition-all">
                    Baca Selengkapnya
                    <ChevronRight size={14} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <button
              onClick={() => navigateToTop("/news")}
              className="border border-[#4BAF47] text-[#4BAF47] hover:bg-[#4BAF47] hover:text-white transition-all duration-300 px-6 py-2 rounded-md font-semibold text-xs sm:text-sm"
            >
              Lihat Semua Berita
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="kontak-section" className="">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
