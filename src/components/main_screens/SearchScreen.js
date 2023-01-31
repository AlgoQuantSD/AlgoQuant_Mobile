import React from "react";
import { View, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import { Searchbar } from "react-native-paper";
import CustomSearch from "../reusable_components/CustomSearch";

export default function SearchScreen({ navigation }) {
  function onChangeSearch() {
    console.log("New text");
  }
  return (
    <View style={styles.container}>
      <CustomSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.colors.background,
  },
  searchbarAndResults: {
    flex: 1,
    width: "80%",
    marginTop: "30%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
