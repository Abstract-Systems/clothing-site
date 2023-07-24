"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CartContext } from '@/context/CartContext';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {
  const [images, setImages] = useState({});

  const { slug } = useParams();
  const [activeImg, setActiveImage] = useState();
  const [amount, setAmount] = useState(1);
  const [data, setData] = useState([]);
  const product = data.find((product) => product.slug === slug);
  const { cart, addToCart } = useContext(CartContext);
  const notify = () => toast.success('Product has been added to cart 🚀', {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setData(data);
        const product = data.find((product) => product.slug === slug);
        setImages(product.images);
        setActiveImage(product.images[0]);

      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);


  if (!product) {
    return (
      <div>
        <p>Loading...</p>
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
        <div className='flex flex-col pl-5 gap-6 lg:w-2/4'>
          <img
            src={activeImg} // Show the active image
            alt=''
            className='w-[500px] h-[500px] aspect-square object-cover rounded-xl justify-center'
          />
          <div className='flex flex-row flex-start space-x-10 h-24'>
            {/* Thumbnails */}
            {Object.values(images).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover cursor-pointer rounded-md ${activeImg === img ? 'border-2 border-violet-600' : ''}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-4 lg:w-2/4'>
          <div>
            <span className=' text-violet-600 font-semibold'>{product.category}</span>
            <h1 className='text-3xl font-bold'>{product.title}</h1>
          </div>
          <p className='text-gray-700'>{product.description}</p>
          <h6 className='text-2xl font-semibold'>PKR {product.price}</h6>
          <div className='flex flex-row items-center gap-12'>
            <div className='flex flex-row items-center'>
              {/* Quantity buttons */}
              <button
                onClick={() => setAmount((prevAmount) => Math.max(prevAmount - 1, 1))}
                className='border border-gray-400 px-3 py-1 rounded-md'
              >
                -
              </button>
              <span className='space-x-4 mx-10'>{amount}</span>
              <button
                onClick={() => setAmount((prevAmount) => prevAmount + 1)}
                className='border border-gray-400 px-3 py-1 rounded-md'
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addToCart({ ...product, amount });
                notify(); // Call the notify function when the product is added to the cart
              }}
              className='bg-violet-800 text-white font-semibold py-3 px-16 mx-4 rounded-xl h-full'
            >
              Add to Cart
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
