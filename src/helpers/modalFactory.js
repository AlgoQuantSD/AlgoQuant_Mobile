import React from "react";
import { THEME } from "../constants/Theme";

// All of the builders follow the same pattern
// 1) Get all the functions from props needed to set the modal content
// 2) Set the content that is necessary to render the modal
// 3) Make the modal visible
export function editNameModalBuilder(props) {
  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalInputLabels,
    setModalButtons,
  } = props;

  setModalType("EDIT_NAME");
  setModalTitle("Edit Name");
  setModalInputLabels([
    { label: "First Name", key: "FIRST_NAME_LABEL" },
    { label: "Last Name", key: "LAST_NAME_LABEL" },
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

  setModalType("RESET_BALANCE");
  setModalTitle("Reset Balance");
  setModalHeader("Are you sure you want to reset your balance?");
  setModalBody(
    "This will reset your balance to $100,000 and stop all running jobs. Enter a new Alpaca API key to reset your balance. If you don't have one you're a loser."
  );
  setModalInputLabels([
    { label: "Alpaca API Key", key: "RESET_BALANCE_ALPACA_API_KEY_LABEL" },
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

export function connectToAlpacaModalBuilder(props) {
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
  setModalType("CONNECT_ALPACA");
  setModalTitle("Connect to Alpaca");
  setModalHeader("Enter your API key");
  setModalBody(
    "Enter your Alpaca API key below. If you don't have an Alpaca API key you're a loser"
  );
  setModalInputLabels([
    { label: "Alpaca API Key", key: "CONNECT_ALPACA_API_KEY_LABEL" },
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

export function deleteAccountModalBuilder(props) {
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
  setModalType("DELETE_ACCOUNT");
  setModalTitle("Delete Account");
  setModalHeader("Are you sure you want to delete your account?");
  setModalBody(
    "You will not be able to recover your account upon deletion. Enter your password below to confirm."
  );
  setModalInputLabels([
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
