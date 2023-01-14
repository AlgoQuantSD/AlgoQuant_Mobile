import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MOCK_USER } from "../../constants/MockUser";

export default function TotalBalance({ navigation }) {
  // Format the total balance into a string
  const formattingOptions = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  const dollarString = new Intl.NumberFormat("en-US", formattingOptions);
  const formattedBalance = dollarString.format(MOCK_USER.data.totalBalance);
  return (
    <View style={styles.totalBalanceContainer}>
      <Text style={styles.text}>Total Balance</Text>
      <View style={styles.balance}>
        <Text style={styles.balanceText} testID="total-balance">
          {formattedBalance}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
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
