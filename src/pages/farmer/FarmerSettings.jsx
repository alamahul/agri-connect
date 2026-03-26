import React, { useState } from 'react';
import {
   User,
   MapPin,
   Wallet,
   Settings,
   Bell,
   Smartphone,
   ShieldCheck,
   CheckCircle2,
   Camera,
   Navigation,
   Lock,
   PauseCircle,
   Zap,
   Bot,
   Volume2,
   Type,
   Smartphone as PhoneIcon,
   LogOut,
   ChevronRight,
   Map as MapIcon,
   LandPlot,
   Save,
   Trash2,
   Eye,
   EyeOff,
   Loader2,
   ChevronDown
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for Leaflet default icon issues in Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: markerIcon2x,
   iconUrl: markerIcon,
   shadowUrl: markerShadow,
});

const LocationPicker = ({ position, setPosition }) => {
   useMapEvents({
      click(e) {
         setPosition(e.latlng);
      },
   });
   return position ? <Marker position={position} /> : null;
};

const FarmerSettings = () => {
   const [activeTab, setActiveTab] = useState('Profil');
   const [showPinModal, setShowPinModal] = useState(false);
   const [fontSize, setFontSize] = useState(1); // 0: Normal, 1: Besar, 2: Sangat Besar
   const [isLahanOpen, setIsLahanOpen] = useState(true);
   const [autoConfirm, setAutoConfirm] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const [showSuccessToast, setShowSuccessToast] = useState(false);
   const [mapPos, setMapPos] = useState({ lat: -7.12384, lng: 107.45621 });

   const menuItems = [
      { id: 'Profil', label: 'Profil & Lokasi Lahan', icon: User, color: 'text-emerald-500 bg-emerald-50' },
      { id: 'Rekening', label: 'Rekening & Pencairan', icon: Wallet, color: 'text-amber-500 bg-amber-50' },
      { id: 'Operasional', label: 'Status Operasional', icon: LandPlot, color: 'text-blue-500 bg-blue-50' },
      { id: 'Notifikasi', label: 'Notifikasi & Suara', icon: Bell, color: 'text-indigo-500 bg-indigo-50' },
   ];

   const handleSaveProfile = () => {
      setIsSaving(true);
      setTimeout(() => {
         setIsSaving(false);
         setShowSuccessToast(true);
         setTimeout(() => setShowSuccessToast(false), 3000);
      }, 2000);
   };

   const handleLogout = () => {
      if (window.confirm('Apakah Anda yakin ingin keluar dari AgriConnect?')) {
         alert('Proses Logout Berhasil (Simulasi)');
      }
   };

   return (
      <div className="flex flex-col lg:flex-row gap-10 pb-32 animate-in fade-in duration-500 relative">

         {/* Success Toast Simulation */}
         {showSuccessToast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 shadow-2xl rounded-[6px] px-8 py-4 border-2 border-emerald-500 flex items-center gap-4 animate-in slide-in-from-top-10">
               <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 size={18} />
               </div>
               <p className="text-white text-sm font-black uppercase tracking-widest">Peraturan Berhasil Disimpan!</p>
            </div>
         )}

         {/* 1. Sidebar Menu */}
         <aside className="lg:w-80 flex flex-col gap-2 shrink-0">
            <div className="px-6 mb-6">
               <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tighter">Pengaturan</h2>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Kelola Akun & Ekosistem Lahan</p>
            </div>

            <div className="space-y-2">
               {menuItems.map(item => (
                  <button
                     key={item.id}
                     onClick={() => setActiveTab(item.id)}
                     className={`w-full flex items-center justify-between p-6 rounded-[6px] transition-all duration-300 group ${activeTab === item.id ? 'bg-neutral-900 text-white shadow-2xl translate-x-3' : 'bg-white hover:bg-gray-50 text-gray-500 border border-transparent'}`}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-[6px] transition-colors ${activeTab === item.id ? 'bg-white/10' : item.color}`}>
                           <item.icon size={22} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                     </div>
                     <ChevronRight size={18} className={`transition-transform duration-500 ${activeTab === item.id ? 'rotate-90 text-amber-400' : 'opacity-0 group-hover:opacity-100'}`} />
                  </button>
               ))}
            </div>

            <div className="mt-12 p-2">
               <button
                  onClick={handleLogout}
                  className="w-full p-6 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-[6px] border border-red-100 transition-all duration-300 flex items-center justify-between group"
               >
                  <div className="flex items-center gap-4">
                     <LogOut size={22} className="group-hover:rotate-12 transition-transform" />
                     <span className="text-xs font-black uppercase tracking-widest">Keluar Akun</span>
                  </div>
                  <ChevronRight size={18} className="opacity-40" />
               </button>
            </div>
         </aside>

         {/* 2. Main Workstation Area */}
         <main className="flex-1 bg-white rounded-[6px] border border-gray-100 shadow-2xl overflow-hidden min-h-[700px]">

            {/* TAB: PROFIL PETANI & LOKASI LAHAN */}
            {activeTab === 'Profil' && (
               <div className="p-12 space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50/50 p-8 rounded-[6px] border border-gray-100">
                     <div className="relative group">
                        <div className="w-32 h-32 bg-white rounded-[6px] p-1 shadow-2xl relative overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=400" className="w-full h-full object-cover rounded-[4px]" alt="" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-2xl hover:bg-emerald-500 hover:scale-110 transition-all border-4 border-white">
                           <Camera size={20} />
                        </button>
                     </div>
                     <div className="space-y-3 flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Identitas & Galeri Lahan</h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">Unggah foto lahan asli untuk mendapatkan lencana <span className="text-emerald-600 font-black italic">"Petani Terverifikasi"</span> dan meningkatkan kepercayaan pembeli.</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-full">Lahan A: Aktif</span>
                           <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[9px] font-black uppercase tracking-widest rounded-full">Pre-Order: Ready</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Nama Lengkap Petani</label>
                        <div className="relative">
                           <input defaultValue="Pak Budi Santoso" className="w-full bg-gray-50 border border-gray-100 pl-14 pr-6 py-5 rounded-[6px] font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/20 outline-none transition-all" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Nomor WhatsApp Bisnis</label>
                        <div className="relative">
                           <input defaultValue="+62 812 3456 7890" className="w-full bg-gray-50 border border-gray-100 pl-14 pr-6 py-5 rounded-[6px] font-bold text-sm focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/20 outline-none transition-all" />
                        </div>
                     </div>
                  </div>

                  {/* Integrasi Peta Lahan Enhanced dengan Leaflet */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-end px-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Titik Akurat Lahan (Klik Pada Peta)</label>
                        <span className="text-[10px] font-black text-emerald-600 uppercase">Akurasi GPS: 1.2 Meter</span>
                     </div>
                     <div className="h-80 bg-gray-100 rounded-[6px] border-4 border-white shadow-2xl relative overflow-hidden z-0">
                        <MapContainer
                           center={[mapPos.lat, mapPos.lng]}
                           zoom={13}
                           scrollWheelZoom={true}
                           style={{ height: '100%', width: '100%' }}
                        >
                           <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                           />
                           <LocationPicker position={mapPos} setPosition={setMapPos} />
                        </MapContainer>

                        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                           <div className="bg-white/95 backdrop-blur-md p-5 rounded-[6px] shadow-2xl border border-emerald-100 min-w-[220px]">
                              <div className="flex items-center gap-4">
                                 <div className="relative">
                                    <MapPin size={32} className="text-red-500" />
                                    <div className="absolute top-0 left-0 w-full h-full bg-red-500/20 rounded-full animate-ping"></div>
                                 </div>
                                 <div>
                                    <p className="text-[11px] font-black text-neutral-900 uppercase leading-none">Lokasi lahan</p>
                                    <p className="text-[9px] text-gray-400 font-bold tracking-widest mt-1.5 italic">
                                       {typeof mapPos.lat === 'number' ? mapPos.lat.toFixed(6) : mapPos.lat},
                                       {typeof mapPos.lng === 'number' ? mapPos.lng.toFixed(6) : mapPos.lng}
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <button
                              onClick={() => {
                                 const randomLat = -7.12384 + (Math.random() - 0.5) * 0.01;
                                 const randomLng = 107.45621 + (Math.random() - 0.5) * 0.01;
                                 setMapPos({ lat: randomLat, lng: randomLng });
                              }}
                              className="bg-neutral-900 hover:bg-black text-white px-6 py-4 rounded-[6px] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all border border-white/20"
                           >
                              <Navigation size={18} className="text-amber-400" /> Deteksi Otomatis
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="pt-8">
                     <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="w-full bg-neutral-900 text-white py-6 rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl shadow-neutral-100 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none"
                     >
                        {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                        {isSaving ? 'Menyimpan Perubahan...' : 'Simpan Seluruh Pengaturan Profil'}
                     </button>
                  </div>
               </div>
            )}

            {/* TAB: REKENING & PENARIKAN DANA */}
            {activeTab === 'Rekening' && (
               <div className="p-12 space-y-12 animate-in fade-in slide-in-from-right-10">
                  <div className="bg-amber-400 p-10 rounded-[6px] flex flex-col md:flex-row items-center justify-between gap-8 group relative overflow-hidden">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                     <div className="flex items-center gap-6 relative z-10">
                        <div className="w-20 h-20 bg-neutral-900 text-amber-400 rounded-[6px] flex items-center justify-center shadow-2xl">
                           <Wallet size={40} />
                        </div>
                        <div className="text-neutral-900">
                           <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Alamat Pencairan</h3>
                           <p className="text-sm font-bold mt-2 opacity-80">Pastikan rekening terdaftar atas nama Bapak sendiri.</p>
                        </div>
                     </div>
                     <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-[6px] border border-white/50 relative z-10 flex items-center gap-4">
                        <ShieldCheck size={24} className="text-emerald-600" />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-neutral-900">Keamanan Dana</p>
                           <p className="text-[9px] font-bold text-gray-500 uppercase">Terkunci Secure-Shield</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Bank / Penyedia Dompet Digital</label>
                        <div className="relative">
                           <div className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500">
                              <MapIcon size={20} />
                           </div>
                           <select className="w-full bg-gray-50 border border-gray-100 pl-16 pr-6 py-6 rounded-[6px] font-black text-sm focus:bg-white outline-none appearance-none cursor-pointer">
                              <option>Pilih Bank Utama Anda...</option>
                              <option>Bank Rakyat Indonesia (BRI)</option>
                              <option>Bank Jabar Banten (bjb)</option>
                              <option>Bank Mandiri</option>
                              <option>GoPay / DANA (Mitra UMKM)</option>
                           </select>
                           <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Nomor Rekening / HP</label>
                           <input placeholder="1234-5678-XXX" className="w-full bg-gray-50 border border-gray-100 p-6 rounded-[6px] font-black text-sm focus:bg-white focus:border-amber-400 outline-none transition-all placeholder:text-gray-300" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Nama Pemilik Akun</label>
                           <input placeholder="BUDI SANTOSO" className="w-full bg-gray-50 border border-gray-100 p-6 rounded-[6px] font-black text-sm focus:bg-white focus:border-amber-400 outline-none transition-all placeholder:text-gray-300" />
                        </div>
                     </div>
                  </div>

                  <div className="bg-neutral-900 p-8 rounded-[6px] flex flex-col items-center text-center space-y-6">
                     <p className="text-gray-400 text-xs font-medium max-w-sm">Perubahan rekening memerlukan verifikasi PIN 6-digit untuk mencegah penipuan.</p>
                     <button
                        onClick={() => setShowPinModal(true)}
                        className="w-full py-6 bg-amber-400 text-neutral-900 rounded-[6px] font-black uppercase text-xs tracking-widest shadow-2xl shadow-amber-400/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                     >
                        <Lock size={20} /> Verifikasi Akun Bank Sekarang
                     </button>
                  </div>
               </div>
            )}

            {/* TAB: PENGATURAN OPERASIONAL LAHAN */}
            {activeTab === 'Operasional' && (
               <div className="p-12 space-y-12 animate-in fade-in slide-in-from-right-10">
                  <section className="space-y-6">
                     <div className="flex items-center gap-4">
                        <LandPlot size={28} className="text-blue-500" />
                        <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Kontrol Operasional Lahan</h3>
                     </div>

                     <div className={`p-10 rounded-[6px] border-4 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700 ${isLahanOpen ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                        <div className="flex items-center gap-8">
                           <div className={`w-28 h-28 rounded-full flex items-center justify-center text-white shadow-2xl relative ${isLahanOpen ? 'bg-emerald-500' : 'bg-red-500'}`}>
                              {isLahanOpen ? <CheckCircle2 size={56} className="animate-pulse" /> : <PauseCircle size={56} />}
                              <div className={`absolute -inset-2 rounded-full border-2 border-dashed animate-spin-slow ${isLahanOpen ? 'border-emerald-500' : 'border-red-500'}`}></div>
                           </div>
                           <div>
                              <p className={`text-3xl font-black uppercase tracking-tighter ${isLahanOpen ? 'text-emerald-700' : 'text-red-700'}`}>
                                 {isLahanOpen ? 'Toko Buka' : 'Toko Tutup'}
                              </p>
                              <p className="text-sm font-medium text-gray-500 mt-1">Status saat ini terlihat oleh semua pembeli.</p>
                           </div>
                        </div>

                        <div className="bg-white p-2 rounded-[6px] shadow-2xl flex gap-2 border border-gray-100">
                           <button onClick={() => setIsLahanOpen(true)} className={`px-8 py-4 rounded-[6px] text-xs font-black uppercase tracking-widest transition-all ${isLahanOpen ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-500'}`}>Aktif</button>
                           <button onClick={() => setIsLahanOpen(false)} className={`px-8 py-4 rounded-[6px] text-xs font-black uppercase tracking-widest transition-all ${!isLahanOpen ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-red-500'}`}>Libur</button>
                        </div>
                     </div>
                  </section>

                  <section className="space-y-8">
                     <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-3">
                        <Smartphone size={16} className="text-blue-500" /> Mode Penerimaan Pesanan
                     </h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <button
                           onClick={() => setAutoConfirm(true)}
                           className={`p-10 rounded-[6px] border-4 text-left transition-all group ${autoConfirm ? 'border-emerald-500 bg-emerald-50/50 shadow-2xl' : 'border-gray-50 bg-gray-50/30 hover:border-gray-100'}`}
                        >
                           <div className="flex justify-between items-start mb-6">
                              <div className={`p-4 rounded-[6px] ${autoConfirm ? 'bg-emerald-500 text-white' : 'bg-white text-gray-300 shadow-sm'}`}>
                                 <Zap size={32} />
                              </div>
                              <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${autoConfirm ? 'border-emerald-500 bg-emerald-500' : 'border-gray-200'}`}>
                                 {autoConfirm && <CheckCircle2 size={20} className="text-white" />}
                              </div>
                           </div>
                           <p className="text-xl font-black text-neutral-900 uppercase tracking-tighter">Serba Otomatis</p>
                           <p className="text-xs text-gray-500 font-medium mt-2 leading-relaxed italic">"Gak perlu ribet, setiap panenan yang dipesan langsung masuk daftar kemas."</p>
                        </button>

                        <button
                           onClick={() => setAutoConfirm(false)}
                           className={`p-10 rounded-[6px] border-4 text-left transition-all group ${!autoConfirm ? 'border-blue-500 bg-blue-50/50 shadow-2xl' : 'border-gray-50 bg-gray-50/30 hover:border-gray-100'}`}
                        >
                           <div className="flex justify-between items-start mb-6">
                              <div className={`p-4 rounded-[6px] ${!autoConfirm ? 'bg-blue-500 text-white' : 'bg-white text-gray-300 shadow-sm'}`}>
                                 <User size={32} />
                              </div>
                              <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${!autoConfirm ? 'border-blue-500 bg-blue-500' : 'border-gray-200'}`}>
                                 {!autoConfirm && <CheckCircle2 size={20} className="text-white" />}
                              </div>
                           </div>
                           <p className="text-xl font-black text-neutral-900 uppercase tracking-tighter">Pilihan Manual</p>
                           <p className="text-xs text-gray-500 font-medium mt-2 leading-relaxed italic">"Saya ingin ngecek dulu stok dan kesegaran sayur sebelum jabat tangan (deal)."</p>
                        </button>
                     </div>
                  </section>
               </div>
            )}

            {/* TAB: NOTIFIKASI & AKSESIBILITAS */}
            {activeTab === 'Notifikasi' && (
               <div className="p-12 space-y-12 animate-in fade-in slide-in-from-right-10">
                  <div className="flex items-center justify-between p-10 bg-emerald-500 text-white rounded-[6px] shadow-2xl relative overflow-hidden group">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl group-hover:scale-125 transition-transform duration-1000"></div>
                     <div className="flex items-center gap-8 relative z-10">
                        <div className="w-20 h-20 bg-white text-emerald-600 rounded-[6px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                           <PhoneIcon size={40} />
                        </div>
                        <div>
                           <h4 className="text-3xl font-black uppercase tracking-tighter leading-none">Hubungkan WhatsApp</h4>
                           <p className="text-sm font-medium mt-2 opacity-90">Dapatkan alert pesanan baru langsung ke chat Anda.</p>
                        </div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer scale-125 z-10">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-16 h-9 bg-emerald-800/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-white"></div>
                     </label>
                  </div>

                  <div className="space-y-8 bg-gray-50/50 p-10 rounded-[6px] border border-gray-100">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-500 text-white rounded-[6px] shadow-lg">
                           <Type size={20} />
                        </div>
                        <h4 className="text-lg font-black text-neutral-900 uppercase tracking-tight">Kenyamanan Penglihatan</h4>
                     </div>
                     <div className="space-y-10">
                        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                           <span className={fontSize === 0 ? 'text-indigo-600' : ''}>Normal</span>
                           <span className={fontSize === 1 ? 'text-indigo-600' : ''}>Besar</span>
                           <span className={fontSize === 2 ? 'text-indigo-600' : ''}>Sangat Besar</span>
                        </div>
                        <input
                           type="range" min="0" max="2" step="1"
                           value={fontSize}
                           onChange={(e) => setFontSize(parseInt(e.target.value))}
                           className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
                        />
                        <div className="bg-white p-10 rounded-[6px] border-2 border-dashed border-indigo-200 text-center shadow-inner relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-3">
                              <Eye size={16} className="text-indigo-300" />
                           </div>
                           <p className={`font-black uppercase tracking-tight transition-all duration-300 text-neutral-900 ${fontSize === 0 ? 'text-base' : fontSize === 1 ? 'text-2xl' : 'text-4xl'}`}>
                              Contoh Teks: Sayur Segar Pak Budi
                           </p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4 italic">Geser slider di atas untuk menyesuaikan ukuran teks Bapak.</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between p-10 border-4 border-dashed border-gray-100 rounded-[6px] group hover:border-indigo-400 hover:bg-indigo-50/20 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white text-indigo-500 rounded-[6px] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                           <Volume2 size={32} />
                        </div>
                        <div>
                           <h4 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">AgriVoice Assistant</h4>
                           <p className="text-sm text-gray-400 font-medium">Bacakan notifikasi dengan suara otomatis.</p>
                        </div>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer scale-110">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
                     </label>
                  </div>
               </div>
            )}
         </main>

         {/* --- PIN VERIFICATION MODAL ENHANCED --- */}
         {showPinModal && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowPinModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-sm relative z-[310] shadow-2xl animate-in zoom-in-95 duration-500 p-12 text-center border-t-8 border-amber-400">
                  <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-4 ring-amber-50">
                     <Lock size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tighter mb-3">Verifikasi Kamanan</h2>
                  <p className="text-sm text-gray-400 font-medium mb-10 leading-relaxed italic">Harap masukkan 6-digit PIN Bapak untuk mencairkan atau mengubah data rekening.</p>

                  <div className="grid grid-cols-6 gap-3 mb-10">
                     {[1, 2, 3, 4, 5, 6].map(i => (
                        <input key={i} type="password" maxLength={1} className="w-full h-16 bg-gray-50 border-2 border-gray-100 focus:border-amber-400 focus:bg-white outline-none rounded-[6px] text-center font-black text-2xl transition-all" autoFocus={i === 1} />
                     ))}
                  </div>

                  <div className="space-y-4 pt-4">
                     <button
                        onClick={() => {
                           setShowPinModal(false);
                           setShowSuccessToast(true);
                           setTimeout(() => setShowSuccessToast(false), 3000);
                        }}
                        className="w-full py-6 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-black transition-all active:scale-95"
                     >
                        Konfirmasi Verifikasi
                     </button>
                     <button
                        onClick={() => setShowPinModal(false)}
                        className="w-full py-2 text-gray-400 font-extrabold uppercase text-[10px] tracking-[0.2em] hover:text-red-500 transition-all"
                     >
                        Batal
                     </button>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default FarmerSettings;
