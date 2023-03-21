import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomTable from "../reusable_components/CustomTable";
import { backtestHistoryColumns } from "../../helpers/tableColumns";
import { THEME } from "../../constants/Theme";
import AlgoquantApiContext from "../../constants/ApiContext";
import { BACKTEST_FETCH_AMOUNT } from "../../constants/ApiConstants";

export default function BacktestingScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [lastKey, setLastKey] = useState(null);
  const [lastQuery, setLastQuery] = useState(false);
  const [history, setHistory] = useState([]);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  const fetchBacktestHistory = () => {
    const historyBuffer = [];

    // once its the last query do nothing
    // first query always sends a last key of null
    if (!lastQuery) {
      setIsTableLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getBacktestList(BACKTEST_FETCH_AMOUNT, lastKey)
          .then((resp) => {
            // Last query set to trie if there is no last evaluated key from response
            if (resp.data.LEK_backtest_id === undefined) {
              setLastQuery(true);
            } else {
              setLastKey(resp.data.LEK_backtest_id);
            }

            // Populate History array with trade history after each call using a buffer
            for (let i = 0; i < resp.data.backtests_count; i++) {
              // FIX THE TIME STAMPS TO BOTH BE IN MILLISECONDS IN BACKEND ******
              let startTimeDate = new Date(
                parseInt(resp.data.backtests[i].start_time) * 1000
              );
              let endTimeDate = new Date(
                parseInt(resp.data.backtests[i].end_time) * 1000
              );
              const options = {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              };
              const formattedStartTime = startTimeDate.toLocaleString(
                [],
                options
              );
              const formattedEndTime = endTimeDate.toLocaleString([], options);

              let initInvestment = parseFloat(
                resp.data.backtests[i].initial_investment
              ).toFixed(3);
              let finalBalance = parseFloat(
                resp.data.backtests[i].final_portfolio_value
              ).toFixed(3);

              historyBuffer.push({
                status: resp.data.backtests[i].status,
                backtestName: resp.data.backtests[i].backtest_name,
                initialInvestment: initInvestment,
                finalBalance: finalBalance,
                startDate: formattedStartTime,
                endDate: formattedEndTime,
                id: resp.data.backtests[i].backtest_id,
              });
            }
            setHistory(history.concat(historyBuffer));
            setIsTableLoading(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log("getBacktestList:" + err);
          });
      }
    }
  };

  // Do this when the user pulls down the screen to refresh
  function onRefresh() {
    setRefreshing(true);
    setHistory([]);
    setLastKey(null);
    setLastQuery(false);
    // Your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  // Open the desired backtest in a new screen and pass its data
  function handleRowPress(backtest) {
    if (backtest.status === "completed") {
      navigation.navigate("BacktestResultsScreen", { backtestId: backtest.id });
    }
  }

  // used to call the initial set of history when page is selected / loaded or refreshed
  useEffect(() => {
    if (history.length === 0) {
      fetchBacktestHistory();
    }
  }, [history]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={THEME.colors.primary}
          />
        }
        style={styles.containerInner}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Backtesting</Text>
          <Text style={styles.text}>
            AlgoQuant allows you to backtest your investors against historical
            data. This allows you to see how your investor would have performed
            in the past.
          </Text>
        </View>
        {/* Table */}
        <View style={styles.historyTableContainer}>
          <Text style={styles.sectionTitleText}>History</Text>
          <CustomTable
            data={history}
            columns={backtestHistoryColumns}
            handleRowPress={handleRowPress}
            isLoading={isTableLoading}
            handleLoadMore={fetchBacktestHistory}
            nullMessage="No backtests have been created yet"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  text: {
    color: THEME.text.color.primary,
    fontSize: THEME.text.fontSize.body,
  },
  containerInner: {
    flexGrow1: 1,
    width: "90%",
    paddingTop: "5%",
  },

  headerContainer: {
    paddingBottom: "15%",
  },
  headerText: {
    color: THEME.text.color.primary,
    fontSize: THEME.text.fontSize.H1,
    paddingBottom: "2%",
  },
  tableContainer: {
    backgroundColor: "blue",
  },
  sectionTitleText: {
    color: THEME.text.color.primary,
    fontSize: THEME.text.fontSize.H3,
  },
});
