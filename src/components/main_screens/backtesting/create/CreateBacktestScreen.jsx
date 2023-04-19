import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import AlgoquantApiContext from "../../../../constants/ApiContext";
import { THEME } from "../../../../constants/Theme";
import { snackbarCleanUp } from "../../../../helpers/snackbarCleanup";
import DateInputFieldView from "../../../general_use/date_picker/DateInputFieldView";
import SnackbarContent from "../../../general_use/snackbar/SnackbarContent";
import SuccessScreen from "../../../general_use/success_error_screens/SuccessScreen";

export default function CreateBacktestScreen(props) {
  const { investorID } = props.route.params;
  const navigation = useNavigation();
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  // Get todays date so we can cap how far back in time a user can go from today
  const today = new Date();
  const maximumDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const minimumDate = new Date(
    today.getFullYear() - 4,
    today.getMonth(),
    today.getDate()
  );

  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [startDateUnixTimestamp, setStartDateUnixTimestamp] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const [endDateUnixTimestamp, setEndDateUnixTimestamp] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState("100000");
  const [backtestName, setBacktestName] = useState("");
  // Dynamic start and end dates for the date pickers
  const [minimumStartDate, setMinimumStartDate] = useState(minimumDate);
  const [maximumStartDate, setMaximumStartDate] = useState(maximumDate);
  const [minimumEndDate, setMinimumEndDate] = useState(minimumDate);
  const [maximumEndDate, setMaximumEndDate] = useState(maximumDate);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  // Snackbar
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  // Update the minimum possible end date whenever we change the start date
  useEffect(() => {
    // Add one day (86400 seconds) to the current start date to be the min end date
    if (startDateUnixTimestamp) {
      setMinimumEndDate(new Date((startDateUnixTimestamp + 86400) * 1000));
    }
  }, [startDate]);

  // Update the maximum possible start date whenever we change the end date
  useEffect(() => {
    // Subtract one day (86400 seconds) from the current end date to be the max start date
    if (endDateUnixTimestamp) {
      setMaximumStartDate(new Date((endDateUnixTimestamp - 86400) * 1000));
    }
  }, [endDate]);

  // Set the min and max initial investment, dont allow decimals
  function handleInitialInvestmentChange(text) {
    setInitialInvestment(text);
    if (parseInt(text) <= 0 || text.includes(".")) {
      setInitialInvestment("1");
    } else if (parseInt(text) >= 10000000) {
      setInitialInvestment("1000000");
    }
  }

  // set Backtest name string
  function handleBacktestNameChange(text) {
    setBacktestName(text);
  }

  // Input validation
  function hasErrors() {
    // Show error if user does not pick a start or end date
    if (!startDateUnixTimestamp || !endDateUnixTimestamp) {
      setSnackbarMessage(
        <SnackbarContent
          iconName={THEME.icon.name.error}
          iconSize={THEME.icon.size.snackbarIconSize}
          iconColor={THEME.colors.danger}
          text="ERROR: Pick a start and end date."
          textColor={THEME.colors.danger}
        />
      );
      setIsSnackbarVisible(true);
      return true;
    }
  }

  // Do this if the create backetest endpoint returns success
  function handleSuccess() {
    setIsSuccessful(true);
    setTimeout(() => {
      setIsSuccessful(false);
      navigation.navigate("HomeScreen");
    }, 3000);
  }

  // Do this if the create backtest endpoint returns an error
  function handleError() {
    setSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text="ERROR: Could not create backtest, try again later."
        textColor={THEME.colors.danger}
      />
    );
  }

  // Put API call in here
  // Start date: startDateUnixTimestamp
  // End date: endDateUnixTimestamp
  // Initial investment: initialInvestment
  // Investor id: investorID
  function handlePressCreateBacktest() {
    if (hasErrors()) {
      return;
    }
    setIsLoading(true);
    if (algoquantApi.token) {
      algoquantApi
        .createBacktest(
          investorID,
          startDateUnixTimestamp,
          endDateUnixTimestamp,
          backtestName,
          initialInvestment
        )
        .then((resp) => {})
        .catch((err) => {
          // TODO: Need to implement better error handling
          handleError();
        });
    }
    setTimeout(() => {
      setIsLoading(false);
      handleSuccess();
    }, 2000);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* Loading Screen */}
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <StatusBar barStyle={"light-content"} />
          <ActivityIndicator
            size={"large"}
            color={THEME.activityIndicator.color.primary}
          />
          <Text>Creating your backtest!</Text>
        </View>
      ) : isSuccessful ? (
        // Success Screen
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SuccessScreen message="Successfully created backtest!" />
        </View>
      ) : (
        <View style={styles.container}>
          <StatusBar barStyle={"light-content"} />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Create a Backtest</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitleText}>
              Time period and initial investment
            </Text>
            <Text style={styles.text}>
              Select the period of time that you would like to test your
              investor against as well as how much money you want to invest.
            </Text>
          </View>
          <View style={styles.inputContainer}>
            {/* Backtest Name */}
            <TextInput
              label="Backtest Name"
              keyboardType="default"
              value={backtestName}
              onChangeText={(text) => handleBacktestNameChange(text)}
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
            {/* Start Date */}
            <DateInputFieldView
              label={"Start Date"}
              value={startDate}
              selectedDate={startDate}
              setSelectedDate={setStartDate}
              isDatePickerOpen={isStartDatePickerOpen}
              setIsDatePickerOpen={setIsStartDatePickerOpen}
              setUnixTimestamp={setStartDateUnixTimestamp}
              minimumDate={minimumStartDate}
              setMinimumDate={setMinimumStartDate}
              maximumDate={maximumStartDate}
              setMaximumDate={setMaximumStartDate}
            />

            {/* End Date */}
            <DateInputFieldView
              label={"End Date"}
              value={endDate}
              selectedDate={endDate}
              setSelectedDate={setEndDate}
              isDatePickerOpen={isEndDatePickerOpen}
              setIsDatePickerOpen={setIsEndDatePickerOpen}
              setUnixTimestamp={setEndDateUnixTimestamp}
              minimumDate={minimumEndDate}
              setMinimumDate={setMinimumEndDate}
              maximumDate={maximumEndDate}
              setMaximumDate={setMaximumEndDate}
            />

            {/* Initial Investment */}
            <TextInput
              label="Initial Investment"
              keyboardType="numeric"
              value={initialInvestment}
              onChangeText={(text) => handleInitialInvestmentChange(text)}
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
          {/* Create Backtest Button */}
          <View style={styles.nextButtonContainer}>
            <Button
              buttonColor={THEME.button.color.primary}
              textColor={THEME.text.color.secondary}
              onPress={handlePressCreateBacktest}
              style={THEME.button.style}
            >
              Create Backtest
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
      )}
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
    fontWeight: "600",
    color: THEME.text.color.primary,
    paddingBottom: "5%",
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "bold",
    color: THEME.text.color.primary,
  },
  descriptionContainer: {
    flex: 0.15,
    marginBottom: "10%",
  },
  inputContainer: {
    flex: 0.3,
    justifyContent: "space-between",
  },
  nextButtonContainer: {
    flex: 0.4,
    justifyContent: "flex-end",
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
