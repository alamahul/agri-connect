import { useState } from 'react';
import {
  DollarSign, ShoppingCart,
  TrendingUp, Award, ChevronUp, ChevronDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { salesByProduct, revenueMonthly } from '../../data/dummyData';

const summaryStats = [
  {
    label: 'Total Revenue',
    value: 'Rp 52.3 M',
    sub: 'May 2026',
    trend: '+14.2%',
    up: true,
    icon: DollarSign,
    color: 'amber',
  },
  {
    label: 'Best Seller',
    value: 'Padi IR64',
    sub: '5,200 kg sold',
    trend: '+8.5%',
    up: true,
    icon: Award,
    color: 'emerald',
  },
  {
    label: 'Order Conversion',
    value: '78%',
    sub: 'from total leads',
    trend: '+3.1%',
    up: true,
    icon: ShoppingCart,
    color: 'blue',
  },
  {
    label: 'Total Products Sold',
    value: '10,220 kg',
    sub: 'May 2026',
    trend: '-2.3%',
    up: false,
    icon: TrendingUp,
    color: 'violet',
  },
];

const colorMap = {
  amber: { bg: 'bg-amber-500', light: 'bg-amber-100', text: 'text-amber-700' },
  emerald: { bg: 'bg-emerald-600', light: 'bg-emerald-100', text: 'text-emerald-700' },
  blue: { bg: 'bg-blue-600', light: 'bg-blue-100', text: 'text-blue-700' },
  violet: { bg: 'bg-violet-600', light: 'bg-violet-100', text: 'text-violet-700' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-[6px] shadow-lg px-3 py-2 text-xs">
        <p className="font-semibold text-slate-700">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="mt-0.5 font-bold">
            {p.name === 'pendapatan'
              ? `Rp ${(p.value / 1000000).toFixed(1)} M`
              : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const productColors = ['bg-emerald-500', 'bg-blue-500', 'bg-red-400', 'bg-amber-400', 'bg-violet-500'];

const FarmerAnalytics = () => {
  const [chartMode, setChartMode] = useState('revenue');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-800">Sales Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">Deep insights report on your product sales performance</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryStats.map((s) => {
          const c = colorMap[s.color];
          return (
            <div key={s.label} className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-slate-500 leading-snug">{s.label}</p>
                <div className={`w-8 h-8 ${c.bg} rounded-[6px] flex items-center justify-center flex-shrink-0`}>
                  <s.icon size={14} className="text-white" />
                </div>
              </div>
              <p className="text-lg font-bold text-slate-800 leading-none truncate">{s.value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{s.sub}</p>
              <div className={`mt-2 flex items-center gap-1 text-[11px] font-semibold ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {s.up ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {s.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-4 lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Monthly Trends</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Revenue & order count per month</p>
            </div>
            <div className="flex gap-1 bg-slate-100 p-0.5 rounded-[6px]">
              <button
                onClick={() => setChartMode('revenue')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-[6px] transition-all ${chartMode === 'revenue' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Revenue
              </button>
              <button
                onClick={() => setChartMode('orders')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-[6px] transition-all ${chartMode === 'orders' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Orders
              </button>
            </div>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === 'revenue' ? (
                <BarChart data={revenueMonthly} barSize={28} margin={{ top: 2, right: 2, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f0fdf4' }} />
                  <Bar dataKey="pendapatan" fill="#10b981" radius={[4, 4, 0, 0]} name="pendapatan" />
                </BarChart>
              ) : (
                <LineChart data={revenueMonthly} margin={{ top: 2, right: 2, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1 }} />
                  <Line type="monotone" dataKey="pesanan" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} name="pesanan" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Product */}
        <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-800 mb-0.5">Sales by Product</h3>
          <p className="text-[11px] text-slate-400 mb-4">Proportion of sales volume</p>
          <div className="space-y-3">
            {salesByProduct.map((p, i) => (
              <div key={p.nama}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-700">{p.nama}</span>
                  <span className="text-[11px] font-semibold text-slate-500">{p.persen}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${productColors[i]} rounded-full transition-all duration-700`}
                    style={{ width: `${p.persen}%` }}
                  />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[10px] text-slate-400">{p.terjual.toLocaleString('id-ID')} kg</span>
                  <span className="text-[10px] text-slate-400">Rp {(p.pendapatan / 1000000).toFixed(1)} M</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerAnalytics;
