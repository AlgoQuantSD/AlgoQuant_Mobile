import React, { useState, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";
import CustomGraph from "../reusable_components/CustomGraph";
import GraphDetailsHeader from "../reusable_components/GraphDetailsHeader";
import InvestContainer from "../single_use_components/InvestContainer";

export default function HomeScreen({ navigation }) {
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  function handlePressInTouchableElement() {
    console.log("PRESS IN");
    setIsScrollEnabled(false);
  }
  function handlePressOutTouchableElement() {
    console.log("PRESS OUT");
    setIsScrollEnabled(true);
  }

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    scrollViewRef.current.scrollTo({
      x: 0,
      y: scrollPosition,
      animated: false,
    });
  };

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

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

  const portfolioData = {
    recentPrice: 152.01,
    open: 150.64,
    high: 153.19,
    low: 150.64,
    yearlyHigh: 176.15,
    yearlyLow: 124.17,
    priceDifferenceRaw: 1.47,
    priceDifferencePercent: 0.8,
  };

  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );
  const [graphData, setGraphData] = useState(mockData1);

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
      <ScrollView
        scrollEnabled={isScrollEnabled}
        ref={scrollViewRef}
        onContentSizeChange={handleContentSizeChange}
        onScroll={handleScroll}
        scrollEventThrottle={10000}
        keyboardShouldPersistTaps="never"
      >
        <GraphDetailsHeader
          graphTitle="Your Assets"
          graphTrendData={portfolioData}
          selectedTimeframe={selectedTimeframe}
        />
        <CustomGraph
          graphData={graphData}
          selectedTimeframe={selectedTimeframe}
          handleTimeframeChange={handleTimeframeChange}
          handlePressInTouchableElement={handlePressInTouchableElement}
          handlePressOutTouchableElement={handlePressOutTouchableElement}
        />
        <InvestContainer
          handlePressInTouchableElement={handlePressInTouchableElement}
          handlePressOutTouchableElement={handlePressOutTouchableElement}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: "10%",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
