import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import { productsApi } from '~/API/productsApi'

const ScreenProfile = () => {
   const { enqueueSnackbar } = useSnackbar()

   const [profile, setProfile] = useState({
      username: '',
      email: '',
      phone: '',
      sex: '',
      birth: ''
   })

   const handleSaveProfile = async () => {
      const message = await productsApi.updateProfile(profile)
      enqueueSnackbar(message, {
         variant: 'success'
      })
   }

   useEffect(() => {
      (async function () {
         const data = await productsApi.profile({
            userId: "163e94cc-2888-4d37-b7cb-0c5611568b3a"
         })
         setProfile(
            prev => ({
               ...prev,
               ...data
            })
         )
      })()
   }, [])

   return (
      <div className='w-full py-5'>
         <div className='flex flex-col px-5'>
            <div>
               <h1>My Profile</h1>
               <p>Manage information profile to ensure account.</p>
            </div>

            <div className='bg-gray-200 h-[0.5px] w-full my-5'></div>

            <div className='flex gap-5'>
               <div className='w-4/6 flex flex-col gap-5 px-5 '>
                  <div className='flex gap-5 items-center'>
                     <div className='ml-auto'>
                        <label
                           htmlFor='username'
                        >
                           Username
                        </label>
                     </div>
                     <div className='w-5/6'>
                        <input
                           id='username'
                           type='text'
                           onChange={(e) => {
                              setProfile(
                                 prev => ({
                                    ...prev,
                                    username: e.target.value
                                 })
                              )
                           }}
                           value={profile.username}
                           className='w-full outline-none border border-slate-300 px-3 py-2 '
                        />
                     </div>
                  </div>

                  <div className='flex gap-5 items-center'>
                     <div className='ml-auto'>
                        <label htmlFor='email'>
                           Email
                        </label>
                     </div>
                     <div className='w-5/6'>
                        <input
                           id='email'
                           type='text'
                           onChange={(e) => {
                              setProfile(
                                 prev => ({
                                    ...prev,
                                    email: e.target.value
                                 })
                              )
                           }}
                           value={profile.email}
                           className='w-full outline-none border border-slate-300 px-3 py-2 '
                        />
                     </div>
                  </div>

                  <div className='flex gap-5 items-center'>
                     <div className='ml-auto'>
                        <label htmlFor='phone'>Phone</label>
                     </div>
                     <div className='w-5/6'>
                        <input
                           id='phone'
                           type='text'
                           onChange={(e) => {
                              setProfile(
                                 prev => ({
                                    ...prev,
                                    phone: e.target.value
                                 })
                              )
                           }}
                           value={profile.phone}
                           className='w-full outline-none border border-slate-300 px-3 py-2 '
                        />
                     </div>
                  </div>

                  <form
                     action='/aad'
                     role='radiogroup'
                     className='flex gap-5 items-center'
                  >
                     <div className='ml-auto'>
                        <label>Sex</label>
                     </div>
                     <div className='w-5/6 flex gap-5 items-center'>
                        <div className='flex gap-2 items-center'>
                           <label htmlFor='male'>Male</label>
                           <input
                              id='male'
                              type='radio'
                              value='male'
                              className=' w-full border-red-200'
                           />
                        </div>
                        <div className='flex gap-2 items-center'>
                           <label htmlFor='female'>Female</label>
                           <input
                              id='female'
                              type='radio'
                              value='female'
                           />
                        </div>
                        <div className='flex gap-2 items-center'>
                           <label htmlFor='other'>Other</label>
                           <input
                              id='other'
                              type='radio'
                              value='other'
                           />
                        </div>

                     </div>
                  </form>

                  <div className='flex gap-5 items-center'>
                     <div className='ml-auto'>
                        <label htmlFor='birth'>Birth</label>
                     </div>
                     <div className='w-5/6'>
                        <input
                           type='date'
                        />
                     </div>
                  </div>

                  <div className='flex gap-5 items-center'>
                     <div className='ml-auto'></div>
                     <div className='w-5/6'>
                        <Button
                           variant='contained'
                           onClick={handleSaveProfile}
                        >
                           Save
                        </Button>
                     </div>
                  </div>

               </div>

               <div className='bg-gray-200 h-100 w-[0.5px]'></div>

               <div className='w-2/6 mt-5 flex flex-col gap-2 items-center'>
                  <div>
                     <img
                        src=''
                        alt=''
                        width={100}
                        height={100}
                     />
                  </div>
                  <div>
                     <input
                        id='image'
                        type='file'
                        hidden
                     />
                     <Button>
                        <label htmlFor='image' className='cursor-pointer'>
                           Choose Image
                        </label>
                     </Button>
                  </div>
                  <div className='text-gray-400 text-sm'>
                     <p>Dung luong file toi da 1 MB</p>
                     <p>Dinh dang: .JPEG, .PNG</p>
                  </div>
               </div>

            </div>
         </div>
      </div>
   )
}

export default ScreenProfile
