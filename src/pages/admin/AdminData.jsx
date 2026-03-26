import React, { useState, useMemo } from 'react';
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
  Info,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Tag,
  Truck,
  CreditCard,
  Hash
} from 'lucide-react';

const AdminData = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [modalMode, setModalMode] = useState('Add');
  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  // Enhanced Mock Data
  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      name: 'Andi Supriadi',
      role: 'Customer',
      email: 'andi@gmail.com',
      phone: '0812-3456-7890',
      address: 'Jl. Merdeka No. 12, Bandung',
      status: 'Active',
      joined: '2026-01-12',
      verification: 'Verified'
    },
    {
      id: 'USR-002',
      name: 'Pak Budi',
      role: 'Farmer',
      email: 'budi_tani@gmail.com',
      phone: '0822-1122-3344',
      address: 'Desa Sukamaju, Lembang',
      status: 'Active',
      joined: '2026-02-05',
      verification: 'Verified'
    },
    {
      id: 'USR-003',
      name: 'Sinta Dewi',
      role: 'Customer',
      email: 'sinta.dewi@yahoo.com',
      phone: '0857-9988-7766',
      address: 'Apartemen Gateway Lt. 5, Jakarta',
      status: 'Suspended',
      joined: '2026-02-20',
      verification: 'Pending'
    },
    {
      id: 'USR-004',
      name: 'Ibu Siti',
      role: 'Farmer',
      email: 'siti_kebun@gmail.com',
      phone: '0813-4455-6677',
      address: 'Pangalengan, Kab. Bandung',
      status: 'Active',
      joined: '2026-03-01',
      verification: 'Verified'
    },
    {
      id: 'USR-005',
      name: 'Rudi Hermawan',
      role: 'Customer',
      email: 'rudi_h@outlook.com',
      phone: '0899-7776-6555',
      address: 'Komp. Antapani, Bandung',
      status: 'Active',
      joined: '2026-03-10',
      verification: 'Unverified'
    },
    { id: 'USR-006', name: 'Maya Sari', role: 'Customer', email: 'maya@gmail.com', phone: '0812-1212-1212', address: 'Surabaya', status: 'Active', joined: '2026-03-15', verification: 'Verified' },
  ]);

  const [products, setProducts] = useState([
    {
      id: 'PRD-001',
      name: 'Tomat Ceri Lembang',
      farmer: 'Pak Budi',
      price: 25000,
      stock: 120,
      unit: 'Kg',
      category: 'Sayuran',
      status: 'Active',
      origin: 'Lembang, Jawa Barat',
      rating: 4.8
    },
    {
      id: 'PRD-002',
      name: 'Beras Merah 5kg',
      farmer: 'Ibu Siti',
      price: 85000,
      stock: 45,
      unit: 'Pcs',
      category: 'Grosir',
      status: 'Active',
      origin: 'Cianjur, Jawa Barat',
      rating: 4.9
    },
    {
      id: 'PRD-003',
      name: 'Cabai Rawit Merah',
      farmer: 'Pak Sugeng',
      price: 17000,
      stock: 300,
      unit: 'Kg',
      category: 'Sayuran',
      status: 'Draft',
      origin: 'Malang, Jawa Timur',
      rating: 0
    },
    {
      id: 'PRD-004',
      name: 'Melon Super',
      farmer: 'Pak Jono',
      price: 35000,
      stock: 10,
      unit: 'Pcs',
      category: 'Buah',
      status: 'Active',
      origin: 'Gunung Kidul, DIY',
      rating: 4.5
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-101',
      invoice: 'INV/2026/AC/001',
      customer: 'Andi Supriadi',
      total: 145000,
      status: 'In Delivery',
      date: '2026-03-22',
      payment: 'Bank Transfer',
      items: [
        { name: 'Tomat Ceri', qty: 2, price: 25000 },
        { name: 'Beras Merah', qty: 1, price: 85000 }
      ],
      shipping: 'JNE Reguler'
    },
    {
      id: 'ORD-102',
      invoice: 'INV/2026/AC/002',
      customer: 'Sinta Dewi',
      total: 85000,
      status: 'Processing',
      date: '2026-03-23',
      payment: 'E-Wallet',
      items: [
        { name: 'Melon Super', qty: 2, price: 35000 }
      ],
      shipping: 'SiCepat'
    },
    {
      id: 'ORD-103',
      invoice: 'INV/2026/AC/003',
      customer: 'Rudi Hermawan',
      total: 250000,
      status: 'Completed',
      date: '2026-03-24',
      payment: 'COD',
      items: [
        { name: 'Beras Merah 5kg', qty: 3, price: 85000 }
      ],
      shipping: 'Kurir AgriConnect'
    },
  ]);

  // Notifications
  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Filter Logic
  const getFilteredData = () => {
    let data = [];
    if (activeTab === 'Users') data = users;
    else if (activeTab === 'Products') data = products;
    else data = orders;

    return data.filter(item => {
      const searchStr = (item.name || item.invoice || '').toLowerCase();
      const matchSearch = searchStr.includes(searchQuery.toLowerCase()) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'All' || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  };

  const filteredData = getFilteredData();

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Excel Export Logic (CSV format for compatibility)
  const downloadData = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    if (activeTab === 'Users') {
      csvContent += "ID,Name,Role,Email,Phone,Status,Joined\n";
      users.forEach(u => {
        csvContent += `${u.id},${u.name},${u.role},${u.email},${u.phone},${u.status},${u.joined}\n`;
      });
    } else if (activeTab === 'Products') {
      csvContent += "ID,Name,Farmer,Price,Stock,Category,Status\n";
      products.forEach(p => {
        csvContent += `${p.id},${p.name},${p.farmer},${p.price},${p.stock},${p.category},${p.status}\n`;
      });
    } else {
      csvContent += "ID,Invoice,Customer,Total,Status,Date\n";
      orders.forEach(o => {
        csvContent += `${o.id},${o.invoice},${o.customer},${o.total},${o.status},${o.date}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `agriconnect_${activeTab.toLowerCase()}_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    showNotification("Data Berhasil Diunduh!");
  };

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    if (mode === 'Add') {
      if (activeTab === 'Users') setFormData({ name: '', email: '', phone: '', address: '', role: 'Customer', status: 'Active', joined: new Date().toISOString().split('T')[0], verification: 'Unverified' });
      else if (activeTab === 'Products') setFormData({ name: '', price: 0, stock: 0, unit: 'Kg', farmer: 'Admin', category: 'Sayuran', status: 'Active', origin: '', rating: 0 });
      else setFormData({ invoice: `INV/${new Date().getFullYear()}/AC/${Math.floor(100 + Math.random() * 900)}`, customer: '', total: 0, status: 'Processing', date: new Date().toISOString().split('T')[0], payment: 'Bank Transfer' });
    } else {
      setFormData({ ...item });
    }
    setIsModalOpen(true);
  };

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'Add') {
      const newId = (activeTab === 'Users' ? 'USR-' : activeTab === 'Products' ? 'PRD-' : 'ORD-') + (Math.floor(Math.random() * 900) + 100);
      const newItem = { id: newId, ...formData };

      if (activeTab === 'Users') setUsers([newItem, ...users]);
      else if (activeTab === 'Products') setProducts([newItem, ...products]);
      else setOrders([newItem, ...orders]);

      showNotification(`${activeTab.slice(0, -1)} Berhasil Ditambahkan!`);
    } else {
      if (activeTab === 'Users') setUsers(users.map(u => u.id === selectedItem.id ? { ...u, ...formData } : u));
      else if (activeTab === 'Products') setProducts(products.map(p => p.id === selectedItem.id ? { ...p, ...formData } : p));
      else setOrders(orders.map(o => o.id === selectedItem.id ? { ...o, ...formData } : o));

      showNotification(`${activeTab.slice(0, -1)} Berhasil Diperbarui!`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      if (activeTab === 'Users') setUsers(users.filter(u => u.id !== id));
      if (activeTab === 'Products') setProducts(products.filter(p => p.id !== id));
      if (activeTab === 'Orders') setOrders(orders.filter(o => o.id !== id));
      showNotification('Data Berhasil Dihapus!');
    }
  };

  const tabs = [
    { id: 'Users', label: 'Data Pengguna', icon: <User size={18} /> },
    { id: 'Products', label: 'Data Produk', icon: <Package size={18} /> },
    { id: 'Orders', label: 'Data Pesanan', icon: <ShoppingCart size={18} /> },
  ];

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-500 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 text-white px-8 py-4 rounded-[6px] shadow-2xl border-2 border-emerald-500 flex items-center gap-4 animate-in slide-in-from-top-10">
          <CheckCircle2 className="text-emerald-500" size={24} />
          <p className="text-xs font-black uppercase tracking-widest">{toast}</p>
        </div>
      )}

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

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative group flex-1 lg:flex-none">
            <input
              placeholder={`Cari di ${activeTab}...`}
              className="pl-14 pr-8 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-xs font-bold outline-none focus:ring-4 focus:ring-neutral-900/5 transition-all w-full lg:w-80"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <button
            onClick={() => handleOpenModal('Add')}
            className="px-8 py-4 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl hover:bg-emerald-600"
          >
            <Plus size={16} /> Tambah {activeTab === 'Users' ? 'User' : activeTab === 'Products' ? 'Produk' : 'Pesanan'}
          </button>
        </div>
      </div>

      {/* TAB NAVIGATION & FILTERS */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-[6px] border border-gray-100 shadow-sm w-full lg:w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchQuery(''); setCurrentPage(1); setStatusFilter('All'); }}
              className={`flex-1 lg:flex-none flex items-center justify-center gap-3 px-6 lg:px-10 py-4 rounded-[6px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-neutral-900 text-white shadow-xl' : 'text-gray-400 hover:text-neutral-900'}`}
            >
              {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-6 pr-10 py-4 bg-white border border-gray-100 rounded-[6px] text-[10px] font-black uppercase tracking-widest outline-none shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">Semua Status</option>
              {activeTab === 'Users' ? (
                <>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </>
              ) : activeTab === 'Products' ? (
                <>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </>
              ) : (
                <>
                  <option value="Processing">Processing</option>
                  <option value="In Delivery">In Delivery</option>
                  <option value="Completed">Completed</option>
                </>
              )}
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          </div>
          <button
            onClick={downloadData}
            className="p-4 bg-neutral-900 text-white rounded-[6px] shadow-lg hover:scale-105 transition-all flex items-center gap-3"
          >
            <Download size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Excel</span>
          </button>
        </div>
      </div>

      {/* MAIN DATA TABLE */}
      <div className="bg-white rounded-[6px] border border-gray-100 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">ID System</th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {activeTab === 'Users' ? 'Personal' : activeTab === 'Products' ? 'Komoditas' : 'Invoice & Pelanggan'}
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {activeTab === 'Users' ? 'Phone & Role' : activeTab === 'Products' ? 'Harga & Stok' : 'Total & Payment'}
                </th>
                <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px] font-medium">
              {currentData.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                  <td className="px-10 py-6 italic font-mono text-[9px] font-black text-gray-400">{item.id}</td>
                  <td className="px-6 py-6">
                    {activeTab === 'Users' ? (
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center font-black text-[9px] shadow-lg">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-neutral-900 uppercase tracking-tight leading-none">{item.name}</p>
                          <p className="text-[9px] text-gray-400 font-bold lowercase mt-1">{item.email}</p>
                        </div>
                      </div>
                    ) : activeTab === 'Products' ? (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-[4px] flex items-center justify-center text-gray-400 group-hover:bg-white transition-all shadow-inner"><Package size={18} /></div>
                        <div>
                          <p className="text-[11px] font-black text-neutral-900 uppercase tracking-tight leading-none">{item.name}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic mt-1">{item.category} • {item.origin}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[11px] font-black text-neutral-900 uppercase tracking-tight leading-none">{item.invoice}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{item.customer}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-6">
                    {activeTab === 'Users' ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Phone size={10} /> <span className="font-bold">{item.phone}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-widest ${item.role === 'Farmer' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                          {item.role}
                        </span>
                      </div>
                    ) : activeTab === 'Products' ? (
                      <div>
                        <p className="font-black text-neutral-900">Rp {item.price.toLocaleString()}</p>
                        <p className="text-[9px] text-gray-400 font-bold mt-1">Stok: {item.stock} {item.unit} • {item.farmer}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-black text-emerald-600">Rp {item.total.toLocaleString()}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-[9px] mt-1 italic uppercase font-bold">
                          <CreditCard size={10} /> {item.payment}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-3 py-1 rounded-[4px] text-[8px] font-black uppercase tracking-widest ${['Active', 'Verified', 'Completed'].includes(item.status || item.verification) ? 'bg-emerald-500 text-white' :
                        ['Suspended', 'Cancelled'].includes(item.status) ? 'bg-red-500 text-white' :
                          item.status === 'Draft' ? 'bg-gray-100 text-gray-400' : 'bg-indigo-600 text-white'
                      } shadow-sm px-4`}>
                      {item.status || item.verification}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => handleOpenDetail(item)} className="p-2.5 bg-white border border-gray-100 rounded-[4px] text-gray-400 hover:text-emerald-500 hover:shadow-lg transition-all"><Eye size={14} /></button>
                    <button onClick={() => handleOpenModal('Edit', item)} className="p-2.5 bg-white border border-gray-100 rounded-[4px] text-gray-400 hover:text-blue-600 hover:shadow-lg transition-all"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-white border border-gray-100 rounded-[4px] text-gray-400 hover:text-red-600 hover:shadow-lg transition-all"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr><td colSpan="5" className="p-20 text-center text-gray-400 font-black uppercase tracking-widest text-xs italic">Data Tidak Ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-8 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} dari {filteredData.length} entri
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-[4px] text-gray-400 hover:text-neutral-900 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-[4px] text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-neutral-900 text-white shadow-xl' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-[4px] text-gray-400 hover:text-neutral-900 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* DETAIL VIEW MODAL */}
      {isDetailOpen && selectedItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setIsDetailOpen(false)}></div>
          <div className="bg-white w-full max-w-xl rounded-[6px] relative z-10 shadow-3xl animate-in zoom-in-95 duration-500 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-neutral-900 text-white">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white"><Eye size={20} /></div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest italic">{activeTab === 'Orders' ? 'Detail Pesanan' : 'Detail Profil'}</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{selectedItem.id}</p>
                </div>
              </div>
              <button onClick={() => setIsDetailOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"><X size={20} /></button>
            </div>
            <div className="p-10 space-y-8 bg-gray-50/30">
              {activeTab === 'Users' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Nama Lengkap</p>
                    <p className="text-sm font-black text-neutral-900 uppercase italic">{selectedItem.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Email</p>
                      <p className="text-[11px] font-black text-neutral-900">{selectedItem.email}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Telepon</p>
                      <p className="text-[11px] font-black text-neutral-900">{selectedItem.phone}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Alamat Domisili</p>
                    <p className="text-[11px] font-medium text-neutral-900 leading-relaxed italic">"{selectedItem.address}"</p>
                  </div>
                </div>
              ) : activeTab === 'Products' ? (
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 italic font-black uppercase tracking-widest shadow-inner">
                    <Package size={48} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-[9px] text-gray-400 font-bold uppercase">Stok</p>
                      <p className="text-sm font-black text-neutral-900">{selectedItem.stock} {selectedItem.unit}</p>
                    </div>
                    <div className="text-center border-x border-gray-100 px-4">
                      <p className="text-[9px] text-gray-400 font-bold uppercase">Harga</p>
                      <p className="text-sm font-black text-emerald-600">Rp {selectedItem.price.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-gray-400 font-bold uppercase">Rating</p>
                      <p className="text-sm font-black text-amber-500">★ {selectedItem.rating || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-5 bg-white rounded-lg border-l-4 border-emerald-500 shadow-sm">
                    <p className="text-[9px] text-gray-400 font-bold uppercase mb-2">Item Terbeli:</p>
                    {selectedItem.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] font-black text-neutral-900 py-1 uppercase tracking-tighter">
                        <span>{it.name} x {it.qty}</span>
                        <span>Rp {(it.price * it.qty).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-emerald-600">
                      <p className="text-[10px] font-black uppercase">Grand Total</p>
                      <p className="text-lg font-black italic">Rp {selectedItem.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-white rounded-lg border border-gray-100 italic">
                      <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Kurir Paket</p>
                      <p className="text-[11px] font-black text-neutral-900 uppercase">{selectedItem.shipping}</p>
                    </div>
                    <div className="flex-1 p-4 bg-white rounded-lg border border-gray-100 italic">
                      <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Pembayaran</p>
                      <p className="text-[11px] font-black text-neutral-900 uppercase">{selectedItem.payment}</p>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => setIsDetailOpen(false)}
                className="w-full py-4 bg-neutral-900 text-white rounded-[4px] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-3xl rounded-[6px] relative z-10 shadow-3xl animate-in zoom-in-95 duration-500 flex flex-col max-h-[90vh]">
            <div className="p-8 md:p-10 border-b border-gray-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center shadow-xl">
                  {modalMode === 'Add' ? <Plus size={24} /> : <Edit3 size={24} />}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black text-neutral-900 uppercase tracking-tighter italic leading-none">{modalMode === 'Add' ? 'Entri Data Baru' : 'Perbarui System'}</h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{activeTab} Registry System</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all shadow-inner"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-gray-50/50">
              <div className="space-y-10">
                {activeTab === 'Users' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Mitra/Pelanggan</label>
                        <input value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="Contoh: Budi Santoso" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Aktif</label>
                        <input value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="budi@email.com" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor Telepon (WhatsApp)</label>
                        <input value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="08xx-xxxx-xxxx" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hak Akses Role</label>
                        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm appearance-none cursor-pointer uppercase tracking-widest">
                          <option>Customer</option><option>Farmer</option><option>Admin</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Penjemputan / Pengantaran</label>
                      <textarea value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm min-h-[100px]" placeholder="Jabarkan alamat lengkap mitra..." />
                    </div>
                  </>
                )}

                {activeTab === 'Products' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Titel Komoditas</label>
                        <input value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm uppercase italic" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Harga per Satuan (Rp)</label>
                        <input value={formData.price || 0} type="number" onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Stok Inventori</label>
                        <div className="flex gap-2">
                          <input value={formData.stock || 0} type="number" onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })} className="flex-1 px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" />
                          <select value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-32 px-4 py-4 bg-white border border-gray-100 rounded-[4px] text-[10px] font-black uppercase outline-none shadow-sm cursor-pointer">
                            <option>Kg</option><option>Pcs</option><option>Box</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kategori Produk</label>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm appearance-none cursor-pointer uppercase italic">
                          <option>Sayuran</option><option>Buah</option><option>Grosir</option><option>Olahan</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lokasi Asal Panen</label>
                        <input value={formData.origin || ''} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" placeholder="Contoh: lembang, Bandung" />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'Orders' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Customer</label>
                      <input value={formData.customer || ''} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm uppercase italic" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Grand Total Transaksi (Rp)</label>
                      <input value={formData.total || 0} type="number" onChange={(e) => setFormData({ ...formData, total: parseInt(e.target.value) })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Metode Pembayaran</label>
                      <select value={formData.payment} onChange={(e) => setFormData({ ...formData, payment: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm appearance-none cursor-pointer">
                        <option>Bank Transfer</option><option>E-Wallet</option><option>COD</option><option>Escrow AgriConnect</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Logistik Kurir</label>
                      <select value={formData.shipping} onChange={(e) => setFormData({ ...formData, shipping: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm appearance-none cursor-pointer">
                        <option>JNE Reguler</option><option>SiCepat</option><option>Kurir AgriConnect</option><option>Grab/Gojek Express</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status Pengiriman</label>
                      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[4px] text-[11px] font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm appearance-none cursor-pointer">
                        <option>Processing</option><option>Packed</option><option>In Delivery</option><option>Delivered</option><option>Completed</option><option>Cancelled</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 md:p-12 border-t border-gray-100 flex gap-4 bg-white shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-gray-50 text-gray-400 rounded-[4px] text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all italic underline">Tutup Registry</button>
              <button type="button" onClick={handleSave} className="flex-[2] py-5 bg-neutral-900 text-white rounded-[4px] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                <CheckCircle2 size={16} /> {modalMode === 'Add' ? 'Simpan Record Baru' : 'Sinkronkan Database'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminData;
