import React from "react";
import { Circle, G } from "react-native-svg";
import { Line } from "victory-native";
import { THEME } from "../../../general_constants/theme/Theme";

export default function CustomFlyout(props) {
  const { shape, x, y, active } = props;
  const circleRadius = 5;
  const circleColor = THEME.colors.primary; // Change this to the desired color

  if (!active) {
    return null;
  }

  if (shape === "circle") {
    return (
      <G>
        <Circle cx={x} cy={y} r={circleRadius} fill={circleColor} />
      </G>
    );
  }

  if (shape === "line") {
    return (
      <Line
        x1={x}
        x2={x}
        y1={0} // Top of the chart
        y2={y} // Bottom of the chart, you can adjust this value based on your chart height
        stroke="black" // Change the color of the line here
        strokeWidth={2} // Adjust the thickness of the line here
      />
    );
  }
}
