import { useState, useEffect } from 'react';
import axiosInstance from '../api/AxiosConfig';
import { useAuth } from '../api/AuthContext';

const Account = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        axiosInstance.get('/accounts/user/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            setUserInfo(response.data);
        })
        .catch((error) => {
            console.error('Error fetching account information:', error);
        });
    }, [accessToken]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Mes informations : </h1>
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Type de compte:</strong> {userInfo.profile.is_particular ? 'Particulier' : 'Professionnel'}</p>
        </div>
    );
};

export default Account;