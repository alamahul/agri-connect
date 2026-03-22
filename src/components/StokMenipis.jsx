import { AlertCircle } from 'lucide-react';

const products = [
  { name: 'Beras Pandan Wangi', stock: 45, threshold: 100 },
  { name: 'Cabai Merah Keriting', stock: 12, threshold: 50 },
  { name: 'Bawang Merah', stock: 30, threshold: 80 },
  { name: 'Kentang', stock: 60, threshold: 150 },
  { name: 'Wortel', stock: 25, threshold: 70 },
];

const StokMenipis = () => {
  const lowStock = products.filter((p) => p.stock < p.threshold);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Produk Stok Menipis</h2>
      <ul className="space-y-3">
        {lowStock.map((product) => (
          <li key={product.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-slate-700">{product.name}</span>
            </div>
            <span className="text-sm font-medium text-amber-600">{product.stock} Kg</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StokMenipis;