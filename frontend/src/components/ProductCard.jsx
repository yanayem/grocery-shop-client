import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, name, price, unit, image, discount }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, name, price, unit, image });
  };

  return (
    <div
      className="bg-white border border-gray-100 rounded-xl p-4 relative transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-md hover:border-primary/20 group"
      onClick={() => navigate(`/product/${id}`)}
    >
      {discount && (
        <div className="absolute top-2.5 left-2.5 bg-red-400 text-white px-2 py-0.5 rounded text-[0.75rem] font-bold z-[1]">
          {discount}% OFF
        </div>
      )}
      <div className="w-full h-[150px] flex items-center justify-center mb-4">
        <img src={image} alt={name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
      </div>
      <div className="text-left">
        <h4 className="text-[1rem] font-semibold text-gray-800 mb-1 h-[2.4rem] overflow-hidden line-clamp-2">
          {name}
        </h4>
        <p className="text-[0.85rem] text-gray-500 mb-4">{unit}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-[1.2rem] font-bold text-gray-800">৳{price}</span>
          <button
            className="bg-primary text-white border-none p-2 rounded-lg text-[0.85rem] font-semibold flex items-center gap-1.5 transition-colors hover:bg-secondary"
            onClick={handleAddToCart}
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
