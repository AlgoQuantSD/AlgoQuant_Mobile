import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

export default function StockDetailsFooter(props) {
  const { stockData } = props;
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Stock Info</Text>
      <View style={styles.stockInfoRow}>
        <View style={styles.stockInfoCol}>
          <Text style={styles.stockInfoTextItem}>Open: ${stockData.open}</Text>
          <Text style={styles.stockInfoTextItem}>High: ${stockData.high}</Text>
          <Text style={styles.stockInfoTextItem}>Low: ${stockData.low}</Text>
        </View>
        <View style={styles.stockInfoCol}>
          <Text style={styles.stockInfoTextItem}>
            52 Week High: ${stockData.yearlyHigh}
          </Text>
          <Text style={styles.stockInfoTextItem}>
            52 Week Low: ${stockData.yearlyLow}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  mainContainer: {
    width: "100%",
    padding: "10%",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
    paddingBottom: "5%",
  },
  stockInfoRow: {
    flexDirection: "row",
    width: "100%",
  },
  stockInfoCol: {
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "50%",
  },
  stockInfoTextItem: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
    paddingBottom: "3%",
  },
});
