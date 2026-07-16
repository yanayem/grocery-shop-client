import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, ShieldCheck, Clock, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetailModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-4xl rounded-none shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 rounded-full shadow-lg transition-all"
        >
          <X size={24} />
        </button>

        {/* Product Image Area */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-r border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full max-h-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Details Area */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 overflow-y-auto">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
            <span className="bg-primary/10 px-3 py-1 rounded-full">{product.category || 'FRESH BAZAAR'}</span>
            {product.discount && (
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">{product.discount}% OFF</span>
            )}
          </div>

          <h2 className="text-3xl font-black text-gray-800 leading-tight mb-2">
            {product.name}
          </h2>
          <p className="text-gray-400 font-bold mb-6 italic uppercase tracking-wider">{product.unit}</p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-black text-gray-800 tracking-tighter">৳{product.price}</span>
            {product.discount && (
              <span className="text-xl text-gray-400 line-through font-bold">
                ৳{Math.round(product.price * (1 + product.discount/100))}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed font-medium">
            {product.description || "Fresh and high-quality product sourced directly from local producers. Guaranteed 100% organic and formalin-free for your health and safety."}
          </p>

          {/* Quantity and Cart Action */}
          <div className="flex flex-wrap gap-4 mb-10 pt-8 border-t border-gray-100">
            <div className="flex items-center border-2 border-gray-100 rounded-none overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-4 hover:bg-gray-50 text-gray-500 transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center font-black text-xl text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-4 hover:bg-gray-50 text-gray-500 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white px-8 py-4 font-black flex items-center justify-center gap-3 hover:bg-secondary transition-all shadow-xl shadow-green-900/10 active:scale-[0.98]"
            >
              <ShoppingCart size={24} />
              ADD TO BAZAAR
            </button>
          </div>

          {/* Trust Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <ShieldCheck className="text-primary" size={20} />
              <span className="text-[10px] font-black uppercase text-gray-500">100% Pure</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Clock className="text-primary" size={20} />
              <span className="text-[10px] font-black uppercase text-gray-500">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
