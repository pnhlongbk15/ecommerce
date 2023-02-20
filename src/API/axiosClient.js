import axios from "axios"


export const axiosClient = axios.create({
    baseURL: 'https://test-wheat-alpha-28.vercel.app/api/ecommerce',
    headers: {
        'Content-Type': 'application/json',
    }
})
axiosClient.defaults.headers.post['Authorization'] = localStorage.getItem('accessToken')
/*-------------------------------------------------------*/

// axiosClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem('accessToken');
//     console.log(token)
//     if (token) {
//         config.headers.Authorization = token;
//     }
//     return config;
// })

axiosClient.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (erorr) {
        return Promise.reject(erorr)
    }
)