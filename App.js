import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react-native";
import config from "./src/authentication/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { signUpConfig } from "./src/authentication/SignUpConfig";
import { CUSTOM_AUTH_THEME } from "./src/constants/CustomAuthTheme";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigaton from "./src/components/navigation/BottomTabNavigaton";

// Analytics disabled since it is unnecesary and causes an unhandled promise rejection warning
Amplify.configure({ ...config, Analytics: { disabled: true } });

function App() {
  return (
    <Authenticator.Provider>
      <NavigationContainer>
        <BottomTabNavigaton />
      </NavigationContainer>
    </Authenticator.Provider>
  );
}

// Wrap our application in Amplify's authenticator flow, this lets Amplify manage our user's auth state
// It also provides us with Amplify's sign in, sign up, forgot password, and verify account
export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes: "email",
  theme: CUSTOM_AUTH_THEME,
});
