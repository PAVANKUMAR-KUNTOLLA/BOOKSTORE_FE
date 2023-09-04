import React from "react";

// figure alternative. Not the proper way

export const Legends = ({ data, textValue, colors, width, isHorizontal }) => {
  //console.log("Data", data);
  //   var itemWidth = 100;
  var itemHeight = 0;

  var lengthAcc = 0;
  var current = 0;

  return data?.map((each, i) => {
    current = lengthAcc;

    console.log("textValue", textValue(each).length);
    lengthAcc += textValue(each).length * 9 + 18;
    return (
      <g
        key={textValue(each)}
        transform={"translate(" + current + "," + itemHeight + ")"}
      >
        <circle cx={7} cy={7} r={6} fill={colors[i]} />
        <text fontSize="14" x={17} y={12} textAnchor={"start"}>
          {textValue(each)}
        </text>
      </g>
    );
  });
};
