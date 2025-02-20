import axios from 'axios';
import axiosInstance from './AxiosConfig';

const BASE_URL = 'http://localhost:8000';

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/accounts/login/`, userData, {
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
        const response = await axiosInstance.post(`${BASE_URL}/accounts/register/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    return response.data;
};

export const logoutUser = async (logout) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/accounts/logout/`);
        logout();
        console.log(response.data), "data";
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}
