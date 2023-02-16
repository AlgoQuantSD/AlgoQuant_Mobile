import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";

export default function StockDetailsHeader(props) {
  const { stockName, stockData, selectedTimeframe } = props;

  // Set the text that should display next to the perecent change based on the timeframe
  let timeframeText = null;
  if (selectedTimeframe === timeframeEnums.DAY) {
    timeframeText = "Today";
  } else if (selectedTimeframe === timeframeEnums.FIVE) {
    timeframeText = "Past 5 days";
  } else if (selectedTimeframe === timeframeEnums.MONTH) {
    timeframeText = "Past month";
  } else if (selectedTimeframe === timeframeEnums.YEAR) {
    timeframeText = "Past year";
  }

  // This is used to conditionally style the text ot be green or red based on the stock trend
  const isTrendingUp = stockData.priceDifferenceRaw >= 0;

  const roundTwoDecimalPlaces = (value) => {
    return value === null ? value : value.toFixed(2);
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{stockName}</Text>
      <View>
        <Text style={styles.recentPriceText}>
          {stockData.recentPrice === null ? (
            <ActivityIndicator
              size="small"
              color="#3F9F30"
              style={styles.activity}
            />
          ) : (
            "$" + stockData.recentPrice
          )}
        </Text>
        <View style={styles.priceDifferenceContainer}>
          <Text
            style={
              isTrendingUp ? styles.trendingUpText : styles.trendingDownText
            }
          >
            ${stockData.priceDifferenceRaw} (
            {roundTwoDecimalPlaces(stockData.priceDifferencePercent)}
            %)
          </Text>
          <Text style={styles.text}>{timeframeText}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "75%",
    paddingTop: "10%",
    paddingLeft: "10%",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  priceDifferenceContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
    paddingBottom: "2%",
  },
  recentPriceText: {
    fontSize: THEME.text.fontSizeH3,
    color: THEME.text.color,
  },
  trendingUpText: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.primary,
    paddingRight: "2%",
  },
  trendingDownText: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.danger,
    paddingRight: "2%",
  },
  activity: {
    paddingTop: "5%",
    paddingRight: "40%",
  },
});
