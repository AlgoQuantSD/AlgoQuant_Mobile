import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the profile screen!</Text>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("UpdateCredentialsScreen")}
      >
        Press here to reset password
      </Text>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("UpdateCredentialsScreen")}
      >
        Press here to update email
      </Text>
      <Text
        style={styles.text}
        onPress={() => navigation.navigate("TradeHistoryScreen")}
      >
        Press here to view trade history
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
