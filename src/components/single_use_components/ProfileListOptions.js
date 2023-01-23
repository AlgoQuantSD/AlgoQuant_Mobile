import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  connectToAlpacaModalBuilder,
  deleteAccountModalBuilder,
  disconnectFromAlpacaModalBuilder,
} from "../../helpers/modalFactory";
import { handleSignOut } from "../../helpers/signOut";
import { MOCK_USER } from "../../constants/MockUser";

export default function ProfileListOptions(props, { navigation }) {
  // Set the information for the corresponding modal
  // (This will be extracted into a separate file containing all functions for setting information for different types of modals)
  function handleListItemPress(key) {
    switch (key) {
      case "CONNECT_ALPACA":
        connectToAlpacaModalBuilder(props);
        break;
      case "DISCONNECT_ALPACA":
        disconnectFromAlpacaModalBuilder(props);
        break;
      case "DELETE_ACCOUNT":
        deleteAccountModalBuilder(props);
        break;
      case "SIGN_OUT":
        handleSignOut();
        break;
      default:
    }
  }

  const options = [
    { label: "View trade history", key: "TRADE_HISTORY" },
    { label: "Connect to Alpaca", key: "CONNECT_ALPACA" },
    { label: "Disconnect from Alpaca", key: "DISCONNECT_ALPACA" },
    { label: "Reset password", key: "RESET_PASSWORD" },
    { label: "Update email", key: "UPDATE_EMAIL" },
    { label: "Delete account", key: "DELETE_ACCOUNT" },
    { label: "Sign out", key: "SIGN_OUT" },
  ];

  // Render the list options based on the users state
  // We don't want to render connect to alpaca if the user is already connected
  const filteredOptions = options.filter((option) => {
    if (option.key === "CONNECT_ALPACA") {
      return !MOCK_USER.alpaca.isConnected;
    } else if (option.key === "DISCONNECT_ALPACA") {
      return MOCK_USER.alpaca.isConnected;
    }
    return true;
  });

  return (
    <View style={styles.profileListOptionsContainer}>
      {/* Iterate through the options list to render all the options with their labels */}
      {/* If one of the options is pressed we call a handle press function and pass the key to identify which option was pressed */}
      {filteredOptions.map(({ label, key }) => (
        <TouchableOpacity
          style={styles.listItem}
          key={key}
          onPress={() => handleListItemPress(key)}
        >
          <Text style={styles.text}>{label}</Text>
          <Ionicons
            name="arrow-forward"
            size={THEME.text.fontSizeBody}
            color={THEME.colors.foreground}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  profileListOptionsContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: "5%",
    paddingLeft: "10%",
    flex: 0.6,
    width: "100%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
    paddingRight: "1%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "10%",
  },
});
