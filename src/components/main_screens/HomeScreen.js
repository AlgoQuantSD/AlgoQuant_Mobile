import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Image,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Snackbar, AnimatedFAB, Button } from "react-native-paper";
import CustomModal from "../reusable_components/CustomModal";
import { snackbarCleanUp } from "../../helpers/snackbarCleanup";
import { THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";
import CustomGraph from "../reusable_components/CustomGraph";
import { FailedStateView } from "../reusable_components/FailedStateView";
import GraphDetailsHeader from "../reusable_components/GraphDetailsHeader";
import InvestContainer from "../single_use_components/InvestContainer";
import AlgoquantApiContext from "../../constants/ApiContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // AnimatedFAB
  const [isExtended, setIsExtended] = useState(true);
  let animateFrom;
  const fabStyle = { [animateFrom]: 16 };
  // Modal stuff
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [modalInputFields, setModalInputFields] = useState(null);
  const [modalButtons, setModalButtons] = useState(null);
  // Tracks which investor card activates the start job modal
  const [investorId, setInvestorId] = useState(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [modalSnackbarMessage, setModalSnackbarMessage] = useState(null);
  const [isModalSnackbarVisible, setIsModalSnackbarVisible] = useState(null);

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
  const [graphLoadingFailed, setGraphLoadingFailed] = useState(false);

  // Handle different presses
  function handlePressInGraph() {
    setIsScrollEnabled(false);
  }
  function handlePressOutGraph() {
    setIsScrollEnabled(true);
  }
  function handlePressCreateInvestor() {
    navigation.navigate("CreateInvestorStep1Screen");
  }
  function handlePressReloadGraph() {
    setGraphLoadingFailed(false);
    setSelectedTimeframe(timeframeEnums.DAY);
    getGraphData(timeframeEnums.DAY);
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
    const currentScrollPosition =
      Math.floor(event.nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  // Do this when the user pulls down the screen to refresh
  function onRefresh() {
    setIsRefreshing(true);
    // Get updated graph data
    getGraphData(selectedTimeframe);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }

  const portfolioData = {
    recentPrice: recentPrice,
    priceDifferenceRaw: priceChange,
    priceDifferencePercent: percentChanged,
    marketClosed: marketClosed,
    dateClosed: dateClosed,
  };

  // Modal props object to pass down to child component
  const modalProps = {
    isModalVisible: isModalVisible,
    setIsModalVisible: setIsModalVisible,
    modalType: modalType,
    setModalType: setModalType,
    modalTitle: modalTitle,
    setModalTitle: setModalTitle,
    modalHeader: modalHeader,
    setModalHeader: setModalHeader,
    modalBody: modalBody,
    setModalBody: setModalBody,
    modalInputFields: modalInputFields,
    setModalInputFields: setModalInputFields,
    investorId: investorId,
    setInvestorId: setInvestorId,
    modalButtons: modalButtons,
    setModalButtons: setModalButtons,
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
            setGraphLoading(false);
            setGraphLoadingFailed(true);
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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={THEME.colors.primary}
          />
        }
      >
        {/* Modal */}
        <CustomModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modalType={modalType}
          setModalType={setModalType}
          modalTitle={modalTitle}
          setModalTitle={setModalTitle}
          modalHeader={modalHeader}
          setModalHeader={setModalHeader}
          modalBody={modalBody}
          setModalBody={setModalBody}
          modalInputFields={modalInputFields}
          setModalInputFields={setModalInputFields}
          investorID={investorId}
          setInvestorID={setInvestorId}
          modalButtons={modalButtons}
          setModalButtons={setModalButtons}
          setSnackbarMessage={setSnackbarMessage}
          setIsSnackbarVisible={setIsSnackbarVisible}
          modalSnackbarMessage={modalSnackbarMessage}
          setModalSnackbarMessage={setModalSnackbarMessage}
          isModalSnackbarVisible={isModalSnackbarVisible}
          setIsModalSnackbarVisible={setIsModalSnackbarVisible}
        />
        {/* Graph loading */}
        {graphLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              size="large"
              color={THEME.loadingIndicator.color}
            />
            <Text style={styles.text}>Getting latest portfolio data..</Text>
          </View>
        ) : // Graph failed to load
        graphLoadingFailed ? (
          <FailedStateView
            imageSize={{ height: 250, width: 200 }}
            errorMessage="400: Graph failed to load"
            buttonText="Reload graph"
            buttonAction={handlePressReloadGraph}
          />
        ) : (
          // Graph loaded successfully
          <View>
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
                handlePressInGraph={handlePressInGraph}
                handlePressOutGraph={handlePressOutGraph}
                timeframeEnabled={true}
              />
            </View>
          </View>
        )}
        {/* Invest */}
        <View style={styles.investContainer}>
          <InvestContainer
            setSnackbarMessage={setSnackbarMessage}
            setIsSnackbarVisible={setIsSnackbarVisible}
            modalProps={modalProps}
            isRefreshing={isRefreshing}
            navigation={navigation}
          />
        </View>
      </ScrollView>
      {/* Snackbar */}
      <View
        style={{
          position: "absolute",
          bottom: -40,
          width: "100%",
          zIndex: 1,
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
      {/* Create investor button */}
      <AnimatedFAB
        icon={"plus"}
        label={"Create Investor"}
        extended={isExtended}
        onPress={handlePressCreateInvestor}
        visible={true}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle, fabStyle]}
        color={THEME.text.color.primary}
      />
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
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
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
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
    backgroundColor: THEME.animatedFAB.color.background,
  },
});
