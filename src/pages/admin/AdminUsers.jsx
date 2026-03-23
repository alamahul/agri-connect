import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';
import { ADMIN_USERS } from '../../data/dummyAdmin';

const statusColor = {
  "Aktif": "bg-agri-100 text-agri-700",
  "Menunggu Verifikasi": "bg-amber-100 text-amber-700",
  "Diblokir": "bg-red-100 text-red-700",
};

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [users, setUsers] = useState(ADMIN_USERS);

  const toggleBlock = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'Diblokir' ? 'Aktif' : 'Diblokir' } : u
    ));
  };

  const verify = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: 'Aktif', verified: true } : u
    ));
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Semua' || u.role === filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-sm text-gray-500">Verifikasi, kelola, dan pantau akun seluruh pengguna.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded border border-amber-200">
            <AlertTriangle size={14} className="text-amber-600" />
            <span className="text-xs font-bold text-amber-700">{users.filter(u => u.status === 'Menunggu Verifikasi').length} Menunggu Verifikasi</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Cari nama atau lokasi..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded focus:ring-2 focus:ring-agri-500 outline-none text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['Semua', 'Petani', 'Pelanggan', 'Menunggu Verifikasi', 'Diblokir'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded text-xs font-semibold transition-all ${filter === f ? 'bg-slate-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table — turns to card view on mobile */}
      <div className="bg-white rounded border border-gray-100 shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Pengguna</th>
                <th className="px-6 py-4 font-semibold">Peran</th>
                <th className="px-6 py-4 font-semibold">Lokasi</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Bergabung</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-agri-100 flex items-center justify-center text-agri-700 font-bold text-sm flex-shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{u.name}</p>
                        {u.verified && <div className="flex items-center gap-1 text-[10px] text-agri-600"><Shield size={9} /> Terverifikasi</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded ${u.role === 'Petani' ? 'bg-agri-50 text-agri-700' : 'bg-blue-50 text-blue-700'}`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{u.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${statusColor[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{u.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {u.status === 'Menunggu Verifikasi' && (
                        <button onClick={() => verify(u.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-agri-600 hover:bg-agri-700 text-white text-xs font-bold rounded transition-all">
                          <CheckCircle size={12} /> Verifikasi
                        </button>
                      )}
                      <button onClick={() => toggleBlock(u.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded transition-all ${u.status === 'Diblokir' ? 'bg-agri-50 text-agri-700 hover:bg-agri-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                        <XCircle size={12} /> {u.status === 'Diblokir' ? 'Buka Blokir' : 'Blokir'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {filtered.map(u => (
            <div key={u.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-agri-100 flex items-center justify-center text-agri-700 font-bold">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.location} · {u.joined}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${statusColor[u.status]}`}>{u.status}</span>
              </div>
              <div className="flex gap-2">
                {u.status === 'Menunggu Verifikasi' && (
                  <button onClick={() => verify(u.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-agri-600 text-white text-xs font-bold rounded">
                    <CheckCircle size={12} /> Verifikasi
                  </button>
                )}
                <button onClick={() => toggleBlock(u.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded ${u.status === 'Diblokir' ? 'bg-agri-50 text-agri-700' : 'bg-red-50 text-red-600'}`}>
                  <XCircle size={12} /> {u.status === 'Diblokir' ? 'Buka Blokir' : 'Blokir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
