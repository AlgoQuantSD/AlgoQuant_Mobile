import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { THEME } from "../../constants/Theme";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text } from "react-native";

export default function CustomTable(props) {
  // table headers
  const columns = [
    { label: "Job Name", id: "jobName" },
    { label: "Buy or Sell", id: "buyOrSell" },
    { label: "Stock Ticker", id: "stockTicker" },
    { label: "Shares", id: "shares" },
    { label: "Amount", id: "avgPrice" },
    { label: "Date", id: "date" },
  ];

  return (
    <View style={{ height: "100%" }}>
      <ScrollView horizontal={true}>
        <DataTable>
          <DataTable.Header>
            {columns.map((column) => (
              <DataTable.Title
                key={column.id}
                style={styles.column}
                textStyle={{ color: "white" }}
              >
                {column.label}
              </DataTable.Title>
            ))}
          </DataTable.Header>
          {/* flashlist cant take a empty dataset, so if there is no trades then show 
          text, once there is data available it will show the list */}
          {props.data.length === 0 ? (
            <Text style={styles.text}>No trades currently</Text>
          ) : (
            <FlashList
              data={props.data}
              keyExtractor={(item, index) => index.toString()}
              viewabilityConfig={{
                waitForInteraction: true,
                itemVisiblePercentThreshold: 100,
                minimumViewTime: 1000,
              }}
              estimatedItemSize={props.data.length}
              onEndReached={props.handleLoadMore}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => (
                <DataTable.Row
                  key={index}
                  style={index % 2 === 0 ? styles.row : null}
                >
                  {columns.map((column) => (
                    <DataTable.Cell
                      key={column.id}
                      style={styles.cell}
                      textStyle={{ color: "white" }}
                    >
                      {item[column.id]}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              )}
              ListFooterComponent={
                props.loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#3F9F30"
                    style={styles.activity}
                  />
                ) : null
              }
            />
          )}
        </DataTable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: THEME.text.color,
  },
  row: {
    backgroundColor: THEME.table.rowColor1,
    alignItems: "flex-start",
  },
  column: {
    width: 125,
  },
  cell: {
    width: 80,
  },
  activity: {
    paddingTop: "5%",
    paddingRight: "40%",
  },
});
