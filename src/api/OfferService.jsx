import axios from 'axios';
import axiosInstance from './AxiosConfig';
import qs from 'qs';


const BASE_URL = '"http://http://35.180.198.48';

export const createOffer = async (offerData, accessToken) => {
    try {
        const response = await axiosInstance.post(`/offers/create/`, offerData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateOffer = async (offerData, accessToken, offerId) => {
    try {
        const response = await axiosInstance.put(`/offers/${offerId}/`, offerData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const deleteOffer = async (offerId, accessToken) => {
    try {
        const response = await axiosInstance.delete(`/offers/${offerId}/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }   catch (error) {
        console.error('Error deleting offer:', error);
        throw error;
    }   
};

export const getAllContractTypes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/offers/get-all-contract-type/`);
        return response.data;
    } catch (error) {
        console.error('Error getting contract types:', error);
        throw error;
    }
}

export const getOfferById = async (id, accessToken) => {
    try {
        const response = await axiosInstance.get(`/offers/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error getting offers:', error);
        throw error;
    }
}

export const getOfferByUser = async (accessToken, page=1) => {
    try {
        const response = await axiosInstance.get(`/offers/`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            params: {
                page: page,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error getting offers:', error);
        throw error;
    }
}

export const searchOffers = async (searchData, page=1) => {
    const formattedSearchData = {
        title: searchData.title,
        zip: searchData.zip,
        city: searchData.city,
        contract: searchData.contract,
        page: page,
    };

    try {
        const response = await axiosInstance.get(`/offers/`, {
            params: formattedSearchData,
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        });
        // Return the response data
        return response.data;
    } catch (error) {
        console.error('Error searching offers:', error);
        throw error;
    }
}

