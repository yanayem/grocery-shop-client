import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { LogOut, User, MapPin, ChevronDown, LocateFixed } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { currentUser, logout } = useAuth();
  const { location, updateLocation, detectLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocModal, setShowLocModal] = useState(false);

  const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const handleSelectLocation = (city) => {
    updateLocation(city);
    setShowLocModal(false);
    toast.success(`Location set to ${city}`);
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
        <div
          className="flex items-center gap-1.5 text-[0.9rem] font-bold text-gray-700 cursor-pointer hover:text-primary transition-colors bg-gray-50 px-3 py-2 rounded-lg border border-gray-100"
          onClick={() => setShowLocModal(true)}
        >
          <MapPin size={16} className="text-primary" />
          <span>{location}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>

        <div className="text-[0.9rem] font-semibold text-gray-500 cursor-pointer hidden md:block" onClick={() => navigate('/orders')}>
          <span>My Orders</span>
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

        {currentUser ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 font-bold text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
              <User size={18} className="text-primary" />
              <span className="max-w-[100px] truncate">{currentUser.displayName || 'User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 text-gray-500 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            className="bg-primary text-white border-none py-2.5 px-5 rounded-lg font-bold text-[0.9rem] hover:bg-secondary"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Location Selection Modal */}
      {showLocModal && (
        <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-5">
          <div className="bg-white w-full max-w-[400px] p-8 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-black mb-6 text-gray-800">Select Delivery Location</h3>

            <button
              onClick={() => { detectLocation(); setShowLocModal(false); }}
              className="w-full mb-6 py-3 px-4 bg-primary/10 text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/20 transition-all border border-primary/20"
            >
              <LocateFixed size={18} /> Detect My Location
            </button>

            <div className="grid grid-cols-2 gap-3">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => handleSelectLocation(city)}
                  className={`py-3 px-4 text-sm font-bold border transition-all ${location === city ? 'border-primary bg-green-50 text-primary' : 'border-gray-100 hover:border-primary/50 text-gray-600'}`}
                >
                  {city}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowLocModal(false)}
              className="w-full mt-8 py-3 text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
