import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 bg-white border-b border-gray-200 sticky top-0 z-[1000] h-[65px] w-full box-border">
      <div className="flex items-center gap-4">
        <button className="bg-none border-none cursor-pointer p-2 flex flex-col gap-1">
          <span className="w-5 h-[2px] bg-gray-800"></span>
          <span className="w-5 h-[2px] bg-gray-800"></span>
          <span className="w-5 h-[2px] bg-gray-800"></span>
        </button>
        <Link to="/" className="no-underline">
          <span className="text-xl font-extrabold text-primary">GroceryFresh</span>
        </Link>
      </div>

      <div className="flex-1 max-w-[600px] mx-10">
        <form onSubmit={handleSearch} className="flex w-full bg-gray-100 border border-transparent rounded-lg overflow-hidden transition-colors focus-within:border-primary focus-within:bg-white">
          <input
            type="text"
            placeholder="Ki khujchhen? (jemon: dim, dudh, piyaj...)"
            className="flex-1 py-3 px-4 border-none bg-transparent text-[0.95rem] outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-primary text-white border-none px-5 text-[0.9rem] font-bold cursor-pointer hover:bg-secondary">
            Search
          </button>
        </form>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-[0.9rem] font-semibold text-gray-500 cursor-pointer">
          <span>Dhaka</span>
        </div>
        <div className="text-[0.9rem] font-semibold text-gray-500 cursor-pointer hidden md:block">
          <span>Help & More</span>
        </div>
        <div
          className="relative text-[#1b261b] cursor-pointer flex items-center gap-2"
          onClick={() => navigate('/cart')}
        >
          <span className="font-bold">Bag</span>
          <span className="absolute -top-2 -right-2 bg-[#ff7675] text-white text-[0.7rem] px-[5px] py-[2px] rounded-full font-extrabold">
            {getCartCount()}
          </span>
        </div>
        <button
          className="bg-primary text-white border-none py-2.5 px-5 rounded-lg font-bold text-[0.9rem] hover:bg-secondary"
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
