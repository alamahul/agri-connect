import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

// Layouts
import FarmerLayout from './layouts/FarmerLayout';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

// Farmer Session (File names are English, but paths are Indonesian)
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerInventory from './pages/farmer/FarmerInventory';
import FarmerOrders from './pages/farmer/FarmerOrders';
import FarmerAnalytics from './pages/farmer/FarmerAnalytics';
import FarmerHelp from './pages/farmer/FarmerHelp';
import FarmerSettings from './pages/farmer/FarmerSettings';

// Customer Session
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerPreOrder from './pages/customer/CustomerPreOrder';
import CustomerHistory from './pages/customer/CustomerHistory';
import CustomerHelp from './pages/customer/CustomerHelp';
import CustomerSettings from './pages/customer/CustomerSettings';

// Admin Panel
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminArticles from './pages/admin/AdminArticles';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminHelp from './pages/admin/AdminHelp';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Farmer Session */}
        <Route path="/petani" element={<FarmerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="inventory" element={<FarmerInventory />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="analytics" element={<FarmerAnalytics />} />
          <Route path="help" element={<FarmerHelp />} />
          <Route path="settings" element={<FarmerSettings />} />
        </Route>

        {/* Customer Session */}
        <Route path="/pelanggan" element={<CustomerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="preorder" element={<CustomerPreOrder />} />
          <Route path="history" element={<CustomerHistory />} />
          <Route path="help" element={<CustomerHelp />} />
          <Route path="settings" element={<CustomerSettings />} />
        </Route>

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="help" element={<AdminHelp />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;