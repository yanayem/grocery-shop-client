import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Heart, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
        setLoading(false);
      });
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'plus') setQuantity(quantity + 1);
  };

  if (loading) return <div className="px-[5%] py-24 text-center">Loading product details...</div>;
  if (!product) return <div className="px-[5%] py-24 text-center text-red-500">Product not found</div>;

  return (
    <div className="px-[5%] py-10 bg-white min-h-[calc(100vh-65px)]">
      <div className="flex items-center text-sm text-gray-500 mb-8 gap-1 flex-wrap">
        <Link to="/" className="hover:text-primary font-medium transition-colors">Home</Link>
        <ChevronRight size={14} className="text-gray-300" />
        <Link to="/" className="hover:text-primary font-medium transition-colors">{product.category}</Link>
        <ChevronRight size={14} className="text-gray-300" />
        <span className="text-gray-800 font-bold">{product.name}</span>
      </div>

      <div className="flex gap-12 flex-wrap">
        <div className="flex-1 min-w-[300px] bg-gray-50 rounded-none p-10 flex items-center justify-center border border-gray-100">
          <img src={product.image} alt={product.name} className="max-w-full h-auto rounded-none shadow-2xl shadow-green-900/5 transition-transform hover:scale-105 duration-500" />
        </div>

        <div className="flex-1 min-w-[300px] text-left">
          <h1 className="text-[2.5rem] font-black leading-tight mb-3 text-gray-900 tracking-tight">{product.name}</h1>
          <p className="text-lg text-gray-500 mb-8 font-medium">{product.unit}</p>
          <div className="text-[2.5rem] font-black text-primary mb-10 tracking-tight">৳{product.price}</div>

          <div className="flex items-center gap-6 mb-10 bg-gray-50 w-fit p-2 rounded-none border border-gray-100">
            <button
              className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
              onClick={() => handleQuantity('minus')}
            >
              <Minus size={20} />
            </button>
            <span className="text-xl font-black w-8 text-center text-gray-800">{quantity}</span>
            <button
              className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
              onClick={() => handleQuantity('plus')}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex gap-4 mb-10">
            <button
              className="flex-1 py-4.5 bg-primary text-white border-none rounded-none text-lg font-black flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-green-900/15 hover:bg-secondary transition-all active:scale-[0.98]"
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingCart size={22} />
              Add to Bag
            </button>
            <button className="p-4.5 bg-red-50 text-red-400 border border-red-100 rounded-none cursor-pointer hover:bg-red-400 hover:text-white transition-all active:scale-[0.98]">
              <Heart size={22} fill="currentColor" />
            </button>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-lg font-black mb-4 text-gray-800 uppercase tracking-wider text-xs">Product Details</h3>
            <p className="text-gray-600 leading-relaxed text-base font-medium">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
