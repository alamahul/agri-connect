import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  BadgeCheck,
  Star,
  Camera,
  X,
  AlertCircle,
  TrendingDown,
  Navigation,
  Calendar,
  CreditCard,
  Ban,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { CUSTOMER_ORDERS } from '../../data/dummyCustomer';

const statusConfig = {
  "Belum Bayar": { color: "bg-amber-100 text-amber-700", icon: <CreditCard size={14} />, btn: "Bayar Sekarang" },
  "Diproses Petani": { color: "bg-blue-100 text-blue-700", icon: <Clock size={14} />, btn: "Lihat Detail" },
  "Dalam Perjalanan": { color: "bg-indigo-100 text-indigo-700", icon: <Truck size={14} />, btn: "Lacak Pengiriman" },
  "Selesai": { color: "bg-green-100 text-green-700", icon: <CheckCircle size={14} />, btn: "Beri Ulasan" },
  "Dibatalkan": { color: "bg-red-100 text-red-700", icon: <Ban size={14} />, btn: "Beli Lagi" },
};

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const tabs = ['Semua', 'Belum Bayar', 'Diproses Petani', 'Dalam Perjalanan', 'Selesai', 'Dibatalkan'];

  const filteredOrders = activeTab === 'Semua'
    ? CUSTOMER_ORDERS
    : CUSTOMER_ORDERS.filter(o => o.status === activeTab);

  const handleConfirmOrder = () => {
    setShowConfirmModal(false);
    setShowSuccessState(true);
    setTimeout(() => {
      setShowSuccessState(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Pesananku</h1>
        <p className="text-gray-500 mt-1">Kelola transaksi dan pantau kualitas hasil panen segar Anda.</p>
      </div>

      {/* Tabs Filter */}
      <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto scrollbar-hide sticky top-0 z-20">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              whitespace-nowrap px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2
              ${activeTab === tab
                ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-200 scale-[1.02]'
                : 'text-gray-500 hover:text-neutral-800 hover:bg-gray-50'}
            `}
          >
            {tab}
            {activeTab === tab && (
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[6px] border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Package size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-bold text-lg">Belum ada pesanan nih..</p>
            <p className="text-gray-400 text-sm mt-1">Yuk, mulai belanja sayur segar langsung dari petani!</p>
          </div>
        ) : filteredOrders.map(order => (
          <div key={order.orderId} className="group bg-white rounded-[6px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            {/* Header Card */}
            <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white border border-gray-100 px-2 py-1 rounded-lg">
                  {order.orderId}
                </div>
                <span className="text-xs font-bold text-gray-400">{order.date}</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${statusConfig[order.status].color}`}>
                {statusConfig[order.status].icon}
                {order.status}
              </div>
            </div>

            {/* Content Card */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Thumbnail & Product Info */}
                <div className="flex gap-4 flex-1">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 relative group-hover:scale-105 transition-transform">
                    <img src={order.items[0].image} alt={order.items[0].name} className="w-full h-full object-cover" />
                    {order.isPreOrder && (
                      <div className="absolute top-1 right-1 bg-amber-400 p-1 rounded-lg shadow-sm">
                        <Calendar size={10} className="text-black" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 group/farmer">
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{order.farmer}</span>
                        {order.verified && <BadgeCheck size={14} className="text-blue-500 fill-blue-50 group-hover:scale-110 transition-transform" title="Verified Farmer" />}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">{order.items[0].name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{order.items[0].qty} {order.items[0].unit} {order.items.length > 1 && `+${order.items.length - 1} item lainnya`}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Harga</p>
                        <p className="text-lg font-black text-gray-900">Rp {order.totalAmount.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="h-8 w-px bg-gray-100"></div>
                      <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                        <ShieldCheck size={14} className="text-green-600" />
                        <span className="text-[10px] font-bold text-green-700 uppercase tracking-tighter">Dana Aman Escrow</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pre-Order Specific */}
                {order.isPreOrder && order.status === 'Diproses Petani' && (
                  <div className="flex flex-col justify-center bg-amber-50/50 p-4 rounded-2xl border border-amber-100 md:max-w-xs w-full">
                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                      <TrendingDown size={14} className="rotate-[-60deg]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{order.preOrderBadge}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-700 leading-tight">Estimasi Panen: <span className="text-amber-600">{order.harvestEstimation}</span></p>
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 bg-amber-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-1/2"></div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700">48 Jam Lagi</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      if (order.status === 'Dalam Perjalanan') setShowTrackingModal(true);
                      else if (order.status === 'Selesai') setShowReviewModal(true);
                      else if (order.status === 'Diproses Petani') setShowTrackingModal(true); // Reused for preview
                    }}
                    className="px-6 py-3 bg-neutral-900 hover:bg-black text-white rounded-xl font-bold text-sm shadow-xl shadow-neutral-200 transition-all active:scale-95 whitespace-nowrap"
                  >
                    {statusConfig[order.status].btn}
                  </button>
                  {order.status === 'Dalam Perjalanan' && (
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowConfirmModal(true);
                      }}
                      className="px-6 py-3 bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-xl font-bold text-sm transition-all active:scale-95"
                    >
                      Terima Pesanan
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODALS --- */}

      {/* 1. Tracking Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md" onClick={() => setShowTrackingModal(false)}></div>
          <div className="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[95vh] custom-scrollbar">
            <button onClick={() => setShowTrackingModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-transform hover:rotate-90">
              <X size={24} />
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                  <Navigation size={20} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 uppercase">Pelacakan Pesanan</h2>
              </div>
              <p className="text-sm text-gray-400 font-medium">Nomor Invoice: <span className="text-neutral-900 font-bold">{selectedOrder.orderId}</span></p>
            </div>

            {/* Timeline */}
            <div className="space-y-6 ml-4">
              {(selectedOrder.tracking || []).map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Line */}
                  {idx < selectedOrder.tracking.length - 1 && (
                    <div className={`absolute top-8 left-[-11px] w-0.5 h-16 ${step.done ? 'bg-indigo-500' : 'bg-gray-100'}`}></div>
                  )}

                  <div className="flex gap-6 items-start">
                    <div className={`w-6 h-6 rounded-full border-4 flex-shrink-0 z-10 transition-colors duration-500 scale-110 ${step.done ? 'bg-indigo-500 border-indigo-100 ring-4 ring-indigo-50' : 'bg-white border-gray-200'}`}>
                      {step.done && <CheckCircle size={10} className="text-white m-auto translate-y-[-1px]" />}
                    </div>
                    <div className={`pb-2 transition-opacity duration-300 ${step.done ? 'opacity-100' : 'opacity-40'}`}>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-wide">{step.note}</p>
                      <p className="text-[11px] text-gray-400 font-bold mt-0.5">{step.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Escrow Banner */}
            {selectedOrder.status === 'Dalam Perjalanan' && (
              <div className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck size={100} className="text-green-600" />
                </div>
                <div className="flex gap-4 items-start relative z-10">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-900 leading-tight">Momen Sayur Berarti Bagi Kami!</p>
                    <p className="text-xs text-green-700 mt-2 leading-relaxed">
                      Dana Anda sebesar <span className="font-black">Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</span> sedang kami tahan dan baru akan dikirimkan ke <span className="font-bold">{selectedOrder.farmer}</span> setelah Anda mengonfirmasi sayur diterima dalam kondisi segar.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowTrackingModal(false)}
              className="w-full mt-10 bg-neutral-900 hover:bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-neutral-200 transition-all active:scale-95"
            >
              Terima Kasih!
            </button>
          </div>
        </div>
      )}

      {/* 2. Confirmation Modal (Escrow Release) */}
      {showConfirmModal && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}></div>
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-y-auto max-h-[95vh] custom-scrollbar">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50">
                <ShieldCheck size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase">Konfirmasi Sayur Segar</h2>
              <div className="bg-gray-50 p-5 rounded-2xl text-left border border-gray-100 mb-8">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Dengan menekan tombol di bawah, sistem <span className="text-neutral-900 font-bold">AgriConnect</span> akan mencairkan dana ke rekening <span className="font-black text-neutral-900">{selectedOrder.farmer}</span>.
                </p>
                <p className="text-xs font-bold text-gray-900 mt-4 flex items-center gap-2">
                  <AlertCircle size={14} className="text-amber-500" />
                  Apakah kualitas hasil panen sudah sesuai?
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-200 transition-all active:scale-95"
                >
                  Ya, Cairkan Dana
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 bg-white border border-gray-200 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50"
                  >
                    Nanti Dulu
                  </button>
                  <button className="flex-1 bg-white border border-red-100 text-red-500 py-3 rounded-2xl text-sm font-bold hover:bg-red-50">
                    Komplain/Retur
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Review Modal */}
      {showReviewModal && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md" onClick={() => setShowReviewModal(false)}></div>
          <div className="bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-lg relative z-10 shadow-2xl animate-in slide-in-from-bottom-10 duration-500 overflow-y-auto max-h-[95vh] custom-scrollbar">
            <button onClick={() => setShowReviewModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-amber-500 fill-amber-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 uppercase">Beri Ulasan Panen</h2>
              <p className="text-sm text-gray-400 font-medium italic mt-1">Ulasan Anda membantu {selectedOrder.farmer} semakin berkembang.</p>
            </div>

            <div className="space-y-6">
              {/* Product Preview */}
              <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <img src={selectedOrder.items[0].image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                <span className="font-bold text-gray-900 uppercase text-xs tracking-wide">{selectedOrder.items[0].name}</span>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={40}
                      className={`
                            transition-colors duration-200
                            ${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-100'}
                          `}
                    />
                  </button>
                ))}
              </div>

              {/* Comment Area */}
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2 px-1">Tulis Kesan Anda</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all outline-none"
                  placeholder="Sayurnya segar sekali! Pengirimannya juga cepat..."
                  rows="4"
                ></textarea>
              </div>

              {/* Photo Upload */}
              <button className="w-full flex items-center justify-center gap-3 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/30 transition-all">
                <Camera size={20} />
                Unggah Foto Sayur
              </button>

              <button
                onClick={() => setShowReviewModal(false)}
                className="w-full bg-neutral-900 hover:bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-neutral-200 transition-all active:scale-95"
              >
                Kirim Ulasan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Success State (Coin Cascade / Big Check) */}
      {showSuccessState && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm animate-in fade-in duration-500"></div>

          <div className="relative flex flex-col items-center animate-in zoom-in slide-in-from-bottom-20 duration-700 delay-200">
            {/* Animasi Koin (Lucide coins floating?) - We'll use multiple Star/Wallet icons or just a big Success circle */}
            <div className="relative">
              <div className="w-40 h-40 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.4)] relative z-10">
                <CheckCircle size={80} className="text-white animate-in zoom-in duration-500 delay-700" />
              </div>

              {/* Floating "Coins" / Elements */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce"
                  style={{
                    top: `${Math.random() * 100 - 50}%`,
                    left: `${Math.random() * 200 - 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '2s'
                  }}
                >
                  <Star size={14} className="fill-current" />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center relative z-10">
              <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter mb-2">Transaksi Selesai!</h2>
              <p className="text-lg font-bold text-green-600 bg-green-50 px-4 py-1 rounded-full border border-green-100 italic">
                "Terima kasih telah menyejahterakan petani lokal hari ini."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
