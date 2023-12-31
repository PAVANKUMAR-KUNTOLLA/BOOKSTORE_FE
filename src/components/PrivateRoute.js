import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const useAuth = () => {
  return !!sessionStorage.getItem("token");
};

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

export const privateApiPOST = (url, data = {}, additionalAttrib = {}) => {
  const token = sessionStorage.getItem("token");

  return axios({
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
    ...additionalAttrib,
  });
};

export const privateApiGET = (url) => {
  const token = sessionStorage.getItem("token");

  return axios({
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
