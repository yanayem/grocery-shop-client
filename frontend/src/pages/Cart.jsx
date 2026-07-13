import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-[100px]">
        <div className="flex justify-center mb-5">
          <ShoppingBag size={80} className="text-gray-200" />
        </div>
        <h2 className="text-2xl font-bold mb-5 text-gray-500">Your cart is empty</h2>
        <Link to="/" className="text-primary font-bold underline">Go back to shopping</Link>
      </div>
    );
  }

  const handleCheckoutClick = () => {
    if (currentUser) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  return (
    <div className="px-[5%] py-10 min-h-[calc(100vh-65px)]">
      <h1 className="text-3xl font-extrabold text-left mb-10 text-gray-800">Your Shopping Bag</h1>

      <div className="flex gap-10 flex-wrap">
        <div className="flex-[2] min-w-[350px]">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center py-5 border-b border-gray-100 gap-5">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-gray-50 rounded-none" />
              <div className="flex-1 text-left">
                <h4 className="font-bold text-gray-800 mb-1">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.unit}</p>
                <div className="mt-2.5">
                  <span className="font-bold text-gray-800">৳{item.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    className="w-7.5 h-7.5 rounded-full border border-gray-200 bg-white flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-base w-6 text-center">{item.quantity}</span>
                  <button
                    className="w-7.5 h-7.5 rounded-full border border-gray-200 bg-white flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button className="text-red-400 cursor-pointer p-1 bg-none border-none hover:text-red-600 transition-colors" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="font-bold text-right w-20 text-gray-800">
                ৳{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 min-w-[300px] bg-[#f8fdf9] p-8 rounded-none h-fit border border-gray-100">
          <h3 className="text-xl font-extrabold mb-8 text-gray-800 border-b border-gray-100 pb-4">Order Summary</h3>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between text-base text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">৳{getCartTotal()}</span>
            </div>
            <div className="flex justify-between text-base text-gray-600">
              <span>Delivery Fee</span>
              <span className="font-semibold">৳45</span>
            </div>
            <div className="flex justify-between items-center text-xl font-extrabold text-gray-900 border-t border-gray-200 mt-5 pt-5">
              <span>Total</span>
              <span className="text-2xl text-primary">৳{getCartTotal() + 45}</span>
            </div>

            <button
              className="w-full py-4 bg-primary text-white border-none rounded-none text-lg font-bold mt-8 cursor-pointer shadow-lg shadow-green-900/10 hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              onClick={handleCheckoutClick}
            >
              {!currentUser && <Lock size={18} />}
              {currentUser ? 'Proceed to Checkout' : 'Login to Place Order'}
            </button>
            {!currentUser && (
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mt-3">
                * You must be signed in to complete your order
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
