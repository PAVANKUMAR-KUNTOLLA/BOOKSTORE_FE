import React, { Component } from "react";

const montserrat = {
  fontFamily: "Montserrat",
  fontWeight: "700",
  fontSize: "18px",
  lineHeight: "21.94px",
};

const latoTitle = {
  fontFamily: "Lato",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "16.8px",
  color: "#666666",
};

const latoSubTitle = {
  fontFamily: "Lato",
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "14.4px",
  color: "#999999",
};

const customStyles = {
  mainBlock: {
    position: "relative",
    width: "480px",
    height: "256px",
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
  },
  title: {
    ...montserrat,
    position: "absolute",
    left: "30px",
    top: "40px",
    margin: "0px",
  },
  next: {
    ...montserrat,
    fontWeight: "400",
    position: "absolute",
    fontSize: "12px",
    color: "#858585",
    top: "34px",
    left: "398px",
    margin: "0px",
  },
};

const SchedulerItem = () => {
  return (
    <div className="schedulerBlock" style={customStyles.mainBlock}>
      <p style={customStyles.title}>Today’s schedule</p>
      <p style={customStyles.next}>
        See All
        <img
          src="/static/img/NextArrow.svg"
          style={{
            position: "absolute",
            width: "8.0px",
            height: "5.0px",
            top: "8px",
            left: "40px",
          }}
        />
      </p>

      <div
        style={{
          position: "absolute",
          width: "251px",
          height: "66px",
          top: "77px",
          left: "30px",
          borderLeft: "5px solid #9BDD7C",
          margin: "0px",
        }}
      >
        <p
          style={{
            margin: "0px",
            paddingLeft: "10px",
            ...latoTitle,
            position: "absolute",
            top: "3px",
          }}
        >
          Meeting with suppliers from Kuta Bali
        </p>
        <p
          style={{
            position: "absolute",
            margin: "0px",
            paddingLeft: "10px",
            ...latoSubTitle,
            top: "25px",
          }}
        >
          14.00-15.00
        </p>
        <p
          style={{
            position: "absolute",
            margin: "0px",
            paddingLeft: "10px",
            ...latoSubTitle,
            top: "45px",
          }}
        >
          at Sunset Road, Kuta, Bali{" "}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          width: "227px",
          height: "66px",
          top: "156px",
          left: "30px",
          borderLeft: "5px solid #6972C3",
        }}
      >
        <p
          style={{
            position: "absolute",
            margin: "0px",
            paddingLeft: "10px",
            ...latoTitle,
            top: "3px",
          }}
        >
          Check operation at Giga Factory 1
        </p>
        <p
          style={{
            position: "absolute",
            margin: "0px",
            paddingLeft: "10px",
            ...latoSubTitle,
            top: "25px",
          }}
        >
          18.00-20.00
        </p>
        <p
          style={{
            position: "absolute",
            margin: "0px",
            paddingLeft: "10px",
            ...latoSubTitle,
            top: "45px",
          }}
        >
          at Central Jakarta{" "}
        </p>
      </div>
    </div>
  );
};

export default SchedulerItem;
