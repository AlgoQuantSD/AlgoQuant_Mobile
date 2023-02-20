import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet } from "react-native";
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
  const [graphData, setGraphData] = useState(0);
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
  function handleTimeframeChange(timeframe) {
    setSelectedTimeframe(timeframe);
    switch (timeframe) {
      case timeframeEnums.DAY:
        getGraphData("D");
        break;
      case timeframeEnums.FIVE:
        getGraphData("5D");
        break;
      case timeframeEnums.MONTH:
        getGraphData("M");
        break;
      case timeframeEnums.YEAR:
        getGraphData("Y");
        break;
    }
  }

  return (
    <View style={styles.container}>
      <GraphDetailsHeader
        graphTitle={stockName}
        graphTrendData={stockData}
        selectedTimeframe={selectedTimeframe}
      />
      <CustomGraph
        graphData={graphData}
        percentChanged={percentChanged}
        yVals={yValues}
        selectedTimeframe={selectedTimeframe}
        handleTimeframeChange={handleTimeframeChange}
      />
      <StockDetailsFooter stockData={stockData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: THEME.colors.background,
  },
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
    paddingBottom: "5%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
