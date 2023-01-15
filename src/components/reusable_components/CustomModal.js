import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { THEME } from "../../constants/Theme";

export default function CustomModal(props) {
  function handleModalClose() {
    setIsModalVisible(!isModalVisible);
    setModalType(null);
    setModalTitle(null);
    setModalBody(null);
    setModalInputLabels(null);
  }
  const {
    isModalVisible,
    setIsModalVisible,
    modalType,
    setModalType,
    modalTitle,
    setModalTitle,
    modalBody,
    setModalBody,
    modalInputLabels,
    setModalInputLabels,
  } = props;
  console.log("Modal input labels: ", modalInputLabels);
  return (
    <Modal isVisible={isModalVisible} style={styles.modalContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{modalTitle}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
          <Ionicons name="close" size={16} color="white" />
        </TouchableOpacity>
      </View>
      {modalBody ? <Text>{modalBody}</Text> : null}
      {modalInputLabels ? (
        <View style={{ width: "60%" }}>
          {modalInputLabels.map((item, key) => (
            <TextInput
              key={key}
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
  headerContainer: {
    position: "relative",
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    color: THEME.text.color,
    fontSize: THEME.text.fontSizeH1,
  },
  closeButton: { position: "absolute", top: 0, right: 0, padding: 10 },
});
