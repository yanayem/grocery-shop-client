import React from 'react';
import { Package, ChevronRight, Clock, CheckCircle, Truck } from 'lucide-react';

const Orders = () => {
  // Mock data for orders
  const orders = [
    {
      id: 'ORD-8821',
      date: 'Oct 24, 2023',
      status: 'Delivered',
      total: 1250,
      items: [
        { name: 'Fresh Organic Bananas', quantity: 2, price: 120 },
        { name: 'Pure Cow Milk (1L)', quantity: 3, price: 90 },
        { name: 'Basmati Rice (5kg)', quantity: 1, price: 740 }
      ]
    },
    {
      id: 'ORD-9054',
      date: 'Nov 02, 2023',
      status: 'In Transit',
      total: 845,
      items: [
        { name: 'Red Onions (1kg)', quantity: 2, price: 110 },
        { name: 'Fresh Tomatoes (1kg)', quantity: 1, price: 85 },
        { name: 'ACI Salt (1kg)', quantity: 1, price: 40 },
        { name: 'Rupchanda Soyabean Oil (2L)', quantity: 1, price: 500 }
      ]
    },
    {
      id: 'ORD-9122',
      date: 'Nov 05, 2023',
      status: 'Pending',
      total: 450,
      items: [
        { name: 'Green Chili (250g)', quantity: 1, price: 40 },
        { name: 'Broccoli (1 pc)', quantity: 2, price: 160 },
        { name: 'Ginger (250g)', quantity: 1, price: 90 }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={16} className="text-primary" />;
      case 'In Transit': return <Truck size={16} className="text-blue-500" />;
      case 'Pending': return <Clock size={16} className="text-amber-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-primary';
      case 'In Transit': return 'bg-blue-100 text-blue-600';
      case 'Pending': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="px-[5%] py-10 min-h-[calc(100vh-65px)] bg-[#f8fcf8]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-left mb-10 text-gray-800">My Orders</h1>

        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-primary">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</p>
                      <p className="font-black text-gray-800">{order.id}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date Placed</p>
                      <p className="font-bold text-gray-700">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Amount</p>
                      <p className="font-black text-primary text-lg">৳{order.total}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-black uppercase tracking-tight ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-700">Items: {order.items.length}</p>
                      <p className="text-xs text-gray-500">
                        {order.items.map(i => `${i.name} (${i.quantity})`).join(', ').substring(0, 100)}...
                      </p>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-black text-primary hover:text-secondary transition-colors group">
                      Order Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-gray-300">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">No orders found</h3>
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
