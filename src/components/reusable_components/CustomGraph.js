import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
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
import { Ionicons } from "@expo/vector-icons";

export default function CustomGraph(props) {
  const {
    graphData,
    graphData2,
    lineColor1,
    lineColor2,
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
  const formatter2 = format(".0f");
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
                  labels={({ datum }) => `$${formatter(datum.y)}`}
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
                  lineColor1
                    ? {
                        data: { stroke: lineColor1 },
                      }
                    : isTrendingUp
                    ? {
                        data: { stroke: THEME.colors.trendingUp },
                      }
                    : {
                        data: { stroke: THEME.colors.trendingDown },
                      }
                }
              />
              {graphData2 ? (
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
                  data={graphData2}
                  style={
                    // If the graph is trending downwards show red otherwise show primary color
                    lineColor2
                      ? {
                          data: { stroke: lineColor2 },
                        }
                      : isTrendingUp
                      ? {
                          data: { stroke: THEME.colors.trendingUp },
                        }
                      : {
                          data: { stroke: THEME.colors.trendingDown },
                        }
                  }
                />
              ) : null}

              {/* // X-axis */}
              <VictoryAxis
                dependentAxis={false}
                tickFormat={(x) => determineTimeFrame(x)}
                tickCount={4}
              />
              {/* // Y-axis */}
              <VictoryAxis
                dependentAxis
                tickCount={4}
                tickFormat={(x) => formatter2(x)}
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
                      ? THEME.text.color.secondary
                      : THEME.text.color.primary
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
                      ? THEME.text.color.secondary
                      : THEME.text.color.primary
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
                      ? THEME.text.color.secondary
                      : THEME.text.color.primary
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
                      ? THEME.text.color.secondary
                      : THEME.text.color.primary
                  }
                >
                  Y
                </Button>
              </TouchableOpacity>
            </View>
          ) : null}
          {/* Show legend that explains what each color line is if there are multiple lines */}
          {graphData2 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingBottom: "5%",
              }}
            >
              <View style={{ flexDirection: "row", paddingRight: "5%" }}>
                <Ionicons name="ellipse" size={16} color="red" />
                <Text>Investor Performance</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="ellipse" size={16} color="blue" />
                <Text>Buy/Hold Performance</Text>
              </View>
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
