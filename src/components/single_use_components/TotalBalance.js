import { React, useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlgoquantApiContext from "../../constants/ApiContext";
import { resetBalanceModalBuilder } from "../../helpers/modalFactory";

export default function TotalBalance(props) {
  function handleResetButtonPress() {
    // The spread operator to add to the prop
    // Add state variable if user is connected to alpaca or not
    resetBalanceModalBuilder({ ...props, alpacaAccount: alpacaConnection });
  }
  // Format the total balance
  const formattingOptions = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  const dollarString = new Intl.NumberFormat("en-US", formattingOptions);

  // Get instance of the algoquant api from parent function
  const algoquantApi = useContext(AlgoquantApiContext);

  // States to keep track of user related information
  // Loading is used to keep track of what will show an activity indicator until the information is fetched and shown on screen instead
  const [balance, setBalance] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [alpacaConnection, setAlpacaConnection] = useState(false);

  // Fetch the user using the user context from aws amplify
  // Set the balance, alpaca connection based on the data recieved
  // Loading is set to false, so the information will be shown on screen
  useEffect(() => {
    if (algoquantApi.token) {
      algoquantApi.getUser().then((resp) => {
        setBalance(resp.data.buying_power);
        setAlpacaConnection(resp.data.alpaca);
        setIsLoading(false);
      });
    }
  }, [algoquantApi]);

  return (
    <View style={styles.totalBalanceContainer}>
      <Text style={styles.text}>
        {/* if the user is conntected to alpaca already it will show whether the buying power is simulated or not */}
        {alpacaConnection
          ? "Alpaca verfied Buying Power"
          : "Simulated Buying Power"}
      </Text>
      <View style={styles.balance}>
        <Text style={styles.balanceText} testID="total-balance">
          {isLoading ? (
            <ActivityIndicator
              size="medium"
              color={THEME.activityIndicator.color.primary}
            />
          ) : (
            dollarString.format(balance)
          )}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          onPress={handleResetButtonPress}
        >
          <Ionicons
            name={THEME.icon.name.refresh}
            size={THEME.icon.size.small}
            color={THEME.icon.color.primary}
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
    fontSize: THEME.text.fontSize.bold,
    color: THEME.text.color.primary,
    fontWeight: "bold",
    paddingRight: "1%",
    paddingLeft: "1%",
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
});
