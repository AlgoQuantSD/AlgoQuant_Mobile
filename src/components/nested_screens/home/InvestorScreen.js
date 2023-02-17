import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { investorImagePathList } from "../../../constants/InvestorImagePaths";
import CustomParallaxCarousel from "../../reusable_components/CustomParallaxCarousel";
import IndicatorsOrStocksListView from "../../reusable_components/IndicatorsOrStocksListView";
import { chunker } from "../../../helpers/chunker";
import { THEME } from "../../../constants/Theme";

export default function InvestorScreen(props, { navigation }) {
  const { investor } = props.route.params;
  // console.log("INVESTOR: ", investor);

  const indicators = [
    {
      name: "RSI",
      id: "INDICATOR_RSI",
    },
    {
      name: "OBV",
      id: "INDICATOR_OBV",
    },
    {
      name: "MACD",
      id: "INDICATOR_MACD",
    },
  ];
  const stocks = [
    {
      name: "AMD",
      id: "STOCK_AMD",
    },
    {
      name: "AMZN",
      id: "STOCK_AMZN",
    },
    {
      name: "APPL",
      id: "STOCK_APPL",
    },
    {
      name: "GOOGL",
      id: "STOCK_GOOGL",
    },
    {
      name: "NVDA",
      id: "STOCK_NVDA",
    },
  ];

  const chunkedIndicators = chunker(indicators, 3);
  const chunkedStocks = chunker(stocks, 3);

  const [isIndicatorSetToCarouselView, setIsIndicatorSetToCarouselView] =
    useState(true);
  const [isStockSetToCarouselView, setIsStockSetToCarouselView] =
    useState(true);

  function handleIndicatorViewChange() {
    setIsIndicatorSetToCarouselView(!isIndicatorSetToCarouselView);
  }
  function handleStockViewChange() {
    setIsStockSetToCarouselView(!isStockSetToCarouselView);
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{investor.name}</Text>
        <Image
          style={styles.investorImage}
          source={investorImagePathList[investor.imageId]}
        />
        <Ionicons
          style={styles.trashIcon}
          name="trash"
          size={32}
          color="white"
        />
      </View>
      <View style={styles.investorConfigurationContainer}>
        <Text style={styles.sectionTitleText}>Investor Configuration</Text>
        <View style={styles.investorConfigurationDetailsRow}>
          <View style={styles.investorConfigurationDetailsCol}>
            <Text style={styles.text}>Investor name:</Text>
            <Text style={styles.text}>Profit stop:</Text>
            <Text style={styles.text}>Loss stop:</Text>
          </View>
          <View
            style={[
              styles.investorConfigurationDetailsCol,
              { alignItems: "flex-end" },
            ]}
          >
            <Text style={styles.text}>{investor.name}</Text>
            <Text style={styles.text}>{investor.profitStop}</Text>
            <Text style={styles.text}>{investor.lossStop}</Text>
          </View>
        </View>
      </View>
      <View style={styles.indicatorsContainer}>
        <View style={styles.indicatorsHeaderRow}>
          <Text style={styles.sectionTitleText}>Indicators</Text>
          <Button
            style={styles.changeView}
            buttonColor={THEME.button.backgroundColor}
            textColor={THEME.text.color}
            onPress={handleIndicatorViewChange}
          >
            {isIndicatorSetToCarouselView ? "List View" : "Carousel View"}
          </Button>
        </View>
        {isIndicatorSetToCarouselView ? (
          <CustomParallaxCarousel data={indicators} />
        ) : (
          <Animated.View entering={BounceIn.delay(500)} exiting={BounceOut}>
            <IndicatorsOrStocksListView data={chunkedIndicators} />
          </Animated.View>
        )}
      </View>
      <View style={styles.stocksContainer}>
        <View style={styles.stocksHeaderRow}>
          <Text style={styles.sectionTitleText}>Stocks</Text>
          <Button
            style={styles.changeView}
            buttonColor={THEME.button.backgroundColor}
            textColor={THEME.text.color}
            onPress={handleStockViewChange}
          >
            {isStockSetToCarouselView ? "List View" : "Carousel View"}
          </Button>
        </View>

        {isStockSetToCarouselView ? (
          <CustomParallaxCarousel data={stocks} />
        ) : (
          <Animated.View entering={BounceIn.delay(500)} exiting={BounceOut}>
            <IndicatorsOrStocksListView data={chunkedStocks} />
          </Animated.View>
        )}
      </View>
      <Text
        style={styles.text}
        onPress={() => props.navigation.navigate("JobScreen")}
      >
        Press here to view one of {investor.name}'s jobs
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "red",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  headerContainer: {
    flex: 0.1,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    marginLeft: "5%",
    marginTop: "5%",
    marginRight: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSizeH2,
    color: THEME.text.color,
    paddingRight: "2%",
  },
  investorImage: { height: 45, width: 30 },
  trashIcon: {
    marginLeft: "auto",
  },
  investorConfigurationContainer: {
    flex: 0.13,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "green",
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSizeH4,
    color: THEME.text.color,
  },
  investorConfigurationDetailsRow: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "blue",
  },
  investorConfigurationDetailsCol: {
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "purple",
  },
  indicatorsContainer: {
    flex: 0.15,
    width: "90%",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "green",
  },
  indicatorsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stocksContainer: {
    flex: 0.15,
    width: "90%",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "green",
  },
  stocksHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
