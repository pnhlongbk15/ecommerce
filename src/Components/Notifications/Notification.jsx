import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UpdateOrder from './UpdateOrder'

const router = [
   {
      path: '/order',
      element: <UpdateOrder />
   }
]
const Notification = () => {
   return (
      <div>
         <Routes>
            {
               router.map((route, index) => (
                  <Route key={index} {...route} />
               ))
            }
         </Routes>
      </div>
   )
}

export default Notification
