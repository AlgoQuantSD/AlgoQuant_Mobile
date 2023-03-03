import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import InvestorTradeFrequencyCarousel from "../../reusable_components/InvestorTradeFrequencyCarousel";
import SnackbarContent from "../../reusable_components/SnackbarContent";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import { containsOnlyNumbers } from "../../../helpers/regex";
import { profitOrLossStopErrorHandler } from "../../../helpers/errorHandler";
import {
  INDICATOR_LIST,
  PERIOD_LIST,
} from "../../../constants/CreateInvestorConstants";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorAlgorithmicStep2Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();
  console.log("Invesor object: ", investorObject);
  // Indicator selection state management
  const [isMACDSelected, setIsMACDSelected] = useState(false);
  const [isRSISelected, setIsRSISelected] = useState(false);
  const [isADLSelected, setIsADLSelected] = useState(false);
  const [isOBVSelected, setIsOBVSelected] = useState(false);
  const [isBBSelected, setIsBBSelected] = useState(false);
  const [isSOSelected, setIsSOSelected] = useState(false);

  // Frequency selection state management
  const [selectedFrequency, setSelectedFrequency] = useState(
    PERIOD_LIST[0].value
  );
  // Investor image state management
  const [imageId, setImageId] = useState(0);

  const [profitStop, setProfitStop] = useState("0");
  const [lossStop, setLossStop] = useState("0");

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);

  // Set indicator to selected or unselected when one of them are pressed
  function setIsIndicatorSelected(indicatorId) {
    switch (indicatorId) {
      case "INDICATOR_MACD":
        setIsMACDSelected(!isMACDSelected);
        break;
      case "INDICATOR_RSI":
        setIsRSISelected(!isRSISelected);
        break;
      case "INDICATOR_ADL":
        setIsADLSelected(!isADLSelected);
        break;
      case "INDICATOR_OBV":
        setIsOBVSelected(!isOBVSelected);
        break;
      case "INDICATOR_BB":
        setIsBBSelected(!isBBSelected);
        break;
      case "INDICATOR_SO":
        setIsSOSelected(!isSOSelected);
        break;
    }
  }

  // Check if indicator is selected for displaying a displaying an outlined circle (unselected) or filled in circle (selected)
  function isIndactorSelected(indicatorId) {
    switch (indicatorId) {
      case "INDICATOR_MACD":
        return isMACDSelected;

      case "INDICATOR_RSI":
        return isRSISelected;

      case "INDICATOR_ADL":
        return isADLSelected;

      case "INDICATOR_OBV":
        return isOBVSelected;

      case "INDICATOR_BB":
        return isBBSelected;

      case "INDICATOR_SO":
        return isSOSelected;
    }
  }

  // Add or remove indicators that will be passed to the next screen based on the state of which indicators are selected
  function handlePressNext() {
    addIndicators();
    removeIndicators();
    addTradeFrequency();
    addImageId();
    addProfitAndLossStop();
    if (hasErrors()) {
      return;
    }
    navigation.navigate("CreateInvestorAlgorithmicStep3Screen", {
      investorObject: investorObject,
    });
  }

  function addIndicators() {
    if (isMACDSelected && !investorObject.indicators.includes("MACD")) {
      investorObject.indicators.push("MACD");
    }

    if (isRSISelected && !investorObject.indicators.includes("RSI")) {
      investorObject.indicators.push("RSI");
    }

    if (isADLSelected && !investorObject.indicators.includes("ADL")) {
      investorObject.indicators.push("ADL");
    }
    if (isOBVSelected && !investorObject.indicators.includes("OBV")) {
      investorObject.indicators.push("OBV");
    }
    if (isBBSelected && !investorObject.indicators.includes("BB")) {
      investorObject.indicators.push("BB");
    }
    if (isSOSelected && !investorObject.indicators.includes("SO")) {
      investorObject.indicators.push("SO");
    }
  }

  function removeIndicators() {
    if (!isMACDSelected && investorObject.indicators.includes("MACD")) {
      investorObject.indicators = investorObject.indicators.filter((value) => {
        return value !== "MACD";
      });
    }
    if (!isRSISelected && investorObject.indicators.includes("RSI")) {
      investorObject.indicators = investorObject.indicators.filter((value) => {
        return value !== "RSI";
      });
    }
    if (!isADLSelected && investorObject.indicators.includes("ADL")) {
      investorObject.indicators = investorObject.indicators.filter((value) => {
        return value !== "ADL";
      });
    }
    if (!isOBVSelected && investorObject.indicators.includes("OBV")) {
      investorObject.indicators = investorObject.indicators.filter((value) => {
        return value !== "OBV";
      });
    }
    if (!isBBSelected && investorObject.indicators.includes("BB")) {
      investorObject.indicators = investorObject.indicators.filter((value) => {
        return value !== "BB";
      });
    }
    if (!isSOSelected && investorObject.indicators.includes("SO")) {
      investorObject.indicators = investorObject.indicators.filter((value) => {
        return value !== "SO";
      });
    }
  }

  function addTradeFrequency() {
    investorObject.period = selectedFrequency;
  }
  function addImageId() {
    investorObject.image_id = imageId;
  }
  function addProfitAndLossStop() {
    investorObject.profit_stop = profitStop;
    investorObject.loss_stop = lossStop;
  }

  // Validate the number of indicators selected, profit and loss stop are numbers 0-99
  function hasErrors() {
    // Check for number of indicators
    if (investorObject.indicators.length < 1) {
      setSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.danger}
          text="ERROR: Select at least one indicator."
          textColor={THEME.colors.danger}
        />
      );
      setIsSnackbarVisible(true);
      return true;
    }
    const errorProps = {
      investorObject,
      profitStop,
      lossStop,
      setIsSnackbarVisible,
      setSnackbarMessage,
    };
    // Check for valid profit and loss stop
    if (profitOrLossStopErrorHandler(errorProps)) {
      return true;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Configure Investor</Text>
          </View>
          {/* Indicators */}
          <View style={styles.indicatorsContainer}>
            <Text style={styles.sectionTitleText}>Indicators</Text>
            {INDICATOR_LIST.map((indicator) => (
              <View key={indicator.id} style={styles.indicatorItem}>
                <Text style={styles.text}>{indicator.abbreviation}</Text>
                {isIndactorSelected(indicator.id) ? (
                  <TouchableOpacity
                    onPress={() => setIsIndicatorSelected(indicator.id)}
                  >
                    <Ionicons
                      name={THEME.icon.name.selectOptionCircleFilledIn}
                      color={THEME.icon.color.primary}
                      size={THEME.icon.size.medium}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setIsIndicatorSelected(indicator.id)}
                  >
                    <Ionicons
                      name={THEME.icon.name.selectOptionCircleOutline}
                      color={THEME.icon.color.primary}
                      size={THEME.icon.size.medium}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
          {/* Trade Frequency */}
          <View style={styles.tradeFrequencyContainer}>
            <Text style={styles.sectionTitleText}>Trade frequency</Text>
            <InvestorTradeFrequencyCarousel
              data={PERIOD_LIST}
              selectedFrequency={selectedFrequency}
              setSelectedFrequency={setSelectedFrequency}
              setImageId={setImageId}
            />
          </View>
          {/* Conditions */}
          <View style={styles.conditionsContainer}>
            <Text style={styles.sectionTitleText}>Conditions</Text>
            <View style={styles.conditionsRow}>
              <Text>Profit stop</Text>
              <TextInput
                value={profitStop}
                onChangeText={(text) => {
                  setProfitStop(text);
                }}
                selectionColor={THEME.colors.foreground}
                underlineColor={THEME.colors.transparent}
                activeUnderlineColor={THEME.colors.transparent}
                outlineColor={THEME.colors.foreground}
                activeOutlineColor={THEME.colors.foreground}
                textColor={THEME.colors.foreground}
                placeholderTextColor={THEME.colors.foreground}
                contentStyle={{ color: THEME.colors.foreground }}
                maxLength={2}
                style={styles.percentTextInput}
              />
              <View style={styles.percentMark}>
                <Text style={styles.text}>%</Text>
              </View>
            </View>
            <View style={styles.conditionsRow}>
              <Text>Loss stop</Text>
              <TextInput
                value={lossStop}
                onChangeText={(text) => {
                  setLossStop(text);
                }}
                selectionColor={THEME.colors.foreground}
                underlineColor={THEME.colors.transparent}
                activeUnderlineColor={THEME.colors.transparent}
                outlineColor={THEME.colors.foreground}
                activeOutlineColor={THEME.colors.foreground}
                textColor={THEME.colors.foreground}
                placeholderTextColor={THEME.colors.foreground}
                contentStyle={{ color: THEME.colors.foreground }}
                maxLength={2}
                style={styles.percentTextInput}
              />
              <View style={styles.percentMark}>
                <Text style={styles.text}>%</Text>
              </View>
            </View>
          </View>
          {/* Next */}
          <View style={styles.nextButtonContainer}>
            <Button
              buttonColor={THEME.button.primaryColorBackground}
              textColor={THEME.text.secondaryColor}
              onPress={handlePressNext}
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
        </KeyboardAvoidingView>
      </ScrollView>
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
  },
  headerContainer: {
    justifyContent: "center",
    marginTop: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  indicatorsContainer: {
    marginTop: "5%",
    justifyContent: "space-between",
  },
  indicatorItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tradeFrequencyContainer: {
    marginTop: "5%",
  },
  conditionsContainer: {
    flex: 1,
  },
  conditionsRow: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentTextInput: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    borderBottomWidth: 1,
    borderColor: THEME.colors.foreground,
    backgroundColor: THEME.colors.transparent,
    width: "15%",
  },
  percentMark: {
    height: "100%",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: THEME.colors.foreground,
  },

  nextButtonContainer: {
    justifyContent: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
    alignItems: "flex-end",
  },
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
