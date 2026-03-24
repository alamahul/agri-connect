import React, { useState } from 'react';
import {
  Database,
  Search,
  Plus,
  Edit3,
  Trash2,
  Filter,
  Download,
  Upload,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  AlertCircle,
  User,
  Package,
  ShoppingCart,
  Shield,
  ArrowUpDown,
  FileText,
  Eye,
  Info
} from 'lucide-react';

const AdminData = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('Add');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock Data
  const [users, setUsers] = useState([
    { id: 'USR-001', name: 'Andi Supriadi', role: 'Customer', email: 'andi@gmail.com', status: 'Active', joined: '2026-01-12' },
    { id: 'USR-002', name: 'Pak Budi', role: 'Farmer', email: 'budi_tani@gmail.com', status: 'Active', joined: '2026-02-05' },
    { id: 'USR-003', name: 'Sinta Dewi', role: 'Customer', email: 'sinta.dewi@yahoo.com', status: 'Suspended', joined: '2026-02-20' },
    { id: 'USR-004', name: 'Ibu Siti', role: 'Farmer', email: 'siti_kebun@gmail.com', status: 'Active', joined: '2026-03-01' },
    { id: 'USR-005', name: 'Rudi Hermawan', role: 'Customer', email: 'rudi_h@outlook.com', status: 'Active', joined: '2026-03-10' },
  ]);

  const [products, setProducts] = useState([
    { id: 'PRD-001', name: 'Tomat Ceri Lembang', farmer: 'Pak Budi', price: 25000, stock: 120, category: 'Sayuran', status: 'Active' },
    { id: 'PRD-002', name: 'Beras Merah 5kg', farmer: 'Ibu Siti', price: 85000, stock: 45, category: 'Grosir', status: 'Active' },
    { id: 'PRD-003', name: 'Cabai Rawit Merah', farmer: 'Pak Sugeng', price: 17000, stock: 300, category: 'Sayuran', status: 'Draft' },
    { id: 'PRD-004', name: 'Melon Super', farmer: 'Pak Jono', price: 35000, stock: 10, category: 'Buah', status: 'Active' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-101', invoice: 'INV/2026/AC/001', customer: 'Andi Supriadi', total: 145000, status: 'In Delivery', date: '2026-03-22' },
    { id: 'ORD-102', invoice: 'INV/2026/AC/002', customer: 'Sinta Dewi', total: 85000, status: 'Processing', date: '2026-03-23' },
    { id: 'ORD-103', invoice: 'INV/2026/AC/003', customer: 'Rudi Hermawan', total: 250000, status: 'Completed', date: '2026-03-24' },
    { id: 'ORD-104', invoice: 'INV/2026/AC/004', customer: 'Maya Putri', total: 170000, status: 'Cancelled', date: '2026-03-24' },
  ]);

  const tabs = [
    { id: 'Users', label: 'Data Pengguna', icon: <User size={18} /> },
    { id: 'Products', label: 'Data Produk', icon: <Package size={18} /> },
    { id: 'Orders', label: 'Data Pesanan', icon: <ShoppingCart size={18} /> },
  ];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setModalMode('Edit');
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      if (activeTab === 'Users') setUsers(users.filter(u => u.id !== id));
      if (activeTab === 'Products') setProducts(products.filter(p => p.id !== id));
      if (activeTab === 'Orders') setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-32">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[6px] border border-gray-100 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-neutral-900 text-white rounded-[6px] flex items-center justify-center shadow-lg shadow-neutral-200">
            <Database size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter leading-none italic">Database Master</h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{activeTab} Management Control</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <input
              placeholder={`Cari di ${activeTab}...`}
              className="pl-14 pr-8 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-xs font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all w-full lg:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => { setModalMode('Add'); setSelectedItem(null); setIsModalOpen(true); }}
            className="px-8 py-4 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
          >
            <Plus size={16} /> Tambah {activeTab === 'Users' ? 'User' : activeTab === 'Products' ? 'Produk' : 'Pesanan'}
          </button>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex gap-2 bg-white p-2 rounded-[6px] border border-gray-100 shadow-sm w-fit mx-auto lg:mx-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-10 py-4 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-neutral-900 text-white shadow-xl' : 'text-gray-400 hover:text-neutral-900'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN DATA TABLE */}
      <div className="bg-white rounded-[6px] border border-gray-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] font-black text-neutral-900 uppercase tracking-widest italic">Live Database Records</p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 bg-white border border-gray-100 rounded-[6px] text-gray-400 hover:text-neutral-900 transition-all shadow-sm"><Download size={16} /></button>
            <button className="p-3 bg-white border border-gray-100 rounded-[6px] text-gray-400 hover:text-neutral-900 transition-all shadow-sm"><Filter size={16} /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID System</th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {activeTab === 'Users' ? 'Informasi Personal' : activeTab === 'Products' ? 'Komoditas' : 'Invoice & Pelanggan'}
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {activeTab === 'Users' ? 'Role / Hak Akses' : activeTab === 'Products' ? 'Supplier (Petani)' : 'Total Nilai (Escrow)'}
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status System</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* RENDER DATA BASED ON TAB */}
              {activeTab === 'Users' && users.map((user) => (
                <tr key={user.id} className="group hover:bg-gray-50 transition-all duration-300">
                  <td className="px-10 py-8 italic font-mono text-[10px] font-black text-gray-400">{user.id}</td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center font-black text-neutral-400">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{user.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold lowercase">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <span className={`px-4 py-1.5 rounded-[6px] text-[10px] font-black uppercase tracking-widest ${user.role === 'Farmer' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></span>
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-900">{user.status}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right space-x-3">
                    <button onClick={() => handleEdit(user)} className="p-3 bg-white border border-gray-100 rounded-[6px] text-neutral-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(user.id)} className="p-3 bg-white border border-gray-100 rounded-[6px] text-neutral-400 hover:text-red-600 hover:border-red-100 hover:shadow-lg transition-all"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}

              {activeTab === 'Products' && products.map((prod) => (
                <tr key={prod.id} className="group hover:bg-gray-50 transition-all duration-300">
                  <td className="px-10 py-8 italic font-mono text-[10px] font-black text-gray-400">{prod.id}</td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-[6px] flex items-center justify-center"><Package size={20} className="text-gray-400" /></div>
                      <div>
                        <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{prod.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{prod.category} • Stok: {prod.stock} Kg</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <p className="text-sm font-black text-neutral-900 uppercase tracking-tighter">Rp {prod.price.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">oleh: {prod.farmer}</p>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <span className={`px-4 py-1.5 rounded-[6px] text-[9px] font-black uppercase tracking-widest ${prod.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {prod.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right space-x-3">
                    <button onClick={() => handleEdit(prod)} className="p-3 bg-white border border-gray-100 rounded-[6px] text-neutral-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(prod.id)} className="p-3 bg-white border border-gray-100 rounded-[6px] text-neutral-400 hover:text-red-600 hover:border-red-100 hover:shadow-lg transition-all"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}

              {activeTab === 'Orders' && orders.map((order) => (
                <tr key={order.id} className="group hover:bg-gray-50 transition-all duration-300">
                  <td className="px-10 py-8 italic font-mono text-[10px] font-black text-gray-400">{order.id}</td>
                  <td className="px-6 py-8">
                    <p className="text-sm font-black text-neutral-900 uppercase tracking-tight">{order.invoice}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Pembeli: {order.customer}</p>
                  </td>
                  <td className="px-6 py-8">
                    <p className="text-sm font-black text-emerald-600 uppercase tracking-tighter">Rp {order.total.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Tanggal: {order.date}</p>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <span className={`px-4 py-1.5 rounded-[6px] text-[9px] font-black uppercase tracking-widest ${order.status === 'Completed' ? 'bg-neutral-900 text-white' : order.status === 'Cancelled' ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white animate-pulse'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right space-x-3">
                    <button onClick={() => handleEdit(order)} className="p-3 bg-white border border-gray-100 rounded-[6px] text-neutral-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(order.id)} className="p-3 bg-white border border-gray-100 rounded-[6px] text-neutral-400 hover:text-red-600 hover:border-red-100 hover:shadow-lg transition-all"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (SIMULATION) */}
        <div className="p-10 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Menampilkan 1-5 dari {activeTab === 'Users' ? users.length : activeTab === 'Products' ? products.length : orders.length} data record</p>
          <div className="flex gap-3">
            <button className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-[6px] text-gray-400 hover:text-neutral-900 shadow-sm transition-all"><ChevronLeft size={20} /></button>
            <div className="flex gap-2">
              {[1, 2, 3].map(p => <button key={p} className={`w-12 h-12 flex items-center justify-center rounded-[6px] text-[10px] font-black transition-all ${p === 1 ? 'bg-neutral-900 text-white shadow-xl translate-y-[-4px]' : 'bg-white text-gray-400 border border-gray-100'}`}>{p}</button>)}
            </div>
            <button className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-[6px] text-gray-400 hover:text-neutral-900 shadow-sm transition-all"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      {/* CRUD MODAL FOR ALL DATA TYPES */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[6px] relative z-10 shadow-3xl animate-in zoom-in-95 duration-500 overflow-hidden border-[12px] border-white">
            <div className="p-12">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center">
                    {modalMode === 'Add' ? <Plus size={28} /> : <Edit3 size={28} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">{modalMode === 'Add' ? 'Entri Data Baru' : 'Edit Data Master'}</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{activeTab} Entry Registry</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"><X size={24} /></button>
              </div>

              <form className="space-y-6">
                {/* DYNAMIC FORM FIELDS BASED ON TAB */}
                {activeTab === 'Users' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nama Lengkap</label>
                      <input defaultValue={selectedItem?.name} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Aktif</label>
                      <input defaultValue={selectedItem?.email} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Role System</label>
                      <select defaultValue={selectedItem?.role} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all appearance-none cursor-pointer">
                        <option>Customer</option>
                        <option>Farmer</option>
                        <option>Admin</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Status Pengguna</label>
                      <select defaultValue={selectedItem?.status} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all appearance-none cursor-pointer">
                        <option>Active</option>
                        <option>Suspended</option>
                        <option>Banned</option>
                      </select>
                    </div>
                  </div>
                ) : activeTab === 'Products' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nama Komoditas</label>
                      <input defaultValue={selectedItem?.name} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Harga Jual (Rp)</label>
                      <input defaultValue={selectedItem?.price} type="number" className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Stok (Kg)</label>
                      <input defaultValue={selectedItem?.stock} type="number" className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nomor Invoice</label>
                      <input defaultValue={selectedItem?.invoice} disabled className="w-full px-8 py-5 bg-gray-100 border border-gray-100 rounded-[6px] text-sm font-bold outline-none cursor-not-allowed opacity-60" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Status Pengiriman</label>
                      <select defaultValue={selectedItem?.status} className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all appearance-none cursor-pointer">
                        <option>Processing</option>
                        <option>Packed</option>
                        <option>In Delivery</option>
                        <option>Delivered</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-gray-100 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-gray-50 text-gray-400 rounded-[6px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">Batalkan</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-[2] py-5 bg-neutral-900 text-white rounded-[6px] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                    <CheckCircle2 size={16} /> {modalMode === 'Add' ? 'Simpan Data' : 'Update Database'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminData;





