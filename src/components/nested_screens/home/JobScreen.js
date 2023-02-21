import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GraphDetailsHeader from "../../reusable_components/GraphDetailsHeader";
import CustomGraph from "../../reusable_components/CustomGraph";
import {
  mockGraphHeaderData,
  mockGraphData1,
  mockGraphData2,
  mockGraphData3,
  mockGraphData4,
} from "../../../constants/MockData";
import { timeframeEnums } from "../../../constants/graphEnums";
import { THEME } from "../../../constants/Theme";

export default function JobScreen(props) {
  const { job } = props.route.params;
  const [graphData, setGraphData] = useState(mockGraphData1);
  const [selectedTimeframe, setSelectedTimeframe] = useState(
    timeframeEnums.DAY
  );

  function getGraphData(timeframe) {
    console.log("Timeframe: ", timeframe);
    switch (timeframe) {
      case timeframeEnums.DAY:
        setGraphData(mockGraphData1);
        break;
      case timeframeEnums.FIVE:
        setGraphData(mockGraphData2);
        break;
      case timeframeEnums.MONTH:
        setGraphData(mockGraphData3);
        break;
      case timeframeEnums.YEAR:
        setGraphData(mockGraphData4);
        break;
    }
  }
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerContainer}>
        <GraphDetailsHeader
          graphTitle={job.name}
          graphTrendData={mockGraphHeaderData}
          selectedTimeframe={selectedTimeframe}
        />
        <TouchableOpacity style={styles.headerRowIcon}>
          <Ionicons name="stop" color={THEME.colors.foreground} size={32} />
        </TouchableOpacity>
      </View>
      <View style={styles.graphContainer}>
        <CustomGraph
          graphData={graphData}
          getGraphData={getGraphData}
          percentChanged={"0.1"}
          yVals={[1, 2, 3, 4]}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
        />
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  headerContainer: {
    flex: 0.2,
    width: "90%",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
    backgroundColor: "red",
  },
  headerText: {
    fontSize: THEME.text.fontSizeH2,
    color: THEME.text.color,
    paddingRight: "2%",
  },
  headerRowIcon: {
    marginBottom: "auto",
    marginLeft: "auto",
    backgroundColor: "blue",
  },
  graphContainer: {
    flex: 0.4,
    width: "90%",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
    backgroundColor: "blue",
  },
});
