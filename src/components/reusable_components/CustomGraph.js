import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryAxis,
} from "victory-native";
import { Button } from "react-native-paper";
import { THEME, LINE_GRAPH_THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";
import { format } from "d3-format";

export default function CustomGraph(props) {
  const {
    graphData,
    getGraphData,
    percentChanged,
    selectedTimeframe,
    setSelectedTimeframe,
    yVals,
    handlePressInGraph,
    handlePressOutGraph,
    timeframeEnabled,
  } = props;

  const formatter = format(".2f");
  // This is used to conditionally style the text ot be green or red based on the stock trend
  const isTrendingUp = percentChanged >= 0;

  // Update graphdata and change the selected timeframe
  function handleTimeframeChange(timeframe) {
    setSelectedTimeframe(timeframe);
    switch (timeframe) {
      case timeframeEnums.DAY:
        getGraphData("D");
        break;
      case timeframeEnums.FIVE:
        getGraphData("5D");
        break;
      case timeframeEnums.MONTH:
        getGraphData("M");
        break;
      case timeframeEnums.YEAR:
        getGraphData("Y");
        break;
    }
  }

  // Helper function used to determine what date / time format to show for independent (y) axis
  const determineTimeFrame = (x) => {
    switch (selectedTimeframe) {
      case timeframeEnums.DAY:
        return new Date(x * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      case timeframeEnums.FIVE:
        return new Date(x * 1000).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        });
      case timeframeEnums.MONTH:
        return new Date(x * 1000).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        });
      case timeframeEnums.YEAR:
        return new Date(x * 1000).toLocaleDateString("en-US", {
          month: "numeric",
          year: "numeric",
        });
      default:
        return new Date(x * 1000).toLocaleDateString("en-US", {
          month: "numeric",
          year: "numeric",
        });
    }
  };

  function integerTickFormat(value) {
    return Math.round(value).toString();
  }

  return (
    <View>
      <TouchableWithoutFeedback
        onPressIn={handlePressInGraph}
        onPressOut={handlePressOutGraph}
      >
        <View>
          <View>
            <VictoryChart
              onTouchStart={handlePressInGraph}
              onTouchEnd={handlePressOutGraph}
              theme={LINE_GRAPH_THEME}
              animate={{
                onExit: {
                  duration: 500,
                  before: () => ({
                    _y: 0,
                    fill: THEME.colors.primary,
                  }),
                },
              }}
              containerComponent={
                <VictoryVoronoiContainer
                  onTouchStart={handlePressInGraph}
                  onTouchEnd={handlePressOutGraph}
                  labels={({ datum }) => `${formatter(datum.y)}`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        fill: THEME.colors.background,
                      }}
                      style={{ fill: THEME.colors.foreground }}
                    />
                  }
                />
              }
            >
              <VictoryLine
                animate={{
                  onExit: {
                    duration: 500,
                    before: () => ({
                      _y: 0,
                      fill: THEME.colors.primary,
                    }),
                  },
                }}
                interpolation="natural"
                data={graphData}
                style={
                  // If the graph is trending downwards show red otherwise show primary color
                  isTrendingUp
                    ? {
                        data: { stroke: THEME.colors.trendingUp },
                      }
                    : {
                        data: { stroke: THEME.colors.trendingDown },
                      }
                }
              />
              {/* // X-axis */}
              <VictoryAxis
                dependentAxis
                tickValues={yVals}
                tickFormat={(t) => `${Math.round(t)}`}
                tickCount={4}
              />
              {/* // Y-axis */}
              <VictoryAxis
                dependentAxis={false}
                tickFormat={(x) => determineTimeFrame(x)}
                tickCount={4}
              />
            </VictoryChart>
          </View>

          {/* Buttons that control what data gets displayed in the graph */}
          {timeframeEnabled ? (
            <View style={styles.timeframeButtonOuterButtonRow}>
              <TouchableOpacity
                style={styles.timeframeButtonOuter}
                onPress={() => handleTimeframeChange(timeframeEnums.DAY)}
              >
                <Button
                  style={styles.timeframeButtonInner}
                  buttonColor={
                    selectedTimeframe === timeframeEnums.DAY
                      ? THEME.colors.primary
                      : THEME.colors.transparent
                  }
                  textColor={
                    selectedTimeframe === timeframeEnums.DAY
                      ? THEME.text.secondaryColor
                      : THEME.text.primaryColor
                  }
                >
                  D
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeframeButtonOuter}
                onPress={() => handleTimeframeChange(timeframeEnums.FIVE)}
              >
                <Button
                  style={styles.timeframeButtonInner}
                  buttonColor={
                    selectedTimeframe === timeframeEnums.FIVE
                      ? THEME.colors.primary
                      : THEME.colors.transparent
                  }
                  textColor={
                    selectedTimeframe === timeframeEnums.FIVE
                      ? THEME.text.secondaryColor
                      : THEME.text.primaryColor
                  }
                >
                  5D
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeframeButtonOuter}
                onPress={() => handleTimeframeChange(timeframeEnums.MONTH)}
              >
                <Button
                  style={styles.timeframeButtonInner}
                  buttonColor={
                    selectedTimeframe === timeframeEnums.MONTH
                      ? THEME.colors.primary
                      : THEME.colors.transparent
                  }
                  textColor={
                    selectedTimeframe === timeframeEnums.MONTH
                      ? THEME.text.secondaryColor
                      : THEME.text.primaryColor
                  }
                >
                  M
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeframeButtonOuter}
                onPress={() => handleTimeframeChange(timeframeEnums.YEAR)}
              >
                <Button
                  style={styles.timeframeButtonInner}
                  buttonColor={
                    selectedTimeframe === timeframeEnums.YEAR
                      ? THEME.colors.primary
                      : THEME.colors.transparent
                  }
                  textColor={
                    selectedTimeframe === timeframeEnums.YEAR
                      ? THEME.text.secondaryColor
                      : THEME.text.primaryColor
                  }
                >
                  Y
                </Button>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  timeframeButtonOuterButtonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  timeframeButtonOuter: {
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  timeframeButtonInner: {
    width: 50,
    minWidth: 0,
  },
});
