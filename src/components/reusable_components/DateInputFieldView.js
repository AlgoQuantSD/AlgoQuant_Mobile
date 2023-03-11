import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import DatePickerView from "./DatePickerView";
import { THEME } from "../../constants/Theme";

export default function DateInputFieldView(props) {
  const {
    label,
    value,
    selectedDate,
    setSelectedDate,
    isDatePickerOpen,
    setIsDatePickerOpen,
    setUnixTimestamp,
  } = props;

  return (
    <View>
      <TextInput
        label={label}
        value={value}
        editable={false}
        right={
          <TextInput.Icon
            onPress={() => setIsDatePickerOpen(!isDatePickerOpen)}
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
      <DatePickerView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isDatePickerOpen={isDatePickerOpen}
        setIsDatePickerOpen={setIsDatePickerOpen}
        setUnixTimestamp={setUnixTimestamp}
      />
    </View>
  );
}
