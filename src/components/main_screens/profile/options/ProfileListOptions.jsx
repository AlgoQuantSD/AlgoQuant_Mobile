import { Ionicons } from "@expo/vector-icons";
import { React, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlgoquantApiContext from "../../../../general_constants/api/apiContext";
import { WelcomeScreenContext } from "../../../../general_constants/context/WelcomeScreenContext";
import { THEME } from "../../../../general_constants/theme/Theme";
import { handleSignOut } from "../../../../general_helpers/signOut";
import {
  connectToAlpacaModalBuilder,
  deleteAccountModalBuilder,
  disconnectFromAlpacaModalBuilder,
  resetPasswordModalBuilder,
  updateEmailModalBuilder,
  updatePhoneModalBuilder,
} from "../../../general_use/modal/helpers/modalFactory";
import { resetWelcomeScreen } from "../../welcome/helpers/welcomScreenState";

export default function ProfileListOptions(props) {
  // Get access to the algoquant object from parent component to use api
  const algoquantApi = useContext(AlgoquantApiContext);

  // Use to show the welcome screen when the user presses AlgoQuant Tutorial
  const setShowWelcomeScreen = useContext(WelcomeScreenContext);

  // State to keep track if a users account is conntect to alpaca or not
  // Boolean value
  const [alpacaConnection, setAlpacaConnection] = useState(false);
  // Set the information for the corresponding modal
  // (This will be extracted into a separate file containing all functions for setting information for different types of modals)
  function handleListItemPress(key) {
    switch (key) {
      case "TRADE_HISTORY":
        props.navigation.navigate("TradeHistoryScreen");
        break;
      case "CONNECT_ALPACA":
        connectToAlpacaModalBuilder(props);
        break;
      case "DISCONNECT_ALPACA":
        disconnectFromAlpacaModalBuilder(props);
        break;
      case "RESET_PASSWORD":
        resetPasswordModalBuilder(props);
        break;
      case "UPDATE_EMAIL":
        updateEmailModalBuilder(props);
        break;
      case "UPDATE_PHONE":
        updatePhoneModalBuilder(props);
        break;
      case "ALGOQUANT_TUTORIAL":
        resetWelcomeScreen(setShowWelcomeScreen);
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
    { label: "Update phone number", key: "UPDATE_PHONE" },
    { label: "AlgoQuant Tutorial", key: "ALGOQUANT_TUTORIAL" },
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
            name={THEME.icon.name.arrowRight}
            size={THEME.icon.size.small}
            color={THEME.icon.color.primary}
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

    paddingLeft: "10%",
    flex: 0.6,
    width: "100%",
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
    paddingRight: "1%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "9%",
  },
});
