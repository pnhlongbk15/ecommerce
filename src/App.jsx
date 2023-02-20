import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import Switch from './Router/Switch'

import { DefaultLayout } from './Layouts'

import { initial, resetNotify } from './Redux/Slice/authSlice'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username, isLogin, notify } = useSelector(state => state.auth)

  const { enqueueSnackbar } = useSnackbar()
  const handleNotify = (error, success) => {
    if (error) {
      enqueueSnackbar(error, {
        variant: 'error'
      })
      return;
    } else {
      enqueueSnackbar(success, {
        variant: 'success'
      })
      dispatch(resetNotify())
    }

  }

  useEffect(() => {
    if (isLogin) {
      navigate('/')
    }
  }, [username])

  useEffect(() => {
    const { status, message } = notify
    if (message) {
      if (status === 'error') {
        handleNotify(message)
      } else {
        handleNotify(null, message)
      }
    }
  }, [notify.message])

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
