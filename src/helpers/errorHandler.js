import React from "react";
import SnackbarContent from "../components/reusable_components/SnackbarContent";
import { containsOnlyNumbers } from "./regex";
import { THEME } from "../constants/Theme";

// Validate the number of indicators selected, profit and loss stop are numbers 0-99
export function profitOrLossStopErrorHandler(props) {
  const { profitStop, lossStop, setIsSnackbarVisible, setSnackbarMessage } =
    props;
  console.log("Profit stop: ", profitStop);
  if (profitStop < 0 || profitStop > 100 || !containsOnlyNumbers(profitStop)) {
    setSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text="ERROR: Profit stop must be between 0 and 100."
        textColor={THEME.colors.danger}
      />
    );
    setIsSnackbarVisible(true);
    return true;
  } else if (lossStop < 0 || lossStop > 100 || !containsOnlyNumbers(lossStop)) {
    setSnackbarMessage(
      <SnackbarContent
        iconName={THEME.icon.name.error}
        iconSize={THEME.icon.size.snackbarIconSize}
        iconColor={THEME.colors.danger}
        text="ERROR: Loss stop must be between 0 and 100."
        textColor={THEME.colors.danger}
      />
    );
    setIsSnackbarVisible(true);
    return true;
  }
}
