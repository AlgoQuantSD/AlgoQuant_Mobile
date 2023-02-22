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
        <View style={styles.graphDetailsContainer}>
          <GraphDetailsHeader
            graphTitle="Your Assets"
            graphTrendData={portfolioData}
            selectedTimeframe={selectedTimeframe}
          />
        </View>
        <View style={styles.graphContainer}>
          <CustomGraph
            graphData={graphData}
            getGraphData={getGraphData}
            setSelectedTimeframe={setSelectedTimeframe}
            selectedTimeframe={selectedTimeframe}
            handlePressInTouchableElement={handlePressInTouchableElement}
            handlePressOutTouchableElement={handlePressOutTouchableElement}
          />
        </View>
        <View style={styles.investContainer}>
          <InvestContainer
            handlePressInTouchableElement={handlePressInTouchableElement}
            handlePressOutTouchableElement={handlePressOutTouchableElement}
            setSnackbarMessage={setSnackbarMessage}
            setIsSnackbarVisible={setIsSnackbarVisible}
            navigation={navigation}
          />
        </View>
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
    color: THEME.text.primaryColor,
  },
  graphDetailsContainer: {
    flex: 0.2,
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    marginRight: "5%",
  },
  graphContainer: {
    flex: 0.3,
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
  },
  investContainer: {
    flex: 0.5,
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
  },
  graphDetailsContainer: {
    flex: 0.2,
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    marginRight: "5%",
  },
  graphContainer: {
    flex: 0.3,
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
  },
  investContainer: {
    flex: 0.5,
    alignItems: "center",
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
  },
});
