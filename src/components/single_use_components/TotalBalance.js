import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formattedBalance } from "../../helpers/formatUserBalance";
import { resetBalanceModalBuilder } from "../../helpers/modalFactory";

export default function TotalBalance(props) {
  function handleResetButtonPress() {
    resetBalanceModalBuilder(props);
  }

  return (
    <View style={styles.totalBalanceContainer}>
      <Text style={styles.text}>Total Balance</Text>
      <View style={styles.balance}>
        <Text style={styles.balanceText} testID="total-balance">
          {formattedBalance}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          onPress={handleResetButtonPress}
        >
          <Ionicons
            name="refresh"
            size={THEME.text.fontSizeBold}
            color={THEME.colors.foreground}
            testID="reset-icon"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  totalBalanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.15,
    width: "100%",
  },
  balance: {
    flexDirection: "row",
    paddingTop: "1%",
  },
  balanceText: {
    fontSize: THEME.text.fontSizeBold,
    color: THEME.text.color,
    fontWeight: "bold",
    paddingRight: "1%",
    paddingLeft: "1%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
