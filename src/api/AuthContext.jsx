import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "./AxiosConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const[accessToken, setAccessToken] = useState(null);
  const [isProfileProfessional, setIsProfileProfessional] = useState(false);
  console.log(accessToken);

  //Function to refresh the access token
  const refreshAccessToken = async () => {
    try {
      const response = await axiosInstance.post("/accounts/token/refresh/");
      setAccessToken(response.data.access_token);
      setIsProfileProfessional(response.data.is_profile_professional);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Token refresh failed:", error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setIsAuthenticated(false);
    setIsProfileProfessional(false);
  };

  //Verify user authentication on app initialization
  useEffect(() => {
    const verifyAuthentication = async () => {
      setLoading(true);
      try {
        await refreshAccessToken();
        setLoading(false);
      } catch (error) {
        console.error("Failed to verify authentication:", error);
      }
    };

    verifyAuthentication();
  }, []);
  const contextValue = {
    loading,
    isAuthenticated,
    axiosInstance, 
    accessToken,
    isProfileProfessional,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
