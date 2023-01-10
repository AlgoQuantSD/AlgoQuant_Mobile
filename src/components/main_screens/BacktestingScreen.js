import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

export default function BacktestingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the backtesting screen!</Text>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("CreateBacktestScreen")}
      >
        Press here to create a backtest
      </Text>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("BacktestResultsScreen")}
      >
        Press here to view one of your previous backtests.
      </Text>
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
