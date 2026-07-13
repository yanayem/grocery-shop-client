import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Users, LayoutDashboard, Plus, Edit, Trash2, Search, CheckCircle, Clock, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock stats for dashboard
  const stats = [
    { label: 'Total Orders', value: '124', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Products', value: '45', icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Users', value: '890', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Revenue', value: '৳45,200', icon: LayoutDashboard, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-gray-50">
      {/* Admin Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col p-4 space-y-2">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-4">Admin Panel</h2>

        <SidebarItem
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
          icon={LayoutDashboard}
          label="Dashboard"
        />
        <SidebarItem
          active={activeTab === 'orders'}
          onClick={() => setActiveTab('orders')}
          icon={ShoppingCart}
          label="Orders"
        />
        <SidebarItem
          active={activeTab === 'products'}
          onClick={() => setActiveTab('products')}
          icon={Package}
          label="Products"
        />
        <SidebarItem
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
          icon={Users}
          label="Users"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-2xl font-black text-gray-800 mb-8">Business Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-none border border-gray-100 shadow-sm flex items-center gap-5">
                  <div className={`${stat.bg} ${stat.color} p-4`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-black text-gray-800">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-none border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-gray-800 border-b border-gray-50 pb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Order #GF-2024-{i}</p>
                        <p className="text-xs text-gray-400 font-medium">Customer: Rahim Ahmed</p>
                      </div>
                      <span className="text-xs font-black text-primary bg-green-50 px-2.5 py-1 uppercase">Pending</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-none border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-gray-800 border-b border-gray-50 pb-4">Inventory Alerts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <p className="font-bold text-gray-800 text-sm">Roma Tomatoes</p>
                    <span className="text-xs font-black text-red-500 bg-red-50 px-2.5 py-1 uppercase">Low Stock (2kg)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && <OrdersManager />}
        {activeTab === 'products' && <ProductsManager />}
      </div>
    </div>
  );
};

const SidebarItem = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3.5 transition-all text-left font-bold ${active ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
  >
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </button>
);

const OrdersManager = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-gray-800">Order Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Order ID..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 outline-none focus:border-primary text-sm font-medium w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Total</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Payment</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-bold text-sm text-gray-700">#GF-24-00{i}</td>
                <td className="p-4">
                  <p className="font-bold text-sm text-gray-800">John Doe</p>
                  <p className="text-[10px] text-gray-400 font-bold">john@example.com</p>
                </td>
                <td className="p-4 font-black text-gray-800">৳540</td>
                <td className="p-4">
                  <span className="text-[10px] font-black uppercase text-gray-500 bg-gray-100 px-2 py-1">bKash</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-orange-500">
                    <Clock size={14} />
                    <span className="text-[10px] font-black uppercase">Pending</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-primary hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                      <CheckCircle size={18} />
                    </button>
                    <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Cancel">
                      <XCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductsManager = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-gray-800">Product Inventory</h1>
        <button className="bg-primary text-white py-2.5 px-6 font-bold flex items-center gap-2 hover:bg-secondary transition-all">
          <Plus size={18} /> ADD NEW PRODUCT
        </button>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Stock</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-none flex-shrink-0"></div>
                  <span className="font-bold text-sm text-gray-800">Fresh Roma Tomatoes</span>
                </td>
                <td className="p-4 text-xs font-bold text-gray-500 uppercase">Vegetables</td>
                <td className="p-4 font-black text-primary">৳60 / kg</td>
                <td className="p-4">
                   <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[70%]"></div>
                   </div>
                   <span className="text-[10px] font-black text-gray-400 mt-1 block">70 Units Left</span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
