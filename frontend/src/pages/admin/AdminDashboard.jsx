import React, { useState, useEffect } from 'react';
import {
  Package, ShoppingCart, Users, LayoutDashboard, Plus, Edit, Trash2,
  Search, CheckCircle, Clock, XCircle, Grid, Ticket, Image as ImageIcon,
  MessageSquare, Settings as SettingsIcon, HelpCircle, X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';

const AdminDashboard = ({ activeSection }) => {
  const { getAdminToken } = useAuth();

  // Data lists
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Data currently being edited (null means adding new)
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoading(false);
    };
    loadAllData();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch and sort categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      const data = await response.json();
      const sorted = organizeAsTree(data);
      setCategories(sorted);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Organize categories into Parent > Child order
  const organizeAsTree = (flatList) => {
    const map = {};
    flatList.forEach(item => {
      const itemId = item._id || item.id;
      map[itemId] = { ...item, _id: itemId, id: itemId, children: [] };
    });

    const tree = [];
    flatList.forEach(item => {
      const itemId = item._id || item.id;
      const parentId = item.parent_id;

      if (parentId && map[parentId]) {
        map[parentId].children.push(map[itemId]);
      } else if (item.level === 0 || !parentId) {
        tree.push(map[itemId]);
      }
    });

    const result = [];
    const flatten = (nodes) => {
      nodes.forEach(node => {
        const { children, ...rest } = node;
        result.push(rest);
        if (children.length > 0) flatten(children);
      });
    };
    flatten(tree);
    return result;
  };

  // Open modal to add a new product
  const openAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  // Open modal to edit an existing product
  const openEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  // Open modal to add a new category
  const openAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  // Open modal to edit an existing category
  const openEditCategory = (category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const stats = [
    { label: 'Total Orders', value: '0', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Products', value: products.length.toString(), icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Users', value: '0', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Revenue', value: '৳0', icon: LayoutDashboard, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  if (loading) return <Loader fullPage />;

  return (
    <div className="w-full">
      {activeSection === 'dashboard' && <DashboardHome stats={stats} />}
      {activeSection === 'orders' && <OrdersManager />}
      {activeSection === 'products' && (
        <ProductsManager
          products={products}
          onAddClick={openAddProduct}
          onEditClick={openEditProduct}
          onDelete={fetchProducts}
        />
      )}
      {activeSection === 'categories' && (
        <CategoriesManager
          categories={categories}
          onAddClick={openAddCategory}
          onEditClick={openEditCategory}
          onDelete={fetchCategories}
        />
      )}
      {activeSection === 'users' && <UsersManager />}
      {activeSection === 'coupons' && <CouponsManager />}
      {activeSection === 'banners' && <BannersManager />}
      {activeSection === 'messages' && <MessagesManager />}
      {activeSection === 'faqs' && <FaqsManager />}
      {activeSection === 'settings' && <SettingsManager />}

      {isProductModalOpen && (
        <AddProductModal
          onClose={() => { setIsProductModalOpen(false); setEditingProduct(null); }}
          onSuccess={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
            fetchProducts();
          }}
          categories={categories}
          editData={editingProduct}
        />
      )}

      {isCategoryModalOpen && (
        <AddCategoryModal
          onClose={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
          onSuccess={() => {
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
            fetchCategories();
          }}
          categories={categories}
          editData={editingCategory}
        />
      )}
    </div>
  );
};

// --- Sub-Components (Dashboard Sections) ---

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
      <p className="text-center text-gray-400 py-4 font-bold text-sm">No recent orders found.</p>
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
          <tr>
            <td colSpan="5" className="p-10 text-center text-gray-400 font-bold">No orders found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const ProductsManager = ({ products, onAddClick, onEditClick, onDelete }) => {
  const { getAdminToken } = useAuth();

  // Remove a product from database
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = getAdminToken();
      const response = await fetch(`http://localhost:8000/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Product removed');
        onDelete(); // Refresh list
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-gray-800">Product Inventory</h1>
        <div className="flex gap-4">
          <SearchBox placeholder="Search products..." />
          <PrimaryButton icon={Plus} label="ADD PRODUCT" onClick={onAddClick} />
        </div>
      </div>
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Stock</th>
              <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id || product._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 flex items-center gap-4">
                  <img src={product.image || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                  <span className="font-bold text-sm text-gray-800">{product.name}</span>
                </td>
                <td className="p-4 text-xs font-bold text-gray-500 uppercase tracking-tight">{product.category}</td>
                <td className="p-4 font-black text-primary">৳{product.price}/{product.unit}</td>
                <td className="p-4 font-bold text-gray-700">{product.stock || 0}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <ActionButton icon={Edit} color="text-blue-400" onClick={() => onEditClick(product)} />
                    <ActionButton icon={Trash2} color="text-red-400" onClick={() => handleDelete(product.id || product._id)} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400 font-bold">No products found. Add some!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CategoriesManager = ({ categories, onAddClick, onEditClick, onDelete }) => {
  const { getAdminToken } = useAuth();

  // Remove a category from database
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? Sub-categories might become orphans!')) return;

    try {
      const token = getAdminToken();
      const response = await fetch(`http://localhost:8000/api/admin/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Category deleted');
        onDelete(); // Refresh list
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-gray-800">Category Hierarchy</h1>
        <PrimaryButton icon={Plus} label="NEW CATEGORY" onClick={onAddClick} />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {categories.map((cat) => (
            <div
              key={cat.id || cat._id}
              className="group flex justify-between items-center p-4 transition-all hover:bg-gray-50/50"
              style={{ paddingLeft: `${24 + (cat.level || 0) * 32}px` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 rounded-full flex items-center justify-center ${cat.level === 0 ? 'w-4 h-4' : cat.level === 1 ? 'w-3 h-3' : 'w-2 h-2'}`}
                  style={{ backgroundColor: cat.color || '#10b981' }}
                ></div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-black text-gray-800 ${cat.level === 0 ? 'text-lg' : cat.level === 1 ? 'text-base' : 'text-sm text-gray-600'}`}>
                      {cat.name}
                    </h4>
                    {cat.level === 0 && (
                      <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-tighter">Main</span>
                    )}
                    {cat.level === 1 && (
                      <span className="text-[10px] font-black bg-blue-50 text-blue-500 px-2 py-0.5 rounded uppercase tracking-tighter">Sub</span>
                    )}
                    {cat.level === 2 && (
                      <span className="text-[10px] font-black bg-orange-50 text-orange-500 px-2 py-0.5 rounded uppercase tracking-tighter">Sub-Sub</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cat.slug}</p>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ActionButton icon={Edit} color="text-blue-400" onClick={() => onEditClick(cat)} />
                <ActionButton icon={Trash2} color="text-red-400" onClick={() => handleDelete(cat.id || cat._id)} />
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="p-20 text-center text-gray-400 font-bold">
            No categories found. Click "New Category" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

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
          <tr>
            <td colSpan="4" className="p-10 text-center text-gray-400 font-bold">No users found.</td>
          </tr>
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
      <div className="col-span-full p-10 text-center text-gray-400 font-bold bg-white rounded-2xl border border-dashed">
        No coupons created yet.
      </div>
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
      <div className="p-10 text-center text-gray-400 font-bold bg-white rounded-2xl border border-dashed border-gray-100">
        No active banners found.
      </div>
    </div>
  </div>
);

const MessagesManager = () => (
  <div className="animate-in fade-in duration-500">
    <h1 className="text-2xl font-black text-gray-800 mb-8">Customer Messages</h1>
    <div className="space-y-4">
      <div className="p-10 text-center text-gray-400 font-bold bg-white rounded-2xl border border-gray-100">
        No new messages from customers.
      </div>
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
      <div className="p-10 text-center text-gray-400 font-bold bg-white rounded-2xl border border-gray-100">
        No FAQs added yet.
      </div>
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

// --- Modals & Shared UI Components ---

const AddCategoryModal = ({ onClose, onSuccess, categories, editData }) => {
  const { getAdminToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [catSearch, setCatSearch] = useState('');
  const [showCatSuggestions, setShowCatSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    color: '#10b981',
    parent_id: '',
    level: 0
  });

  // If we are in edit mode, fill the form with existing data
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        slug: editData.slug,
        color: editData.color || '#10b981',
        parent_id: editData.parent_id || '',
        level: editData.level || 0
      });

      if (editData.parent_id) {
        const parent = categories.find(c => c._id === editData.parent_id);
        if (parent) setCatSearch(parent.name);
      }
    }
  }, [editData, categories]);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(catSearch.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getAdminToken();
      const isEdit = !!editData;
      const categoryId = editData?._id || editData?.id;

      const url = isEdit
        ? `http://localhost:8000/api/admin/categories/${categoryId}`
        : 'http://localhost:8000/api/admin/categories';

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(isEdit ? 'Updated!' : 'Saved!');
        onSuccess();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to save');
      }
    } catch (error) {
      toast.error('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (name) => {
    const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleSelectParent = (cat) => {
    if (cat.level >= 2) {
      toast.error('Limit reached');
      return;
    }
    setFormData({ ...formData, parent_id: cat._id, level: (cat.level || 0) + 1 });
    setCatSearch(cat.name);
    setShowCatSuggestions(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex flex-col">
            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">
              {editData ? 'Edit Category' : 'Add New Category'}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Category Name</label>
            <input
              required
              className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold"
              type="text"
              placeholder="e.g. Fruits"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Slug (URL Name)</label>
            <input
              required
              className="w-full p-3 bg-gray-100 rounded-xl outline-none font-bold text-gray-500"
              type="text"
              value={formData.slug}
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Color</label>
              <input
                className="h-11 w-full p-1 bg-gray-50 rounded-xl outline-none cursor-pointer"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
              />
            </div>
            <div className="relative">
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Parent Category</label>
              <input
                autoComplete="off"
                className="w-full h-11 px-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm"
                type="text"
                placeholder="Search..."
                value={catSearch}
                onFocus={() => setShowCatSuggestions(true)}
                onChange={(e) => {
                  setCatSearch(e.target.value);
                  setShowCatSuggestions(true);
                  if (e.target.value === '') setFormData({ ...formData, parent_id: '', level: 0 });
                }}
              />
              {showCatSuggestions && (
                <div className="absolute z-[110] w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-56 overflow-y-auto">
                   <div className="p-3 hover:bg-gray-50 cursor-pointer font-black text-[10px] text-primary border-b uppercase" onClick={() => { setFormData({ ...formData, parent_id: '', level: 0 }); setCatSearch(''); setShowCatSuggestions(false); }}>None (Main Category)</div>
                   {filteredCategories.filter(c => c._id !== editData?._id).map(cat => (
                     <div key={cat._id} className="p-3 hover:bg-gray-50 cursor-pointer border-b" onClick={() => handleSelectParent(cat)}>
                       <span className="font-bold text-sm">{cat.name}</span>
                     </div>
                   ))}
                </div>
              )}
            </div>
          </div>

          <button disabled={loading} className="w-full py-4 bg-primary text-white font-black rounded-xl hover:bg-secondary">
            {loading ? 'SAVING...' : editData ? 'UPDATE' : 'SAVE'}
          </button>
        </form>
      </div>
    </div>
  );
};

const AddProductModal = ({ onClose, onSuccess, categories, editData }) => {
  const { getAdminToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [catSearch, setCatSearch] = useState('');
  const [showCatSuggestions, setShowCatSuggestions] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: '',
    category: '',
    description: '',
    stock: '100',
  });

  // Fill form if we are editing an existing product
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        price: editData.price,
        unit: editData.unit,
        category: editData.category,
        description: editData.description || '',
        stock: editData.stock,
      });
      setCatSearch(editData.category);
      if (editData.image) setImagePreview(editData.image);
    }
  }, [editData]);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(catSearch.toLowerCase())
  );

  const handleSelectCategory = (catName) => {
    setFormData({ ...formData, category: catName });
    setCatSearch(catName);
    setShowCatSuggestions(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getAdminToken();
      const isEdit = !!editData;
      const productId = editData?._id || editData?.id;

      const url = isEdit
        ? `http://localhost:8000/api/admin/products/${productId}`
        : 'http://localhost:8000/api/admin/products';

      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (imageFile) data.append('image', imageFile);
      if (isEdit) data.append('_method', 'PUT'); // For Laravel to handle PUT via POST

      const response = await fetch(url, {
        method: 'POST', // Use POST with _method=PUT for file uploads in Laravel
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });

      if (response.ok) {
        toast.success(isEdit ? 'Product updated!' : 'Product added!');
        onSuccess();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Error saving product');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">
            {editData ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Photo Section */}
          <div className="flex justify-center mb-4">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-colors group-hover:border-primary">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon className="text-gray-300 mb-2" size={32} />
                    <span className="text-[10px] font-black text-gray-400 uppercase">Upload Photo</span>
                  </>
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-lg shadow-lg">
                <Plus size={16} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Product Name</label>
              <input required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold" type="text" placeholder="e.g. Fresh Mango" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Price (৳)</label>
              <input required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold" type="number" placeholder="120" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Unit (kg, pc, etc.)</label>
              <input required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold" type="text" placeholder="kg" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} />
            </div>

            <div className="relative">
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Category</label>
              <input
                required
                autoComplete="off"
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-sm"
                type="text"
                placeholder="Search category..."
                value={catSearch}
                onFocus={() => setShowCatSuggestions(true)}
                onChange={(e) => {
                  setCatSearch(e.target.value);
                  setShowCatSuggestions(true);
                  if (e.target.value === '') setFormData({ ...formData, category: '' });
                }}
              />
              {showCatSuggestions && (
                <div className="absolute z-[110] w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-56 overflow-y-auto">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map(cat => (
                      <div key={cat._id} className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => handleSelectCategory(cat.name)}>
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-sm text-gray-700 ${cat.level === 1 ? 'pl-2' : cat.level === 2 ? 'pl-4' : ''}`}>
                            {cat.level === 1 ? '— ' : cat.level === 2 ? '—— ' : ''}{cat.name}
                          </span>
                          <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">Lvl {cat.level}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-400 font-bold uppercase italic">No category found</div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Initial Stock</label>
              <input required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Description</label>
              <textarea className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold min-h-[80px]" placeholder="Add product details..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
          </div>

          <button disabled={loading} className="w-full py-4 bg-primary text-white font-black rounded-xl shadow-xl shadow-green-900/10 hover:bg-secondary transition-all disabled:bg-gray-400 mt-2">
            {loading ? 'SAVING...' : editData ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
          </button>
        </form>
      </div>
      {/* Click outside to close category search */}
      {showCatSuggestions && <div className="fixed inset-0 z-[105]" onClick={() => setShowCatSuggestions(false)}></div>}
    </div>
  );
};

const SearchBox = ({ placeholder }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    <input type="text" placeholder={placeholder} className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none focus:border-primary text-sm font-medium w-64 shadow-sm" />
  </div>
);

const PrimaryButton = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="bg-primary text-white py-2.5 px-6 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-green-900/10">
    <Icon size={18} /> {label}
  </button>
);

const ActionButton = ({ icon: Icon, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 hover:bg-gray-100 rounded-lg transition-all ${color}`}
  >
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
