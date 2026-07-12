import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    toast.success('Successfully logged in!');
    // Backend integration will go here
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-65px)] bg-[#f8f9fa] px-5 py-10">
      <div className="bg-white p-10 rounded-[20px] shadow-sm border border-gray-100 w-full max-w-[420px] text-center animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-black mb-2 text-gray-800 tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 mb-9 text-[1rem]">Login to manage your orders</p>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-6">
            <label htmlFor="email" className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full py-4 bg-primary text-white border-none rounded-xl text-lg font-black mt-2.5 cursor-pointer shadow-lg shadow-green-900/10 hover:bg-secondary transition-all active:scale-[0.98]">
            Login
          </button>
        </form>

        <div className="mt-8 text-[0.95rem] text-gray-500">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
