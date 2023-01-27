import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SnackbarContent(props) {
  const { iconName, iconSize, iconColor, text, textColor } = props;
  return (
    <View style={{ flexDirection: "row" }}>
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={{ paddingRight: "1%" }}
      />
      <Text style={{ color: textColor }}>{text}</Text>
    </View>
  );
}
