import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Handshake, 
  ShoppingBag, 
  Navigation, 
  Clock, 
  Calendar, 
  Plus, 
  BarChart2, 
  ArrowRight,
  ShieldCheck,
  X,
  Target
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { CUSTOMER_STATS, RECOMMENDED_PRODUCTS } from '../../data/dummyCustomer';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPreOrderSuccess, setShowPreOrderSuccess] = useState(false);

  // Mock data for line chart
  const priceTrendData = [
    { name: 'Sen', pasar: 45000, agriconnect: 32000 },
    { name: 'Sel', pasar: 48000, agriconnect: 32000 },
    { name: 'Rab', pasar: 52000, agriconnect: 33000 },
    { name: 'Kam', pasar: 50000, agriconnect: 32000 },
    { name: 'Jum', pasar: 55000, agriconnect: 34000 },
    { name: 'Sab', pasar: 58000, agriconnect: 33000 },
    { name: 'Min', pasar: 60000, agriconnect: 32000 },
  ];

  const handlePreOrder = () => {
    setShowPreOrderSuccess(true);
    setTimeout(() => setShowPreOrderSuccess(false), 5000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero & Gamification */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              Halo, {user?.fullName || CUSTOMER_STATS.name}! 👋
            </h1>
            <p className="text-gray-300 text-lg">Selamat datang kembali di ekosistem pangan lokal.</p>
            
            <button 
              onClick={() => setShowBadgeModal(true)}
              className="mt-6 flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 transition-all group active:scale-95"
            >
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-black shadow-lg shadow-amber-400/20">
                <Award size={20} className="fill-current" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Pahlawan Lokal</p>
                <p className="text-sm font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  Level 2 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </button>
          </div>
          
          {/* Decorative element */}
          <div className="hidden lg:block absolute top-0 right-10 translate-y-[-20%] opacity-20 pointer-events-none">
             <div className="w-64 h-64 bg-amber-400 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </section>

      {/* 2. Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Penghematan */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-xl text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
              <TrendingUp size={24} />
            </div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">Hemat 20%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Penghematan Anda</h3>
          <p className="text-2xl font-extrabold text-green-600 tracking-tight">Rp {CUSTOMER_STATS.savedAmount.toLocaleString('id-ID')}</p>
          <p className="text-[11px] text-gray-400 mt-2 font-medium">Berdasarkan selisih harga pasar hari ini.</p>
        </div>

        {/* Card 2: Petani Didukung */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
              <Handshake size={24} />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Petani yang Didukung</h3>
          <p className="text-2xl font-extrabold text-gray-900 tracking-tight">8 Petani</p>
          <p className="text-[11px] text-gray-400 mt-2 font-medium">Dampak sosial langsung bagi pahlawan lokal.</p>
        </div>

        {/* Card 3: Pesanan Aktif */}
        <button 
          onClick={() => window.location.href = '/pelanggan/orders'}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group text-left relative overflow-hidden active:scale-95"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <ShoppingBag size={24} />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Pesanan Aktif</h3>
          <div className="flex items-center gap-3">
            <p className="text-2xl font-extrabold text-gray-900 tracking-tight">2 Pesanan</p>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-[11px] text-blue-600 mt-2 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Lacak pengiriman <ArrowRight size={12} />
          </p>
        </button>
      </section>

      {/* 3. Panen Terdekat (Carousel) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Panen Terdekat dari Anda</h2>
            <p className="text-xs text-gray-500">Produk tersaji segar & ongkir hemat dari lokasi sekitar.</p>
          </div>
          <button className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
            Lihat Semua <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
          {RECOMMENDED_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[280px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group snap-start cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="h-44 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                  <Navigation size={12} className="text-amber-600" />
                  <span className="text-[11px] font-bold text-gray-900">{product.distance}</span>
                </div>
                {product.badge && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm uppercase">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-0.5">{product.farmer}</p>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-amber-600 transition-colors uppercase">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 line-through block">Rp {(product.price * 1.2).toLocaleString('id-ID')}</span>
                    <span className="text-lg font-extrabold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</span>
                    <span className="text-xs text-gray-500"> / {product.unit}</span>
                  </div>
                  <button className="w-10 h-10 bg-amber-400 hover:bg-amber-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-amber-400/20 active:scale-90 transition-all">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 4. Panen Besok (Pre-Order) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Panen Besok (Pre-Order)</h2>
              <p className="text-xs text-gray-500">Pesan sekarang sebelum dipetik untuk jaminan stok.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4 hover:border-amber-200 transition-colors group">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img 
                      src={i === 1 ? "https://images.unsplash.com/photo-1596040033229-a9821ebd05de?w=400" : "https://images.unsplash.com/photo-1557844352-761f2565b576?w=400"} 
                      alt="product" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                    />
                    <div className="absolute top-0 right-0 p-1 bg-amber-400 rounded-bl-lg">
                      <Calendar size={12} className="text-black" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase">Panen: 25 Maret</span>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                      <Clock size={12} /> 12 jam lagi
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{i === 1 ? "Brokoli Organik" : "Wortel Brastagi"}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-gray-900">Rp {i === 1 ? "18.500" : "12.000"}<span className="text-xs text-gray-400 font-normal">/ikat</span></span>
                    <button 
                      onClick={handlePreOrder}
                      className="text-xs font-bold text-white bg-neutral-800 hover:bg-black px-4 py-2 rounded-xl transition-all active:scale-95"
                    >
                      Booking Lahan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Grafik Penghematan */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Grafik Penghematan Hari Ini</h2>
              <p className="text-xs text-gray-500">Lihat perbandingan harga kami dengan pasar tradisional.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">Pasar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">AgriConnect</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                  labelStyle={{fontSize: '11px', fontWeight: 'bold', color: '#64748b', marginBottom: '4px'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="pasar" 
                  stroke="#ef4444" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="agriconnect" 
                  stroke="#22c55e" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#22c55e', strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* --- MODALS --- */}

      {/* Badge Progress Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowBadgeModal(false)}></div>
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
             <button onClick={() => setShowBadgeModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
              <X size={24} />
             </button>
             
             <div className="text-center">
               <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                 <Award size={48} className="text-amber-500 fill-amber-500/20" />
                 <div className="absolute -bottom-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">IVL 2</div>
               </div>
               
               <h2 className="text-2xl font-extrabold text-gray-900 mb-2 uppercase">Pahlawan Lokal</h2>
               <p className="text-gray-500 mb-8 px-4 leading-relaxed italic">"Kamu sudah membantu 5 petani lokal bulan ini! Kamu adalah bagian dari revolusi pangan lokal."</p>
               
               <div className="space-y-4 text-left">
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                   <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                     <span>Progres Level 3</span>
                     <span className="text-amber-600">60%</span>
                   </div>
                   <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-500 w-[60%] rounded-full shadow-sm"></div>
                   </div>
                   <p className="text-xs text-gray-500 mt-4 leading-relaxed font-medium">
                     Lakukan <span className="text-amber-600 font-bold">2 transaksi lagi</span> untuk naik ke Level 3 dan dapatkan voucher <span className="font-bold">Bebas Ongkir</span>.
                   </p>
                 </div>
               </div>
               
               <button 
                  onClick={() => setShowBadgeModal(false)}
                  className="w-full mt-8 bg-neutral-900 hover:bg-black text-white py-4 rounded-2xl font-bold shadow-xl shadow-neutral-900/20 active:scale-95 transition-all uppercase tracking-widest"
               >
                 Siap Lanjuutkan!
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="bg-white rounded-[2rem] w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded-lg">{selectedProduct.farmer}</span>
                    <h2 className="text-2xl font-extrabold text-gray-900 mt-2 uppercase">{selectedProduct.name}</h2>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Analisis Harga</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                        <p className="text-[10px] font-bold text-red-400 uppercase mb-1">Harga Pasar</p>
                        <p className="text-lg font-bold text-red-600 line-through">Rp {(selectedProduct.price * 1.3).toLocaleString('id-ID')}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-100 ring-2 ring-green-400 ring-offset-2">
                        <p className="text-[10px] font-bold text-green-500 uppercase mb-1">Harga AgriConnect</p>
                        <p className="text-lg font-bold text-green-600">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-2xl">
                     <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                       <ShieldCheck className="text-green-500" size={20} />
                       Dana Aman di Sistem Escrow
                     </div>
                  </div>

                  <button className="w-full bg-neutral-900 hover:bg-black text-white py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95 uppercase tracking-widest">
                    Masukkan Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification for Pre-Order */}
      {showPreOrderSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-neutral-800 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
               <Target size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">Pesanan Pre-Order berhasil!</p>
              <p className="text-[11px] text-gray-400">Dana ditahan di Escrow sampai panen tiba.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
