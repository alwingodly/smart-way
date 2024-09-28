import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminWrapper = ({ element }) => {
  const {isAuthenticated , admin} = useSelector((state) => state.auth);
  return isAuthenticated && admin ? element : <Navigate to="/" />;
};

export default AdminWrapper;
