import { AmplifyTheme } from "aws-amplify-react-native";
import { THEME } from "./Theme";

export const CUSTOM_AUTH_THEME = {
  ...AmplifyTheme,
  container: {
    ...AmplifyTheme.container,
    backgroundColor: THEME.colors.background,
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: THEME.button.backgroundColor,
    borderRadius: THEME.button.borderRadius,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: THEME.button.disabledBackgroundColor,
    borderRadius: THEME.button.borderRadius,
  },
  sectionHeaderText: {
    ...AmplifyTheme.sectionHeaderText,
    color: THEME.text.color,
  },
  input: { ...AmplifyTheme.input, color: THEME.text.color },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: THEME.text.color,
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    color: THEME.text.disabledColor,
  },
  linkUnderlay: { color: THEME.colors.background },
  inputLabel: { ...AmplifyTheme.inputLabel, color: THEME.text.color },
  phoneInput: { ...AmplifyTheme.phoneInput, color: THEME.text.color },
  pickerItem: {
    ...AmplifyTheme.pickerItem,
    color: THEME.colors.foreground,
  },
  errorRowText: {
    ...AmplifyTheme.errorRowText,
    color: THEME.colors.danger,
  },
};
