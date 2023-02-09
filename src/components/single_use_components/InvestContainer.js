import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import InvestCarousel from "./InvestCarousel";

export default function InvestContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Invest</Text>
      <InvestCarousel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
    paddingTop: "5%",
    paddingBottom: "5%",
  },
});
