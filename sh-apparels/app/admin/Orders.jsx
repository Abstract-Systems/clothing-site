import {useState,useEffect} from 'react'
import axios from 'axios'


export const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const {data} = await axios.get('/api/order')
      setOrders(data)
      console.log(orders[3].products)
    }
    fetchOrders()
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
        <p>Products: {order.Products}</p>
        <p>Total Amount: {order.totalAmount}</p>
        <p>Status: {order.status}</p>
      </div>
    ))}
  </div>
  )
}
