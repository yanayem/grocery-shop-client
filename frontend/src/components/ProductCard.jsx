import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, name, price, unit, image, discount }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to detail page
    addToCart({ id, name, price, unit, image });
  };

  return (
    <div style={cardStyle} className="product-card" onClick={() => navigate(`/product/${id}`)}>
      {discount && (
        <div style={discountBadge}>{discount}% OFF</div>
      )}
      <div style={imageContainer}>
        <img src={image} alt={name} style={imageStyle} />
      </div>
      <div style={infoStyle}>
        <h4 style={nameStyle}>{name}</h4>
        <p style={unitStyle}>{unit}</p>
        <div style={priceContainer}>
          <span style={priceStyle}>৳{price}</span>
          <button style={addBtnStyle} onClick={handleAddToCart} onMouseOver={(e) => e.currentTarget.style.background = '#A0D683'} onMouseOut={(e) => e.currentTarget.style.background = '#72BF78'}>
            <Plus size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: '#fff',
  border: '1px solid #f0f0f0',
  borderRadius: '12px',
  padding: '15px',
  position: 'relative',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const discountBadge = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  background: '#ff7675',
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '700',
  zIndex: 1
};

const imageContainer = {
  width: '100%',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '15px'
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain'
};

const infoStyle = {
  textAlign: 'left'
};

const nameStyle = {
  fontSize: '1rem',
  fontWeight: '600',
  color: '#2d3436',
  marginBottom: '5px',
  height: '2.4rem',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
};

const unitStyle = {
  fontSize: '0.85rem',
  color: '#636e72',
  marginBottom: '15px'
};

const priceContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto'
};

const priceStyle = {
  fontSize: '1.2rem',
  fontWeight: '700',
  color: '#2d3436'
};

const addBtnStyle = {
  background: '#72BF78',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  cursor: 'pointer',
  transition: 'background 0.2s'
};

export default ProductCard;
