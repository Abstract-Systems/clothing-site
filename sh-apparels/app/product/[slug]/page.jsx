"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import { DataContext } from '@/context/DataContext';


const ProductPage = () => {
  const [images, setImages] = useState({
    img1: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png',
    img2: 'https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png',
    img3: 'https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png',
    img4: 'https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png',
  });
  const { slug } = useParams();
  const [activeImg, setActiveImage] = useState(images.img1);
  const [amount, setAmount] = useState(1);
  const { data,setData } = useContext(DataContext);
  const product = data.find((product) => product.slug === slug);
  
  if (!product) {
    // fetch product

    return <p>Loading...</p>;
  }



  return (
    <div className="p-4 md:p-6 lg:p-8 mx-auto">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-6 lg:w-2/4">
          <img
            src={product.images[0]}
            alt=""
            className="w-full h-[400px] aspect-square object-cover rounded-xl"
          />
          <div className="flex flex-row justify-between h-24">
            {/* Thumbnails */}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/4">
          <div>
            <span className="text-violet-600 font-semibold"></span>
            <h1 className="text-2xl lg:text-3xl font-bold">{product.title}</h1>
          </div>
          <p className="text-gray-700">{product.description}</p>
          <h6 className="text-xl lg:text-2xl font-semibold">PKR {product.price}</h6>
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12">
            <div className="flex flex-row items-center">
              {/* Quantity buttons */}
            </div>
            <button className="bg-blue-500 text-white font-semibold py-3 px-6 lg:px-16 rounded-xl h-full">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
