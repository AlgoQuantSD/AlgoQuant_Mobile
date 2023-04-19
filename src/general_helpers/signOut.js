import { Auth } from "aws-amplify";
import { Alert } from "react-native";

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {}
}

export function handleSignOut() {
  Alert.alert(
    "Sign Out",
    "Are you sure you want to sign out?",
    [
      { text: "OK", onPress: () => signOut() },
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
    {
      cancelable: false,
    }
  );
}
