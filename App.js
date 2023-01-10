import { useState, useEffect, useMemo } from "react";
import { Amplify, Auth } from "aws-amplify";
import config from "./src/authentication/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { signUpConfig } from "./src/authentication/SignUpConfig";
import { CUSTOM_AUTH_THEME } from "./src/constants/CustomAuthTheme";
import { UserContext } from "./src/contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigaton from "./src/components/navigation/BottomTabNavigaton";

// Analytics disabled since it is unnecesary and causes an unhandled promise rejection warning
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

// Wrap our application in Amplify's authenticator flow, this lets Amplify manage our user's auth state
// It also provides us with Amplify's sign in, sign up, forgot password, and verify account
export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes: "email",
  theme: CUSTOM_AUTH_THEME,
});
