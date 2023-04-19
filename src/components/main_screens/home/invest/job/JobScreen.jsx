import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { TRADE_HISTORY_FETCH_AMOUNT } from "../../../../../constants/ApiConstants";
import AlgoquantApiContext from "../../../../../constants/ApiContext";
import { CHIP_JOB_TYPES } from "../../../../../constants/ChipJobTypeEnum";
import { THEME } from "../../../../../constants/Theme";
import { timeframeEnums } from "../../../../../constants/graphEnums";
import { stopJobModalBuilder } from "../../../../../helpers/modalFactory";
import { snackbarCleanUp } from "../../../../../helpers/snackbarCleanup";
import { jobHistoryColumns } from "../../../../../helpers/tableColumns";
import CustomGraph from "../../../../general_use/graph/CustomGraph";
import GraphDetailsHeader from "../../../../general_use/graph/GraphDetailsHeader";
import CustomModal from "../../../../general_use/modal/CustomModal";
import CustomTable from "../../../../general_use/table/CustomTable";
import BuyingPowerAndHoldings from "./BuyingPowerAndHoldings";

export default function JobScreen(props) {
  const { jobID, jobType } = props.route.params;

  // We need this to navigate the user back home after stopping a job
  const navigation = useNavigation();

  // Screen refresh
  const [isRefreshing, setIsRefreshing] = useState(false);
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
  const [isJobLoading, setIsJobLoading] = useState(false);
  const [isGraphDataLoading, setIsGraphDataLoading] = useState(false);

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
    setIsJobLoading(true);
    if (algoquantApi.token) {
      algoquantApi
        .getJob(jobID)
        .then((resp) => {
          setJob(resp.data);
          setStartDate(
            new Date(parseInt(resp.data.start_time)).toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
            })
          );

          setEndDate(
            new Date(parseInt(resp.data.end_time)).toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
            })
          );
          setIsJobLoading(false);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          setIsJobLoading(false);
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
          });
      }
    }
  };

  // Callback function to get the graph data from the Algoquant API
  const getGraphData = useCallback(
    (timeframe) => {
      setIsGraphDataLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getPerformance(timeframe, jobID)
          .then((resp) => {
            const combinedData = resp.data["timestamp"].map((x, i) => ({
              x: `${x}`,
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
            setIsGraphDataLoading(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            setIsGraphDataLoading(false);
          });
      }
    },
    [algoquantApi]
  );

  // Used to call fetchJobsTrades during the beginning of the render once, to check if
  // there are any trades in history and to populate the first few into the History array
  // get the data for the job clicked by the user
  useEffect(() => {
    fetchJobsTrades();
    getGraphData("D");
    getJob();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      {isJobLoading || isGraphDataLoading || isTableLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator
            size="large"
            color={THEME.activityIndicator.color.primary}
          />
        </View>
      ) : (
        <View>
          <ScrollView
            style={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
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
                  showTimeframeText={job?.status?.includes("active")}
                  isJobNameLoading={isJobLoading}
                  isPriceTrendLoading={isGraphDataLoading}
                />
              </View>

              <View style={{ width: "35%" }}>
                {job?.status?.includes("active") ? (
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
                jobType === CHIP_JOB_TYPES.Active ? (
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
            {/* Buying power and holdings */}
            {job?.status?.includes("active") ? (
              <View
                style={{
                  paddingBottom: "10%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                }}
              >
                <Text
                  style={[
                    styles.sectionTitleText,
                    {
                      paddingBottom: "5%",
                    },
                  ]}
                >
                  Buying Power and Holdings
                </Text>
                <BuyingPowerAndHoldings job={job} />
              </View>
            ) : null}

            {/* Recent Trades */}
            <View style={styles.recentTradesContainer}>
              <Text style={styles.sectionTitleText}>Recent Trades</Text>
              <CustomTable
                data={history}
                columns={jobHistoryColumns}
                isLoading={isTableLoading}
                handleLoadMore={fetchJobsTrades}
                height={250}
                nullMessage="No trades made yet"
              />
            </View>
          </ScrollView>

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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "600",
    color: THEME.text.color.primary,
  },
  headerContainer: {
    flexDirection: "row",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
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
    paddingBottom: "10%",
  },
  recentTradesContainer: {
    paddingBottom: 10,
    paddingLeft: "5%",
    paddingRight: "5%",
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
