import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";

export default function StockDetailsHeader(props) {
  const { stockName, stockData, selectedTimeframe } = props;

  // Format the unix timestamp recieved from parent component and convert it to date string to show on screen.
  // Date is when the market closed
  let formattedDateClosed = "";
  if (stockData.dateClosed !== null) {
    formattedDateClosed = new Date(
      stockData.dateClosed * 1000
    ).toLocaleDateString("en-US", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
    });
  }

  // Set the text that should display next to the perecent change based on the timeframe
  let timeframeText = null;
  if (selectedTimeframe === timeframeEnums.DAY) {
    !stockData.marketClosed
      ? (timeframeText = "Today")
      : (timeframeText = "Today - Closed on " + formattedDateClosed);
  } else if (selectedTimeframe === timeframeEnums.FIVE) {
    !stockData.marketClosed
      ? (timeframeText = "Past 5 days")
      : (timeframeText = "Past 5 days - Closed on " + formattedDateClosed);
  } else if (selectedTimeframe === timeframeEnums.MONTH) {
    !stockData.marketClosed
      ? (timeframeText = "Past month")
      : (timeframeText = "Past month - Closed on " + formattedDateClosed);
  } else if (selectedTimeframe === timeframeEnums.YEAR) {
    !stockData.marketClosed
      ? (timeframeText = "Past year")
      : (timeframeText = "Past year - Closed on " + formattedDateClosed);
  }

  // This is used to conditionally style the text ot be green or red based on the stock trend
  const isTrendingUp = stockData.priceDifferenceRaw >= 0;

  // stockData's data members are initially null dont convert to float or round the value since its null
  // Helper function to round existing stock data to 2 decimal places
  const roundTwoDecimalPlaces = (value) => {
    return value == null ? value : parseFloat(value).toFixed(2);
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
            "$" + roundTwoDecimalPlaces(stockData.recentPrice)
          )}
        </Text>
        <View style={styles.priceDifferenceContainer}>
          <Text
            style={
              isTrendingUp ? styles.trendingUpText : styles.trendingDownText
            }
          >
            ${roundTwoDecimalPlaces(stockData.priceDifferenceRaw)} (
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
