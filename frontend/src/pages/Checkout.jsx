import React, { useState } from 'react';
import { MapPin, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

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
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ background: '#72BF78', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 30px' }}>
          <Truck size={40} style={{ margin: '0 auto' }} />
        </div>
        <h1>Order Placed Successfully!</h1>
        <p style={{ color: '#636e72', marginTop: '10px' }}>Your groceries will be at your door within 1 hour.</p>
        <button
          onClick={() => window.location.href = '/'}
          style={{ marginTop: '30px', padding: '12px 30px', background: '#72BF78', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 style={{ textAlign: 'left', marginBottom: '40px' }}>Checkout</h1>

      <form className="checkout-layout" onSubmit={handlePlaceOrder}>
        <div className="checkout-form-section">
          <div className="checkout-card">
            <h3><MapPin size={22} color="#72BF78" /> Delivery Address</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea placeholder="Flat No, House No, Area Name" rows="3" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dfe6e9' }} required></textarea>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Area</label>
                <input type="text" placeholder="e.g. Uttara" required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+880 1XXX XXXXXX" required />
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <h3><CreditCard size={22} color="#72BF78" /> Payment Method</h3>
            <div className="payment-options">
              <div className={`payment-method ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>
                <input type="radio" checked={paymentMethod === 'cod'} readOnly />
                <span>Cash on Delivery</span>
              </div>
              <div className={`payment-method ${paymentMethod === 'bkash' ? 'active' : ''}`} onClick={() => setPaymentMethod('bkash')}>
                <input type="radio" checked={paymentMethod === 'bkash'} readOnly />
                <span>bKash / Rocket</span>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-summary-section">
          <div className="checkout-card">
            <h3><ShoppingBag size={22} color="#72BF78" /> Order Summary</h3>
            <div style={{ marginBottom: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Subtotal</span>
                <span>৳{getCartTotal()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Delivery Fee</span>
                <span>৳45</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', marginTop: '10px' }}>
                <span>Total</span>
                <span>৳{getCartTotal() + 45}</span>
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
