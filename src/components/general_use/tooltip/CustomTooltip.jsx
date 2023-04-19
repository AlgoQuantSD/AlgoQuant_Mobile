import React from "react";
import { Text } from "react-native";
import Animated, { SlideInUp, SlideOutDown } from "react-native-reanimated";
import { THEME } from "../../../constants/Theme";

export default function CustomTooltip(props) {
  const { text } = props;
  return (
    <Animated.View
      entering={SlideInUp.delay(300)}
      exiting={SlideOutDown}
      style={{
        backgroundColor: THEME.colors.ternary,
        padding: "4%",
        borderWidth: 2,
        borderColor: THEME.colors.foreground,
      }}
    >
      <Text style={{ color: THEME.text.color.primary, lineHeight: 25 }}>
        {text}
      </Text>
    </Animated.View>
  );
}
