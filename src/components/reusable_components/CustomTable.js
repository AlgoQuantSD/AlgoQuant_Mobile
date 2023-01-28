import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { THEME } from "../../constants/Theme";

export default function CustomTable() {
  return (
    <View>
      <DataTable>
        <DataTable.Header style={{ backgroundColor: "black" }}>
          <DataTable.Title textStyle={styles.text}>Dessert</DataTable.Title>
          <DataTable.Title textStyle={styles.text} numeric>
            Calories
          </DataTable.Title>
          <DataTable.Title textStyle={styles.text} numeric>
            Fat
          </DataTable.Title>
        </DataTable.Header>

        <DataTable.Row style={{ backgroundColor: THEME.table.rowColor1 }}>
          <DataTable.Cell textStyle={styles.text}>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell textStyle={styles.text} numeric>
            159
          </DataTable.Cell>
          <DataTable.Cell textStyle={styles.text} numeric>
            6.0
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell textStyle={styles.text}>
            Ice cream sandwich
          </DataTable.Cell>
          <DataTable.Cell textStyle={styles.text} numeric>
            237
          </DataTable.Cell>
          <DataTable.Cell textStyle={styles.text} numeric>
            8.0
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: THEME.text.color,
  },
});
