import React from "react";
import { Circle, G } from "react-native-svg";
import { THEME } from "../../constants/Theme";

export default function CustomFlyout(props) {
  const { x, y, active } = props;
  const circleRadius = 5;
  const circleColor = THEME.colors.primary; // Change this to the desired color

  if (!active) {
    return null;
  }

  return (
    <G>
      <Circle cx={x} cy={y} r={circleRadius} fill={circleColor} />
    </G>
  );
}
