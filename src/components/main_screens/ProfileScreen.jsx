import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { THEME } from "../../constants/Theme";
import { snackbarCleanUp } from "../../helpers/snackbarCleanup";
import CustomModal from "../reusable_components/CustomModal";
import ProfileHeader from "../single_use_components/ProfileHeader";
import ProfileListOptions from "../single_use_components/ProfileListOptions";
import TotalBalance from "../single_use_components/TotalBalance";

export default function ProfileScreen({ navigation }) {
  // Keep track of whether the modal is visible or not and what type of modal we should render
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [modalInputFields, setModalInputFields] = useState(null);
  const [modalButtons, setModalButtons] = useState(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [isModalSnackbarVisible, setIsModalSnackbarVisible] = useState(false);
  const [modalSnackbarMessage, setModalSnackbarMessage] = useState(null);
  const [modalErrorMessage, setModalErrorMessage] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      {/* Profile pic and full name */}
      {/* Here we pass in all the information that we want in our modal. Since the profile header deals with the edit 
      name modal only we want to give it the ability to have input fields. Everything else is that it must have is standard 
      for all modals (title, buttons, type)*/}
      <ProfileHeader
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setModalType={setModalType}
        setModalTitle={setModalTitle}
        setModalInputFields={setModalInputFields}
        setModalButtons={setModalButtons}
        setModalErrorMessage={setModalErrorMessage}
      />

      {/* Balance display and reset balance button */}
      <TotalBalance
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setModalType={setModalType}
        setModalTitle={setModalTitle}
        setModalHeader={setModalHeader}
        setModalBody={setModalBody}
        setModalInputFields={setModalInputFields}
        setModalButtons={setModalButtons}
      />

      {/* List of options such as reset password */}
      {/* Same idea as the other components. In the list options there are different types of modals that can be rendered 
      that may need a header, body, input fields, and buttons */}
      <ProfileListOptions
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setModalType={setModalType}
        setModalTitle={setModalTitle}
        setModalHeader={setModalHeader}
        setModalBody={setModalBody}
        setModalInputFields={setModalInputFields}
        setModalButtons={setModalButtons}
        setModalSnackbarMessage={setModalSnackbarMessage}
        setIsModalSnackbarVisible={setIsModalSnackbarVisible}
        navigation={navigation}
      />
      <CustomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        modalType={modalType}
        setModalType={setModalType}
        modalTitle={modalTitle}
        setModalTitle={setModalTitle}
        modalHeader={modalHeader}
        setModalHeader={setModalHeader}
        modalBody={modalBody}
        setModalBody={setModalBody}
        modalInputFields={modalInputFields}
        setModalInputFields={setModalInputFields}
        modalButtons={modalButtons}
        setModalButtons={setModalButtons}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}
        isSnackbarVisible={isSnackbarVisible}
        setIsSnackbarVisible={setIsSnackbarVisible}
        modalSnackbarMessage={modalSnackbarMessage}
        setModalSnackbarMessage={setModalSnackbarMessage}
        isModalSnackbarVisible={isModalSnackbarVisible}
        setIsModalSnackbarVisible={setIsModalSnackbarVisible}
        modalErrorMessage={modalErrorMessage}
        setModalErrorMessage={setModalErrorMessage}
      />
      <View
        style={{
          position: "absolute",
          bottom: -40,
          width: "100%",
        }}
      >
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() =>
            snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage)
          }
          duration={3500}
          action={{
            label: "Dismiss",
            textColor: THEME.snackbar.text.color,
            onPress: () => {
              snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage);
            },
          }}
          style={styles.snackbar}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
  },
});
