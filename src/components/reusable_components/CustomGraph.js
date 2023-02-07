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
import { timeframeEnums } from "../../constants/graphEnums";

export default function CustomGraph(props) {
  const { graphData, handleTimeframeChange } = props;
  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );
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
            handleTimeframeChange(timeframeEnums.DAY, setSelectedTimeframe)
          }
        >
          <Button
            style={styles.timeframeButtonInner}
            buttonColor={
              selectedTimeframe === timeframeEnums.DAY
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
            handleTimeframeChange(timeframeEnums.FIVE, setSelectedTimeframe)
          }
        >
          <Button
            style={styles.timeframeButtonInner}
            buttonColor={
              selectedTimeframe === timeframeEnums.FIVE
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
            handleTimeframeChange(timeframeEnums.MONTH, setSelectedTimeframe)
          }
        >
          <Button
            style={styles.timeframeButtonInner}
            buttonColor={
              selectedTimeframe === timeframeEnums.MONTH
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
            handleTimeframeChange(timeframeEnums.YEAR, setSelectedTimeframe)
          }
        >
          <Button
            style={styles.timeframeButtonInner}
            buttonColor={
              selectedTimeframe === timeframeEnums.YEAR
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
