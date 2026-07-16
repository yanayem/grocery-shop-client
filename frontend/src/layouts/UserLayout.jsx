import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import LiveChat from '../components/LiveChat';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import ProductDetail from '../pages/ProductDetail';
import CategoryPage from '../pages/CategoryPage';
import SearchResults from '../pages/SearchResults';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import FAQ from '../pages/FAQ';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const UserLayout = () => {
  const location = useLocation();
  const isAuthPath = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#f8fcf8]">
      <Navbar />
      <div className="relative">
        {!isAuthPath && <Sidebar />}
        <main className={`${!isAuthPath ? 'lg:ml-[240px]' : ''} min-h-[calc(100vh-65px)] flex flex-col bg-white`}>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:type/:id" element={<CategoryPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              {/* Catch-all route for User Panel */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
      <LiveChat />
    </div>
  );
};

export default UserLayout;
