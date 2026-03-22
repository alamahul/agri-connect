import { createBrowserRouter, Navigate } from 'react-router-dom';
import FarmerLayout from './layouts/FarmerLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/DashboardPetani';
import Gudang from './pages/GudangProduk';
import Pesanan from './pages/ManajemenPesanan';
import Analisis from './pages/AnalisisPenjualan';
import Profil from './pages/ProfilPetani';
import Bantuan from './pages/BantuanPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPembeli from './pages/DashboardPembeli';
import DashboardAdmin from './pages/DashboardAdmin';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login/petani',
    element: <LoginPage role="petani" />,
  },
  {
    path: '/login/pembeli',
    element: <LoginPage role="pembeli" />,
  },
  {
    path: '/login/admin',
    element: <LoginPage role="admin" />,
  },
  {
    path: '/register',
    element: <Navigate to="/register/petani" replace />,
  },
  {
    path: '/register/petani',
    element: <RegisterPage role="petani" />,
  },
  {
    path: '/register/pembeli',
    element: <RegisterPage role="pembeli" />,
  },
  {
    path: '/petani',
    element: <ProtectedRoute allowedRoles={['petani']} />,
    children: [
      {
        path: '',
        element: <FarmerLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'gudang', element: <Gudang /> },
          { path: 'pesanan', element: <Pesanan /> },
          { path: 'analisis', element: <Analisis /> },
          { path: 'profil', element: <Profil /> },
          { path: 'bantuan', element: <Bantuan /> },
        ]
      }
    ],
  },
  {
    path: '/pembeli',
    element: <ProtectedRoute allowedRoles={['pembeli']} />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPembeli /> }
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardAdmin /> }
    ],
  }
]);

export default router;