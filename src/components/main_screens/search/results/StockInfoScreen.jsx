import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import AlgoquantApiContext from "../../../../general_constants/api/apiContext";
import { THEME } from "../../../../general_constants/theme/Theme";
import CustomGraph from "../../../general_use/graph/CustomGraph";
import GraphDetailsHeader from "../../../general_use/graph/GraphDetailsHeader";
import { TIMEFRAME } from "../../../general_use/graph/enums/graphEnums";
import StockDetailsFooter from "./StockDetailsFooter";

export default function StockInfoScreen(props) {
  // variable containing the searched stock ticker user selected from SearchScreen
  const { stockName } = props.route.params;
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const [isStockInfoLoading, setIsStockInfoLoading] = useState(false);
  const [isGraphDataLoading, setIsGraphDataLoading] = useState(false);

  // State variables to store the ticker the user selected information
  const [high52w, setHigh52w] = useState(null);
  const [low52w, setLow52w] = useState(null);
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const [open, setOpen] = useState(null);
  const [recentPrice, setRecentPrice] = useState(null);
  const [priceDifferenceRaw, setPriceDifferenceRaw] = useState(null);
  const [percentChanged, setPercentChanged] = useState(null);
  // Store if the market is closed
  const [marketClosed, setMarketClosed] = useState(false);
  // Store the unix timestamp of the day the market closed
  const [dateClosed, setDateClosed] = useState(0);
  // Store the graph x and y values of the selected stock
  // initial value is an array because victorycharts takes data prop as array or objects only
  const [graphData, setGraphData] = useState([0]);
  // Store the Y Values we get in ascending order, work around to victory graphs default behavior of having y ticks on the graph in order its being read
  // this prevents the ticks from being out of order
  const [yValues, setYValues] = useState();

  // Aggregated object of the stock data to pass as a prop to children components
  const stockData = {
    recentPrice: recentPrice,
    open: open,
    high: high,
    low: low,
    yearlyHigh: high52w,
    yearlyLow: low52w,
    priceDifferenceRaw: priceDifferenceRaw,
    priceDifferencePercent: percentChanged,
    marketClosed: marketClosed,
    dateClosed: dateClosed,
  };

  // State variable to track what selected timeframe of data for the selected stock the user selected
  // default value is DAY because when the infoscreen is loaded in day in the first graph and info shown automatically
  const [selectedTimeframe, setSelectedTimeframe] = useState(TIMEFRAME.DAY);

  // Handle different presses
  function handlePressInGraph() {
    setIsScrollEnabled(false);
  }
  function handlePressOutGraph() {
    setIsScrollEnabled(true);
  }

  // Callback function to get the graph data from the Algoquant API
  const getGraphData = useCallback(
    (timeframe) => {
      setIsGraphDataLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getGraphData(stockName, timeframe)
          .then((resp) => {
            const combinedData = resp.data["timestamp"].map((x, i) => ({
              x,
              y: resp.data["close"][i],
            }));
            setGraphData(combinedData);
            // putting y values in acsending order for y ticks on graph
            const yTickValues = resp.data["close"]
              .map((datum) => datum)
              .sort((a, b) => a - b);

            setYValues(yTickValues);
            setPriceDifferenceRaw(resp.data["interval_price_change"]);
            setPercentChanged(resp.data["percent_change"]);

            if (resp.data["market_closed"] !== undefined) {
              setDateClosed(resp.data["market_closed"]);
              setMarketClosed(true);
            } else {
              setDateClosed(null);
              setMarketClosed(false);
            }

            setIsGraphDataLoading(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            setIsGraphDataLoading(false);
          });
      }
    },
    [algoquantApi, setGraphData, setYValues]
  );

  // Do this when the user pulls down the screen to refresh
  function onRefresh() {
    setIsRefreshing(true);
    setIsStockInfoLoading(true);
    // Get updated stock info
    if (algoquantApi.token) {
      algoquantApi
        .getStockInfo(stockName)
        .then((resp) => {
          setHigh52w(resp.data["52wk_high"]);
          setLow52w(resp.data["52wk_low"]);
          setHigh(resp.data["high"]);
          setLow(resp.data["low"]);
          setOpen(resp.data["open"]);
          setRecentPrice(resp.data["recent_price"]);
          setIsStockInfoLoading(false);
          setIsRefreshing(false);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          setIsStockInfoLoading(false);
          setIsRefreshing(false);
        });
    }
    getGraphData(selectedTimeframe);
  }

  // loads the data for stock along with the day graph because day is the initial graph shown on the info screen
  useEffect(() => {
    setIsStockInfoLoading(true);
    if (algoquantApi.token) {
      algoquantApi
        .getStockInfo(stockName)
        .then((resp) => {
          setHigh52w(resp.data["52wk_high"]);
          setLow52w(resp.data["52wk_low"]);
          setHigh(resp.data["high"]);
          setLow(resp.data["low"]);
          setOpen(resp.data["open"]);
          setRecentPrice(resp.data["recent_price"]);
          setIsStockInfoLoading(false);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          setIsStockInfoLoading(false);
        });
    }
    getGraphData("D");
  }, []);

  // Update graph data / information based on selected timeframe and change the selected timeframe

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: THEME.colors.background,
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle={"light-content"} />
      {isGraphDataLoading || isStockInfoLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator
            size="large"
            color={THEME.activityIndicator.color.primary}
          />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={THEME.colors.primary}
            />
          }
          scrollEnabled={isScrollEnabled}
          style={styles.container}
        >
          <View style={styles.graphDetailsContainer}>
            <GraphDetailsHeader
              graphTitle={stockName}
              graphTrendData={stockData}
              selectedTimeframe={selectedTimeframe}
              showTimeframeText={true}
            />
          </View>
          <View style={styles.graphContainer}>
            <CustomGraph
              graphData={graphData}
              getGraphData={getGraphData}
              setSelectedTimeframe={setSelectedTimeframe}
              selectedTimeframe={selectedTimeframe}
              percentChanged={percentChanged}
              yVals={yValues}
              handlePressInGraph={handlePressInGraph}
              handlePressOutGraph={handlePressOutGraph}
              timeframeEnabled={true}
            />
          </View>
          <View style={styles.stockDetailsFooterContainer}>
            <StockDetailsFooter stockData={stockData} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: THEME.colors.background,
  },
  graphDetailsContainer: {
    paddingTop: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  graphContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  stockDetailsFooterContainer: {
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },

  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
});
