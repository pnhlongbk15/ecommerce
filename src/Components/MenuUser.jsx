import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const MenuUser = () => {
  const menu = useRef();
  const [prev, setPrev] = useState();
  const [header, setHeader] = useState();

  useEffect(() => {
    const subTag = [...menu.current.querySelectorAll('[data-tag=sub-tag]')]
    if (subTag.length > 0) {
      const handleEvent = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // prev.current = e.target
        setPrev(e.currentTarget)
        prev?.classList.remove('text-blue-400')
        e.currentTarget.classList.add('text-blue-400')
      }

      subTag.forEach(tag => {
        tag.addEventListener('click', handleEvent)
      })
      return () => {
        subTag.forEach(tag => {
          tag.removeEventListener('click', handleEvent)
        })
      }
    }
  }, [prev])
  // đầu tiên khi click vào link nó sẽ thực hiện handleEvent sao đó nó sẽ vào return (return được chạy thẳng không bị điều kiện ảnh hưởng) sau đó con trỏ lên đầu useEffect chạy từ trên xuống như thường.

  useEffect(() => {
    const headerTag = [...menu.current.querySelectorAll('[data-tag=header-tag]')]
    if (headerTag.length > 0) {
      const handleEventList = (e) => {
        e.preventDefault();
        e.stopPropagation()
        const target = e.currentTarget.parentElement.nextElementSibling;
        target?.classList.toggle('scroll')
        target?.classList.toggle('stretch')

        if (target !== header) {
          setHeader(target)
          if (header?.classList.contains('stretch')) {
            header?.classList.toggle('stretch')
            header?.classList.toggle('scroll')
          }
        }
      }

      headerTag.forEach(tag => {
        tag.addEventListener('click', handleEventList)
      })
      return () => {
        headerTag.forEach(tag => {
          tag.removeEventListener('click', handleEventList)
        })
      }
    }
  }, [header])

  return (
    <div className='w-full p-5' ref={menu}>
      <div className='flex flex-col justify-center'>
        <div className='flex items-center gap-5'>
          <img
            src=''
            alt=''
            height={50}
            width={50}
          />
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
                <Link to='/user/account/profile' className='hover:text-blue-400' data-tag='header-tag'>
                  My Profile
                </Link>
              </div>
              <div className='flex flex-col text-sm stretch'>
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
                <Link to='/user/notifications/order' className='hover:text-blue-400' data-tag='header-tag'>
                  Notification
                </Link>
              </div>
              <div className='flex flex-col text-sm close'>
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
