import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { THEME } from "../../constants/Theme";
import { FlashList } from "@shopify/flash-list";
import AlgoquantApiContext from "../../constants/ApiContext";

export default function CustomSearch(props) {
  const { searchType, navigation } = props;

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
        <View>
          <Text style={styles.text2}>
            In order to search stocks here use the stock's ticker
          </Text>
        </View>
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
    fontSize: THEME.text.fontSizeH2,
    color: THEME.text.color,
    padding: 20,
  },
});
