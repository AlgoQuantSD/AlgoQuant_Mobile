import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { THEME } from "../../constants/Theme";
import { FlashList } from "@shopify/flash-list";

export default function CustomSearch({ navigation }) {
  const mockData = [
    { name: "Apple", abbreviation: "APPL", price: "$123.90", id: 0 },
    { name: "Amazon", abbreviation: "AMZN", price: "$112.21", id: 1 },
    { name: "Google", abbreviation: "GOOGL", price: "$99.21", id: 2 },
    { name: "Microsoft", abbreviation: "MSFT", price: "$78.21", id: 3 },
    { name: "Spotify", abbreviation: "SPOT", price: "$90.12", id: 4 },
  ];
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter results whenever we change the query
  useEffect(() => {
    queryDatabase();
  }, [searchQuery]);

  function onChangeSearch(query) {
    setSearchQuery(query);
  }

  // Simulates an api call with an artificial loading time
  function queryDatabase() {
    setIsLoading(true);
    console.log("Search query: ", searchQuery);
    setTimeout(() => {
      let result = mockData.filter((item) => {
        if (searchQuery?.length > 0) {
          return item.name.includes(searchQuery);
        } else {
          return null;
        }
      });
      setSearchResults(result);
      setIsLoading(false);
    }, 500);
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
      {searchResults && !isLoading ? (
        <FlashList
          data={searchResults}
          keyExtractor={(item) => {
            return item.id;
          }}
          viewabilityConfig={{
            waitForInteraction: true,
            itemVisiblePercentThreshold: 100,
            minimumViewTime: 1000,
          }}
          estimatedItemSize={mockData.length}
          onEndReached={() => console.log("Reached bottom")}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultListItem}
              onPress={() =>
                navigation.navigate("StockInfoScreen", { stockName: item.name })
              }
            >
              <View style={styles.textCell}>
                <Text style={styles.text}>{item.abbreviation}</Text>
              </View>
              <View style={styles.textCell}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={THEME.colors.primary} />
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
});
