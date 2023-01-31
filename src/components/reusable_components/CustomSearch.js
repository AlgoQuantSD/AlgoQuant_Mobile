import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { THEME } from "../../constants/Theme";

export default function CustomSearch() {
  const mockData = [
    { name: "Apple", abbreviation: "APPL", price: "$123.90" },
    { name: "Amazon", abbreviation: "AMZN", price: "$112.21" },
    { name: "Google", abbreviation: "GOOGL", price: "$99.21" },
    { name: "Microsoft", abbreviation: "MSFT", price: "$78.21" },
    { name: "Spotify", abbreviation: "SPOT", price: "$90.12" },
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
        return item.name.includes(searchQuery);
      });
      setSearchResults(result);
      setIsLoading(false);
    }, 500);
  }
  console.log("Search results: ", searchResults);

  return (
    <View style={styles.searchbarAndResults}>
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
      <View style={styles.results}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarAndResults: { flex: 1, width: "90%", marginTop: "20%" },
  results: {},
});
