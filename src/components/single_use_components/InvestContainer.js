import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";
import InvestCarousel from "./InvestCarousel";

export default function InvestContainer(props) {
  const {
    handlePressInTouchableElement,
    handlePressOutTouchableElement,
    setSnackbarMessage,
    setIsSnackbarVisible,
    navigation,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Invest</Text>
      <InvestCarousel
        handlePressInTouchableElement={handlePressInTouchableElement}
        handlePressOutTouchableElement={handlePressOutTouchableElement}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarVisible={setIsSnackbarVisible}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
    paddingTop: "5%",
    paddingBottom: "5%",
  },
});
