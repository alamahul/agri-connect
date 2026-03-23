import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bell, 
  User, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck,
  Zap,
  Navigation,
  ArrowRight,
  TrendingDown,
  X,
  Plus,
  Info
} from 'lucide-react';

const HARVEST_DATA = [
  {
    id: 1,
    farmer: "Pak Budi",
    farm: "Kebun Berkah, Lembang",
    product: "Tomat Ceri Kualitas A",
    harvestDate: "25 Maret 2026",
    price: 15000,
    unit: "Kg",
    totalQuota: 50,
    currentOrder: 40,
    countdown: "12 Jam 30 Menit",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500",
    distance: "2.5 KM"
  },
  {
    id: 2,
    farmer: "Bu Yani",
    farm: "Sari Organik, Ciwidey",
    product: "Wortel Manis Brastagi",
    harvestDate: "26 Maret 2026",
    price: 12000,
    unit: "Kg",
    totalQuota: 80,
    currentOrder: 30,
    countdown: "24 Jam 15 Menit",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500",
    distance: "12 KM"
  },
  {
    id: 3,
    farmer: "Pak Asep",
    farm: "Hijau Daun, Pangalengan",
    product: "Selada Hidroponik Premium",
    harvestDate: "27 Maret 2026",
    price: 8000,
    unit: "Pack",
    totalQuota: 100,
    currentOrder: 85,
    countdown: "4 Jam 20 Menit",
    image: "https://images.unsplash.com/photo-1622205313162-be1d5756a43f?w=500",
    distance: "8 KM"
  },
  {
    id: 4,
    farmer: "Kang Dedi",
    farm: "Cisarua Hydroponics",
    product: "Bayam Jepang (Horenzo)",
    harvestDate: "26 Maret 2026",
    price: 18000,
    unit: "Kg",
    totalQuota: 40,
    currentOrder: 15,
    countdown: "18 Jam 45 Menit",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500",
    distance: "5 KM"
  }
];

const DATES = [
  { day: 'Sen', date: '23', full: '23 Maret 2026' },
  { day: 'Sel', date: '24', full: '24 Maret 2026' },
  { day: 'Rab', date: '25', full: '25 Maret 2026' },
  { day: 'Kam', date: '26', full: '26 Maret 2026' },
  { day: 'Jum', date: '27', full: '27 Maret 2026' },
  { day: 'Sab', date: '28', full: '28 Maret 2026' },
  { day: 'Min', date: '29', full: '29 Maret 2026' },
];

