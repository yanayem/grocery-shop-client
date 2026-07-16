import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Registration = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed up with Google!');
      navigate('/');
    } catch (error) {
      toast.error('Google sign-up failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.code, error.message);
      let errorMsg = 'Failed to create account';

      if (error.code === 'auth/email-already-in-use') errorMsg = 'This email is already registered';
      if (error.code === 'auth/invalid-email') errorMsg = 'Invalid email address';
      if (error.code === 'auth/weak-password') errorMsg = 'Password should be at least 6 characters';
      if (error.code === 'auth/operation-not-allowed') errorMsg = 'Email/Password sign-up is not enabled in Firebase Console';

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-65px)] bg-[#f8f9fa] px-5 py-10">
      <div className="bg-white p-10 rounded-none shadow-sm border border-gray-100 w-full max-w-[480px] text-center animate-in fade-in zoom-in duration-300">
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
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all"
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
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all"
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
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all"
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
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all pr-12"
                value={formData.password}
                onChange={handleChange}
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

          <div className="mb-8">
            <label className="block text-xs font-black mb-2 text-gray-700 uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-none outline-none focus:border-primary focus:bg-white transition-all pr-12"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-8 text-[0.85rem] text-gray-500">
            <input type="checkbox" id="terms" className="mt-1" required />
            <label htmlFor="terms">
              I agree to the <strong className="text-gray-700 font-bold">Terms of Service</strong> and <strong className="text-gray-700 font-bold">Privacy Policy</strong>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white border-none rounded-none text-lg font-black cursor-pointer shadow-lg shadow-green-900/10 hover:bg-secondary transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-gray-100 flex-1"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OR</span>
          <div className="h-px bg-gray-100 flex-1"></div>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full mt-6 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-none flex items-center justify-center gap-3 font-bold hover:bg-gray-50 transition-all active:scale-[0.98]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5" />
          Sign up with Google
        </button>

        <div className="mt-8 text-[0.95rem] text-gray-500">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
