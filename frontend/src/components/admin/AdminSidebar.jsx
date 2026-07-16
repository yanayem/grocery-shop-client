import React from 'react';
import {
  Package, ShoppingCart, Users, LayoutDashboard, Grid, Ticket,
  Image as ImageIcon, MessageSquare, Settings as SettingsIcon,
  HelpCircle, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { id: 'products', label: 'Products', icon: Package, path: '/admin/products' },
    { id: 'categories', label: 'Categories', icon: Grid, path: '/admin/categories' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
    { id: 'coupons', label: 'Coupons', icon: Ticket, path: '/admin/coupons' },
    { id: 'banners', label: 'Banners', icon: ImageIcon, path: '/admin/banners' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle, path: '/admin/faqs' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-50 mb-4 cursor-pointer" onClick={() => navigate('/')}>
        <h1 className="text-xl font-black text-primary tracking-tighter uppercase italic">
          Grocery<span className="text-gray-800">Admin</span>
        </h1>
      </div>

      <div className="flex-1 px-4 space-y-1 overflow-y-auto">
        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 mb-2 mt-2">Control Panel</h2>
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/admin/dashboard'}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-4 py-3 transition-all text-left font-bold rounded-xl ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-green-900/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            <item.icon size={18} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 transition-all font-bold rounded-xl"
        >
          <LogOut size={18} />
          <span className="text-sm uppercase tracking-wider">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
