import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '~/API/authApi'


export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }) => {
   const data = await authApi.signIn(email, password);
   const avatar = await authApi.avatar()
   localStorage.setItem('avatar', avatar.image);
   localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
   localStorage.setItem('username', data.username)
   return data
})

export const signUp = createAsyncThunk('auth/signUp', async ({ username, email, password }) => {
   const data = await authApi.signUp(username, email, password);
   return data
})

export const setupAvatar = createAsyncThunk('auth/setupAvatar', async (file) => {
   const message = await authApi.updateAvatar({ avatar: file })
   const avatar = await authApi.avatar()
   localStorage.setItem('avatar', avatar.image);
   return { message, avatar: avatar.image }
})

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      username: null,
      avatar: null,
      isLogin: false,
      notify: {
         status: null,
         message: null
      },
      modal: {
         fullName: '',
         phone: '',
         address: '',
         userId: '',
         action: ''   //complete, back
      }
   },
   reducers: {
      logout: (state) => {
         state.username = null;
         state.isLogin = false;
      },
      initial: (state) => {
         state.username = localStorage.getItem('username');
         state.avatar = localStorage.getItem('avatar');
      },
      notify: (state, action) => {
         state.notify = action.payload
      },
      resetNotify: (state) => {
         state.notify = {
            status: null,
            message: null,
         }
      },
      updateModal: (state, action) => {
         state.modal.fullName = action.payload.fullName;
         state.modal.phone = action.payload.phone;
         state.modal.address = action.payload.address;
         state.modal.userId = action.payload.userId;
         state.modal.action = action.payload.action;
      },
      resetModal: (state) => {
         state.modal = {
            fullName: '',
            phone: '',
            address: '',
            userId: ''
         }
      }
   },
   extraReducers: {
      [signUp.fulfilled]: (state, action) => {
         state.message = action.payload.message;
      },
      [signUp.rejected]: (state, action) => {
         state.message = action.payload.message;
      },
      [signIn.fulfilled]: (state, action) => {
         state.message = action.payload.message;
         state.username = action.payload.username;
         state.isLogin = true;
      },
      [signIn.rejected]: (state, action) => {
         state.message = action.payload.message;
      },
      [setupAvatar.fulfilled]: (state, action) => {
         state.message = action.payload.message;
         state.avatar = action.payload.avatar
      }
   }
})


export const { logout, initial, notify, resetNotify, updateModal, updateAddress, resetModal } = authSlice.actions;
