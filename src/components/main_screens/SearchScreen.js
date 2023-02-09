import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import CustomSearch from "../reusable_components/CustomSearch";
import AlgoquantApiContext from "../../constants/ApiContext";
import StockInfoScreen from "../nested_screens/search/StockInfoScreen";

export default function SearchScreen({ navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  // Filter results whenever we change the query

  function onSelectStock(item) {
    console.log(item);
    !searchResults.includes("Ticker not found")
      ? navigation.navigate("StockInfoScreen", {
          stockName: item,
        })
      : null;
  }

  // Simulates an api call with an artificial loading time
  function getSearchResults(searchQuery) {
    if (algoquantApi.token && searchQuery !== "") {
      setIsLoading(true);
      algoquantApi
        .searchStock(searchQuery)
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
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
