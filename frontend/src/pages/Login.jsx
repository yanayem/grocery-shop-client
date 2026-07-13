import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      let errorMsg = 'Failed to login';
      if (error.code === 'auth/user-not-found') errorMsg = 'No account found with this email';
      if (error.code === 'auth/wrong-password') errorMsg = 'Incorrect password';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed in with Google!');
      navigate('/');
    } catch (error) {
      toast.error('Google sign-in failed');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      return toast.error('Please enter your email address first');
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error('Failed to send reset email');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-65px)] bg-[#f8f9fa] px-5 py-10">
      <div className="bg-white p-10 rounded-none shadow-sm border border-gray-100 w-full max-w-[420px] text-center animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-black mb-2 text-gray-800 tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 mb-9 text-[1rem]">Login to manage your orders</p>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-6">
            <label htmlFor="email" className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-xs font-black text-gray-700 uppercase tracking-wider">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[10px] font-black text-primary uppercase hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all text-base pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white border-none rounded-none text-lg font-black mt-6 cursor-pointer shadow-lg shadow-green-900/10 hover:bg-secondary transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-gray-100 flex-1"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OR</span>
          <div className="h-px bg-gray-100 flex-1"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-6 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-none flex items-center justify-center gap-3 font-bold hover:bg-gray-50 transition-all active:scale-[0.98]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5" />
          Continue with Google
        </button>

        <div className="mt-8 text-[0.95rem] text-gray-500">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
