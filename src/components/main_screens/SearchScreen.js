import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../../constants/Theme";

export default function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the search screen!</Text>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("StockInfoScreen")}
      >
        View stock info
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
  },
  text: {
    fontSize: Theme.text.fontSizeBody,
    color: Theme.text.color,
  },
});
