import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../api/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show a loader while verifying the token
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to the login page if not authenticated
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;