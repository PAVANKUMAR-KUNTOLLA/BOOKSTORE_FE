import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { privateApiGET } from "../../components/PrivateRoute";
import Api from "../../components/Api";
import { setBooks } from "../../redux/bookStore/booksSlice";
import { setUserInfo } from "../../redux/app/appSlice";
import SearchResultsPage from "../../components/SearchResults";
import AppBarLayout from "../../components/appbar";

const AppLayout = () => {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loadingSpin, setLoadingSpin] = useState(false);
  const isSearchOn = useSelector((state) => state.books.isSearchOn);
  const navigate = useNavigate();

  const handleFetchbooks = () => {
    setLoadingSpin(true);
    privateApiGET(Api.books)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          // Dispatch the setbooks action with the fetched data
          dispatch(setBooks(data?.data));
          setLoadingSpin(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setLoadingSpin(false);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const handleFetchUserInfo = () => {
    privateApiGET(Api.profile)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          dispatch(setUserInfo(data?.data));
        }
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/app/books") || books.length === 0) {
      handleFetchbooks();
    }
    if (location.pathname === "/app/profile") {
      handleFetchUserInfo();
    }
  }, [location.pathname]);

  useEffect(() => {
    handleFetchUserInfo();
    handleFetchbooks();
  }, []);
  return (
    <div>
      <div>
        <AppBarLayout />
      </div>
      <div>{!isSearchOn ? <Outlet /> : <SearchResultsPage />}</div>
    </div>
  );
};

export default AppLayout;
