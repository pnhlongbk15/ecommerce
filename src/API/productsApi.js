import { axiosClient } from './axiosClient';

export const productsApi = {
    async getCategories() {
        const url = '/products/categories';
        const data = await axiosClient.get(url)
        return data.categories
    },
    async getBrand(info) {
        const url = '/products/brand';
        const data = await axiosClient.post(url, info)
        return data.brand
    },
    async getAllInCategory(info) {
        const url = '/products/show-all';
        const data = await axiosClient.post(url, info)
        return data.products;
    },
    async getDetail(params) {
        const url = `/products/${params.category}/${params.id}`;
        const data = await axiosClient.get(url);
        return data.detail
    },
    async order(info) {
        const url = '/products/order'
        const data = await axiosClient.post(url, info)
        return data.message
    },
    async profile(userId) {
        const url = '/user/account/profile'
        const data = await axiosClient.post(url, userId)
        return data.profile
    },
    async updateProfile(profile) {
        const url = '/user/account/update'
        const data = await axiosClient.post(url, profile)
        return data.message
    },
    add(data) {
        const url = '/products';
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/products/${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
};
