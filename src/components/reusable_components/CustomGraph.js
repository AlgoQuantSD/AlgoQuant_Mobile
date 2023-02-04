import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { VictoryChart, VictoryLine } from "victory-native";
import { Button } from "react-native-paper";

import { THEME, LINE_GRAPH_THEME } from "../../constants/Theme";

export default function CustomGraph() {
  // Filler data until we connect to the backend
  const mockData1 = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
  ];
  const mockData2 = [
    { x: 2, y: 6 },
    { x: 3, y: 2 },
    { x: 4, y: 9 },
    { x: 6, y: 2 },
    { x: 8, y: 1 },
  ];

  const mockData3 = [
    { x: 0, y: 6 },
    { x: 5, y: 10 },
    { x: 6, y: 7 },
    { x: 7, y: 9 },
    { x: 8, y: 12 },
  ];

  const [graphData, setGraphData] = useState(mockData1);
  const [selectedTimeframe, setSelectedTimeframe] = useState(1);

  // Update graphdata and change the selected timeframe
  function handleTimeframeChange(timeframe) {
    setSelectedTimeframe(timeframe);
    switch (timeframe) {
      case 1:
        setGraphData(mockData1);
        break;
      case 2:
        setGraphData(mockData2);
        break;
      case 3:
        setGraphData(mockData3);
        break;
    }
  }

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
      <View style={styles.graphDataChangeButtonRow}>
        <TouchableOpacity
          style={styles.graphDataChangeButton}
          onPress={() => handleTimeframeChange(1)}
        >
          <Button
            style={{ width: 50, minWidth: 0 }}
            buttonColor={
              selectedTimeframe === 1
                ? THEME.colors.primary
                : THEME.colors.transparent
            }
            textColor={THEME.text.color}
          >
            1
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.graphDataChangeButton}
          onPress={() => handleTimeframeChange(2)}
        >
          <Button
            style={{ width: 50, minWidth: 0 }}
            buttonColor={
              selectedTimeframe === 2
                ? THEME.colors.primary
                : THEME.colors.transparent
            }
            textColor={THEME.text.color}
          >
            2
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.graphDataChangeButton}
          onPress={() => handleTimeframeChange(3)}
        >
          <Button
            style={{ width: 50, minWidth: 0 }}
            buttonColor={
              selectedTimeframe === 3
                ? THEME.colors.primary
                : THEME.colors.transparent
            }
            textColor={THEME.text.color}
          >
            3
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphDataChangeButtonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  graphDataChangeButton: {
    paddingLeft: "2%",
    paddingRight: "2%",
  },
});
