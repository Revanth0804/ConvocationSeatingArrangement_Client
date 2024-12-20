import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ isAdminLoggedIn, children }) => {
  if (!isAdminLoggedIn) {
    return <Navigate to="/adminlogin" />;
  }

  return children;
};

export default AdminProtectedRoute;
