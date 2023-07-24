'use client'
import React, { useState, useEffect, useContext, useMemo } from 'react';
import CartDropdown from './CartDropdown';
import { CartContext } from '@/context/CartContext';

export default function ProductGrid() {
  const [results, setResults] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Store the fetched data in cache memory for efficient retrieval
  const cachedResults = useMemo(() => results, [results]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cachedResults.map((product) => (
        <div key={product.id} className="border border-gray-200 rounded-md p-4 hover:shadow-lg">
          <div className="flex justify-center">
            <img src={product.images} alt={product.name} className="w-1/2" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-500">{product.price}</p>
            <span className="text-sm text-gray-500">{product.stock}</span>
            <br />
            <span className="text-sm text-gray-500">{product.category}</span>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
              onClick={() => addToCart({...product, quantity:1})}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      {/* Render the CartDropdown component and pass the cartItems state */}
      {cartOpen && <CartDropdown setOpen={setCartOpen} cartItems={cartItems} />}
    </div>
  );
}
