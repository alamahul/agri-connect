import { useState } from 'react';
import {
  Package, TrendingUp, AlertTriangle, Plus,
  Search, Eye, Edit2, Trash2
} from 'lucide-react';
import { inventoryProducts } from '../../data/dummyData';

const stats = [
  { label: 'Total Products', value: '48', icon: Package, color: 'bg-emerald-600' },
  { label: 'Used Capacity', value: '73%', icon: TrendingUp, color: 'bg-blue-600' },
  { label: 'Critical Stock', value: '2', icon: AlertTriangle, color: 'bg-red-500' },
];

const statusBadge = (status) => {
  if (status === 'In Stock') return 'bg-emerald-100 text-emerald-700';
  if (status === 'Low Stock') return 'bg-amber-100 text-amber-700';
  if (status === 'Kritis') return 'bg-red-100 text-red-700';
  return 'bg-slate-100 text-slate-600';
};

const tabs = ['All', 'In Stock', 'Low Stock', 'Kritis'];

const FarmerInventory = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = inventoryProducts.filter((p) => {
    const matchTab = activeTab === 'All' || p.status === activeTab;
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Product Warehouse</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage agricultural inventory and stocks</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-[6px] transition-colors">
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-[6px] w-fit">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-[6px] transition-all ${activeTab === t ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-[6px] text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Product ID</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Product Name</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Price / Unit</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-sm text-slate-400">
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-[6px]">{p.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-slate-800">{p.nama}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-500">{p.kategori}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-xs font-bold text-slate-800">{p.stok.toLocaleString('id-ID')}</p>
                      <p className="text-[10px] text-slate-400">{p.satuan}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-xs font-semibold text-slate-700">Rp {p.harga.toLocaleString('id-ID')}</p>
                      <p className="text-[10px] text-slate-400">/ {p.satuan}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-[6px] ${statusBadge(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-[6px] transition-colors">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-[6px] transition-colors">
                          <Edit2 size={13} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-[6px] transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing {filtered.length} out of {inventoryProducts.length} products</p>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 text-xs border border-slate-200 rounded-[6px] text-slate-500 hover:bg-slate-50 transition-colors">Previous</button>
            <button className="px-2.5 py-1 text-xs border border-emerald-500 bg-emerald-50 rounded-[6px] text-emerald-700 font-semibold">1</button>
            <button className="px-2.5 py-1 text-xs border border-slate-200 rounded-[6px] text-slate-500 hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerInventory;
