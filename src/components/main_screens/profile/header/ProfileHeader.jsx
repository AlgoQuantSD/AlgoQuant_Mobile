import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { THEME } from "../../../../general_constants/theme/Theme";
import { editNameModalBuilder } from "../../../general_use/modal/helpers/modalFactory";

export default function ProfileHeader(props) {
  // Get the users initials to render in the gray circle
  const { user } = useAuthenticator((context) => [context.user]);
  const userInitials =
    user?.attributes?.given_name[0] + user?.attributes?.family_name[0];

  // Call the modal builder with props, props contains all the functions needed to set info in the modal
  function handlePencilIconPress() {
    editNameModalBuilder(props);
  }

  return (
    <View
      style={styles.profileHeaderContainer}
      testID="profile-header-container"
    >
      <View style={styles.userInitials}>
        <Text style={styles.userInitialsText} testID="user-initials-text">
          {userInitials}
        </Text>
      </View>
      <View style={styles.fullName}>
        <Text
          style={[styles.text, { paddingRight: "1%", paddingLeft: "3%" }]}
          testID="full-name-text"
        >
          {user?.attributes?.given_name} {user?.attributes?.family_name}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          onPress={handlePencilIconPress}
        >
          <Ionicons
            name={THEME.icon.name.editPencil}
            size={THEME.icon.size.small}
            color={THEME.icon.color}
            testID="pencil-icon"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.25,
    width: "100%",
    marginTop: "25%",
    borderBottomWidth: 1,
    borderBottomColor: THEME.profileScreen.dividerColor,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  userInitialsText: {
    fontSize: THEME.text.fontSize.H1,
    color: THEME.text.color.secondary,
  },
  userInitials: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.profileScreen.profilePicBackgroundColor,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  fullName: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: "2%",
  },
});
