import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, MapPin, HelpCircle, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  return (
    <nav className="chaldal-nav">
      <div className="nav-left">
        <button className="menu-toggle">
          <Menu size={24} color="#2d3436" />
        </button>
        <Link to="/" className="nav-logo-chaldal">
          <span className="logo-text">GroceryFresh</span>
        </Link>
      </div>

      <div className="nav-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products (e.g. eggs, milk, potato)"
            className="search-input"
          />
          <button className="search-btn">
            <Search size={20} color="#636e72" />
          </button>
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-item location">
          <MapPin size={18} color="#72BF78" />
          <span>Dhaka</span>
        </div>
        <div className="nav-item help">
          <HelpCircle size={18} />
          <span>Help & More</span>
        </div>
        <div className="nav-item cart-container" onClick={() => navigate('/cart')}>
          <ShoppingCart size={22} />
          <span className="cart-badge">{getCartCount()}</span>
        </div>
        <button className="login-btn-chaldal" onClick={() => navigate('/login')}>
          <User size={18} style={{ marginRight: '8px' }} />
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
