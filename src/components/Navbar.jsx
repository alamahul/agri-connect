import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import logoText from "../assets/logo-text.png";

const menuItems = [
  { name: "Beranda", path: "/", isAnchor: false, anchorId: null },
  {
    name: "Tentang",
    path: "/",
    isAnchor: true,
    anchorId: "about-section",
  },
  { name: "Katalog", path: "/catalog", isAnchor: false, anchorId: null },
  { name: "Berita", path: "/berita", isAnchor: false, anchorId: null },
  {
    name: "Kontak",
    path: null,
    isAnchor: true,
    anchorId: "kontak-section",
    isGlobal: true,
  },
];

const Navbar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(80);

  // Mendapatkan tinggi navbar
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fungsi untuk scroll ke elemen dengan offset navbar
  const scrollToElementWithOffset = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offset = navbarHeight + 30;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleMenuClick = (item) => {
    // Cek apakah menu yang diklik sama dengan halaman yang sedang aktif
    const isSamePage = (() => {
      if (item.name === "Beranda") return location.pathname === "/";
      if (item.name === "Katalog") return location.pathname === "/catalog";
      if (item.name === "Berita") return location.pathname === "/berita";
      if (item.name === "Tentang") return location.pathname === "/";
      if (item.name === "Kontak") return location.pathname === "/";
      return false;
    })();

    // Jika menu yang diklik sama dengan halaman yang sedang aktif
    if (isSamePage) {
      // Untuk Beranda di halaman beranda, scroll ke atas
      if (item.name === "Beranda" && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        closeMobileMenu();
        return;
      }
      // Untuk Katalog di halaman katalog, scroll ke atas
      if (item.name === "Katalog" && location.pathname === "/catalog") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        closeMobileMenu();
        return;
      }
      // Untuk Berita di halaman berita, scroll ke atas
      if (item.name === "Berita" && location.pathname === "/berita") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        closeMobileMenu();
        return;
      }
      // Untuk Tentang di halaman beranda, scroll ke section
      if (item.name === "Tentang" && location.pathname === "/") {
        const aboutElement = document.getElementById("about-section");
        if (aboutElement) {
          scrollToElementWithOffset("about-section");
          closeMobileMenu();
          return;
        }
      }
      // Untuk Kontak di halaman beranda, scroll ke section
      if (item.name === "Kontak" && location.pathname === "/") {
        const kontakElement = document.getElementById("kontak-section");
        if (kontakElement) {
          scrollToElementWithOffset("kontak-section");
          closeMobileMenu();
          return;
        }
      }
    }

    // Set active menu
    setActive(item.name);
    closeMobileMenu();

    // Handle navigasi
    if (item.name === "Kontak") {
      const kontakElement = document.getElementById("kontak-section");

      if (kontakElement) {
        scrollToElementWithOffset("kontak-section");
      } else {
        navigate("/");
        setTimeout(() => {
          scrollToElementWithOffset("kontak-section");
        }, 200);
      }
      return;
    }

    if (item.isAnchor && item.name === "Tentang") {
      const aboutElement = document.getElementById("about-section");

      if (aboutElement) {
        scrollToElementWithOffset("about-section");
      } else {
        navigate("/");
        setTimeout(() => {
          scrollToElementWithOffset("about-section");
        }, 200);
      }
      return;
    }

    if (item.name === "Beranda") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
      return;
    }

    navigate(item.path);
  };

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""
        }`}
    >
      <nav className="bg-[#24231D] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between w-full border-b border-white/10 relative z-50">
        <div className="w-40 sm:w-60 text-white rounded-[6px] flex items-center justify-center">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img
              src={logoText}
              alt="logo agriconnect"
              className="w-32 sm:w-40 2xl:w-60 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <div className="flex justify-center items-center gap-8 xl:gap-16">
            <div>
              <ul className="text-white !text-xs xl:text-sm 2xl:text-base flex gap-6 xl:gap-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(item);
                      }}
                      className={`${active === item.name ? "text-[#EEC044]" : "text-white"
                        } hover:text-[#EEC044] transition-all duration-300 ease-in-out cursor-pointer`}
                    >
                      {item.name}
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
                    className="flex items-center gap-2 bg-[#4BAF47] hover:bg-[#3E9440] text-white !text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 xl:py-2 rounded-[4px] whitespace-nowrap"
                  >
                    Gabung sebagai Pembeli
                  </button>
                  <button
                    onClick={handleDashboardRedirect}
                    className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white !text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 xl:py-2 rounded-[4px] whitespace-nowrap"
                  >
                    Gabung sebagai Petani
                  </button>
                </>
              ) : (
                <button
                  onClick={handleDashboardRedirect}
                  className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white !text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 xl:py-2 rounded-[4px]"
                >
                  <span className="max-w-[120px] truncate">{user.fullName}</span>
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
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="lg:hidden bg-[#24231D] border-t border-white/10 absolute top-full left-0 right-0 z-50 max-h-[calc(100vh-60px)] overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(item);
                      }}
                      className={`${active === item.name ? "text-[#EEC044]" : "text-white"
                        } hover:text-[#EEC044] transition-all duration-300 ease-in-out block py-2`}
                    >
                      {item.name}
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
                    {user.fullName}
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
