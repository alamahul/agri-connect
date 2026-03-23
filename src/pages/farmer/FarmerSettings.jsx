import { useState } from 'react';
import {
  User, MapPin, Phone, Mail, Calendar, Edit3,
  Sprout, Award, ShoppingBag, TrendingUp, Camera
} from 'lucide-react';

const profilStats = [
  { label: 'Total Products', value: '48', icon: Sprout, color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Orders Completed', value: '130', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
  { label: 'Total Revenue', value: 'Rp 45 M', icon: TrendingUp, color: 'bg-amber-100 text-amber-600' },
  { label: 'Store Rating', value: '4.8 ★', icon: Award, color: 'bg-violet-100 text-violet-600' },
];

const FarmerSettings = () => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nama: 'Mr. Hendra Kusuma',
    email: 'farmer@agriconnect.id',
    phone: '+62 812-3456-7890',
    lokasi: 'Kab. Malang, East Java',
    lahan: '5.2 Hectares',
    bergabung: 'March 2024',
    bio: 'Active farmer with over 15 years of experience in rice and organic vegetable farming.',
  });

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-800">My Profile</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage your account information and farmer profile</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Card */}
        <div className="bg-white rounded-[6px] border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
              <Camera size={12} className="text-slate-500" />
            </button>
          </div>
          <h3 className="text-sm font-bold text-slate-800">{form.nama}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Land Owner — Active Farmer</p>
          <span className="mt-2 inline-block bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-3 py-0.5 rounded-[6px]">
            Verified ✓
          </span>

          <div className="mt-5 grid grid-cols-2 gap-2 w-full">
            {profilStats.map((s) => (
              <div key={s.label} className={`${s.color} rounded-[6px] p-2.5 flex flex-col items-center`}>
                <s.icon size={14} />
                <p className="text-sm font-bold mt-1">{s.value}</p>
                <p className="text-[10px] font-medium mt-0.5 opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Form */}
        <div className="lg:col-span-2 bg-white rounded-[6px] border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-sm font-semibold text-slate-800">Account Information</h4>
            <button
              onClick={() => setEditMode((v) => !v)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-[6px] transition-colors ${editMode ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Edit3 size={12} />
              {editMode ? 'Save' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Full Name</label>
              {editMode ? (
                <input value={form.nama} onChange={handleChange('nama')}
                  className="w-full px-3 py-2 border border-slate-200 rounded-[6px] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              ) : (
                <div className="flex items-center gap-2 text-sm text-slate-800">
                  <User size={14} className="text-slate-400" /> {form.nama}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Email</label>
                {editMode ? (
                  <input value={form.email} onChange={handleChange('email')} type="email"
                    className="w-full px-3 py-2 border border-slate-200 rounded-[6px] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <Mail size={14} className="text-slate-400" /> {form.email}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Phone Number</label>
                {editMode ? (
                  <input value={form.phone} onChange={handleChange('phone')}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[6px] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <Phone size={14} className="text-slate-400" /> {form.phone}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Location</label>
                {editMode ? (
                  <input value={form.lokasi} onChange={handleChange('lokasi')}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[6px] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <MapPin size={14} className="text-slate-400" /> {form.lokasi}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Land Area</label>
                {editMode ? (
                  <input value={form.lahan} onChange={handleChange('lahan')}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[6px] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <Sprout size={14} className="text-slate-400" /> {form.lahan}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Bio</label>
              {editMode ? (
                <textarea value={form.bio} onChange={handleChange('bio')} rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-[6px] text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none" />
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed">{form.bio}</p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
              <Calendar size={13} />
              Joined since {form.bergabung}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSettings;
