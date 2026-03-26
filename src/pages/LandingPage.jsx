import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Share2,
  Shield,
  Calendar,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Star,
  Package,
  Sun,
  CheckCircle2,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "./../contexts/AuthContext";
import logoText from "./../assets/logo-text.png";
import bgHero from "./../assets/bg-hero-fix.jpeg";
import imageFarmer1 from "./../assets/farmer1.png";
import imageFarmer2 from "./../assets/farmer2.jpeg";
import imageFarmer3 from "./../assets/farmer3.png";
import imageFarmer4 from "./../assets/farmer4.jpeg";
import { relatedNews as newsItems } from "../data/newsData";
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
    icon: <div className="bg-[#4BAF47]/10 p-2 rounded-lg text-[#4BAF47]"><Package size={40} /></div>,
    title: "Bebas Tengkulak",
    desc: "Harga transparan dan adil, langsung dari kebun ke dapur Anda.",
  },
  {
    icon: <div className="bg-[#EEC044]/10 p-2 rounded-lg text-[#EEC044]"><ShieldCheck size={40} /></div>,
    title: "100% Pembayaran Aman",
    desc: "Dana ditahan di Rekening Bersama (Escrow) hingga sayur Anda terima.",
  },
  {
    icon: <div className="bg-orange-100 p-2 rounded-lg text-orange-500"><Sun size={40} /></div>,
    title: "Sistem 'Panen Besok'",
    desc: "Pesan hari ini, dipanen esok pagi. Kesegaran maksimal tanpa food loss.",
  },
];

