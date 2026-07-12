import React from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('q');

  const searchResults = products.filter(p =>
    p.name.toLowerCase().includes(query?.toLowerCase() || '') ||
    p.category.toLowerCase().includes(query?.toLowerCase() || '')
  );

  return (
    <div className="px-[5%] py-10 min-h-[80vh] bg-white">
      <header className="text-left mb-12">
        <h1 className="text-[2.5rem] font-black text-gray-900 tracking-tight leading-none mb-2">
          Results for "{query}"
        </h1>
        <p className="text-gray-500 font-medium">{searchResults.length} items matched your search</p>
      </header>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {searchResults.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
          <h2 className="text-2xl font-bold text-gray-400 mb-2">We couldn't find anything...</h2>
          <p className="text-gray-400">Try searching for something else like "Tomato" or "Milk".</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
