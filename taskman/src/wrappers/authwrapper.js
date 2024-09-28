import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = ({ element }) => {
  const { isAuthenticated, admin } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    admin ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/home" />
    )
  ) : (
    element
  );
};

export default AuthWrapper;
