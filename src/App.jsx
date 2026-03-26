import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import CartPage from './pages/CartPage';
import ProductCatalog from './pages/ProductCatalog';
import DetailProduct from './pages/DetailProduct';
import NewsPage from './pages/NewsPage';

// Auth pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';

// Layouts
import FarmerLayout from './layouts/FarmerLayout';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Session
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerPreOrder from './pages/customer/CustomerPreOrder';
import CustomerHistory from './pages/customer/CustomerHistory';
import CustomerHelp from './pages/customer/CustomerHelp';
import CustomerSettings from './pages/customer/CustomerSettings';
import CustomerNotifications from './pages/customer/CustomerNotifications';

// Farmer Session
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerInventory from './pages/farmer/FarmerInventory';
import FarmerOrders from './pages/farmer/FarmerOrders';
import FarmerAnalytics from './pages/farmer/FarmerAnalytics';
import FarmerHelp from './pages/farmer/FarmerHelp';
import FarmerSettings from './pages/farmer/FarmerSettings';
import FarmerNotifications from './pages/farmer/FarmerNotifications';

// Admin Panel
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminArticles from './pages/admin/AdminArticles';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminHelp from './pages/admin/AdminHelp';
import AdminSettings from './pages/admin/AdminSettings';
import AdminData from './pages/admin/AdminData';
import AdminNotifications from './pages/admin/AdminNotifications';

// Error pages
import Error404 from './pages/Error404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/detail-product" element={<DetailProduct />} />
        <Route path="/berita" element={<NewsPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminAgriConnect/login" element={<AdminLoginPage />} />

        {/* Farmer Session */}
        <Route path="/petani" element={<FarmerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FarmerDashboard />} />
          <Route path="inventory" element={<FarmerInventory />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="analytics" element={<FarmerAnalytics />} />
          <Route path="help" element={<FarmerHelp />} />
          <Route path="settings" element={<FarmerSettings />} />
          <Route path="notifications" element={<FarmerNotifications />} />
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
          <Route path="notifications" element={<CustomerNotifications />} />
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
          <Route path="data" element={<AdminData />} />
          <Route path="notifications" element={<AdminNotifications />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;