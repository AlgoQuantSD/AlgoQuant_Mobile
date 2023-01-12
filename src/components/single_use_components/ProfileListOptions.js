import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileListOptions({ navigation }) {
  return (
    <View style={styles.profileListOptionsContainer}>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.text}>View trade history</Text>
        <Ionicons
          name="arrow-forward"
          size={THEME.text.fontSizeBody}
          color={THEME.colors.foreground}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.text}>Connect to Alpaca</Text>
        <Ionicons
          name="arrow-forward"
          size={THEME.text.fontSizeBody}
          color={THEME.colors.foreground}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.text}>Reset password</Text>
        <Ionicons
          name="arrow-forward"
          size={THEME.text.fontSizeBody}
          color={THEME.colors.foreground}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.text}>Update email</Text>
        <Ionicons
          name="arrow-forward"
          size={THEME.text.fontSizeBody}
          color={THEME.colors.foreground}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.text}>Delete account</Text>
        <Ionicons
          name="arrow-forward"
          size={THEME.text.fontSizeBody}
          color={THEME.colors.foreground}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.text}>Sign out</Text>
        <Ionicons
          name="arrow-forward"
          size={THEME.text.fontSizeBody}
          color={THEME.colors.foreground}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileListOptionsContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: "5%",
    paddingLeft: "10%",
    flex: 0.6,
    width: "100%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
    paddingRight: "1%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "10%",
  },
});
