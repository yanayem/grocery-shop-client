import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="text-[12rem] font-black text-gray-100 leading-none select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-green-900/10 border border-gray-50 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <Search size={64} className="text-primary" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-black text-gray-800 mb-4 uppercase tracking-tighter italic">
        Oops! Page <span className="text-primary">Not Found</span>
      </h1>

      <p className="text-gray-500 max-w-md mb-10 font-medium leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        Don't worry, our groceries are still here!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95 uppercase text-sm tracking-wider"
        >
          <ArrowLeft size={18} /> Go Back
        </button>

        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-green-900/20 hover:bg-secondary transition-all active:scale-95 uppercase text-sm tracking-wider"
        >
          <Home size={18} /> Back to Home
        </button>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-50 w-full max-w-xs">
        <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.3em]">
          GroceryFresh / 404 Error
        </p>
      </div>
    </div>
  );
};

export default NotFound;
