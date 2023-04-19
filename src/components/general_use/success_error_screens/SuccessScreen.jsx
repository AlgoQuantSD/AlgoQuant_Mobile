import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import Animated, { SlideInUp, SlideOutDown } from "react-native-reanimated";
import { THEME } from "../../../constants/Theme";

export default function SuccessScreen(props) {
  const { message } = props;
  return (
    <Animated.View
      entering={SlideInUp}
      exiting={SlideOutDown}
      style={{ justifyConent: "center", alignItems: "center" }}
    >
      <Ionicons
        name="checkmark-circle-outline"
        color={THEME.colors.success}
        size={164}
      />
      <Text
        style={{
          fontSize: THEME.text.fontSize.H4,
          color: THEME.text.color.primary,
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
}
