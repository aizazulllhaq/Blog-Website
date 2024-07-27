import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (!isAdmin) {
    return <Navigate to={"/admin-login"} replace={true}></Navigate>;
  }
  return children;
};

export default Protected;
