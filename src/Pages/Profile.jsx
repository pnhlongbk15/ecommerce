import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import BarProfile from '~/Components/Profile/BarProfile'
import ScreenProfile from '~/Components/Profile/ScreenProfile'

const Router = [
   {
      path: '/profile',
      element: <ScreenProfile />
   }
]



const Profile = () => {
  

   return (
      <div className='min-h-screen py-28 bg-gray-100'>
         <div className='flex px-5'>
            <div className='w-1/5 h-5 px-5'>
               <BarProfile />
            </div>
            <div className='w-4/5 min-h-[80vh] bg-white'>
               <Routes>
                  {
                     Router.map((route, id) => (
                        <Route key={id} {...route} />
                     ))
                  }
               </Routes>
            </div>
         </div>
      </div>
   )
}

export default Profile
