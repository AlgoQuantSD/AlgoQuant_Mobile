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
  function signOut() {
    setUserInfo({});
    Auth.signOut();
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
      <CustomButton label="Sign Out" action={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: Theme.text.fontSizeBody,
  },
});
