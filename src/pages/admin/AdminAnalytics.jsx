import React from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Users, DollarSign } from 'lucide-react';
import { MONTHLY_REVENUE_CHART, USER_GROWTH_CHART, ADMIN_STATS } from '../../data/dummyAdmin';

const AdminAnalytics = () => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analisis & Laporan</h1>
        <p className="text-sm text-gray-500">Ekspor dan pantau data penjualan platform.</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
          <Download size={16} className="text-red-500" /> Ekspor PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-agri-700 hover:bg-agri-800 text-white rounded text-sm font-bold transition-all shadow-md">
          <Download size={16} /> Ekspor Excel
        </button>
      </div>
    </div>

    {/* KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {[
        { icon: <DollarSign size={22} className="text-agri-700"/>, label: "Total GMV Platform", value: `Rp ${(ADMIN_STATS.totalRevenue / 1000000).toFixed(1)} jt`, sub: "+23% dari bulan lalu", accent: "bg-agri-50" },
        { icon: <Users size={22} className="text-blue-600"/>, label: "Pengguna Aktif (MAU)", value: ADMIN_STATS.totalUsers.toLocaleString('id-ID'), sub: "+18% dari bulan lalu", accent: "bg-blue-50" },
        { icon: <TrendingUp size={22} className="text-amber-600"/>, label: "Total Transaksi", value: ADMIN_STATS.totalTransactions.toLocaleString('id-ID'), sub: "+31% dari bulan lalu", accent: "bg-amber-50" },
      ].map((k, i) => (
        <div key={i} className="bg-white rounded border border-gray-100 shadow-sm p-6">
          <div className={`inline-flex p-2.5 rounded ${k.accent} mb-4`}>{k.icon}</div>
          <p className="text-sm text-gray-500 font-medium">{k.label}</p>
          <p className="text-2xl font-black text-gray-900 mt-1">{k.value}</p>
          <p className="text-xs text-agri-600 font-bold mt-1">{k.sub}</p>
        </div>
      ))}
    </div>

    {/* Revenue over time */}
    <div className="bg-white p-6 rounded border border-gray-100 shadow-sm">
      <h3 className="text-base font-bold text-gray-900 mb-1">Total GMV per Bulan</h3>
      <p className="text-xs text-gray-400 mb-6">Gross Merchandise Value — transaksi yang difasilitasi platform</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MONTHLY_REVENUE_CHART}>
            <defs>
              <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#15803d" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#15803d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={v => `${(v / 1000000).toFixed(0)}jt`} />
            <Tooltip formatter={v => [`Rp ${v.toLocaleString('id-ID')}`, 'GMV']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="revenue" stroke="#15803d" strokeWidth={3} fillOpacity={1} fill="url(#revGrad2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* User growth bar chart */}
    <div className="bg-white p-6 rounded border border-gray-100 shadow-sm">
      <h3 className="text-base font-bold text-gray-900 mb-1">Pertumbuhan Pengguna Baru</h3>
      <p className="text-xs text-gray-400 mb-6">Petani & Pelanggan yang mendaftar per bulan</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={USER_GROWTH_CHART} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="pelanggan" fill="#15803d" radius={[4, 4, 0, 0]} name="Pelanggan" />
            <Bar dataKey="petani" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Petani" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-5 mt-3">
        <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-3 h-3 rounded bg-agri-700" /> Pelanggan</div>
        <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-3 h-3 rounded bg-amber-400" /> Petani</div>
      </div>
    </div>
  </div>
);

export default AdminAnalytics;
