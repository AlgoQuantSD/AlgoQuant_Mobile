import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Snackbar } from "react-native-paper";
import { snackbarCleanUp } from "../../helpers/snackbarCleanup";
import { THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";
import CustomGraph from "../reusable_components/CustomGraph";
import GraphDetailsHeader from "../reusable_components/GraphDetailsHeader";
import InvestContainer from "../single_use_components/InvestContainer";
import AlgoquantApiContext from "../../constants/ApiContext";

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

  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );

  // initial value is an array because victorycharts takes data prop as array or objects only
  const [graphData, setGraphData] = useState([0]);
  const [yValues, setYValues] = useState([]);

  // All state variables for stock related data / statistics
  const [percentChanged, setPercentChanged] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [dateClosed, setDateClosed] = useState(null);
  const [marketClosed, setMarketClosed] = useState(false);
  const [recentPrice, setRecentPrice] = useState(0);
  const [graphLoading, setGraphLoading] = useState(true);

  const portfolioData = {
    recentPrice: recentPrice,
    priceDifferenceRaw: priceChange,
    priceDifferencePercent: percentChanged,
    marketClosed: marketClosed,
    dateClosed: dateClosed,
  };

  // Callback function to get the graph data from the Algoquant API
  const getGraphData = useCallback(
    (timeframe) => {
      if (algoquantApi.token) {
        setGraphLoading(true);
        algoquantApi
          .getPerformance(timeframe)
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

            setPercentChanged(resp.data["percent_change"].toFixed(2));
            setPriceChange(
              parseFloat(resp.data["interval_price_change"]).toFixed(2)
            );
            setRecentPrice(resp.data["recent_price"].toFixed(2));
            setMarketClosed(resp.data["is_market_closed"]);

            // If the timeframe selected was day, store the first timeframe (yVal) to keep track of the day the market was open,
            // DateClosed variable will then used to show the date the market is closed, if it is.
            if (timeframe === "D") {
              setDateClosed(resp.data["timestamp"][0]);
            }

            setGraphLoading(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    },
    [algoquantApi]
  );
  useEffect(() => {
    getGraphData("D");
  }, [algoquantApi]);

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
        {graphLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              size="large"
              color={THEME.loadingIndicator.color}
            />
          </View>
        ) : (
          <>
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
                percentChanged={percentChanged}
                yVals={yValues}
                handlePressInTouchableElement={handlePressInTouchableElement}
                handlePressOutTouchableElement={handlePressOutTouchableElement}
              />
            </View>
          </>
        )}

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
            textColor: THEME.snackbar.text.color,
            onPress: () => {
              snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage);
            },
          }}
          style={styles.snackbar}
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
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
  },
  activityIndicator: {
    paddingTop: "10%",
  },
});
