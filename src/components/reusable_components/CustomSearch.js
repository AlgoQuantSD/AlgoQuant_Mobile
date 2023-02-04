import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { THEME } from "../../constants/Theme";
import { FlashList } from "@shopify/flash-list";
import AlgoquantApiContext from "../../constants/ApiContext";

export default function CustomSearch(props) {
  const { searchType, navigation } = props;
  console.log("Search type", searchType);
  const mockData = [
    // { name: "Apple", abbreviation: "APPL", price: "$123.90", id: 0 },
    // { name: "Amazon", abbreviation: "AMZN", price: "$112.21", id: 1 },
    // { name: "Google", abbreviation: "GOOGL", price: "$99.21", id: 2 },
    // { name: "Microsoft", abbreviation: "MSFT", price: "$78.21", id: 3 },
    // { name: "Spotify", abbreviation: "SPOT", price: "$90.12", id: 4 },
    "AAPL",
    "GOOG",
    "POOP",
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  // Filter results whenever we change the query
  useEffect(() => {
    queryDatabase();
  }, [searchQuery]);

  function onChangeSearch(query) {
    setSearchQuery(query);
  }

  // Simulates an api call with an artificial loading time
  function queryDatabase() {
    console.log("letter:", searchQuery, ":end");
    if (algoquantApi.token && searchQuery !== "") {
      setIsLoading(true);
      algoquantApi
        .searchStock(searchQuery)
        .then((resp) => {
          setSearchResults(resp.data["stock-tickers"]);
          setIsLoading(false);
          console.log(resp.data["stock-tickers"]);
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
    <View style={styles.searchbarAndResults}>
      {/* Render the searchbar */}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        loading={isLoading}
        style={{
          backgroundColor: THEME.colors.background,
          borderBottomWidth: 1,
          borderBottomColor: THEME.colors.foreground,
        }}
        inputStyle={{ color: THEME.colors.foreground }}
        iconColor={THEME.colors.foreground}
        placeholderTextColor={THEME.text.disabledColor}
        theme={{
          colors: {
            text: THEME.colors.foreground,
            primary: THEME.colors.primary,
            underlineColor: "transparent",
          },
        }}
      />
      {/* Render the list of results after loading is done */}
      {searchResults && !isLoading && searchQuery !== "" ? (
        <FlashList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          viewabilityConfig={{
            waitForInteraction: true,
            itemVisiblePercentThreshold: 100,
            minimumViewTime: 1000,
          }}
          estimatedItemSize={searchResults.length}
          onEndReached={() => console.log("Reached bottom")}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultListItem}
              onPress={() =>
                searchType === "standard" &&
                !searchResults.includes("Ticker not found")
                  ? navigation.navigate("StockInfoScreen", {
                      stockName: item,
                    })
                  : null
              }
            >
              <View style={styles.textCell}>
                <Text style={styles.text}>{item}</Text>
              </View>
              <View style={styles.textCell}>
                <Text style={styles.text}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.text2}>Search stocks here!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarAndResults: { flex: 1, width: "90%", marginTop: "20%" },
  text: { color: "white" },
  resultListItem: {
    flexDirection: "row",
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    height: 60,
    alignItems: "center",
    backgroundColor: THEME.table.rowColor1,
    borderWidth: 0.5,
    borderColor: "white",
  },
  textCell: {
    width: "50%",
  },
  activityIndicator: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text2: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
  },
});
