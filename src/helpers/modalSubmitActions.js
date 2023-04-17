import { Auth } from "aws-amplify";
import React from "react";
import SnackbarContent from "../components/reusable_components/SnackbarContent";
import { THEME } from "../constants/Theme";
import { containsOnlyNumbers } from "./regex";
import { getCurrentUser } from "./user";

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
    setModalInputFields,
    setModalButtons,
    setModalErrorMessage,
    setIsModalSnackbarVisible,
    setModalSnackbarMessage,
    setIsLoading,
  } = props;

  setModalType(null);
  setModalTitle(null);
  setModalHeader(null);
  setModalBody(null);
  if (setModalInputFields) {
    setModalInputFields(null);
  }
  if (setInputValues) {
    setInputValues(null);
  }
  if (setModalButtons) {
    setModalButtons(null);
  }
  if (setModalErrorMessage) {
    setModalErrorMessage(null);
  }
  if (setIsLoading) {
    setIsLoading(false);
  }
  if (setIsModalSnackbarVisible) {
    setIsModalSnackbarVisible(false);
  }
  if (setModalSnackbarMessage) {
    setModalSnackbarMessage(null);
  }
  setIsModalVisible(!isModalVisible);
}

// Action that occurs when the user submits the edit name modal
export async function submitEditNameModal(props) {
  const user = await getCurrentUser();
  const {
    inputValues,
    setModalErrorMessage,
    setIsLoading,
    setSnackbarMessage,
    setIsSnackbarVisible,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
  } = props;

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
    setModalSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text="ERROR: Invalid name."
        textColor={THEME.colors.danger}
      />
    );
    setIsModalSnackbarVisible(true);
  } else {
    try {
      setIsLoading(true);
      await Auth.updateUserAttributes(user, {
        given_name: inputValues[0],
        family_name: inputValues[1],
      });
      setSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.success}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.success}
          text="SUCCESS: Name sucessfully updated."
          textColor={THEME.colors.success}
        />
      );
      setIsSnackbarVisible(true);
      // Clear state upon succesful submit
      cleanUpState(props);
    } catch (error) {
      setIsLoading(false);
      setModalErrorMessage(error.message);
    }
  }
}

// Action that occurs when the user submits the delete account modal
export async function submitDeleteAccountModal(props) {
  const {
    inputValues,
    setIsLoading,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
  } = props;

  // Get the necessary info to submit to the sign in function
  const currentUser = await getCurrentUser();
  const username = currentUser?.attributes?.email;
  const password = inputValues[0];

  try {
    setIsLoading(true);
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
    setIsLoading(false);
    setModalSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text="ERROR: Incorrect password."
        textColor={THEME.colors.danger}
      />
    );
    setIsModalSnackbarVisible(true);
  }
}

// Async function that handles the submit button logic for the Reset Balance modal.
// Used for both resetting alpaca balance and simulated balance using the modal type prop passed in
export async function submitResetBalanceModal(props) {
  // Modal type is based on the users account status on if they are connected with alpaca or not
  const {
    inputValues,
    modalType,
    setSnackbarMessage,
    setIsSnackbarVisible,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
    setIsLoading,
    algoquantApi
  } = props;

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
  if (algoquantApi.token) {
    setIsLoading(true);
    algoquantApi
      .resetBalance(bodyData)
      .then((resp) => {
        setSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.success}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.icon.color.primary}
            text={resp.data.message}
            textColor={THEME.colors.success}
          />
        );
        setIsSnackbarVisible(true);
        // Clear state upon successful submit
        cleanUpState(props);
      })
      .catch((err) => {
        setIsLoading(false);
        setModalSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.errorIcon}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.danger}
            text={err.toString()}
            textColor={THEME.colors.danger}
          />
        );
        setIsModalSnackbarVisible(true);
      });
  }
}

// Async function that handles the submit button logic for the Connect to Alpaca modal.
export async function submitConnectAlpacaModal(props) {
  const {
    inputValues,
    setSnackbarMessage,
    setIsSnackbarVisible,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
    setIsLoading,
    algoquantApi
  } = props;

  // Call algoquantApi api and send bodyData to update user information
  if (algoquantApi.token) {
    setIsLoading(true);
    algoquantApi
      .resetBalance({
        alpaca_key: inputValues[0],
        alpaca_secret_key: inputValues[1],
      })
      .then((resp) => {
        setSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.success}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.success}
            text={resp.data.message}
            textColor={THEME.colors.success}
          />
        );
        setIsSnackbarVisible(true);
        // Clear state upon successful submit
        cleanUpState(props);
      })
      .catch((err) => {
        setIsLoading(false);
        setModalSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.error}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.danger}
            text={err.toString()}
            textColor={THEME.colors.danger}
          />
        );
        setIsModalSnackbarVisible(true);
      });
  }
}

