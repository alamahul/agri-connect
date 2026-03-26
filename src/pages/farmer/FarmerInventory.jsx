import React, { useState, useMemo } from 'react';
import {
   Plus,
   Search,
   Camera,
   Edit2,
   Trash2,
   ArrowRight,
   Leaf,
   Clock,
   AlertTriangle,
   ChevronRight,
   MoreHorizontal,
   Zap,
   Check,
   X,
   Bot,
   Calendar,
   Package,
   TrendingUp,
   Filter,
   BarChart2,
   Image as ImageIcon,
   Loader2,
   RotateCw
} from 'lucide-react';

const FarmerInventory = () => {
   const [activeTab, setActiveTab] = useState('all');
   const [searchQuery, setSearchQuery] = useState('');
   const [showAddModal, setShowAddModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [showObralModal, setShowObralModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isCapturing, setIsCapturing] = useState(false);

   // Dummy Data for Inventory
   const [products, setProducts] = useState([
      {
         id: 1,
         name: "Tomat Ceri Premium",
         price: 15000,
         stock: 45,
         unit: "Kg",
         category: "Sayuran Buah",
         image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
         status: true,
         type: "ready",
         daysAgo: 1
      },
      {
         id: 2,
         name: "Cabai Rawit Merah",
         price: 45000,
         stock: 12,
         unit: "Kg",
         category: "Sayuran Buah",
         image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400",
         status: true,
         type: "ready",
         daysAgo: 3
      },
      {
         id: 3,
         name: "Kangkung Hidroponik",
         price: 8000,
         stock: 50,
         booked: 30,
         unit: "Kg",
         category: "Sayuran Daun",
         image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
         status: true,
         type: "preorder",
         harvestDate: "25 Mar 2026"
      },
      {
         id: 4,
         name: "Wortel Brastagi",
         price: 12000,
         stock: 30,
         unit: "Kg",
         category: "Umbi-umbian",
         image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
         status: false,
         type: "ready",
         daysAgo: 0
      }
   ]);

   // Form State
   const emptyForm = {
      name: '',
      price: '',
      stock: '',
      unit: 'Kg',
      category: '',
      type: 'ready',
      image: 'https://images.unsplash.com/photo-1566385278603-955562b26591?w=400'
   };
   const [formData, setFormData] = useState(emptyForm);

   // Filtering Logic
   const filteredProducts = useMemo(() => {
      return products.filter(p => {
         const matchesTab = activeTab === 'all' || (activeTab === 'preorder' && p.type === 'preorder');
         const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
         return matchesTab && matchesSearch;
      });
   }, [products, activeTab, searchQuery]);

   const toggleStatus = (id) => {
      setProducts(products.map(p => p.id === id ? { ...p, status: !p.status } : p));
   };

   const handleAddProduct = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
         const newProduct = {
            ...formData,
            id: Date.now(),
            price: Number(formData.price),
            stock: Number(formData.stock),
            status: true,
            daysAgo: 0
         };
         setProducts([newProduct, ...products]);
         setIsSubmitting(false);
         setShowAddModal(false);
         setFormData(emptyForm);
      }, 1500);
   };

   const handleEditProduct = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
         setProducts(products.map(p => p.id === selectedProduct.id ? { ...formData, id: p.id } : p));
         setIsSubmitting(false);
         setShowEditModal(false);
         setSelectedProduct(null);
      }, 1500);
   };

   const handleDeleteProduct = () => {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
   };

   const handleCapture = () => {
      setIsCapturing(true);
      setTimeout(() => setIsCapturing(false), 2000);
   };

   const confirmObral = () => {
      setProducts(products.map(p =>
         p.id === selectedProduct.id
            ? { ...p, price: Math.round(p.price * 0.8), daysAgo: 0 }
            : p
      ));
      setShowObralModal(false);
   };

   return (
      <div className="space-y-8 pb-32 animate-in fade-in duration-500">

         {/* 1. Header & Ringkasan Lahan */}
         <section className="bg-white p-8 md:p-10 rounded-[6px] border border-gray-100 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-10">
               <div className="text-center sm:text-left">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">Gudang Produk Anda</p>
                  <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tighter">Ringkasan Lahan</h1>
               </div>

               <div className="h-12 w-px bg-gray-100 hidden sm:block"></div>

               <div className="flex gap-10">
                  <div className="text-center sm:text-left">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Komoditas Aktif</p>
                     <p className="text-2xl font-black text-neutral-900 leading-none">{products.length} Jenis</p>
                  </div>
                  <div className="text-center sm:text-left">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimasi Nilai</p>
                     <p className="text-xl font-black text-emerald-600 leading-none">
                        Rp {products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0).toLocaleString()}
                     </p>
                  </div>
               </div>
            </div>

            <div className="relative z-10">
               <button
                  onClick={() => {
                     setFormData(emptyForm);
                     setShowAddModal(true);
                  }}
                  className="px-10 py-5 bg-neutral-900 hover:bg-black text-amber-400 rounded-[6px] font-black uppercase tracking-widest text-sm shadow-2xl shadow-neutral-200 transition-all active:scale-95 flex items-center gap-3"
               >
                  <Plus size={24} /> Tambah Hasil Panen
               </button>
            </div>
         </section>

         {/* Toolbar & Tabs */}
         <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex bg-white p-1.5 rounded-[6px] border border-gray-100 shadow-sm w-full lg:w-auto">
               <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 lg:flex-none px-8 py-3 rounded-[6px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
               >
                  Semua Produk
               </button>
               <button
                  onClick={() => setActiveTab('preorder')}
                  className={`flex-1 lg:flex-none px-8 py-3 rounded-[6px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'preorder' ? 'bg-neutral-900 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
               >
                  Jadwal Panen Besok
               </button>
            </div>

            <div className="relative w-full lg:w-72 group">
               <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari barang atau kategori..."
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[6px] shadow-sm outline-none focus:ring-2 focus:ring-amber-400 font-medium text-sm"
               />
            </div>
         </div>

         {/* 3. Tampilan Daftar Produk (Responsive Grid Card) */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
               <div key={product.id} className="bg-white rounded-[6px] border border-gray-100 shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 relative flex flex-col animate-in zoom-in-95 duration-300">

                  {/* Obral Label */}
                  {product.daysAgo >= 2 && activeTab === 'all' && (
                     <div className="absolute top-4 left-4 z-10 animate-pulse">
                        <div className="bg-amber-100 text-amber-600 border border-amber-200 px-4 py-1.5 rounded-[6px] flex items-center gap-2 shadow-lg backdrop-blur-md">
                           <AlertTriangle size={14} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Waspada Layu</span>
                        </div>
                     </div>
                  )}

                  {/* Status Toggle overlay at top right */}
                  <div className="absolute top-4 right-4 z-10">
                     <button
                        onClick={() => toggleStatus(product.id)}
                        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${product.status ? 'bg-emerald-500' : 'bg-gray-300'}`}
                     >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${product.status ? 'left-7' : 'left-1'}`} />
                     </button>
                  </div>

                  {/* Product Image */}
                  <div className="h-48 overflow-hidden relative">
                     <img src={product.image} alt={product.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!product.status && 'grayscale opacity-50'}`} />
                     {!product.status && (
                        <div className="absolute inset-0 bg-neutral-900/40 flex items-center justify-center">
                           <span className="bg-white px-4 py-1.5 rounded-[6px] font-black text-[10px] uppercase tracking-widest text-neutral-900 shadow-xl">Nonaktif</span>
                        </div>
                     )}
                     {product.type === 'preorder' && (
                        <div className="absolute bottom-0 left-0 w-full bg-neutral-900/80 backdrop-blur-md py-2 px-4 flex justify-between items-center text-white">
                           <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                              <Clock size={12} className="text-amber-400" /> Panen Besok
                           </div>
                           <span className="text-[10px] font-black text-amber-400">{product.harvestDate}</span>
                        </div>
                     )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                     <div>
                        <div className="flex justify-between items-start mb-1">
                           <h3 className="text-lg font-black text-neutral-900 leading-tight uppercase tracking-tight truncate pr-2">{product.name}</h3>
                           <p className="text-sm font-black text-emerald-600 whitespace-nowrap">Rp {product.price.toLocaleString('id-ID')}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</p>
                     </div>

                     {/* Stock / Pre-order Progress */}
                     <div>
                        {product.type === 'ready' ? (
                           <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                              <span className="flex items-center gap-1.5"><Package size={14} className="text-gray-300" /> Sisa Stok</span>
                              <span className="text-neutral-900 shrink-0">{product.stock} {product.unit}</span>
                           </div>
                        ) : (
                           <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                 <span className="text-gray-400">Terpesan</span>
                                 <span className="text-amber-600">{product.booked} / {product.stock} {product.unit}</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000" style={{ width: `${(product.booked / product.stock) * 100}%` }}></div>
                              </div>
                           </div>
                        )}
                     </div>

                     {/* Actions */}
                     <div className="flex gap-2 pt-2 border-t border-gray-50 uppercase tracking-widest text-[10px] font-black">
                        <button
                           onClick={() => {
                              setSelectedProduct(product);
                              setFormData(product);
                              setShowEditModal(true);
                           }}
                           className="flex-1 py-3 bg-gray-50 hover:bg-neutral-900 hover:text-white rounded-[6px] transition-all flex items-center justify-center gap-2"
                        >
                           <Edit2 size={12} /> Edit
                        </button>
                        {product.daysAgo >= 2 && product.status && product.type === 'ready' ? (
                           <button
                              onClick={() => {
                                 setSelectedProduct(product);
                                 setShowObralModal(true);
                              }}
                              className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-neutral-900 rounded-[6px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-100"
                           >
                              <Zap size={12} /> Obral
                           </button>
                        ) : (
                           <button
                              onClick={() => {
                                 setSelectedProduct(product);
                                 setShowDeleteModal(true);
                              }}
                              className="p-3 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-[6px] transition-all text-gray-400"
                           >
                              <Trash2 size={14} />
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            ))}

            {filteredProducts.length === 0 && (
               <div className="col-span-full py-24 bg-white rounded-[6px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                  <Package size={48} className="text-gray-200 mb-4" />
                  <p className="text-sm font-bold text-gray-400">Tidak ada produk yang ditemukan.</p>
               </div>
            )}
         </div>

         {/* --- MODALS --- */}

         {/* 1. Tambah/Edit Produk Baru Modal */}
         {(showAddModal || showEditModal) && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}></div>
               <div className="bg-white rounded-[6px] w-full max-w-2xl relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden">
                  {/* Modal Header */}
                  <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-900 rounded-[6px] flex items-center justify-center text-white">
                           {showAddModal ? <Leaf size={24} /> : <Edit2 size={24} />}
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">{showAddModal ? 'Tambah Hasil Bumi' : 'Edit Hasil Bumi'}</h3>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lengkapi Detail Panen Anda</p>
                        </div>
                     </div>
                     <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="p-2 hover:bg-gray-100 rounded-[6px] transition-colors">
                        <X size={24} className="text-gray-400" />
                     </button>
                  </div>

                  {/* Modal Body */}
                  <form onSubmit={showAddModal ? handleAddProduct : handleEditProduct} className="p-10 space-y-8 h-[600px] overflow-y-auto custom-scrollbar">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                           onClick={handleCapture}
                           className="aspect-square bg-neutral-900 rounded-[6px] flex flex-col items-center justify-center text-white cursor-pointer group hover:bg-black transition-all border-4 border-white shadow-2xl relative overflow-hidden"
                        >
                           {isCapturing ? (
                              <div className="flex flex-col items-center gap-2">
                                 <Loader2 size={32} className="animate-spin text-amber-400" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">Menangkap Gambar...</span>
                              </div>
                           ) : (
                              <>
                                 <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-all" />
                                 <div className="relative z-10 flex flex-col items-center">
                                    <Camera size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest px-4 text-center">Update Foto Produk</span>
                                 </div>
                              </>
                           )}
                        </div>
                        <div className="md:col-span-2 space-y-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nama Komoditas</label>
                              <input
                                 type="text"
                                 required
                                 value={formData.name}
                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                 placeholder="Misal: Tomat Ceri Gred A"
                                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Kategori Produk</label>
                              <select
                                 required
                                 value={formData.category}
                                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                              >
                                 <option value="">Pilih Kategori</option>
                                 <option value="Sayuran Daun">Sayuran Daun</option>
                                 <option value="Sayuran Buah">Sayuran Buah</option>
                                 <option value="Umbi-umbian">Umbi-umbian</option>
                                 <option value="Buah-buahan">Buah-buahan</option>
                              </select>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2 relative group">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Harga per Kg (Rp)</label>
                           <div className="relative">
                              <input
                                 type="number"
                                 required
                                 value={formData.price}
                                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                 placeholder="0"
                                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                              />
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">/ Kg</div>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Jumlah {formData.unit}</label>
                           <input
                              type="number"
                              required
                              value={formData.stock}
                              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                              placeholder="0"
                              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[6px] text-sm font-bold outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                           />
                        </div>
                     </div>

                     <div className="bg-neutral-900 rounded-[6px] p-6 flex items-center gap-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl"></div>
                        <div className="w-14 h-14 bg-amber-400 rounded-[6px] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                           <Bot size={28} className="text-neutral-900" />
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-400 font-bold leading-none mb-1 uppercase tracking-tighter">AI AgriBot Rekomendasi</p>
                           <p className="text-[10px] text-white font-medium leading-relaxed italic">
                              "Berdasarkan analisis tren, {formData.name || 'produk Anda'} sebaiknya dihargai di kisaran <span className="text-amber-400 font-black">Rp {Math.round(formData.price * 1.05 || 15000).toLocaleString()}</span> untuk ROI maksimal."
                           </p>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Pilih Model Bisnis</label>
                        <div className="grid grid-cols-2 gap-4">
                           <button
                              type="button"
                              onClick={() => setFormData({ ...formData, type: 'ready' })}
                              className={`p-6 border-2 rounded-[6px] text-center space-y-2 transition-all ${formData.type === 'ready' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-white'}`}
                           >
                              <div className={`w-10 h-10 rounded-[6px] mx-auto flex items-center justify-center ${formData.type === 'ready' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
                                 <Package size={20} />
                              </div>
                              <p className="text-xs font-black text-neutral-900 uppercase tracking-tight">Eceran / Stok Ready</p>
                           </button>
                           <button
                              type="button"
                              onClick={() => setFormData({ ...formData, type: 'preorder', harvestDate: '26 Mar 2026', booked: 0 })}
                              className={`p-6 border-2 rounded-[6px] text-center space-y-2 transition-all ${formData.type === 'preorder' ? 'border-amber-400 bg-amber-50' : 'border-gray-100 bg-white'}`}
                           >
                              <div className={`w-10 h-10 rounded-[6px] mx-auto flex items-center justify-center ${formData.type === 'preorder' ? 'bg-amber-100 text-amber-600' : 'bg-gray-50 text-gray-400'}`}>
                                 <Calendar size={20} />
                              </div>
                              <p className="text-xs font-black text-neutral-900 uppercase tracking-tight">Metode Panen Besok</p>
                           </button>
                        </div>
                     </div>

                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-neutral-900 hover:bg-black text-white rounded-[6px] font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                     >
                        {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
                        {isSubmitting ? 'Memproses Data...' : (showAddModal ? 'Posting Hasil Panen' : 'Simpan Perubahan')}
                     </button>
                  </form>
               </div>
            </div>
         )}

         {/* 2. Hapus Produk Confirmation */}
         {showDeleteModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowDeleteModal(false)}></div>
               <div className="bg-white rounded-[6px] p-12 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 text-center">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                     <AlertTriangle size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-2">Hapus Produk?</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase mb-8">Anda akan menghapus <span className="text-neutral-900 text-sm">{selectedProduct?.name}</span> dari gudang.</p>

                  <div className="grid grid-cols-2 gap-4 uppercase tracking-widest text-[10px] font-black">
                     <button
                        onClick={() => setShowDeleteModal(false)}
                        className="py-4 bg-gray-50 hover:bg-gray-100 text-gray-400 rounded-[6px] transition-all"
                     >
                        Batal
                     </button>
                     <button
                        onClick={handleDeleteProduct}
                        className="py-4 bg-red-500 hover:bg-red-600 text-white rounded-[6px] shadow-lg shadow-red-100 transition-all"
                     >
                        Ya, Hapus
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 3. Obral Cepat Modal */}
         {showObralModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowObralModal(false)}></div>
               <div className="bg-white rounded-[6px] p-12 w-full max-w-md relative z-10 shadow-2xl animate-in zoom-in-95 duration-500 text-center">
                  <div className="w-24 h-24 bg-amber-400 text-neutral-900 rounded-[6px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-200 rotate-12">
                     <Zap size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tighter mb-4 leading-none">Obral Cepat <br />& Bantu Warga!</h2>
                  <p className="text-sm text-gray-500 font-medium mb-10 leading-relaxed px-2">
                     Sistem akan memotong harga <span className="text-emerald-600 font-black">20%</span> dan mengirimkan notifikasi ke pelanggan di radius <span className="font-black text-neutral-900">5 KM</span> dari Anda. Produk akan diprioritaskan di dashboard pelanggan!
                  </p>

                  <div className="space-y-4">
                     <button
                        onClick={confirmObral}
                        className="w-full py-5 bg-neutral-900 hover:bg-black text-white rounded-[6px] font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                     >
                        <Zap size={18} /> Aktifkan Obral Sekarang!
                     </button>
                     <button
                        onClick={() => setShowObralModal(false)}
                        className="w-full py-5 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-[6px] font-black uppercase tracking-widest text-xs transition-all"
                     >
                        Batal, Tunggu Dulu
                     </button>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default FarmerInventory;





