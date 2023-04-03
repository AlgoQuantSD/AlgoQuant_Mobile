import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Searchbar } from "react-native-paper";
import { THEME, customRNPaperTheme } from "../../constants/Theme";
import { FlashList } from "@shopify/flash-list";

export default function CustomSearch(props) {
  const { onSelectStock, isLoading, searchResults, getSearchResults } = props;

  // State variable to hold user search bar input
  const [searchQuery, setSearchQuery] = useState("");

  // Handle the querying of each time a user enters a new letter
  function onChangeSearch(query) {
    setSearchQuery(query);
    getSearchResults(query);
  }

  return (
    <View style={styles.searchbarAndResults}>
      {/* Render the searchbar */}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        loading={isLoading}
        style={styles.searchbar}
        inputStyle={{ color: THEME.text.color.primary }}
        iconColor={THEME.icon.color.primary}
        placeholderTextColor={THEME.text.color.disabled}
        theme={customRNPaperTheme}
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
              onPress={() => onSelectStock(item)}
            >
              <View style={styles.textCell}>
                <Text style={styles.text}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarAndResults: { flex: 1, width: "90%", marginTop: "20%" },
  searchbar: {
    backgroundColor: THEME.searchbar.color.background,
    borderBottomWidth: THEME.searchbar.borderBottomWidth,
    borderBottomColor: THEME.searchbar.color.borderBottom,
  },
  text: { color: THEME.text.color.secondary },
  resultListItem: {
    flexDirection: "row",
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    height: 60,
    alignItems: "center",
    backgroundColor: THEME.searchResults.color.background,
    borderWidth: 0.5,
    borderColor: THEME.searchResults.color.border,
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
