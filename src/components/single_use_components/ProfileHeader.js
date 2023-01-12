import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileHeader({ navigation }) {
  const { user } = useAuthenticator((context) => [context.user]);
  const userInitials =
    user?.attributes?.given_name[0] + user?.attributes?.family_name[0];

  function testPencilIconPress() {
    console.log("You pressed the pencil icon");
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
          onPress={testPencilIconPress}
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
        >
          <Ionicons
            name="pencil"
            size={THEME.text.fontSizeBody}
            color={THEME.colors.foreground}
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
    borderBottomWidth: "1px",
    borderBottomColor: THEME.profileScreen.dividerColor,
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  userInitialsText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
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
