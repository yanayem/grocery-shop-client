import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Heart, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Dummy product data
  const product = {
    id: id,
    name: 'Fresh Organic Roma Tomatoes',
    price: 60,
    unit: '1 kg',
    image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/fb6e5b4b74e6443c94d075d9e5d4d3f3.jpg',
    description: 'Our organic Roma tomatoes are vine-ripened to perfection, offering a rich, sweet flavor and firm texture. Perfect for sauces, salads, or roasting. Grown without synthetic pesticides or fertilizers, these tomatoes bring the pure taste of nature to your kitchen.',
    category: 'Vegetables'
  };

  const handleQuantity = (type) => {
    if (type === 'minus' && quantity > 1) setQuantity(quantity - 1);
    if (type === 'plus') setQuantity(quantity + 1);
  };

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> <ChevronRight size={14} style={{ margin: '0 5px' }} />
        <Link to="/">{product.category}</Link> <ChevronRight size={14} style={{ margin: '0 5px' }} />
        <span>{product.name}</span>
      </div>

      <div className="product-detail-layout">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="main-product-image" />
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-unit-detail">{product.unit}</p>
          <div className="product-price-detail">৳{product.price}</div>

          <div className="quantity-selector">
            <button className="qty-btn" onClick={() => handleQuantity('minus')}><Minus size={18} /></button>
            <span className="qty-value">{quantity}</span>
            <button className="qty-btn" onClick={() => handleQuantity('plus')}><Plus size={18} /></button>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-big" onClick={() => addToCart(product, quantity)}>
              <ShoppingCart size={20} />
              Add to Bag
            </button>
            <button className="wishlist-btn">
              <Heart size={20} color="#ff7675" />
            </button>
          </div>

          <div className="product-description">
            <h3>Product Details</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
