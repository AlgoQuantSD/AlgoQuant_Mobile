import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import HeaderContainer from "../../reusable_components/HeaderContainer";
import CustomGraph from "../../reusable_components/CustomGraph";
import { timeframeEnums } from "../../../constants/graphEnums";

export default function StockInfoScreen(props) {
  const { stockName } = props.route.params;

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

  const [graphData, setGraphData] = useState(mockData1);

  // Update graphdata and change the selected timeframe
  function handleTimeframeChange(timeframe, setSelectedTimeframe) {
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
      <HeaderContainer
        headerText={stockName}
        size={THEME.flexboxSizes.headerContainerMedium}
      />
      <CustomGraph
        graphData={graphData}
        handleTimeframeChange={handleTimeframeChange}
      />
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
