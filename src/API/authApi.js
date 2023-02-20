import { axiosClient } from "./axiosClient"

export const authApi = {
    async signIn(email, password) {
        try {
            const data = await axiosClient.post('/signIn', { email, password })
            return data
        } catch (error) {
            throw (new Error("Error signIn at usersApi:" + error))
        }
    },
    async signUp(username, email, password) {
        try {
            const data = await axiosClient.post('/signUp', { username, email, password })
            return data
        } catch (error) {
            throw (new Error("Error signUp at usersApi:" + error))
        }
    },
    async profile(userId) {
        const url = '/user/account/profile'
        const data = await axiosClient.post(url, userId)
        return data.profile
    },
    async updateProfile(profile) {
        const url = '/user/account/profile/update'
        const data = await axiosClient.post(url, profile)
        return data
    },
    async address() {
        try {
            const data = await axiosClient.get('/user/account/profile/address')
            return data.address
        } catch (error) {
            throw (new Error("Error address at usersApi:" + error))
        }
    },
    async updateAddress(address) {
        const url = '/user/account/profile/address/update'
        const response = await axiosClient.post(url, address)
        return response
    },
    async addNewAddress(address) {
        const url = '/user/account/profile/address/add'
        const response = await axiosClient.post(url, address)
        return response
    },
    async updateAvatar(image) {
        const url = '/user/account/profile/avatar/update'
        const response = await axiosClient.post(url, image, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return response
    },
    async avatar() {
        const url = '/user/account/profile/avatar'
        const data = await axiosClient.get(url)
        return data.avatar
    }
}