import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory-native";
import { Button } from "react-native-paper";
import { THEME, LINE_GRAPH_THEME } from "../../constants/Theme";

export default function CustomGraph(props) {
  const {
    graphData,
    setGraphData,
    selectedTimeframe,
    setSelectedTimeframe,
    handleTimeframeChange,
  } = props;

  return (
    <View>
      <VictoryChart
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
            labels={({ datum }) => `${Math.round(datum.y, 2)}`}
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
          style={{
            data: { stroke: THEME.colors.primary },
          }}
        />
      </VictoryChart>

      {/* Buttons that control what data gets displayed in the graph */}
      <View style={styles.timeframeButtonOuterButtonRow}>
        <TouchableOpacity
          style={styles.timeframeButtonOuter}
          onPress={() =>
            handleTimeframeChange(1, setGraphData, setSelectedTimeframe)
          }
        >
          <Button
            style={styles.timeframeButtonInner}
            buttonColor={
              selectedTimeframe === 1
                ? THEME.colors.primary
                : THEME.colors.transparent
            }
            textColor={THEME.text.color}
          >
            D
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeframeButtonOuter}
          onPress={() =>
            handleTimeframeChange(2, setGraphData, setSelectedTimeframe)
          }
        >
          <Button
            style={styles.timeframeButtonInner}
            buttonColor={
              selectedTimeframe === 2
                ? THEME.colors.primary
                : THEME.colors.transparent
            }
            textColor={THEME.text.color}
          >
            5D
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeframeButtonOuter}
          onPress={() =>
            handleTimeframeChange(3, setGraphData, setSelectedTimeframe)
          }
        >
          <Button
            style={styles.timeframeButtonInner}
            buttonColor={
              selectedTimeframe === 3
                ? THEME.colors.primary
                : THEME.colors.transparent
            }
            textColor={THEME.text.color}
          >
            M
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeframeButtonOuter}
          onPress={() =>
            handleTimeframeChange(4, setGraphData, setSelectedTimeframe)
          }
        >
          <Button
            style={styles.timeframeButtonInner}
            buttonColor={
              selectedTimeframe === 4
                ? THEME.colors.primary
                : THEME.colors.transparent
            }
            textColor={THEME.text.color}
          >
            Y
          </Button>
        </TouchableOpacity>
      </View>
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
