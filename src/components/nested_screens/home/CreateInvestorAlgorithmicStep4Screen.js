import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { Button } from "react-native-paper";
import CustomParallaxCarousel from "../../reusable_components/CustomParallaxCarousel";
import IndicatorsOrStocksListView from "../../reusable_components/IndicatorsOrStocksListView";
import { PERIOD_LIST } from "../../../constants/CreateInvestorConstants";
import { chunker } from "../../../helpers/chunker";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorAlgorithmicStep4Screen(props) {
  const { investorObject } = props.route.params;
  console.log("Step 4: ", investorObject);
  const navigation = useNavigation();

  const [isIndicatorSetToCarouselView, setIsIndicatorSetToCarouselView] =
    useState(true);
  const [isStockSetToCarouselView, setIsStockSetToCarouselView] =
    useState(true);
  const chunkedIndicators = chunker(investorObject.indicators, 3);
  const chunkedStocks = chunker(investorObject.assets_to_track, 3);

  function handleIndicatorViewChange() {
    setIsIndicatorSetToCarouselView(!isIndicatorSetToCarouselView);
  }

  function handleStockViewChange() {
    setIsStockSetToCarouselView(!isStockSetToCarouselView);
  }

  function handleCreateInvestorPress() {
    // Put API call to create investor here
    // investorObject contains all the information needed to pass in the API call
    navigation.navigate("HomeScreen");
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Confirm Investor Creation</Text>
      </View>
      {/* Investor Configuration */}
      <View style={styles.investorConfigurationContainer}>
        <Text style={styles.sectionTitleText}>Investor Configuration</Text>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Investor name:</Text>
          <Text style={styles.text}>{investorObject.investor_name}</Text>
        </View>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Investor type:</Text>
          <Text style={styles.text}>{investorObject.type}</Text>
        </View>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Profit stop:</Text>
          <Text style={styles.text}>{investorObject.profit_stop}%</Text>
        </View>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Loss stop:</Text>
          <Text style={styles.text}>{investorObject.loss_stop}%</Text>
        </View>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Trade frequency:</Text>
          <Text style={styles.text}>
            {PERIOD_LIST.map((item) => {
              if (item.value === investorObject.period) {
                return item.name;
              }
            })}
          </Text>
        </View>
      </View>
      {/* Indicators */}
      <View style={styles.indicatorsContainer}>
        <View style={styles.indicatorsHeaderRow}>
          <Text style={styles.sectionTitleText}>Indicators</Text>
          <Button
            buttonColor={THEME.button.primaryColorBackground}
            textColor={THEME.text.secondaryColor}
            onPress={handleIndicatorViewChange}
          >
            {isIndicatorSetToCarouselView ? "List View" : "Carousel View"}
          </Button>
        </View>
        {isIndicatorSetToCarouselView ? (
          <CustomParallaxCarousel data={investorObject.indicators} />
        ) : (
          <Animated.View entering={BounceIn.delay(500)} exiting={BounceOut}>
            <IndicatorsOrStocksListView data={chunkedIndicators} />
          </Animated.View>
        )}
      </View>
      {/* Stocks */}
      <View style={styles.stocksContainer}>
        <View style={styles.stocksHeaderRow}>
          <Text style={styles.sectionTitleText}>Stocks</Text>
          <Button
            buttonColor={THEME.button.primaryColorBackground}
            textColor={THEME.text.secondaryColor}
            onPress={handleStockViewChange}
          >
            {isIndicatorSetToCarouselView ? "List View" : "Carousel View"}
          </Button>
        </View>
        {isStockSetToCarouselView ? (
          <CustomParallaxCarousel data={investorObject.assets_to_track} />
        ) : (
          <Animated.View entering={BounceIn.delay(500)} exiting={BounceOut}>
            <IndicatorsOrStocksListView data={chunkedStocks} />
          </Animated.View>
        )}
      </View>
      {/* Create Investor Button */}
      <View style={styles.nextButtonContainer}>
        <Button
          buttonColor={THEME.button.primaryColorBackground}
          textColor={THEME.text.secondaryColor}
          onPress={handleCreateInvestorPress}
        >
          Create Investor
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  text: { fontSize: THEME.text.fontSize.body, color: THEME.text.color.primary },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  investorConfigurationContainer: {
    flex: 0.25,
    justifyContent: "center",
  },
  investorConfigurationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  indicatorsContainer: {
    flex: 0.25,
    marginTop: "10%",
  },
  indicatorsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stocksHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stocksContainer: {
    flex: 0.25,
  },
  nextButtonContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
