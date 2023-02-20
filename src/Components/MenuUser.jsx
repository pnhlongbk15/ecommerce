import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'

const MenuUser = () => {
  const menu = useRef();
  const { avatar } = useSelector(state => state.auth);
  const [prev, setPrev] = useState();
  const [header, setHeader] = useState();

  // useEffect(() => {
  //   const subTag = [...menu.current.querySelectorAll('[data-tag=sub-tag]')]
  //   if (subTag.length > 0) {
  //     const handleEvent = (e) => {
  //       // e.preventDefault() // để cái này thì Link nó k redirect được
  //       e.stopPropagation()
  //       // prev.current = e.target
  //       setPrev(e.currentTarget)
  //       prev?.classList.remove('text-blue-400')
  //       e.currentTarget.classList.add('text-blue-400')
  //     }

  //     subTag.forEach(tag => {
  //       tag.addEventListener('click', handleEvent)
  //     })
  //     return () => {
  //       subTag.forEach(tag => {
  //         tag.removeEventListener('click', handleEvent)
  //       })
  //     }
  //   }
  // }, [prev])
  // đầu tiên khi click vào link nó sẽ thực hiện handleEvent sao đó nó sẽ vào return (return được chạy thẳng không bị điều kiện ảnh hưởng) sau đó con trỏ lên đầu useEffect chạy từ trên xuống như thường.


  return (
    <div className='w-full p-5' ref={menu}>
      <div className='flex flex-col justify-center'>
        <div className='flex items-center gap-2 h-15 overflow-hidden'>
          <div className='flex justify-center items-center h-[50px] w-[50px] rounded-full'>
            {avatar ? (
              <img
                className='rounded-full bg-cover bg-center bg-no-repeat'
                src={`data:image/png;base64,${avatar}`}
                alt='avatar'
              />
            ) : (
              <Skeleton className='w-full h-full rounded-full' />
            )}
          </div>

          <div>
            <p className='tracking-wider font-medium'>pnhlongbk15</p>
            <div className='flex gap-2 items-center text-gray-500 text-sm tracking-wide'>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
              <span>Sua Chua</span>
            </div>
          </div>
        </div>
        <div className='w-full h-[0.5px] bg-gray-300 my-5'></div>
        <div className='flex flex-col gap-5'>

          <div className='flex gap-5 text-md'>
            <div>
              <FontAwesomeIcon icon="fa-solid fa-user" />
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <Link to='/user/account/profile' className='hover:text-blue-400'>
                  My Profile
                </Link>
              </div>
              <div className='flex flex-col text-sm '>
                <Link to='/user/account/profile' data-tag='sub-tag'>
                  Profile
                </Link>
                <Link to='/user/account/payment' data-tag='sub-tag'>
                  Bank
                </Link>
                <Link to='/user/account/address' data-tag='sub-tag'>
                  Address
                </Link>
                <Link to='/user/account/password' data-tag='sub-tag'>
                  Password
                </Link>
              </div>
            </div>
          </div>

          <div className='flex gap-5 text-md'>
            <div>
              <FontAwesomeIcon icon="fa-solid fa-bell" />
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <Link to='/user/notifications/order' className='hover:text-blue-400' >
                  Notification
                </Link>
              </div>
              <div className='flex flex-col text-sm '>
                <Link to='/user/notifications/order' data-tag='sub-tag'>
                  Update Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuUser
