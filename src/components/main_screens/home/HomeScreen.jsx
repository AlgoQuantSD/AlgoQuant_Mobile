import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AnimatedFAB, Snackbar } from "react-native-paper";
import AlgoquantApiContext from "../../../general_constants/api/apiContext";
import { THEME } from "../../../general_constants/theme/Theme";
import CustomGraph from "../../general_use/graph/CustomGraph";
import GraphDetailsHeader from "../../general_use/graph/GraphDetailsHeader";
import { TIMEFRAME } from "../../general_use/graph/enums/graphEnums";
import CustomModal from "../../general_use/modal/CustomModal";
import { snackbarCleanUp } from "../../general_use/snackbar/helpers/snackbarCleanup";
import { FailedStateView } from "../../general_use/success_error_screens/FailedStateView";
import InvestCarousel from "./invest/carousel/InvestCarousel";

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

  const [selectedTimeframe, setSelectedTimeframe] = useState(TIMEFRAME.DAY);

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
    setSelectedTimeframe(TIMEFRAME.DAY);
    getGraphData(TIMEFRAME.DAY);
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

  function scrollToBottom() {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 400);
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

            if (resp.data["market_closed"] !== undefined) {
              setDateClosed(resp.data["market_closed"]);
              setMarketClosed(true);
            } else {
              setDateClosed(null);
              setMarketClosed(false);
            }

            setGraphLoading(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            setGraphLoading(false);
            setGraphLoadingFailed(true);
          });
      }
    },
    [algoquantApi]
  );
  useEffect(() => {
    getGraphData("D");
  }, [algoquantApi]);

  return (
    <View style={{ backgroundColor: THEME.colors.background }}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        scrollEnabled={isScrollEnabled}
        scrollsToTop={true}
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
        indicatorStyle="black"
        contentInset={{
          scrollbarThumbTintColor: "blue",
          scrollbarTrackTintColor: "yellow",
        }}
        style={styles.scrollViewContainer}
      >
        <View style={styles.container}>
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
            <View style={styles.activityIndicator}>
              <FailedStateView
                imageSize={{ height: 250, width: 200 }}
                errorMessage="ERROR: Graph failed to load"
                buttonText="Reload graph"
                buttonAction={handlePressReloadGraph}
              />
            </View>
          ) : (
            // Graph loaded successfully
            <View>
              <View style={styles.graphDetailsContainer}>
                <GraphDetailsHeader
                  graphTitle="Your Assets"
                  graphTrendData={portfolioData}
                  selectedTimeframe={selectedTimeframe}
                  showTimeframeText={true}
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
            <Text style={styles.headerText}>Invest</Text>
            <InvestCarousel
              setSnackbarMessage={setSnackbarMessage}
              setIsSnackbarVisible={setIsSnackbarVisible}
              modalProps={modalProps}
              isRefreshing={isRefreshing}
              scrollToBottom={scrollToBottom}
              navigation={navigation}
            />
          </View>
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
        onLongPress={() => setIsExtended(!isExtended)}
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
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  headerText: {
    fontSize: THEME.text.fontSize.H2,
    fontWeight: "bold",
    color: THEME.text.color.primary,
    alignSelf: "flex-start",
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    height: 600,
  },
  graphDetailsContainer: {
    paddingTop: "5%",
  },
  graphContainer: {
    alignItems: "center",
    paddingTop: "2%",
  },
  investContainer: {
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "10%",
    maxHeight: 820,
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
