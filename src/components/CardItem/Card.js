import React from "react";
import "../../App.css";
const options = [
  "Total Revenues",
  "Total Transactions",
  "Total Likes",
  "Total Users",
];

const left_pixels = ["0px", "257.89px", "515.78px", "778.95px"];
const background_colors = ["#DDEFE0", "#F4ECDD", "#EFDADA", "#DEE0EF"];
const bottom_text = ["$2,129,430", "1,520", "9,721", "892"];

const lato = {
  fontFamily: "Lato",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "16.8px",
};

const openSans = {
  fontFamily: "Open Sans",
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "33px",
  letterSpacing: "0em",
  textAlign: "left",
};

const CardItems = () => {
  return (
    <div className="mainBlock">
      {options.map((option, id) => (
        <div
          key={id}
          className={id === 1 || id === 3 ? "blockRightCard" : "blockLeftCard"}
          style={{
            left: left_pixels[id],
            backgroundColor: background_colors[id],
            borderRadius: "20px",
          }}
        >
          <img
            src={`../static/img/${option}.svg`}
            alt={option}
            style={{ position: "absolute", top: "20px", left: "169px" }}
          />
          <p
            style={{
              ...lato,
              position: "absolute",
              color: "#000000",
              top: "45px",
              left: "25px",
              margin: "0px",
            }}
          >
            {option}
          </p>
          <p
            style={{
              ...openSans,
              position: "absolute",
              color: "#000000",
              top: "67px",
              left: "25px",
              margin: "0px",
            }}
          >
            {bottom_text[id]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardItems;
