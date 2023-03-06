import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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

export default function JobScreen(props) {
  const { jobID, jobType } = props.route.params;

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

  // INTEGRATION CODE
  const [history, setHistory] = useState([]);
  const [lastQuery, setLastQuery] = useState(false);

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [lastKey, setLastKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // state variable to store the job based on the clicked job from the list using the job id
  const [job, setJob] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to get the job clicked by the user using the jobID passed from the getJobList endpoint
  const getJob = () => {
    if (algoquantApi.token) {
      algoquantApi
        .getJob(jobID)
        .then((resp) => {
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
      setIsLoading(true);
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
            setIsLoading(false);
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
            console.log(resp.data);
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

            // setGraphLoading(false);
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
    fetchJobsTrades();
    getGraphData("D");
    getJob();
  }, []);

  return (
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
        modalButtons={modalButtons}
        setModalButtons={setModalButtons}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarVisible={setIsSnackbarVisible}
        jobID={jobID}
      />
      {/* Header Row */}
      <View style={styles.headerContainer}>
        <GraphDetailsHeader
          graphTitle={job?.name}
          graphTrendData={jobsAggregatedData}
          selectedTimeframe={selectedTimeframe}
        />
        {jobType === "CAROUSEL_TAB_JOBS" ? (
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
      {/* Graph */}
      <View style={styles.graphContainer}>
        {/* This is was added to enhance the performance of the modal. 
        If the graph is in the background while we activate the modal, 
        the modal will have a laggy enter and exit animation */}
        {isModalVisible ? null : (
          <CustomGraph
            graphData={graphData}
            getGraphData={getGraphData}
            setSelectedTimeframe={setSelectedTimeframe}
            selectedTimeframe={selectedTimeframe}
            percentChanged={percentChanged}
            yVals={yValues}
          />
        )}
      </View>
      {/* Recent Trades */}
      <View style={styles.recentTradesContainer}>
        <Text style={styles.sectionTitleText}>Recent Trades</Text>
        <CustomTable
          data={history}
          loading={isLoading}
          handleLoadMore={fetchJobsTrades}
        />
      </View>
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    flex: 0.2,
    width: "90%",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
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
    flex: 0.5,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "5%",
    marginRight: "5%",
  },
  recentTradesContainer: {
    flex: 0.3,
    width: "90%",
    marginLeft: "5%",
    marginTop: "10%",
    marginRight: "5%",
    marginBottom: "1%",
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
