import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateModal } from '~/Redux/Slice/authSlice'

const Modal = ({ openModal }) => {
  const { modal } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: modal.fullName,
    phone: modal.phone,
    address: modal.address,
    userId: modal.userId
  })

  const handleChangeModal = (e) => {
    e.stopPropagation();
    setForm(
      prev => ({
        ...prev,
        [e.target.name]: e.target.value
      })
    )
  }
  const handleSubmitModal = (e) => {
    e.preventDefault();
    console.log(e.target)
    const data = form;
    data.action = 'complete'
    dispatch(updateModal(data));
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
      <div className='w-full h-full bg-black opacity-20  z-50'>
      </div>
      <form
        onSubmit={handleSubmitModal}
        onChange={handleChangeModal}
        className='absolute top-10 w-[40vw] h-[90vh] z-50 bg-white flex flex-col px-5 rounded-lg pb-5'
      >
        <div className='text-lg h-20 flex items-center'>
          <p>New Address</p>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex gap-5 text-sm'>
            <input
              type='text'
              placeholder='Ho va ten'
              className='flex-1'
              name='fullName'
              defaultValue={modal.fullName}
            />
            <input
              type='text'
              placeholder='phone'
              className='flex-1'
              name='phone'
              defaultValue={modal.phone}
            />
          </div>
          <div>
            <textarea
              placeholder='dia chi cu the'
              rows={2}
              maxLength='128'
              className='w-full'
              name='address'
              defaultValue={modal.address}
            />
          </div>
        </div>
        <div className='mt-auto flex flex-row-reverse gap-5'>
          <Button
            type='submit'
            sx={{
              backgroundColor: 'rgba(250,204,21,1)',
              color: 'rgb(0,0,0)',
              padding: '0.5rem 1.25rem'
            }}
          >
            Complete
          </Button>
          <Button
            onClick={() => openModal(false)}
            sx={{
              padding: '0.5rem 1.25rem'
            }}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Modal
