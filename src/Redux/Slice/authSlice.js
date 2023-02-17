import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '~/API/authApi'


export const signIn = createAsyncThunk('user/signIn', async ({ email, password }) => {
        const data = await authApi.signIn(email, password);
        localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
        localStorage.setItem('username', data.username)
        return data
})

export const signUp = createAsyncThunk('user/signUp', async ({ username, email, password }) => {
        const data = await authApi.signUp(username, email, password);
        return data
})

export const authSlice = createSlice({
        name: 'auth',
        initialState: {
                message: null,
                username: null,
                isLogin: false,
        },
        reducers: {
                logout: (state) => {
                        state.message = null;
                        state.username = null;
                        state.isLogin = false;
                },
                initial: (state) => {
                        state.username = localStorage.getItem('username');
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
                }
        }
})


export const { logout, initial } = authSlice.actions;
