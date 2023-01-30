import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { THEME } from "../../constants/Theme";
import { FlashList } from "@shopify/flash-list";

export default function CustomTable() {
  const data = [
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 1,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 2,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 3,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 4,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 5,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 6,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 7,
    },
    {
      JOB_NAME: "Johnny",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 8,
    },
    {
      JOB_NAME: "Johnson",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 9,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 10,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 11,
    },
    {
      JOB_NAME: "John",
      SHARES: 20,
      COMPANY: "AMZN",
      TYPE: "Buy",
      AMOUNT: "$134.21",
      DATE: "01/28/2023",
      ID: 12,
    },
  ];

  const columns = [
    { label: "Job Name", id: "JOB_NAME" },
    { label: "Shares", id: "SHARES" },
    { label: "Company", id: "COMPANY" },
    { label: "Type", id: "TYPE" },
    { label: "Amount", id: "AMOUNT" },
    { label: "Date", id: "DATE" },
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
          <FlashList
            data={data}
            keyExtractor={(item) => {
              return item.ID;
            }}
            viewabilityConfig={{
              waitForInteraction: true,
              itemVisiblePercentThreshold: 100,
              minimumViewTime: 1000,
            }}
            estimatedItemSize={data.length}
            onEndReached={() => console.log("Reached bottom")}
            renderItem={({ item, index }) => (
              <DataTable.Row
                key={item.ID}
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
          />
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
    width: 80,
  },
  cell: {
    width: 80,
  },
});