const farmers = [
  {
    name: "Pak Suryono",
    role: "Mitra Sayur Lembang",
    image: imageFarmer5,
    quote: "Sistem Escrow bikin saya tenang bertani, uang pasti cair.",
  },
  {
    name: "Ibu Ningsih",
    role: "Pengepul Tomat Ciwidey",
    image: imageFarmer7,
    quote: "AgriBot bantu saya baca tren harga pasar bulan ini.",
  },
  {
    name: "Kang Ujang",
    role: "Petani Bawang Brebes",
    image: imageFarmer6,
    quote: "Pendapatan saya naik 30% sejak lepas dari tengkulak.",
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
    image: "https://images.unsplash.com/photo-1526346698789-22fd84314424?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Pak Suparman",
  },
  {
    id: 2,
    name: "Tomat Organik",
    category: "Sayuran",
    price: 25000,
    unit: "kg",
    rating: 4.8,
    image: "https://plus.unsplash.com/premium_photo-1770609621373-3e35cdeaf42c?q=80&w=503&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Bu Siti",
  },
  {
    id: 3,
    name: "Kentang Premium",
    category: "Sayuran",
    price: 18000,
    unit: "kg",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Pak Budi",
  },
  {
    id: 4,
    name: "Wortel Organik",
    category: "Sayuran",
    price: 22000,
    unit: "kg",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1663441041574-274dc77d17bb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Bu Dewi",
  },
  {
    id: 5,
    name: "Apel Manalagi",
    category: "Buah",
    price: 45000,
    unit: "kg",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Pak Hendra",
  },
  {
    id: 6,
    name: "Jeruk Medan",
    category: "Buah",
    price: 38000,
    unit: "kg",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1636277009869-b182eb55347d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Bu Ratna",
  },
  {
    id: 7,
    name: "Bawang Merah",
    category: "Sayuran",
    price: 32000,
    unit: "kg",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1565685225009-fc85d9109c80?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farmer: "Pak Joko",
  },
  {
    id: 8,
    name: "Pisang Ambon",
    category: "Buah",
    price: 28000,
    unit: "sisir",
    rating: 4.5,
    image: "https://plus.unsplash.com/premium_photo-1675731118330-08c71253af17?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  const menu = ["Beranda", "Tentang", "Katalog", "Berita", "Kontak"];

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
      navigate("/register");
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""
          }`}
      >
        <nav
          className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between w-full border-b transition-all duration-300 ${isScrolled
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
                          } else if (item === "Berita") {
                            navigateToTop("/berita");
                          } else if (item === "Kontak") {
                            const kontakSection =
                              document.getElementById("kontak-section");
                            if (kontakSection) {
                              scrollToElementWithOffset("kontak-section");
                            }
                          } else if (item === "Tentang") {
                            const aboutSection =
                              document.getElementById("about-section");
                            if (aboutSection) {
                              scrollToElementWithOffset("about-section");
                            }
                          }
                        }}
                        className={`${active === item ? "text-[#EEC044]" : "text-white"
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
                          } else if (item === "Berita") {
                            navigateToTop("/berita");
                          } else if (item === "Kontak") {
                            const kontakSection =
                              document.getElementById("kontak-section");
                            if (kontakSection) {
                              scrollToElementWithOffset("kontak-section");
                            }
                          } else if (item === "Tentang") {
                            const aboutSection =
                              document.getElementById("about-section");
                            if (aboutSection) {
                              scrollToElementWithOffset("about-section");
                            }
                          }
                        }}
                        className={`${active === item ? "text-[#EEC044]" : "text-white"
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
              <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-2xl mt-2 font-medium">
                Dapatkan hasil panen terbaik dengan harga jujur. Platform Agritech yang melindungi uang Anda melalui sistem Escrow dan memastikan kesegaran sayur dengan fitur Panen Besok.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-6">
                <button
                  onClick={() => {
                    const productSection =
                      document.getElementById("product-section");
                    if (productSection) {
                      scrollToElementWithOffset("product-section");
                    }
                  }}
                  className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-xs sm:text-sm md:text-base font-bold px-6 py-3 rounded-[4px] shadow-lg shadow-amber-500/20 transition-all"
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
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-xs sm:text-sm md:text-base font-bold px-6 py-3 rounded-[4px] border border-white/30 transition-all"
                >
                  Gabung Mitra Tani
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
          {features.map((f, idx) => (
            <div key={idx} className="flex items-center px-3 sm:px-4">
              <div className="w-8 h-8 sm:w-10 md:w-12 rounded-[6px] flex items-center justify-center mr-2 sm:mr-3">
                {typeof f.icon === 'string' ? (
                  <img
                    src={f.icon}
                    className="w-6 sm:w-7 md:w-8 lg:w-10 xl:w-12"
                    alt={f.title}
                  />
                ) : (
                  f.icon
                )}
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
        <div className="pb-32 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-10 xl:gap-12 w-full max-w-5xl xl:max-w-5xl 2xl:max-w-6xl">
          <div className="w-full lg:w-1/2 lg:text-left px-8">
            <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl lg:leading-tight mb-4 sm:mb-6">
              Revolusi Agritech: Keadilan untuk Petani, Kesegaran untuk Anda.
            </h1>
            <div className="text-xs sm:text-sm md:text-base mb-4 space-y-4 lg:space-y-5">
              <p className="leading-relaxed">
                AgriConnect bukan sekadar platform jual-beli. Didukung oleh Kecerdasan Buatan (AgriBot) dan keamanan finansial kelas atas, kami membangun ekosistem di mana petani mendapatkan margin keuntungan yang layak, dan keluarga Anda mendapatkan nutrisi terbaik tanpa perantara.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="font-bold text-gray-800">AI-Powered Market Intelligence untuk Petani.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="font-bold text-gray-800">Garansi Resolusi Sengketa (Uang Kembali 100%).</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 p-1 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
                  <span className="font-bold text-gray-800">Pemberdayaan Digital Inklusif (Akses Fitur Suara/Audio).</span>
                </li>
              </ul>
            </div>

            <button className="flex items-center gap-2 bg-[#4BAF47] hover:bg-[#3E9440] text-white text-xs sm:text-sm md:text-base font-semibold px-4 py-2 md:px-6 md:py-3 rounded-[4px] transition-colors mx-auto lg:mx-0 mt-4 sm:mt-6">
              Pelajari Sistem Kami
            </button>
          </div>

          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="flex gap-2 sm:gap-3 items-center 2xl:justify-end justify-center">
              <div>
                <figure className="w-32 sm:w-40 md:w-44 lg:w-48 xl:w-52 2xl:w-64 h-36 sm:h-44 md:h-48 lg:h-52 xl:h-56 2xl:h-80 overflow-hidden rounded-[25px]">
                  <img
                    src={imageFarmer4}
                    alt="petani"
                    className="w-full h-full object-cover object-[80%_center]"
                  />
                </figure>
                <p className="text-[#4BAF47] font-black text-2xl leading-none">5.000+</p>
                <p className="w-24 sm:w-28 md:w-32 text-[10px] sm:text-xs text-[#4BAF47] font-bold uppercase tracking-tighter">
                  Petani Lokal Terberdayakan
                </p>
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
              <label className="block text-xs sm:text-sm md:text-base font-semibold mb-2 text-[#1F1E17]">
                Cari Produk
              </label>
              <form
                onSubmit={handleSearch}
                className="flex border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-green-500"
              >
                <input
                  type="text"
                  placeholder="Tanya AgriBot: Cari bahan untuk masak Sayur Sop..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 !text-xs sm:!text-sm md:!text-base placeholder:text-xs md:placeholder:text-sm outline-none !border-0 focus:ring-0"
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
              <label className="block text-xs sm:text-sm md:text-base font-semibold mb-2 text-[#1F1E17]">
                Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md !text-xs md:!text-sm lg:!text-base placeholder:text-xs sm:text-xs focus-within:ring-1 focus-within:ring-green-500"
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
              <label className="block text-xs sm:text-sm md:text-base font-semibold mb-2 text-[#1F1E17]">
                Harga
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-xs sm:text-sm md:text-base focus-within:ring-1 focus-within:ring-green-500"
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
                        {product.id === 4 && (
                          <div className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] sm:text-[10px] font-black px-2 py-1 rounded-bl-lg shadow-lg uppercase tracking-tighter">
                            Panen Besok (Pre-Order)
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 bg-[#EEC044] text-white text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
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
                        <div className="mb-1 mt-1.5 w-full flex flex-col justify-center items-center bg-[#F3F3F3] border border-[#D9D9D9] rounded-sm py-1">
                          <p className="text-[8px] sm:text-[9px] md:text-[10px] leading-none mb-1">
                            Dari Petani:{" "}
                            <span className="text-[#1F1E17] font-bold">
                              {product.farmer}
                            </span>
                          </p>
                          <div className="flex items-center gap-0.5">
                            <Star size={10} className="fill-amber-400 text-amber-400" />
                            <span className="text-[10px] font-bold text-gray-700">{product.rating}</span>
                          </div>
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
          <p className="text-[#EEC044] font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
            Pahlawan Pangan Lokal Kami
          </p>
          <h1 className="font-extrabold text-2xl sm:text-3xl text-[#1F1E17]">
            Di balik sayur yang segar, ada keringat dan dedikasi mereka.
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-11">
          {farmers.map((item, index) => (
            <div
              key={index}
              className="relative mt-3 cursor-pointer group/farmer transform transition-all hover:-translate-y-2"
              onClick={() => navigateToTop(`/petani/${index + 1}`)}
            >
              <div className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-52 sm:h-64 md:h-72 lg:h-80 xl:h-96 overflow-hidden rounded-md border-2 border-transparent group-hover/farmer:border-[#4BAF47] transition-all">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover/farmer:scale-105 transition-all duration-500"
                />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 bg-white w-[90%] px-4 py-3 rounded-2xl shadow-xl flex flex-col items-center text-center border border-gray-100 z-10 group-hover/farmer:shadow-2xl group-hover/farmer:shadow-[#4BAF47]/20 transition-all">
                <div className="absolute -top-3 left-4 bg-[#4BAF47] p-1.5 rounded-lg text-white shadow-lg">
                  <Share2 size={16} />
                </div>
                <div className="mt-1">
                  <p className="font-black text-sm text-[#1F1E17] uppercase tracking-tighter group-hover/farmer:text-[#4BAF47] transition-colors">
                    {item.name}
                  </p>
                  <p className="text-[#4BAF47] text-[10px] font-bold mb-2">
                    {item.role}
                  </p>
                  <p className="text-[#878680] text-[9px] italic leading-tight">
                    "{item.quote}"
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
                onClick={() => navigate(`/berita/${news.id}`)}
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
              onClick={() => navigateToTop("/berita")}
              className="border border-[#4BAF47] text-[#4BAF47] hover:bg-[#4BAF47] hover:text-white transition-all duration-300 px-6 py-2 rounded-md font-semibold text-xs sm:text-sm"
            >
              Lihat Semua Berita
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section
        id="kontak-section"
        className="w-full py-16 px-4 relative overflow-hidden mt-12 mb-[-1px]"
      >
        {/* Decorative Background Pattern */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url(${bgFarmer})`,
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        ></div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center relative z-10">
          {/* Map on the Left */}
          <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white group relative">
            <iframe
              title="Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.025345678881!2d107.593722!3d-6.887556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e696dce706ed%3A0x6b4f7a6a4a6a4a6a!2sJl.%20Raya%20Sukajadi%20No.80%2C%20Pasteur%2C%20Kec.%20Sukajadi%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040161!5e0!3m2!1sen!2sid!4v1711444444444!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>

          {/* Form on the Right */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-[#EEC044] font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
              Dukung Ketahanan Pangan Nasional
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1E17] mb-8">
              Mari Berkolaborasi
            </h2>

            <form className="w-full space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Nama lengkap"
                  className="flex-1 p-4 rounded-[16px] border-0 focus:outline-none focus:ring-2 focus:ring-[#4BAF47] bg-white text-xs sm:text-sm md:text-base shadow-sm"
                />
                <input
                  type="email"
                  placeholder="Alamat email"
                  className="flex-1 p-4 rounded-[16px] border-0 focus:outline-none focus:ring-2 focus:ring-[#4BAF47] bg-white text-xs sm:text-sm md:text-base shadow-sm"
                />
              </div>
              <textarea
                placeholder="Ada pertanyaan seputar kemitraan B2B, logistik, atau sistem platform kami? Tim AgriConnect siap membantu."
                rows="6"
                className="w-full p-4 rounded-[16px] border-0 focus:outline-none focus:ring-2 focus:ring-[#4BAF47] bg-white text-xs sm:text-sm md:text-base shadow-sm resize-none"
              ></textarea>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-[#4BAF47] hover:bg-[#3E9440] text-white font-bold py-3.5 px-10 rounded-[12px] transition-all duration-300 shadow-lg shadow-green-900/10 text-xs sm:text-sm md:text-base w-full sm:w-auto hover:-translate-y-1 active:scale-95"
                >
                  Kirim Pesan
                </button>
                <button
                  type="button"
                  className="bg-[#EEC044] hover:bg-[#D4A937] text-white font-bold py-3.5 px-10 rounded-[12px] transition-all duration-300 shadow-lg shadow-yellow-900/10 text-xs sm:text-sm md:text-base w-full sm:w-auto hover:-translate-y-1 active:scale-95"
                >
                  Lihat Lokasi
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
