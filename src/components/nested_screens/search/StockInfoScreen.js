import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import StockDetailsHeader from "../../reusable_components/StockDetailsHeader";
import CustomGraph from "../../reusable_components/CustomGraph";
import StockDetailsFooter from "../../reusable_components/StockDetailsFooter";
import { timeframeEnums } from "../../../constants/graphEnums";
import AlgoquantApiContext from "../../../constants/ApiContext";

export default function StockInfoScreen(props) {
  const { stockName } = props.route.params;
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  useEffect(() => {
    if (algoquantApi.token) {
      algoquantApi
        .getStockInfo(stockName)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
  }, [algoquantApi, stockName]);

  // Filler data until we connect to the backend
  const mockData1 = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
  ];
  const mockData2 = [
    { x: 2, y: 6 },
    { x: 3, y: 2 },
    { x: 4, y: 9 },
    { x: 6, y: 2 },
    { x: 8, y: 1 },
  ];

  const mockData3 = [
    { x: 0, y: 6 },
    { x: 5, y: 10 },
    { x: 6, y: 7 },
    { x: 7, y: 9 },
    { x: 8, y: 12 },
  ];

  const mockData4 = [
    { x: 0, y: 6 },
    { x: 5, y: 1 },
    { x: 6, y: 7 },
    { x: 7, y: 4 },
    { x: 8, y: 10 },
  ];

  const stockData = {
    recentPrice: 152.01,
    open: 150.64,
    high: 153.19,
    low: 150.64,
    yearlyHigh: 176.15,
    yearlyLow: 124.17,
    priceDifferenceRaw: 1.47,
    priceDifferencePercent: 0.8,
  };

  const [graphData, setGraphData] = useState(mockData1);
  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );

  // Update graphdata and change the selected timeframe
  function handleTimeframeChange(timeframe) {
    setSelectedTimeframe(timeframe);
    switch (timeframe) {
      case timeframeEnums.DAY:
        setGraphData(mockData1);
        break;
      case timeframeEnums.FIVE:
        setGraphData(mockData2);
        break;
      case timeframeEnums.MONTH:
        setGraphData(mockData3);
        break;
      case timeframeEnums.YEAR:
        setGraphData(mockData4);
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
