import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../../constants/Theme";

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
    modalInputLabels,
    setModalInputLabels,
    modalButtons,
    setModalButtons,
  } = props;

  // Close the modal and clear the modal information
  function handleModalClose() {
    setIsModalVisible(!isModalVisible);
    setModalType(null);
    setModalTitle(null);
    setModalHeader(null);
    setModalBody(null);
    setModalInputLabels(null);
    setModalButtons(null);
  }

  // Perform the appropriate action upon submitting based on what modal is open
  function handleSubmit() {
    switch (modalType) {
      case "EDIT_NAME":
        console.log(
          "New name saved! Your new name: ",
          inputValues[0],
          inputValues[1]
        );
        setIsModalVisible(!isModalVisible);
        break;
      case "RESET_BALANCE":
        console.log("Balance reset!");
        break;
      case "CONNECT_ALPACA":
        console.log("Connected to Alpaca! Your API key: ", inputValues[0]);
        setIsModalVisible(!isModalVisible);
        break;
      default:
        console.log("Default");
    }
  }

  // Keep track of what is being typed into the input fields if we have any in our modal
  const [inputValues, setInputValues] = useState(
    Array(modalInputLabels?.length).fill("")
  );

  // Check whether certain pieces of the modal should be rendered if so we render it
  // In some cases such as input fields and buttons we must loop through and render them because the number of input fields and buttons in a modal may vary
  return (
    <Modal isVisible={isModalVisible} style={styles.modalContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>{modalTitle}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
          <Ionicons name="close" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {modalHeader ? (
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>{modalHeader}</Text>
          </View>
        ) : null}
        {modalBody ? (
          <View style={styles.modalBody}>
            <Text style={styles.bodyText}>{modalBody}</Text>
          </View>
        ) : null}
        {modalInputLabels ? (
          <View style={styles.modalInputLabels}>
            {modalInputLabels.map((item, index) => (
              <TextInput
                key={item.key}
                onChangeText={(text) => {
                  const newInputValues = [...inputValues];
                  newInputValues[index] = text;
                  setInputValues(newInputValues);
                }}
                label={item.label}
                selectionColor="white"
                underlineColor="white"
                activeUnderlineColor="white"
                outlineColor="white"
                activeOutlineColor="white"
                textColor="white"
                placeholderTextColor="white"
                contentStyle={{ color: "white" }}
                style={{ backgroundColor: "#ffffff00" }}
              ></TextInput>
            ))}
          </View>
        ) : null}
      </View>
      {modalButtons ? (
        <View style={styles.modalButtons}>
          {modalButtons.map((item, index) => (
            <TouchableOpacity key={item.key} style={styles.button}>
              <Button
                onPress={
                  item.key === "SUBMIT_BUTTON" ? handleSubmit : handleModalClose
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: THEME.modal.backgroundColor,
    flex: 0.75,
    marginTop: "50%",
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
    color: THEME.text.color,
    fontSize: THEME.text.fontSizeH1,
  },
  bodyText: {
    color: THEME.text.color,
    fontSize: THEME.text.fontSizeModalBody,
  },
  headerText: {
    color: THEME.text.color,
    fontSize: THEME.text.fontSizeH3,
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
  modalInputLabels: {
    flex: 0.55,
    justifyContent: "center",
    width: "90%",
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
});
