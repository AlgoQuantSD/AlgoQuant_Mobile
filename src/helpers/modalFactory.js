import React from "react";
import { THEME } from "../constants/Theme";
import { getCurrentUser } from "./user";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// All of the builders follow the same pattern
// 1) Get all the functions from props needed to set the modal content
// 2) Set the content that is necessary to render the modal
// 3) Make the modal visible
export async function editNameModalBuilder(props) {
  const user = await getCurrentUser();

  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setmodalInputFields,
    setModalButtons,
  } = props;

  setModalType("EDIT_NAME");
  setModalTitle("Edit Name");
  setmodalInputFields([
    {
      label: "First Name",
      defaultValue: user?.attributes?.given_name,
      key: "FIRST_NAME_LABEL",
    },
    {
      label: "Last Name",
      defaultValue: user?.attributes?.family_name,
      key: "LAST_NAME_LABEL",
    },
  ]);
  setModalButtons([
    {
      label: "Submit",
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

export function resetBalanceModalBuilder(props) {
  // Set local variables from the props that were passed
  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setmodalInputFields,
    setModalButtons,
    alpacaAccount,
  } = props;

  // Check if the users account is connected Alpaca and display the appropriate modal and inputs
  alpacaAccount
    ? setModalType("RESET_ALPACA_BALANCE")
    : setModalType("RESET_SIMULATED_BALANCE");
  setModalTitle("Reset Balance");
  setModalHeader("Are you sure you want to reset your balance?");
  alpacaAccount
    ? setModalBody(
        "This will reset your balance to $100,000 and stop all running jobs. Enter your new Alpaca keys below to reset your balance."
      )
    : setModalBody(
        "This will reset your balance to $100,000 and stop all running jobs."
      );
  alpacaAccount
    ? setmodalInputFields([
        { label: "Alpaca API Key", key: "RESET_BALANCE_ALPACA_API_KEY_LABEL" },
        {
          label: "Alpaca Secret API Key",
          key: "RESET_BALANCE_ALPACA_SECRET_API_KEY_LABEL",
        },
      ])
    : setmodalInputFields(null);
  setModalButtons([
    {
      label: "Submit",
      buttonColor: THEME.colors.primary,
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

export function connectToAlpacaModalBuilder(props) {
  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setmodalInputFields,
    setModalButtons,
  } = props;

  setModalType("CONNECT_ALPACA");
  setModalTitle("Connect to Alpaca");
  setModalHeader("Enter your API key");
  setModalBody(
    <View>
      <Text
        style={{
          color: THEME.text.color,
          fontSize: THEME.text.fontSizeModalBody,
        }}
      >
        Enter your Alpaca API keys below. Don't have an Alpaca account?{" "}
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://app.alpaca.markets/signup")}
      >
        <Text style={{ color: THEME.colors.primary, paddingTop: "1%" }}>
          Sign up here{" "}
          <FontAwesome
            name="external-link"
            size={THEME.text.fontSizeModalBody}
            color={THEME.colors.primary}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
  setmodalInputFields([
    { label: "Alpaca API Key", key: "CONNECT_ALPACA_API_KEY_LABEL" },
    {
      label: "Alpaca Secret API Key",
      key: "CONNECT_ALPACA_SECRET_API_KEY_LABEL",
    },
  ]);
  setModalButtons([
    {
      label: "Submit",
      buttonColor: THEME.colors.primary,
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

export function disconnectFromAlpacaModalBuilder(props) {
  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setModalButtons,
  } = props;
  setModalType("DISCONNECT_ALPACA");
  setModalTitle("Disconnect from Alpaca");
  setModalHeader("Are you sure you want to disconnect from Alpaca?");
  setModalBody(
    "Disconnecting from Alpaca will reset your balance to $100,000 and use AlgoQuant's simulated broker"
  );
  setModalButtons([
    {
      label: "Submit",
      buttonColor: THEME.colors.primary,
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

export function deleteAccountModalBuilder(props) {
  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setmodalInputFields,
    setModalButtons,
  } = props;
  setModalType("DELETE_ACCOUNT");
  setModalTitle("Delete Account");
  setModalHeader("Are you sure you want to delete your account?");
  setModalBody(
    "You will not be able to recover your account upon deletion. Enter your password below to confirm."
  );
  setmodalInputFields([
    { label: "AlgoQuant Password", key: "DELETE_ACCOUNT_ALGOQUANT_PASS_LABEL" },
  ]);
  setModalButtons([
    {
      label: "Submit",
      buttonColor: THEME.colors.primary,
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
