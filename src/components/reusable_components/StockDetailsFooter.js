import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

export default function StockDetailsFooter(props) {
  const { stockData } = props;

  // stockData's data members are initially null dont convert to float or round the value since its null
  // Helper function to round existing stock data to 2 decimal places
  const roundTwoDecimalPlaces = (value) => {
    return value == null ? value : parseFloat(value).toFixed(2);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Stock Info</Text>
      <View style={styles.stockInfoRow}>
        <View style={styles.stockInfoCol}>
          <Text style={styles.stockInfoTextItem}>
            Open: ${roundTwoDecimalPlaces(stockData.open)}
          </Text>
          <Text style={styles.stockInfoTextItem}>
            High: ${roundTwoDecimalPlaces(stockData.high)}
          </Text>
          <Text style={styles.stockInfoTextItem}>
            Low: ${roundTwoDecimalPlaces(stockData.low)}
          </Text>
        </View>
        <View style={styles.stockInfoCol}>
          <Text style={styles.stockInfoTextItem}>
            52 Week High: ${roundTwoDecimalPlaces(stockData.yearlyHigh)}
          </Text>
          <Text style={styles.stockInfoTextItem}>
            52 Week Low: ${roundTwoDecimalPlaces(stockData.yearlyLow)}
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
