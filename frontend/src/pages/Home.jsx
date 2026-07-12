import React from 'react';
import { ShoppingBasket, Apple, Droplets, Cookie, Coffee, ArrowRight, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dummyProducts = [
    { id: 1, name: 'Fresh Organic Roma Tomatoes', price: 60, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/fb6e5b4b74e6443c94d075d9e5d4d3f3.jpg', discount: 10 },
    { id: 2, name: 'Green Cucumber', price: 40, unit: '500 g', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/a4a8d43d1a8449c09a8f17a94f0e7d56.jpg' },
    { id: 3, name: 'Broccoli (Imported)', price: 120, unit: '1 pc', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/f39c1f6b1e2a4a9b8e8a7f6d5c4b3a21.jpg', discount: 5 },
    { id: 4, name: 'Red Onion (Premium)', price: 85, unit: '1 kg', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/9c8b7a6e5d4c3b2a1a0987654321fedc.jpg' },
    { id: 5, name: 'Farm Fresh Eggs (Brown)', price: 145, unit: '12 pcs', image: 'https://cdn.chaldal.com/_resizer/180x180/static/product/images/1234567890abcdef1234567890abcdef.jpg' },
  ];

  return (
    <div style={{ width: '100%' }}>
      {/* Banner Section */}
      <section style={{
        width: '100%',
        height: '450px',
        background: 'linear-gradient(135deg, #f8fdf9 0%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        boxSizing: 'border-box',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{ flex: '1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#72BF78', fontWeight: '700', marginBottom: '15px' }}>
            <Zap size={20} fill="#72BF78" />
            <span>Fastest Delivery in Dhaka</span>
          </div>
          <h1 style={{ fontSize: '3.8rem', lineHeight: '1.1', marginBottom: '20px', color: '#2d3436' }}>
            Fresh Groceries <br /> <span style={{ color: '#72BF78' }}>Daily Essentials</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#636e72', marginBottom: '35px', maxWidth: '500px' }}>
            Get the best quality products delivered to your doorstep with our express delivery service.
          </p>
          <button style={{
            padding: '16px 40px',
            background: '#72BF78',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '700',
            boxShadow: '0 4px 15px rgba(114, 191, 120, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            Start Shopping <ArrowRight size={20} />
          </button>
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
           <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
            alt="Grocery"
            style={{ width: '100%', maxWidth: '550px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
           />
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem' }}>Popular Categories</h2>
          <span style={{ color: '#72BF78', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            View All <ArrowRight size={18} />
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '25px'
        }}>
          <CategoryCard title="Vegetables" Icon={ShoppingBasket} color="#f2f9f3" iconColor="#72BF78" />
          <CategoryCard title="Fresh Fruits" Icon={Apple} color="#fff5f5" iconColor="#ff7675" />
          <CategoryCard title="Dairy & Eggs" Icon={Droplets} color="#f0f7ff" iconColor="#0984e3" />
          <CategoryCard title="Bakery" Icon={Cookie} color="#fffbf0" iconColor="#fdcb6e" />
          <CategoryCard title="Beverages" Icon={Coffee} color="#f8f4ff" iconColor="#6c5ce7" />
        </div>
      </section>

      {/* Products Section */}
      <section style={{ padding: '0 5% 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem' }}>Daily Essentials</h2>
          <span style={{ color: '#72BF78', fontWeight: '700', cursor: 'pointer' }}>See More</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {dummyProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ title, Icon, color, iconColor }) => (
  <div style={{
    background: color,
    padding: '40px 20px',
    borderRadius: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid transparent'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'translateY(-8px)';
    e.currentTarget.style.borderColor = '#A0D683';
    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'transparent';
    e.currentTarget.style.boxShadow = 'none';
  }}
  >
    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
      <Icon size={48} color={iconColor} strokeWidth={1.5} />
    </div>
    <h3 style={{ fontSize: '1.2rem', color: '#2d3436' }}>{title}</h3>
  </div>
);

export default Home;
