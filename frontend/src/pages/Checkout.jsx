import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, ShoppingBag, Smartphone, ShieldCheck, Loader2, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    area: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    bkashNumber: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('You must be logged in to place an order');
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      // Get the Firebase ID Token
      const token = await currentUser.getIdToken();

      const orderData = {
        user: {
          name: formData.name,
        },
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          address: formData.address,
          area: formData.area,
          phone: formData.phone,
        },
        paymentMethod,
        itemsPrice: getCartTotal(),
        shippingPrice: 45,
        totalPrice: getCartTotal() + 45,
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setIsProcessing(false);
        setOrderPlaced(true);
        clearCart();
        toast.success('Order placed and saved to database!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error(error.message);
    }
  };

  if (orderPlaced) {
    return (
      <div className="py-[100px] px-5 text-center flex flex-col items-center">
        <div className="bg-primary text-white w-20 h-20 rounded-none flex items-center justify-center mb-8 shadow-xl shadow-green-900/20">
          <Truck size={40} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800">Order Placed Successfully!</h1>
        <p className="text-gray-500 mt-3 text-lg">Your groceries will be at your door within 1 hour.</p>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.href = '/'}
            className="mt-8 py-3 px-8 bg-white text-primary border-2 border-primary rounded-none cursor-pointer font-bold transition-transform hover:scale-105"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => window.location.href = '/orders'}
            className="mt-8 py-3 px-8 bg-primary text-white border-none rounded-none cursor-pointer font-bold transition-transform hover:scale-105"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5%] py-10 min-h-[calc(100vh-65px)] bg-[#f8fcf8]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800">Checkout</h1>
          <div className="h-1 w-20 bg-primary/20 rounded-full mt-2"></div>
        </div>

        <form className="flex gap-10 flex-wrap lg:flex-nowrap" onSubmit={handlePlaceOrder}>
          <div className="flex-[2] space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 text-left">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-gray-800 border-b border-gray-50 pb-4">
                <MapPin size={22} className="text-primary" /> Delivery Address
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-widest">Delivery Address</label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat No, House No, Area Name"
                    rows="2"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all resize-none font-medium"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-widest">Area</label>
                    <input
                      type="text"
                      name="area"
                      required
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g. Uttara"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-widest">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+880 1XXX XXXXXX"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 text-left">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-gray-800 border-b border-gray-50 pb-4">
                <CreditCard size={22} className="text-primary" /> Payment Method
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div
                  className={`flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-none cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-green-50/50' : 'border-gray-100 hover:border-primary/30'}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Truck size={24} className={paymentMethod === 'cod' ? 'text-primary' : 'text-gray-400'} />
                  <span className={`font-black text-[10px] uppercase tracking-tight text-center ${paymentMethod === 'cod' ? 'text-primary' : 'text-gray-600'}`}>Cash on Delivery</span>
                </div>

                <div
                  className={`flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-none cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-green-50/50' : 'border-gray-100 hover:border-primary/30'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={24} className={paymentMethod === 'card' ? 'text-primary' : 'text-gray-400'} />
                  <span className={`font-black text-[10px] uppercase tracking-tight text-center ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-600'}`}>Card Payment</span>
                </div>

                <div
                  className={`flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-none cursor-pointer transition-all ${paymentMethod === 'bkash' ? 'border-primary bg-green-50/50' : 'border-gray-100 hover:border-primary/30'}`}
                  onClick={() => setPaymentMethod('bkash')}
                >
                  <Smartphone size={24} className={paymentMethod === 'bkash' ? 'text-primary' : 'text-gray-400'} />
                  <span className={`font-black text-[10px] uppercase tracking-tight text-center ${paymentMethod === 'bkash' ? 'text-primary' : 'text-gray-600'}`}>Mobile Banking</span>
                </div>

                <div
                  className={`flex flex-col items-center justify-center gap-3 p-4 border-2 rounded-none cursor-pointer transition-all ${paymentMethod === 'qr' ? 'border-primary bg-green-50/50' : 'border-gray-100 hover:border-primary/30'}`}
                  onClick={() => setPaymentMethod('qr')}
                >
                  <QrCode size={24} className={paymentMethod === 'qr' ? 'text-primary' : 'text-gray-400'} />
                  <span className={`font-black text-[10px] uppercase tracking-tight text-center ${paymentMethod === 'qr' ? 'text-primary' : 'text-gray-600'}`}>Bangla QR</span>
                </div>
              </div>

              {/* Conditional Payment Details */}
              <div className="bg-gray-50 p-6 border border-gray-100 animate-in fade-in duration-300">
                {paymentMethod === 'cod' && (
                  <div className="flex items-start gap-4 text-gray-600">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full"><ShieldCheck size={18} className="text-primary" /></div>
                    <p className="text-sm font-medium leading-relaxed">Pay with cash when your groceries are delivered to your doorstep. Please keep the exact change ready for a faster experience.</p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black mb-1 text-gray-400 uppercase tracking-widest">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        required={paymentMethod === 'card'}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-primary transition-all font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black mb-1 text-gray-400 uppercase tracking-widest">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          required={paymentMethod === 'card'}
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black mb-1 text-gray-400 uppercase tracking-widest">CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          required={paymentMethod === 'card'}
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="***"
                          className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-primary transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bkash' && (
                  <div className="space-y-4">
                    <div className="flex gap-2 mb-2">
                      <div className="bg-white px-3 py-1 border border-gray-200 text-xs font-bold text-gray-500">bKash</div>
                      <div className="bg-white px-3 py-1 border border-gray-200 text-xs font-bold text-gray-500">Nagad</div>
                      <div className="bg-white px-3 py-1 border border-gray-200 text-xs font-bold text-gray-500">Rocket</div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black mb-1 text-gray-400 uppercase tracking-widest">Mobile Number</label>
                      <input
                        type="tel"
                        name="bkashNumber"
                        required={paymentMethod === 'bkash'}
                        value={formData.bkashNumber}
                        onChange={handleInputChange}
                        placeholder="01XXXXXXXXX"
                        className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-primary transition-all font-medium"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium italic">* You will be redirected to the secure gateway to enter your PIN.</p>
                  </div>
                )}

                {paymentMethod === 'qr' && (
                  <div className="flex flex-col items-center text-center p-2">
                    <div className="bg-white p-4 border border-gray-200 mb-4 shadow-sm relative group">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=GroceryFresh-Order-Payment"
                        alt="Bangla QR"
                        className="w-[180px] h-[180px]"
                      />
                      <div className="absolute inset-0 bg-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] font-black text-primary bg-white px-2 py-1 shadow-sm">SCAN TO PAY</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                       <div className="h-px w-8 bg-gray-200"></div>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bangla QR</span>
                       <div className="h-px w-8 bg-gray-200"></div>
                    </div>
                    <h4 className="font-black text-gray-800 text-sm mb-1">যেকোনো অ্যাপ দিয়ে স্ক্যান করুন</h4>
                    <p className="text-xs text-gray-500 font-medium max-w-[250px]">Scan this QR code with any bank or MFS app (bKash, Nagad, Upay etc.) to complete your payment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[320px]">
            <div className="bg-white p-8 rounded-none shadow-lg border border-gray-100 text-left sticky top-[105px]">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-gray-800 border-b border-gray-50 pb-4">
                <ShoppingBag size={22} className="text-primary" /> Order Summary
              </h3>

              <div className="mb-6 max-h-[250px] overflow-y-auto pr-2 scrollbar-hide space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-sm leading-tight">{item.name}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase mt-0.5">Qty: {item.quantity} × ৳{item.price}</p>
                    </div>
                    <span className="font-black text-gray-700 text-sm">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-3">
                <div className="flex justify-between text-gray-500 text-sm font-bold">
                  <span>Subtotal</span>
                  <span>৳{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm font-bold">
                  <span>Delivery Fee</span>
                  <span>৳45</span>
                </div>
                <div className="flex justify-between items-center text-gray-900 pt-3 border-t border-gray-50">
                  <span className="text-lg font-black uppercase tracking-tighter">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary block leading-none">৳{getCartTotal() + 45}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">VAT Inclusive</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-5 bg-primary text-white border-none rounded-none text-lg font-black mt-8 cursor-pointer shadow-xl shadow-green-900/10 hover:bg-secondary transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  paymentMethod === 'cod' ? 'PLACE ORDER' : 'PAY & PLACE ORDER'
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure 256-bit SSL Payment</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
