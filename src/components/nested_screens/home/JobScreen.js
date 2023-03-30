import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import GraphDetailsHeader from "../../reusable_components/GraphDetailsHeader";
import CustomGraph from "../../reusable_components/CustomGraph";
import CustomTable from "../../reusable_components/CustomTable";
import CustomModal from "../../reusable_components/CustomModal";
import AlgoquantApiContext from "../../../constants/ApiContext";
import { timeframeEnums } from "../../../constants/graphEnums";
import { stopJobModalBuilder } from "../../../helpers/modalFactory";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import { TRADE_HISTORY_FETCH_AMOUNT } from "../../../constants/ApiConstants";
import { THEME } from "../../../constants/Theme";
import { ChipJobTypes } from "../../../constants/ChipJobTypeEnum";
import { jobHistoryColumns } from "../../../helpers/tableColumns";

export default function JobScreen(props) {
  const { jobID, jobType } = props.route.params;

  // We need this to navigate the user back home after stopping a job
  const navigation = useNavigation();

  // Screen refresh
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  // Graph state
  // initial value is an array because victorycharts takes data prop as array or objects only
  const [graphData, setGraphData] = useState([0]);
  const [yValues, setYValues] = useState([]);
  const [percentChanged, setPercentChanged] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [recentPrice, setRecentPrice] = useState(0);
  const [marketClosed, setMarketClosed] = useState(false);

  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [modalButtons, setModalButtons] = useState(null);
  // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const [history, setHistory] = useState([]);
  const [lastQuery, setLastQuery] = useState(false);

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [lastKey, setLastKey] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(false);

  // state variable to store the job based on the clicked job from the list using the job id
  const [job, setJob] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Stuff that we need to set to create the stop job modal
  const modalProps = {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setModalButtons,
  };

  const jobsAggregatedData = {
    recentPrice: recentPrice,
    priceDifferenceRaw: priceChange,
    priceDifferencePercent: percentChanged,
    marketClosed: marketClosed,
    dateClosed: null,
  };

  // Build the stop job modal when the user presses the stop icon
  function handleStopIconPress() {
    stopJobModalBuilder(modalProps);
  }

  function handlePressInGraph() {
    setIsScrollEnabled(false);
  }

  function handlePressOutGraph() {
    setIsScrollEnabled(true);
  }

  // Do this when the user pulls down the screen to refresh
  function onRefresh() {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }

  // Function to get the job clicked by the user using the jobID passed from the getJobList endpoint
  const getJob = () => {
    if (algoquantApi.token) {
      algoquantApi
        .getJob(jobID)
        .then((resp) => {
          console.log("Job response: ", resp.data);
          setJob(resp.data);
          setStartDate(
            new Date(parseInt(resp.data.start_time)).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })
          );

          setEndDate(
            new Date(parseInt(resp.data.end_time)).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })
          );
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log("GetJob: " + err);
        });
    }
  };

  const fetchJobsTrades = () => {
    const historyBuffer = [];
    // once its the last query do nothing
    // first query always sends a last key of null
    if (!lastQuery) {
      setIsTableLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(TRADE_HISTORY_FETCH_AMOUNT, jobID, lastKey)
          .then((resp) => {
            // Last query set to trie if there is no last evaluated key from response
            if (resp.data.LEK_timestamp === undefined) {
              setLastQuery(true);
            } else {
              setLastKey(resp.data.LEK_timestamp);
            }

            // Populate History array with trade history after each call using a buffer
            for (let i = 0; i < resp.data.trades_count; i++) {
              let timestamp = new Date(parseInt(resp.data.trades[i].timestamp));
              const options = {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              };
              const formattedTime = timestamp.toLocaleString([], options);

              let shares = parseFloat(resp.data.trades[i].qty).toFixed(3);
              historyBuffer.push({
                jobName: resp.data.trades[i].job_name,
                buyOrSell: resp.data.trades[i].side === "B" ? "Buy" : "Sell",
                stockTicker: resp.data.trades[i].symbol,
                shares: shares,
                avgPrice: resp.data.trades[i].avg_price,
                date: formattedTime,
              });
            }
            setHistory(history.concat(historyBuffer));
            setIsTableLoading(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    }
  };

  // Callback function to get the graph data from the Algoquant API
  const getGraphData = useCallback(
    (timeframe) => {
      if (algoquantApi.token) {
        algoquantApi
          .getPerformance(timeframe, jobID)
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
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    },
    [algoquantApi]
  );

  // Used to call fetchJobsTrades during the beginning of the render once, to check if
  // there are any trades in history and to populate the first few into the History array
  // get the data for the job clicked by the user
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    fetchJobsTrades();
    getGraphData("D");
    getJob();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator
            color={THEME.activityIndicator.color.primary}
            size="large"
          />
        </View>
      ) : (
        <ScrollView
          style={{ flexGrow: 1 }}
          scrollEnabled={isScrollEnabled}
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
            modalButtons={modalButtons}
            setModalButtons={setModalButtons}
            setSnackbarMessage={setSnackbarMessage}
            setIsSnackbarVisible={setIsSnackbarVisible}
            jobID={jobID}
            navigation={navigation}
          />
          {/* Header Row */}
          <View style={styles.headerContainer}>
            <View style={{ width: "65%" }}>
              <GraphDetailsHeader
                graphTitle={job?.name}
                graphTrendData={jobsAggregatedData}
                selectedTimeframe={selectedTimeframe}
              />
            </View>

            <View style={{ width: "35%" }}>
              {job?.status === "active-I" ? (
                <TouchableOpacity
                  style={styles.headerRowIcon}
                  onPress={handleStopIconPress}
                >
                  <View>
                    <Text style={styles.text}>Job Active</Text>
                    <Text style={styles.text}>{startDate}</Text>
                  </View>

                  <Ionicons
                    name={THEME.icon.name.stopJob}
                    color={THEME.icon.color.primary}
                    size={THEME.icon.size.large}
                  />
                </TouchableOpacity>
              ) : job?.status === "stopping" ? (
                <View style={styles.headerRowIcon}>
                  <View>
                    <Text style={styles.text}>Job Stopping</Text>
                  </View>

                  <ActivityIndicator
                    color={THEME.icon.color.primary}
                    size={32}
                  />
                </View>
              ) : (
                <View style={styles.headerRowIcon}>
                  <View>
                    <Text style={styles.text}>Job Inactive</Text>
                    <Text style={styles.text}>
                      {startDate} - {endDate}
                    </Text>
                  </View>

                  <Ionicons
                    name={THEME.icon.name.inactiveJob}
                    color={THEME.icon.color.primary}
                    size={32}
                  />
                </View>
              )}
            </View>
          </View>
          {/* Graph */}
          <View style={styles.graphContainer}>
            {/* This is was added to enhance the performance of the modal. 
        If the graph is in the background while we activate the modal, 
        the modal will have a laggy enter and exit animation */}
            {isModalVisible ? null : jobType === "CAROUSEL_TAB_JOBS" ||
              jobType === ChipJobTypes.Active ? (
              <CustomGraph
                graphData={graphData}
                getGraphData={getGraphData}
                setSelectedTimeframe={setSelectedTimeframe}
                selectedTimeframe={selectedTimeframe}
                percentChanged={percentChanged}
                yVals={yValues}
                timeframeEnabled={true}
                handlePressInGraph={handlePressInGraph}
                handlePressOutGraph={handlePressOutGraph}
              />
            ) : (
              <CustomGraph
                graphData={graphData}
                yVals={yValues}
                percentChanged={percentChanged}
                timeframeEnabled={false}
                handlePressInGraph={handlePressInGraph}
                handlePressOutGraph={handlePressOutGraph}
              />
            )}
          </View>
          {/* Recent Trades */}
          <View style={styles.recentTradesContainer}>
            <Text style={styles.sectionTitleText}>Recent Trades</Text>
            <CustomTable
              data={history}
              columns={jobHistoryColumns}
              isLoading={isTableLoading}
              handleLoadMore={fetchJobsTrades}
              nullMessage="No trades made yet"
            />
          </View>
        </ScrollView>
      )}

      {/* Snackbar */}
      <View style={styles.snackbar}>
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
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H2,
    color: THEME.text.color.primary,
  },
  headerContainer: {
    flexDirection: "row",
    paddingTop: "2%",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H2,
    color: THEME.text.color.primary,
    paddingRight: "2%",
  },
  headerRowIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "auto",
    marginLeft: "auto",
  },
  graphContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recentTradesContainer: {
    maxHeight: 600,
    paddingTop: "10%",
    paddingBottom: 5,
  },
  snackbarContainer: { flex: 0.05 },
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
