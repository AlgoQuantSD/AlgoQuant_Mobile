import React from "react";
import { getCurrentUser } from "./user";
import { Auth } from "aws-amplify";

// This function is used clear all the modal information upon a successful submission of a modal
function cleanUpState(props) {
  const {
    setInputValues,
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setmodalInputFields,
    setModalButtons,
    setModalErrorMessage,
    setIsLoading,
  } = props;

  setModalType(null);
  setModalTitle(null);
  setModalHeader(null);
  setModalBody(null);
  setmodalInputFields(null);
  setInputValues(null);
  setModalButtons(null);
  setModalErrorMessage(null);
  setIsLoading(false);
  setIsModalVisible(!isModalVisible);
}

export async function submitEditNameModal(props) {
  const user = await getCurrentUser();
  const { inputValues, setModalErrorMessage, setIsLoading } = props;

  // Currently the edit name fields are pre populated with the user's current first and last name
  // The problem is that when pressing submit without editing these fields it will pass empty strings as first and last name
  // This is the temporary solution
  if (inputValues[0] === "") {
    inputValues[0] = user.attributes.given_name;
  }
  if (inputValues[1] === "") {
    inputValues[1] = user.attributes.family_name;
  }

  // Error handling to make sure the users first and last name is at least 2 characters and it is not the same name as their current
  if (
    inputValues[0].length <= 1 ||
    inputValues[1].length <= 1 ||
    (inputValues[0] === user.attributes.given_name &&
      inputValues[1] === user.attributes.family_name)
  ) {
    setModalErrorMessage("ERROR: Invalid name");
    console.log("Invalid name");
  } else {
    try {
      setIsLoading(true);
      await Auth.updateUserAttributes(user, {
        given_name: inputValues[0],
        family_name: inputValues[1],
      });
      console.log("New name saved successfully: ", inputValues);
      // Clear state upon succesful submit
      cleanUpState(props);
    } catch (error) {
      console.log("Error updating name: ", error);
      setModalErrorMessage(error.message);
    }
  }
}

export async function submitDeleteAccountModal(props) {
  const { inputValues, setModalErrorMessage, setIsLoading } = props;

  // Get the necessary info to submit to the sign in function
  const currentUser = await getCurrentUser();
  const username = currentUser?.attributes?.email;
  const password = inputValues[0];

  try {
    // The sign in function is used as a verification with the user typing in their password to confirm account deletion
    const user = await Auth.signIn(username, password);
    if (
      user.challengeName === "SMS_MFA" ||
      user.challengeName === "SOFTWARE_TOKEN_MFA"
    ) {
      // Handle MFA if required
    } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      // Handle new password if required
    } else {
      // The user has been authenticated, proceed with account deletion
      setIsLoading(true);
      await Auth.deleteUser();
      // Clear state upon successful submit
      cleanUpState(props);
    }
  } catch (error) {
    console.log("Error signing in: ", error);
    setModalErrorMessage("ERROR: " + error.message);
  }
}

export async function submitResetBalanceModal(props) {
  const { setModalErrorMessage } = props;

  // Clear state upon successful submit
  cleanUpState(props);
}

export async function submitConnectAlpacaModal(props) {
  const { setModalErrorMessage } = props;

  // Clear state upon successful submit
  cleanUpState(props);
}
