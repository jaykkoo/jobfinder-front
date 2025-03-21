import axios from 'axios';
import axiosInstance from './AxiosConfig';

const BASE_URL = 'http://35.180.198.48'; 

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`accounts/login/`, userData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`/accounts/register/`, userData);
        alert(userData, "response");
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
};

export const logoutUser = async (logout) => {
    try {
        const response = await axiosInstance.post(`/accounts/logout/`);
        logout();
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}
