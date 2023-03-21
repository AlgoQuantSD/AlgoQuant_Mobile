import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import GraphDetailsHeader from "../../reusable_components/GraphDetailsHeader";
import CustomGraph from "../../reusable_components/CustomGraph";
import StockDetailsFooter from "../../reusable_components/StockDetailsFooter";
import { timeframeEnums } from "../../../constants/graphEnums";
import AlgoquantApiContext from "../../../constants/ApiContext";

export default function StockInfoScreen(props) {
  // variable containing the searched stock ticker user selected from SearchScreen
  const { stockName } = props.route.params;
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  const [isRefreshing, setIsRefreshing] = useState(false);

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
  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );

  // Callback function to get the graph data from the Algoquant API
  const getGraphData = useCallback(
    (timeframe) => {
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
            setMarketClosed(resp.data["is_market_closed"]);

            // Grab the first timestamp from day graph to store a date for when the date closed
            if (timeframe === "D") {
              setDateClosed(resp.data["timestamp"][0]);
            }
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    },
    [algoquantApi, setGraphData, setYValues]
  );
  // WILL : fix graphh tick spacing and make graph larger plss

  // Do this when the user pulls down the screen to refresh
  function onRefresh() {
    setIsRefreshing(true);
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
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
    getGraphData(selectedTimeframe);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }

  // loads the data for stock along with the day graph because day is the initial graph shown on the info screen
  useEffect(() => {
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
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
    getGraphData("D");
  }, []);

  // Update graph data / information based on selected timeframe and change the selected timeframe

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={THEME.colors.primary}
        />
      }
      style={styles.container}
    >
      <View style={styles.graphDetailsContainer}>
        <GraphDetailsHeader
          graphTitle={stockName}
          graphTrendData={stockData}
          selectedTimeframe={selectedTimeframe}
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
          timeframeEnabled={true}
        />
      </View>
      <View style={styles.stockDetailsFooterContainer}>
        <StockDetailsFooter stockData={stockData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: THEME.colors.background,
  },
  graphDetailsContainer: {
    flex: 0.2,
    width: "90%",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  graphContainer: {
    flex: 0.5,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    marginRight: "5%",
  },
  stockDetailsFooterContainer: {
    flex: 0.3,
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H1,
    color: THEME.text.color.primary,
    paddingBottom: "5%",
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
});
