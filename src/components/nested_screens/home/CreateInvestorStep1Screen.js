import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { THEME } from "../../../constants/Theme";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import SnackbarContent from "../../reusable_components/SnackbarContent";

export default function CreateInvestorStep1Screen(props) {
  const navigation = useNavigation();
  const [investorName, setInvestorName] = useState("");
  const [investorType, setInvestorType] = useState("ALGORITHMIC");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const investorObject = {
    investor_name: investorName,
    type: investorType,
    indicators: [],
    period: null,
    profit_stop: null,
    loss_stop: null,
    assets_to_track: [],
    image_id: null,
  };

  function handleNextPress() {
    // Check for invalid input
    if (hasErrors()) {
      return;
    }
    // Continue to next screen if the input is valid
    if (investorType === "ALGORITHMIC") {
      navigation.navigate("CreateInvestorAlgorithmicStep2Screen", {
        investorObject: investorObject,
      });
    } else {
      navigation.navigate("CreateInvestorSmartStep2Screen", {
        investorObject: investorObject,
      });
    }
  }

  // Error handling
  function hasErrors() {
    if (investorName.length <= 2) {
      setSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.danger}
          text="ERROR: Investor name must be at least 3 characters long."
          textColor={THEME.colors.danger}
        />
      );
      setIsSnackbarVisible(true);
      return true;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
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
                  name={THEME.icon.name.selectOptionCircleFilledIn}
                  color={THEME.icon.color.ternary}
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
                  color={THEME.icon.color.ternary}
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
            textColor={THEME.text.color.secondary}
            onPress={handleNextPress}
            style={THEME.button.style}
          >
            Next
          </Button>
        </View>
        {/* Snackbar */}
        <View style={styles.snackbarContainer}>
          <Snackbar
            visible={isSnackbarVisible}
            onDismiss={() =>
              snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage)
            }
            duration={3500}
            action={{
              label: "Dismiss",
              textColor: THEME.snackbar.text.color,
              onPress: () => {
                snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage);
              },
            }}
            style={styles.snackbar}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
    paddingBottom: "2%",
  },
  headerContainer: {
    paddingBottom: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "bold",
    color: THEME.text.color.primary,
  },
  investorNameInputContainer: {
    paddingBottom: "10%",
  },
  investorType: {
    paddingBottom: "10%",
  },
  investorTitleText: {
    fontSize: THEME.text.fontSize.H4,
    fontWeight: "600",
    color: THEME.text.color.primary,
    paddingBottom: "2%",
  },
  nextButtonContainer: {
    marginTop: "auto",
    alignItems: "flex-end",
  },
  snackbarContainer: {
    flex: 0.05,
  },
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "6%",
    paddingRight: "6%",
    borderRadius: 10,
  },
});
