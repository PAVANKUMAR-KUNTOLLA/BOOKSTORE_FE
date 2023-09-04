import React, { lazy } from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AppLayout from "./../Layout/MainLayout/index";

import config from "../config";

// const HomePage = lazy(() => import("../views/Home/home.page"));
const HomeBlogPage = lazy(() => import("../views/Home/homeblog.page"));
const SignInPage = lazy(() => import("../views/Auth/signin.page"));

//-----------------------|| ROUTING RENDER ||-----------------------//
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={config.defaultPath} />} />
      <Route
        path="app"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        {/* <Route path="home" element={<HomePage />} /> */}
        <Route path="homeblog" element={<HomeBlogPage />} />
      </Route>
      <Route path="/login" element={<SignInPage />} />
    </Routes>
  );
};

export default AppRoutes;
