import React, { useState } from "react";
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
import { backtestData } from "../../constants/MockData";
import { THEME } from "../../constants/Theme";

export default function BacktestingScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  // Do this when the user pulls down the screen to refresh
  function onRefresh() {
    setRefreshing(true);

    // Your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  // Open the desired backtest in a new screen and pass its data
  function handleRowPress(backtest) {
    if (backtest.status === "completed") {
      navigation.navigate("BacktestResultsScreen", { backtest });
    }
  }

  // Put get backtest history API call here
  function fetchBacktestHistory() {
    console.log("Fetching backtest history...");
  }

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
            data={backtestData}
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
