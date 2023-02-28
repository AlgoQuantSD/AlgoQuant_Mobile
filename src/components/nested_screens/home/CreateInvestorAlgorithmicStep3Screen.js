import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import CreateInvestorStockSearch from "../../single_use_components/CreateInvestorStockSearch";
import AlgoquantApiContext from "../../../constants/ApiContext";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorAlgorithmicStep3Screen(props) {
  const { investorObject } = props.route.params;
  console.log("Step 3 ", investorObject);
  const navigation = useNavigation();

  // Manage state of selected stocks
  const [selectedStocks, setSelectedStocks] = useState([]);

  // Check if we should add or remove the stock the user selected based on the state of the selectedStocks list
  function addOrRemoveStock(newStock) {
    // If the stock that the user pressed is already in the list we should remove it otherwise add it
    if (selectedStocks.includes(newStock)) {
      console.log("Remove stock");
      const newStockList = selectedStocks.filter((item) => item !== newStock);
      setSelectedStocks(newStockList);
    } else {
      console.log("Add stock");
      setSelectedStocks((selectedStocks) => [...selectedStocks, newStock]);
    }
  }
  console.log("STOCK LIST: ", selectedStocks);

  // State variable to hold the values of the latest query
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  // Filter results whenever we change the query

  // handle action when user selects a stock from the list of queries
  function onSelectStock(item) {
    console.log(item);
    if (!searchResults.includes("Ticker not found")) {
      navigation.navigate("StockInfoScreen", { stockName: item });
    }
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <CreateInvestorStockSearch
            onSelectStock={onSelectStock}
            isLoading={isLoading}
            searchResults={searchResults}
            getSearchResults={getSearchResults}
            selectedStocks={selectedStocks}
            addOrRemoveStock={addOrRemoveStock}
          />
        </View>

        <Button
          buttonColor={THEME.button.primaryColorBackground}
          textColor={THEME.text.secondaryColor}
          onPress={() =>
            navigation.navigate("CreateInvestorAlgorithmicStep4Screen")
          }
        >
          Next
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  searchContainer: {
    flex: 1,
  },
});
