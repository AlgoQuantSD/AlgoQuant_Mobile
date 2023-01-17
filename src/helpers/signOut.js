import React from "react";
import { Alert } from "react-native";
import { Auth } from "aws-amplify";

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export function handleSignOut() {
  Alert.alert(
    "Sign Out",
    "Are you sure you want to sign out?",
    [
      { text: "OK", onPress: () => signOut() },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: false,
    }
  );
}
