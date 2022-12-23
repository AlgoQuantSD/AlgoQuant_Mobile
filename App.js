import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Amplify, Auth } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { signUpConfig } from "./authentication/SignUpConfig";
import { CustomAuthTheme } from "./constants/CustomAuthTheme";

Amplify.configure(config);

function App() {
  Auth.signOut();
  return (
    <View style={styles.container}>
      <Text>Welcome to AlgoQuant!</Text>
      <StatusBar style="auto" />
    </View>
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

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes: "email",
  theme: CustomAuthTheme,
});
