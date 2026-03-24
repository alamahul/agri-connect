import { useNavigate } from 'react-router-dom';
import { recentOrders } from '../data/dummyData';
import { Eye, ArrowRight } from 'lucide-react';

const statusStyle = {
  Selesai: 'bg-emerald-100 text-emerald-700',
  Diproses: 'bg-amber-100 text-amber-700',
  Dikirim: 'bg-blue-100 text-blue-700',
  Dibatalkan: 'bg-red-100 text-red-600',
};

const DISPLAY_LIMIT = 2;

const RecentOrdersTable = () => {
  const navigate = useNavigate();
  const visibleOrders = recentOrders.slice(0, DISPLAY_LIMIT);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h3 className="font-semibold text-slate-800 text-sm">Pesanan Terbaru</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{recentOrders.length} total pesanan</p>
        </div>
        <button
          onClick={() => navigate('/pesanan')}
          className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors group"
        >
          Lihat Semua
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wide pb-2">ID</th>
              <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wide pb-2">Pelanggan</th>
              <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wide pb-2">Total</th>
              <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wide pb-2">Status</th>
              <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wide pb-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-3 font-mono text-[11px] text-slate-500">{order.id}</td>
                <td className="py-3">
                  <p className="font-medium text-slate-700">{order.customer}</p>
                  <p className="text-[10px] text-slate-400">{order.product}</p>
                </td>
                <td className="py-3 font-semibold text-slate-700">{order.total}</td>
                <td className="py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusStyle[order.status] || 'bg-slate-100 text-slate-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100">
                    <Eye size={12} />
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex-shrink-0">
        <button
          onClick={() => navigate('/pesanan')}
          className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition-colors border border-slate-100 hover:border-emerald-200"
        >
          Tampilkan {recentOrders.length - DISPLAY_LIMIT} pesanan lainnya
          <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
};

export default RecentOrdersTable;