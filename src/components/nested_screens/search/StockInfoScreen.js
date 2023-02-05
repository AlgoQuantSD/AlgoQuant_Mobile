import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { THEME } from "../../../constants/Theme";
import HeaderContainer from "../../reusable_components/HeaderContainer";
import CustomGraph from "../../reusable_components/CustomGraph";

export default function StockInfoScreen(props) {
  const { stockName } = props.route.params;
  return (
    <View style={styles.container}>
      <HeaderContainer
        headerText={stockName}
        size={THEME.flexboxSizes.headerContainerMedium}
      />
      <CustomGraph />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: THEME.colors.background,
  },
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
    paddingBottom: "5%",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
});
