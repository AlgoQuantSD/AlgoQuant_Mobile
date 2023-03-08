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
    modalProps
  } = props;
  return (
    <View>
      <Text style={styles.headerText}>Invest</Text>
      <InvestCarousel
        handlePressInTouchableElement={handlePressInTouchableElement}
        handlePressOutTouchableElement={handlePressOutTouchableElement}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarVisible={setIsSnackbarVisible}
        modalProps={modalProps}
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
