import { Eye } from 'lucide-react';

const orders = [
  { id: '#AC-1001', customer: 'Toko Tani Maju', total: 'Rp 2.450.000', status: 'Selesai' },
  { id: '#AC-1002', customer: 'Warung Sari Rasa', total: 'Rp 875.000', status: 'Diproses' },
  { id: '#AC-1003', customer: 'Kelompok Tani Subur', total: 'Rp 3.200.000', status: 'Menunggu' },
  { id: '#AC-1004', customer: 'Pasar Induk', total: 'Rp 5.600.000', status: 'Selesai' },
  { id: '#AC-1005', customer: 'Toko Buah Segar', total: 'Rp 1.340.000', status: 'Diproses' },
];

const statusColors = {
  Selesai: 'bg-green-100 text-green-700',
  Diproses: 'bg-blue-100 text-blue-700',
  Menunggu: 'bg-yellow-100 text-yellow-700',
};

const DataTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Daftar Pesanan Terbaru</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              <th className="pb-3">ID</th>
              <th className="pb-3">Pelanggan</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-3 text-sm text-slate-800">{order.id}</td>
                <td className="py-3 text-sm text-slate-800">{order.customer}</td>
                <td className="py-3 text-sm text-slate-800">{order.total}</td>
                <td className="py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-slate-400 hover:text-emerald-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;