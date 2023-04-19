import { Authenticator } from "@aws-amplify/ui-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signUpConfig } from "./src/authentication/SignUpConfig";
import config from "./src/authentication/aws-exports";
import { CUSTOM_AUTH_THEME } from "./src/constants/CustomAuthTheme";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";

// Analytics disabled since it is unnecesary and causes an unhandled promise rejection warning
Amplify.configure({ ...config, Analytics: { disabled: true } });

function App() {
  return (
    <Authenticator.Provider>
      <SafeAreaProvider>
        <NavigationContainer>
          <BottomTabNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
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
