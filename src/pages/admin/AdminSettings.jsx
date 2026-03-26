import React, { useState } from 'react';
import {
   User,
   Bell,
   Lock,
   Globe,
   Save,
   DollarSign,
   Zap,
   ShieldCheck,
   MapPin,
   Truck,
   Sliders,
   ShieldAlert,
   Users,
   Power,
   Key,
   CreditCard,
   Navigation,
   EyeOff,
   Search,
   MoreVertical,
   Plus,
   Trash2,
   Settings,
   Mail,
   Phone,
   Hexagon,
   ArrowRight,
   Target,
   Check,
   History,
   Activity,
   X,
   Edit3
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
   useMapEvents({
      click(e) {
         setPosition(e.latlng);
      },
   });

   return position === null ? null : (
      <Marker position={position}>
         <Popup>Titik Lokasi Hub</Popup>
      </Marker>
   );
}

const AdminSettings = () => {
   const [activeTab, setActiveTab] = useState('Financial');
   const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
   const [toast, setToast] = useState(null);
   const [showAddHubModal, setShowAddHubModal] = useState(false);
   const [showAddStaffModal, setShowAddStaffModal] = useState(false);
   const [selectedHub, setSelectedHub] = useState(null);
   const [editingHub, setEditingHub] = useState(null);
   const [mapPosition, setMapPosition] = useState(null);

   const showNotification = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
   };

   // ================= STATE FOR FINANCIAL TAB =================
   const [platformFee, setPlatformFee] = useState(2);
   const [minWithdrawal, setMinWithdrawal] = useState(50000);
   const [payoutSLA, setPayoutSLA] = useState('Real-time Payout');
   const [isSavingFinance, setIsSavingFinance] = useState(false);

   const handleSaveFinance = () => {
      setIsSavingFinance(true);
      setTimeout(() => {
         setIsSavingFinance(false);
         showNotification("Kebijakan Finansial Berhasil Diperbarui!");
      }, 1000);
   };

   // ================= STATE FOR LOGISTICS TAB =================
   const [deliveryRadius, setDeliveryRadius] = useState(30);
   const [hubs, setHubs] = useState([
      { id: 1, city: 'Bandung Tengah', address: 'Jl. Cicendo No. 45', cap: '2.5 Ton/Day', active: true, lat: -6.9147, lng: 107.6098 },
      { id: 2, city: 'Bogor Selatan', address: 'Kawasan Industri Sentul', cap: '5.0 Ton/Day', active: true, lat: -6.5971, lng: 106.8415 },
      { id: 3, city: 'Jakarta Selatan', address: 'Hub TB Simatupang', cap: '3.2 Ton/Day', active: false, lat: -6.2838, lng: 106.8049 },
   ]);

   const toggleHubStatus = (id, e) => {
      e.stopPropagation();
      setHubs(hubs.map(hub => hub.id === id ? { ...hub, active: !hub.active } : hub));
      showNotification("Status Hub Logistik Diperbarui");
   };

   const deleteHub = (id, e) => {
      e.stopPropagation();
      setHubs(hubs.filter(hub => hub.id !== id));
      showNotification("Hub Logistik Dihapus secara Permanen");
   };

   const openEditHub = (hub, e) => {
      e.stopPropagation();
      setEditingHub(hub);
      setMapPosition({ lat: hub.lat, lng: hub.lng });
      setShowAddHubModal(true);
   };

   const openAddHub = () => {
      setEditingHub(null);
      setMapPosition({ lat: -6.200000, lng: 106.816666 });
      setShowAddHubModal(true);
   };

   const saveNewHub = (e) => {
      e.preventDefault();
      const formatCap = parseFloat(e.target.cap.value);
      if (!mapPosition) {
         showNotification("Pilih titik koordinat di peta!");
         return;
      }

      if (editingHub) {
         setHubs(hubs.map((h) => h.id === editingHub.id ? {
            ...h,
            city: e.target.city.value,
            address: e.target.address.value,
            cap: `${formatCap.toFixed(1)} Ton/Day`,
            lat: mapPosition.lat,
            lng: mapPosition.lng,
         } : h));
         showNotification("Fasilitas Timbang Berhasil Diperbarui");
      } else {
         const newHub = {
            id: Date.now(),
            city: e.target.city.value,
            address: e.target.address.value,
            cap: `${formatCap.toFixed(1)} Ton/Day`,
            active: true,
            lat: mapPosition.lat,
            lng: mapPosition.lng,
         };
         setHubs([...hubs, newHub]);
         showNotification("Fasilitas Timbang Baru Berhasil Ditambahkan");
      }
      setShowAddHubModal(false);
      setEditingHub(null);
      setMapPosition(null);
   };

   const handleSaveLogistics = () => {
      showNotification("Pengaturan Radius Geofencing Disimpan");
   };

   // ================= STATE FOR AI SECURITY TAB =================
   const [aiStrength, setAiStrength] = useState('AGGRESSIVE'); // LOW, MODERATE, AGGRESSIVE
   const [tolerance, setTolerance] = useState(3);
   const [minReputation, setMinReputation] = useState(4.2);

   const handleSaveSecurity = () => {
      showNotification(`Konfigurasi Keamanan AI (${aiStrength}) Disimpan!`);
   };

   // ================= STATE FOR RBAC TAB =================
   const [searchStaff, setSearchStaff] = useState('');
   const [staffList, setStaffList] = useState([
      { id: 'STF-001', name: 'Alamahul Bayan', role: 'Super Admin', email: 'alamahul@agrico.id', status: 'Active' },
      { id: 'STF-002', name: 'Siti Aminah', role: 'Admin Resolusi', email: 'siti.a@agrico.id', status: 'Active' },
      { id: 'STF-003', name: 'Budi Santoso', role: 'Admin Konten', email: 'budi.s@agrico.id', status: 'Inactive' },
   ]);

   const filteredStaff = staffList.filter(s =>
      s.name.toLowerCase().includes(searchStaff.toLowerCase()) ||
      s.role.toLowerCase().includes(searchStaff.toLowerCase())
   );

   const handleStatusToggle = (id) => {
      setStaffList(staffList.map(s => {
         if (s.id === id) {
            const newStatus = s.status === 'Active' ? 'Inactive' : 'Active';
            showNotification(`Status Staf ${s.name} diubah menjadi ${newStatus}`);
            return { ...s, status: newStatus };
         }
         return s;
      }));
   };

   const deleteStaff = (id) => {
      setStaffList(staffList.filter(s => s.id !== id));
      showNotification("Akses Staf Telah Dicabut!");
   };

   const saveNewStaff = (e) => {
      e.preventDefault();
      const newStaff = {
         id: `STF-00${staffList.length + 1}`,
         name: e.target.name.value,
         email: e.target.email.value,
         role: e.target.role.value,
         status: 'Active'
      };
      setStaffList([...staffList, newStaff]);
      setShowAddStaffModal(false);
      showNotification("Eksekutif Baru Berhasil Diberikan Akses");
   };

   // ================= UI CONFIG =================
   const tabs = [
      { id: 'Financial', label: 'Sistem Escrow', icon: <DollarSign size={18} /> },
      { id: 'Logistics', label: 'Logistik & Hub', icon: <Truck size={18} /> },
      { id: 'AISecurity', label: 'AI & Keamanan', icon: <ShieldAlert size={18} /> },
      { id: 'RBAC', label: 'Hak Akses Staf', icon: <Users size={18} /> },
      { id: 'Profile', label: 'Profil Saya', icon: <User size={18} /> },
   ];

   return (
      <div className="space-y-10 pb-32 animate-in fade-in duration-500 relative">

         {/* TOAST NOTIFICATION */}
         {toast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[250] bg-neutral-900 border-2 border-amber-400 text-white px-8 py-4 rounded-[6px] shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-10">
               <ShieldCheck className="text-amber-400 shrink-0" size={24} />
               <p className="text-xs font-black uppercase tracking-widest leading-none">{toast}</p>
            </div>
         )}

         {/* MAINTENANCE MODE GLOBAL OVERLAY (Soft Indicator) */}
         {isMaintenanceMode && (
            <div className="fixed inset-0 z-[50] pointer-events-none border-[12px] border-red-500/20 animate-pulse"></div>
         )}

         {/* 1. HEADER & GLOBAL EMERGENCY SWITCH */}
         <section className={`flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-10 rounded-[6px] border shadow-2xl relative overflow-hidden transition-all duration-700 ${isMaintenanceMode ? 'bg-red-50/50 border-red-200' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center gap-6 relative z-10">
               <div className={`w-16 h-16 rounded-[6px] flex items-center justify-center shadow-lg transition-colors duration-500 ${isMaintenanceMode ? 'bg-red-600 text-white shadow-red-200' : 'bg-neutral-900 text-white'}`}>
                  {isMaintenanceMode ? <AlertTriangle size={32} className="animate-pulse" /> : <Settings size={32} />}
               </div>
               <div>
                  <h1 className="text-2xl lg:text-3xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">System Configuration</h1>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2 italic">Global Control & Maintenance Center</p>
               </div>
            </div>

            {/* MASTER KILL SWITCH */}
            <div className={`p-6 rounded-[6px] flex items-center gap-8 border transition-all duration-500 relative z-10 ${isMaintenanceMode ? 'bg-white shadow-2xl border-red-200' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
               <div className="text-right">
                  <p className={`text-[12px] font-black uppercase tracking-[0.2em] ${isMaintenanceMode ? 'text-red-600 animate-pulse' : 'text-gray-400'}`}>
                     {isMaintenanceMode ? 'Maintenance Active' : 'System Operational'}
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 leading-none italic">
                     {isMaintenanceMode ? 'E-Commerce Features Disabled' : 'Master Kill Switch (Emergency)'}
                  </p>
               </div>
               <button
                  onClick={() => {
                     const confirmMsg = isMaintenanceMode ? 'Nonaktifkan mode perbaikan dan buka kembali akses untuk semua pengguna?' : 'PERINGATAN: Seluruh transaksi akan dibekukan untuk semua pengguna. Lanjutkan?';
                     if (window.confirm(confirmMsg)) {
                        setIsMaintenanceMode(!isMaintenanceMode);
                        showNotification(isMaintenanceMode ? 'Sistem Kembali Operasional' : 'Maintenance Mode Diaktifkan');
                     }
                  }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${isMaintenanceMode ? 'bg-red-600 text-white scale-110 shadow-red-500/30 ring-8 ring-red-100' : 'bg-white text-gray-300 border-4 border-gray-100 hover:text-red-500 hover:border-red-100 hover:shadow-2xl'}`}
               >
                  <Power size={32} className={isMaintenanceMode ? "animate-pulse" : ""} />
               </button>
            </div>
         </section>

         {/* 2. TABBED NAVIGATION */}
         <div className="flex overflow-x-auto lg:overflow-visible gap-2 bg-white p-2 rounded-[6px] border border-gray-100 shadow-md w-fit scrollbar-hide">
            {tabs.map(tab => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-10 py-4 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-neutral-900 text-white shadow-xl scale-105 mx-1 z-10' : 'bg-transparent text-gray-400 hover:text-neutral-900 hover:bg-gray-50'}`}
               >
                  {tab.icon} {tab.label}
               </button>
            ))}
         </div>

         {/* 3. SETTINGS MODULES */}
         <section className="animate-in slide-in-from-bottom-5 duration-700">

            {/* TAB: FINANCIAL SYSTEM */}
            {activeTab === 'Financial' && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl flex flex-col justify-between">
                     <div className="space-y-12">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-lg shadow-amber-100">
                              <CreditCard size={24} />
                           </div>
                           <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Financial Engine Policy</h3>
                        </div>

                        <div className="space-y-8">
                           <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Platform Take Rate (%)</label>
                                 <span className="text-[8px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-[6px] uppercase tracking-widest">Global Escrow</span>
                              </div>
                              <div className="relative">
                                 <input
                                    type="number"
                                    value={platformFee}
                                    onChange={(e) => setPlatformFee(e.target.value)}
                                    className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-[6px] text-2xl font-black text-neutral-900 outline-none focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 focus:bg-white transition-all shadow-inner"
                                 />
                                 <span className="absolute right-8 top-1/2 -translate-y-1/2 text-xl font-black text-gray-300">%</span>
                              </div>
                              <p className="text-[9px] text-gray-400 font-bold uppercase italic ml-2">Potongan komisi otomatis dari setiap pencairan (payout) ke dompet petani atau suplier.</p>
                           </div>

                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Minimal Pencairan Escrow (Rp)</label>
                              <div className="relative">
                                 <input
                                    type="number"
                                    value={minWithdrawal}
                                    onChange={(e) => setMinWithdrawal(e.target.value)}
                                    className="w-full pl-16 pr-8 py-6 bg-gray-50 border border-gray-100 rounded-[6px] text-xl font-black text-neutral-900 outline-none focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 focus:bg-white transition-all shadow-inner"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                     <button onClick={handleSaveFinance} className="mt-12 w-full py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-3">
                        {isSavingFinance ? <Zap className="animate-pulse text-amber-400" size={16} /> : <Save size={16} />}
                        {isSavingFinance ? "Menyimpan Konfigurasi..." : "Update Fee & Limits"}
                     </button>
                  </div>

                  <div className="bg-neutral-900 p-12 rounded-[6px] text-white shadow-2xl flex flex-col justify-between space-y-12 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                        <Activity size={180} />
                     </div>
                     <div className="space-y-10 relative z-10">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white/10 rounded-[6px] flex items-center justify-center text-amber-400">
                                 <Zap size={24} />
                              </div>
                              <h3 className="text-xl font-black uppercase tracking-tighter italic leading-none">Auto-Payout SLA</h3>
                           </div>
                           <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-black rounded-full uppercase tracking-widest">{payoutSLA} Active</span>
                        </div>

                        <div className="space-y-6">
                           {[
                              { id: 'Real-time Payout', title: 'Real-time Processing', sub: 'Seketika pembeli klik pesanan selesai', icon: <Check size={20} /> },
                              { id: 'Batch Payout', title: 'Batch / Hold System', sub: 'Kolektif setiap Hari Jumat Sore H+3', icon: <History size={20} /> }
                           ].map((sla) => (
                              <div
                                 key={sla.id}
                                 onClick={() => { setPayoutSLA(sla.id); showNotification(`SLA Diubah ke ${sla.id}`); }}
                                 className={`p-8 border rounded-[6px] flex items-center justify-between cursor-pointer transition-all ${payoutSLA === sla.id ? 'bg-white/10 border-amber-400 shadow-xl shadow-amber-400/5 scale-[1.02]' : 'bg-white/5 border-white/10 hover:bg-white/10 opacity-50 hover:opacity-100'}`}
                              >
                                 <div className="flex items-center gap-6">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${payoutSLA === sla.id ? 'bg-amber-400 text-neutral-900' : 'bg-gray-700 text-gray-300'}`}>
                                       {sla.icon}
                                    </div>
                                    <div>
                                       <h4 className={`text-sm font-black uppercase tracking-widest ${payoutSLA === sla.id ? 'text-white' : 'text-gray-300'}`}>{sla.title}</h4>
                                       <p className="text-[9px] text-gray-400 font-bold uppercase mt-1 tracking-wider italic">{sla.sub}</p>
                                    </div>
                                 </div>
                                 <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center p-1 transition-colors ${payoutSLA === sla.id ? 'border-amber-400' : 'border-gray-600'}`}>
                                    {payoutSLA === sla.id && <div className="w-full h-full bg-amber-400 rounded-full"></div>}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* TAB: LOGISTICS */}
            {activeTab === 'Logistics' && (
               <div className="space-y-8">
                  <div className="bg-white p-10 lg:p-14 rounded-[6px] border border-gray-100 shadow-2xl space-y-12">
                     <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-12">
                        <div className="flex gap-6 max-w-lg">
                           <div className="w-16 h-16 bg-emerald-600 text-white rounded-[6px] flex items-center justify-center shadow-xl shadow-emerald-600/20 shrink-0">
                              <MapPin size={32} />
                           </div>
                           <div>
                              <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Geofencing & Coverage</h3>
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-3 leading-relaxed">Kendali radius pengoperasian logistik untuk menekan tingkat kerusakan sayur (Food Loss) selama perjalanan darat.</p>
                           </div>
                        </div>

                        <div className="xl:w-[450px] space-y-8 bg-gray-50 p-8 rounded-[6px] border border-gray-100">
                           <div className="flex justify-between items-end">
                              <div>
                                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Radius Terjauh</span>
                                 <div className="flex items-center gap-2 mt-1">
                                    <Target size={14} className="text-emerald-500" />
                                    <span className="text-3xl font-black text-neutral-900 leading-none tracking-tighter italic">{deliveryRadius}</span>
                                    <span className="text-sm font-black text-emerald-600 italic">KM</span>
                                 </div>
                              </div>
                              <button onClick={handleSaveLogistics} className="px-6 py-3 bg-emerald-600 text-white rounded-[6px] text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] shadow-xl transition-all">
                                 Terapkan
                              </button>
                           </div>
                           <input
                              type="range"
                              min="5"
                              max="150"
                              value={deliveryRadius}
                              onChange={(e) => setDeliveryRadius(e.target.value)}
                              className="w-full h-3 bg-white rounded-full appearance-none cursor-pointer accent-emerald-600 border border-gray-200 shadow-inner"
                           />
                           <div className="flex justify-between text-[8px] font-black text-gray-400 uppercase tracking-widest">
                              <span>Hyper-Local (5km)</span>
                              <span>Inter-City (150km)</span>
                           </div>
                        </div>
                     </div>

                     {/* Hub Table */}
                     <div className="pt-12 border-t text-left border-gray-100 space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                           <div>
                              <h4 className="text-lg font-black text-neutral-900 uppercase tracking-tighter italic">Operational Hubs</h4>
                              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Titik Transit Distribusi Hasil Panen</p>
                           </div>
                           <button onClick={openAddHub} className="flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-emerald-600 hover:scale-105 transition-all w-full sm:w-auto">
                              <Plus size={16} /> Tambah Fasilitas Timbang
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                           {hubs.map((hub) => (
                              <div key={hub.id} onClick={() => setSelectedHub(hub)} className={`p-8 rounded-[6px] border transition-all hover:-translate-y-1 hover:border-emerald-200 relative group cursor-pointer ${hub.active ? 'bg-white border-gray-200 shadow-xl' : 'bg-gray-50 border-gray-100 shadow-sm opacity-75'}`}>
                                 <div className="flex flex-col h-full justify-between gap-8">
                                    <div className="flex justify-between items-start">
                                       <div className={`w-14 h-14 rounded-[6px] flex items-center justify-center shadow-lg transition-colors ${hub.active ? 'bg-emerald-50 text-emerald-600' : 'bg-white text-gray-400 border border-gray-200'}`}>
                                          <Navigation size={24} className={hub.active ? "animate-pulse" : ""} />
                                       </div>
                                       <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button onClick={(e) => toggleHubStatus(hub.id, e)} className="p-2 bg-white border border-gray-200 rounded-[6px] text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm" title="Toggle Status">
                                             <Power size={14} />
                                          </button>
                                          <button onClick={(e) => openEditHub(hub, e)} className="p-2 bg-white border border-gray-200 rounded-[6px] text-gray-500 hover:text-amber-500 hover:bg-amber-50 transition-all shadow-sm" title="Edit Hub">
                                             <Edit3 size={14} />
                                          </button>
                                          <button onClick={(e) => deleteHub(hub.id, e)} className="p-2 bg-white border border-gray-200 rounded-[6px] text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all shadow-sm" title="Delete Hub">
                                             <Trash2 size={14} />
                                          </button>
                                       </div>
                                    </div>

                                    <div>
                                       <div className="flex items-center gap-3 mb-2">
                                          <h5 className={`text-base font-black uppercase tracking-tighter italic ${hub.active ? 'text-neutral-900' : 'text-gray-500'}`}>{hub.city}</h5>
                                          <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-full ${hub.active ? 'bg-emerald-500/10 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>{hub.active ? 'ONLINE' : 'OFFLINE'}</span>
                                       </div>
                                       <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">{hub.address}</p>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[6px] border border-gray-100">
                                       <Hexagon size={16} className={hub.active ? 'text-emerald-500' : 'text-gray-400'} fill={hub.active ? '#10b98120' : 'none'} />
                                       <div>
                                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Max Processing Capacity</p>
                                          <p className={`text-xs font-black uppercase tracking-widest mt-0.5 ${hub.active ? 'text-neutral-900' : 'text-gray-400'}`}>{hub.cap}</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* TAB: AI SECURITY */}
            {activeTab === 'AISecurity' && (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white p-10 lg:p-14 rounded-[6px] border border-gray-100 shadow-2xl space-y-12 animate-in slide-in-from-left duration-700">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-xl shadow-neutral-200 shrink-0">
                           <ShieldAlert size={32} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Machine Learning Thresholds</h3>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 italic">Automated Content Moderation & Fraud Detection Engine</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-10">
                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Toleransi Pembatalan Otomatis</label>
                              <div className="flex items-center gap-4">
                                 <input
                                    type="number"
                                    value={tolerance}
                                    onChange={(e) => setTolerance(e.target.value)}
                                    className="w-24 px-6 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-lg font-black text-center outline-none focus:ring-4 focus:ring-amber-400/20 focus:bg-white transition-all shadow-inner"
                                 />
                                 <div>
                                    <p className="text-[10px] font-black uppercase text-neutral-900 tracking-widest">Pesanan Batal</p>
                                    <p className="text-[9px] font-black text-amber-600 uppercase bg-amber-50 px-2 py-0.5 mt-1 rounded inline-block">PER 24 JAM</p>
                                 </div>
                              </div>
                              <p className="text-[9px] text-gray-400 font-bold leading-relaxed italic uppercase mt-2">AI akan secara otomatis membekukan akun pembeli yang melampaui batas pembatalan sistem.</p>
                           </div>

                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Scoring Reputasi Petani Minimum</label>
                              <div className="flex items-center gap-4 mb-4">
                                 <span className="text-2xl font-black text-neutral-900 italic tracking-tighter">{minReputation}</span>
                                 <span className="text-[10px] font-black text-amber-500 uppercase flex items-center gap-1"><Target size={12} /> Trust Score</span>
                              </div>
                              <input
                                 type="range"
                                 min="1" max="5" step="0.1"
                                 value={minReputation}
                                 onChange={(e) => setMinReputation(e.target.value)}
                                 className="w-full h-2 bg-gray-100 rounded-[6px] appearance-none cursor-pointer accent-neutral-900"
                              />
                              <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-gray-400 mt-2">
                                 <span>Low Visibility</span>
                                 <span>Strict Excellence (5.0)</span>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-neutral-900 uppercase tracking-widest ml-1 flex items-center gap-2 bg-red-50 p-3 rounded-[6px] border border-red-100">
                              <EyeOff size={16} className="text-red-500" /> Banned Keywords (Profanity Filter)
                           </label>
                           <textarea
                              defaultValue="blok, transfer, anjing, bego, penipu, babi, cancel"
                              placeholder="Masukkan kata terlarang dipisahkan dengan koma..."
                              className="w-full h-[200px] p-6 bg-white border border-gray-200 rounded-[6px] text-[11px] font-bold text-gray-600 outline-none leading-loose resize-none focus:ring-4 focus:ring-red-600/10 focus:border-red-400 transition-all shadow-inner"
                           ></textarea>
                           <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest text-right">Dipisahkan dengan koma (,)</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-amber-400 p-12 rounded-[6px] shadow-2xl flex flex-col justify-between text-neutral-900 group relative overflow-hidden">
                     <div className="absolute -top-10 -right-10 p-8 opacity-20 scale-[2] rotate-12 group-hover:rotate-[30deg] group-hover:scale-[2.5] transition-all duration-1000 pointer-events-none">
                        <Sliders size={180} />
                     </div>
                     <div className="relative z-10 flex flex-col h-full justify-between space-y-12">
                        <div className="space-y-6">
                           <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Security Tuning</h3>
                           <p className="text-[11px] font-bold uppercase tracking-widest italic opacity-80 leading-relaxed">Atur "Keberanian" AgriBot AI dalam mendeteksi dan melakukan moderasi otomatis atas kecurangan transaksi (Fraud).</p>
                        </div>

                        <div className="space-y-8">
                           <div className="space-y-3">
                              <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">AI Action Aggressiveness</p>
                              <div className="grid grid-cols-3 gap-2">
                                 {['LOW', 'MODERATE', 'AGGRESSIVE'].map((mode) => (
                                    <button
                                       key={mode}
                                       onClick={() => setAiStrength(mode)}
                                       className={`py-6 px-2 rounded-[6px] text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${Math.floor(aiStrength) === mode ? 'bg-neutral-900 text-amber-400' : 'bg-white/30 text-neutral-900 hover:bg-neutral-900 hover:text-white'}`}
                                    >
                                       {mode}
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div className="p-6 bg-white border-2 border-neutral-900/10 rounded-[6px] shadow-sm flex items-start gap-4 transition-all">
                              <ShieldCheck className="text-neutral-900 shrink-0" size={24} />
                              <p className="text-[10px] font-black text-neutral-900 uppercase leading-relaxed italic">
                                 {aiStrength === 'LOW' && "AI hanya akan memberikan peringatan kepada staff tanpa mengambil tindakan blokir."}
                                 {aiStrength === 'MODERATE' && "AI memoderasi konten secara otomatis, memblokir pengguna setelah di-review parsial."}
                                 {aiStrength === 'AGGRESSIVE' && "Autopilot penuh. AI mendeteksi anomali harga dan memblokir seketika tanpa approval admin."}
                              </p>
                           </div>

                           <button onClick={handleSaveSecurity} className="w-full pt-6 pb-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:text-neutral-900 active:scale-95 transition-all text-center flex justify-center gap-2">
                              Deploy Configuration <ArrowRight size={14} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* TAB: RBAC (Role Access) */}
            {activeTab === 'RBAC' && (
               <div className="bg-white p-10 lg:p-14 rounded-[6px] border border-gray-100 shadow-2xl space-y-12 animate-in slide-in-from-right duration-700 text-left">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                           <ShieldAlert size={32} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Internal Access Control</h3>
                           <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2 italic">Role-Based Authorization Management</p>
                        </div>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative group/search w-full sm:w-auto">
                           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-indigo-600 transition-colors" size={18} />
                           <input
                              type="text"
                              placeholder="Cari Staf Utama..."
                              value={searchStaff}
                              onChange={(e) => setSearchStaff(e.target.value)}
                              className="w-full sm:w-80 pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 focus:bg-white transition-all shadow-inner placeholder-gray-400"
                           />
                        </div>
                        <button onClick={() => setShowAddStaffModal(true)} className="flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-neutral-900 hover:scale-[1.02] transition-all">
                           <Plus size={16} /> Invite Executive
                        </button>
                     </div>
                  </div>

                  <div className="overflow-x-auto rounded-[6px] border border-gray-100 shadow-sm">
                     <table className="w-full text-left bg-white">
                        <thead className="bg-gray-50">
                           <tr>
                              <th className="px-10 py-6 text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Personel Identitas</th>
                              <th className="px-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-100">Hak Akses (Role)</th>
                              <th className="px-6 py-6 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-100">Status Sistem</th>
                              <th className="px-10 py-6 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-100">Manajemen</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 italic">
                           {filteredStaff.length === 0 ? (
                              <tr>
                                 <td colSpan="4" className="px-10 py-20 text-center">
                                    <Users size={48} className="mx-auto text-gray-200 mb-4" />
                                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Staf tidak ditemukan</p>
                                 </td>
                              </tr>
                           ) : filteredStaff.map((stf) => (
                              <tr key={stf.id} className="hover:bg-gray-50/50 transition-colors group/row">
                                 <td className="px-10 py-6">
                                    <div className="flex items-center gap-5">
                                       <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-[6px] flex items-center justify-center text-lg font-black text-indigo-900 shadow-sm">
                                          {stf.name.charAt(0)}
                                       </div>
                                       <div>
                                          <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{stf.name}</p>
                                          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase underline decoration-gray-200 decoration-dotted underline-offset-4">{stf.email}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-6 text-center">
                                    <span className="inline-block px-5 py-2.5 text-[9px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
                                       {stf.role}
                                    </span>
                                 </td>
                                 <td className="px-6 py-6 text-center">
                                    <button
                                       onClick={() => handleStatusToggle(stf.id)}
                                       className="inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                                    >
                                       <div className={`w-2.5 h-2.5 rounded-full ${stf.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-gray-300'}`}></div>
                                       <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${stf.status === 'Active' ? 'text-neutral-900' : 'text-gray-400'}`}>{stf.status}</p>
                                    </button>
                                 </td>
                                 <td className="px-10 py-6 text-right">
                                    <div className="flex justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                       <button onClick={() => showNotification("Manajemen Akun Terkunci untuk Demo")} className="p-3 bg-white border border-gray-200 rounded-[6px] text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all">
                                          <Settings size={16} />
                                       </button>
                                       <button onClick={() => deleteStaff(stf.id)} className="p-3 bg-white border border-gray-200 rounded-[6px] text-gray-400 hover:text-red-600 hover:border-red-200 hover:shadow-md transition-all" title="Cabut Akses">
                                          <Trash2 size={16} />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {/* TAB: PROFILE (Legacy/Retention) */}
            {activeTab === 'Profile' && (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Overview */}
                  <div className="lg:col-span-1 bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl text-center flex flex-col items-center justify-center gap-6 animate-in slide-in-from-left duration-700">
                     <div className="w-36 h-36 rounded-[6px] bg-neutral-900 border-8 border-amber-400 flex items-center justify-center text-white text-5xl font-black shadow-3xl shadow-amber-400/20">AB</div>
                     <div className="mt-4">
                        <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Alamahul Bayan</h3>
                        <p className="text-[10px] text-amber-600 font-black uppercase tracking-[0.2em] mt-3 bg-amber-50 border border-amber-100 px-5 py-2.5 rounded-[6px] inline-flex items-center gap-2">
                           <ShieldCheck size={14} /> Executive Superadmin
                        </p>
                     </div>
                     <div className="w-full space-y-6 pt-10 border-t border-gray-100 text-left">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-[6px]">
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Mail size={14} /> Identitas ID</span>
                           <span className="text-[10px] font-black text-neutral-900">alamahul@agrico.id</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-[6px]">
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Activity size={14} /> Treshold Log</span>
                           <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></div> Active Now</span>
                        </div>
                     </div>
                  </div>

                  {/* Edit Profile & Security */}
                  <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-right duration-700">
                     <div className="bg-white p-10 lg:p-14 rounded-[6px] border border-gray-100 shadow-2xl space-y-12">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                           <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                                 <User size={24} />
                              </div>
                              <div>
                                 <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Biodata Eksekutif</h3>
                                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2 italic">Informasi Komunikasi Publik</p>
                              </div>
                           </div>
                           <button onClick={() => showNotification("Tampilan Profil Eksekutif Diperbarui")} className="px-8 py-4 bg-neutral-900 text-white rounded-[6px] text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all text-center flex justify-center gap-3">
                              <Save size={14} /> Update Record
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
                           <div className="space-y-3 px-2 italic">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Display Name</label>
                              <div className="relative">
                                 <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                 <input defaultValue="Alamahul Bayan" className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-black text-neutral-900 outline-none focus:bg-white focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all shadow-inner" />
                              </div>
                           </div>
                           <div className="space-y-3 px-2 italic">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Official Hub Email</label>
                              <div className="relative">
                                 <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                 <input defaultValue="alamahul@agrico.id" className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-black text-neutral-900 outline-none focus:bg-white focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all shadow-inner" />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="bg-neutral-900 p-10 lg:p-14 rounded-[6px] shadow-2xl space-y-12 text-white">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                           <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-lg shadow-amber-400/20">
                                 <Key size={24} />
                              </div>
                              <div>
                                 <h3 className="text-xl font-black uppercase tracking-tighter italic leading-none">Security Encryption Protocol</h3>
                                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2 italic">Master Keyphrase Update System</p>
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 italic pt-6 border-t border-white/10">
                           <div className="space-y-3 px-2">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Current Admin Keyphrase</label>
                              <input type="password" placeholder="Masukan Keyphrase Saat Ini" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[6px] text-sm font-black text-white outline-none focus:bg-white/10 focus:border-amber-400 transition-all shadow-inner" />
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3 px-2">
                                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">New Access Key</label>
                                 <input type="password" placeholder="Min. 16 Characters" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[6px] text-sm font-black text-white outline-none focus:bg-white/10 focus:border-amber-400 transition-all shadow-inner" />
                              </div>
                              <div className="space-y-3 px-2">
                                 <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Verify Signature</label>
                                 <input type="password" placeholder="Ulangi Access Key" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[6px] text-sm font-black text-white outline-none focus:bg-white/10 focus:border-amber-400 transition-all shadow-inner" />
                              </div>
                           </div>
                        </div>
                        <div className="px-2 pt-6">
                           <button onClick={() => showNotification("Protokol Enkripsi Berhasil Diperbarui")} className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-5 bg-amber-400 text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-amber-400/20 hover:bg-white transition-all active:scale-95">
                              <Lock size={16} /> Force Update Keyphrase
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

         </section>

         {/* ADD HUB MODAL */}
         {showAddHubModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowAddHubModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-lg shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 overflow-hidden">
                  <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-[6px] flex items-center justify-center">
                           <Plus size={20} />
                        </div>
                        <div>
                           <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter italic">{editingHub ? 'Edit Fasilitas Timbang' : 'Registrasi Hub Baru'}</h3>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Sistem Logistik AgriConnect</p>
                        </div>
                     </div>
                     <button onClick={() => {setShowAddHubModal(false); setEditingHub(null);}} className="text-gray-400 hover:text-red-500 transition-colors bg-white p-2 rounded-[6px]"><X size={20} /></button>
                  </div>
                  <form onSubmit={saveNewHub} className="overflow-y-auto max-h-[70vh] p-8 space-y-6">
                     <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Kota / Wilayah (contoh: Jakarta Utara)</label>
                        <input name="city" defaultValue={editingHub?.city} required placeholder="Nama Wilayah Operasional" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-[6px] text-sm font-bold text-neutral-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
                     </div>
                     <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Alamat Lengkap Hub Transit</label>
                        <input name="address" defaultValue={editingHub?.address} required placeholder="Jl. Raya Logistik No..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-[6px] text-sm font-bold text-neutral-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-left">
                           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Kapasitas (Ton/Hari)</label>
                           <input name="cap" defaultValue={editingHub ? parseFloat(editingHub.cap) : ''} type="number" step="0.1" required placeholder="Misal: 5.5" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-[6px] text-sm font-bold text-neutral-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
                        </div>
                        <div className="space-y-2 text-left">
                           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Koordinat (Pilih Peta)</label>
                           <input readOnly value={mapPosition ? `${mapPosition.lat.toFixed(4)}...` : 'Belum dipilih'} className="w-full p-4 bg-gray-100 border border-gray-200 rounded-[6px] text-sm font-bold text-gray-500 outline-none cursor-not-allowed" />
                        </div>
                     </div>
                     <div className="h-[250px] w-full rounded-[6px] overflow-hidden border border-gray-200 relative z-0 shadow-inner">
                        {showAddHubModal && (
                           <MapContainer center={mapPosition || [-6.200000, 106.816666]} zoom={11} style={{ height: '100%', width: '100%' }}>
                              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
                              <LocationMarker position={mapPosition} setPosition={setMapPosition} />
                           </MapContainer>
                        )}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-emerald-600 shadow-xl border border-emerald-100 pointer-events-none">
                           Klik Di Peta Untuk Atur Lokasi
                        </div>
                     </div>
                     <div className="pt-4 flex gap-4">
                        <button type="button" onClick={() => {setShowAddHubModal(false); setEditingHub(null);}} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">Batal</button>
                        <button type="submit" className="flex-[2] py-4 bg-emerald-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/20 transition-all">{editingHub ? 'Simpan Perubahan' : 'Aktifkan Hub'}</button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {/* ADD STAFF MODAL */}
         {showAddStaffModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowAddStaffModal(false)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-lg shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 overflow-hidden">
                  <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-[6px] flex items-center justify-center">
                           <Users size={20} />
                        </div>
                        <div>
                           <h3 className="text-lg font-black text-neutral-900 uppercase tracking-tighter italic">Invite New Executive</h3>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Konfigurasi Hak Akses Sistem</p>
                        </div>
                     </div>
                     <button onClick={() => setShowAddStaffModal(false)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={20} /></button>
                  </div>
                  <form onSubmit={saveNewStaff} className="p-8 space-y-6">
                     <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nama Lengkap Eksekutif</label>
                        <input name="name" required placeholder="John Doe" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-[6px] text-sm font-bold text-neutral-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" />
                     </div>
                     <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Alamat Email Perusahaan / Pribadi</label>
                        <input name="email" type="email" required placeholder="contoh@agrico.id" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-[6px] text-sm font-bold text-neutral-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all" />
                     </div>
                     <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Assign Role (Hak Akses)</label>
                        <select name="role" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-[6px] text-sm font-bold text-neutral-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                           <option value="Admin Logistik">Admin Logistik</option>
                           <option value="Admin Keuangan">Admin Keuangan</option>
                           <option value="Admin Resolusi">Admin Resolusi Tim Sengketa</option>
                           <option value="Super Admin">Tim Super Admin HQ</option>
                        </select>
                     </div>
                     <div className="pt-4 flex gap-4">
                        <button type="button" onClick={() => setShowAddStaffModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">Batal</button>
                        <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/20 transition-all">Kirim Undangan Akses</button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {/* VIEW HUB MAP MODAL */}
         {selectedHub && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setSelectedHub(null)}></div>
               <div className="bg-white rounded-[6px] w-full max-w-3xl shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 flex flex-col h-[70vh]">
                  <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-[6px] flex items-center justify-center ${selectedHub.active ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>
                           <Navigation size={24} className={selectedHub.active ? "animate-pulse" : ""} />
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                              <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic">{selectedHub.city}</h3>
                              <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-full ${selectedHub.active ? 'bg-emerald-500/10 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>{selectedHub.active ? 'ONLINE' : 'OFFLINE'}</span>
                           </div>
                           <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-1">{selectedHub.address}</p>
                        </div>
                     </div>
                     <button onClick={() => setSelectedHub(null)} className="text-gray-400 hover:text-red-500 transition-colors bg-white p-2 rounded-[6px] border border-gray-100 shadow-sm"><X size={20} /></button>
                  </div>
                  <div className="flex-1 relative z-0 w-full rounded-b-[6px] overflow-hidden">
                     {selectedHub && (
                        <MapContainer center={[selectedHub.lat, selectedHub.lng]} zoom={14} style={{ height: '100%', width: '100%' }}>
                           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
                           <Marker position={[selectedHub.lat, selectedHub.lng]}>
                              <Popup>
                                 <b>{selectedHub.city}</b><br/>{selectedHub.address}<br/>Kapasitas: {selectedHub.cap}
                              </Popup>
                           </Marker>
                        </MapContainer>
                     )}
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default AdminSettings;
