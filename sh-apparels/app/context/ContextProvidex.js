'use client'
import React, { createContext, useState } from 'react';
import CartContext from './CartContext';

function ContextProvidex({children}) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export default ContextProvidex;