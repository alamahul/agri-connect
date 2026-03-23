import React, { useState } from 'react';
import { Package, AlertTriangle, CheckCircle, Search, ShieldOff, ShieldCheck } from 'lucide-react';
import { ADMIN_RECENT_TRANSACTIONS } from '../../data/dummyAdmin';

const AdminProducts = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');

  const filtered = ADMIN_RECENT_TRANSACTIONS.filter(t => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()) || t.farmer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Semua' || t.status === filter;
    return matchSearch && matchFilter;
  });

  const statusConfig = {
    "Selesai": { cls: "bg-agri-100 text-agri-700", icon: <CheckCircle size={12} /> },
    "Dalam Perjalanan": { cls: "bg-blue-100 text-blue-700", icon: <Package size={12} /> },
    "Sengketa": { cls: "bg-red-100 text-red-700", icon: <AlertTriangle size={12} /> },
    "Diproses": { cls: "bg-amber-100 text-amber-700", icon: null },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Produk & Pesanan</h1>
        <p className="text-sm text-gray-500">Pantau arus pesanan dan mediasi sengketa Escrow.</p>
      </div>

      {/* Alert: Sengketa aktif */}
      <div className="bg-red-50 border border-red-200 rounded p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-red-800">1 Sengketa Escrow Membutuhkan Mediasi</p>
          <p className="text-xs text-red-700 mt-0.5">ORD-9919 antara Rina Hapsari dan Pak Hendra. Dana Escrow Rp 135.000 sedang ditahan.</p>
          <button className="mt-2 text-xs font-bold text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded transition-all">Tangani Sengketa</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Cari Order ID, pelanggan, atau petani..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded focus:ring-2 focus:ring-agri-500 outline-none text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Semua', 'Diproses', 'Dalam Perjalanan', 'Selesai', 'Sengketa'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded text-xs font-semibold transition-all ${filter === f ? 'bg-slate-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded border border-gray-100 shadow-sm overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Pelanggan</th>
                <th className="px-6 py-4 font-semibold">Petani</th>
                <th className="px-6 py-4 font-semibold">Tanggal</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Total</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((tx, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{tx.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tx.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tx.farmer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`flex w-fit items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold ${statusConfig[tx.status]?.cls}`}>
                      {statusConfig[tx.status]?.icon} {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">Rp {tx.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-right">
                    {tx.status === 'Sengketa' ? (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded transition-all ml-auto">
                        <ShieldOff size={12} /> Mediasi
                      </button>
                    ) : (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded transition-all ml-auto">
                        Detail
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {filtered.map((tx, i) => (
            <div key={i} className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-gray-900">{tx.id}</span>
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${statusConfig[tx.status]?.cls}`}>
                  {statusConfig[tx.status]?.icon} {tx.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">{tx.customer} ⟶ {tx.farmer}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{tx.date}</span>
                <span className="font-bold text-sm">Rp {tx.amount.toLocaleString('id-ID')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
