import { StyleSheet } from "react-native";
import { Amplify } from "aws-amplify";
import config from "./src/authentication/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { signUpConfig } from "./src/authentication/SignUpConfig";
import { CustomAuthTheme } from "./src/constants/CustomAuthTheme";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigaton from "./src/components/BottomTabNavigaton";
import { Theme } from "./src/constants/Theme";

// Analytics disabled since it is unnecesary and causes an unhandled promise rejection error
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
