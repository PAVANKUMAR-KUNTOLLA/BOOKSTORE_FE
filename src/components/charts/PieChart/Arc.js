import React from "react";

function transform(d, arc) {
  var _d = arc.centroid(d);
  _d[0] *= 2.2; //multiply by a constant factor
  _d[1] *= 2.2; //multiply by a constant factor
  return "translate(" + _d + ")";
}

function textAnchor(d) {
  var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
  return midangle < Math.PI ? "start" : "end";
}

export const Arc = (props) => {
  const {
    data,
    index,
    createArc,
    colors,
    format,
    toolTipHtml,
    tooltip,
    dValue,
    tValue,
  } = props;
  return (
    <g
      key={index}
      className="arc"
      onMouseOver={(e) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(toolTipHtml ? toolTipHtml(props) : dValue(data))
          .style("left", e.pageX + "px")
          .style("top", e.pageY - 28 + "px")
          .style("position", "absolute");
      }}
      onMouseOut={() => tooltip.transition().duration(500).style("opacity", 0)}
    >
      <path className="arc" d={createArc(data)} fill={colors[index]} />
      <text
        transform={`translate(${createArc.centroid(data)})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize="11"
      >
        {/* {format(data.value)} */}
      </text>
    </g>
  );
};
