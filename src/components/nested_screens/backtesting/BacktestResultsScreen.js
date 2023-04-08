import { format } from "d3-format";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AlgoquantApiContext from "../../../constants/ApiContext";
import { THEME } from "../../../constants/Theme";
import CustomGraph from "../../reusable_components/CustomGraph";
import BacktestAnalysisView from "../../single_use_components/BacktestAnalysisView";

export default function BacktestResultsScreen(props) {
  const { backtestId } = props.route.params;
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [backtestDataObject, setBacktestDataObject] = useState(null);
  // initial value is an array because victorycharts takes data prop as array or objects only
  const [graphData, setGraphData] = useState([0]);
  const [graphData2, setGraphData2] = useState([0]);
  const [yValues, setYValues] = useState([]);
  const [yValues2, setYValues2] = useState([]);
  const [algoquantRating, setAlgoquantRating] = useState(null);
  const [percentChanged, setPercentChanged] = useState(0);
  const [daysBetween, setDaysBetween] = useState(0);

  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const formatter = format(".2f");

  // Get variable values that go in text prompt
  function algoquantRatingGenerator(backtest) {
    const initialInvestment = backtest.initial_investment;
    const finalBalance = backtest.final_portfolio_value;
    const profitRatio = finalBalance / initialInvestment;
    setPercentChanged(
      formatter((finalBalance - initialInvestment) / initialInvestment)
    );
    console.log("Start: ", backtest.end_time, " End: ", backtest.start_time);
    setDaysBetween(Math.ceil((backtest.end_time - backtest.start_time) / 86400));
    if (profitRatio > 2) {
      setAlgoquantRating("phenomenal");
    } else if (profitRatio > 1.8) {
      setAlgoquantRating("fantastic");
    } else if (profitRatio > 1.6) {
      setAlgoquantRating("great");
    } else if (profitRatio > 1.3) {
      setAlgoquantRating("well");
    } else if (profitRatio > 1.1) {
      setAlgoquantRating("decent");
    } else if (profitRatio > 0.9) {
      setAlgoquantRating("subpar");
    } else if (profitRatio > 0.7) {
      setAlgoquantRating("poor");
    } else {
      setAlgoquantRating("extremely poor");
    }
  }

  // API call to get backtest based on the clicked backtest from the backtestScreen using the backtest ID
  const getBacktestData = () => {
    if (algoquantApi.token) {
      setIsLoading(true);
      algoquantApi
        .getBacktest(backtestId)
        .then((resp) => {
          console.log(resp.data);
          setBacktestDataObject(resp.data);
          algoquantRatingGenerator(resp.data);
          const combinedData = resp.data["value_timestamps"].map((x, i) => ({
            x,
            y: resp.data["portfolio_value_history"][i],
          }));
          const combinedData2 = resp.data["value_timestamps"].map((x, i) => ({
            x,
            y: resp.data["portfolio_value_history_hold"][i],
          }));
          setGraphData(combinedData);
          setGraphData2(combinedData2);
          // putting y values in acsending order for y ticks on graph
          const yTickValues = resp.data["portfolio_value_history"]
            .map((datum) => datum)
            .sort((a, b) => a - b);
          setYValues(yTickValues);
          const yTickValues2 = resp.data["portfolio_value_history_hold"]
            .map((datum) => datum)
            .sort((a, b) => a - b);
          setYValues2(yTickValues2);
          setIsLoading(false);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getBacktestData();
  }, []);

  // Stop screen from scrolling when the user is trying to interact with the graph
  function handlePressInGraph() {
    setIsScrollEnabled(false);
  }
  function handlePressOutGraph() {
    setIsScrollEnabled(true);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator
              size="large"
              color={THEME.activityIndicator.color.primary}
            />
          </View>
        ) : (
          <ScrollView
            scrollEnabled={isScrollEnabled}
            showsVerticalScrollIndicator={false}
            style={styles.mainScrollViewContainer}
          >
            {/* Header */}
            <View style={styles.headerContainer}>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.headerText}
                >
                  {backtestDataObject?.backtest_name}
                </Text>
              </View>
              <Text style={styles.text}>
                {backtestDataObject?.backtest_name} performed {algoquantRating}{" "}
                according to AlgoQuant metrics, yielding a {percentChanged}%{" "}
                profit over the course of {daysBetween} days.
              </Text>
            </View>
            {/* Graph */}
            <View style={styles.graphContainer}>
              <CustomGraph
                graphData={graphData}
                graphData2={graphData2}
                lineColor1="red"
                lineColor2="blue"
                yVals={yValues2}
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
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  mainScrollViewContainer: {
    flexGrow: 1,
    paddingTop: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color,
  },
  sectionTitleText: {
    color: THEME.text.color.primary,
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "600",
    paddingBottom: "2%",
  },
  headerContainer: {
    paddingBottom: "10%",
  },
  headerText: {
    color: THEME.text.color.primary,
    fontSize: THEME.text.fontSize.H2,
    fontWeight: "bold",
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
