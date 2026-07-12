import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity`);
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      toast.success(`${product.name} added to bag`);
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    const item = cartItems.find(i => i.id === id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    if (item) toast.error(`${item.name} removed from bag`);
  };

  const updateQuantity = (id, qty) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: qty } : item)
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
