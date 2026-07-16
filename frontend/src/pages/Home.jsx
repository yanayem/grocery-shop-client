import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBasket, Apple, Droplets, Cookie, Coffee, ArrowRight, Heart, ShieldCheck, Clock, Star, LayoutGrid } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductSlider from '../components/ProductSlider';
import Loader from '../components/Loader';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('http://localhost:8000/api/products'),
          fetch('http://localhost:8000/api/categories')
        ]);

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData);
        setCategories(catData.filter(c => c.level === 0 || !c.parent_id));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader fullPage />;

  const getCategoryIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('veg')) return ShoppingBasket;
    if (n.includes('fruit')) return Apple;
    if (n.includes('dairy') || n.includes('egg')) return Droplets;
    if (n.includes('grain') || n.includes('rice')) return Cookie;
    if (n.includes('spice') || n.includes('oil')) return Coffee;
    return LayoutGrid;
  };

  // Filter some featured products for the slider
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="w-full">
      {/* Brand-Specific Hero Section */}
      <section className="w-[95%] min-h-[480px] bg-gradient-to-br from-[#f0f7f1] to-[#fffbf0] flex items-center px-[5%] py-[60px] box-border my-5 mx-auto rounded-none relative overflow-hidden border border-[#e1eee3]">
        <div className="flex-[1.2] z-[2]">
          <div className="inline-flex items-center gap-2 bg-soft text-primary px-5 py-2 rounded-full font-extrabold text-[0.85rem] mb-6">
            <Star size={16} fill="currentColor" />
            <span>EXPRESS DELIVERY IN DHAKA</span>
          </div>
          <h1 className="text-[4rem] mt-2.5 mb-6 text-primary leading-[1.05] font-extrabold">
            Freshness that <br />
            <span className="text-accent italic">you can taste.</span>
          </h1>
          <p className="text-[1.15rem] text-gray-600 mb-10 max-w-[500px] leading-relaxed">
            Quality groceries sourced directly from local farms. Pure, organic, and formalin-free for your family.
          </p>
          <div className="flex gap-5">
            <button className="py-[18px] px-[45px] bg-primary text-white border-none rounded-none text-[1.1rem] font-bold cursor-pointer flex items-center gap-3 hover:opacity-90">
              Start Bazaar <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative">
          <div className="absolute w-[400px] h-[400px] bg-soft rounded-full opacity-30 z-[1]"></div>
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=700"
            alt="Fresh Produce"
            className="w-full max-w-[550px] rounded-none relative z-[2] shadow-[0_20px_50px_rgba(35,114,39,0.15)]"
          />
        </div>
      </section>

      {/* Trust & Quality Badges */}
      <section className="px-[5%] py-[50px] bg-white flex justify-around flex-wrap gap-10 border-b border-gray-100">
        <TrustBadge Item={ShieldCheck} title="Purity Guaranteed" color="#237227" />
        <TrustBadge Item={Clock} title="60 Min Delivery" color="#FFAA00" />
        <TrustBadge Item={Heart} title="Hand-Picked" color="#519A66" />
      </section>

      {/* Product Slider Section */}
      <section className="px-[5%] pt-10">
        <ProductSlider title="Trending Deals" products={featuredProducts} />
      </section>

      {/* Categorized Grid */}
      <section className="px-[5%] py-[80px]">
        <h2 className="text-[2.2rem] mb-[50px] text-center font-extrabold text-gray-800">Explore by Category</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[30px]">
          {categories.map(cat => (
            <CategoryBox
              key={cat.id || cat._id}
              id={cat.slug}
              title={cat.name}
              Icon={getCategoryIcon(cat.name)}
              color={cat.color || '#237227'}
              bg={`${cat.color || '#237227'}10`}
              navigate={navigate}
            />
          ))}
        </div>
      </section>

      {/* Daily Essentials Grid */}
      <section className="px-[5%] pb-[100px]">
        <div className="flex justify-between items-center mb-[45px]">
          <h2 className="text-[2rem] font-extrabold text-gray-800">Daily Essentials</h2>
          <button className="text-primary font-extrabold bg-transparent border-none text-[1rem] cursor-pointer hover:underline">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[25px]">
          {products.slice(0, 10).map(product => (
            <ProductCard key={product.id || product._id} {...product} id={product.id || product._id} />
          ))}
        </div>
      </section>
    </div>
  );
};

const CategoryBox = ({ id, title, Icon, color, bg, navigate }) => (
  <div
    onClick={() => navigate(`/category/subcategory/${id}`)}
    className="px-5 py-10 rounded-none text-center cursor-pointer transition-all duration-300 border-2 border-transparent hover:-translate-y-2 hover:bg-white"
    style={{ background: bg }}
    onMouseOver={(e) => {
      e.currentTarget.style.borderColor = color;
      e.currentTarget.style.boxShadow = `0 15px 30px -10px ${color}44`;
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.borderColor = 'transparent';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div className="mb-5 flex justify-center" style={{ color: color }}>
      <Icon size={48} strokeWidth={1.5} />
    </div>
    <h3 className="text-[1.1rem] font-extrabold text-gray-800">{title}</h3>
  </div>
);

const TrustBadge = ({ Item, title, color }) => (
  <div className="flex items-center gap-[15px]">
    <div className="p-3 rounded-none" style={{ background: `${color}15`, color: color }}>
      <Item size={28} />
    </div>
    <span className="font-extrabold text-[1.1rem] text-[#1b261b]">{title}</span>
  </div>
);

export default Home;
