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
  EyeOff
} from 'lucide-react';

const FarmerSettings = () => {
  const [activeTab, setActiveTab] = useState('Profil');
  const [showPinModal, setShowPinModal] = useState(false);
  const [fontSize, setFontSize] = useState(1); // 0: Normal, 1: Besar, 2: Sangat Besar
  const [isLahanOpen, setIsLahanOpen] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(false);

  const menuItems = [
    { id: 'Profil', label: 'Profil & Lokasi Lahan', icon: User, color: 'text-emerald-500 bg-emerald-50' },
    { id: 'Rekening', label: 'Rekening & Pencairan', icon: Wallet, color: 'text-amber-500 bg-amber-50' },
    { id: 'Operasional', label: 'Status Operasional', icon: LandPlot, color: 'text-blue-500 bg-blue-50' },
    { id: 'Notifikasi', label: 'Notifikasi & Suara', icon: Bell, color: 'text-indigo-500 bg-indigo-50' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10 pb-32 animate-in fade-in duration-500">
      
      {/* 1. Struktur Layout (Menu Vertikal Sederhana) */}
      <aside className="lg:w-80 flex flex-col gap-2">
         <div className="px-6 mb-4">
            <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Pengaturan</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Kelola Akun & Lahan</p>
         </div>
         {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between p-5 rounded-[6px] transition-all duration-300 group ${activeTab === item.id ? 'bg-neutral-900 text-white shadow-xl translate-x-2' : 'bg-white hover:bg-gray-50 text-gray-500 border border-gray-100'}`}
            >
               <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-[6px] transition-colors ${activeTab === item.id ? 'bg-white/10' : item.color}`}>
                     <item.icon size={24} />
                  </div>
                  <span className="text-sm font-black uppercase tracking-tight">{item.label}</span>
               </div>
               <ChevronRight size={20} className={`transition-transform ${activeTab === item.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
            </button>
         ))}

         <div className="mt-10 p-6 bg-red-50 rounded-[6px] border border-red-100 flex items-center justify-between group cursor-pointer hover:bg-red-100 transition-colors">
            <div className="flex items-center gap-4 text-red-600">
               <LogOut size={24} />
               <span className="text-sm font-black uppercase tracking-tight">Keluar Akun</span>
            </div>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-right-10 duration-500">
         
         {/* TAB: PROFIL PETANI & LOKASI LAHAN */}
         {activeTab === 'Profil' && (
           <div className="p-10 space-y-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="relative group">
                    <div className="w-32 h-32 bg-gray-100 rounded-[6px] overflow-hidden border-4 border-white shadow-xl relative">
                       <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=400" className="w-full h-full object-cover" alt="" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-white rounded-[6px] flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                       <Camera size={18} />
                    </button>
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Profil & Foto Lahan</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">Unggah foto lahan Anda untuk membangun kepercayaan bagi pelanggan yang ingin berkunjung.</p>
                    <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                       Tambah Foto Lahan <ChevronRight size={14} />
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Nama Lengkap Petani</label>
                    <input defaultValue="Pak Budi Santoso" className="w-full bg-gray-50 border border-gray-100 p-5 rounded-[6px] font-bold text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Nomor WhatsApp (Krusial)</label>
                    <div className="relative">
                       <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <input defaultValue="+62 812 3456 7890" className="w-full bg-gray-50 border border-gray-100 pl-14 pr-5 py-5 rounded-[6px] font-bold text-sm focus:ring-2 focus:ring-emerald-400 outline-none transition-all" />
                    </div>
                 </div>
              </div>

              {/* Integrasi Peta Lahan */}
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Titik Jemput Kurir (GPS)</label>
                 <div className="aspect-[21/9] bg-gray-100 rounded-[6px] border-4 border-white shadow-xl relative overflow-hidden flex items-center justify-center group">
                    <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?w=800" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="" />
                    <div className="absolute inset-0 bg-neutral-900/10 flex items-center justify-center">
                       <div className="bg-white p-4 rounded-[6px] shadow-2xl flex items-center gap-4 border border-emerald-100 animate-bounce">
                          <MapPin size={32} className="text-red-500 fill-red-100" />
                          <div>
                             <p className="text-[10px] font-black text-neutral-900 uppercase">Titik Terkunci</p>
                             <p className="text-[9px] text-gray-400 font-bold">-7.123, 107.456</p>
                          </div>
                       </div>
                    </div>
                    {/* Inovasi UI: Tombol Lokasi Saat Ini */}
                    <button className="absolute bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-[6px] font-black uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-2xl active:scale-95 transition-all">
                       <Navigation size={16} /> Gunakan Lokasi Saya Sekarang
                    </button>
                 </div>
                 <p className="text-[10px] text-gray-400 font-bold italic px-2">Sistem akan otomatis mengunci koordinat sebagai titik jemput kurir dan fitur "Panen Terdekat".</p>
              </div>

              <button className="w-full bg-neutral-900 text-white py-6 rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl shadow-neutral-200 active:scale-95 transition-all flex items-center justify-center gap-3">
                 <Save size={18} /> Simpan Perubahan Profil
              </button>
           </div>
         )}

         {/* TAB: REKENING & PENARIKAN DANA */}
         {activeTab === 'Rekening' && (
            <div className="p-10 space-y-10 animate-in slide-in-from-right-10">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-lg shadow-amber-200">
                     <Wallet size={32} />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter">Pencairan Dana</h3>
                     <p className="text-sm text-gray-500 font-medium">Dana dari Brankas Escrow akan dikirim ke sini.</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Pilih Bank / e-Wallet</label>
                     <select className="w-full bg-gray-50 border border-gray-100 p-5 rounded-[6px] font-bold text-sm focus:ring-2 focus:ring-amber-400 outline-none transition-all appearance-none">
                        <option>Pilih Rekening...</option>
                        <option>Bank Rakyat Indonesia (BRI)</option>
                        <option>Bank Jabar Banten (bjb) - Bank Daerah</option>
                        <option>Bank Mandiri</option>
                        <option>DANA (e-Wallet)</option>
                        <option>OVO (e-Wallet)</option>
                     </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Nomor Rekening</label>
                        <input placeholder="Masukkan nomor..." className="w-full bg-gray-50 border border-gray-100 p-5 rounded-[6px] font-bold text-sm focus:ring-2 focus:ring-amber-400 outline-none transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Nama Pemilik Rekening</label>
                        <input placeholder="Sesuai KTP..." className="w-full bg-gray-50 border border-gray-100 p-5 rounded-[6px] font-bold text-sm focus:ring-2 focus:ring-amber-400 outline-none transition-all" />
                     </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold italic px-2">
                     <ShieldCheck size={12} className="inline mr-1 text-emerald-500" />
                     Edukasi Escrow: Pastikan nama rekening sesuai KTP. Hasil penjualan akan otomatis diproses setiap periode atau ditarik manual.
                  </p>
               </div>

               <button 
                 onClick={() => setShowPinModal(true)}
                 className="w-full bg-amber-400 text-neutral-900 py-6 rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl shadow-amber-200 active:scale-95 transition-all flex items-center justify-center gap-3"
               >
                  <Lock size={18} /> Verifikasi & Simpan Rekening
               </button>
            </div>
         )}

         {/* TAB: PENGATURAN OPERASIONAL LAHAN */}
         {activeTab === 'Operasional' && (
            <div className="p-10 space-y-10 animate-in slide-in-from-right-10">
               <div className="bg-blue-50 p-8 rounded-[6px] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6 group">
                  <div className="flex items-center gap-6">
                     <div className={`w-16 h-16 rounded-[6px] flex items-center justify-center transition-all duration-500 shadow-lg ${isLahanOpen ? 'bg-emerald-500 text-white group-hover:rotate-12' : 'bg-red-500 text-white'}`}>
                        {isLahanOpen ? <CheckCircle2 size={32} /> : <PauseCircle size={32} />}
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-neutral-900 uppercase tracking-tighter">Status Lahan Anda</h4>
                        <p className="text-sm text-blue-700 font-medium">Gunakan mode tutup jika terjadi gagal panen atau libur.</p>
                     </div>
                  </div>
                  <div className="flex gap-2 bg-white p-1.5 rounded-[6px] shadow-sm">
                     <button 
                       onClick={() => setIsLahanOpen(true)}
                       className={`px-6 py-3 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${isLahanOpen ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-500'}`}
                     >
                        BUKA / AKTIF
                     </button>
                     <button 
                       onClick={() => setIsLahanOpen(false)}
                       className={`px-6 py-3 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${!isLahanOpen ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-red-500'}`}
                     >
                        TUTUP / LIBUR
                     </button>
                  </div>
               </div>

               <div className="space-y-8">
                  <h4 className="text-sm font-black text-neutral-900 uppercase tracking-widest pl-2">Pengaturan Konfirmasi Pesanan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <button 
                       onClick={() => setAutoConfirm(true)}
                       className={`p-8 rounded-[6px] border-2 text-left transition-all ${autoConfirm ? 'border-emerald-500 bg-emerald-50 shadow-xl' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                     >
                        <div className="flex justify-between items-start mb-4">
                           <Zap size={24} className={autoConfirm ? 'text-emerald-500' : 'text-gray-300'} />
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${autoConfirm ? 'border-emerald-500' : 'border-gray-200'}`}>
                              {autoConfirm && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                           </div>
                        </div>
                        <p className="text-xs font-black text-neutral-900 uppercase">Terima Otomatis</p>
                        <p className="text-[10px] text-gray-500 font-medium mt-1">Pesanan langsung masuk ke daftar kemas.</p>
                     </button>

                     <button 
                       onClick={() => setAutoConfirm(false)}
                       className={`p-8 rounded-[6px] border-2 text-left transition-all ${!autoConfirm ? 'border-blue-500 bg-blue-50 shadow-xl' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                     >
                        <div className="flex justify-between items-start mb-4">
                           <Smartphone size={24} className={!autoConfirm ? 'text-blue-500' : 'text-gray-300'} />
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${!autoConfirm ? 'border-blue-500' : 'border-gray-200'}`}>
                              {!autoConfirm && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                           </div>
                        </div>
                        <p className="text-xs font-black text-neutral-900 uppercase">Konfirmasi Manual</p>
                        <p className="text-[10px] text-gray-500 font-medium mt-1">Anda harus menekan 'Terima' setiap pesanan.</p>
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* TAB: NOTIFIKASI & AKSESIBILITAS */}
         {activeTab === 'Notifikasi' && (
            <div className="p-10 space-y-12 animate-in slide-in-from-right-10">
               {/* Integrasi WhatsApp Bot */}
               <div className="flex items-center justify-between p-8 bg-emerald-50 rounded-[6px] border border-emerald-100 group">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-white text-emerald-500 rounded-[6px] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                        <PhoneIcon size={32} />
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-neutral-900 uppercase tracking-tighter">Notifikasi WhatsApp</h4>
                        <p className="text-sm text-emerald-700 font-medium">Kirim pesanan baru langsung ke Chat WA Anda.</p>
                     </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer" defaultChecked />
                     <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
               </div>

               {/* Ukuran Teks */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3 pl-2">
                     <Type size={20} className="text-indigo-500" />
                     <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest text">Ukuran Teks Aplikasi</h4>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-[6px] space-y-8">
                     <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                        <span>Normal</span>
                        <span>Besar</span>
                        <span>Sangat Besar</span>
                     </div>
                     <input 
                       type="range" min="0" max="2" step="1" 
                       value={fontSize}
                       onChange={(e) => setFontSize(parseInt(e.target.value))}
                       className="w-full h-3 bg-gray-200 rounded-[6px] appearance-none cursor-pointer accent-indigo-500" 
                     />
                     <div className="bg-white p-6 rounded-[6px] border border-gray-100 text-center shadow-inner">
                        <p className={`font-bold transition-all ${fontSize === 0 ? 'text-sm' : fontSize === 1 ? 'text-lg' : 'text-2xl'}`}>
                           Contoh Teks: Selamat Pagi, Pak Budi!
                        </p>
                     </div>
                  </div>
               </div>

               {/* AgriVoice TTS */}
               <div className="flex items-center justify-between p-8 border-2 border-dashed border-gray-100 rounded-[6px] group hover:border-indigo-400 transition-colors">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-[6px] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Volume2 size={32} />
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-neutral-900 uppercase tracking-tighter">AgriVoice (Asisten Suara)</h4>
                        <p className="text-sm text-gray-500 font-medium">Membacakan pesan jika layar ditekan lama.</p>
                     </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" className="sr-only peer" />
                     <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
                  </label>
               </div>
            </div>
         )}
      </main>

      {/* --- PIN VERIFICATION MODAL --- */}
      {showPinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowPinModal(false)}></div>
           <div className="bg-white rounded-[6px] w-full max-w-sm relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 p-10 text-center">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-[6px] flex items-center justify-center mx-auto mb-6">
                 <Lock size={40} />
              </div>
              <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-2">Verifikasi Keamanan</h2>
              <p className="text-sm text-gray-400 font-medium mb-10 leading-relaxed">Masukkan 6-digit PIN Anda untuk mengubah nomor rekening.</p>
              
              <div className="flex justify-center gap-2 mb-10">
                 {[1,2,3,4,5,6].map(i => (
                   <input key={i} type="password" maxLength={1} className="w-10 h-14 bg-gray-100 border-2 border-transparent focus:border-amber-400 outline-none rounded-[6px] text-center font-black text-xl" />
                 ))}
              </div>

              <div className="space-y-3">
                 <button 
                   onClick={() => setShowPinModal(false)}
                   className="w-full py-5 bg-neutral-900 text-white rounded-[6px] font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95"
                 >
                    Konfirmasi Perubahan
                 </button>
                 <button 
                    onClick={() => setShowPinModal(false)}
                    className="w-full py-2 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-neutral-900 transition-all uppercase"
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





