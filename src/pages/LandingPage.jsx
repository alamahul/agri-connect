import { useNavigate, Link } from "react-router-dom";
import {
  Sprout,
  ArrowRight,
  BarChart3,
  Package,
  ShoppingBag,
  ShieldCheck,
  LogIn,
  UserPlus,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logoText from "../assets/logo-text.png";
import bgHero from "../assets/bg-hero-fix.jpeg";
import imageFarmer1 from "../assets/farmer1.png";
import imageFarmer2 from "../assets/farmer2.jpeg";
import imageFarmer3 from "../assets/farmer3.png";
import imageFarmer4 from "../assets/farmer4.jpeg";
import imageFarmer5 from "../assets/farmer5.jpeg";
import imageFarmer6 from "../assets/farmer6.jpeg";
import imageFarmer7 from "../assets/farmer7.jpeg";
import traktor from "../assets/traktor.png";
import th from "../assets/th.png";
import tt from "../assets/tt.png";
import go from "../assets/go.png";
import bgFarmer from "../assets/bg-farmer.png";
import number from "../assets/number.png";
import sponsor from "../assets/sponsor-section.png";
import searchIcon from "../assets/search-icon.png";
import linkIcon1 from "../assets/Link - icon.png";
import linkIcon2 from "../assets/Link - icon (1).png";
import linkIcon3 from "../assets/Link - icon (2).png";
import linkIcon4 from "../assets/Link - icon (3).png";
import garis from "../assets/garis.png";
import telepon from "../assets/icon-telepon.png";
import email from "../assets/icon-email.png";
import map from "../assets/icon-map.png";
import kirim from "../assets/kirim.png";

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

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [active, setActive] = useState("Beranda");

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

  return (
    <div className="flex flex-col text-[#1F1E17]">
      <div
        className="relative min-h-screen w-full flex flex-col bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `
            url(${bgHero})
          `,
        }}
      >
        {/* Navbar */}
        <nav className="px-6 py-4 flex items-center justify-between w-full border-b border-white/10">
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

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 p-16 2xl:pt-0">
          <div className="flex 2xl:mt-32 xl:mt-16">
            <div className="flex flex-col gap-y-3">
              <h1 className="text-4xl sm:text-5xl 2xl:text-7xl font-extrabold text-white tracking-tight max-w-lg 2xl:max-w-3xl my-2">
                Potong Rantai Pasok Sejahterakan Petani Lokal
              </h1>
              <div className="flex gap-3">
                <button
                  // onClick={}
                  className="flex items-center gap-2 bg-[#EEC044] hover:bg-[#D4A937] text-white text-[12px] 2xl:text-sm font-semibold px-4 py-2 rounded-[4px]"
                >
                  Mulai Belanja
                </button>
                <button
                  // onClick={}
                  className="flex items-center gap-2 bg-[#24231D] hover:bg-[#2F2E27] text-white text-[12px] 2xl:text-sm font-semibold px-4 py-2 rounded-[4px]"
                >
                  Kontak Kami
                </button>
              </div>
            </div>

            <div className="bg-white w-fit p-2 2xl:p-4 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-2 2xl:gap-3">
                <figure className="h-40 w-28 2xl:w-48 2xl:h-56 overflow-hidden rounded-sm">
                  <img
                    src={imageFarmer2}
                    alt="petani"
                    className="h-40 2xl:w-48 2xl:h-56 object-cover"
                  />
                </figure>

                <figure className="h-40 w-28 2xl:w-48 2xl:h-56 overflow-hidden rounded-sm">
                  <img
                    src={imageFarmer3}
                    alt="petani"
                    className="h-40 2xl:w-48 2xl:h-56 object-cover"
                  />
                </figure>

                <figure className="col-span-2 h-32 2xl:h-48 overflow-hidden rounded-sm">
                  <img
                    src={imageFarmer1}
                    alt="petani"
                    className="w-[232px] h-full 2xl:w-[396px] object-cover"
                  />
                </figure>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Feature Cards */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[34rem] 2xl:top-[64rem]">
        <div className="flex justify-center items-center gap-8 2xl:gap-24 py-5 2xl:py-9 rounded-md bg-white shadow-xl w-[720px] 2xl:w-[1100px] mt-[-10]">
          {features.map((f) => (
            <div key={f.title} className="flex">
              <div className="w-10 h-10 rounded-[6px] flex items-center justify-center mr-3">
                <img src={f.icon} className="2xl:w-16" />
              </div>
              <div>
                <p className="text-[#1F1E17] font-extrabold text-[12px] 2xl:text-[20px]">
                  {f.title}
                </p>
                <p className="text-[#878680] text-[11px] 2xl:text-[16px] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About me */}
      <div
        className="flex justify-center h-96 2xl:h-[34rem] mt-28 2xl:mt-40 bg-no-repeat bg-left-bottom bg-[length:800px] 2xl:bg-[length:1171px] text-[#1F1E17]"
        style={{
          backgroundImage: `url(${bgFarmer})`,
        }}
      >
        <div className="flex justify-between w-[904px] 2xl:w-[1200px] gap-20">
          <div className="w-[440px]">
            <h1 className="font-extrabold text-2xl 2xl:text-4xl mb-6">
              Misi Kami: Memutus Rantai Pasok, Menyejahterakan Petani Lokal
            </h1>
            <div className="text-[12px] mb-4">
              <p>
                AgriConnect hadir untuk memangkas jalur distribusi yang panjang.
                Melalui sistem Escrow yang aman, kami memastikan petani
                mendapatkan harga yang adil dan pembeli mendapatkan hasil panen
                segar langsung dari lahan.
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <b>Sistem Escrow (Rekening Bersama):</b> Dana aman tersimpan
                  hingga pembeli pembeli menerima barang sesuai kualitas.
                </li>
                <li>
                  <b>Teknologi Transfaransi Harga:</b> informasi harga pasar
                  terkini untuk memberdayakan petani.
                </li>
              </ul>
            </div>

            <button className="flex items-center gap-2 bg-[#4BAF47] hover:bg-[#3E9440] text-white text-[12px] 2xl:text-sm font-semibold px-4 py-2 rounded-[4px] transition-colors">
              Pelajari Sistem Kami
            </button>
          </div>

          <div>
            <div className="flex gap-2 2xl:gap-3">
              <div>
                <figure className="w-[180px] 2xl:w-[250px] h-[220px] 2xl:h-[360px] overflow-hidden rounded-[25px]">
                  <img
                    src={imageFarmer4}
                    alt="petani"
                    className="w-full h-full object-cover object-[80%_center]"
                  />
                </figure>
                <div className="flex flex-col items-center text-center mt-4">
                  <img src={number} alt="number" className="w-16" />
                  <p className="w-[8rem] 2xl:w-[8rem] 2xl:text-sm text-[#4BAF47] text-[12px]">
                    MITRA PETANI BERPENGALAMAN
                  </p>
                </div>
              </div>
              <figure className="w-[180px] 2xl:w-[250px] h-[350px] 2xl:h-[490px] overflow-hidden rounded-[25px]">
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

      <div>
        <img src={sponsor} alt="sponsor" />
      </div>

      <div className="w-full bg-white p-6 flex flex-col items-center">
        <div className="flex flex-wrap items-end gap-3 w-[55rem] mt-10">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="flex border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-green-500">
              <input
                type="text"
                placeholder="Cari Produk Pertanian..."
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
            <select className="w-full p-2 border border-gray-300 rounded-md text-xs focus-within:ring-1 focus-within:ring-green-500">
              <option>Sayuran</option>
              <option>Buah</option>
            </select>
          </div>

          {/* Harga */}
          <div className="min-w-[200px]">
            <label className="block text-sm font-semibold mb-2">Harga</label>
            <select className="w-full p-2 border border-gray-300 rounded-md text-xs focus-within:ring-1 focus-within:ring-green-500">
              <option>Termurah</option>
              <option>Termahal</option>
            </select>
          </div>
        </div>

        <div className="w-[55rem] bg-yellow-50 mt-10">
          <h1 className="text-2xl font-extrabold">Produk Terbaru</h1>

          {/* Card Product */}
          <div></div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center">
          <p className="font-grace text-[#EEC044] text-md tracking-wide leading-relaxed">
            Dari Kebun Terbaik
          </p>
          <h1 className="font-extrabold text-3xl">Kenali Para Petani Kami</h1>
        </div>
        <div className="flex justify-center gap-11">
          {farmers.map((item, index) => (
            <div key={index} className="relative">
              {/* Image */}
              <div className="w-[220px] h-[300px] 2xl:w-[320px] 2xl:h-[420px] overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Info */}
              <div className="absolute left-[10.5rem] -translate-x-1/2 bottom-[-25px] bg-white w-[150px] 2xl:w-[200px] px-4 py-3 rounded-xl shadow-md flex items-center gap-3">
                {/* Icon */}
                <div className="absolute left-[-1rem] bg-[#4BAF47] p-1 rounded-md text-white">
                  <Share2 size={22} />
                </div>

                {/* Text */}
                <div className="text-end">
                  <p className="pl-4 font-bold text-[#1F1E17] text-xs 2xl:text-base">
                    {item.name}
                  </p>
                  <p className="pl-4 text-gray-400 text-[10px] 2xl:text-sm">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-24">
        <div className="w-[47rem] bg-black text-center h-[30rem]">text</div>
      </div>

      <div className="mt-20">
        <footer className="flex justify-around bottom-0 bg-[#24231D] text-center py-24 text-[#A5A49A] text-xs">
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
              <img src={garis} className="w-14" />
            </div>

            <ul>
              {kontakList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 mb-3 text-white"
                >
                  <img src={item.icon} className="object-contain w-3" />
                  <p className="text-xs whitespace-pre-line">{item.text}</p>
                </li>
              ))}
            </ul>

            <div className="flex">
              <input
                type="text"
                name=""
                id=""
                placeholder="Masukkan Alamat Email"
                className="!border-0 !rounded-r-none rounded-l-lg !text-[10px] placeholder:text-[10px] placeholder:font-semibold"
              />
              <div className="bg-[#4BAF47] hover:bg-[#3E9440] p-3 flex justify-center items-center rounded-r-lg cursor-pointer">
                <a href="">
                  <img src={kirim} className="w-3" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div>
        <footer className="flex justify-around bottom-0 bg-[#1F1E17] text-center py-6 text-[#A5A49A] text-xs">
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

export default LandingPage;
