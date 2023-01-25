import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import ProfileHeader from "../single_use_components/ProfileHeader";
import TotalBalance from "../single_use_components/TotalBalance";
import ProfileListOptions from "../single_use_components/ProfileListOptions";
import CustomModal from "../reusable_components/CustomModal";

export default function ProfileScreen({ navigation }) {
  // Keep track of whether the modal is visible or not and what type of modal we should render
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [modalInputFields, setmodalInputFields] = useState(null);
  const [modalButtons, setModalButtons] = useState(null);
  const [modalErrorMessage, setModalErrorMessage] = useState(null);

  return (
    <View style={styles.container}>
      {/* Profile pic and full name */}
      {/* Here we pass in all the information that we want in our modal. Since the profile header deals with the edit 
      name modal only we want to give it the ability to have input fields. Everything else is that it must have is standard 
      for all modals (title, buttons, type)*/}
      <ProfileHeader
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setModalType={setModalType}
        setModalTitle={setModalTitle}
        setmodalInputFields={setmodalInputFields}
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
        setmodalInputFields={setmodalInputFields}
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
        setmodalInputFields={setmodalInputFields}
        setModalButtons={setModalButtons}
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
        setmodalInputFields={setmodalInputFields}
        modalButtons={modalButtons}
        setModalButtons={setModalButtons}
        modalErrorMessage={modalErrorMessage}
        setModalErrorMessage={setModalErrorMessage}
      />
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
});
