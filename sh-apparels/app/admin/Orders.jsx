import { useState, useEffect } from 'react';
import axios from 'axios';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('orderNo'); // Default sort by orderNo
  const [sortOrder, setSortOrder] = useState('asc');

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

  const handleStatusChange = (orderId, newStatus) => {
    // Assuming you have an API endpoint to update the order status
    axios
      .put(`/api/order`, { status: newStatus })
      .then((response) => {
        // Update the local state with the new order status
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
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
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-2 py-1 border border-gray-300 rounded"
      />
      <select
        value={`${sortBy}-${sortOrder}`}
        onChange={handleSortChange}
        className="mb-4 px-2 py-1 border border-gray-300 rounded"
      >
        <option value="orderNo-asc">Sort by Order No (Ascending)</option>
        <option value="orderNo-desc">Sort by Order No (Descending)</option>
        {/* Add more sorting options for other fields if needed */}
      </select>
      {sortedOrders.map((order) => (
        <div key={order._id} className="bg-white shadow-md p-4 mb-4">
          <p className="font-bold">Order No: {order.orderNo}</p>
          <p>Full Name: {order.fullName}</p>
          <p>Email: {order.email}</p>
          <p>Address: {order.address}</p>
          <p>Phone No: {order.phoneNo}</p>
          <p>Products: {order.Products.join(' , ')}</p>
          <p>Product Name:{order.ProductName.join(' , ')}</p>
          <p>Product Quantity: {order.ProductQuantity.join(' , ')}</p>
          <p>Total Amount: {order.totalAmount}</p>
          <p>
            Status:
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
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
