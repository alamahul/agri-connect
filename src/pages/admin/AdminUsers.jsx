import React, { useState } from 'react';
import {
   Users,
   Sprout,
   ShoppingBag,
   Search,
   Filter,
   MapPin,
   Star,
   ArrowRightLeft,
   ShieldCheck,
   ShieldAlert,
   MoreVertical,
   X,
   UserMinus,
   AlertOctagon,
   Mail,
   Phone,
   Calendar,
   Wallet,
   Bot,
   Zap,
   CheckCircle2,
   Lock,
   MessageSquare,
   Ban,
   ArrowUpRight,
   TrendingUp,
   Award,
   Clock,
   ExternalLink,
   ChevronRight
} from 'lucide-react';

const AdminUsers = () => {
   const [activeTab, setActiveTab] = useState('Petani');
   const [showDrawer, setShowDrawer] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);
   const [search, setSearch] = useState('');
   const [statusFilter, setStatusFilter] = useState('Status: Semua');
   const [toast, setToast] = useState(null);

   const [farmerData, setFarmerData] = useState([
      { id: 'FRM-001', name: 'Pak Budi Santoso', garden: 'Kebun Lembang Berkah', location: 'Lembang, Bandung', joined: '24 Jan 2024', rating: 4.8, returnRate: 2, kyc: 'Verified', escrow: 'Rp 4.500.000', complaints: 1, status: 'Aktif' },
      { id: 'FRM-002', name: 'Ibu Siti Aminah', garden: 'Sawah Subur Cianjur', location: 'Cianjur, Jabar', joined: '12 Feb 2024', rating: 4.5, returnRate: 5, kyc: 'Pending', escrow: 'Rp 1.200.000', complaints: 0, status: 'Menunggu KYC' },
      { id: 'FRM-003', name: 'Sugeng Pranoto', garden: 'Ladang Apel Malang', location: 'Malang, Jatim', joined: '05 Mar 2024', rating: 3.2, returnRate: 15, kyc: 'Verified', escrow: 'Rp 8.700.000', complaints: 4, status: 'Dibekukan' },
   ]);

   const [customerData, setCustomerData] = useState([
      { id: 'CST-9928', name: 'Budi Raharjo', level: 'Pahlawan Pangan Lvl 3', gmv: 'Rp 2.450.000', disputeRatio: 35, joined: '10 Jan 2024', escrowHistory: [], status: 'Aktif' },
      { id: 'CST-7712', name: 'Siska Putri', level: 'Pencinta Lokal Lvl 1', gmv: 'Rp 450.000', disputeRatio: 5, joined: '15 Mar 2024', escrowHistory: [], status: 'Aktif' },
      { id: 'CST-8810', name: 'Rehan Malik', level: 'Pejuang Organik Lvl 5', gmv: 'Rp 12.800.000', disputeRatio: 2, joined: '01 Jan 2023', escrowHistory: [], status: 'Aktif' },
   ]);

   const showNotification = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
   };

   const openUserDetail = (user) => {
      setSelectedUser(user);
      setShowDrawer(true);
   };

   const handleAction = (action, user) => {
      showNotification(`${action} untuk ${user.name} berhasil diproses!`);
      if (action.includes('Blokir') || action.includes('Bekukan') || action.includes('Pemutusan')) {
         setShowDrawer(false);
      }
   };

   const filteredFarmers = farmerData.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase()) || f.garden.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'Status: Semua' || f.status === statusFilter;
      return matchesSearch && matchesStatus;
   });

   const filteredCustomers = customerData.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'Status: Semua' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
   });

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500 relative">

         {/* Toast Notification Simulation */}
         {toast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 border-2 border-amber-400 text-white px-8 py-4 rounded-[6px] shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-10">
               <ShieldCheck className="text-amber-400" size={24} />
               <p className="text-xs font-black uppercase tracking-widest">{toast}</p>
            </div>
         )}

         {/* 1. Header & Segmentasi Pengguna (Tab Navigasi) */}
         <section className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
               <div>
                  <h1 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase leading-none italic">Manajemen Pengguna</h1>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-3 italic">Audit Ekosistem Mitra & Pelanggan AgriConnect</p>
               </div>

               <div className="flex bg-gray-50 p-1.5 rounded-[6px] border border-gray-100 shadow-inner w-full lg:w-auto">
                  <button
                     onClick={() => { setActiveTab('Petani'); setSearch(''); }}
                     className={`flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Petani' ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400 hover:text-neutral-900'}`}
                  >
                     <Sprout size={16} /> Mitra Petani
                  </button>
                  <button
                     onClick={() => { setActiveTab('Pelanggan'); setSearch(''); }}
                     className={`flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Pelanggan' ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400 hover:text-neutral-900'}`}
                  >
                     <ShoppingBag size={16} /> Pelanggan
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
               <div className="md:col-span-2 relative flex items-center group">
                  <input
                     value={search} onChange={(e) => setSearch(e.target.value)}
                     placeholder="Cari Nama, ID, atau Kebun..."
                     className="w-full pl-14 pr-6 h-[60px] bg-gray-50 border border-gray-100 rounded-[6px] text-xs font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all"
                  />
               </div>
               <div className="relative flex items-center group">
                  <Filter className="absolute left-6 text-gray-400 z-10" size={18} />
                  <select
                     value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                     className="w-full pl-14 pr-6 h-[60px] bg-gray-50 border border-gray-100 rounded-[6px] text-xs font-bold outline-none appearance-none focus:ring-4 focus:ring-neutral-900/5 transition-all cursor-pointer"
                  >
                     <option>Status: Semua</option>
                     <option value="Aktif">Aktif</option>
                     <option value="Menunggu KYC">Menunggu KYC</option>
                     <option value="Dibekukan">Dibekukan</option>
                  </select>
               </div>
               <div className="flex items-center gap-3 px-6 h-[60px] bg-emerald-50 rounded-[6px] border border-emerald-100">
                  <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                  <div className="min-w-0">
                     <p className="text-[10px] font-black text-emerald-600 uppercase leading-none">System Secure</p>
                     <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-tighter italic mt-1 truncate">Escrow Protected</p>
                  </div>
               </div>
            </div>
         </section>

         {/* 4. Fitur Inovasi: "AI Trust Score" (AgriBot) */}
         <section className="bg-neutral-900 p-8 rounded-[6px] border-4 border-amber-400/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-amber-400/5 rounded-full blur-3xl"></div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-2xl animate-pulse shrink-0">
                     <Bot size={32} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                        AgriBot AI Trust Center <Zap size={18} className="text-amber-400 fill-amber-400" />
                     </h3>
                     <p className="text-xs text-gray-400 font-medium">AI mendeteksi anomali perilaku dalam ekosistem belanja & panen secara real-time.</p>
                  </div>
               </div>

               <div className="bg-white/5 border border-white/10 p-5 rounded-[6px] flex flex-col md:flex-row items-center gap-6 backdrop-blur-md w-full lg:w-auto">
                  <div className="space-y-1 text-center md:text-left">
                     <p className="text-[10px] font-black text-red-400 uppercase tracking-widest italic">Anomali Terdeteksi</p>
                     <p className="text-xs font-bold text-gray-200 italic leading-relaxed">
                        "Pelanggan Budi Raharjo (ID: 9928) membatalkan 4 Pre-Order berturut-turut. AI merekomendasikan pembatasan fitur."
                     </p>
                  </div>
                  <button
                     onClick={() => showNotification("Rekomendasi AI Diterapkan!")}
                     className="bg-amber-400 text-neutral-900 px-6 py-4 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap w-full md:w-auto"
                  >
                     Setujui Rekomendasi
                  </button>
               </div>
            </div>
         </section>

         {/* 2 & 3. Data Tables Area */}
         <main className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
            {activeTab === 'Petani' ? (
               <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                     <thead className="bg-gray-50/50">
                        <tr>
                           <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Mitra Petani</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">Tingkat Retur</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">Rating</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">KYC Status</th>
                           <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {filteredFarmers.map((f, i) => (
                           <tr key={i} className="group hover:bg-emerald-50/20 transition-all cursor-pointer" onClick={() => openUserDetail(f)}>
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform shadow-lg">
                                       {f.name[0]}
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{f.name}</p>
                                       <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold uppercase tracking-wider italic">
                                          <MapPin size={10} /> {f.garden}
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-6 text-center">
                                 <span className={`text-xs font-black p-2 rounded-[4px] border border-transparent ${f.returnRate > 10 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>{f.returnRate}%</span>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase italic mt-1">Retur</p>
                              </td>
                              <td className="px-6 py-6 text-center">
                                 <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-xs">
                                    <Star size={14} className="fill-amber-500" /> {f.rating}
                                 </div>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase italic mt-1 whitespace-nowrap">Average Star</p>
                              </td>
                              <td className="px-6 py-6 whitespace-nowrap">
                                 <span className={`px-4 py-1.5 rounded-[6px] text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${f.kyc === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                    {f.kyc === 'Verified' ? <ShieldCheck size={12} /> : <AlertOctagon size={12} />}
                                    {f.kyc}
                                 </span>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <button className="p-3 hover:bg-white hover:shadow-lg rounded-[6px] text-gray-400 hover:text-neutral-900 transition-all border border-transparent hover:border-gray-100">
                                    <ChevronRight size={20} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            ) : (
               <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                     <thead className="bg-gray-50/50">
                        <tr>
                           <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Data Pelanggan</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Loyalty Level</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">Total GMV</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">Rasio Sengketa</th>
                           <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {filteredCustomers.map((c, i) => (
                           <tr key={i} className="group hover:bg-blue-50/20 transition-all cursor-pointer" onClick={() => openUserDetail(c)}>
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-[6px] flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform shadow-lg">
                                       {c.name[0]}
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{c.name}</p>
                                       <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider italic">{c.id} • Sejak {c.joined.split(' ')[2]}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-6 whitespace-nowrap">
                                 <span className="bg-indigo-50 text-indigo-600 px-3 py-2 rounded-[6px] text-[9px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2 w-fit shadow-sm">
                                    <Award size={12} /> {c.level}
                                 </span>
                              </td>
                              <td className="px-6 py-6 text-center">
                                 <p className="text-sm font-black text-neutral-900 uppercase">{c.gmv}</p>
                                 <div className="flex items-center justify-center gap-1 text-[8px] text-emerald-500 font-black uppercase tracking-widest italic mt-1">
                                    <TrendingUp size={10} /> Volume Up
                                 </div>
                              </td>
                              <td className="px-6 py-6 text-center">
                                 <div className={`text-xs font-black px-3 py-1.5 rounded-[6px] border ${c.disputeRatio > 30 ? 'bg-red-50 text-red-500 border-red-100 animate-pulse' : 'bg-gray-50 text-gray-500 border-transparent'} inline-block`}>
                                    {c.disputeRatio}%
                                 </div>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase italic mt-1">Dispute Ratio</p>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <button className="p-3 hover:bg-white hover:shadow-lg rounded-[6px] text-gray-400 hover:text-neutral-900 transition-all border border-transparent hover:border-gray-100">
                                    <ChevronRight size={20} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </main>

         {/* 2 & 3. ACTION SIDE-OVER SLIDE DRAWER */}
         {showDrawer && selectedUser && (
            <div className="fixed inset-0 z-[100] flex justify-end">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowDrawer(false)}></div>
               <div className="w-full max-w-lg bg-white relative z-10 shadow-3xl animate-in slide-in-from-right duration-500 flex flex-col pt-10 overflow-hidden">

                  <div className="px-10 mb-10 flex items-center justify-between shrink-0">
                     <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 text-white rounded-[6px] flex items-center justify-center font-black text-2xl shadow-2xl ${activeTab === 'Petani' ? 'bg-emerald-500' : 'bg-indigo-600'}`}>
                           {selectedUser.name[0]}
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">{selectedUser.name}</h3>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{selectedUser.id} • {activeTab}</p>
                        </div>
                     </div>
                     <button onClick={() => setShowDrawer(false)} className="w-12 h-12 bg-gray-50 hover:bg-neutral-900 hover:text-white rounded-[6px] transition-all flex items-center justify-center shadow-inner group">
                        <X size={24} className="group-hover:rotate-90 transition-transform" />
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-10 space-y-10 pb-20 custom-scrollbar">

                     {/* Hubungi Section */}
                     <div className="space-y-4">
                        <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                           <ShieldCheck size={16} className="text-emerald-500" /> Kontak & Komunikasi
                        </h4>
                        <div className="flex gap-4">
                           <button onClick={() => handleAction('Kirim Email', selectedUser)} className="flex-1 flex items-center justify-center gap-3 py-5 bg-emerald-50 text-emerald-600 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:bg-neutral-900 hover:text-white transition-all shadow-sm">
                              <Mail size={16} /> Email
                           </button>
                           <button onClick={() => handleAction('WA Alert', selectedUser)} className="flex-1 flex items-center justify-center gap-3 py-5 bg-blue-50 text-blue-600 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:bg-neutral-900 hover:text-white transition-all shadow-sm">
                              <MessageSquare size={16} /> WhatsApp
                           </button>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <div className="p-6 bg-gray-50 rounded-[6px] space-y-4 border border-gray-100 shadow-inner">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic border-b border-gray-100 pb-2">Informasi System</p>
                           <div className="space-y-4">
                              <div className="flex items-center justify-between text-xs font-bold">
                                 <span className="text-gray-400 uppercase text-[9px]">Registrasi System</span>
                                 <span className="text-neutral-900">{selectedUser.joined}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs font-bold">
                                 <span className="text-gray-400 uppercase text-[9px]">Status Audit</span>
                                 <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${selectedUser.status === 'Aktif' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{selectedUser.status}</span>
                              </div>
                              {activeTab === 'Petani' && (
                                 <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-gray-400 uppercase text-[9px]">Unit Produksi</span>
                                    <span className="text-neutral-900 uppercase truncate max-w-[150px]">{selectedUser.garden}</span>
                                 </div>
                              )}
                           </div>
                        </div>

                        {activeTab === 'Petani' && (
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-6 bg-emerald-50 rounded-[6px] border border-emerald-100 shadow-md">
                                 <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 text-center">Dana Escrow</p>
                                 <p className="text-xl font-black text-neutral-900 text-center tracking-tighter leading-none">{selectedUser.escrow}</p>
                              </div>
                              <div className={`p-6 rounded-[6px] border shadow-md ${selectedUser.complaints > 2 ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-transparent'}`}>
                                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-center">Komplain</p>
                                 <p className={`text-xl font-black text-center tracking-tighter leading-none ${selectedUser.complaints > 2 ? 'text-red-500' : 'text-neutral-900'}`}>{selectedUser.complaints}</p>
                              </div>
                           </div>
                        )}

                        {/* 5. Log Aktivitas Escrow (Audit Trail) */}
                        <div className="space-y-5">
                           <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                              <Clock size={16} className="text-indigo-500" /> Riwayat Escrow (System Audit)
                           </h4>
                           <div className="space-y-3">
                              {[
                                 { date: '24 Mar 2026', desc: 'Dana ditahan (INV-202)', type: 'Pending', amount: 'Rp 140.000' },
                                 { date: '22 Mar 2026', desc: 'Pencairan Berhasil (INV-110)', type: 'Success', amount: 'Rp 650.000' },
                                 { date: '20 Mar 2026', desc: 'Sengketa Dana (REF-009)', type: 'Red', amount: 'Rp 45.000' },
                              ].map((log, l) => (
                                 <div key={l} className="p-5 bg-white border border-gray-100 rounded-[6px] flex items-center justify-between group hover:border-indigo-400 hover:shadow-xl transition-all">
                                    <div className="flex items-center gap-4">
                                       <div className={`w-10 h-10 rounded-[6px] flex items-center justify-center shadow-sm ${log.type === 'Success' ? 'bg-emerald-50 text-emerald-500' : log.type === 'Pending' ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'}`}>
                                          <Wallet size={16} />
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black text-neutral-900 uppercase truncate max-w-[140px] leading-tight">{log.desc}</p>
                                          <p className="text-[8px] text-gray-400 font-bold tracking-widest mt-1 uppercase italic">{log.date} • Audit Pass</p>
                                       </div>
                                    </div>
                                    <p className={`text-[10px] font-black ${log.type === 'Red' ? 'text-red-500' : 'text-neutral-900'}`}>{log.amount}</p>
                                 </div>
                              ))}
                           </div>
                           <button className="w-full text-center py-4 bg-gray-50 border border-dashed border-gray-200 rounded-[6px] text-[9px] font-black text-indigo-500 uppercase tracking-widest hover:bg-neutral-900 hover:text-white hover:border-solid transition-all">Format Rekonsiliasi Lengkap <ExternalLink size={10} className="inline ml-2" /></button>
                        </div>
                     </div>

                     {/* Action Panel */}
                     <div className="pt-10 border-t-8 border-red-500/10 space-y-6">
                        <h4 className="text-xs font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                           <AlertOctagon size={16} /> Central Enforcement Center
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                           {activeTab === 'Petani' ? (
                              <button onClick={() => handleAction('Pembekuan Akun', selectedUser)} className="w-full flex items-center justify-center gap-4 py-6 bg-red-600 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-neutral-900 transition-all border-b-4 border-red-800">
                                 <Ban size={22} /> Bekukan Akun Petani
                              </button>
                           ) : (
                              <div className="grid grid-cols-2 gap-4">
                                 <button onClick={() => handleAction('Surat Peringatan', selectedUser)} className="flex items-center justify-center gap-3 py-5 bg-amber-400 text-neutral-900 rounded-[6px] font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-neutral-900 hover:text-white transition-all">
                                    <ShieldAlert size={18} /> Peringatan
                                 </button>
                                 <button onClick={() => handleAction('Pemutusan Mitra', selectedUser)} className="flex items-center justify-center gap-3 py-5 bg-red-600 text-white rounded-[6px] font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-neutral-900 transition-all">
                                    <Ban size={18} /> Blokir
                                 </button>
                              </div>
                           )}
                           <p className="text-[9px] text-gray-400 font-bold italic text-center leading-relaxed">Eksekusi ini bersifat final dan akan memicu audit otomatis aliran dana Escrow oleh AgriBot.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default AdminUsers;
