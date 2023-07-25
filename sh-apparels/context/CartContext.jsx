"use client"
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemQuantity , setitemQuantity]= useState(1);

  // Retrieve cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, itemQuantity) => {
    const existingItem = cart.find((product) => product._id === item._id);
    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      increaseQuantity(existingItem);
    } else {
      // Otherwise, add the new item to the cart with a quantity of 1
      setCart((prevCart) => [...prevCart, { ...item, quantity: itemQuantity }]);
    }
    
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemToRemove._id));
  };

  const increaseQuantity = (itemToIncrease) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemToIncrease._id
          ? { ...item, itemQuantity: item.itemQuantity + 1 }
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
              itemQuantity: item.itemQuantity > 1 ? item.itemQuantity - 1 : item.itemQuantity,
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity,itemQuantity,setitemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
