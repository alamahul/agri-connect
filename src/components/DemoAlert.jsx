import React, { useState, useEffect } from 'react';
import { AlertTriangle, XCircle, CheckCircle2, Info } from 'lucide-react';

const DemoAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenDemo = localStorage.getItem('agriconnect_demo_seen');
    if (!hasSeenDemo) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('agriconnect_demo_seen', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#24231D]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in zoom-in-95 duration-500">
        {/* Top Warning Bar */}
        <div className="bg-[#EEC044] h-2 w-full"></div>

        <div className="p-8">
          <div className="w-16 h-16 bg-[#EEC044]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#EEC044]">
            <Info size={32} />
          </div>

          <h2 className="text-2xl font-black text-[#1F1E17] text-center mb-4 uppercase tracking-tighter">
            Informasi Penting
          </h2>

          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              Selamat datang di <span className="font-bold text-[#4BAF47]">AgriConnect</span>!
              Harap dicatat bahwa situs ini dikembangkan sebagai <span className="font-bold text-[#EEC044]">Versi Demonstrasi</span> untuk keperluan kompetisi.
            </p>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left">
              <ul className="space-y-2 text-[11px] text-gray-500 font-medium">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                  Semua transaksi bersifat simulasi/dummy.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                  Data produk dan harga adalah contoh visual.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                  Tidak ada pengiriman barang secara nyata.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                  Setiap informasi yang ada di website ini adalah informasi simulasi.
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full mt-8 bg-[#4BAF47] hover:bg-[#3E9440] text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#4BAF47]/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} />
            Saya Mengerti
          </button>
        </div>

        {/* Close Button UI (optional, better to force "I Understand") */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
        >
          <XCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default DemoAlert;
