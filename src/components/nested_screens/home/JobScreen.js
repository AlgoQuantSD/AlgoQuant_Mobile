import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import GraphDetailsHeader from "../../reusable_components/GraphDetailsHeader";
import CustomGraph from "../../reusable_components/CustomGraph";
import CustomTable from "../../reusable_components/CustomTable";
import CustomModal from "../../reusable_components/CustomModal";
import AlgoquantApiContext from "../../../constants/ApiContext";
import {
  mockGraphHeaderData,
  mockGraphData1,
  mockGraphData2,
  mockGraphData3,
  mockGraphData4,
} from "../../../constants/MockData";
import { timeframeEnums } from "../../../constants/graphEnums";
import { stopJobModalBuilder } from "../../../helpers/modalFactory";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import { TRADE_HISTORY_FETCH_AMOUNT } from "../../../constants/ApiConstants";
import { THEME } from "../../../constants/Theme";
export default function JobScreen(props) {
  const { job } = props.route.params;

  // Graph state
  const [graphData, setGraphData] = useState(mockGraphData1);
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

  // Get the appropriate graphdata according to what timeframe the user has selected
  function getGraphData(timeframe) {
    switch (timeframe) {
      case timeframeEnums.DAY:
        setGraphData(mockGraphData1);
        break;
      case timeframeEnums.FIVE:
        setGraphData(mockGraphData2);
        break;
      case timeframeEnums.MONTH:
        setGraphData(mockGraphData3);
        break;
      case timeframeEnums.YEAR:
        setGraphData(mockGraphData4);
        break;
    }
  }

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
  const fetchTrades = () => {
    const historyBuffer = [];

    // once its the last query do nothing
    // first query always sends a last key of null
    if (!lastQuery) {
      setIsLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(TRADE_HISTORY_FETCH_AMOUNT, lastKey)
          .then((resp) => {
            // Last query set to trie if there is no last evaluated key from response
            if (resp.data.LastEvaluatedKey === undefined) {
              setLastQuery(true);
            } else {
              setLastKey({
                timestamp: resp.data.LastEvaluatedKey.timestamp,
                user_id: resp.data.LastEvaluatedKey.user_id,
              });
            }

            // Populate History array with trade history after each call using a buffer
            for (let i = 0; i < resp.data.Count; i++) {
              let timestamp = new Date(parseInt(resp.data.Items[i].timestamp));
              const options = {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              };
              const formattedTime = timestamp.toLocaleString([], options);

              let shares = parseFloat(resp.data.Items[i].qty).toFixed(3);
              historyBuffer.push({
                jobName: resp.data.Items[i].job_name,
                buyOrSell: resp.data.Items[i].side === "B" ? "Buy" : "Sell",
                stockTicker: resp.data.Items[i].symbol,
                shares: shares,
                avgPrice: resp.data.Items[i].avg_price,
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

  // Used to call fetchTrades during the beginning of the render once, to check if
  // there are any trades in history and to populate the first few into the History array
  useEffect(() => {
    fetchTrades();
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
      />
      {/* Header Row */}
      <View style={styles.headerContainer}>
        <GraphDetailsHeader
          graphTitle={job.name}
          graphTrendData={mockGraphHeaderData}
          selectedTimeframe={selectedTimeframe}
        />
        {job.isActive ? (
          <TouchableOpacity
            style={styles.headerRowIcon}
            onPress={handleStopIconPress}
          >
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
                {job.startDate} - {job.endDate}
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
            percentChanged={"0.1"}
            yVals={[1, 2, 3, 4]}
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
          />
        )}
      </View>
      {/* Recent Trades */}
      <View style={styles.recentTradesContainer}>
        <Text style={styles.sectionTitleText}>Recent Trades</Text>
        <CustomTable
          data={history}
          loading={isLoading}
          handleLoadMore={fetchTrades}
        />
      </View>
      {/* Snackbar */}
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
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
  },
});
