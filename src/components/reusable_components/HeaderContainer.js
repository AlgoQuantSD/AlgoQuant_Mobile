import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

export default function HeaderContainer(props) {
<<<<<<< HEAD
  const { headerText, bodyText } = props;
  return (
    <View style={styles.headerContainer}>
=======
  const { headerText, bodyText, size } = props;
  return (
    <View style={[styles.headerContainer, { flex: size }]}>
>>>>>>> main
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.text}>{bodyText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
<<<<<<< HEAD
    flex: 0.25,
=======
>>>>>>> main
    width: "75%",
    padding: "10%",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
    paddingBottom: "5%",
  },
});
