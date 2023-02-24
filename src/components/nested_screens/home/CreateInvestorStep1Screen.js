import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorStep1Screen({ navigation }) {
  const [investorName, setInvestorName] = useState("");
  const [investorType, setInvestorType] = useState("ALGORITHMIC");
  const investorObject = {
    investor_name: investorName,
    type: investorType,
    indicators: [],
    period: null,
    profit_stop: null,
    loss_stop: null,
    assets_to_track: [],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create Your Investor</Text>
      </View>
      {/* Investor name text input field */}
      <View style={styles.investorNameInputContainer}>
        <TextInput
          label="Investor name"
          value={investorName}
          onChangeText={(investorName) => setInvestorName(investorName)}
          selectionColor={THEME.colors.foreground}
          underlineColor={THEME.colors.foreground}
          activeUnderlineColor={THEME.colors.foreground}
          outlineColor={THEME.colors.foreground}
          activeOutlineColor={THEME.colors.foreground}
          textColor={THEME.colors.foreground}
          placeholderTextColor={THEME.colors.foreground}
          contentStyle={{ color: THEME.colors.foreground }}
          style={{
            backgroundColor: THEME.colors.transparent,
            width: "100%",
          }}
        />
      </View>
      {/* Investor type selector */}
      <View style={styles.investorTypeContainer}>
        <View style={styles.investorType}>
          <Text style={styles.investorTitleText}>Algorithmic Investor</Text>
          <Text style={styles.text}>
            Choose indicators and stocks to create your own custom investor.
          </Text>
          <TouchableOpacity onPress={(e) => setInvestorType("ALGORITHMIC")}>
            {investorType === "ALGORITHMIC" ? (
              <Ionicons
                name="ellipse"
                color={THEME.icon.color.primary}
                size={THEME.icon.size.medium}
              />
            ) : (
              <Ionicons
                name="ellipse-outline"
                color={THEME.icon.color.primary}
                size={THEME.icon.size.medium}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.investorType}>
          <Text style={styles.investorTitleText}>Smart Investor</Text>
          <Text style={styles.text}>
            Use AlgoQuant's Smart Trading tool powered by atrificial
            intelligence.
          </Text>
          <TouchableOpacity onPress={(e) => setInvestorType("AI")}>
            {investorType === "AI" ? (
              <Ionicons
                name={THEME.icon.name.selectOptionCircleFilledIn}
                color={THEME.icon.color.primary}
                size={THEME.icon.size.medium}
              />
            ) : (
              <Ionicons
                name={THEME.icon.name.selectOptionCircleOutline}
                color={THEME.icon.color.primary}
                size={THEME.icon.size.medium}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Next button */}
      <View style={styles.nextButtonContainer}>
        <Button
          buttonColor={THEME.button.primaryColorBackground}
          textColor={THEME.text.secondaryColor}
          onPress={() => {
            investorType === "ALGORITHMIC"
              ? navigation.navigate("CreateInvestorAlgorithmicStep2Screen", {
                  investorObject: investorObject,
                })
              : navigation.navigate("CreateInvestorSmartStep2Screen", {
                  investorObject: investorObject,
                });
          }}
        >
          Next
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
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  investorNameInputContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  investorTypeContainer: {
    flex: 0.6,
    justifyContent: "center",
  },
  investorType: {
    flex: 0.5,
    justifyContent: "center",
  },
  investorTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
  },
  nextButtonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
