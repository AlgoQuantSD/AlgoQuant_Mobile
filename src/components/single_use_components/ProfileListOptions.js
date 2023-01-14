import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileListOptions({ navigation }) {
  const options = [
    { label: "View trade history", key: 0 },
    { label: "Connect to Alpaca", key: 1 },
    { label: "Reset password", key: 2 },
    { label: "Update email", key: 3 },
    { label: "Delete account", key: 4 },
    { label: "Sign out", key: 5 },
  ];
  return (
    <View style={styles.profileListOptionsContainer}>
      {/* Iterate through the options list to render all the options with their labels */}
      {options.map(({ label, key }) => (
        <TouchableOpacity style={styles.listItem} key={key}>
          <Text style={styles.text}>{label}</Text>
          <Ionicons
            name="arrow-forward"
            size={THEME.text.fontSizeBody}
            color={THEME.colors.foreground}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  profileListOptionsContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: "5%",
    paddingLeft: "10%",
    flex: 0.6,
    width: "100%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
    paddingRight: "1%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "10%",
  },
});
