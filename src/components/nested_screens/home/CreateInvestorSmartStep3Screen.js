import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorSmartStep3Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();

  console.log("AI investor: ", investorObject);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Confirm Investor Creation</Text>
      </View>
      {/* Investor Configuration */}
      <View style={styles.investorConfigurationContainer}>
        <Text style={styles.sectionTitleText}>Investor Configuration</Text>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Investor name:</Text>
          <Text style={styles.text}>{investorObject.investor_name}</Text>
        </View>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Investor type:</Text>
          <Text style={styles.text}>{investorObject.type}</Text>
        </View>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Profit stop:</Text>
          <Text style={styles.text}>{investorObject.profit_stop}%</Text>
        </View>
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Loss stop:</Text>
          <Text style={styles.text}>{investorObject.loss_stop}%</Text>
        </View>
      </View>
      {/* Create Investor Button */}
      <View style={styles.nextButtonContainer}>
        <Button
          buttonColor={THEME.button.primaryColorBackground}
          textColor={THEME.text.secondaryColor}
          onPress={() =>
            navigation.navigate("HomeScreen", {
              investorObject: investorObject,
            })
          }
        >
          Create Investor
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  investorConfigurationContainer: {
    flex: 0.25,
    justifyContent: "center",
  },
  investorConfigurationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  nextButtonContainer: {
    flex: 0.6,
    justifyContent: "flex-end",
    paddingTop: "10%",
    paddingBottom: "10%",
    alignItems: "flex-end",
  },
  snackbarContainer: {
    flex: 0.05,
  },
});
