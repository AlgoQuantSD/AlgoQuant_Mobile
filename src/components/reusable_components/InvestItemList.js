import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { THEME } from "../../constants/Theme";

// Renders the list of investors, jobs, or history
export default function InvestItemList(props) {
  const { listData, isLoading } = props;
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size="large"
            color={THEME.loadingIndicator.color}
          />
        </View>
      ) : (
        <View style={styles.listItems}>
          {listData.map((item) => {
            return (
              <Text key={item.id} style={styles.text}>
                {item.name}
              </Text>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  activityIndicator: {
    paddingTop: "10%",
  },
  listItems: {},
});
