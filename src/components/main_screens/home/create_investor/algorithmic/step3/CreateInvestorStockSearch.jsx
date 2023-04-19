import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {
  THEME,
  customRNPaperTheme,
} from "../../../../../../general_constants/theme/Theme";

export default function CreateInvestorStockSearch(props) {
  const {
    onSelectStock,
    isLoading,
    searchResults,
    getSearchResults,
    selectedStocks,
    addOrRemoveStock,
  } = props;

  // State variable to hold user search bar input
  const [searchQuery, setSearchQuery] = useState("");

  // Handle the querying of each time a user enters a new letter
  function onChangeSearch(query) {
    setSearchQuery(query);
    getSearchResults(query);
  }

  return (
    <View style={styles.SearchBarAndSuggestions}>
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
        <ScrollView>
          {searchResults.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.resultListItem}
              onPress={() => onSelectStock(item)}
            >
              <View>
                <Text style={styles.text}>{item}</Text>
              </View>
              {/* Check if the selected circle should be filled in or not, in the case of Ticker not found we dont want to show a circle at all */}
              {item === "Ticker not found" ? null : selectedStocks.includes(
                  item
                ) ? (
                <TouchableOpacity
                  onPress={() => addOrRemoveStock(item)}
                  hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                >
                  <View style={styles.selectionContainer}>
                    <Text style={styles.selectedText}>Selected</Text>
                    <Ionicons
                      name={THEME.icon.name.selectOptionCircleFilledIn}
                      size={THEME.icon.size.medium}
                      color={THEME.icon.color.ternary}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => addOrRemoveStock(item)}
                  hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                >
                  <Ionicons
                    name={THEME.icon.name.selectOptionCircleOutline}
                    size={THEME.icon.size.medium}
                    color={THEME.icon.color.secondary}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  SearchBarAndSuggestions: { flex: 1 },
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
    justifyContent: "space-between",
    backgroundColor: THEME.searchResults.color.background,
    borderWidth: 0.5,
    borderColor: THEME.searchResults.color.border,
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.ternary,
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  activityIndicator: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
