import React from 'react'
import { getSession } from './getSession'


const page = async() => {
  const session =await getSession()
  if(!session){
    return (
      <div>
        <h1>you are not logged in</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>you are logged in</h1>
      <h1>Welcome,{session.user.name}</h1>
      <h1>Welcome,{session.user.image}</h1>
    </div>
  )
}

export default page