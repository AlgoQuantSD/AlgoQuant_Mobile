import React from "react";
import { View, Text } from "react-native";
import { THEME } from "../../constants/Theme";

// Renders the listview of either the indicators or stocks
export default function IndicatorsOrStocksListView(props) {
  const { data } = props;
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {data.map((chunk, i) => (
        <View
          key={i}
          style={{
            marginRight: "10%",
          }}
        >
          {chunk.map((item) => (
            <Text key={item} style={{ color: THEME.text.color.primary }}>
              {item}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
