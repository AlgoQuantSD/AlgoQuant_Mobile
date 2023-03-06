import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import CustomSearch from "../reusable_components/CustomSearch";
import AlgoquantApiContext from "../../constants/ApiContext";

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
          console.log(err);
        });
    }
  }

  return (
    <View style={styles.container}>
      <CustomSearch
        onSelectStock={onSelectStock}
        isLoading={isLoading}
        searchResults={searchResults}
        getSearchResults={getSearchResults}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  searchbarAndResults: {
    flex: 1,
    width: "80%",
    marginTop: "30%",
  },
});
