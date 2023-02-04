import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import HeaderContainer from "../../reusable_components/HeaderContainer";
import CustomTable from "../../reusable_components/CustomTable";
import AlgoquantApiContext from "../../../constants/ApiContext";
const FETCH_AMOUNT = 10;

export default function TradeHistoryScreen() {
  const [history, setHistory] = useState([]);
  const [lastPage, setLastPage] = useState(false);

  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const [lastKey, setLastKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchTrades = () => {
    const historyBuffer = [];

    // once its the last query do nothing
    // firt query always sends a last key of null
    if (!lastPage) {
      setIsLoading(true);
      if (algoquantApi.token) {
        algoquantApi
          .getTrades(FETCH_AMOUNT, lastKey)
          .then((resp) => {
            setLastKey(null);
            // last query
            if (resp.data.LastEvaluatedKey === undefined) {
              setLastPage(true);
            }
            if (resp.data.LastEvaluatedKey !== undefined) {
              setLastKey({
                timestamp: resp.data.LastEvaluatedKey.timestamp,
                user_id: resp.data.LastEvaluatedKey.user_id,
              });
            }
            for (let i = 0; i < resp.data.Count; i++) {
              let timestamp = new Date(parseInt(resp.data.Items[i].timestamp));
              let shares = parseFloat(resp.data.Items[i].qty).toFixed(3);
              historyBuffer.push({
                jobName: resp.data.Items[i].job_name,
                buyOrSell: resp.data.Items[i].side === "B" ? "Buy" : "Sell",
                stockTicker: resp.data.Items[i].symbol,
                shares: shares,
                avgPrice: resp.data.Items[i].avg_price,
                date: timestamp.toLocaleString(),
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
