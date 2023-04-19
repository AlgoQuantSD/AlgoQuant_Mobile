import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

export default function HeaderContainer(props) {
  const { headerText, bodyText, size } = props;
  return (
    <View style={[styles.headerContainer, { flex: size }]}>
      <Text style={styles.headerText}>{headerText}</Text>
      <Text style={styles.text}>{bodyText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "75%",
    padding: "10%",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color,
  },
  headerText: {
    fontSize: THEME.text.fontSize.H1,
    color: THEME.text.color,
    paddingBottom: "5%",
  },
});
