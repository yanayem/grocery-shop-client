import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminDashboard from './AdminDashboard';
import NotFound from '../NotFound';

const AdminLayout = () => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname.split('/').pop();
    if (!path || path === 'admin' || path === 'dashboard') return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title={getTitle()} />
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            {/* If someone goes to /admin, send them to /admin/dashboard */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

            <Route path="/dashboard" element={<AdminDashboard activeSection="dashboard" />} />
            <Route path="/orders" element={<AdminDashboard activeSection="orders" />} />
            <Route path="/products" element={<AdminDashboard activeSection="products" />} />
            <Route path="/categories" element={<AdminDashboard activeSection="categories" />} />
            <Route path="/users" element={<AdminDashboard activeSection="users" />} />
            <Route path="/coupons" element={<AdminDashboard activeSection="coupons" />} />
            <Route path="/banners" element={<AdminDashboard activeSection="banners" />} />
            <Route path="/messages" element={<AdminDashboard activeSection="messages" />} />
            <Route path="/faqs" element={<AdminDashboard activeSection="faqs" />} />
            <Route path="/settings" element={<AdminDashboard activeSection="settings" />} />

            {/* Admin Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
