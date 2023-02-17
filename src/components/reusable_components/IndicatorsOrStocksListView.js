import React from "react";
import { View, Text } from "react-native";

// Renders the listview of either the indicators or stocks
export default function IndicatorsOrStocksListView(props) {
  const { data } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "purple",
      }}
    >
      {data.map((chunk, i) => (
        <View
          key={i}
          style={{
            marginRight: "10%",
            backgroundColor: "blue",
          }}
        >
          {chunk.map((item) => (
            <Text key={item.id} style={{ color: "white" }}>
              {item.name}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
