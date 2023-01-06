import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";

export default function BacktestResultsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the backtest results screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
