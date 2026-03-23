import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Settings, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-white shadow-sm">
        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
          <Settings size={22} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">System Overview</h2>
          <p className="text-slate-500 text-sm">Welcome {user?.fullName || 'Agri Admin'}, manage all platform activities from here.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px] text-center">
          <Users size={48} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-700">User Management</h3>
          <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">Access control and verification for farmers and buyers will appear in this module.</p>
        </div>
        
        <div className="bg-white rounded-xl border border-emerald-100 p-6 shadow-sm flex flex-col items-center justify-center min-h-[250px] text-center">
            <ShieldAlert size={48} className="text-emerald-200 mb-4" />
            <h3 className="text-lg font-bold text-emerald-800 tracking-tight">System Status Secure</h3>
            <p className="text-sm text-emerald-600 mt-2 max-w-xs mx-auto">Platform running normally. No security incidents reported.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
