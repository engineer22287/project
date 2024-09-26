// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const isResetPassword = localStorage.getItem("isresetpassword");

  return isResetPassword ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
