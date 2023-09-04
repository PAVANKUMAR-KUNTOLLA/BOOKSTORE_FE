import React from "react";

// figure alternative. Not the proper way

export const LegendsV2 = ({ data, textValue, colors, width, isHorizontal }) => {
  const legendItem = data?.map((each, i) => {
    return (
      <li key={textValue(each)}>
        <span
          style={{
            backgroundColor: colors[i],
          }}
        ></span>
        <p>{textValue(each)}</p>
      </li>
    );
  });

  return <ul>{legendItem}</ul>;
};
