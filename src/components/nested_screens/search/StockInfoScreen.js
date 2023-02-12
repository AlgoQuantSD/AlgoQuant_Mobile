import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import StockDetailsHeader from "../../reusable_components/StockDetailsHeader";
import CustomGraph from "../../reusable_components/CustomGraph";
import StockDetailsFooter from "../../reusable_components/StockDetailsFooter";
import { timeframeEnums } from "../../../constants/graphEnums";
import AlgoquantApiContext from "../../../constants/ApiContext";
import { useScrollToTop } from "@react-navigation/native";

export default function StockInfoScreen(props) {
  const { stockName } = props.route.params;
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  // State variables to store the ticker the user searched information
  const [high52w, setHigh52w] = useState();
  const [low52w, setLow52w] = useState();
  const [high, setHigh] = useState();
  const [low, setLow] = useState();
  const [open, setOpen] = useState();
  const [recentPrice, setRecentPrice] = useState();
  const [priceDifferenceRaw, setPriceDifferenceRaw] = useState();

  const [graphData, setGraphData] = useState();
  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );
  const [yValues, setYValues] = useState();

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
            const yTickValues = resp.data["close"]
              .map((datum) => datum)
              .sort((a, b) => a - b);

            setYValues(yTickValues);
            setPriceDifferenceRaw(resp.data["interval_price_change"]);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    },
    [algoquantApi, setGraphData, setYValues]
  );

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

  const stockData = {
    recentPrice: recentPrice,
    open: open,
    high: high,
    low: low,
    yearlyHigh: high52w,
    yearlyLow: low52w,
    priceDifferenceRaw: priceDifferenceRaw,
    priceDifferencePercent: 0.8,
  };

  // Update graphdata and change the selected timeframe
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
      <StockDetailsHeader
        stockName={stockName}
        stockData={stockData}
        selectedTimeframe={selectedTimeframe}
      />
      <CustomGraph
        graphData={graphData}
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