// Action that occurs when the user submits the disconnect from alpaca modal
export async function submitDisconnectAlpacaModal(props) {
  const {
    setSnackbarMessage,
    setIsSnackbarVisible,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
    setIsLoading,
    algoquantApi
  } = props;
  if (algoquantApi.token) {
    setIsLoading(true);
    algoquantApi
      .resetBalance({})
      .then((resp) => {
        setSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.success}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.success}
            text={resp.data.message}
            textColor={THEME.colors.success}
          />
        );
        setIsSnackbarVisible(true);
        // Clear state upon successful submit
        cleanUpState(props);
      })
      .catch((err) => {
        setIsLoading(false);
        setModalSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.error}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.danger}
            text={err.toString()}
            textColor={THEME.colors.danger}
          />
        );
        setIsModalSnackbarVisible(true);
      });
  }
}

// Action that occurs when the user enters their new password in the modal
export async function submitResetPasswordModal(props) {
  const user = await getCurrentUser();
  const {
    inputValues,
    setIsLoading,
    setSnackbarMessage,
    setIsSnackbarVisible,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
  } = props;

  const oldPassword = inputValues[0];
  const newPassword = inputValues[1];
  const confirmPassword = inputValues[2];

  if (newPassword !== confirmPassword) {
    setModalSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text="ERROR: Passwords do not match."
        textColor={THEME.colors.danger}
      />
    );
    setIsModalSnackbarVisible(true);
  } else {
    try {
      setIsLoading(true);
      await Auth.changePassword(user, oldPassword, newPassword);
      setSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.success}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.success}
          text="SUCCESS: Password reset."
          textColor={THEME.colors.success}
        />
      );
      setIsSnackbarVisible(true);
      // Clear state upon succesful submit
      cleanUpState(props);
    } catch (error) {
      setIsLoading(false);
      setModalSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.danger}
          text="ERROR: Incorrect old password."
          textColor={THEME.colors.danger}
        />
      );
      setIsModalSnackbarVisible(true);
    }
  }
}

// Action that occurs when the user enters their new email in the modal
export async function submitUpdateEmailModalNewEmailStep(props) {
  const {
    inputValues,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setModalInputFields,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
    setIsLoading,
  } = props;

  const newEmail = inputValues[0].toLowerCase();
  const confirmNewEmail = inputValues[1].toLowerCase();

  const user = await getCurrentUser();
  if (newEmail !== confirmNewEmail) {
    setModalSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text="ERROR: Emails do not match."
        textColor={THEME.colors.danger}
      />
    );
    setIsModalSnackbarVisible(true);
  } else {
    try {
      setIsLoading(true);
      await Auth.updateUserAttributes(user, { email: newEmail });
      setIsLoading(false);
      setModalType("UPDATE_EMAIL_NEW_EMAIL_CONFIRM_STEP");
      setModalTitle("Update Email");
      setModalHeader("Confirm your new email");
      setModalBody(
        "A confirmation code was sent to " +
          newEmail +
          ". Please enter the code below."
      );
      setModalInputFields([
        {
          label: "Verification code",
          key: "UPDATE_EMAIL_NEW_EMAIL_VERIFICATION",
        },
      ]);
    } catch (error) {
      setIsLoading(false);
      setModalSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={16}
          iconColor={THEME.colors.danger}
          text="ERROR: Unable to update email, please try again."
          textColor={THEME.colors.danger}
        />
      );
      setIsModalSnackbarVisible(true);
    }
  }
}

// Action that occurs when the user enters the confirmation code in the update email confirm modal
export async function submitUpdateEmailConfirmNewEmailStep(props) {
  const {
    inputValues,
    setSnackbarMessage,
    setIsSnackbarVisible,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
    setIsLoading,
  } = props;

  const verificationCode = inputValues[0];
  try {
    setIsLoading(true);
    await Auth.verifyCurrentUserAttributeSubmit("email", verificationCode);
    setIsLoading(false);
    setSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.success}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.success}
        text={"Successfully updated email."}
        textColor={THEME.colors.success}
      />
    );
    setIsSnackbarVisible(true);
    cleanUpState(props);
  } catch (error) {
    setIsLoading(false);
    setModalSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={16}
        iconColor={THEME.colors.danger}
        text="ERROR: Incorrect verification code."
        textColor={THEME.colors.danger}
      />
    );
    setIsModalSnackbarVisible(true);
  }
}

