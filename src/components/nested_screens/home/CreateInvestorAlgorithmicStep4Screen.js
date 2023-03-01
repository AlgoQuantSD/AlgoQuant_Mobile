import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeProvider, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { PERIOD_LIST } from "../../../constants/CreateInvestorConstants";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorAlgorithmicStep4Screen(props) {
  const { investorObject } = props.route.params;
  console.log("Step 4: ", investorObject);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Confirm Investor Creation</Text>
      </View>
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
        <View style={styles.investorConfigurationItem}>
          <Text style={styles.text}>Trade frequency:</Text>
          <Text style={styles.text}>
            {PERIOD_LIST.map((item) => {
              if (item.value === investorObject.period) {
                return item.name;
              }
            })}
          </Text>
        </View>
      </View>
      <Button
        buttonColor={THEME.button.primaryColorBackground}
        textColor={THEME.text.secondaryColor}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
    backgroundColor: "blue",
  },
  text: { fontSize: THEME.text.fontSize.body, color: THEME.text.color.primary },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  investorConfigurationContainer: {
    flex: 0.25,
    justifyContent: "center",
    backgroundColor: "red",
  },
  investorConfigurationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
});
