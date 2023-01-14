import React from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import ProfileHeader from "../single_use_components/ProfileHeader";
import TotalBalance from "../single_use_components/TotalBalance";
import ProfileListOptions from "../single_use_components/ProfileListOptions";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Profile pic and full name */}
      <ProfileHeader />
      {/* Balance display and reset balance button */}
      <TotalBalance />
      {/* List of options such as reset password */}
      <ProfileListOptions />
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
