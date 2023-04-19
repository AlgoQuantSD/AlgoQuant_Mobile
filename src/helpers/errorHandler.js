import React from "react";
import SnackbarContent from "../components/general_use/snackbar/SnackbarContent";
import { THEME } from "../constants/Theme";
import { containsOnlyNumbers } from "./regex";

// Validate the number of indicators selected, profit and loss stop are numbers 0-99
export function profitOrLossStopErrorHandler(props) {
  const { profitStop, lossStop, setIsSnackbarVisible, setSnackbarMessage } =
    props;
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
