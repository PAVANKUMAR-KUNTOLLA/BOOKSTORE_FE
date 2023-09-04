import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import "../../App.css";

import PieChart from "../../components/charts/PieChart";
import MainCard from "../../components/MainCard";

import Api from "../../components/Api";
import { privateApiGET } from "../../components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import CardItems from "../../components/CardItem/Card";
import SchedulerItem from "../../components/CardItem/Scheduler";
import LineChartV3 from "./../../components/charts/LineChartV3";
import { setNavOpen } from "../../redux/app/appSlice";
import { handleNavChange } from "../../Layout/MainLayout";
const customStyles = {
  title: {
    position: "absolute",
    fontFamily: "Montserrat",
    fontSize: "24px",
    fontWeight: "700",
    lineHeight: "29px",
    letterSpacing: "0em",
    textAlign: "left",

    width: "138px",
    height: "29px",
    marginTop: "0",
    marginBottom: "0",
  },

  searchInput: {
    position: "relative", // Change to relative
    width: "180px",
    height: "30px",
    left: "713px",
    borderRadius: "10px #FFFFFF",
    right: "0px",
    margin: "0px",
    backgroundImage: 'url("/static/img/Buttonsearch.svg")',
  },
  searchInputName: {
    position: "absolute", // Change to absolute
    height: "17px",
    top: "-6px",
    left: "20px", // Move to the left corner
    color: "#B0B0B0",

    fontFamily: "Lato",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "17px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  searchInputlogo: {
    position: "absolute",
    width: "12px",
    height: "12px",
    top: "9px",
    right: "20px", // Move to the right corner

    border: "1px  #858585",
  },
};
const HomePage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState({});
  const [activity, setActivity] = useState({});

  const handleFetchProducts = () => {
    privateApiGET(Api.products)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setProducts(data?.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleFetchActivity = () => {
    privateApiGET(Api.activity)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          setActivity(data?.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    handleFetchActivity();
    handleFetchProducts();
  }, []);

  return (
    <Page title="home">
      <div>
        <div
          className="appBar"
          style={{
            position: "absolute",
            left: "380px",
            width: "1000px",
            height: "30px",
            top: "60px",
            display: "flex", // Add flex display for better alignment
            alignItems: "center", // Center vertically within the container
          }}
        >
          <button
            className="navbarButton"
            onClick={() => dispatch(setNavOpen(true))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu-2"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </button>

          <p style={customStyles.title} className="titleAppBar">
            Dashboard
          </p>
          <div style={customStyles.searchInput} className="searchAppbar">
            <p
              style={customStyles.searchInputName}
              className="searchInputNameAppbar"
            >
              Search...
            </p>
            <img
              src="/static/img/Search.svg"
              style={customStyles.searchInputlogo}
            />
          </div>
          <img
            className="notificationAppbar"
            src="/static/img/Notification.svg"
            alt="notification"
            style={{
              left: "923px",
              position: "absolute",
              width: "18px",
              height: "20px",
            }}
          />
          <img
            className="profileAppbar"
            src="/static/img/Profile.svg"
            alt="profile"
            style={{
              left: "970px",
              position: "absolute",
              width: "30px",
              height: "30px",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: "380px",
          }}
        >
          <CardItems />
        </div>
        {activity && (
          <div
            className="lineChart"
            style={{
              position: "absolute",
              top: "289px",
              left: "380px",
              width: "1000px",
              height: "359px",
            }}
          >
            <LineChartV3
              data={activity.data}
              title={activity.title}
              subtitle={activity.subtitle}
              xLabel={activity.xLabel}
              yLabel={activity.yLabel}
              x_field={activity.x_field}
              y_field={activity.y_field}
            />
          </div>
        )}
        {products && (
          <div
            className="pieChart"
            style={{
              height: "256px",
              width: "480px",
              position: "absolute",
              top: "688px",
              left: "380px",
            }}
          >
            <MainCard
              cardTitle={products.title}
              contentHeight="256px"
              isLoadingSpin={false}
              cardAction={
                // <select
                //   name="month"
                //   id="month"
                //   style={{ borderColor: "transparent", backgroundColor: "none" }}
                // >
                //   <option value="january">Jan-Feb</option>
                //   <option value="february">Feb-Mar</option>
                //   <option value="march">Mar-Apr</option>
                //   <option value="april">Apr-May</option>
                //   <option value="may">May-Jun</option>
                // </select>
                <p>
                  {products.subtitle}
                  <span style={{ paddingLeft: "5px" }}>
                    <img src="/static/img/Vectordropdown.svg" alt="drop down" />
                  </span>
                </p>
              }
            >
              <PieChart data={products.data} />
            </MainCard>
          </div>
        )}
        <div
          className="calendar"
          style={{
            position: "absolute",
            left: "900px",
            top: "688px",
          }}
        >
          <SchedulerItem />
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
