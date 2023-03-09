import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { THEME } from "../../constants/Theme";

export default function CustomCalendar(props) {
  const { selectedDate, setSelectedDate } = props;
  let today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const todayYear = today.getFullYear();

  // Set initial date with format that is compatible with calendar component
  const todayFullDate = `${todayYear}-${
    todayMonth < 10 ? 0 : ""
  }${todayMonth}-${todayDay < 10 ? 0 : ""}${todayDay}`;

  console.log("today full data: ", todayFullDate);

  const [headerTitleMonth, setHeaderTitleMonth] = useState(todayMonth);
  const [headerTitleYear, setHeaderTitleYear] = useState(todayYear);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <Calendar
      // Initially visible month. Default = now
      initialDate={"2023-03-08"}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={"2023-03-08"}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={"2040-05-30"}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={handleDayPress}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={handleDayPress}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"MM yyyy"}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {
        setHeaderTitleMonth(month.month);
        setHeaderTitleYear(month.year);
        console.log("month changed", month);
      }}
      markedDates={
        selectedDate
          ? {
              [selectedDate]: {
                selected: true,
                selectedColor: THEME.colors.background,
                selectedTextColor: THEME.colors.foreground,
              },
            }
          : {}
      }
      renderHeader={(date) => {
        return (
          <View>
            <Text style={{ color: THEME.text.color.secondary }}>{`${
              monthNames[headerTitleMonth - 1]
            } ${headerTitleYear}`}</Text>
          </View>
        );
      }}
      theme={{
        backgroundColor: THEME.colors.foreground,
        calendarBackground: THEME.colors.foreground,
        textSectionTitleColor: THEME.colors.background,
        selectedDayBackgroundColor: THEME.colors.background,
        selectedDayTextColor: "white",
        todayTextColor: "black",
        dayTextColor: THEME.colors.background,
        textDisabledColor: "gray",
        dotColor: "blue",
        selectedDotColor: "white",
        arrowColor: THEME.colors.background,
        monthTextColor: "red",
        indicatorColor: "blue",
      }}
    />
  );
}
