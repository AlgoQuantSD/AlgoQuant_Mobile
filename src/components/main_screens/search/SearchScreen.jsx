import React, { useContext, useState } from "react";
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AlgoquantApiContext from "../../../general_constants/api/apiContext";
import { THEME } from "../../../general_constants/theme/Theme";
import SearchBarAndSuggestions from "./searchbar/SearchBarAndSuggestions";

export default function SearchScreen({ navigation }) {
  // State variable to hold the values of the latest query
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  // Filter results whenever we change the query

  // handle action when user selects a stock from the list of queries
  function onSelectStock(item) {
    !searchResults.includes("Ticker not found")
      ? navigation.navigate("StockInfoScreen", {
          stockName: item,
        })
      : null;
  }

  // Api call to search-stock endpoint and responds with an array of tickers based on the query
  function getSearchResults(searchQuery) {
    if (algoquantApi.token && searchQuery !== "") {
      setIsLoading(true);
      algoquantApi
        .searchStock(searchQuery.toUpperCase())
        .then((resp) => {
          setSearchResults(resp.data["stock-tickers"]);
          setIsLoading(false);
          if (resp.data["stock-tickers"].length === 0) {
            setSearchResults(["Ticker not found"]);
          }
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
        });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <SearchBarAndSuggestions
          onSelectStock={onSelectStock}
          isLoading={isLoading}
          searchResults={searchResults}
          getSearchResults={getSearchResults}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  SearchBarAndSuggestions: {
    flex: 1,
    width: "80%",
    marginTop: "30%",
  },
});
