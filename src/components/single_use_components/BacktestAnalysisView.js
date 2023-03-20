import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

export default function BacktestAnalysisView(props) {
  const { backtest } = props;

  // FIX THE TIME STAMPS TO BOTH BE IN MILLISECONDS IN BACKEND ******
  let startTimeDate = new Date(parseInt(backtest?.start_time) * 1000);
  let endTimeDate = new Date(parseInt(backtest?.end_time) * 1000);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formattedStartTime = startTimeDate.toLocaleString([], options);
  const formattedEndTime = endTimeDate.toLocaleString([], options);
  return (
    <View>
      <Text style={styles.sectionTitleText}>Analysis</Text>
      <View>
        <View style={styles.analysisRow}>
          <Text>Backtest name: </Text>
          <Text>{backtest?.backtest_name}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Start date: </Text>
          <Text>{formattedStartTime}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>End date: </Text>
          <Text>{formattedEndTime}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Initial investment: </Text>
          <Text>${backtest?.initial_investment}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Final balance: </Text>
          <Text>${backtest?.final_portfolio_value}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Net earnings: </Text>
          <Text>${backtest?.net_returns}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Number of trades: </Text>
          <Text>{backtest?.num_trades}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Portfolio min value: </Text>
          <Text>${backtest?.portfolio_min_value}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Portfolio max value: </Text>
          <Text>${backtest?.portfolio_max_value}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Average win: </Text>
          <Text>${backtest?.avg_win}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Average loss: </Text>
          <Text>${backtest?.avg_loss}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Average return: </Text>
          <Text>${backtest?.avg_return}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Max drawdown: </Text>
          <Text>${backtest?.max_drawdown}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Portfolio volatility: </Text>
          <Text>{backtest?.portfolio_volatility}</Text>
        </View>
        <View style={styles.analysisRow}>
          <Text>Sharpe ratio: </Text>
          <Text>{backtest?.sharpe_ratio}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  sectionTitleText: {
    color: THEME.text.color.primary,
    fontSize: THEME.text.fontSize.H3,
    paddingBottom: "2%",
  },

  analysisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
});
