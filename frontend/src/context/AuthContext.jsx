import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem('admin_auth') === 'true'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          // Sync user with backend
          const response = await fetch('http://localhost:8000/api/users/sync', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const adminLogin = (email, password) => {
    const envEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === envEmail && password === envPassword) {
      localStorage.setItem('admin_auth', 'true');
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    setIsAdminAuthenticated(false);
    return signOut(auth);
  };

  const getAdminToken = () => {
    if (isAdminAuthenticated) {
      return import.meta.env.VITE_ADMIN_MASTER_KEY;
    }
    return null;
  };

  const value = {
    currentUser,
    userData,
    isAdminAuthenticated,
    adminLogin,
    logout,
    getAdminToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