// Action that occurs when the user enters their new phone number in the modal
export async function submitUpdatePhoneModal(props) {
  const {
    inputValues,
    setSnackbarMessage,
    setIsSnackbarVisible,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
    setIsLoading,
  } = props;

  const newPhone = inputValues[0].toLowerCase();
  const confirmNewPhone = inputValues[1].toLowerCase();

  const user = await getCurrentUser();
  if (newPhone !== confirmNewPhone) {
    setModalSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text="ERROR: Phone numbers do not match."
        textColor={THEME.colors.danger}
      />
    );
    setIsModalSnackbarVisible(true);
  } else {
    try {
      setIsLoading(true);
      await Auth.updateUserAttributes(user, { phone_number: newPhone });
      setSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.success}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.success}
          text={"Successfully updated phone number."}
          textColor={THEME.colors.success}
        />
      );
      cleanUpState(props);
      setIsSnackbarVisible(true);
    } catch (error) {
      setIsLoading(false);
      setModalSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={16}
          iconColor={THEME.colors.danger}
          text={"ERROR: " + error.message}
          textColor={THEME.colors.danger}
        />
      );
      setIsModalSnackbarVisible(true);
    }
  }
}

export async function submitDeleteInvestorModal(props) {
  const {
    setIsLoading,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
    setInvestorListRefresh,
    investorID,
    navigation,
    algoquantApi
  } = props;

  // Call algoquantApi api and send bodyData to stop job
  if (algoquantApi.token) {
    setIsLoading(true);
    algoquantApi
      .deleteInvestor(investorID)
      .then((resp) => {
        setIsLoading(false);
        // Clear state upon successful submit
        cleanUpState(props);
        setInvestorListRefresh(true);
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        setModalSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.error}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.danger}
            text={err.toString()}
            textColor={THEME.colors.danger}
          />
        );
        setIsModalSnackbarVisible(true);
        setInvestorListRefresh(false);
        setIsLoading(false);
      });
  }
}

export async function submitStartJobModal(props) {
  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setModalButtons,
    inputValues,
    investorID,
    setSnackbarMessage,
    setIsSnackbarVisible,
    setModalSnackbarMessage,
    setIsModalSnackbarVisible,
    setIsLoading,
    algoquantApi
  } = props;

  const jobName = inputValues[0];
  const initialInvestment = inputValues[1];

  // Check for valid input
  function validateInput() {
    if (jobName.length <= 2) {
      setModalSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.danger}
          text="ERROR: Job name must be at least 3 characters long."
          textColor={THEME.colors.danger}
        />
      );
      setIsModalSnackbarVisible(true);

      return false;
    } else if (
      !containsOnlyNumbers(initialInvestment) ||
      initialInvestment < 1
    ) {
      setModalSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.danger}
          text="ERROR: Initial investment should be at least $1."
          textColor={THEME.colors.danger}
        />
      );
      setIsModalSnackbarVisible(true);
      return false;
    }
    return true;
  }

  // Create job API call
  if (validateInput() && algoquantApi.token) {
    setIsLoading(true);
    algoquantApi
      .createJob(parseInt(initialInvestment), investorID, jobName)
      .then((resp) => {
        setSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.success}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.success}
            text={resp.data.message}
            textColor={THEME.colors.success}
          />
        );
        setIsSnackbarVisible(true);
        // Clear state upon successful submit
        cleanUpState(props);
      })
      .catch((err) => {
        setSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.error}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.danger}
            text={err.toString()}
            textColor={THEME.colors.danger}
          />
        );
        cleanUpState(props);
      });
  }
}

export async function submitStopJobModal(props) {
  const {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setModalButtons,
    jobID,
    setSnackbarMessage,
    setIsSnackbarVisible,
    setIsLoading,
    navigation,
    algoquantApi

  } = props;
  // Call algoquantApi api and send bodyData to stop job
  if (algoquantApi.token) {
    setIsLoading(true);
    algoquantApi
      .stopJob(jobID)
      .then((resp) => {
        setSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.success}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.icon.color.primary}
            text={resp.data.message}
            textColor={THEME.colors.success}
          />
        );
        setIsSnackbarVisible(true);
        // Clear state upon successful submit
        cleanUpState(props);
        setIsLoading(false);
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        // Show error message
        setSnackbarMessage(
          <SnackbarContent
            iconName={THEME.icon.name.error}
            iconSize={THEME.icon.size.snackbarIconSize}
            iconColor={THEME.colors.danger}
            text={err.toString()}
            textColor={THEME.colors.danger}
          />
        );
        setIsSnackbarVisible(true);
        // Clear state upon submit
        cleanUpState(props);
      });
  }
}
