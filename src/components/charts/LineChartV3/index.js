import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

//Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import LineChartOptions from "./LineChartOptions";
import MainCard from "../../MainCard";
import {
  convertToLabel,
  intToString,
  validateObjectData,
} from "../../../utils";

import moment from "moment";

// Convert to Chart data
const converToChartData = (data, y) => {
  let tempArr = [];

  Object.keys(data).map((val) => {
    let seriesObj = {};
    seriesObj["name"] = val;
    seriesObj["data"] = [];
    data[val].map((obj) => {
      seriesObj["data"].push(obj[y]);
    });
    tempArr.push(seriesObj);
  });
  console.log(tempArr);
  return tempArr;
};

// X Labels - Categories
function getCategories(data, x) {
  let tempArr = [];
  if (Object.values(data).flat().length) {
    Object.values(data)
      .flat()
      .map((obj) => tempArr.push(obj[x]));
  }
  // if (Object.keys(data).length) {
  //   const arr = Object.keys(data);
  //   console.log("length", data[arr[0]].length);
  //   tempArr = data[arr[0]].map((item) => item[x]);
  // }

  return [...new Set(tempArr)];
}

const LineChartV3 = ({
  data,
  title,
  subtitle,
  chartHeight,
  isLoading,
  xLabel,
  yLabel,
  x_field,
  y_field,
}) => {
  const [chartOptions, setChartOptions] = useState(LineChartOptions);

  console.log("LineChartV3 data", data);

  useEffect(() => {
    if (Object.keys(data).length) {
      setChartOptions({
        ...chartOptions,
        chart: {
          height: `${chartHeight}px`,
        },
        title: { text: title },
        subtitle: { text: subtitle },
        xAxis: {
          title: {
            text: xLabel,
          },
          categories: getCategories(data, x_field),
          //   labels: {
          //     formatter: function () {
          //       //console.log("this.value", this.value);
          //       const splitDateString = this.value.split("-");
          //       const dateFormat = new Date(
          //         splitDateString[2],
          //         splitDateString[1] - 1,
          //         splitDateString[0]
          //       );
          //       return moment(new Date(dateFormat)).format("DD MMM YY"); // example for moment.js date library
          //     },
          //   },
        },
        yAxis: {
          title: {
            text: yLabel,
          },
          labels: {
            formatter: function () {
              return intToString(this.value);
            },
          },
        },
        series: converToChartData(data, y_field),
      });
    } else {
      setChartOptions(LineChartOptions);
    }
  }, [data]);
  return (
    // <MainCard
    //   cardTitle={title}
    //   contentHeight={chartHeight}
    //   isLoadingSpin={isLoading}
    // >
    // {Object.keys(data).length && Object.values(data)[0].length ? (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{
        style: {
          height: "100%",
          width: "100%",
        },
      }}
    />
    //   ) : null}
    // </MainCard>
  );
};

LineChartV3.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  x_field: PropTypes.string,
  y_field: PropTypes.string,
  chartHeight: PropTypes.number,
  isLoading: PropTypes.bool,
};

LineChartV3.defaultProps = {
  title: "Activities",
  subtitle: "May - June 2021",
  chartHeight: 359,
  isLoading: false,
  x_field: "week",
  y_field: "count",
  data: {
    Users: [
      {
        week: "week 1",
        count: 100,
      },
      {
        week: "week 2",
        count: 400,
      },
      {
        week: "week 3",
        count: 125,
      },
      {
        week: "week 4",
        count: 340,
      },
      {
        week: "week 5",
        count: 420,
      },
    ],
    Guest: [
      {
        week: "week 1",
        count: 200,
      },
      {
        week: "week 2",
        count: 420,
      },
      {
        week: "week 3",
        count: 175,
      },
      {
        week: "week 4",
        count: 320,
      },
      {
        week: "week 5",
        count: 400,
      },
    ],
  },
};

export default LineChartV3;
