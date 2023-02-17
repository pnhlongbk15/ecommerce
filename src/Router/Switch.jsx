import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Contact, Products, ProductDetail, LoginForm, RegisterForm, Cart, CheckOut, Profile } from '~/Pages'

const publicRoutes = [
  {
    path: '/',
    element: <Home />
  },
  { path: '/cart', element: <Cart /> },
  { path: '/checkout', element: <CheckOut /> },
  { path: '/products', element: <Products /> },
  { path: '/products/:category/:id', element: <ProductDetail /> },
  { path: '/contact', element: <Contact /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterForm /> },
  {
    path: '/user/account/*',
    // loader: ({ params }) => {
    //   console.log(params["*"])
    // },
    // action: ({ params }) => { },
    element: <Profile />
  }
]

const Switch = () => {
  return (
    <Routes>
      {
        publicRoutes.map((route, id) => (
          <Route key={id} {...route} />
        ))
      }
    </Routes>
  )
}

export default Switch
