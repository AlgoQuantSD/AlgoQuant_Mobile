import React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

export default function CustomCalendar(props) {
  const {
    setSelectedDate,
    isDatePickerOpen,
    setIsDatePickerOpen,
    setUnixTimestamp,
  } = props;

  const hideDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  // Set the date that will be displayed to user and UNIX timestamp for API call
  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("MMMM Do YYYY");
    const unixTimestamp = moment(date).unix();
    setUnixTimestamp(unixTimestamp);
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  return (
    <DateTimePicker
      isVisible={isDatePickerOpen}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
  );
}
