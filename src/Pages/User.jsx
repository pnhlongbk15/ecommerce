import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import MenuUser from '~/Components/MenuUser'
import Account from '~/Components/Account/Account'
import Notification from '~/Components/Notifications/Notification'
import Modal from '~/Components/Modal'


const User = () => {
   const [openModal, setOpenModal] = useState(false)
   
   const router = [
      {
         path: '/account/*',
         element: <Account openModal={setOpenModal} />,
      },
      {
         path: '/notifications/*',
         element: <Notification />
      }
   ]

   return (
      <div className='min-h-screen py-28 bg-gray-100 relative'>
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
                  {/* <Route path='/account/*' element=<Account setOpenModal={setOpenModal} /> /> */}
               </Routes>
            </div>
         </div>
         {openModal && <Modal openModal={setOpenModal} />}
      </div>
   )
}

export default User
