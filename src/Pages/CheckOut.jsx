import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack'


import { productsApi } from '~/API/productsApi';

const CheckOut = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const cartProducts = useSelector(state => state.cart);

  const notiSuccess = (message) => {
    enqueueSnackbar(message, {
      variant: 'success'
    })
  }

  const [info, setInfo] = useState({
    fullName: 'Pham Ngoc Hoang Long',
    telephone: '0346059487',
    address: '185/1, Phạm văn chiêu, Phường 14, Quận Gò Vấp, TP. Hồ Chí Minh',
  })

  const handleChangeAddress = () => {

  }
  const subTotal = cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0);

  const handleOrder = async () => {
    const products = cartProducts.map(product => ({
      productId: product.id,
      price: product.price,
      quantity: product.quantity
    }))
    const data = {
      products: products,
      totalPrice: subTotal
    }
    const message = await productsApi.order(data)
    if (message) {
      notiSuccess(message)
    }
    console.log('send order', message)
  }

  console.log('checkout', subTotal)
  return (
    <div className='min-h-screen py-28 bg-gray-100'>
      <div className='px-5'>
        <div className='px-5 bg-white'>
          <div className='py-5'>
            <p className='text-red-500 tracking-wider font-medium text-lg mb-2'>
              <FontAwesomeIcon
                color='red'
                icon="fa-solid fa-location-dot"
              /> Địa chỉ nhận hàng
            </p>
            <div className='flex gap-5'>
              {info.fullName && (
                <>
                  <p className='text-medium'>{info.fullName}</p>
                  <p className='text-medium'>{info.telephone}</p>
                  <p>{info.address}</p>
                </>
              )}
              <button
                className='text-blue-500 ml-10'
                onClick={handleChangeAddress}
              >
                Change
              </button>
            </div>
          </div>
        </div>

        <div className='px-5 my-5 bg-white'>
          {/* padding */}
          <div className='py-5'>
            {/* header */}
            <div className='flex mb-10'>
              <p className='w-3/5 font-medium'>Products</p>
              <div className='w-2/5 flex text-gray-400 text-sm'>
                <div className='w-4/5 flex'>
                  <span className='basis-1/3 text-center'>Price</span>
                  <span className='basis-1/3 text-center'>Quantity</span>
                </div>
                <span className='ml-auto'>Total</span>
              </div>
            </div>
            {/* detail product */}
            {cartProducts.map(product => {
              return (
                <div key={product.id} className='flex'>
                  <div className='w-3/5 flex items-center gap-4'>
                    <img
                      src={product.image}
                      alt={product.title}
                      width={50}
                      height={50}
                    />
                    <Link
                      className='text-base truncate'
                      to={`/products/${product.id}`}
                    >
                      {product.title}
                    </Link>
                  </div>
                  <div className='w-2/5 flex'>
                    <div className='w-4/5 flex'>
                      <span className='basis-1/3 text-center'>{product.price}</span>
                      <span className='basis-1/3 text-center'>{product.quantity}</span>
                    </div>
                    <span className='ml-auto'>
                      {new Intl.NumberFormat(
                        'vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }
                      ).format(
                        product.price * product.quantity
                      )}
                    </span>
                  </div>
                </div>
              )
            })}
            <div className='h-[1px] mt-10 bg-red-500'></div>
            <div className='mt-5 flex'>
              <div className='w-1/12 ml-auto mr-5'>Tổng số tiền :</div>
              <span>
                {
                  new Intl.NumberFormat(
                    'vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }
                  ).format(subTotal)
                }
              </span>
            </div>
          </div>
        </div>
        <div>
          <button
            className='block ml-auto bg-red-500 px-10 py-2'
            onClick={handleOrder}
          >
            Order
          </button>
        </div>
      </div>
    </div >
  )
}

export default CheckOut
