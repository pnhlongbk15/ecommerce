import { axiosClient } from "./axiosClient"

export const authApi = {
    signIn: async (email, password) => {
        try {
            const data = await axiosClient.post('/signIn', { email, password })
            return data
        } catch (error) {
            throw (new Error("Error at usersApi:" + error))
        }
    },
    signUp: async (username, email, password) => {
        try {
            const data = await axiosClient.post('/signUp', { username, email, password })
            return data
        } catch (error) {
            throw (new Error("Error at usersApi:" + error))
        }
    }
}