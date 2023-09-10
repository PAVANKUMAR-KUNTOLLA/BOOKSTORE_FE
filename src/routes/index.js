import React, { lazy } from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AppLayout from "./../Layout/MainLayout/index";
import Loadable from "../components/Loadable";

import config from "../config";

// const HomePage = Loadable(lazy(() => import("../views/Home/home.page"));
const HomePage = Loadable(lazy(() => import("../views/Home/home.page")));
const BooksViewPage = Loadable(
  lazy(() => import("../views/Books/detailview.page"))
);
const ProfilePage = Loadable(
  lazy(() => import("../views/Profile/profile.page"))
);

const BooksPage = Loadable(lazy(() => import("../views/Books/books.page")));
const FavouritePage = Loadable(
  lazy(() => import("../views/Favourites/favourite.page"))
);
const CartPage = Loadable(lazy(() => import("../views/Cart/cart.page")));

const LoginViewPage = Loadable(lazy(() => import("../views/Auth/LoginView")));
const RegisterView = Loadable(lazy(() => import("../views/Auth/RegisterView")));
const ResetPasswordView = Loadable(
  lazy(() => import("../views/Auth/ResetPasswordView"))
);

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
        <Route path="home" element={<HomePage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="books/:id/:title" element={<BooksViewPage />} />
        <Route path="books/categories/:category" element={<BooksPage />} />
        <Route path="favourites" element={<FavouritePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="/login" element={<LoginViewPage />} />
      <Route path="/register" element={<RegisterView />} />
      <Route
        path="/reset-password/:uidb64/:token"
        element={<ResetPasswordView />}
      />
    </Routes>
  );
};

export default AppRoutes;
