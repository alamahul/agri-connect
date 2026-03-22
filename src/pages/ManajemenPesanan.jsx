import { useState } from 'react';
import {
  PackageSearch, Clock, CheckCircle2, XCircle, Truck,
  Search, ChevronDown
} from 'lucide-react';
import { recentOrders } from '../data/dummyData';

const stats = [
  { label: 'Total Pesanan', value: '185', icon: PackageSearch, color: 'bg-blue-600' },
  { label: 'Sedang Diproses', value: '42', icon: Clock, color: 'bg-amber-500' },
  { label: 'Selesai', value: '130', icon: CheckCircle2, color: 'bg-emerald-600' },
  { label: 'Dibatalkan', value: '13', icon: XCircle, color: 'bg-red-500' },
];

const statusConfig = {
  Selesai: { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  Diproses: { color: 'bg-amber-100 text-amber-700', icon: Clock },
  Dikirim: { color: 'bg-blue-100 text-blue-700', icon: Truck },
  Dibatalkan: { color: 'bg-red-100 text-red-700', icon: XCircle },
};

const tabs = ['Semua', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];

// Extend recentOrders with some extra data for the full table
const allOrders = [
  ...recentOrders,
  { id: 'INV-009', customer: 'CV Tani Sejahtera', product: 'Singkong', total: 'Rp 3.750.000', status: 'Diproses' },
  { id: 'INV-010', customer: 'Pak Hasan', product: 'Tomat Segar', total: 'Rp 960.000', status: 'Dikirim' },
  { id: 'INV-011', customer: 'Koperasi Makmur', product: 'Ubi Jalar', total: 'Rp 1.440.000', status: 'Selesai' },
  { id: 'INV-012', customer: 'UD Berkah Tani', product: 'Kangkung', total: 'Rp 280.000', status: 'Dibatalkan' },
];

const ManajemenPesanan = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = allOrders.filter((o) => {
    const matchTab = activeTab === 'Semua' || o.status === activeTab;
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-800">Manajemen Pesanan</h2>
        <p className="text-xs text-slate-500 mt-0.5">Pantau dan kelola seluruh pesanan masuk</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 ${s.color} rounded-[6px] flex items-center justify-center flex-shrink-0`}>
              <s.icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-[6px] w-fit overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-[6px] transition-all whitespace-nowrap ${activeTab === t ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative max-w-xs">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pesanan, pembeli..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[6px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">No. Pesanan</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pembeli</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Produk</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Harga</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-sm text-slate-400">
                    Tidak ada pesanan ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((o) => {
                  const cfg = statusConfig[o.status] || statusConfig.Selesai;
                  const StatusIcon = cfg.icon;
                  return (
                    <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[6px]">{o.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-semibold text-slate-800">{o.customer}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-slate-600">{o.product}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="text-xs font-semibold text-slate-800">{o.total}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-[6px] ${cfg.color}`}>
                          <StatusIcon size={10} />
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 border border-slate-200 rounded-[6px] text-slate-600 hover:bg-slate-50 transition-colors">
                          Detail
                          <ChevronDown size={10} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Menampilkan {filtered.length} dari {allOrders.length} pesanan</p>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 text-xs border border-slate-200 rounded-[6px] text-slate-500 hover:bg-slate-50 transition-colors">Sebelumnya</button>
            <button className="px-2.5 py-1 text-xs border border-blue-500 bg-blue-50 rounded-[6px] text-blue-700 font-semibold">1</button>
            <button className="px-2.5 py-1 text-xs border border-slate-200 rounded-[6px] text-slate-500 hover:bg-slate-50 transition-colors">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPesanan;