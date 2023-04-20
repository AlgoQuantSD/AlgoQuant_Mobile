import { Authenticator } from "@aws-amplify/ui-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signUpConfig } from "./src/authentication/SignUpConfig";
import config from "./src/authentication/aws-exports";
import WelcomeScreen from "./src/components/main_screens/welcome/WelcomeScreen";
import {
  checkWelcomeScreenShown,
  resetWelcomeScreen,
} from "./src/components/main_screens/welcome/helpers/welcomScreenState";
import { CUSTOM_AUTH_THEME } from "./src/general_constants/theme/CustomAuthTheme";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";

// Analytics disabled since it is unnecesary and causes an unhandled promise rejection warning
Amplify.configure({ ...config, Analytics: { disabled: true } });

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    checkWelcomeScreenShown(setShowWelcomeScreen);
    resetWelcomeScreen(setShowWelcomeScreen);
  }, []);

  return (
    <Authenticator.Provider>
      <SafeAreaProvider>
        {showWelcomeScreen ? (
          <WelcomeScreen setShowWelcomeScreen={setShowWelcomeScreen} />
        ) : (
          <NavigationContainer>
            <BottomTabNavigation />
          </NavigationContainer>
        )}
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
