import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Amplify, Auth } from "aws-amplify";
import config from "./src/authentication/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { signUpConfig } from "./src/authentication/SignUpConfig";
import { CustomAuthTheme } from "./src/constants/CustomAuthTheme";

Amplify.configure(config);

function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to AlgoQuant!</Text>
      <TouchableOpacity onPress={() => Auth.signOut()}>
        <Text>Sign out</Text>
      </TouchableOpacity>
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
