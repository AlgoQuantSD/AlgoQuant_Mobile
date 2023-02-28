import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import HeaderContainer from "../../reusable_components/HeaderContainer";
import CustomTable from "../../reusable_components/CustomTable";
import AlgoquantApiContext from "../../../constants/ApiContext";
import { TRADE_HISTORY_FETCH_AMOUNT } from "../../../constants/ApiConstants";

export default function TradeHistoryScreen() {
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
      <HeaderContainer
        headerText="Trade History"
        bodyText="A detailed view of all transactions made by your jobs."
        size={THEME.flexboxSizes.headerContainerLarge}
      />
      <View style={styles.mainContentContainer}>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  mainContentContainer: {
    flex: 0.75,
    width: "100%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
