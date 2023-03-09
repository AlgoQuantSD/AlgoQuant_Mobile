import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import CustomCalendar from "../../reusable_components/CustomCalendar";
import { THEME } from "../../../constants/Theme";

export default function CreateBacktestScreen(props) {
  const { investorID } = props.route.params;

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);

  return (
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
        <TextInput
          label="Start Date"
          value={startDate}
          editable={false}
          right={
            <TextInput.Icon
              onPress={() => setIsCalendarOpen(!isCalendarOpen)}
              icon="calendar"
            />
          }
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

        {isCalendarOpen ? (
          <Animated.View entering={SlideInDown} exiting={SlideOutDown}>
            <CustomCalendar
              selectedDate={startDate}
              setSelectedDate={setStartDate}
            />
          </Animated.View>
        ) : null}

        <TextInput
          label="Initial Investment"
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
  timePeriodAndInitialInvestmentContainer: {
    flex: 0.8,
    backgroundColor: "blue",
  },
  descriptionContainer: {
    flex: 0.15,
    justifyContent: "center",
    backgroundColor: "green",
  },
  inputContainer: {
    flex: 0.7,
    justifyContent: "center",
    backgroundColor: "purple",
  },
});
