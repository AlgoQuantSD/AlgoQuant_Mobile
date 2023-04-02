import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";
import { Ionicons } from "@expo/vector-icons";

export default function GraphDetailsHeader(props) {
  const {
    graphTitle,
    graphTrendData,
    selectedTimeframe,
    showTimeframeText,
    isJobNameLoading,
    isPriceTrendLoading,
  } = props;

  // Format the unix timestamp recieved from parent component and convert it to date string to show on screen.
  // Date is when the market closed
  let formattedDateClosed = " ";
  if (graphTrendData.dateClosed !== null) {
    formattedDateClosed =
      "on " +
      new Date(graphTrendData.dateClosed * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        month: "numeric",
        day: "numeric",
      });
  }

  // Set the text that should display next to the perecent change based on the timeframe
  let timeframeText = null;
  if (selectedTimeframe === timeframeEnums.DAY) {
    !graphTrendData.marketClosed
      ? (timeframeText = "Today")
      : (timeframeText = "Today - Closed " + formattedDateClosed);
  } else if (selectedTimeframe === timeframeEnums.FIVE) {
    !graphTrendData.marketClosed
      ? (timeframeText = "Past 5 days")
      : (timeframeText = "Past 5 days - Closed " + formattedDateClosed);
  } else if (selectedTimeframe === timeframeEnums.MONTH) {
    !graphTrendData.marketClosed
      ? (timeframeText = "Past month")
      : (timeframeText = "Past month - Closed " + formattedDateClosed);
  } else if (selectedTimeframe === timeframeEnums.YEAR) {
    !graphTrendData.marketClosed
      ? (timeframeText = "Past year")
      : (timeframeText = "Past year - Closed " + formattedDateClosed);
  }

  // This is used to conditionally style the text ot be green or red based on the stock trend
  const isTrendingUp = graphTrendData.priceDifferenceRaw >= 0;

  // graphTrendData's data members are initially null dont convert to float or round the value since its null
  // Helper function to round existing stock data to 2 decimal places
  const roundTwoDecimalPlaces = (value) => {
    return value == null ? value : parseFloat(value).toFixed(2);
  };

  return (
    <View style={styles.headerContainer}>
      {isJobNameLoading || isPriceTrendLoading ? (
        <View style={{ paddingTop: "5%", paddingLeft: "10%" }}>
          <ActivityIndicator
            size="large"
            color={THEME.activityIndicator.color.primary}
          />
        </View>
      ) : (
        <View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.headerText}
          >
            {graphTitle}
          </Text>
          <View>
            <Text style={styles.recentPriceText}>
              ${roundTwoDecimalPlaces(graphTrendData.recentPrice)}
            </Text>
            <View style={styles.priceDifferenceContainer}>
              <Text
                style={
                  isTrendingUp ? styles.trendingUpText : styles.trendingDownText
                }
              >
                ${roundTwoDecimalPlaces(graphTrendData.priceDifferenceRaw)} (
                {roundTwoDecimalPlaces(graphTrendData.priceDifferencePercent)}
                %)
              </Text>
              <View style={styles.trendingIcon}>
                {isTrendingUp ? (
                  <Ionicons
                    name="caret-up-outline"
                    size={THEME.icon.size.xSmall}
                    color={THEME.colors.trendingUp}
                  />
                ) : (
                  <Ionicons
                    name="caret-down-outline"
                    size={THEME.icon.size.xSmall}
                    color={THEME.colors.trendingDown}
                  />
                )}
              </View>
              {showTimeframeText ? (
                <Text style={styles.text}>{timeframeText}</Text>
              ) : null}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  priceDifferenceContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  headerText: {
    fontSize: THEME.text.fontSize.H1,
    color: THEME.text.color.primary,
    paddingBottom: "2%",
  },
  recentPriceText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  trendingUpText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.colors.trendingUp,
  },
  trendingDownText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.colors.trendingDown,
  },
  trendingIcon: {
    marginRight: "2%",
  },
  activity: {
    paddingTop: "5%",
    paddingRight: "40%",
  },
});
