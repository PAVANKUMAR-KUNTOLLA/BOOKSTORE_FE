import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setNavOpen, setProfile } from "../../redux/app/appSlice";
import Navbar from "../MinimalLayout";
import "../../App.css";

const AppLayout = () => {
  const profile = useSelector((state) => state.app.profile);
  const [isLoadingSpin, SetIsLoadingSpin] = useState(false);
  const isNavOpen = useSelector((state) => state.app.isNavOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(window.screen.width);
    SetIsLoadingSpin(true);
    axios({
      method: "GET",
      url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        dispatch(setProfile(res.data));
        SetIsLoadingSpin(false);
      })
      .catch((err) => {
        console.log(err.response);
        SetIsLoadingSpin(false);
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  return (
    <div>
      {/* {profile && !isLoadingSpin && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
          }}
        >
          {(window.screen.width > 767 || isNavOpen) && <Navbar />}
          {!isNavOpen ? <Outlet /> : null}
        </div>
      )} */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
