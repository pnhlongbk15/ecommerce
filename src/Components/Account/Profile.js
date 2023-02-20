import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from 'react-loading-skeleton'

import { authApi } from '~/API/authApi'
import { setupAvatar } from '~/Redux/Slice/authSlice'

import { profileController } from '~/Controllers/auth.controller'

const Profile = () => {
   const dispatch = useDispatch()
   const { enqueueSnackbar } = useSnackbar()
   const { avatar, message } = useSelector(state => state.auth)
   const [profile, setProfile] = useState({
      username: '',
      email: '',
      phone: '',
      sex: '',
      birth: ''
   })
   

   const handleSaveProfile = async () => {
      profileController.handleUpdateProfile(profile, dispatch)
   }

   const handleChangeImage = async (e) => {
      const file = e.target.files[0]
      const isSuccess = profileController.handleUpdateAvatar(file, dispatch)
      if (isSuccess) {
         profileController.handleResetAvatar(dispatch)
      }
   }

   useEffect(() => {
      if (message) {
         enqueueSnackbar(message, {
            variant: 'success'
         })
      }
   }, [message])

   useEffect(() => {
      (async function () {
         const data = await authApi.profile({
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


   const handleChangeForm = e => {
      setProfile(
         prev => ({
            ...prev,
            [e.target.name]: e.target.value
         })
      )
   }



   return (
      <div className='w-full py-5'>
         <div className='flex flex-col px-5'>
            <div className='h-15 flex flex-col justify-center'>
               <h1>My Profile</h1>
               <p>Manage information profile to ensure account.</p>
            </div>

            <div className='bg-gray-200 h-[0.5px] w-full my-5'></div>

            <div className='flex gap-5'>
               {/* Form profile */}
               <form
                  onChange={handleChangeForm}
                  className='w-4/6 flex flex-col gap-5 px-5 '
               >
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
                           defaultValue={profile.username}
                           className='w-full outline-none border border-slate-300 px-3 py-2 '
                           name='username'
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
                           defaultValue={profile.email}
                           className='w-full outline-none border border-slate-300 px-3 py-2 '
                           name='email'
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
                           defaultValue={profile.phone}
                           className='w-full outline-none border border-slate-300 px-3 py-2 '
                           name='phone'
                        />
                     </div>
                  </div>

                  <div
                     className='flex gap-5 items-center'
                  >
                     <div className='ml-auto'>
                        <label>Sex</label>
                     </div>
                     <fieldset className='w-5/6 flex gap-5 items-center'>
                        <div className='flex gap-2 items-center'>
                           <label htmlFor='male'>Male</label>
                           <input
                              id='male'
                              type='radio'
                              value='male'
                              className=' w-full border-red-200'
                              name='sex'
                              checked={profile.sex === 'male' && true}
                           />
                        </div>
                        <div className='flex gap-2 items-center'>
                           <label htmlFor='female'>Female</label>
                           <input
                              id='female'
                              type='radio'
                              value='female'
                              name='sex'
                              checked={profile.sex === 'female' && true}
                           />
                        </div>
                        <div className='flex gap-2 items-center'>
                           <label htmlFor='other'>Other</label>
                           <input
                              id='other'
                              type='radio'
                              value='other'
                              name='sex'
                              checked={profile.sex === 'other' && true}
                           />
                        </div>
                     </fieldset>
                  </div>

                  <div className='flex gap-5 items-center'>
                     <div className='ml-auto'>
                        <label htmlFor='birth'>Birth</label>
                     </div>
                     <div className='w-5/6'>
                        <input
                           type='date'
                           name='date'
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

               </form>

               <div className='bg-gray-200 h-100 w-[0.5px]'></div>

               <div className='w-2/6 mt-5 flex flex-col gap-2 items-center'>
                  <div className='h-[100px] w-[100px] rounded-full flex items-center justify-center'>
                     {avatar ? (
                        <img
                           className='w-full h-full rounded-full bg-cover bg-center bg-no-repeat'
                           src={`data:image/png;base64,${avatar}`}
                           alt='avatar'
                        />
                     ) : (
                        <Skeleton className='w-full h-full rounded-full'/>
                     )}
                  </div>
                  <form onChange={handleChangeImage} > {/*encType='multipart/form-data' */}
                     <input
                        id='image'
                        type='file'
                        name='avatar'
                        hidden
                     />
                     <Button>
                        <label htmlFor='image' className='cursor-pointer'>
                           Choose Image
                        </label>
                     </Button>
                  </form>
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

export default Profile
