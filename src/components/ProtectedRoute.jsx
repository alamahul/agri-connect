import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Unauthorised role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect user to their respective dashboards based on role
    if (user.role === 'petani') return <Navigate to="/petani/dashboard" replace />;
    if (user.role === 'pembeli') return <Navigate to="/pembeli/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    // Default fallback
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
