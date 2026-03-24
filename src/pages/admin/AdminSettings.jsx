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
   History
} from 'lucide-react';

const AdminSettings = () => {
   const [activeTab, setActiveTab] = useState('Financial');
   const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
   const [platformFee, setPlatformFee] = useState(2);
   const [deliveryRadius, setDeliveryRadius] = useState(30);

   const staffList = [
      { id: 'STF-001', name: 'Alamahul Bayan', role: 'Super Admin', email: 'alamahul@agrico.id', status: 'Active' },
      { id: 'STF-002', name: 'Siti Aminah', role: 'Admin Resolusi', email: 'siti.a@agrico.id', status: 'Active' },
      { id: 'STF-003', name: 'Budi Santoso', role: 'Admin Konten', email: 'budi.s@agrico.id', status: 'Inactive' },
   ];

   const tabs = [
      { id: 'Profile', label: 'Profil Saya', icon: <User size={18} /> },
      { id: 'Financial', label: 'Sistem Escrow', icon: <DollarSign size={18} /> },
      { id: 'Logistics', label: 'Logistik & Hub', icon: <Truck size={18} /> },
      { id: 'AISecurity', label: 'AI & Keamanan', icon: <ShieldAlert size={18} /> },
      { id: 'RBAC', label: 'Hak Akses Staf', icon: <Users size={18} /> },
   ];

   return (
      <div className="space-y-10 pb-32 animate-in fade-in duration-500">

         {/* 1. HEADER & GLOBAL EMERGENCY SWITCH */}
         <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-10 rounded-[6px] border border-gray-100 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                  <Settings size={32} />
               </div>
               <div>
                  <h1 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">System Configuration</h1>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2 italic">Global Control & Maintenance Center</p>
               </div>
            </div>

            {/* MASTER KILL SWITCH */}
            <div className={`p-6 rounded-[6px] flex items-center gap-8 border transition-all duration-500 ${isMaintenanceMode ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
               <div className="text-right">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isMaintenanceMode ? 'text-red-600' : 'text-gray-400'}`}>
                     {isMaintenanceMode ? 'Maintenance Active' : 'System Operational'}
                  </p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase mt-1 leading-none italic">
                     {isMaintenanceMode ? 'Purchases & Withdrawals Frozen' : 'Master Kill Switch (Emergency)'}
                  </p>
               </div>
               <button
                  onClick={() => { if (window.confirm('PERINGATAN: Seluruh transaksi akan dibekukan untuk semua pengguna. Lanjutkan?')) setIsMaintenanceMode(!isMaintenanceMode) }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 ${isMaintenanceMode ? 'bg-red-600 text-white animate-pulse' : 'bg-white text-red-600 border-4 border-red-100'}`}
               >
                  <Power size={32} />
               </button>
            </div>
         </section>

         {/* 2. TABBED NAVIGATION */}
         <div className="flex overflow-x-auto lg:overflow-visible gap-2 bg-white p-2 rounded-[6px] border border-gray-100 shadow-md w-fit scrollbar-hide">
            {tabs.map(tab => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-10 py-4 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-neutral-900 text-white shadow-xl translate-y-[-2px]' : 'text-gray-400 hover:text-neutral-900'}`}
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
                  <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center">
                           <CreditCard size={24} />
                        </div>
                        <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Financial Engine</h3>
                     </div>

                     <div className="space-y-8">
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Platform Fee (%)</label>
                              <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-[6px]">LIVE SETTING</span>
                           </div>
                           <div className="relative">
                              <input
                                 type="number"
                                 value={platformFee}
                                 onChange={(e) => setPlatformFee(e.target.value)}
                                 className="w-full px-10 py-6 bg-gray-50 border border-gray-100 rounded-[6px] text-xl font-black text-neutral-900 outline-none focus:ring-4 focus:ring-amber-400/20"
                              />
                              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-lg font-black text-gray-300">%</span>
                           </div>
                           <p className="text-[9px] text-gray-400 font-bold uppercase italic ml-4">Potongan komisi otomatis dari setiap dana Escrow yang dicairkan ke petani.</p>
                        </div>

                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Minimal Penarikan (Rp)</label>
                           <input defaultValue={50000} type="text" className="w-full px-10 py-6 bg-gray-50 border border-gray-100 rounded-[6px] text-xl font-black text-neutral-900 outline-none" />
                        </div>
                     </div>
                  </div>

                  <div className="bg-neutral-900 p-12 rounded-[6px] text-white shadow-2xl flex flex-col justify-between space-y-12">
                     <div className="space-y-8">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-white/10 rounded-[6px] flex items-center justify-center text-amber-400">
                              <Zap size={24} />
                           </div>
                           <h3 className="text-xl font-black uppercase tracking-tighter italic leading-none">Auto-Payout SLA</h3>
                        </div>

                        <div className="space-y-6">
                           <div className="p-8 bg-white/5 border border-white/10 rounded-[6px] flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                              <div className="flex items-center gap-6">
                                 <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20"><Check size={20} /></div>
                                 <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest">Real-time Payout</h4>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Seketika pembeli klik selesai</p>
                                 </div>
                              </div>
                              <div className="w-6 h-6 border-2 border-emerald-500 rounded-full flex items-center justify-center p-1">
                                 <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                              </div>
                           </div>

                           <div className="p-8 bg-white/5 border border-white/10 rounded-[6px] flex items-center justify-between group cursor-pointer opacity-40">
                              <div className="flex items-center gap-6">
                                 <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center"><History size={20} /></div>
                                 <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest">Batch/Kolektif</h4>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Setiap Hari Jumat Sore</p>
                                 </div>
                              </div>
                              <div className="w-6 h-6 border-2 border-gray-700 rounded-full"></div>
                           </div>
                        </div>
                     </div>
                     <button className="w-full py-6 bg-amber-400 text-neutral-900 rounded-[6px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">Update Financial Policy</button>
                  </div>
               </div>
            )}

            {/* TAB: LOGISTICS */}
            {activeTab === 'Logistics' && (
               <div className="space-y-8">
                  <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-12">
                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-emerald-600 text-white rounded-[6px] flex items-center justify-center shadow-lg">
                              <Truck size={24} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Logistics Geofencing</h3>
                              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Boundary & Hub Control</p>
                           </div>
                        </div>
                        <div className="lg:w-96 space-y-4">
                           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                              <span className="text-gray-400 italic">Radius Pengiriman Maksimal</span>
                              <span className="text-emerald-600 text-lg italic">{deliveryRadius} KM</span>
                           </div>
                           <input
                              type="range"
                              min="5"
                              max="150"
                              value={deliveryRadius}
                              onChange={(e) => setDeliveryRadius(e.target.value)}
                              className="w-full h-2 bg-gray-100 rounded-[6px] appearance-none cursor-pointer accent-emerald-600"
                           />
                           <p className="text-[9px] text-gray-400 font-bold uppercase text-center mt-2 italic whitespace-nowrap overflow-hidden">Mencegah sayuran busuk dengan membatasi jarak antara petani & pembeli.</p>
                        </div>
                     </div>

                     {/* Hub Table */}
                     <div className="pt-10 border-t border-gray-50 space-y-8">
                        <div className="flex justify-between items-center px-4">
                           <h4 className="text-[10px] font-black text-neutral-900 uppercase tracking-[0.2em] italic">Daftar Titik Kumpul (Logistics Hubs)</h4>
                           <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-[6px] text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                              <Plus size={14} /> Tambah Hub Baru
                           </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {[
                              { city: 'Bandung Tengah', address: 'Jl. Cicendo No. 45', cap: '2.5 Ton/Day', active: true },
                              { city: 'Bogor Selatan', address: 'Kawasan Industri Sentul', cap: '5.0 Ton/Day', active: true },
                              { city: 'Jakarta Selatan', address: 'Hub TB Simatupang', cap: '3.2 Ton/Day', active: false },
                           ].map((hub, i) => (
                              <div key={i} className={`p-8 rounded-[6px] border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:border-emerald-100 relative overflow-hidden group ${!hub.active ? 'bg-gray-50 opacity-60' : 'bg-white'}`}>
                                 <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                    <div className="flex justify-between items-start">
                                       <div className={`p-3 rounded-[6px] ${hub.active ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-200 text-gray-400'}`}>
                                          <Navigation size={20} />
                                       </div>
                                       <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                    <div>
                                       <h5 className="text-sm font-black text-neutral-900 uppercase tracking-tight italic">{hub.city}</h5>
                                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 leading-none">{hub.address}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <Hexagon size={12} className={hub.active ? 'text-emerald-500' : 'text-gray-400'} />
                                       <p className="text-[10px] font-black uppercase text-neutral-900 tracking-widest">{hub.cap}</p>
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
                  <div className="lg:col-span-2 bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-12 animate-in slide-in-from-left duration-700">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center">
                           <ShieldAlert size={24} />
                        </div>
                        <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">AgriBot Thresholds</h3>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Skor Toleransi Pembatalan</label>
                              <div className="flex items-center gap-4">
                                 <input type="number" defaultValue={3} className="w-24 px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-[10px] font-black outline-none" />
                                 <p className="text-[10px] font-black uppercase text-neutral-900 tracking-widest">Pesanan / <span className="text-amber-600 font-black">24 JAM</span></p>
                              </div>
                              <p className="text-[9px] text-gray-400 font-medium leading-relaxed italic uppercase">AI akan otomatis memblokir pembeli jika mencapai batas pembatalan pesanan.</p>
                           </div>

                           <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Min. Reputasi Petani</label>
                              <input type="range" className="w-full accent-neutral-900" />
                              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-400">
                                 <span>Low Visibility</span>
                                 <span className="text-neutral-900">Premium Only (4.8)</span>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                              <EyeOff size={14} className="text-red-500" /> Profanity Filter (Banned Words)
                           </label>
                           <textarea
                              placeholder="Masukkan kata terlarang dipisahkan dengan koma... (e.g. blok, transfer, anjing, bego)"
                              className="w-full h-[220px] p-8 bg-gray-50 border border-gray-100 rounded-[6px] text-[10px] font-bold outline-none leading-relaxed resize-none focus:ring-4 focus:ring-red-600/5 placeholder:text-gray-300"
                           ></textarea>
                        </div>
                     </div>
                  </div>

                  <div className="bg-amber-400 p-12 rounded-[6px] shadow-2xl flex flex-col justify-between text-neutral-900 group">
                     <div className="space-y-8 relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12">
                           <Sliders size={180} />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                           <div className="space-y-6">
                              <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none">Security Tuning</h3>
                              <p className="text-[11px] font-bold uppercase tracking-widest italic opacity-60">Atur "Keberanian" AgriBot AI dalam mendeteksi kecurangan transaksi (Fraud).</p>
                           </div>

                           <div className="space-y-4">
                              <div className="p-6 bg-white rounded-[6px] border-2 border-neutral-900/5 shadow-sm space-y-4">
                                 <div className="flex justify-between items-center text-[11px] font-black uppercase italic">
                                    <span>AI Strength</span>
                                    <span>AGGRESSIVE</span>
                                 </div>
                                 <div className="w-full h-3 bg-neutral-900/10 rounded-full flex gap-1 p-0.5">
                                    <div className="flex-1 bg-neutral-900 rounded-full h-full"></div>
                                    <div className="flex-1 bg-neutral-900 rounded-full h-full"></div>
                                    <div className="flex-1 bg-white/50 rounded-full h-full"></div>
                                 </div>
                              </div>
                              <button className="w-full pt-2 pb-10 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Save Security Config</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* TAB: RBAC (Role Access) */}
            {activeTab === 'RBAC' && (
               <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-10 animate-in slide-in-from-right duration-700">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center">
                           <ShieldCheck size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Role-Based Access Control</h3>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 italic">Internal Authorization & Staff Management</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="relative">
                           <input placeholder="Cari staf..." className="pl-14 pr-8 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-[10px] font-bold outline-none" />
                        </div>
                     </div>
                  </div>

                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="border-b border-gray-50">
                              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identitas Staf</th>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Akses Level</th>
                              <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                              <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 italic">
                           {staffList.map((stf, i) => (
                              <tr key={i} className="hover:bg-gray-50 transition-all">
                                 <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 bg-gray-100 rounded-[6px] flex items-center justify-center text-xs font-black text-gray-400">{stf.name.charAt(0)}</div>
                                       <div>
                                          <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{stf.name}</p>
                                          <p className="text-[10px] font-bold text-gray-400 lowercase">{stf.email}</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-8 text-center text-[10px] font-black uppercase text-indigo-600 bg-indigo-50/30 rounded-[6px] scale-[0.7]">{stf.role}</td>
                                 <td className="px-6 py-8 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                       <div className={`w-2 h-2 rounded-full ${stf.status === 'Active' ? 'bg-emerald-500 shadow-md shadow-emerald-200' : 'bg-red-400'}`}></div>
                                       <p className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">{stf.status}</p>
                                    </div>
                                 </td>
                                 <td className="px-10 py-8 text-right space-x-3">
                                    <button className="p-3 bg-white border border-gray-100 rounded-[6px] text-gray-400 hover:text-neutral-900 transition-all"><Settings size={16} /></button>
                                    <button className="p-3 bg-white border border-gray-100 rounded-[6px] text-gray-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
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
                  <div className="lg:col-span-1 bg-white p-10 rounded-[6px] border border-gray-100 shadow-2xl text-center flex flex-col items-center gap-6">
                     <div className="w-32 h-32 rounded-[6px] bg-neutral-900 border-[6px] border-amber-400 flex items-center justify-center text-white text-4xl font-black shadow-3xl">AD</div>
                     <div>
                        <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Administrator</h3>
                        <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mt-2 bg-amber-50 px-4 py-1.5 rounded-[6px] inline-block">Superadmin HQ</p>
                     </div>
                     <div className="w-full space-y-4 pt-8 border-t border-gray-50 text-left">
                        <div className="flex justify-between items-center px-4">
                           <span className="text-[10px] font-black text-gray-400 uppercase italic">Email ID</span>
                           <span className="text-[10px] font-black text-neutral-900">admin@agrico.id</span>
                        </div>
                        <div className="flex justify-between items-center px-4">
                           <span className="text-[10px] font-black text-gray-400 uppercase italic">Last Active</span>
                           <span className="text-[10px] font-black text-neutral-900">2 Mins Ago</span>
                        </div>
                     </div>
                  </div>

                  {/* Edit Profile & Security */}
                  <div className="lg:col-span-2 space-y-8">
                     <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-10">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center">
                              <User size={24} />
                           </div>
                           <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Edit My Profile</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-2 px-4 italic">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                              <input defaultValue="Admin AgriConnect" className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-black text-neutral-900 outline-none" />
                           </div>
                           <div className="space-y-2 px-4 italic">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Work Email</label>
                              <input defaultValue="admin@agrico.id" className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-black text-neutral-900 outline-none" />
                           </div>
                        </div>
                        <div className="px-4">
                           <button className="flex items-center gap-3 px-10 py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                              <Save size={18} /> Simpan Perubahan
                           </button>
                        </div>
                     </div>

                     <div className="bg-white p-12 rounded-[6px] border border-gray-100 shadow-2xl space-y-10">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center">
                              <Key size={24} />
                           </div>
                           <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">Security Center</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 italic">
                           <div className="space-y-2 px-4 md:col-span-2">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Current Password</label>
                              <input type="password" placeholder="••••••••" className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-black text-neutral-700 outline-none" />
                           </div>
                           <div className="space-y-2 px-4">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">New Password</label>
                              <input type="password" placeholder="Min. 12 Characters" className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-black text-neutral-700 outline-none" />
                           </div>
                           <div className="space-y-2 px-4">
                              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Confirm Action</label>
                              <input type="password" placeholder="Repeat Password" className="w-full px-8 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-black text-neutral-700 outline-none" />
                           </div>
                        </div>
                        <div className="px-4 pt-4 border-t border-gray-50">
                           <button className="flex items-center gap-3 px-10 py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                              <Lock size={18} /> Update Keyphrase
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}

         </section>

      </div>
   );
};

export default AdminSettings;





