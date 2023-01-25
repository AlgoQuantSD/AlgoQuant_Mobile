import { React, useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  connectToAlpacaModalBuilder,
  deleteAccountModalBuilder,
  disconnectFromAlpacaModalBuilder,
  resetPasswordModalBuilder,
} from "../../helpers/modalFactory";
import { handleSignOut } from "../../helpers/signOut";
import { MOCK_USER } from "../../constants/MockUser";
import AlgoquantApiContext from "../../constants/ApiContext";

export default function ProfileListOptions(props, { navigation }) {
  // Get access to the algoquant object from parent component to use api
  const algoquantApi = useContext(AlgoquantApiContext);

  // State to keep track if a users account is conntect to alpaca or not
  // Boolean value
  const [alpacaConnection, setAlpacaConnection] = useState(false);
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
      case "RESET_PASSWORD":
        resetPasswordModalBuilder(props);
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
  // If the user is connected to Alpaca (true) then DISCONNECTED_ALPACA will show "Disconnect from Alpaca" on the screen
  // If the user is not connected to Alpaca (false) then CONNECT_ALPACA will show "Connect to Alpaca" on the screen
  const filteredOptions = options.filter((option) => {
    if (option.key === "CONNECT_ALPACA") {
      return !alpacaConnection;
    } else if (option.key === "DISCONNECT_ALPACA") {
      return alpacaConnection;
    }
    return true;
  });

  // Get user information using algoquant api, set the alpaca connection based on the information receieved.
  useEffect(() => {
    if (algoquantApi.token) {
      algoquantApi.getUser().then((resp) => {
        setAlpacaConnection(resp.data.alpaca);
      });
    }
  }, [algoquantApi]);

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
