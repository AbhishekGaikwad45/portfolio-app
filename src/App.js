import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Asset/Component/Layout';
import AdminDashboard from './Asset/Component/Admin/AdminDashboard';
import AdminLogin from './Asset/Component/Admin/AdminLogin';
import ProtectedRoute from './Asset/Component/Admin/ProtectedRoute';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <div className="App">
      <PortfolioProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/*" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </div>
  );
}

export default App;
