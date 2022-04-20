import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { uid } = useSelector((state) => state.auth);
  // const { pathname, search } = useLocation();
  // localStorage.setItem("lastPath", pathname + search);
  return uid ? children : <Navigate to="/login" />;
};
