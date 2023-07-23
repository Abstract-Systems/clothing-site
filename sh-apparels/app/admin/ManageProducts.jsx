'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  // State to hold the products
  const [products, setProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to update product stock
  const handleUpdateStock = async (productId, newStockValue) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/products/${productId}`, {
        stock: newStockValue,
      });

      if (response.status === 200) {
        // If the update is successful, update the state with the new stock value
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, stock: newStockValue } : product
          )
        );
      } else {
        console.error('Failed to update stock:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  // Function to delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/products/${productId}`);

      if (response.status === 200) {
        // If the delete is successful, update the state by removing the deleted product
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="mb-2">Price: {product.price}</p>
          <p className="mb-4">Stock: {product.stock}</p>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleUpdateStock(product._id, product.stock + 1)}
            >
              Increase Stock
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleUpdateStock(product._id, product.stock - 1)}
            >
              Decrease Stock
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleUpdateStock(product._id, 0)}
            >
              Make Stock Unavailable
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;
