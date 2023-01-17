import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileListOptions(props, { navigation }) {
  // Get the functions that we need to setup the edit name modal
  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setModalInputLabels,
    setModalButtons,
  } = props;

  // Set the information for the corresponding modal
  // (This will be extracted into a separate file containing all functions for setting information for different types of modals)
  function handleConnectAlpacaPress() {
    setModalType("CONNECT_ALPACA");
    setModalTitle("Connect to Alpaca");
    setModalHeader("Enter your API key");
    setModalBody(
      "Enter your Alpaca API key below. If you don't have an Alpaca API key you're a loser"
    );
    setModalInputLabels([
      { label: "Alpaca API Key", key: "ALPACA_API_KEY_LABEL" },
    ]);
    setModalButtons([
      {
        label: "SUBMIT",
        buttonColor: THEME.colors.success,
        textColor: THEME.text.color,
        key: "SUBMIT_BUTTON",
      },
      {
        label: "Cancel",
        buttonColor: THEME.colors.danger,
        textColor: THEME.text.color,
        key: "CANCEL_BUTTON",
      },
    ]);
    setIsModalVisible(!isModalVisible);
  }
  const options = [
    { label: "View trade history", key: "TRADE_HISTORY" },
    { label: "Connect to Alpaca", key: "CONNECT_ALPACA" },
    { label: "Reset password", key: "RESET_PASSWORD" },
    { label: "Update email", key: "UPDATE_EMAIL" },
    { label: "Delete account", key: "DELETE_ACCOUNT" },
    { label: "Sign out", key: "SIGN_OUT" },
  ];
  return (
    <View style={styles.profileListOptionsContainer}>
      {/* Iterate through the options list to render all the options with their labels */}
      {options.map(({ label, key }) => (
        <TouchableOpacity
          style={styles.listItem}
          key={key}
          onPress={key === "CONNECT_ALPACA" ? handleConnectAlpacaPress : null}
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
