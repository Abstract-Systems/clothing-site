"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import { useParams } from 'next/navigation';


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


  return (
    <div>
      {slug}
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
          <div className='flex flex-col gap-6 lg:w-2/4'>
            <img
              src={activeImg}
              alt=''
              className='w-[500px] h-[500px] aspect-square object-cover rounded-xl justify-center'
            />
            <div className='flex flex-row justify-between h-24'>
              {/* Thumbnails */}
            </div>
          </div>
          <div className='flex flex-col gap-4 lg:w-2/4'>
            <div>
              <span className=' text-violet-600 font-semibold'>Special Sneaker</span>
              <h1 className='text-3xl font-bold'>Nike Invincible 3</h1>
            </div>
            <p className='text-gray-700'>Hello, I am description.</p>
            <h6 className='text-2xl font-semibold'>$ 199.00</h6>
            <div className='flex flex-row items-center gap-12'>
              <div className='flex flex-row items-center'>
                {/* Quantity buttons */}
              </div>
              <button className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
    
        <div>
          <p>Please log in to view this page.</p>
          <div>

          <li><Link className='"bg-blue-800 p-4 border-2' href="/api/auth/signin">Sign In</Link></li>
          </div>
        </div>
    </div>
  );
};

export default ProductPage;
