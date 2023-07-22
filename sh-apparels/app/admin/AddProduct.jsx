import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiFile } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';




export const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
const [uploadedImages, setUploadedImages] = useState([]); // New state to track uploaded images

  const [selectedCategory, setSelectedCategory] = useState('');


  const categories = ['Electronics', 'Clothing', 'Accessories', 'Home', 'Beauty'];

  const onDrop = (acceptedFiles) => {
    setImages((prevImages) => prevImages.concat(acceptedFiles));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'scctmgml');
      formData.append('cloud_name', 'dcpuaddce');
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dcpuaddce/image/upload',
        formData
      );
      setUploadedImages((prevImages) => [...prevImages, response.data.public_id]);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="productDetails" className="block text-sm font-medium text-gray-700">
          Product Details
        </label>
        <textarea
          id="productDetails"
          rows="4"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          slug
        </label>
        <input
          id="slug"
          rows="4"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="text"
          id="price"
          className="p-2 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stock" className="block vir text-sm font-medium text-gray-700">
          Stock
        </label>
        <input
          type="text"
          id="stock"
          className="p-2 mt-1 focus:ring-indigo-500 border focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div
          {...getRootProps()}
          className={`mt-4 p-8 border border-dashed rounded-md cursor-pointer ${isDragActive ? 'border-blue-500' : 'border-gray-300'
            }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-500 text-sm">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag and drop files here, or click to select files'}
          </p>
        </div>
        <div className="mt-4">
          {images.map((file, index) => (
            <div key={file.name} className="flex items-center">
              {uploadedImages.includes(file.name) ? (
                <FiCheck className="text-green-500 mr-2" /> // Assuming you have an icon named FiCheck for the tick
              ) : (
                <FiFile className="text-blue-500 mr-2" />
              )}
              <span className="text-sm">{file.name}</span>
              <button
                className="px-2 ml-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={()=>handleImageUpload(file)}
              >
                Upload
              </button>
              <FaTimes
                className="text-red-600 ml-2 cursor-pointer"
                onClick={() => removeImage(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      // onClick={handleSubmit}
      >
        Add Product
      </button>
    </div>
  );
};
