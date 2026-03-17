import React, { useState } from 'react';
import { Plus, Search, Filter, Edit3, Trash2, MoreVertical, AlertTriangle } from 'lucide-react';

const GudangProduk = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gudang Produk</h1>
          <p className="text-sm text-gray-500">Kelola stok dan harga komoditas pertanian Anda.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-green-200">
          <Plus size={20} />
          Tambah Produk
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Cari nama produk..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-all">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {INVENTORY_DATA.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                  product.status === 'Tersedia' ? 'bg-green-500 text-white' : 
                  product.status === 'Stok Menipis' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>

            {/* Detail Section */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-1">
                <p className="text-xs font-bold text-green-700 uppercase">{product.category}</p>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{product.name}</h3>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Harga per {product.unit}</p>
                  <p className="text-lg font-black text-gray-900">Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium">Sisa Stok</p>
                  <p className={`text-lg font-bold ${product.stock < 10 ? 'text-orange-600' : 'text-gray-900'}`}>
                    {product.stock} {product.unit}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button className="flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all">
                  <Edit3 size={16} /> Edit
                </button>
                <button className="flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-all">
                  <Trash2 size={16} /> Hapus
                </button>
              </div>
            </div>
            
            {/* Low Stock Warning Overlay */}
            {product.stock < 10 && product.stock > 0 && (
              <div className="bg-orange-50 px-5 py-2 flex items-center gap-2 border-t border-orange-100">
                <AlertTriangle size={14} className="text-orange-600" />
                <p className="text-[10px] font-bold text-orange-700 uppercase tracking-tight">Segera Perbarui Stok!</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GudangProduk;