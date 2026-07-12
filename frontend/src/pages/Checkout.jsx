import React, { useState } from 'react';
import { MapPin, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="py-[100px] px-5 text-center flex flex-col items-center">
        <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-900/20">
          <Truck size={40} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800">Order Placed Successfully!</h1>
        <p className="text-gray-500 mt-3 text-lg">Your groceries will be at your door within 1 hour.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 py-3 px-8 bg-primary text-white border-none rounded-xl cursor-pointer font-bold transition-transform hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="px-[5%] py-10 min-h-[calc(100vh-65px)] bg-[#f8fcf8]">
      <h1 className="text-3xl font-extrabold text-left mb-10 text-gray-800">Checkout</h1>

      <form className="flex gap-10 flex-wrap" onSubmit={handlePlaceOrder}>
        <div className="flex-[2] min-w-[350px]">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6 text-left">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-gray-800 border-b border-gray-50 pb-4">
              <MapPin size={22} className="text-primary" /> Delivery Address
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2.5 text-gray-700 uppercase tracking-tight">Full Name</label>
              <input type="text" placeholder="Enter your full name" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all" required />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2.5 text-gray-700 uppercase tracking-tight">Delivery Address</label>
              <textarea placeholder="Flat No, House No, Area Name" rows="3" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all resize-none" required></textarea>
            </div>
            <div className="flex gap-5">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-2.5 text-gray-700 uppercase tracking-tight">Area</label>
                <input type="text" placeholder="e.g. Uttara" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all" required />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-2.5 text-gray-700 uppercase tracking-tight">Phone Number</label>
                <input type="tel" placeholder="+880 1XXX XXXXXX" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all" required />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6 text-left">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-gray-800 border-b border-gray-50 pb-4">
              <CreditCard size={22} className="text-primary" /> Payment Method
            </h3>
            <div className="flex flex-col gap-4">
              <div
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-green-50/50 ring-2 ring-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-primary' : 'border-gray-300'}`}>
                  {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                </div>
                <span className="font-semibold text-gray-700">Cash on Delivery</span>
              </div>
              <div
                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'bkash' ? 'border-primary bg-green-50/50 ring-2 ring-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                onClick={() => setPaymentMethod('bkash')}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bkash' ? 'border-primary' : 'border-gray-300'}`}>
                  {paymentMethod === 'bkash' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                </div>
                <span className="font-semibold text-gray-700">bKash / Rocket</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[300px]">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left sticky top-[105px]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-gray-800 border-b border-gray-50 pb-4">
              <ShoppingBag size={22} className="text-primary" /> Order Summary
            </h3>
            <div className="mb-6 space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm text-gray-600">
                  <span className="font-medium">{item.name} <span className="text-xs text-gray-400 font-bold ml-1">x{item.quantity}</span></span>
                  <span className="font-bold text-gray-700">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-50 pt-5 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold">৳{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-bold">৳45</span>
              </div>
              <div className="flex justify-between items-center text-gray-900 pt-3">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-primary">৳{getCartTotal() + 45}</span>
              </div>
            </div>

            <button type="submit" className="w-full py-4.5 bg-primary text-white border-none rounded-2xl text-lg font-black mt-8 cursor-pointer shadow-lg shadow-green-900/10 hover:bg-secondary transition-all active:scale-[0.98]">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
