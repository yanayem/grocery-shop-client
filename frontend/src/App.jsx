import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Admin Login Page */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Panel Routes */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />

        {/* User Panel / Public Shop */}
        <Route path="/*" element={<UserLayout />} />
      </Routes>
    </>
  );
}

export default App;
