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
          onPress={() => setGraphData(mockData1)}
        >
          <Button
            style={{ width: 50, minWidth: 0 }}
            buttonColor={
              JSON.stringify(graphData) === JSON.stringify(mockData1)
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
          onPress={() => setGraphData(mockData2)}
        >
          <Button
            style={{ width: 50, minWidth: 0 }}
            buttonColor={
              JSON.stringify(graphData) === JSON.stringify(mockData2)
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
          onPress={() => setGraphData(mockData3)}
        >
          <Button
            style={{ width: 50, minWidth: 0 }}
            buttonColor={
              JSON.stringify(graphData) === JSON.stringify(mockData3)
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
