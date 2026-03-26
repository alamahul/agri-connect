import React, { useState, useEffect } from 'react';
import {
   User,
   MapPin,
   Bell,
   Lock,
   Plus,
   Trash2,
   Save,
   Star,
   Accessibility,
   Volume2,
   Map,
   X,
   Eye,
   Camera,
   CreditCard,
   ShieldCheck,
   CheckCircle,
   Smartphone,
   Moon,
   Sun,
   Type,
   ChevronRight,
   Navigation,
   Globe,
   Settings,
   Wallet,
   Info,
   Truck,
   Clock,
   MessageSquare,
   Mail
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
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

const CustomerSettings = () => {
   const [activeTab, setActiveTab] = useState('profile');
   const [isLoading, setIsLoading] = useState(false);
   const [showToast, setShowToast] = useState(false);
   const [showMapModal, setShowMapModal] = useState(false);
   const [showSecurityModal, setShowSecurityModal] = useState(false);

   // States for preferences
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [textSize, setTextSize] = useState(16);
   const [notif, setNotif] = useState({ shipping: true, radar: true, preorder: true });
   const [access, setAccess] = useState({ voice: false });

   // States for address management
   const [addresses, setAddresses] = useState([
      { id: 1, label: "Rumah Utama", address: "Jl. Kebagusan Raya No. 12, Jagakarsa, Jakarta Selatan 12620", isDefault: true, lat: -6.3268, lng: 106.8277 },
      { id: 2, label: "Kantor (Gedung Hijau)", address: "SCBD Lot 11, Jl. Jend Sudirman Kav 52, Jakarta Selatan", isDefault: false, lat: -6.2246, lng: 106.8093 },
   ]);
   const [editingAddress, setEditingAddress] = useState(null);
   const [isEditMode, setIsEditMode] = useState(false);
   const [mapPos, setMapPos] = useState({ lat: -6.2088, lng: 106.8456 }); // Default Jakarta
   const [tempAddressInfo, setTempAddressInfo] = useState({ label: '', address: '' });

   // States for payment management
   const [paymentMethods, setPaymentMethods] = useState([
      { id: 1, type: 'E-Wallet', provider: 'Gopay', account: '0812-****-7890', icon: <Smartphone size={20} />, color: 'bg-blue-50 text-blue-600' },
      { id: 2, type: 'Bank', provider: 'Bank BCA', account: '8830 **** 121', icon: <CreditCard size={20} />, color: 'bg-indigo-50 text-indigo-600' },
   ]);
   const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
   const [newPayment, setNewPayment] = useState({ provider: 'Gopay', account: '' });

   // States for notification channels
   const [channels, setChannels] = useState({ whatsapp: true, push: true, email: false });

   const tabs = [
      { id: 'profile', label: 'Profil Saya', icon: <User size={18} /> },
      { id: 'address', label: 'Daftar Alamat', icon: <MapPin size={18} /> },
      { id: 'payment', label: 'Pembayaran', icon: <Wallet size={18} /> },
      { id: 'notif', label: 'Notifikasi', icon: <Bell size={18} /> },
      { id: 'access', label: 'Aksesibilitas', icon: <Accessibility size={18} /> },
   ];

   const handleSave = () => {
      setIsLoading(true);
      setTimeout(() => {
         setIsLoading(false);
         setShowToast(true);
         setTimeout(() => setShowToast(false), 3000);
      }, 1500);
   };

   const handleDeleteAddress = (id) => {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
   };

   const handleAddOrUpdateAddress = () => {
      if (!tempAddressInfo.label || !tempAddressInfo.address) {
         alert("Sila isi label dan detail alamat.");
         return;
      }

      if (isEditMode && editingAddress) {
         setAddresses(prev => prev.map(addr => addr.id === editingAddress.id ? {
            ...addr,
            label: tempAddressInfo.label,
            address: tempAddressInfo.address,
            lat: mapPos.lat,
            lng: mapPos.lng
         } : addr));
      } else {
         const newAddr = {
            id: Date.now(),
            label: tempAddressInfo.label,
            address: tempAddressInfo.address,
            isDefault: addresses.length === 0,
            lat: mapPos.lat,
            lng: mapPos.lng
         };
         setAddresses(prev => [...prev, newAddr]);
      }

      setShowMapModal(false);
      setTempAddressInfo({ label: '', address: '' });
      setIsEditMode(false);
      setEditingAddress(null);
   };

   const handleOpenAddAddress = () => {
      setIsEditMode(false);
      setEditingAddress(null);
      setTempAddressInfo({ label: '', address: '' });
      setMapPos({ lat: -6.2088, lng: 106.8456 });
      setShowMapModal(true);
   };

   const handleOpenEditAddress = (addr) => {
      setIsEditMode(true);
      setEditingAddress(addr);
      setTempAddressInfo({ label: addr.label, address: addr.address });
      setMapPos({ lat: addr.lat, lng: addr.lng });
      setShowMapModal(true);
   };

   const handleSetDefault = (id) => {
      setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
   };

   const handleDeletePayment = (id) => {
      setPaymentMethods(prev => prev.filter(p => p.id !== id));
   };

   const handleAddPayment = () => {
      if (!newPayment.account) return;
      
      const method = {
         id: Date.now(),
         type: newPayment.provider.includes('Bank') ? 'Bank' : 'E-Wallet',
         provider: newPayment.provider,
         account: newPayment.account,
         icon: newPayment.provider.includes('Bank') ? <CreditCard size={20} /> : <Smartphone size={20} />,
         color: newPayment.provider.includes('Bank') ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'
      };
      
      setPaymentMethods(prev => [...prev, method]);
      setShowAddPaymentModal(false);
      setNewPayment({ provider: 'Gopay', account: '' });
   };

   return (
      <div className="space-y-8 pb-20 animate-in fade-in duration-500">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
               <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Pengaturan Akun</h1>
               <p className="text-gray-500 mt-1 font-medium">Personalisasi pengalaman belanja hasil panen Anda di AgriConnect.</p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100 animate-pulse">
               <ShieldCheck size={16} className="text-amber-600" />
               <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Akun Terlindungi Escrow</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
               <div className="bg-white p-2 rounded-[6px] border border-gray-100 shadow-sm sticky top-4">
                  {tabs.map(tab => (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                    w-full flex items-center ml-[-8px] gap-4 px-6 py-4 rounded-3xl transition-all duration-300 font-bold text-sm
                    ${activeTab === tab.id
                              ? 'bg-neutral-900 text-white shadow-xl shadow-neutral-200 translate-x-2'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                     >
                        <span className={`${activeTab === tab.id ? 'text-amber-400' : 'text-gray-400'}`}>{tab.icon}</span>
                        {tab.label}
                        {activeTab === tab.id && <ChevronRight size={14} className="ml-auto text-amber-400" />}
                     </button>
                  ))}
               </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
               <div className="bg-white rounded-[6px] border border-gray-100 shadow-sm p-8 md:p-12 min-h-[600px] relative overflow-hidden">

                  {/* 1. Profile Tab */}
                  {activeTab === 'profile' && (
                     <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-500">
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-10">
                           <div className="relative group">
                              <div className="w-32 h-32 rounded-[2.5rem] bg-amber-400 flex items-center justify-center text-neutral-900 text-4xl font-black shadow-2xl shadow-amber-200 border-4 border-white transition-transform group-hover:scale-105 group-hover:rotate-3 duration-500">
                                 SA
                              </div>
                              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-neutral-900 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-lg group-hover:bg-amber-500 transition-colors">
                                 <Camera size={18} />
                              </button>
                              {/* Hover hint */}
                              <div className="absolute inset-0 bg-neutral-900/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Ubah Foto</span>
                              </div>
                           </div>
                           <div className="flex-1 space-y-6 w-full">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nama Lengkap</label>
                                    <input defaultValue="Siti Aminah" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-400 outline-none transition-all" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Aktif</label>
                                    <input defaultValue="siti.aminah@email.com" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-400 outline-none transition-all" />
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nomor WhatsApp (Untuk Notifikasi Kurir)</label>
                                 <div className="relative">
                                    <input defaultValue="+62 812-3456-7890" className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-400 outline-none transition-all" />
                                 </div>
                              </div>
                              <button
                                 onClick={handleSave}
                                 disabled={isLoading}
                                 className="px-10 py-4 bg-neutral-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-neutral-200 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                              >
                                 {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                 ) : (
                                    <Save size={18} />
                                 )}
                                 {isLoading ? 'Sedang Menyimpan...' : 'Simpan Perubahan'}
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* 2. Address Tab */}
                  {activeTab === 'address' && (
                     <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
                        <div className="flex justify-between items-center">
                           <h3 className="text-xl font-black text-neutral-900 uppercase">Kelola Daftar Alamat</h3>
                           <button
                              onClick={handleOpenAddAddress}
                              className="bg-neutral-900 hover:bg-black text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95"
                           >
                              <Plus size={16} /> Tambah Alamat
                           </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           {addresses.map(addr => (
                              <div key={addr.id} className={`p-8 rounded-[6px] border-2 transition-all group ${addr.isDefault ? 'border-amber-400 bg-amber-50/30 shadow-xl shadow-amber-50' : 'border-gray-100'}`}>
                                 <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                       <div className="flex items-center gap-3">
                                          <span className="font-black text-gray-900 uppercase text-xs tracking-wider cursor-pointer hover:text-amber-600" onClick={() => handleSetDefault(addr.id)}>{addr.label}</span>
                                          {addr.isDefault && <span className="bg-amber-400 text-neutral-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">Alamat Utama</span>}
                                       </div>
                                       <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-md">{addr.address}</p>
                                       <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                          <MapPin size={10} className="text-amber-500" /> {addr.lat.toFixed(4)}, {addr.lng.toFixed(4)}
                                       </div>
                                    </div>
                                    <div className="flex gap-2">
                                       <button
                                          onClick={() => handleOpenEditAddress(addr)}
                                          className="p-3 hover:bg-white rounded-xl text-gray-400 hover:text-neutral-900 transition-all border border-transparent hover:border-gray-100"
                                       >
                                          <Settings size={18} />
                                       </button>
                                       <button
                                          onClick={() => handleDeleteAddress(addr.id)}
                                          className="p-3 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-500 transition-all"
                                       >
                                          <Trash2 size={18} />
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* 3. Payment/Bank Tab */}
                  {activeTab === 'payment' && (
                     <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-500">
                        <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2rem] flex items-start gap-6">
                           <div className="w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
                              <ShieldCheck size={28} />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-sm font-black text-indigo-900 uppercase tracking-tight">Perlindungan Dana AgriConnect</h4>
                              <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                                 Rekening refund digunakan untuk pengembalian dana 100% otomatis jika pesanan dibatalkan atau terjadi masalah kualitas panen melalui sistem **Escrow Terpadu**.
                              </p>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Rekening & E-Wallet Terhubung</h3>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {paymentMethods.map(method => (
                                 <div key={method.id} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                       <div className={`w-12 h-12 ${method.color} rounded-2xl flex items-center justify-center`}>
                                          {method.icon}
                                       </div>
                                       <div>
                                          <p className="text-xs font-black text-gray-900 uppercase">{method.provider}</p>
                                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{method.account}</p>
                                       </div>
                                    </div>
                                    <button 
                                       onClick={() => handleDeletePayment(method.id)}
                                       className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                       <Trash2 size={16} />
                                    </button>
                                 </div>
                              ))}

                              <button 
                                 onClick={() => setShowAddPaymentModal(true)}
                                 className="p-6 rounded-3xl border-2 border-dashed border-gray-100 hover:border-amber-400 transition-all flex flex-col items-center justify-center group"
                              >
                                 <Plus size={24} className="text-gray-300 group-hover:text-amber-500 mb-2" />
                                 <span className="text-[10px] font-black text-gray-400 group-hover:text-amber-600 uppercase tracking-widest">Tambah Rekening</span>
                              </button>
                           </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-3xl flex items-center gap-4">
                           <div className="p-2 bg-white rounded-xl text-gray-400">
                              <Lock size={16} />
                           </div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Data pembayaran Anda dienkripsi dan hanya digunakan untuk keperluan Refund.</p>
                        </div>
                     </div>
                  )}

                  {/* 4. Notification Tab */}
                  {activeTab === 'notif' && (
                     <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-500 max-w-2xl">
                        <h3 className="text-xl font-black text-neutral-900 uppercase">Preferensi Notifikasi</h3>
                        <div className="space-y-6">
                           {[
                              { id: 'shipping', label: 'Notifikasi Pengiriman', desc: 'Info real-time saat pesanan dikonfirmasi petani, dikirim, hingga tiba di rumah.', icon: <Truck size={20} /> },
                              { id: 'radar', label: 'Radar Panen Terdekat', desc: 'Peringatan otomatis jika ada petani dalam radius 5 KM yang baru memanen sayur kesukaan Anda.', icon: <MapPin size={20} /> },
                              { id: 'preorder', label: 'Pengingat Pre-Order', desc: 'Pengingat H-1 sebelum sistem "Panen Besok" memproses tagihan Anda.', icon: <Clock size={20} /> },
                           ].map(item => (
                              <div key={item.id} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-100 transition-all">
                                 <div className="flex items-start gap-4">
                                    <div className="mt-1 text-gray-400">{item.icon}</div>
                                    <div>
                                       <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{item.label}</p>
                                       <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm mt-1">{item.desc}</p>
                                    </div>
                                 </div>
                                 <button
                                    onClick={() => setNotif(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                    className={`w-14 h-8 rounded-full transition-all duration-300 relative flex-shrink-0 ${notif[item.id] ? 'bg-amber-400' : 'bg-gray-200'}`}
                                 >
                                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${notif[item.id] ? 'left-7' : 'left-1'}`} />
                                 </button>
                              </div>
                           ))}
                        </div>

                        {/* Notification Channels (WhatsApp Settings) */}
                        <div className="space-y-6 pt-10 border-t border-gray-100">
                           <div className="flex items-center gap-3">
                              <Globe size={20} className="text-gray-400" />
                              <h3 className="text-xl font-black text-neutral-900 uppercase">Saluran Notifikasi</h3>
                           </div>
                           <p className="text-xs text-gray-500 font-medium italic">Pilih media yang Anda inginkan untuk menerima pemberitahuan di atas.</p>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {[
                                 { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={20} />, color: 'bg-green-50 text-green-600', desc: 'Prioritas & Cepat' },
                                 { id: 'push', label: 'Push Aplikasi', icon: <Smartphone size={20} />, color: 'bg-blue-50 text-blue-600', desc: 'Hemat Baterai' },
                                 { id: 'email', label: 'Email', icon: <Mail size={20} />, color: 'bg-indigo-50 text-indigo-600', desc: 'Arsip Transaksi' },
                              ].map(channel => (
                                 <button
                                    key={channel.id}
                                    onClick={() => setChannels(prev => ({ ...prev, [channel.id]: !prev[channel.id] }))}
                                    className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col gap-4 group ${channels[channel.id] ? 'border-amber-400 bg-amber-50/20 shadow-xl shadow-amber-50/50' : 'border-gray-50 bg-white hover:border-gray-200'}`}
                                 >
                                    <div className="flex justify-between items-start">
                                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${channel.color}`}>
                                          {channel.icon}
                                       </div>
                                       <div className={`w-12 h-6 rounded-full relative transition-colors ${channels[channel.id] ? 'bg-amber-400' : 'bg-gray-200'}`}>
                                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${channels[channel.id] ? 'left-7' : 'left-1'}`} />
                                       </div>
                                    </div>
                                    <div>
                                       <span className="font-black uppercase text-[10px] tracking-widest block">{channel.label}</span>
                                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{channel.desc}</span>
                                    </div>
                                 </button>
                              ))}
                           </div>
                        </div>

                        <div className="pt-8">
                           <button
                              onClick={handleSave}
                              className="w-full sm:w-auto px-10 py-4 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                           >
                              <Save size={18} /> Simpan Preferensi Notifikasi
                           </button>
                        </div>
                     </div>
                  )}

                  {/* 5. Accessibility Tab */}
                  {activeTab === 'access' && (
                     <div className="space-y-12 animate-in slide-in-from-bottom-5 duration-500">
                        {/* Text Size Slider */}
                        <div className="space-y-6">
                           <div className="flex items-center gap-3">
                              <Type size={20} className="text-gray-400" />
                              <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest">Ukuran Teks (Eksklusif Lansia)</h4>
                           </div>
                           <div className="bg-gray-50 p-8 rounded-[6px] space-y-8">
                              <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                                 <span className="text-xs">Normal (14px)</span>
                                 <span className="text-lg">Sangat Besar (24px)</span>
                              </div>
                              <input
                                 type="range"
                                 min="14"
                                 max="24"
                                 value={textSize}
                                 onChange={(e) => setTextSize(e.target.value)}
                                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                              />
                              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                 <p className="font-bold text-gray-900" style={{ fontSize: `${textSize}px` }}>Ini adalah pratinjau teks bantuan AgriConnect.</p>
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Theme Toggle */}
                           <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
                              <h4 className="font-black text-gray-900 uppercase text-[10px] tracking-widest flex items-center gap-2">
                                 {isDarkMode ? <Moon size={14} /> : <Sun size={14} />} Mode Tampilan
                              </h4>
                              <button
                                 onClick={() => setIsDarkMode(!isDarkMode)}
                                 className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                              >
                                 <span className="text-xs font-bold text-gray-700">{isDarkMode ? 'Dark Mode Aktif' : 'Light Mode Aktif'}</span>
                                 <div className={`w-12 h-6 rounded-full relative ${isDarkMode ? 'bg-neutral-800' : 'bg-amber-100'} transition-colors`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-7' : 'left-1'}`} />
                                 </div>
                              </button>
                           </div>

                           {/* Voice Assist Toggle */}
                           <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
                              <h4 className="font-black text-gray-900 uppercase text-[10px] tracking-widest flex items-center gap-2">
                                 <Volume2 size={14} /> AgriVoice Assistant
                              </h4>
                              <button
                                 onClick={() => setAccess({ voice: !access.voice })}
                                 className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                              >
                                 <span className="text-xs font-bold text-gray-700">{access.voice ? 'Asisten Suara Aktif' : 'Asisten Suara Nonaktif'}</span>
                                 <div className={`w-12 h-6 rounded-full relative ${access.voice ? 'bg-green-500' : 'bg-gray-200'} transition-colors`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${access.voice ? 'left-7' : 'left-1'}`} />
                                 </div>
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

               </div>
            </div>
         </div>

         {/* --- MODALS --- */}

         {/* 1. Map Modal (Enhanced with Leaflet) */}
         {showMapModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowMapModal(false)}></div>
               <div className="bg-white rounded-[6px] shadow-2xl w-full max-w-2xl relative z-10 p-10 animate-in zoom-in-95 duration-500 overflow-y-auto max-h-[95vh] custom-scrollbar">
                  <div className="mb-6">
                     <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">{isEditMode ? 'Edit Alamat' : 'Tentukan Titik Akurat'}</h3>
                     <p className="text-sm text-gray-400 font-medium">Klik pada peta untuk menentukan koordinat dan isi detail alamat di bawah.</p>
                  </div>

                  {/* Leaflet Map Integration */}
                  <div className="w-full h-80 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner group mb-6 z-0">
                     <MapContainer
                        center={[mapPos.lat, mapPos.lng]}
                        zoom={14}
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                     >
                        <TileLayer
                           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationPicker position={mapPos} setPosition={setMapPos} />
                     </MapContainer>
                  </div>

                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Label Alamat (e.g. Rumah, Kantor)</label>
                        <input
                           value={tempAddressInfo.label}
                           onChange={(e) => setTempAddressInfo(prev => ({ ...prev, label: e.target.value }))}
                           placeholder="Masukan label alamat..."
                           className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Detail Alamat Lengkap</label>
                        <textarea
                           value={tempAddressInfo.address}
                           onChange={(e) => setTempAddressInfo(prev => ({ ...prev, address: e.target.value }))}
                           placeholder="Masukan detail jalan, kelurahan, dsb..."
                           rows="3"
                           className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                        />
                     </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                     <button
                        onClick={() => setShowMapModal(false)}
                        className="py-4 bg-gray-50 text-gray-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-100 transition-all"
                     >
                        Batal
                     </button>
                     <button
                        onClick={handleAddOrUpdateAddress}
                        className="py-4 bg-neutral-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl shadow-neutral-200"
                     >
                        {isEditMode ? 'Simpan Perubahan' : 'Tambah Alamat'}
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 3. Add Payment Modal */}
         {showAddPaymentModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowAddPaymentModal(false)}></div>
               <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-500">
                  <div className="mb-8">
                     <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                        <Wallet size={32} />
                     </div>
                     <h3 className="text-2xl font-black text-gray-900 uppercase">Tambah Refund</h3>
                     <p className="text-xs text-gray-400 font-medium mt-1">Pilih layanan e-wallet atau bank untuk menerima dana refund.</p>
                  </div>

                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Pilih Layanan</label>
                        <select 
                           value={newPayment.provider}
                           onChange={(e) => setNewPayment(prev => ({ ...prev, provider: e.target.value }))}
                           className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-400 outline-none"
                        >
                           <option>Gopay</option>
                           <option>OVO</option>
                           <option>ShopeePay</option>
                           <option>Bank BCA</option>
                           <option>Bank Mandiri</option>
                           <option>Bank BRI</option>
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nomor Akun / Rekening</label>
                        <input 
                           type="text"
                           placeholder="08xx xxxx xxxx"
                           value={newPayment.account}
                           onChange={(e) => setNewPayment(prev => ({ ...prev, account: e.target.value }))}
                           className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                        />
                     </div>

                     <div className="flex gap-4 pt-4">
                        <button
                           onClick={() => setShowAddPaymentModal(false)}
                           className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200"
                        >
                           Batal
                        </button>
                        <button
                           onClick={() => {
                              setShowAddPaymentModal(false);
                              setShowSecurityModal(true);
                           }}
                           className="flex-[2] py-4 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                        >
                           Verifikasi & Hubungkan
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
         
         {/* Edit the Security Modal button to call handleAddPayment on success */}
         {showSecurityModal && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowSecurityModal(false)}></div>
               <div className="bg-white rounded-[6px] p-10 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 text-center">
                  <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-200">
                     <Lock size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase mb-2">Verifikasi Keamanan</h3>
                  <p className="text-sm text-gray-400 font-medium mb-8">Demi keamanan pencairan dana Escrow, silakan masukkan Password akun Anda.</p>

                  <div className="space-y-6">
                     <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-center font-bold tracking-[1rem] outline-none focus:ring-2 focus:ring-amber-400" />
                     <button
                        onClick={() => {
                           setShowSecurityModal(false);
                           if (newPayment.account) {
                             handleAddPayment();
                           }
                        }}
                        className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95"
                     >
                        Konfirmasi Password
                     </button>
                     <button className="text-xs font-bold text-gray-400 hover:text-amber-600 transition-colors uppercase tracking-widest">Lupa Password?</button>
                  </div>
               </div>
            </div>
         )}

         {/* Success Toast */}
         {showToast && (
            <div className="fixed top-24 right-8 z-[200] animate-in slide-in-from-right duration-500">
               <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-white/20">
                  <CheckCircle size={24} />
                  <span className="font-black uppercase tracking-widest text-xs">Profil Berhasil Diperbarui!</span>
               </div>
            </div>
         )}

      </div>
   );
};

export default CustomerSettings;
