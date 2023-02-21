import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { snackbarCleanUp } from "../../helpers/snackbarCleanup";
import { THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";
import CustomGraph from "../reusable_components/CustomGraph";
import GraphDetailsHeader from "../reusable_components/GraphDetailsHeader";
import InvestContainer from "../single_use_components/InvestContainer";
import AlgoquantApiContext from "../../constants/ApiContext";
import { Marker } from "react-native-svg";

export default function HomeScreen({ navigation }) {
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  function handlePressInTouchableElement() {
    setIsScrollEnabled(false);
  }
  function handlePressOutTouchableElement() {
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
  const [graphData, setGraphData] = useState(0);
  const [yValues, setYValues] = useState();
  const [marketClosed, setMarketClosed] = useState(false);
  const [priceDifferenceRaw, setPriceDifferenceRaw] = useState(false);
  const [percentChanged, setPercentChanged] = useState(null);
  const [dateClosed, setDateClosed] = useState(0);

  // Callback function to get the graph data from the Algoquant API
  const getGraphData = useCallback(
    (timeframe) => {
      if (algoquantApi.token) {
        algoquantApi
          .getPerformance(timeframe, null)
          .then((resp) => {
            console.log(resp.data);
            // const combinedData = resp.data["timestamp"].map((x, i) => ({
            //   x,
            //   y: resp.data["close"][i],
            // }));
            // setGraphData(combinedData);
            // // putting y values in acsending order for y ticks on graph
            // const yTickValues = resp.data["close"]
            //   .map((datum) => datum)
            //   .sort((a, b) => a - b);

            // setYValues(yTickValues);
            // setPriceDifferenceRaw(resp.data["interval_price_change"]);
            // setPercentChanged(resp.data["percent_change"]);
            // setMarketClosed(resp.data["is_market_closed"]);

            // // Grab the first timestamp from day graph to store a date for when the date closed
            // if (timeframe === "D") {
            //   setDateClosed(resp.data["timestamp"][0]);
            // }
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    },
    [algoquantApi, setGraphData, setYValues]
  );
  // useEffect(() => {
  //   getGraphData("D");
  // }, []);
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
          getGraphData={getGraphData}
          setSelectedTimeframe={setSelectedTimeframe}
          selectedTimeframe={selectedTimeframe}
          handlePressInTouchableElement={handlePressInTouchableElement}
          handlePressOutTouchableElement={handlePressOutTouchableElement}
        />
        <InvestContainer
          handlePressInTouchableElement={handlePressInTouchableElement}
          handlePressOutTouchableElement={handlePressOutTouchableElement}
          setSnackbarMessage={setSnackbarMessage}
          setIsSnackbarVisible={setIsSnackbarVisible}
          navigation={navigation}
        />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: -40,
          width: "100%",
        }}
      >
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() =>
            snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage)
          }
          duration={3500}
          action={{
            label: "Dismiss",
            textColor: THEME.text.color,
            onPress: () => {
              snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage);
            },
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
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
