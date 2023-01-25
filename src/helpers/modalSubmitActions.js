import React, { useContext } from "react";
import { getCurrentUser } from "./user";
import { Auth } from "aws-amplify";
import { MOCK_USER } from "../constants/MockUser";
import initAlgoQuantApi from "../constants/ApiUtils";

// Get access to the algoquant sdk api. Declaring an algoquant object and initializing it
// This is done because React hooks cant be used here since this is a regular JS function
let algoquant = undefined;

// Async function to ensure the user is fetched before attempting to create the Algoquant object
async function getUserWrapper() {
  let user = await getCurrentUser();
  algoquant = initAlgoQuantApi(user);
}

getUserWrapper();

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

// Async function that handles the submit button logic for the Reset Balance modal.
// Used for both resetting alpaca balance and simulated balance using the modal type prop passed in
export async function submitResetBalanceModal(props) {
  // Modal type is based on the users account status on if they are connected with alpaca or not
  const { setModalErrorMessage, inputValues, modalType } = props;

  // Data that is sent with the request
  // based on the modal type users will be able to enter inputs or not,
  // if they are connected to Alpaca, use the inputted values and use it as apart of the data for the request
  // if not send an empty body
  const bodyData =
    modalType === "RESET_ALPACA_BALANCE"
      ? {
          alpaca_key: inputValues[0],
          alpaca_secret_key: inputValues[1],
        }
      : {};

  // Call algoquant api and send bodyData to update user information
  if (algoquant.token) {
    algoquant
      .resetBalance(bodyData)
      .then((resp) => {
        console.log(resp);
        // Clear state upon successful submit
        cleanUpState(props);
      })
      .catch((err) => {
        // TO-DO HANDLE ERROR
        setModalErrorMessage(err.message);
        console.log(err.code);
      });
  }
}

// Async function that handles the submit button logic for the Connect to Alpaca modal.
export async function submitConnectAlpacaModal(props) {
  const { setModalErrorMessage, inputValues } = props;

  // Call algoquant api and send bodyData to update user information
  if (algoquant.token) {
    algoquant
      .resetBalance({
        alpaca_key: inputValues[0],
        alpaca_secret_key: inputValues[1],
      })
      .then((resp) => {
        console.log(resp);
        // Clear state upon successful submit
        cleanUpState(props);
      })
      .catch((err) => {
        // TO-DO HANDLE ERROR
        setModalErrorMessage(err.message);
      });
  }
}

export async function submitDisconnectAlpacaModal(props) {
  const { setModalErrorMessage } = props;
  console.log("Disconnected from Alpaca");
  console.log(algoquant.token);
  if (algoquant.token) {
    algoquant
      .resetBalance({})
      .then((resp) => {
        console.log(resp);
        // Clear state upon successful submit
        cleanUpState(props);
      })
      .catch((err) => {
        // TO-DO HANDLE ERROR
        setModalErrorMessage(err.message);
        console.log(err);
      });
  }
}
