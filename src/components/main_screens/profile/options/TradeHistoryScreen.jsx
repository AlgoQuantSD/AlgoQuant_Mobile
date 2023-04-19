import React, { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TRADE_HISTORY_FETCH_AMOUNT } from "../../../../general_constants/api/apiConstants";
import AlgoquantApiContext from "../../../../general_constants/api/apiContext";
import { THEME } from "../../../../general_constants/theme/Theme";
import CustomTable from "../../../general_use/table/CustomTable";
import { jobHistoryColumns } from "../../../general_use/table/helpers/tableColumns";

export default function TradeHistoryScreen() {
  const [history, setHistory] = useState([]);
  const [lastQuery, setLastQuery] = useState(false);

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [lastKey, setLastKey] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  function onRefresh() {
    fetchTrades();
  }
  const fetchTrades = () => {
    const historyBuffer = [];
    // once its the last query do nothing
    // first query always sends a last key of null
    if (!lastQuery) {
      setIsTableLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(TRADE_HISTORY_FETCH_AMOUNT, null, lastKey)
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
            setIsRefreshing(false);
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            setIsRefreshing(false);
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
      <StatusBar barStyle={"light-content"} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={THEME.colors.primary}
          />
        }
      >
        <View style={{ paddingBottom: "5%" }}>
          <Text
            style={{
              ...styles.text,
              fontSize: THEME.text.fontSize.H2,
              fontWeight: "bold",
              paddingBottom: "2%",
            }}
          >
            Trade History
          </Text>
          <View style={{ maxWidth: "70%" }}>
            <Text style={styles.text}>
              A detailed view of all transactions made by your jobs.
            </Text>
          </View>
        </View>
        <View>
          <CustomTable
            data={history}
            columns={jobHistoryColumns}
            loading={isTableLoading}
            handleLoadMore={fetchTrades}
            height={620}
            nullMessage="No trades currently"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color,
  },
});
