import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAdminAuthenticated, adminLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Artificial delay for better UX
    setTimeout(() => {
      const success = adminLogin(email, password);

      if (success) {
        toast.success('Welcome Admin!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid admin credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fcf8] flex items-center justify-center p-6">
      <div className="bg-white border border-gray-100 p-10 rounded-[2rem] shadow-xl shadow-green-900/5 w-full max-w-[450px] relative animate-in fade-in zoom-in duration-500">

        <div className="flex justify-center mb-8">
          <div className="bg-primary/10 p-5 rounded-3xl border border-primary/20 text-primary">
            <ShieldCheck size={44} />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter italic">
            Grocery<span className="text-primary">Admin</span>
          </h1>
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-2">Secure Control Panel (Local Auth)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Admin Identity</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                required
                type="email"
                placeholder="admin@gmail.com"
                className="w-full bg-gray-50 border border-gray-100 p-4 pl-12 rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 text-gray-800 font-bold transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Master Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="admin123"
                className="w-full bg-gray-50 border border-gray-100 p-4 pl-12 pr-12 rounded-2xl outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 text-gray-800 font-bold transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-green-900/10 hover:bg-secondary transition-all active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 flex justify-center items-center gap-3 mt-4 uppercase tracking-wider"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              'Enter Dashboard'
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
            Authorized Personnel Access Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
