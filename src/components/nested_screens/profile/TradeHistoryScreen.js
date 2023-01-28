import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import HeaderContainer from "../../reusable_components/HeaderContainer";
import CustomTable from "../../reusable_components/CustomTable";

export default function TradeHistoryScreen() {
  return (
    <View style={styles.container}>
      <HeaderContainer
        headerText="Trade History"
        bodyText="A detailed view of all transactions made by your job."
      />
      <View style={styles.mainContentContainer}>
        <CustomTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  mainContentContainer: {
    flex: 0.75,
    width: "100%",
    padding: "10%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
