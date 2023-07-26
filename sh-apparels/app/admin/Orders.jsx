import {useState,useEffect} from 'react'
import axios from 'axios'

export const Orders = () => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async()=>{
    const response = await axios.get("api/order");
    setOrders(response.data);
  }

  useEffect(() => {
    fetchOrders();
  }, [])
  
  return (
    <div className="container mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4">Orders List</h2>
    {orders.map((order) => (
      <div key={order._id} className="bg-white shadow-md p-4 mb-4">
        <p className="font-bold">Order No: {order.orderNo}</p>
        <p>Full Name: {order.fullName}</p>
        <p>Email: {order.email}</p>
        <p>Address: {order.address}</p>
        <p>Phone No: {order.phoneNo}</p>
        {/* Assuming `order.Products`, `order.ProductName`, and `order.ProductQuantity` are arrays */}
<p>Products: {order.Products.join(', ')}</p>
<p>ProductName: {order.ProductName.join(', ')}</p>
<p>ProductQuantity: {order.ProductQuantity.join(', ')}</p>

        <p>Total Amount: {order.totalAmount}</p>
        <p>Status: {order.status}</p>
      </div>
    ))}
  </div>
  )
}
