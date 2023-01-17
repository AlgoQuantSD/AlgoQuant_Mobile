import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { THEME } from "../../constants/Theme";

export default function HomeScreen({ navigation }) {
  // Get the current user and only refresh the component if user is updated
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the home screen! {user?.attributes?.email}
      </Text>
      <View style={styles.carouselContainer}>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate("InvestorScreen")}
        >
          InvestorScreen
        </Text>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate("JobScreen")}
        >
          JobScreen
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  carouselContainer: {
    height: "10%",
    width: "75%",
    display: "flex",
    flexDirection: "row",
    padding: "5%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
