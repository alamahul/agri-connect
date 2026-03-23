import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, Search } from 'lucide-react';
import { ADMIN_ARTICLES } from '../../data/dummyAdmin';

const AdminArticles = () => {
  const [articles, setArticles] = useState(ADMIN_ARTICLES);
  const [showModal, setShowModal] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Edukasi Petani', status: 'Draft' });

  const openNew = () => { setForm({ title: '', category: 'Edukasi Petani', status: 'Draft' }); setEditArticle(null); setShowModal(true); };
  const openEdit = (a) => { setForm({ title: a.title, category: a.category, status: a.status }); setEditArticle(a.id); setShowModal(true); };
  const deleteArticle = (id) => setArticles(prev => prev.filter(a => a.id !== id));
  const handleSave = () => {
    if (editArticle) {
      setArticles(prev => prev.map(a => a.id === editArticle ? { ...a, ...form } : a));
    } else {
      setArticles(prev => [...prev, { id: Date.now(), ...form, date: '22 Mar 2026', views: 0 }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Artikel</h1>
          <p className="text-sm text-gray-500">Kelola konten edukasi pertanian yang tayang di platform.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-agri-700 hover:bg-agri-800 text-white px-5 py-2.5 rounded font-bold text-sm transition-all shadow-lg shadow-agri-200">
          <Plus size={18} /> Artikel Baru
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map(a => (
          <div key={a.id} className="bg-white rounded border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-1">
                <span className="text-[10px] font-bold text-agri-700 bg-agri-50 px-2.5 py-0.5 rounded uppercase">{a.category}</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase ${a.status === 'Tayang' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span>
              </div>
              <h3 className="font-bold text-gray-900">{a.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{a.date} · <Eye size={10} className="inline" /> {a.views} tayangan</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => openEdit(a)} className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded transition-all">
                <Edit3 size={14} /> Edit
              </button>
              <button onClick={() => deleteArticle(a.id)} className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded transition-all">
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold text-gray-900 mb-6">{editArticle ? 'Edit Artikel' : 'Artikel Baru'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Artikel</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Masukkan judul..." className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Kategori</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full">
                  <option>Edukasi Petani</option>
                  <option>Panduan Pengguna</option>
                  <option>Tips Berbelanja</option>
                  <option>Berita Platform</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full">
                  <option>Draft</option>
                  <option>Tayang</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold text-sm rounded hover:bg-gray-50 transition-all">Batal</button>
                <button onClick={handleSave} className="flex-1 py-3 bg-agri-700 hover:bg-agri-800 text-white font-bold text-sm rounded transition-all">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
