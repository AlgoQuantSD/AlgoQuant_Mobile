import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { THEME } from "../../constants/Theme";

export default function CustomCalendar() {
  return (
    <Calendar
      // Initially visible month. Default = now
      initialDate={"2023-03-08"}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={"2023-03-08"}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={"2040-05-30"}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(day) => {
        console.log("selected day", day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={(day) => {
        console.log("selected day", day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={"MM yyyy"}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={(month) => {
        console.log("month changed", month);
      }}
    />
  );
}
