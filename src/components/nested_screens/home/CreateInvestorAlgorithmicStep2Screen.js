import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { INDICATOR_LIST } from "../../../constants/IndicatorList";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorAlgorithmicStep2Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();

  // Indicator selection state management
  const [isMACDSelected, setIsMACDSelected] = useState(false);
  const [isRSISelected, setIsRSISelected] = useState(false);
  const [isADLSelected, setIsADLSelected] = useState(false);
  const [isOBVSelected, setIsOBVSelected] = useState(false);
  const [isBBSelected, setIsBBSelected] = useState(false);
  const [isSOSelected, setIsSOSelected] = useState(false);

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
  function finalizeIndicators() {
    addIndicators();
    removeIndicators();

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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Configure Investor</Text>
      </View>

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

      <Button
        buttonColor={THEME.button.primaryColorBackground}
        textColor={THEME.text.secondaryColor}
        onPress={finalizeIndicators}
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
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
    backgroundColor: "red",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  indicatorsContainer: {
    flex: 0.4,
    justifyContent: "space-between",
    backgroundColor: "blue",
  },
  indicatorItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "green",
  },
});
