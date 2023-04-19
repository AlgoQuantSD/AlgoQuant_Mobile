import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import Animated, { BounceIn, FadeIn, FadeOut } from "react-native-reanimated";
import AlgoquantApiContext from "../../../../../../constants/ApiContext";
import { THEME } from "../../../../../../constants/Theme";
import { snackbarCleanUp } from "../../../../../../helpers/snackbarCleanup";
import SnackbarContent from "../../../../../general_use/snackbar/SnackbarContent";
import CreateInvestorStockSearch from "./CreateInvestorStockSearch";

export default function CreateInvestorAlgorithmicStep3Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();
  const algoquantApi = useContext(AlgoquantApiContext);

  // Manage state of selected stocks
  const [selectedStocks, setSelectedStocks] = useState([]);

  // State variable to hold the values of the latest query
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  // Check if we should add or remove the stock the user selected based on the state of the selectedStocks list
  function addOrRemoveStock(newStock) {
    // If the stock that the user pressed is already in the list we should remove it otherwise add it
    if (selectedStocks.includes(newStock)) {
      const newStockList = selectedStocks.filter((item) => item !== newStock);
      setSelectedStocks(newStockList);
    } else {
      setSelectedStocks((selectedStocks) => [...selectedStocks, newStock]);
    }
  }

  // handle action when user selects a stock from the list of queries
  function onSelectStock(item) {
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
        });
    }
  }

  // Finalize the assets to track upon pressing next
  function handlePressNext() {
    if (hasErrors()) {
      return;
    }
    investorObject.assets_to_track = selectedStocks;
    navigation.navigate("CreateInvestorAlgorithmicStep4Screen", {
      investorObject: investorObject,
    });
  }

  function hasErrors() {
    if (selectedStocks.length < 1) {
      setSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.danger}
          text="ERROR: Select at least one stock."
          textColor={THEME.colors.danger}
        />
      );
      setIsSnackbarVisible(true);
      return true;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
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
            textColor={THEME.text.color.secondary}
            onPress={handlePressNext}
            style={THEME.button.style}
          >
            Next
          </Button>
        </View>
        {/* Snackbar */}
        <View style={styles.snackbarContainer}>
          <Snackbar
            visible={isSnackbarVisible}
            onDismiss={() =>
              snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage)
            }
            duration={3500}
            action={{
              label: "Dismiss",
              textColor: THEME.snackbar.text.color,
              onPress: () => {
                snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage);
              },
            }}
            style={styles.snackbar}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  headerContainer: {
    paddingBottom: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "bold",
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    fontWeight: "600",
    color: THEME.text.color.primary,
  },
  searchContainer: {
    flex: 0.5,
  },
  selectedStocksContainer: {
    flex: 0.35,
    paddingTop: "5%",
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
    marginTop: "auto",
    alignItems: "flex-end",
  },
  snackbarContainer: {
    flex: 0.05,
  },
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
