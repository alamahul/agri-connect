import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Leaf,
  Bell,
  ChevronRight,
  Shield,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import imageFarmer2 from "./../assets/farmer2.jpeg";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Katalog");
  const [isFollowed, setIsFollowed] = useState(false);

  // Mock data for the farmer (In a real app, this would be fetched based on :id)
  const farmer = {
    id: 1,
    name: "Pak Budi Santoso",
    group: "Kelompok Tani Mekar Sari",
    location: "Lembang, Jawa Barat",
    distance: 15,
    rating: 4.9,
    reviewCount: 200,
    soldCount: "1.200 Kg",
    joinedDate: "Maret 2024",
    avatar: imageFarmer2,
    bio: "Saya bertani secara organik di kaki gunung Tangkuban Perahu. Fokus pada sayuran daun tanpa pestisida kimia untuk memastikan setiap suapan pelanggan kami sehat dan segar.",
    products: [
      {
        id: 2,
        name: "Wortel Organik Lembang",
        price: 18000,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=387&auto=format&fit=crop",
        isPreOrder: true,
      },
      {
        id: 102,
        name: "Kubis Hijau Segar",
        price: 12000,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1772102501296-f50ad1be8d30?q=80&w=1011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isPreOrder: false,
      },
      {
        id: 103,
        name: "Selada Keriting",
        price: 22000,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1620745994925-0e5771eed960?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isPreOrder: true,
      },
      {
        id: 104,
        name: "Sawi Putih Pilihan",
        price: 14000,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1753445657057-ecc0a33199b5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isPreOrder: false,
      }
    ]
  };

  const breadcrumb = ["Beranda", "Profil Petani", farmer.name];

  return (
    <div className="flex flex-col text-[#1F1E17] bg-white min-h-screen">
      <Navbar active={active} setActive={setActive} />

      {/* Profile Header - Clean Version */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-[#4BAF47] transition-colors mb-6 text-sm font-semibold group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Kembali
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-10">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#4BAF47]/10 overflow-hidden shadow-2xl bg-gray-50">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-[#4BAF47] text-white p-2 rounded-full border-2 border-white shadow-lg">
                <ShieldCheck size={18} />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center sm:justify-start">
                <h1 className="text-3xl sm:text-5xl font-black text-[#1F1E17] tracking-tighter">
                  {farmer.name}
                </h1>
                <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full border border-green-100 self-center sm:self-auto">
                  <CheckCircle2 size={16} className="text-[#4BAF47]" />
                  <span className="text-[11px] font-black text-[#4BAF47] uppercase tracking-widest">Terverifikasi KYC</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-4 text-[#878680]">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <MapPin size={18} className="text-[#4BAF47]" />
                  <span className="text-sm font-bold text-[#1F1E17]">{farmer.group}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{farmer.location}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-sm font-bold text-[#4BAF47]">{farmer.distance} KM dari Anda</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setIsFollowed(!isFollowed)}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isFollowed
                  ? "bg-gray-100 text-gray-500 border border-gray-200 shadow-none"
                  : "bg-[#EEC044] hover:bg-[#D4A937] text-white shadow-[#EEC044]/30"
                  }`}
              >
                <Bell size={20} fill={isFollowed ? "currentColor" : "none"} />
                {isFollowed ? "Mengikuti" : "Ikuti Petani"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">

          {/* Left: Stats & About */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-2xl border border-gray-100 text-center">
                <Star size={18} className="text-[#EEC044] mx-auto mb-1 fill-[#EEC044]" />
                <p className="text-lg font-black text-[#1F1E17]">{farmer.rating}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">{farmer.reviewCount} Ulasan</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-2xl border border-gray-100 text-center">
                <ShoppingBag size={18} className="text-[#4BAF47] mx-auto mb-1" />
                <p className="text-lg font-black text-[#1F1E17]">{farmer.soldCount}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Terjual</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-2xl border border-gray-100 text-center">
                <Calendar size={18} className="text-blue-500 mx-auto mb-1" />
                <p className="text-lg font-black text-[#1F1E17]">2024</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Bergabung</p>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-lg font-bold text-[#1F1E17] mb-3 flex items-center gap-2">
                <Leaf size={20} className="text-[#4BAF47]" />
                Tentang Kebun & Transparansi
              </h3>
              <p className="text-sm text-[#878680] leading-relaxed italic">
                "{farmer.bio}"
              </p>
            </div>

            {/* Mini Map Placeholder */}
            <div>
              <h3 className="text-lg font-bold text-[#1F1E17] mb-3 flex items-center gap-2">
                <MapPin size={20} className="text-[#4BAF47]" />
                Verifikasi Lokasi Geotagging
              </h3>
              <div className="relative w-full h-56 bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-100 z-0 group">
                <MapContainer 
                  center={[-6.8166, 107.6166]} 
                  zoom={14} 
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[-6.8166, 107.6166]}>
                    <Popup>
                      <b>Kebun Pak Budi</b><br />
                      Lembang, Jawa Barat
                    </Popup>
                  </Marker>
                </MapContainer>
                
                {/* Overlay Badge for Map */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-xl border border-gray-100 shadow-sm z-[500] pointer-events-none">
                  <p className="text-[10px] font-bold text-[#1F1E17] flex items-center gap-1.5 uppercase tracking-tighter">
                    <ShieldCheck size={12} className="text-[#4BAF47]" />
                    Lokasi Real-Time (Verified)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Catalog */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-[#1F1E17] uppercase tracking-tighter">
                Katalog Hasil Kebun {farmer.name.split(' ')[1]}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {farmer.products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                >
                  <div className="p-2">
                    <div className="relative h-36 sm:h-48 rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isPreOrder && (
                        <div className="absolute top-2 left-2 bg-[#EEC044] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                          🌱 Panen Besok
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <h4 className="font-bold text-sm sm:text-base text-[#1F1E17] truncate">{product.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[#4BAF47] font-black text-sm">Rp. {product.price.toLocaleString('id-ID')}<span className="text-[10px] font-normal text-gray-400">/{product.unit}</span></p>
                      <button
                        className="bg-[#4BAF47] hover:bg-[#3E9440] text-white p-2 rounded-full transition-colors shadow-md shadow-[#4BAF47]/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        <ChevronRight size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Products Footer */}
            <div className="mt-8 p-6 bg-green-50/50 rounded-2xl border-2 border-dashed border-green-200 text-center">
              <p className="text-sm text-[#878680]">
                Semua transaksi dengan {farmer.name} dilindungi oleh <b>Sistem Escrow</b> untuk keamanan dana Anda.
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FarmerProfile;
