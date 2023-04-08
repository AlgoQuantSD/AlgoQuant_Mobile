import { Ionicons } from "@expo/vector-icons";
import { format } from "d3-format";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Button } from "react-native-paper";
import {
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
  VictoryArea,
  VictoryVoronoiContainer,
} from "victory-native";

import {Defs, LinearGradient, Stop} from "react-native-svg";

import { LINE_GRAPH_THEME, THEME } from "../../constants/Theme";
import { timeframeEnums } from "../../constants/graphEnums";

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

  // Used to 
  const yValsUnique = [...new Set(yVals)];

  // Get the max domain of the graph , will be the max in the list with some padding
  const getMaxDomain = (yVals) => {
    let max = Math.max.apply(Math,yVals)
    return max + (0.001 * max)
  }

  // Get the max domain of the graph
  const getMinDomain = (yVals) => {
    let min = Math.min.apply(Math,yVals)
    return min - (0.001 * min)
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
              minDomain={{y:getMinDomain(yVals)}}
              maxDomain={{y:getMaxDomain(yVals)}}
              onTouchStart={handlePressInGraph}
              onTouchEnd={handlePressOutGraph}
              theme={LINE_GRAPH_THEME}
              animate={yValsUnique.length > 1 ? ({
                onExit: {
                  duration: 500,
                  before: () => ({
                    _y: 0,
                    fill: THEME.colors.primary,
                  }),
                },
              }): undefined}
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
              {/* The graph gradients are defined here, update to change gradient schemes*/}
              <Defs>
                <LinearGradient id="gradientGreen" x1={'0'} y={'0%'} x2={'0'} y2={'100%'}>
                  <Stop offset="0%"  stopColor="#2EB62C"/>
                  <Stop offset="20%" stopColor="#57C84D"/>
                  <Stop offset="40%" stopColor="#83D475"/>
                  <Stop offset="60%" stopColor="#ABE098"/>
                  <Stop offset="80%" stopColor="#C5E8B7"/>
                </LinearGradient>
              </Defs>

              <Defs>
                <LinearGradient id="gradientRed" x1={'0'} y={'0%'} x2={'0'} y2={'100%'}>
                  <Stop offset="0%" stopColor="#DA2C43"/>
                  <Stop offset="20%" stopColor="#E15566"/>
                  <Stop offset="40%" stopColor="#E97E88"/>
                </LinearGradient>
              </Defs>

              <Defs>
                <LinearGradient id="gradientBacktest" x1={'0'} y={'0%'} x2={'0'} y2={'100%'}>
                  <Stop offset="20%" stopColor="#c364fa"/>
                  <Stop offset="40%" stopColor="#a230ed"/>
                  <Stop offset="60%" stopColor="#00FFFFFF"/>
                  <Stop offset="80%" stopColor="#00FFFFFF"/>
                </LinearGradient>
              </Defs>

              <VictoryArea
                animate={yValsUnique.length > 1 ? ({
                  onExit: {
                    duration: 500,
                    before: () => ({
                      _y: 0,
                      fill: THEME.colors.primary,
                    }),
                  },
                }): undefined}
                interpolation="natural"
                data={graphData}
                style={
                  // If the graph is trending downwards show red otherwise show primary color
                  lineColor1
                    ? {
                        data: { fill: 'url(#gradientStroke)'},
                      }
                    : isTrendingUp
                    ? {
                        data: { fill: 'url(#gradientGreen)' },
                      }
                    : {
                        data: { fill: 'url(#gradientRed)' },
                      }
                }
              />
              
              {graphData2 ? (
                <VictoryArea
                  animate={ yValsUnique.length > 1 ?({
                    onExit: {
                      duration: 500,
                      before: () => ({
                        _y: 0,
                        fill: THEME.colors.primary,
                      }),
                    },
                  }): undefined}
                  interpolation="natural"
                  data={graphData2}
                  style={
                    // If the graph is trending downwards show red otherwise show primary color
                    lineColor2
                    ? {
                        data: { fill: 'url(#gradientBacktest)'},
                      }
                    : isTrendingUp
                    ? {
                        data: { fill: 'url(#gradientBacktest)' },
                      }
                    : {
                        data: { fill: 'url(#gradientBacktest)' },
                      }
                  }
                />
              ) : null}

              {/* // X-axis */}
              <VictoryAxis
                dependentAxis={false}
                tickCount={4}
                tickFormat={(x) => determineTimeFrame(x)}
                fixLabelOverlap={true}
              />
              {/* // Y-axis */}
              <VictoryAxis
                dependentAxis={true}
                orientation="left"
                // If the number of unique values is less than 8 use the number of unique valeus
                tickCount={yValsUnique.length < 6 ? (yValsUnique.length): 6}
                fixLabelOverlap={true}
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
    borderColor: THEME.colors.primary,
    borderWidth: 1,
  },
});
