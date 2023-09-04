import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

//Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const chartOptions = {
  typography: {
    fontFamily: " Montserrat",
    letterSpacing: " 0em",
  },
  colors: ["#f4a347", "#f4a347", "#a3c388", "#1a99aa", "#103c46", "#88ba01"],
  colorsV2: ["#0D4C92", "#59C1BD", "#7EC384", "#6AA5A9"],
};

export const LineChartOptions = {
  chart: {
    type: "spline",
    style: {
      ...chartOptions.typography,
      maxHeight: "359px",
      maxWidth: "1000px",
      borderRadius: "20px",
      border: "1px solid #EAEAEA",
      backgroundColor: "#FFFFFF",
    },
  },
  colors: chartOptions.colorsV2,
  credits: {
    enabled: false,
  },

  title: {
    text: "U.S Solar Employment Growth",
    align: "left",
    x: 10,
    y: 30,
    margin: 60,
  },

  subtitle: {
    text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
    align: "left",
    fontSize: "14px",
    fontFamily: "400px",
    color: "#858585",
    lineHeight: "17px",
    x: 10,
    y: 60,
  },

  yAxis: {
    title: {
      text: undefined,
    },
  },

  xAxis: {
    accessibility: {
      rangeDescription: "Range: Week 1 to Week 5",
    },
    categories: ["week 1", "week 2", "week 3", "week 4", "week 5"],
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "top",
    floating: true,
    y: 30,
    x: 0,
  },

  series: [
    {
      name: "Installation & Developers",
      data: [100, 400, 125, 340, 420],
    },
    {
      name: "Manufacturing",
      data: [200, 420, 175, 320, 400],
    },
    {
      name: "Sales & Distribution",
      data: [300, 400, 200, 380, 450],
    },
  ],

  plotOptions: {
    series: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
          },
        },
      },
      label: {
        connectorAllowed: false,
      },
      pointStart: 0,
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          width: 1000,
        },
        chartOptions: {
          legend: {
            position: "absolute",
            layout: "horizontal",
            align: "right",
            verticalAlign: "top",
          },
        },
      },
    ],
  },
};

const LineChart = () => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={LineChartOptions}
      containerProps={{
        style: { height: "100%", width: "100%" },
      }}
    />
  );
};

export default LineChart;
