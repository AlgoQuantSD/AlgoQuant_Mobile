import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Amplify, Auth } from "aws-amplify";
import config from "./src/authentication/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { signUpConfig } from "./src/authentication/SignUpConfig";
import { CustomAuthTheme } from "./src/constants/CustomAuthTheme";
import { UserContext } from "./src/constants/UserContext";
import HomeScreen from "./src/components/HomeScreen";

// Analytics disabled since it is unnecesary and causes an unhandled promise rejection error
Amplify.configure({ ...config, Analytics: { disabled: true } });

function App() {
  const [userInfo, setUserInfo] = useState(null);

  // Update the data in our UserContext
  const value = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo, setUserInfo]
  );

  // Get the logged in user info and store it
  async function getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("Current user: ", user);
      setUserInfo(user);
    } catch (error) {
      console.log("Error getting current user: ", error);
    }
  }
  // Run the function to get the logged in user info upon opening the app
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={value}>
      <View style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" />
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Wrap our application in Amplify's authenticator flow
export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes: "email",
  theme: CustomAuthTheme,
});
