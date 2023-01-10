import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import CustomButton from "../CustomButton";
import { Auth } from "aws-amplify";
import { Theme } from "../../constants/Theme";

export default function HomeScreen({ navigation }) {
  // Get the current user, refresh app state only if the user changes
  const { user } = useAuthenticator((context) => [context.user]);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the home screen! {user?.attributes?.email}
      </Text>

      <View style={{ position: "absolute", top: 60, right: 1 }}>
        <CustomButton label="Sign Out" action={signOut} />
      </View>
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
    backgroundColor: Theme.colors.background,
  },
  text: {
    fontSize: Theme.text.fontSizeBody,
    color: Theme.text.color,
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
