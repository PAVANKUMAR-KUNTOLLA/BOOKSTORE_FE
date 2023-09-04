const chartOptions = {
  typography: {
    fontFamily: " Montserrat",
  },
  colors: ["#f4a347", "#f4a347", "#a3c388", "#1a99aa", "#103c46", "#88ba01"],
  colorsV2: ["#0D4C92", "#59C1BD", "#7EC384", "#6AA5A9"],
};

const LineChartOptions = {
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
    text: undefined,
    style: {
      fontFamily: " Montserrat",
      fontWeight: "700",
      fontSize: "18px",
      lineHeight: "21.94px",
      color: "#000000",
    },
    align: "left",
    x: 10,
    y: 30,
    margin: 60,
  },

  subtitle: {
    text: undefined,
    style: {
      fontFamily: " Montserrat",
      fontSize: "14px",
      fontWeight: "400",
      color: "#858585",
      lineHeight: "17px",
    },
    align: "left",
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
    categories: [],
  },

  legend: {
    align: "right",
    verticalAlign: "top",
    position: "absolute",
    floating: true,
    y: 30,
    x: 0,
  },

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
};

export default LineChartOptions;
