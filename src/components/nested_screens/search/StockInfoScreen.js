import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import HeaderContainer from "../../reusable_components/HeaderContainer";
import CustomGraph from "../../reusable_components/CustomGraph";
import { handleTimeframeChange, mockData1 } from "../../../helpers/graphHelper";

export default function StockInfoScreen(props) {
  const { stockName } = props.route.params;

  const [graphData, setGraphData] = useState(mockData1);
  const [selectedTimeframe, setSelectedTimeframe] = useState(1);
  return (
    <View style={styles.container}>
      <HeaderContainer
        headerText={stockName}
        size={THEME.flexboxSizes.headerContainerMedium}
      />
      <CustomGraph
        graphData={graphData}
        setGraphData={setGraphData}
        selectedTimeframe={selectedTimeframe}
        setSelectedTimeframe={setSelectedTimeframe}
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
