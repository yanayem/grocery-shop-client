import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ title }) => {
  const { currentUser, isAdminAuthenticated } = useAuth();

  const getAdminName = () => {
    if (currentUser?.displayName) return currentUser.displayName;
    if (isAdminAuthenticated) return 'Local Admin';
    return 'Guest';
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">{title}</h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Control Center / {title}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium w-64 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 pr-6 border-r border-gray-100">
          <button className="p-2.5 text-gray-400 hover:text-primary hover:bg-green-50 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-gray-800 leading-none">{getAdminName()}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Super Admin</p>
          </div>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border-2 border-primary/20 overflow-hidden">
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              <User size={20} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
