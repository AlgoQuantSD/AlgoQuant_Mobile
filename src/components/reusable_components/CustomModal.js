import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../../constants/Theme";
import {
  submitEditNameModal,
  submitDeleteAccountModal,
  submitResetBalanceModal,
  submitConnectAlpacaModal,
  submitDisconnectAlpacaModal,
  submitResetPasswordModal,
  submitUpdateEmailModalNewEmailStep,
  submitUpdateEmailConfirmNewEmailStep,
  submitUpdatePhoneModal,
  submitDeleteInvestorModal,
  submitStopJobModal,
} from "../../helpers/modalSubmitActions";
import { snackbarCleanUp } from "../../helpers/snackbarCleanup";
import TypewriterAnimatedText from "./TypewriterAnimatedText";

export default function CustomModal(props) {
  // Get the information for the modal and the functions to clear the information when we close the modal
  const {
    isModalVisible,
    setIsModalVisible,
    modalType,
    setModalType,
    modalTitle,
    setModalTitle,
    modalHeader,
    setModalHeader,
    modalBody,
    setModalBody,
    modalInputFields,
    setModalInputFields,
    modalButtons,
    setModalButtons,
    snackbarMessage,
    setSnackbarMessage,
    isSnackbarVisible,
    setIsSnackbarVisible,
    modalSnackbarMessage,
    setModalSnackbarMessage,
    isModalSnackbarVisible,
    setIsModalSnackbarVisible,
    modalErrorMessage,
    setModalErrorMessage,
    setShouldNavigateBack,
    jobID,
  } = props;

  // Close the modal and clear the modal information
  function handleModalClose() {
    setIsModalVisible(!isModalVisible);
    setModalType(null);
    setModalTitle(null);
    setModalHeader(null);
    setModalBody(null);
    if (setModalInputFields) {
      setModalInputFields(null);
    }
    setModalButtons(null);
    if (setInputValues) {
      setInputValues(null);
    }
    if (setIsModalSnackbarVisible) {
      setIsModalSnackbarVisible(false);
    }
    if (setModalSnackbarMessage) {
      setModalSnackbarMessage(null);
    }
    if (setIsSensitiveTextHidden) {
      setIsSensitiveTextHidden(true);
    }
  }

  // Perform the appropriate action upon submitting based on which modal is open
  function handleSubmit() {
    let submitProps = {
      inputValues,
      modalType,
      setInputValues,
      modalInputFields,
      isModalVisible,
      setIsModalVisible,
      setModalType,
      setModalTitle,
      setModalHeader,
      setModalBody,
      setModalInputFields,
      setModalButtons,
      isSnackbarVisible,
      setIsSnackbarVisible,
      snackbarMessage,
      setSnackbarMessage,
      modalSnackbarMessage,
      setModalSnackbarMessage,
      isModalSnackbarVisible,
      setIsModalSnackbarVisible,
      modalErrorMessage,
      setModalErrorMessage,
      isLoading,
      setIsLoading,
      setShouldNavigateBack,
      jobID,
    };
    switch (modalType) {
      case "EDIT_NAME":
        submitEditNameModal(submitProps);
        break;
      case "RESET_ALPACA_BALANCE":
      case "RESET_SIMULATED_BALANCE":
        submitResetBalanceModal(submitProps);
        break;
      case "CONNECT_ALPACA":
        submitConnectAlpacaModal(submitProps);
        break;
      case "DISCONNECT_ALPACA":
        submitDisconnectAlpacaModal(submitProps);
        break;
      case "RESET_PASSWORD":
        submitResetPasswordModal(submitProps);
        break;
      case "UPDATE_EMAIL_NEW_EMAIL_STEP":
        submitUpdateEmailModalNewEmailStep(submitProps);
        break;
      case "UPDATE_EMAIL_NEW_EMAIL_CONFIRM_STEP":
        submitUpdateEmailConfirmNewEmailStep(submitProps);
        break;
      case "UPDATE_PHONE":
        submitUpdatePhoneModal(submitProps);
        break;
      case "DELETE_ACCOUNT":
        submitDeleteAccountModal(submitProps);
        console.log("Account deleted!");
        break;
      case "DELETE_INVESTOR":
        console.log("Investor Deleted");
        submitDeleteInvestorModal(submitProps);
        break;
      case "STOP_JOB":
        console.log("Job Stopped");
        submitStopJobModal(submitProps);
        break;
      default:
    }
  }

  // Keep track of what is being typed into the input fields if we have any in our modal
  const [inputValues, setInputValues] = useState(
    Array(modalInputFields?.length).fill("")
  );
  const [isLoading, setIsLoading] = useState(false);

  const [isSensitiveTextHidden, setIsSensitiveTextHidden] = useState(true);
  // Refresh the component to get the correct amount of input values
  useEffect(() => {
    if (modalInputFields) {
      setInputValues(Array(modalInputFields.length).fill(""));
    }
  }, [modalInputFields]);

  // Check whether certain pieces of the modal should be rendered if so we render it
  // In some cases such as input fields and buttons we must loop through and render them because the number of input fields and buttons in a modal may vary
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modalContainer}
      >
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              size="large"
              color={THEME.loadingIndicator.color}
            />
          </View>
        ) : null}
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{modalTitle}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose}
          >
            <Ionicons name="close" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          {modalHeader ? (
            <View style={styles.modalHeader} testID="modal-header">
              <Text style={styles.headerText}>{modalHeader}</Text>
            </View>
          ) : null}
          {modalBody ? (
            <View style={styles.modalBody} testID="modal-body">
              <Text style={styles.bodyText}>{modalBody}</Text>
            </View>
          ) : null}
          {modalInputFields ? (
            <View style={styles.modalInputFields} testID="modal-input-fields">
              {modalInputFields.map((item, index) => (
                <View
                  key={item.key}
                  style={{
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TextInput
                    label={item.label}
                    secureTextEntry={
                      modalType === "RESET_PASSWORD"
                        ? isSensitiveTextHidden
                        : false
                    }
                    defaultValue={item.defaultValue}
                    onChangeText={(text) => {
                      const newInputValues = [...inputValues];
                      newInputValues[index] = text;
                      setInputValues(newInputValues);
                    }}
                    selectionColor={THEME.colors.background}
                    underlineColor={THEME.colors.background}
                    activeUnderlineColor={THEME.colors.background}
                    outlineColor={THEME.colors.background}
                    activeOutlineColor={THEME.colors.background}
                    textColor={THEME.colors.background}
                    placeholderTextColor={THEME.colors.background}
                    contentStyle={{ color: THEME.colors.background }}
                    style={{
                      backgroundColor: THEME.colors.transparent,
                      width: "100%",
                    }}
                  />
                  {modalType === "RESET_PASSWORD" ? (
                    <TouchableOpacity
                      style={{
                        alignSelf: "center",
                        position: "absolute",
                        left: "90%",
                      }}
                      onPress={() =>
                        setIsSensitiveTextHidden(!isSensitiveTextHidden)
                      }
                    >
                      <Ionicons
                        name="eye"
                        size={20}
                        color={THEME.colors.foreground}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>
        {modalErrorMessage ? (
          <View style={styles.modalErrorMessage}>
            <TypewriterAnimatedText
              text={modalErrorMessage}
              style={styles.modalErrorMessageText}
            />
          </View>
        ) : null}
        {modalButtons ? (
          <View style={styles.modalButtons}>
            {modalButtons.map((item, index) => (
              <TouchableOpacity key={item.key} style={styles.button}>
                <Button
                  onPress={
                    item.key === "SUBMIT_BUTTON"
                      ? handleSubmit
                      : handleModalClose
                  }
                  children={item.label}
                  buttonColor={item.buttonColor}
                  textColor={item.textColor}
                  style={{ width: 100 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <View
          style={{
            position: "absolute",
            bottom: -150,
            width: "100%",
          }}
        >
          <Snackbar
            visible={isModalSnackbarVisible}
            onDismiss={() =>
              snackbarCleanUp(
                setIsModalSnackbarVisible,
                setModalSnackbarMessage
              )
            }
            duration={3500}
            action={{
              label: "Dismiss",
              textColor: THEME.text.color.secondary,
              onPress: () => {
                snackbarCleanUp(
                  setIsModalSnackbarVisible,
                  setModalSnackbarMessage
                );
              },
            }}
            style={styles.snackbar}
          >
            {modalSnackbarMessage}
          </Snackbar>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: THEME.modal.color.background,
    flex: 0.75,
    marginTop: "50%",
    borderRadius: 10,
  },
  contentContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
  },
  headerContainer: {
    position: "relative",
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titleText: {
    color: THEME.text.color.secondary,
    fontSize: THEME.text.fontSize.H1,
  },
  bodyText: {
    color: THEME.text.color.secondary,
    fontSize: THEME.text.fontSizeModalBody,
  },
  headerText: {
    color: THEME.text.color.secondary,
    fontSize: THEME.text.fontSize.H3,
  },
  modalErrorMessageText: {
    color: THEME.colors.danger,
    fontSize: THEME.text.fontSize.modalBody,
  },
  closeButton: { position: "absolute", top: 0, right: 0, padding: 10 },
  modalHeader: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 0.2,
    width: "90%",
  },
  modalBody: {
    flex: 0.25,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "90%",
  },
  modalInputFields: {
    flex: 0.45,
    justifyContent: "flex-start",
    width: "90%",
  },
  modalErrorMessage: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "85%",
  },
  modalButtons: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "70%",
    position: "absolute",
    bottom: 0,
    paddingBottom: "10%",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    alignItems: "center",
  },
  modalSnackbar: {
    backgroundColor: THEME.colors.background,
  },
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
  },
});
