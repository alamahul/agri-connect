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
   const [statusFilter, setStatusFilter] = useState('Semua');

   const farmerData = [
      { id: 'FRM-001', name: 'Pak Budi Santoso', garden: 'Kebun Lembang Berkah', location: 'Lembang, Bandung', joined: '24 Jan 2024', rating: 4.8, returnRate: 2, kyc: 'Verified', escrow: 'Rp 4.500.000', complaints: 1 },
      { id: 'FRM-002', name: 'Ibu Siti Aminah', garden: 'Sawah Subur Cianjur', location: 'Cianjur, Jabar', joined: '12 Feb 2024', rating: 4.5, returnRate: 5, kyc: 'Pending', escrow: 'Rp 1.200.000', complaints: 0 },
      { id: 'FRM-003', name: 'Sugeng Pranoto', garden: 'Ladang Apel Malang', location: 'Malang, Jatim', joined: '05 Mar 2024', rating: 3.2, returnRate: 15, kyc: 'Verified', escrow: 'Rp 8.700.000', complaints: 4 },
   ];

   const customerData = [
      { id: 'CST-9928', name: 'Budi Raharjo', level: 'Pahlawan Pangan Lvl 3', gmv: 'Rp 2.450.000', disputeRatio: 35, joined: '10 Jan 2024', escrowHistory: [] },
      { id: 'CST-7712', name: 'Siska Putri', level: 'Pencinta Lokal Lvl 1', gmv: 'Rp 450.000', disputeRatio: 5, joined: '15 Mar 2024', escrowHistory: [] },
      { id: 'CST-8810', name: 'Rehan Malik', level: 'Pejuang Organik Lvl 5', gmv: 'Rp 12.800.000', disputeRatio: 2, joined: '01 Jan 2023', escrowHistory: [] },
   ];

   const openUserDetail = (user) => {
      setSelectedUser(user);
      setShowDrawer(true);
   };

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500">

         {/* 1. Header & Segmentasi Pengguna (Tab Navigasi) */}
         <section className="bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
               <div>
                  <h1 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase">Manajemen Pengguna</h1>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">Audit Ekosistem Mitra & Pelanggan AgriConnect</p>
               </div>

               <div className="flex bg-gray-50 p-1.5 rounded-[6px] border border-gray-100 shadow-inner">
                  <button
                     onClick={() => setActiveTab('Petani')}
                     className={`flex items-center gap-3 px-8 py-3 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Petani' ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400 hover:text-neutral-900'}`}
                  >
                     <Sprout size={16} /> Mitra Petani
                  </button>
                  <button
                     onClick={() => setActiveTab('Pelanggan')}
                     className={`flex items-center gap-3 px-8 py-3 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'Pelanggan' ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400 hover:text-neutral-900'}`}
                  >
                     <ShoppingBag size={16} /> Pelanggan
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
               <div className="lg:col-span-2 relative group">
                  {/* <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-neutral-900 transition-colors" size={18} /> */}
                  <input
                     value={search} onChange={(e) => setSearch(e.target.value)}
                     placeholder="Cari Nama, No. HP, atau Rekening..."
                     className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-xs font-bold outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  />
               </div>
               <div className="relative group">
                  <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                     value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                     className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-xs font-bold outline-none appearance-none focus:ring-2 focus:ring-neutral-900 transition-all"
                  >
                     <option>Status: Semua</option>
                     <option>Aktif</option>
                     <option>Menunggu KYC</option>
                     <option>Dibekukan</option>
                  </select>
               </div>
               <div className="flex items-center gap-3 px-6 py-4 bg-emerald-50 rounded-[6px] border border-emerald-100">
                  <ShieldCheck className="text-emerald-500" size={20} />
                  <div>
                     <p className="text-[10px] font-black text-emerald-600 uppercase">System Secure</p>
                     <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-tighter italic whitespace-nowrap overflow-hidden">Semua Akun Melalui Escrow</p>
                  </div>
               </div>
            </div>
         </section>

         {/* 4. Fitur Inovasi: "AI Trust Score" (AgriBot) */}
         <section className="bg-neutral-900 p-8 rounded-[6px] border-4 border-amber-400/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-amber-400/5 rounded-full blur-3xl"></div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-2xl animate-pulse">
                     <Bot size={32} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                        AgriBot AI Trust Center <Zap size={18} className="text-amber-400 fill-amber-400" />
                     </h3>
                     <p className="text-xs text-gray-400 font-medium">AI mendeteksi anomali perilaku dalam ekosistem belanja & panen.</p>
                  </div>
               </div>

               <div className="bg-white/5 border border-white/10 p-5 rounded-[6px] flex items-center gap-6 backdrop-blur-md">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Anomali Terdeteksi</p>
                     <p className="text-xs font-bold text-gray-200 italic">
                        "Pelanggan Budi Raharjo (ID: 9928) membatalkan 4 Pre-Order berturut-turut. AI merekomendasikan blokir 7 hari."
                     </p>
                  </div>
                  <button className="bg-amber-400 text-neutral-900 px-6 py-3 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap">
                     Setujui Rekomendasi AI
                  </button>
               </div>
            </div>
         </section>

         {/* 2 & 3. Data Tables Area */}
         <main className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
            {activeTab === 'Petani' ? (
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead className="bg-gray-50/50">
                        <tr>
                           <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Mitra Petani</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text text-center">Tingkat Retur</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text text-center">Rating</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">KYC Status</th>
                           <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {farmerData.map((f, i) => (
                           <tr key={i} className="group hover:bg-emerald-50/20 transition-all cursor-pointer" onClick={() => openUserDetail(f)}>
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform">
                                       {f.name[0]}
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{f.name}</p>
                                       <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold uppercase tracking-wider italic">
                                          <MapPin size={10} /> {f.garden} • {f.location}
                                       </div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-6 text text-center">
                                 <span className={`text-xs font-black ${f.returnRate > 10 ? 'text-red-500' : 'text-emerald-500'}`}>{f.returnRate}%</span>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase italic -mt-0.5">Retur Pembeli</p>
                              </td>
                              <td className="px-6 py-6 text text-center">
                                 <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-xs">
                                    <Star size={14} className="fill-amber-500" /> {f.rating}
                                 </div>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase italic -mt-0.5">Bintang Rata-rata</p>
                              </td>
                              <td className="px-6 py-6">
                                 <span className={`px-4 py-1.5 rounded-[6px] text-[9px] font-black uppercase tracking-widest border ${f.kyc === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                    {f.kyc === 'Verified' ? <ShieldCheck className="inline mr-1" size={10} /> : <AlertOctagon className="inline mr-1" size={10} />}
                                    {f.kyc}
                                 </span>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <button className="p-3 hover:bg-white hover:shadow-lg rounded-[6px] text-gray-400 hover:text-neutral-900 transition-all">
                                    <ChevronRight size={20} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            ) : (
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead className="bg-gray-50/50">
                        <tr>
                           <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Data Pelanggan</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Level</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text text-center">Total GMV</th>
                           <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text text-center">Rasio Sengketa</th>
                           <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {customerData.map((c, i) => (
                           <tr key={i} className="group hover:bg-blue-50/20 transition-all cursor-pointer" onClick={() => openUserDetail(c)}>
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-[6px] flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform">
                                       {c.name[0]}
                                    </div>
                                    <div className="space-y-0.5">
                                       <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{c.name}</p>
                                       <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider italic">{c.id} • Bergabung {c.joined}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-6">
                                 <span className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-[6px] text-[9px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2 w-fit">
                                    <Award size={10} /> {c.level}
                                 </span>
                              </td>
                              <td className="px-6 py-6 text text-center">
                                 <p className="text-sm font-black text-neutral-900 uppercase">{c.gmv}</p>
                                 <div className="flex items-center justify-center gap-1 text-[8px] text-emerald-500 font-black uppercase tracking-widest italic">
                                    <TrendingUp size={8} /> Pertumbuhan Transaksi
                                 </div>
                              </td>
                              <td className="px-6 py-6 text text-center">
                                 <div className={`text-xs font-black p-2 rounded-[6px] border-2 ${c.disputeRatio > 30 ? 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse' : 'bg-gray-50 text-gray-500 border-transparent'}`}>
                                    {c.disputeRatio}%
                                 </div>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase italic mt-1 leading-none">Rasio Komplain</p>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <button className="p-3 hover:bg-white hover:shadow-lg rounded-[6px] text-gray-400 hover:text-neutral-900 transition-all">
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
            <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
               <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto" onClick={() => setShowDrawer(false)}></div>
               <div className="w-full max-w-lg bg-white relative z-10 shadow-[-20px_0_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-right duration-500 flex flex-col pt-10">

                  <div className="px-10 mb-10 flex items-center justify-between">
                     <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 text-white rounded-[6px] flex items-center justify-center font-black text-xl shadow-xl ${activeTab === 'Petani' ? 'bg-emerald-500' : 'bg-indigo-600'}`}>
                           {selectedUser.name[0]}
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">{selectedUser.name}</h3>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{selectedUser.id} • {activeTab}</p>
                        </div>
                     </div>
                     <button onClick={() => setShowDrawer(false)} className="p-3 bg-gray-50 hover:bg-neutral-900 hover:text-white rounded-[6px] transition-all">
                        <X size={24} />
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-10 space-y-10 pb-20">

                     {/* Hubungi Button */}
                     <div className="flex gap-4">
                        <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-emerald-50 text-emerald-600 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:bg-emerald-100 transition-all">
                           <Mail size={16} /> Kirim Email
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-50 text-blue-600 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:bg-blue-100 transition-all">
                           <MessageSquare size={16} /> Chat WhatsApp
                        </button>
                     </div>

                     <div className="space-y-6">
                        <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                           <ShieldCheck size={16} className="text-emerald-500" /> Detail Profil & KYC
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                           <div className="p-5 bg-gray-50 rounded-[6px] space-y-3">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Informasi Dasar</p>
                              <div className="space-y-4">
                                 <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-gray-400 uppercase text-[9px]">Tanggal Gabung</span>
                                    <span className="text-neutral-900">{selectedUser.joined}</span>
                                 </div>
                                 {activeTab === 'Petani' && (
                                    <div className="flex items-center justify-between text-xs font-bold">
                                       <span className="text-gray-400 uppercase text-[9px]">Dikelola Oleh</span>
                                       <span className="text-neutral-900 uppercase">{selectedUser.garden}</span>
                                    </div>
                                 )}
                              </div>
                           </div>

                           {activeTab === 'Petani' && (
                              <div className="grid grid-cols-2 gap-4">
                                 <div className="p-5 bg-emerald-50 rounded-[6px] border border-emerald-100">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 text-center">Escrow Wallet</p>
                                    <p className="text-lg font-black text-neutral-900 text-center tracking-tighter">{selectedUser.escrow}</p>
                                 </div>
                                 <div className={`p-5 rounded-[6px] border ${selectedUser.complaints > 2 ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-transparent'}`}>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 text-center">Komplain</p>
                                    <p className={`text-lg font-black text-center tracking-tighter ${selectedUser.complaints > 2 ? 'text-red-500' : 'text-neutral-900'}`}>{selectedUser.complaints} Kasus</p>
                                 </div>
                              </div>
                           )}

                           {/* 5. Log Aktivitas Escrow (Audit Trail) */}
                           <div className="space-y-4">
                              <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                                 <Clock size={16} className="text-indigo-500" /> Riwayat Escrow (Audit Trail)
                              </h4>
                              <div className="space-y-2">
                                 {[
                                    { date: '24 Mar 2026', desc: 'Dana ditahan (INV-202)', type: 'Pending', amount: 'Rp 140.000' },
                                    { date: '22 Mar 2026', desc: 'Pencairan Berhasil (INV-110)', type: 'Success', amount: 'Rp 650.000' },
                                    { date: '20 Mar 2026', desc: 'Refund Pembeli (INV-009)', type: 'Red', amount: 'Rp 45.000' },
                                 ].map((log, l) => (
                                    <div key={l} className="p-4 bg-white border border-gray-100 rounded-[6px] flex items-center justify-between group hover:border-indigo-100 transition-all">
                                       <div className="flex items-center gap-4">
                                          <div className={`w-8 h-8 rounded-[6px] flex items-center justify-center ${log.type === 'Success' ? 'bg-emerald-50 text-emerald-500' : log.type === 'Pending' ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'}`}>
                                             <Wallet size={14} />
                                          </div>
                                          <div>
                                             <p className="text-[10px] font-black text-neutral-900 uppercase truncate max-w-[140px]">{log.desc}</p>
                                             <p className="text-[8px] text-gray-400 font-bold tracking-widest">{log.date}</p>
                                          </div>
                                       </div>
                                       <p className="text-[10px] font-black text-neutral-900">{log.amount}</p>
                                    </div>
                                 ))}
                              </div>
                              <button className="w-full text-center text-[9px] font-black text-indigo-500 uppercase tracking-widest hover:underline">Lihat Semua Aliran Dana <ExternalLink size={10} className="inline ml-1" /></button>
                           </div>
                        </div>
                     </div>

                     {/* Action Panel */}
                     <div className="pt-10 border-t border-gray-100 space-y-4">
                        <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-4">Zona Bahaya (Danger Zone)</h4>
                        {activeTab === 'Petani' ? (
                           <button className="w-full flex items-center justify-center gap-3 py-6 bg-red-600 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl shadow-red-200 hover:-translate-y-1 active:scale-95 transition-all">
                              <Ban size={20} /> Bekukan Toko Sementara
                           </button>
                        ) : (
                           <div className="grid grid-cols-2 gap-4">
                              <button className="flex items-center justify-center gap-3 py-5 bg-amber-400 text-neutral-900 rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:-translate-y-1 active:scale-95 transition-all">
                                 <ShieldAlert size={18} /> Kirim Peringatan
                              </button>
                              <button className="flex items-center justify-center gap-3 py-5 bg-red-600 text-white rounded-[6px] font-black uppercase text-[10px] tracking-widest hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-red-200">
                                 <Ban size={18} /> Blokir Permanen
                              </button>
                           </div>
                        )}
                        <p className="text-[9px] text-gray-400 font-bold italic text-center">Tindakan ini akan tercatat dalam sistem audit global platform.</p>
                     </div>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default AdminUsers;





