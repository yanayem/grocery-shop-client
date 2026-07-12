import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={80} color="#dfe6e9" style={{ marginBottom: '20px' }} />
        <h2>Your cart is empty</h2>
        <Link to="/" className="continue-shopping">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 style={{ textAlign: 'left', marginBottom: '40px' }}>Your Shopping Bag</h1>

      <div className="cart-layout">
        <div className="cart-items-section">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{item.unit}</p>
                <div style={{ marginTop: '10px' }}>
                  <span style={{ fontWeight: 700 }}>৳{item.price}</span>
                </div>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-selector" style={{ marginBottom: 0 }}>
                  <button className="qty-btn" style={{ width: 30, height: 30 }} onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                    <Minus size={14} />
                  </button>
                  <span className="qty-value" style={{ fontSize: '1rem' }}>{item.quantity}</span>
                  <button className="qty-btn" style={{ width: 30, height: 30 }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="cart-item-price">
                ৳{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-section">
          <h3>Order Summary</h3>
          <div style={{ marginTop: '30px' }}>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>৳{getCartTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>৳45</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>৳{getCartTotal() + 45}</span>
            </div>

            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
