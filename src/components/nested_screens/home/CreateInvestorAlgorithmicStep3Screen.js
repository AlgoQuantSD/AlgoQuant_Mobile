import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Animated, { BounceIn, FadeIn, FadeOut } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CreateInvestorStockSearch from "../../single_use_components/CreateInvestorStockSearch";
import AlgoquantApiContext from "../../../constants/ApiContext";
import { THEME } from "../../../constants/Theme";
import { ScrollView } from "react-native-gesture-handler";

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

  // Finalize the assets to track upon pressing next
  function handlePressNext() {
    investorObject.assets_to_track = selectedStocks;
    navigation.navigate("CreateInvestorAlgorithmicStep4Screen", {
      investorObject: investorObject,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Select Your Stocks</Text>
        </View>
        {/* Searchbar */}
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
        {/* Selected Stocks */}
        <View style={styles.selectedStocksContainer}>
          <Text style={styles.sectionTitleText}>Selected Stocks</Text>
          {selectedStocks.length === 0 ? (
            <Animated.Text entering={FadeIn.delay(500)} style={styles.text}>
              Add some stocks by using the search bar above
            </Animated.Text>
          ) : null}
          <ScrollView>
            {selectedStocks.map((item) => (
              <TouchableWithoutFeedback key={item}>
                <Animated.View
                  entering={FadeIn.delay(500)}
                  exiting={FadeOut}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    borderBottomWidth: 1,
                    borderColor: "black",
                  }}
                >
                  <Animated.Text entering={BounceIn.delay(1000)}>
                    {item}
                  </Animated.Text>
                  <TouchableOpacity onPress={() => addOrRemoveStock(item)}>
                    <Ionicons
                      name={THEME.icon.name.deleteInvestor}
                      color={THEME.icon.color.primary}
                      size={THEME.icon.size.medium}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View>
        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
          <Button
            buttonColor={THEME.button.primaryColorBackground}
            textColor={THEME.text.secondaryColor}
            onPress={handlePressNext}
          >
            Next
          </Button>
        </View>
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
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
  },
  searchContainer: {
    flex: 0.5,
    marginTop: "5%",
  },
  selectedStocksContainer: {
    flex: 0.35,
    marginTop: "5%",
  },
  selectedStockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderBottomWidth: 1,
    borderColor: THEME.colors.foreground,
  },
  nextButtonContainer: {
    justifyContent: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
    alignItems: "flex-end",
  },
});