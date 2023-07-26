import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('orderNo'); // Default sort by orderNo
  const [sortOrder, setSortOrder] = useState('asc');

  const [status, setStatus] = useState('pending')

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get('/api/order');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on the search term
    const filtered = orders.filter(
      (order) =>
        order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      // Add other fields you want to search here
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`/api/order`, {
        _id: orderId,
        status: newStatus,
      });
      console.log(response);
  
      if (response.status === 200) {
        alert('Status updated successfully');
  
        // Assuming setStatus and setOrders are correctly defined in the parent component
        setStatus(newStatus);
        setOrders((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === orderId) {
              return { ...order, status: newStatus };
            }
            return order;
          })
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update status. Please try again later.');
    }
  };
  

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [newSortBy, newSortOrder] = value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Sort the filteredOrders array based on the selected sorting criteria
  const sortedOrders = filteredOrders.sort((a, b) => {
    const compareResult =
      sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    return compareResult;
  });
    return (
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Orders List</h2>
        <div className="mb-4">
          {/* Search input and sorting select remain the same */}
        </div>
        {sortedOrders.map((order) => (
          <div key={order._id} className="bg-white shadow-md p-4 mb-4 rounded-lg border-t-4 border-green-500">
            <p className="font-bold text-xl text-green-600">Order No: {order.orderNo}</p>
            <p className="text-brown-700">Full Name: {order.fullName}</p>
            <p className="text-brown-700">Email: {order.email}</p>
            <p className="text-brown-700">Address: {order.address}</p>
            <p className="text-brown-700">Phone No: {order.phoneNo}</p>
            <p className="text-brown-700">Products: {order.Products.join(' , ')}</p>
            <p className="text-brown-700">Product Name:{order.ProductName.join(' , ')}</p>
            <p className="text-brown-700">Product Quantity: {order.ProductQuantity.join(' , ')}</p>
            <div className="flex items-center mb-2">
              {/* Use Starbucks-themed SVGs or icons here */}
              <img
                src={order.ProductImage}
                alt="Product"
                height={100}
                width={100}
                className="rounded-full"
              />
            </div>
            <p className="text-brown-700">Total Amount: {order.totalAmount}</p>
            <p className="text-brown-700">
              Status:
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded "
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </p>
          </div>
        ))}
      </div>
    );
  };