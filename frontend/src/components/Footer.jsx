import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Camera, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="px-[5%] pt-20 pb-8 bg-white border-t border-gray-100 mt-auto">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 max-w-[1200px] mx-auto">
        <div className="text-left">
          <h3 className="text-primary mb-6 text-2xl font-black tracking-tighter">GroceryFresh</h3>
          <p className="text-gray-500 leading-relaxed mb-6 font-medium">
            The easiest way to get your groceries delivered to your home. Quality products at the best prices.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-primary hover:text-white transition-all">
              <Globe size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-primary hover:text-white transition-all">
              <Camera size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-primary hover:text-white transition-all">
              <Share2 size={20} />
            </div>
          </div>
        </div>

        <div className="text-left">
          <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-gray-800">Quick Links</h4>
          <ul className="list-none p-0 text-gray-500 font-bold space-y-3">
            <li className="cursor-pointer hover:text-primary transition-colors"><Link to="/">Home</Link></li>
            <li className="cursor-pointer hover:text-primary transition-colors"><Link to="/about">About Us</Link></li>
            <li className="cursor-pointer hover:text-primary transition-colors"><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="text-left">
          <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-gray-800">Support</h4>
          <ul className="list-none p-0 text-gray-500 font-bold space-y-3">
            <li className="cursor-pointer hover:text-primary transition-colors"><Link to="/faq">FAQ</Link></li>
            <li className="cursor-pointer hover:text-primary transition-colors">Shipping</li>
            <li className="cursor-pointer hover:text-primary transition-colors">Returns</li>
          </ul>
        </div>

        <div className="text-left">
          <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-gray-800">Contact Info</h4>
          <ul className="list-none p-0 text-gray-500 font-bold space-y-4">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-primary" />
              <span>123 Fresh St, Dhaka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary" />
              <span>+880 123 456 789</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <span>support@fresh.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-20 pt-8 border-t border-gray-50 text-gray-400 text-sm font-bold tracking-tight">
        &copy; {new Date().getFullYear()} GROCERYFRESH. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
