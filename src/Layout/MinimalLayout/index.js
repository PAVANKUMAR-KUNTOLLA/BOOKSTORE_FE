import React from "react";
import "../../App.css";

import { useDispatch } from "react-redux";
import { setNavOpen } from "../../redux/app/appSlice";
const montserrat = {
  fontFamily: "Montserrat",
  fontWeight: "700",
};

const options = ["Dashboard", "Transactions", "Schedules", "Users", "Settings"];
const top_pixels = ["164px", "226px", "288px", "350px", "412px"];

const customStyles = {
  mainBlock: {
    width: "280px",
    height: "944px",
    top: "40px",
    left: "40px",
    borderRadius: "30px",
    backgroundColor: "#000000",
    position: "relative",
    marginRight: "0",
  },
  title: {
    ...montserrat,
    position: "absolute",
    fontSize: "36px",
    lineHeight: "43.88px",
    color: "#FFFFFF",
    width: "123px",
    height: "44px",
    top: "60px",
    left: "50px",
  },
  subTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    fontFamily: "Montserrat",
    lineHeight: "21.94px",
  },
  iconsImg: {
    marginLeft: "50px",
    width: "18px",
    height: "18px",
  },
  bottomText: {
    position: "absolute",
    fontFamily: "Montserrat",
    fontWeight: "400",
    color: "#FFFFFF",
    fontSize: "14px",
    lineHeight: "17.07px",
    width: "34px",
    height: "17px",
    marginLeft: "50px",
  },
};

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="mainNavbar">
      <div style={customStyles.mainBlock}>
        <button
          className="navbarButton"
          style={{
            ...customStyles.bottomText,
            top: 20,
            left: 20,
            backgroundColor: "#000000",
            marginLeft: 10,
          }}
          onClick={() => dispatch(setNavOpen(false))}
        >
          Home
        </button>
        <p style={customStyles.title}>Board.</p>

        {options.map((option, id) => (
          <div
            key={id}
            style={{ ...customStyles.subTitle, top: top_pixels[id] }}
          >
            <img
              src={`/static/img/${option}.svg`}
              alt={option}
              style={customStyles.iconsImg}
            />
            <p
              style={{
                color: "#FFFFFF",
                marginLeft: "22px",
                height: "22px",
                fontWeight: id === 0 ? 700 : 400,
              }}
            >
              {option}
            </p>
          </div>
        ))}
        <p style={{ ...customStyles.bottomText, top: "830px" }}>Help</p>
        <p style={{ ...customStyles.bottomText, top: "867px" }}>
          Contact&nbsp;Us
        </p>
      </div>
    </div>
  );
};

export default Navbar;
