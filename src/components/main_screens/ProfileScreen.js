import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import ProfileHeader from "../single_use_components/ProfileHeader";
import TotalBalance from "../single_use_components/TotalBalance";
import ProfileListOptions from "../single_use_components/ProfileListOptions";
import CustomModal from "../reusable_components/CustomModal";

export default function ProfileScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [modalInputLabels, setModalInputLabels] = useState(null);
  console.log("ProfileScreen isModalVisible: ", isModalVisible);
  return (
    <View style={styles.container}>
      {/* Profile pic and full name */}
      <ProfileHeader
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setModalType={setModalType}
        setModalTitle={setModalTitle}
        setModalInputLabels={setModalInputLabels}
      />
      {/* Balance display and reset balance button */}
      <TotalBalance />
      {/* List of options such as reset password */}
      <ProfileListOptions />
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
        modalInputLabels={modalInputLabels}
        setModalInputLabels={setModalInputLabels}
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
