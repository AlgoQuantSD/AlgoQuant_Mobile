import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { AI_INVESTOR_DESCRIPTION } from "../../../../../constants/CreateInvestorConstants";
import {
  INVESTOR_IMAGE_BASE_URL,
  NUM_INVESTOR_IMAGES_PER_FREQ,
} from "../../../../../constants/InvestorImagePaths";
import { THEME } from "../../../../../constants/Theme";
import { profitOrLossStopErrorHandler } from "../../../../../helpers/errorHandler";
import { snackbarCleanUp } from "../../../../../helpers/snackbarCleanup";
import CustomTooltip from "../../../../reusable_components/CustomTooltip";

export default function CreateInvestorAIStep2Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();

  const [profitStop, setProfitStop] = useState("0");
  const [lossStop, setLossStop] = useState("0");

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);

  const [investorImageNumber, setInvestorImageNumber] = useState(
    Math.floor(Math.random() * NUM_INVESTOR_IMAGES_PER_FREQ) + 1
  );

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
    navigation.navigate("CreateInvestorAIStep3Screen", {
      investorObject: investorObject,
    });
  }

  function addProfitAndLossStop() {
    investorObject.profit_stop = profitStop;
    investorObject.loss_stop = lossStop;
  }

  function addInvestorImage() {
    investorObject.image_id =
      INVESTOR_IMAGE_BASE_URL + "/AI/" + investorImageNumber + ".png";
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
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
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
              keyboardType="numeric"
              maxLength={2}
              selectionColor={THEME.colors.foreground}
              underlineColor={THEME.colors.transparent}
              activeUnderlineColor={THEME.colors.transparent}
              outlineColor={THEME.colors.foreground}
              activeOutlineColor={THEME.colors.foreground}
              textColor={THEME.colors.foreground}
              placeholderTextColor={THEME.colors.foreground}
              contentStyle={{ color: THEME.colors.foreground }}
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
              keyboardType="numeric"
              maxLength={2}
              selectionColor={THEME.colors.foreground}
              underlineColor={THEME.colors.transparent}
              activeUnderlineColor={THEME.colors.transparent}
              outlineColor={THEME.colors.foreground}
              activeOutlineColor={THEME.colors.foreground}
              textColor={THEME.colors.foreground}
              placeholderTextColor={THEME.colors.foreground}
              contentStyle={{ color: THEME.colors.foreground }}
              style={styles.percentTextInput}
            />
            <View style={styles.percentMark}>
              <Text style={styles.text}>%</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitleText}>
            How does an AI Investor work?
          </Text>
          <CustomTooltip text={AI_INVESTOR_DESCRIPTION} />
        </View>

        {/* Next Button */}
        <View style={styles.nextButtonContainer}>
          <Button
            buttonColor={THEME.button.primaryColorBackground}
            textColor={THEME.text.color.secondary}
            onPress={handlePressNext}
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
      </ScrollView>
    </View>
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
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    fontWeight: "600",
    color: THEME.text.color.primary,
  },
  headerContainer: {
    paddingBottom: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "bold",
    color: THEME.text.color.primary,
  },
  conditionsContainer: {
    paddingBottom: "15%",
  },
  conditionsRow: {
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

  nextButtonContainer: {
    justifyContent: "center",
    paddingTop: "10%",
    paddingBottom: "5%",
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
