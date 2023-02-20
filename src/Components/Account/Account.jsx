import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'


import Address from './Address'
import Password from './Password'
import Payment from './Payment'
import Profile from './Profile'


const Account = ({ openModal }) => {
   
   const router = [
      {
         path: '/profile',
         element: <Profile />
      },
      {
         path: '/payment',
         element: <Payment />
      },
      {
         path: '/address',
         element: <Address openModal={openModal} />,
      },
      {
         path: '/password',
         element: <Password />
      }
   ]

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

export default Account
