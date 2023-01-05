import { useState, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Amplify, Auth } from "aws-amplify";
import config from "./src/authentication/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { signUpConfig } from "./src/authentication/SignUpConfig";
import { CustomAuthTheme } from "./src/constants/CustomAuthTheme";
import { UserContext } from "./src/constants/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigaton from "./src/components/BottomTabNavigaton";
import { Theme } from "./src/constants/Theme";

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
      console.log("Successfully logged in as: ", user.attributes.email);
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
      <NavigationContainer>
        <BottomTabNavigaton />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
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
