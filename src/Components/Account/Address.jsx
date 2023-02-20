import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authApi } from '~/API/authApi'
import { notify, updateModal, resetModal } from '~/Redux/Slice/authSlice'

const Address = ({ openModal }) => {
  const [reset, setReset] = useState(false)
  const [address, setAddress] = useState([]);
  const [index, setIndex] = useState(null);
  const { modal } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    // xem lai cai nay
    async function address() {
      const address = await authApi.address()
      setAddress(address)
    }
    setReset(false)

    if (!reset) {
      console.log(reset, 'inital')
      address()
    }
    return () => {
      console.log('return', reset)
      if (reset) {
        console.log(reset, 'update')
        address()
      }
    }
  }, [reset])

  useEffect(() => {
    (async function () {
      if (modal.fullName && modal.action === 'complete') {
        const data = {
          fullName: modal.fullName,
          phone: modal.phone,
          address: modal.address
        }
        let response;
        if (modal.userId) {
          response = await authApi.updateAddress(data)
        } else {
          response = await authApi.addNewAddress(data)
        }
        dispatch(notify(response))

        if (response.status === 'success') {
          openModal(false)
          setReset(true)
          dispatch(resetModal())
        }
      }
    })()
  }, [modal])

  useEffect(() => {
    if (index !== null) {
      const data = {
        fullName: address[index].fullName,
        phone: address[index].phone,
        address: address[index].address,
        userId: address[index].userId
      }
      dispatch(updateModal(data));
      setIndex(null)
      openModal(true)
    }
  }, [index])


  return (
    <div className='w-full py-5 relative overflow-hidden'>
      <div className='flex flex-col'>
        <div className='flex h-15 px-5 items-center justify-between cursor-pointer'>
          <h1>My Address</h1>
          <div
            onClick={() => openModal(true)}
            className='flex items-center gap-2 text-sm bg-yellow-400 py-3 px-5'
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" />
            <span>Add new address</span>
          </div>
        </div>

        <div className='bg-gray-200 h-[0.5px] w-full my-5'></div>
        <div className='flex flex-col px-5'>
          <div className='text-md tracking-wider mb-5'>
            <h1>Address</h1>
          </div>
          <div className='flex flex-col'>
            {address.map((add, index) => {
              return (
                <div key={add.id} className='flex flex-col'>
                  <div className='flex items-center justify-between mb-1'>
                    <div className='flex items-center gap-2'>
                      <span>{add.fullName}</span>
                      <span className='h-6 w-[0.5px] bg-gray-400'></span>
                      <span className='text-sm text-gray-400'>{add.phone}</span>
                    </div>
                    <div className='flex gap-2 text-sm text-blue-400'>
                      <button onClick={e => setIndex(index)}>Update</button>
                      <button>Remove</button>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col justify-center text-sm text-gray-400'>
                      <p>{add.address}</p>
                      <p>Phuong 14, Quan Go Vap, TP.Ho Chi Minh</p>
                    </div>
                    <div className='text-sm text-gray-500 px-2 py-1 border border-gray-400'>
                      <button
                      // onClick={() => }
                      >
                        Setting default
                      </button>
                    </div>
                  </div>
                  <div className='mb-3'>
                    {address.default && (
                      <span className='text-sm text-red-400 px-1 border border-red-400'>Default</span>
                    )}
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Address
