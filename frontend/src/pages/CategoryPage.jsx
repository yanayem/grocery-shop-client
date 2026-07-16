import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const CategoryPage = () => {
  const { type, id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  useEffect(() => {
    setLoading(true);
    // Since our backend currently stores category names (e.g. "Vegetables")
    // and the URL might use slugs (e.g. "vegetables"), we might need some mapping
    // or just fetch all and filter for now if the categories don't match exactly.
    // For now, let's fetch all and filter by slug/name comparison.
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p => {
          const categoryLower = p.category.toLowerCase();
          const idLower = id.toLowerCase();
          return categoryLower === idLower || categoryLower.replace(/ & /g, '-').replace(/ /g, '-') === idLower;
        });
        setProducts(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching category products:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div className="px-[5%] py-10 min-h-[80vh] bg-white">
      <header className="text-left mb-12">
        <h1 className="text-[2.5rem] font-black text-gray-900 tracking-tight leading-none mb-2">{title}</h1>
        <p className="text-gray-500 font-medium">{products.length} items found in this section</p>
      </header>

      {products.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {products.map(product => (
            <ProductCard key={product.id || product._id} {...product} id={product.id || product._id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
          <h2 className="text-2xl font-bold text-gray-400 mb-2">No products found here yet.</h2>
          <p className="text-gray-400">We are stocking up! Check back soon.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
