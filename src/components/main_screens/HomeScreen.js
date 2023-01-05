import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { UserContext } from "../../constants/UserContext";
import CustomButton from "../CustomButton";
import { Auth } from "aws-amplify";
import { Theme } from "../../constants/Theme";

export default function HomeScreen({ navigation }) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  // Reload the component when the user info is fetched
  useEffect(() => {
    setLoading(false);
  }, [userInfo]);

  // Clear the user info and sign out
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
    setUserInfo({});
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000000"></ActivityIndicator>
      ) : (
        <Text style={styles.text}>
          Welcome to the home screen!{" "}
          {JSON.stringify(userInfo?.attributes?.email)}
        </Text>
      )}
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
