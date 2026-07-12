import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { type, id } = useParams();

  const filteredProducts = products.filter(p => {
    if (type === 'main') return p.category === id;
    if (type === 'subcategory') return p.subCategory === id;
    if (type === 'subsubcategory') return p.subSubCategory === id;
    return false;
  });

  const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="px-[5%] py-10 min-h-[80vh] bg-white">
      <header className="text-left mb-12">
        <h1 className="text-[2.5rem] font-black text-gray-900 tracking-tight leading-none mb-2">{title}</h1>
        <p className="text-gray-500 font-medium">{filteredProducts.length} items found in this section</p>
      </header>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
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
