
import React,{useContext} from 'react'
import { getSession } from './getSession'
import { CartContext } from '@/context/CartContext'


const page = async() => {
  const { cart } = useContext(CartContext);
  const session =await getSession()
  if(!session){
    return (
      <div>
        <h1>you are not logged in</h1>
      </div>
    )
  }
  if(!cart){
    return (
      <div>
        <h1>you have no items in cart</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>you are logged in</h1>
      <h1></h1>
    </div>
  )
}

export default page