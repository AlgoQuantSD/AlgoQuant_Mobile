import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import CustomGraph from "../../reusable_components/CustomGraph";
import BacktestAnalysisView from "../../single_use_components/BacktestAnalysisView";
import { mockGraphData1, MOCK_Y_VALS } from "../../../constants/MockData";
import { THEME } from "../../../constants/Theme";

export default function BacktestResultsScreen(props) {
  const { backtest } = props.route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  // Do this when the user pulls down the screen to refresh
  function onRefresh() {
    setRefreshing(true);

    // Your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  // Stop screen from scrolling when the user is trying to interact with the graph
  function handlePressInTouchableElement() {
    setIsScrollEnabled(false);
  }
  function handlePressOutTouchableElement() {
    setIsScrollEnabled(true);
  }
  console.log("Backtest results: ", backtest);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={THEME.colors.primary}
          />
        }
        scrollEnabled={isScrollEnabled}
        showsVerticalScrollIndicator={false}
        style={styles.mainScrollViewContainer}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={{ width: "70%" }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.headerText}
            >
              {backtest.backtestName}
            </Text>
          </View>
          <Text style={styles.text}>
            {backtest.backtestName} performed well according to AlgoQuant
            metrics, yielding a 40% profit over the course of 150 days.
          </Text>
        </View>
        {/* Graph */}
        <View style={styles.graphContainer}>
          <CustomGraph
            graphData={mockGraphData1}
            yVals={MOCK_Y_VALS}
            timeframeEnabled={false}
            handlePressInTouchableElement={handlePressInTouchableElement}
            handlePressOutTouchableElement={handlePressOutTouchableElement}
          />
        </View>
        {/* Analysis */}
        <View style={styles.analysisContainer}>
          <BacktestAnalysisView backtest={backtest} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  mainScrollViewContainer: {
    flexGrow: 1,
    width: "90%",
    paddingTop: "5%",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  sectionTitleText: {
    color: THEME.text.color.primary,
    fontSize: THEME.text.fontSize.H3,
    paddingBottom: "2%",
  },
  headerContainer: {
    paddingBottom: "10%",
  },
  headerText: {
    color: THEME.text.color.primary,
    fontSize: THEME.text.fontSize.H1,
    paddingBottom: "2%",
  },
  graphContainer: {
    alignSelf: "center",
  },
  analysisContainer: {
    paddingBottom: "10%",
  },
  analysisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
});
