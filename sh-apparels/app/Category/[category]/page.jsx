'use client'
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'next/navigation'; // Use this import for useParams
import CartDropdown from '@/app/components/CartDropdown';
import { CartContext } from '@/context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

async function getData() {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Page = () => {
  const { category } = useParams(); // Access category directly using useParams
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart, itemQuantity } = useContext(CartContext);
  const notify = () => toast.success('Product has been added to cart 🚀', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Store the fetched data in cache memory for efficient retrieval
  const cachedResults = useMemo(() => products, [products]);

  const itemsOutOfStock = cachedResults.filter((product) => product.category === category && product.stock === 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{category}</h1>
      {cachedResults.length === 0 || itemsOutOfStock.length === cachedResults.length && (
        <div className="text-center text-red-500 text-lg font-semibold">
          Items out of stock
        </div>
        
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cachedResults
          .filter((product) => product.category === category)
          .map((product) => (
            <div key={product._id} className="border border-gray-200 rounded-md p-4 hover:shadow-lg">
              <Link href={`/product/${product.slug}`} key={product._id}>
                <div className="aspect-w-2 aspect-h-3 mb-4">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-md" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-500 mb-4">Price: Rs.{product.price}</p>
                <p className="text-gray-700">{product.description}</p>
                <span className="text-sm text-gray-500">{product.category}</span>
                <br />
              </Link>
              <div className="text-center">
                <button
                  //if stock is zero then disable the button
                  disabled={product.stock === 0}
                  onClick={() => {
                    addToCart({ ...product, itemQuantity });
                    notify(); // Call the notify function when the product is added to the cart
                  }}
                  className='bg-violet-800 disabled:bg-violet-200 text-white font-semibold py-3 px-16 mx-4 rounded-xl h-full'
                >
                  {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                </button>
              </div>
            </div>
          ))}
      </div>
      {/* Render the CartDropdown component and pass the cartOpen state */}
      {cartOpen && <CartDropdown setOpen={setCartOpen} />}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Page;
