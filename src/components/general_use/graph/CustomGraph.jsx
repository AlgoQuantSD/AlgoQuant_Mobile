import { Ionicons } from "@expo/vector-icons";
import { format } from "d3-format";
import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";
import {
  LINE_GRAPH_THEME,
  THEME,
} from "../../../general_constants/theme/Theme";
import CustomFlyout from "./CustomFlyout";
import { TIMEFRAME } from "./enums/graphEnums";

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

  const [dateOrTimeText, setDateOrTimeText] = useState(
    selectedTimeframe === TIMEFRAME.DAY ? "Time" : "Date"
  );

  const formatter = format(".2f");

  // Helper function used to determine what date / time format to show for independent (y) axis
  const determineTimeFrame = (x) => {
    switch (selectedTimeframe) {
      case TIMEFRAME.DAY:
        return new Date(x * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      case TIMEFRAME.FIVE:
        return new Date(x * 1000).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        });
      case TIMEFRAME.MONTH:
        return new Date(x * 1000).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
      case TIMEFRAME.YEAR:
        return new Date(x * 1000).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        });
      default:
        return new Date(x * 1000).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        });
    }
  };

  /*
  This will be called when a point is selected on the graph. This is responsible for setting
  the selectedPoints state variables so they can be displayed at the top of the graph
  */
  const selectPoint = (point) => {
    let points = [];

    // Determine if this is a two line graph
    if (graphData2) {
      // Find the points that correspond to the selected point in each graph data
      let graph2Point = graphData2.filter(function (graphData) {
        return graphData.x == point[0].x;
      });

      let graph1Point = graphData.filter(function (graphData) {
        return graphData.x == point[0].x;
      });

      // Add the formatted points to the list
      points.push({
        x: determineTimeFrame(graph1Point[0].x),
        y: `$${formatter(graph1Point[0].y)}`,
      });
      points.push({
        x: determineTimeFrame(graph2Point[0].x),
        y: `$${formatter(graph2Point[0].y)}`,
      });
    } else {
      // Only a single point so can be added directly to the list
      points.push({
        x: determineTimeFrame(point[0].x),
        y: `$${formatter(point[0].y)}`,
      });
    }
    return points;
  };

  // Set the selected point as the first point in the list initially
  const [selectedPoints, setSelectedPoints] = useState(
    selectPoint([graphData[0]])
  );

  // This is used to conditionally style the text ot be green or red based on the stock trend
  const isTrendingUp = percentChanged >= 0;

  // Update graphdata and change the selected timeframe
  function handleTimeframeChange(timeframe) {
    setSelectedTimeframe(timeframe);
    switch (timeframe) {
      case TIMEFRAME.DAY:
        getGraphData("D");
        break;
      case TIMEFRAME.FIVE:
        getGraphData("5D");
        break;
      case TIMEFRAME.MONTH:
        getGraphData("M");

        break;
      case TIMEFRAME.YEAR:
        getGraphData("Y");
        break;
    }
  }

  const yValsUnique = [...new Set(yVals)];

  /*
  Get the max domain for the area graph. This will need to consider the case where there 
  are two areas and has to fine the max between both
  */
  const getMaxDomain = () => {
    let max = 0;

    // If two graphs need to fine max between both
    if (graphData2) {
      let yVals2 = [];

      // Get the list of y values for the second graph
      graphData.forEach((element) => {
        yVals2.push(element.y);
      });

      let max1 = Math.max.apply(Math, yVals);
      let max2 = Math.max.apply(Math, yVals2);

      if (max1 > max2) {
        max = max1;
      } else {
        max = max2;
      }
    } else {
      max = Math.max.apply(Math, yVals);
    }

    return max + 0.01 * max;
  };

  /*
  Get the max domain for the area graph. This will need to consider the case where there 
  are two areas and has to fine the min between both
  */
  const getMinDomain = () => {
    let min = 0;
    // If two graphs need to fine max between both
    if (graphData2) {
      let yVals2 = [];

      // Get the list of y values for the second graph
      graphData.forEach((element) => {
        yVals2.push(element.y);
      });

      let min1 = Math.min.apply(Math, yVals);
      let min2 = Math.min.apply(Math, yVals2);

      if (min1 < min2) {
        min = min1;
      } else {
        min = min2;
      }
    } else {
      min = Math.min.apply(Math, yVals);
    }
    return min - 0.01 * min;
  };

  return (
    <View>
      <View
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        {
          // Determine how many points have been selected
          selectedPoints?.length > 1 ? (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="time"
                  size={16}
                  color={THEME.icon.color.primary}
                  style={{ paddingBottom: "1%" }}
                />
                <Text style={{ color: THEME.text.color.primary }}>
                  Date: {selectedPoints[0].x}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="wallet"
                  size={16}
                  color={THEME.icon.color.primary}
                  style={{ paddingBottom: "1%" }}
                />
                <Text>Investor: {selectedPoints[0].y}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="wallet"
                  size={16}
                  color={THEME.icon.color.primary}
                />
                <Text>Buy/Hold: {selectedPoints[1].y}</Text>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: "row", paddingTop: "1%" }}>
              <View style={{ flexDirection: "row", paddingRight: "3%" }}>
                <Ionicons
                  name="time"
                  size={16}
                  color={THEME.icon.color.primary}
                  style={{ paddingRight: "1%" }}
                />
                <Text style={{ color: THEME.text.color.primary }}>
                  {selectedPoints[0].x}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="wallet"
                  size={16}
                  color={THEME.icon.color.primary}
                  style={{ paddingRight: "1%" }}
                />
                <Text style={{ color: THEME.text.color.primary }}>
                  {selectedPoints[0].y}
                </Text>
              </View>
            </View>
          )
        }
      </View>

      <TouchableWithoutFeedback
        onPressIn={handlePressInGraph}
        onPressOut={handlePressOutGraph}
      >
        <View>
          <View>
            <VictoryChart
              minDomain={{ y: getMinDomain() }}
              maxDomain={{ y: getMaxDomain() }}
              padding={{ left: 0, right: 0, top: 20, bottom: 20 }}
              theme={LINE_GRAPH_THEME}
              animate={
                yValsUnique.length > 1
                  ? {
                      onExit: {
                        duration: 500,
                        before: () => ({
                          _y: 0,
                          fill: THEME.colors.primary,
                        }),
                      },
                    }
                  : undefined
              }
              containerComponent={
                graphData2 ? (
                  <VictoryVoronoiContainer
                    onActivated={(points, props) => {
                      setSelectedPoints(selectPoint(points));
                    }}
                    onTouchStart={handlePressInGraph}
                    onTouchEnd={handlePressOutGraph}
                    labels={() => " "}
                    labelComponent={
                      <VictoryTooltip
                        dy={-7}
                        constrainToVisibleArea
                        flyoutComponent={
                          <CustomFlyout active={true} shape="line" />
                        }
                      />
                    }
                  />
                ) : (
                  <VictoryVoronoiContainer
                    onActivated={(points, props) => {
                      setSelectedPoints(selectPoint(points));
                    }}
                    onTouchStart={handlePressInGraph}
                    onTouchEnd={handlePressOutGraph}
                    labels={() => " "}
                    labelComponent={
                      <VictoryTooltip
                        dy={-7}
                        constrainToVisibleArea
                        flyoutComponent={
                          <CustomFlyout active={true} shape="circle" />
                        }
                      />
                    }
                  />
                )
              }
            >
              {/* The graph gradients are defined here, update to change gradient schemes*/}
              <Defs>
                <LinearGradient
                  id="gradientGreen"
                  x1={"0"}
                  y={"0%"}
                  x2={"0"}
                  y2={"100%"}
                >
                  <Stop offset="0%" stopColor="#2EB62C" />
                  <Stop offset="20%" stopColor="#57C84D" />
                  <Stop offset="40%" stopColor="#83D475" />
                  <Stop offset="60%" stopColor="#ABE098" />
                  <Stop offset="80%" stopColor="#C5E8B7" />
                </LinearGradient>
              </Defs>

              <Defs>
                <LinearGradient
                  id="gradientRed"
                  x1={"0"}
                  y={"0%"}
                  x2={"0"}
                  y2={"100%"}
                >
                  <Stop offset="0%" stopColor="#DA2C43" />
                  <Stop offset="20%" stopColor="#E15566" />
                  <Stop offset="40%" stopColor="#E97E88" />
                  <Stop offset="60%" stopColor="#F0A8AB" />
                  <Stop offset="80%" stopColor="#F8D1CD" />
                  <Stop offset="100%" stopColor="#FFFAFF" />
                </LinearGradient>
              </Defs>

              <Defs>
                <LinearGradient
                  id="gradientBacktest1"
                  x1={"0"}
                  y={"0%"}
                  x2={"0"}
                  y2={"100%"}
                >
                  <Stop
                    offset="20%"
                    stopColor={THEME.graphGradients.backtest1.start}
                  />
                  <Stop
                    offset="80%"
                    stopColor={THEME.graphGradients.backtest1.finish}
                  />
                </LinearGradient>
              </Defs>

              <Defs>
                <LinearGradient
                  id="gradientBacktest2"
                  x1={"0"}
                  y={"0%"}
                  x2={"0"}
                  y2={"100%"}
                >
                  <Stop
                    offset="40%"
                    stopColor={THEME.graphGradients.backtest2.start}
                  />
                  <Stop
                    offset="80%"
                    stopColor={THEME.graphGradients.backtest2.finish}
                  />
                </LinearGradient>
              </Defs>
              <VictoryArea
                animate={
                  yValsUnique.length > 1
                    ? {
                        onExit: {
                          duration: 500,
                          before: () => ({
                            _y: 0,
                            fill: THEME.colors.primary,
                          }),
                        },
                      }
                    : undefined
                }
                interpolation="natural"
                data={graphData}
                style={
                  // If the graph is trending downwards show red otherwise show primary color
                  lineColor1
                    ? {
                        data: {
                          fill: "url(#gradientBacktest1)",
                          fillOpacity: 0.6,
                          stroke: "#1F302B",
                        },
                      }
                    : isTrendingUp
                    ? {
                        data: {
                          fill: "url(#gradientGreen)",
                          stroke: "#2EB62C",
                          strokeWidth: 2,
                        },
                      }
                    : {
                        data: {
                          fill: "url(#gradientRed)",
                          stroke: "#DA2C43",
                          strokeWidth: 2,
                        },
                      }
                }
              />

              {graphData2 ? (
                <VictoryArea
                  animate={
                    yValsUnique.length > 1
                      ? {
                          onExit: {
                            duration: 500,
                            before: () => ({
                              _y: 0,
                              fill: THEME.colors.primary,
                            }),
                          },
                        }
                      : undefined
                  }
                  interpolation="natural"
                  data={graphData2}
                  style={
                    // If the graph is trending downwards show red otherwise show primary color
                    lineColor2
                      ? {
                          data: {
                            fill: "url(#gradientBacktest2)",
                            fillOpacity: 0.6,
                            stroke: "#360947",
                          },
                        }
                      : isTrendingUp
                      ? {
                          data: { fill: "url(#gradientBacktest)" },
                        }
                      : {
                          data: { fill: "url(#gradientBacktest)" },
                        }
                  }
                />
              ) : null}

              {/* // X-axis */}
              <VictoryAxis
                dependentAxis={false}
                tickCount={3}
                style={{
                  ticks: { stroke: "transparent" },
                  tickLabels: { fill: "transparent" },
                }}
                tickFormat={(x) => determineTimeFrame(x)}
                fixLabelOverlap={true}
              />
            </VictoryChart>
          </View>

          {/* Buttons that control what data gets displayed in the graph */}
          {timeframeEnabled ? (
            <View style={styles.timeframeButtonOuterButtonRow}>
              <TouchableOpacity
                style={styles.timeframeButtonOuter}
                onPress={() => handleTimeframeChange(TIMEFRAME.DAY)}
              >
                <Button
                  style={styles.timeframeButtonInner}
                  buttonColor={
                    selectedTimeframe === TIMEFRAME.DAY
                      ? THEME.colors.primary
                      : THEME.colors.transparent
                  }
                  textColor={
                    selectedTimeframe === TIMEFRAME.DAY
                      ? THEME.text.color.secondary
                      : THEME.text.color.primary
                  }
                >
                  D
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeframeButtonOuter}
                onPress={() => handleTimeframeChange(TIMEFRAME.FIVE)}
              >
                <Button
                  style={styles.timeframeButtonInner}
                  buttonColor={
                    selectedTimeframe === TIMEFRAME.FIVE
                      ? THEME.colors.primary
                      : THEME.colors.transparent
                  }
                  textColor={
                    selectedTimeframe === TIMEFRAME.FIVE
                      ? THEME.text.color.secondary
                      : THEME.text.color.primary
                  }
                >
                  5D
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeframeButtonOuter}
                onPress={() => handleTimeframeChange(TIMEFRAME.MONTH)}
              >
                <Button
                  style={styles.timeframeButtonInner}
                  buttonColor={
                    selectedTimeframe === TIMEFRAME.MONTH
                      ? THEME.colors.primary
                      : THEME.colors.transparent
                  }
                  textColor={
                    selectedTimeframe === TIMEFRAME.MONTH
                      ? THEME.text.color.secondary
                      : THEME.text.color.primary
                  }
                >
                  M
                </Button>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timeframeButtonOuter}
                onPress={() => handleTimeframeChange(TIMEFRAME.YEAR)}
              >
                <Button
                  style={styles.timeframeButtonInner}
                  buttonColor={
                    selectedTimeframe === TIMEFRAME.YEAR
                      ? THEME.colors.primary
                      : THEME.colors.transparent
                  }
                  textColor={
                    selectedTimeframe === TIMEFRAME.YEAR
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
                <Ionicons
                  name="ellipse"
                  size={16}
                  color={THEME.graphGradients.backtest1.finish}
                />
                <Text>Investor Performance</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="ellipse"
                  size={16}
                  color={THEME.graphGradients.backtest2.finish}
                />
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
    borderColor: THEME.colors.primary,
    borderWidth: 1,
  },
});
