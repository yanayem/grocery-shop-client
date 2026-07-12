import React from 'react';
import { Heart, ShieldCheck, Truck, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="px-[5%] py-16 bg-white min-h-screen text-left">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Our Story</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          GroceryFresh started with a simple idea: everyone deserves access to fresh, high-quality groceries without the hassle of navigating crowded markets. Founded in 2024, we've grown from a small local delivery service to one of Dhaka's most trusted online grocery platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="w-12 h-12 bg-green-100 text-primary rounded-xl flex items-center justify-center mb-6">
              <Heart size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600">To bring the farm-fresh experience directly to your kitchen, supporting local farmers and ensuring the health of our community.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 text-accent rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Quality First</h3>
            <p className="text-gray-600">We personally inspect every item. If it's not good enough for our family, it's not good enough for yours.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Truck size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Speedy Delivery</h3>
            <p className="text-gray-600">Our fleet of dedicated riders ensures that your groceries arrive within 60 minutes, keeping the freshness intact.</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Community Driven</h3>
            <p className="text-gray-600">We work with hundreds of local suppliers and artisans to bring you the best authentic flavors of Bangladesh.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
