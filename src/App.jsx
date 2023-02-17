import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Switch from './Router/Switch'

import { DefaultLayout } from './Layouts'

import { initial } from './Redux/Slice/authSlice'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username, isLogin } = useSelector(state => state.auth)

  useEffect(() => {
    if (isLogin) {
      navigate('/')
    }
  }, [username])

  useEffect(() => {
    dispatch(initial())
  }, [])

  return (
    <DefaultLayout>
      <Switch />
    </DefaultLayout>
  )
}

export default App
