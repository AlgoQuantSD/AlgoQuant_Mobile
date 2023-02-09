import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { THEME } from "../../constants/Theme";
import { FlashList } from "@shopify/flash-list";
import AlgoquantApiContext from "../../constants/ApiContext";

export default function CustomSearch(props) {
  const {
    navigation,
    redirectPage,
    isLoading,
    searchQuery,
    searchResults,
    onChangeSearch,
  } = props;

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
                !searchResults.includes("Ticker not found")
                  ? navigation.navigate(redirectPage, {
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
        <View></View>
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
