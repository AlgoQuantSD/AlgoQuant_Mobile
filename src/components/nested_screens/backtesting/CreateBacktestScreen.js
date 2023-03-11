import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import DateInputFieldView from "../../reusable_components/DateInputFieldView";

import { THEME } from "../../../constants/Theme";

export default function CreateBacktestScreen(props) {
  const { investorID } = props.route.params;

  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [startDateUnixTimestamp, setStartDateUnixTimestamp] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const [endDateUnixTimestamp, setEndDateUnixTimestamp] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState("100000");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create a Backtest</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitleText}>
            Time period and initial investment
          </Text>
          <Text style={styles.text}>
            Select the period of time that you would like to test your investor
            against as well as how much money you want to invest.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {/* Start Date */}
          <DateInputFieldView
            label={"Start Date"}
            value={startDate}
            selectedDate={startDate}
            setSelectedDate={setStartDate}
            isDatePickerOpen={isStartDatePickerOpen}
            setIsDatePickerOpen={setIsStartDatePickerOpen}
            setUnixTimestamp={setStartDateUnixTimestamp}
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
          />

          {/* Initial Investment */}
          <TextInput
            label="Initial Investment"
            onChangeText={(text) => setInitialInvestment(text)}
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
            buttonColor={THEME.button.primaryColorBackground}
            textColor={THEME.text.secondaryColor}
            onPress={() =>
              console.log(
                "Create backtest, Start Date: ",
                startDateUnixTimestamp,
                " End Date: ",
                endDateUnixTimestamp,
                " Investment: ",
                initialInvestment
              )
            }
          >
            Create Backtest
          </Button>
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
    paddingBottom: "5%",
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
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
  snackbarContainer: {},
});
