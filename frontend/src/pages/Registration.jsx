import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    toast.success('Account created successfully!');
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-65px)] bg-[#f8f9fa] px-5 py-10">
      <div className="bg-white p-10 rounded-[20px] shadow-sm border border-gray-100 w-full max-w-[480px] text-center animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-black mb-2 text-gray-800 tracking-tight">Create Account</h2>
        <p className="text-gray-500 mb-9 text-[1rem]">Join GroceryFresh for a better shopping experience</p>

        <form className="text-left" onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+880 1XXX XXXXXX"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-start gap-3 mb-8 text-[0.85rem] text-gray-500">
            <input type="checkbox" id="terms" className="mt-1" required />
            <label htmlFor="terms">
              I agree to the <strong className="text-gray-700 font-bold">Terms of Service</strong> and <strong className="text-gray-700 font-bold">Privacy Policy</strong>
            </label>
          </div>

          <button type="submit" className="w-full py-4 bg-primary text-white border-none rounded-xl text-lg font-black cursor-pointer shadow-lg shadow-green-900/10 hover:bg-secondary transition-all active:scale-[0.98]">
            Create Account
          </button>
        </form>

        <div className="mt-8 text-[0.95rem] text-gray-500">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
