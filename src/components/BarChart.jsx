import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { chartData } from '../data/dummyData';

const filters = ['Hari', 'Minggu', 'Bulan'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 !text-xs">
        <p className="font-semibold text-slate-700">{label}</p>
        <p className="text-emerald-600 mt-0.5">
          <span className="font-bold">{payload[0].value.toLocaleString('id-ID')}</span>
          <span className="text-slate-400 ml-1">unit</span>
        </p>
      </div>
    );
  }
  return null;
};

const SalesBarChart = () => {
  const [activeFilter, setActiveFilter] = useState('Hari');
  const data = chartData[activeFilter];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-800 text-sm">Grafik Penjualan</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Ringkasan kinerja penjualan produk</p>
        </div>
        <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${activeFilter === f
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Chart — reduced height */}
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={20} margin={{ top: 2, right: 2, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f0fdf4', radius: 4 }} />
            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesBarChart;