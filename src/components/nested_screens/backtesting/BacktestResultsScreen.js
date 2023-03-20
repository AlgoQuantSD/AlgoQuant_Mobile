import React, { useState, useContext, useEffect } from "react";
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
import AlgoquantApiContext from "../../../constants/ApiContext";

export default function BacktestResultsScreen(props) {
  const { backtestId } = props.route.params;
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  console.log("POPP", backtestId);
  const [backtestDataObject, setBacktestDataObject] = useState(null);
  // initial value is an array because victorycharts takes data prop as array or objects only
  const [graphData, setGraphData] = useState([0]);
  const [yValues, setYValues] = useState([]);

  // API call to get backtest based on the clicked backtest from the backtestScreen using the backtest ID
  const getBacktestData = () => {
    if (algoquantApi.token) {
      algoquantApi
        .getBacktest(backtestId)
        .then((resp) => {
          setBacktestDataObject(resp.data);
          console.log(resp.data);

          const combinedData = resp.data["value_timestamps"].map((x, i) => ({
            x,
            y: resp.data["portfolio_value_history"][i],
          }));
          setGraphData(combinedData);
          // putting y values in acsending order for y ticks on graph
          const yTickValues = resp.data["portfolio_value_history"]
            .map((datum) => datum)
            .sort((a, b) => a - b);
          setYValues(yTickValues);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  useEffect(() => {
    getBacktestData();
  }, []);

  // Do this when the user pulls down the screen to refresh
  function onRefresh() {
    setRefreshing(true);

    // Your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  // Stop screen from scrolling when the user is trying to interact with the graph
  function handlePressInGraph() {
    setIsScrollEnabled(false);
  }
  function handlePressOutGraph() {
    setIsScrollEnabled(true);
  }
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
              {backtestDataObject?.backtest_name}
            </Text>
          </View>
          <Text style={styles.text}>
            {backtestDataObject?.backtest_name} performed well according to
            AlgoQuant metrics, yielding a 40% profit over the course of 150
            days.
          </Text>
        </View>
        {/* Graph */}
        <View style={styles.graphContainer}>
          <CustomGraph
            graphData={graphData}
            yVals={yValues}
            timeframeEnabled={false}
            handlePressInGraph={handlePressInGraph}
            handlePressOutGraph={handlePressOutGraph}
          />
        </View>
        {/* Analysis */}
        <View style={styles.analysisContainer}>
          <BacktestAnalysisView backtest={backtestDataObject} />
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
