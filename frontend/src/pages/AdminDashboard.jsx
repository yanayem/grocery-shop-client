import React, { useState, useEffect } from 'react';
import {
  Package, ShoppingCart, Users, LayoutDashboard, Plus, Edit, Trash2,
  Search, CheckCircle, Clock, XCircle, Grid, Ticket, Image as ImageIcon,
  MessageSquare, Settings as SettingsIcon, HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Orders', value: '124', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Products', value: '45', icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Users', value: '890', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Revenue', value: '৳45,200', icon: LayoutDashboard, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] bg-gray-50">
      {/* Admin Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-65px)] sticky top-[65px]">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mb-4">Main Menu</h2>

        <SidebarItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={LayoutDashboard} label="Dashboard" />
        <SidebarItem active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={ShoppingCart} label="Orders" />
        <SidebarItem active={activeTab === 'products'} onClick={() => setActiveTab('products')} icon={Package} label="Products" />
        <SidebarItem active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} icon={Grid} label="Categories" />

        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mt-6 mb-4">Marketing & Users</h2>
        <SidebarItem active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={Users} label="Users" />
        <SidebarItem active={activeTab === 'coupons'} onClick={() => setActiveTab('coupons')} icon={Ticket} label="Coupons" />
        <SidebarItem active={activeTab === 'banners'} onClick={() => setActiveTab('banners')} icon={ImageIcon} label="Banners" />

        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 mt-6 mb-4">Support</h2>
        <SidebarItem active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} icon={MessageSquare} label="Messages" />
        <SidebarItem active={activeTab === 'faqs'} onClick={() => setActiveTab('faqs')} icon={HelpCircle} label="FAQs" />
        <SidebarItem active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={SettingsIcon} label="Settings" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardHome stats={stats} />}
        {activeTab === 'orders' && <OrdersManager />}
        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'categories' && <CategoriesManager />}
        {activeTab === 'users' && <UsersManager />}
        {activeTab === 'coupons' && <CouponsManager />}
        {activeTab === 'banners' && <BannersManager />}
        {activeTab === 'messages' && <MessagesManager />}
        {activeTab === 'faqs' && <FaqsManager />}
        {activeTab === 'settings' && <SettingsManager />}
      </div>
    </div>
  );
};

const SidebarItem = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 transition-all text-left font-bold rounded-xl ${active ? 'bg-primary text-white shadow-lg shadow-green-900/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
  >
    <Icon size={18} />
    <span className="text-sm">{label}</span>
  </button>
);

const DashboardHome = ({ stats }) => (
  <div className="animate-in fade-in duration-500">
    <h1 className="text-2xl font-black text-gray-800 mb-8">Business Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
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
      <RecentOrdersCard />
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold mb-6 text-gray-800 border-b border-gray-50 pb-4">Inventory Alerts</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <p className="font-bold text-gray-800 text-sm">Roma Tomatoes</p>
            <span className="text-xs font-black text-red-500 bg-red-50 px-2.5 py-1 rounded-full uppercase">Low Stock (2kg)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RecentOrdersCard = () => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
    <h3 className="text-lg font-bold mb-6 text-gray-800 border-b border-gray-50 pb-4">Recent Orders</h3>
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
          <div>
            <p className="font-bold text-gray-800 text-sm">Order #GF-2024-{i}</p>
            <p className="text-xs text-gray-400 font-medium">Customer: Rahim Ahmed</p>
          </div>
          <span className="text-xs font-black text-primary bg-green-50 px-2.5 py-1 rounded-full uppercase">Pending</span>
        </div>
      ))}
    </div>
  </div>
);

const OrdersManager = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-black text-gray-800">Order Management</h1>
      <SearchBox placeholder="Search Order ID..." />
    </div>
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Total</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[1, 2, 3].map(i => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-bold text-sm text-gray-700">#GF-24-00{i}</td>
              <td className="p-4">
                <p className="font-bold text-sm text-gray-800">John Doe</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">john@example.com</p>
              </td>
              <td className="p-4 font-black text-gray-800">৳540</td>
              <td className="p-4"><StatusBadge status="pending" /></td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <ActionButton icon={CheckCircle} color="text-primary" />
                  <ActionButton icon={XCircle} color="text-red-400" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProductsManager = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-black text-gray-800">Product Inventory</h1>
      <div className="flex gap-4">
        <SearchBox placeholder="Search products..." />
        <PrimaryButton icon={Plus} label="ADD PRODUCT" />
      </div>
    </div>
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[1, 2, 3].map(i => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                <span className="font-bold text-sm text-gray-800">Organic Banana</span>
              </td>
              <td className="p-4 text-xs font-bold text-gray-500 uppercase tracking-tight">Fruits</td>
              <td className="p-4 font-black text-primary">৳120/dz</td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-2">
                  <ActionButton icon={Edit} color="text-blue-400" />
                  <ActionButton icon={Trash2} color="text-red-400" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CategoriesManager = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-black text-gray-800">Categories</h1>
      <PrimaryButton icon={Plus} label="NEW CATEGORY" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {['Vegetables', 'Meat & Fish', 'Fruits', 'Dairy', 'Bakery'].map((cat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
          <div>
            <h4 className="font-black text-gray-800">{cat}</h4>
            <p className="text-xs text-gray-400 font-bold uppercase">12 Sub-categories</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><Edit size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UsersManager = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-black text-gray-800">User Base</h1>
      <SearchBox placeholder="Search by name or email..." />
    </div>
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">User</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Role</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Joined</th>
            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[1, 2, 3].map(i => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4">
                <p className="font-bold text-sm text-gray-800">Asif Rahman</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">asif@mail.com</p>
              </td>
              <td className="p-4"><span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Customer</span></td>
              <td className="p-4 text-xs text-gray-500 font-medium">12 Oct, 2023</td>
              <td className="p-4 text-center">
                <ActionButton icon={Trash2} color="text-red-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CouponsManager = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-black text-gray-800">Discount Coupons</h1>
      <PrimaryButton icon={Plus} label="CREATE COUPON" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {['SAVE20', 'WELCOME100', 'FRIDAY50'].map((code, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-primary tracking-tighter">{code}</h3>
            <p className="text-xs text-gray-500 font-bold">Expires: 31 Dec, 2024</p>
          </div>
          <span className="text-sm font-black text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">20% OFF</span>
        </div>
      ))}
    </div>
  </div>
);

const BannersManager = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-black text-gray-800">Home Banners</h1>
      <PrimaryButton icon={Plus} label="ADD BANNER" />
    </div>
    <div className="space-y-4">
       {[1, 2].map(i => (
         <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-6 items-center shadow-sm">
           <div className="w-48 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-gray-300">
              <ImageIcon size={32} />
           </div>
           <div className="flex-1">
              <h4 className="font-bold text-gray-800">Summer Sale Banner</h4>
              <p className="text-xs text-gray-400 uppercase font-black">Link: /category/fruits</p>
           </div>
           <div className="flex gap-2 mr-4">
              <ActionButton icon={Edit} color="text-gray-400" />
              <ActionButton icon={Trash2} color="text-red-400" />
           </div>
         </div>
       ))}
    </div>
  </div>
);

const MessagesManager = () => (
  <div className="animate-in fade-in duration-500">
    <h1 className="text-2xl font-black text-gray-800 mb-8">Customer Messages</h1>
    <div className="space-y-4">
      {[1, 2].map(i => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
             <div>
               <h4 className="font-bold text-gray-800">Sabbir Ahmed</h4>
               <p className="text-xs text-primary font-black uppercase">sabbir@example.com</p>
             </div>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">2 Hours Ago</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50 p-4 rounded-xl">
             "I am having trouble with my recent order payment. Can you please check if it was successful?"
          </p>
        </div>
      ))}
    </div>
  </div>
);

const FaqsManager = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-black text-gray-800">FAQ Management</h1>
      <PrimaryButton icon={Plus} label="ADD FAQ" />
    </div>
    <div className="space-y-4">
       {[1, 2, 3].map(i => (
         <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <p className="font-bold text-gray-700">How to track my order?</p>
            <div className="flex gap-2">
               <ActionButton icon={Edit} color="text-gray-400" />
               <ActionButton icon={Trash2} color="text-red-400" />
            </div>
         </div>
       ))}
    </div>
  </div>
);

const SettingsManager = () => (
  <div className="animate-in fade-in duration-500">
    <h1 className="text-2xl font-black text-gray-800 mb-8">Global Settings</h1>
    <div className="max-w-2xl bg-white p-10 rounded-2xl border border-gray-100 shadow-sm space-y-8">
       <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Shop Name</label>
          <input type="text" className="w-full p-4 bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary rounded-xl font-bold" defaultValue="GroceryFresh" />
       </div>
       <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Delivery Fee (৳)</label>
          <input type="number" className="w-full p-4 bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary rounded-xl font-bold" defaultValue="45" />
       </div>
       <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Shop Phone</label>
          <input type="tel" className="w-full p-4 bg-gray-50 border-none outline-none focus:ring-2 focus:ring-primary rounded-xl font-bold" defaultValue="+880 1700000000" />
       </div>
       <button className="w-full py-5 bg-primary text-white font-black rounded-xl shadow-xl shadow-green-900/10 hover:bg-secondary transition-all">SAVE ALL SETTINGS</button>
    </div>
  </div>
);

// Shared UI Components
const SearchBox = ({ placeholder }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    <input type="text" placeholder={placeholder} className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none focus:border-primary text-sm font-medium w-64 shadow-sm" />
  </div>
);

const PrimaryButton = ({ icon: Icon, label }) => (
  <button className="bg-primary text-white py-2.5 px-6 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-green-900/10">
    <Icon size={18} /> {label}
  </button>
);

const ActionButton = ({ icon: Icon, color }) => (
  <button className={`p-2 hover:bg-gray-100 rounded-lg transition-all ${color}`}>
    <Icon size={18} />
  </button>
);

const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-orange-50 text-orange-500',
    delivered: 'bg-green-50 text-primary',
    cancelled: 'bg-red-50 text-red-500',
  };
  return (
    <div className={`flex items-center gap-1.5 ${styles[status] || styles.pending} px-3 py-1 rounded-full w-fit`}>
      <Clock size={12} />
      <span className="text-[10px] font-black uppercase">{status}</span>
    </div>
  );
};

export default AdminDashboard;
