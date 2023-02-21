import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GraphDetailsHeader from "../../reusable_components/GraphDetailsHeader";
import CustomGraph from "../../reusable_components/CustomGraph";
import CustomTable from "../../reusable_components/CustomTable";
import AlgoquantApiContext from "../../../constants/ApiContext";
import {
  mockGraphHeaderData,
  mockGraphData1,
  mockGraphData2,
  mockGraphData3,
  mockGraphData4,
} from "../../../constants/MockData";
import { timeframeEnums } from "../../../constants/graphEnums";
import { TRADE_HISTORY_FETCH_AMOUNT } from "../../../constants/ApiConstants";
import { THEME } from "../../../constants/Theme";

export default function JobScreen(props) {
  const { job } = props.route.params;
  const [graphData, setGraphData] = useState(mockGraphData1);
  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );

  function getGraphData(timeframe) {
    console.log("Timeframe: ", timeframe);
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
      {/* Header Row */}
      <View style={styles.headerContainer}>
        <GraphDetailsHeader
          graphTitle={job.name}
          graphTrendData={mockGraphHeaderData}
          selectedTimeframe={selectedTimeframe}
        />
        {job.isActive ? (
          <TouchableOpacity style={styles.headerRowIcon}>
            <Ionicons name="stop" color={THEME.colors.foreground} size={32} />
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
              name="lock-closed"
              color={THEME.colors.foreground}
              size={32}
            />
          </View>
        )}
      </View>
      {/* Graph */}
      <View style={styles.graphContainer}>
        <CustomGraph
          graphData={graphData}
          getGraphData={getGraphData}
          percentChanged={"0.1"}
          yVals={[1, 2, 3, 4]}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
        />
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
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSizeH4,
    color: THEME.text.color,
  },
  headerContainer: {
    flex: 0.2,
    width: "90%",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
    backgroundColor: "red",
  },
  headerText: {
    fontSize: THEME.text.fontSizeH2,
    color: THEME.text.color,
    paddingRight: "2%",
  },
  headerRowIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "auto",
    marginLeft: "auto",
    backgroundColor: "blue",
  },
  graphContainer: {
    flex: 0.5,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "blue",
  },
  recentTradesContainer: {
    flex: 0.3,
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
    backgroundColor: "green",
  },
});