const CustomerPreOrder = () => {
  const [selectedDate, setSelectedDate] = useState('25 Maret 2026');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [paymentType, setPaymentType] = useState('Lunas');
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredData = HARVEST_DATA.filter(item => item.harvestDate === selectedDate);

  const handleBooking = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const confirmBooking = () => {
    setShowModal(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* 1. Header & Banner Edukasi */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Panen Besok (Pre-Order)</h1>
            <p className="text-gray-500 mt-1 italic">Strategi cerdas mencegah food loss & jaminan kesegaran maksimal.</p>
          </div>
          <div className="bg-amber-400 p-3 rounded-2xl shadow-lg shadow-amber-400/20 text-black">
            <Calendar size={24} />
          </div>
        </div>

        <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-2xl p-4 md:p-6 text-white relative overflow-hidden group shadow-xl">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="mt-1 p-2 bg-amber-400 rounded-xl text-black">
              <Zap size={20} className="fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-1">Inovasi Peduli Petani</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                "Bantu petani meminimalisir sayur terbuang. Pesan sekarang, dipanen besok, langsung dikirim ke dapur Anda tanpa mampir ke gudang tengkulak."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Kalender Interaktif (Horizontal Timeline) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Jadwal Panen Terdekat</h4>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1 cursor-pointer hover:underline">
            Lihat Kalender <ArrowRight size={12} />
          </span>
        </div>
        
        <div className="flex bg-white p-2 rounded-3xl border border-gray-100 shadow-sm gap-2 overflow-x-auto scrollbar-hide snap-x">
          {DATES.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDate(d.full)}
              className={`
                min-w-[80px] p-4 flex flex-col items-center gap-1 rounded-2xl transition-all duration-300 snap-center
                ${selectedDate === d.full 
                  ? 'bg-neutral-900 text-white shadow-xl shadow-neutral-200 scale-105' 
                  : 'text-gray-500 hover:bg-gray-50'}
              `}
            >
              <span className="text-[10px] font-bold uppercase opacity-60 tracking-tighter">{d.day}</span>
              <span className="text-xl font-black">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Kartu Produk "Panen Besok" */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden">
                <img src={item.image} alt={item.product} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-gray-900 text-xs font-extrabold px-3 py-2 rounded-xl flex items-center gap-2 shadow-xl border border-white/50 animate-pulse">
                  <Clock size={14} className="text-amber-600" />
                  ⏳ <span>Sisa Booking: {item.countdown}</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-neutral-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm text-white">
                    <Navigation size={12} className="text-amber-400" />
                    <span className="text-[10px] font-bold">{item.distance}</span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg uppercase tracking-widest tracking-tighter shadow-sm">{item.farmer}</span>
                    <MapPin size={10} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{item.farm}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-2xl uppercase leading-tight group-hover:text-amber-600 transition-colors">{item.product}</h3>
                  
                  {/* Progress Bar Kuota Panen */}
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kuota Panen</span>
                       <p className="text-xs font-bold text-gray-700">Telah dipesan <span className="text-amber-600 font-black">{item.currentOrder} {item.unit}</span> / Total {item.totalQuota} {item.unit}</p>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50 flex items-center px-0.5 shadow-inner">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-1000 ease-out shadow-lg" 
                        style={{ width: `${(item.currentOrder / item.totalQuota) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-right font-bold text-green-600 uppercase italic">Tersisa {(item.totalQuota - item.currentOrder)} {item.unit} lagi!</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Estimasi Harga</span>
                    <p className="font-black text-gray-900 text-2xl tracking-tighter">Rp {item.price.toLocaleString('id-ID')}<span className="text-sm font-medium text-gray-400"> / {item.unit}</span></p>
                  </div>
                  <button 
                    onClick={() => handleBooking(item)}
                    className="bg-neutral-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-neutral-200 transition-all active:scale-95 flex items-center gap-2"
                  >
                    Amankan Panen
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-32 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200 flex flex-col items-center animate-in zoom-in-95 duration-500">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                <Calendar size={32} className="text-gray-300" />
             </div>
             <p className="text-gray-400 font-bold text-lg">Tidak ada jadwal panen di tanggal ini.</p>
             <p className="text-gray-400 text-sm mt-1 mb-8">Coba pilih tanggal lain atau ajukan permintaan tanam ke petani kami.</p>
             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
               <Bell size={16} className="text-amber-500" />Ingatkan Saat Ada Panen
             </button>
          </div>
        )}
      </div>

      {/* 4. Request Tanam Section */}
      <section className="mt-12">
        <div className="bg-amber-50/50 rounded-[2.5rem] border-2 border-dashed border-amber-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-amber-400 transition-colors transition-all">
           <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 shadow-lg shadow-amber-200 group-hover:rotate-12 transition-transform">
                 <Plus size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase">Request Komoditas Impian</h3>
                <p className="text-sm text-gray-500 font-medium">Bantu petani tahu apa yang harus ditanam selanjutnya. Kami akan sampaikan permintaan Anda ke ribuan mitra petani.</p>
              </div>
           </div>
           <button className="whitespace-nowrap bg-white border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95">
             Ajukan Jadwal Tanam
           </button>
        </div>
      </section>

      {/* --- MODALS --- */}

      {/* Booking Confirmation Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl relative z-10 p-10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck size={180} />
             </div>

             <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Detail Booking Panen</h3>
                      <p className="text-sm text-gray-400 font-medium mt-1">Selesaikan pemesanan untuk jaminan stok produk paling segar.</p>
                   </div>
                   <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                     <X size={24} />
                   </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                   <div className="space-y-6">
                      <div className="bg-neutral-50 p-6 rounded-3xl border border-gray-100 flex gap-4">
                        <img src={selectedItem.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                        <div>
                          <span className="text-[10px] font-black text-amber-600 block mb-1 uppercase tracking-widest">{selectedItem.product}</span>
                          <span className="text-xs font-bold text-gray-400 flex items-center gap-1 uppercase"><User size={12} /> {selectedItem.farmer}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
                               <Calendar size={16} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Estimasi Panen</p>
                               <p className="text-sm font-black text-gray-900">{selectedItem.harvestDate}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                               <MapPin size={16} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Estimasi Tiba</p>
                               <p className="text-sm font-black text-gray-900">26 Maret 2026 (Sama Day Delivery)</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 block text-center">Pilih Metode Pembayaran</h4>
                      <div className="space-y-3">
                         <button 
                           onClick={() => setPaymentType('DP')}
                           className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${paymentType === 'DP' ? 'bg-amber-400 border-amber-400 text-black shadow-lg shadow-amber-200' : 'bg-white border-gray-100 text-gray-500'}`}
                         >
                            <span className="font-bold uppercase text-xs">Uang Muka (DP 30%)</span>
                            <span className="font-black text-sm">Rp {(selectedItem.price * 0.3).toLocaleString('id-ID')}</span>
                         </button>
                         <button 
                           onClick={() => setPaymentType('Lunas')}
                           className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${paymentType === 'Lunas' ? 'bg-amber-400 border-amber-400 text-black shadow-lg shadow-amber-200' : 'bg-white border-gray-100 text-gray-500'}`}
                         >
                            <span className="font-bold uppercase text-xs">Bayar Lunas</span>
                            <span className="font-black text-sm">Rp {selectedItem.price.toLocaleString('id-ID')}</span>
                         </button>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-200">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 leading-none italic">Evaluasi Risiko</p>
                         <div className="flex gap-2 items-start text-xs font-bold text-gray-500 leading-relaxed italic">
                            <TrendingDown size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                            Gagal panen krn faktor alam? Uang kembali 100%.
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-green-50/50 border border-green-100 p-5 rounded-2xl flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-xs text-green-800 leading-relaxed font-medium mt-1">
                    <span className="font-black">KEAMANAN ESCROW:</span> Dana Anda aman di sistem kami. Kami baru akan melepas dana ke <span className="font-bold">{selectedItem.farmer}</span> setelah sayur terbukti segar di tangan Anda.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={confirmBooking}
                    className="flex-[2] py-4 bg-neutral-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-neutral-200 transition-all active:scale-95"
                  >
                    Konfirmasi Booking & Bayar
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {isSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-20 duration-500">
           <div className="bg-neutral-900 text-white rounded-[2rem] p-6 shadow-2xl border border-white/10 flex items-center gap-6 pr-12">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/40">
                 <CheckCircle size={28} />
              </div>
              <div>
                 <h4 className="text-lg font-black uppercase tracking-tight leading-none mb-1">Berhasil Diamankan!</h4>
                 <p className="text-sm text-gray-400 font-medium leading-tight">Masa panen untuk <span className="text-amber-400 font-bold">{selectedItem?.product}</span> telah dikunci. Cek manajemen pesanan Anda.</p>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                 <Clock size={48} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPreOrder;
