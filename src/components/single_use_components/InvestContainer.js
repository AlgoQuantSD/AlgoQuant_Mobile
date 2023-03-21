import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import InvestCarousel from "./InvestCarousel";

export default function InvestContainer(props) {
  const { setSnackbarMessage, setIsSnackbarVisible, navigation, isRefreshing, modalProps } =
    props;
  return (
    <View>
      <Text style={styles.headerText}>Invest</Text>
      <InvestCarousel
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarVisible={setIsSnackbarVisible}
        modalProps={modalProps}
        isRefreshing={isRefreshing}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.primaryColor,
    paddingTop: "5%",
    paddingBottom: "5%",
  },
});
