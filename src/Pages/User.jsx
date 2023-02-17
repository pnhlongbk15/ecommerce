import React from 'react'
import { Route, Routes } from 'react-router-dom'

import MenuUser from '~/Components/MenuUser'
import Account from '~/Components/Account/Account'
import Notification from '~/Components/Notifications/Notification'

const router = [
   {
      path: '/account/*',
      element: <Account />
   },
   {
      path: '/notifications/*',
      element: <Notification />
   }
]

const User = () => {
   return (
      <div className='min-h-screen py-28 bg-gray-100'>
         <div className='flex px-5'>
            <div className='w-1/5 h-5 px-5'>
               <MenuUser />
            </div>
            <div className='w-4/5 min-h-[80vh] bg-white'>
               <Routes>
                  {
                     router.map((route, index) => (
                        <Route key={index} {...route} />
                     ))
                  }
               </Routes>
            </div>
         </div>
      </div>
   )
}

export default User
