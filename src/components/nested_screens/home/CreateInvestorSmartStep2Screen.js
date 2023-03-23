import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import { profitOrLossStopErrorHandler } from "../../../helpers/errorHandler";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorSmartStep2Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();

  const [profitStop, setProfitStop] = useState("0");
  const [lossStop, setLossStop] = useState("0");

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);

  function handlePressNext() {
    // Checl for errors
    if (hasErrors()) {
      return;
    }
    // Add profit and loss stop to the investor object
    addProfitAndLossStop();
    // Add investor image to investor object
    addInvestorImage();
    // Go to next screen passing new investor object
    navigation.navigate("CreateInvestorSmartStep3Screen", {
      investorObject: investorObject,
    });
  }

  function addProfitAndLossStop() {
    investorObject.profit_stop = profitStop;
    investorObject.loss_stop = lossStop;
  }

  function addInvestorImage() {
    investorObject.image_id = 6;
  }

  function hasErrors() {
    const errorProps = {
      investorObject,
      profitStop,
      lossStop,
      setIsSnackbarVisible,
      setSnackbarMessage,
    };
    if (profitOrLossStopErrorHandler(errorProps)) {
      return true;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Configure Investor</Text>
        </View>
        {/* Conditions */}
        <View style={styles.conditionsContainer}>
          <Text style={styles.sectionTitleText}>Conditions</Text>
          <View style={styles.conditionsRow}>
            <Text>Profit stop</Text>
            <TextInput
              value={profitStop}
              onChangeText={(text) => {
                setProfitStop(parseFloat(text));
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
                setLossStop(parseFloat(text));
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

        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
          <Button
            buttonColor={THEME.button.primaryColorBackground}
            textColor={THEME.text.color.secondary}
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
      </View>
    </TouchableWithoutFeedback>
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
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  conditionsContainer: {
    flex: 0.3,
    paddingTop: "5%",
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
  },

  nextButtonContainer: {
    flex: 0.55,
    justifyContent: "flex-end",
    paddingTop: "10%",
    paddingBottom: "10%",
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
});
