import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import file yang baru saja Anda simpan
import FarmerLayout from './layouts/FarmerLayout';
import FarmerDashboard from './pages/FarmerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute khusus Petani */}
        <Route path="/petani" element={<FarmerLayout />}>
          {/* Default route akan langsung diarahkan ke dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FarmerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
