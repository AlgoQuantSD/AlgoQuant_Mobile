import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorStep1Screen({ navigation }) {
  const [investorName, setInvestorName] = useState("");
  const [selectedInvestorType, setSelectedInvestorType] = useState("STANDARD");
  console.log(
    "Investor name: ",
    investorName,
    " Investor type: ",
    selectedInvestorType
  );
  function hasErrors() {
    return !selectedInvestorType.includes("@");
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create Your Investor</Text>
      </View>
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
      <View style={styles.investorTypeContainer}>
        <View style={styles.investorType}>
          <Text style={styles.investorTitleText}>Standard Investor</Text>
          <Text style={styles.text}>
            Choose indicators and stocks to create your own custom investor.
          </Text>
          <TouchableOpacity
            onPress={(e) => setSelectedInvestorType("STANDARD")}
          >
            {selectedInvestorType === "STANDARD" ? (
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
          <Text style={styles.investorTitleText}>Algorithmic Investor</Text>
          <Text style={styles.text}>
            Use AlgoQuant's Smart Trading tool powered by atrificial
            intelligence.
          </Text>
          <TouchableOpacity
            onPress={(e) => setSelectedInvestorType("ALGORITHMIC")}
          >
            {selectedInvestorType === "ALGORITHMIC" ? (
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
      </View>
      <Button
        buttonColor={THEME.button.primaryColorBackground}
        textColor={THEME.text.secondaryColor}
        onPress={() => navigation.navigate("CreateInvestorStep2Screen")}
      >
        Next
      </Button>
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
    backgroundColor: "blue",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  investorNameInputContainer: {
    flex: 0.1,
    justifyContent: "center",
    backgroundColor: "green",
  },
  investorTypeContainer: {
    flex: 0.6,
    justifyContent: "center",
    backgroundColor: "red",
  },
  investorType: {
    flex: 0.5,
    justifyContent: "center",
    backgroundColor: "blue",
  },
  investorTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
  },
});
