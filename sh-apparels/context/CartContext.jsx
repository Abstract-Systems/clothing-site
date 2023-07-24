"use client"
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Retrieve cart from localStorage on component mount
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingItem = cart.find((product) => product._id === item._id);
    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      increaseQuantity(existingItem);
    } else {
      // Otherwise, add the new item to the cart with a quantity of 1
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemToRemove._id));
  };

  const increaseQuantity = (itemToIncrease) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemToIncrease._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemToDecrease) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemToDecrease._id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
            }
          : item
      )
    );
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,increaseQuantity,decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};