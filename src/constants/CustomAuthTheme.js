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
    backgroundColor: THEME.button.primaryColorBackground,
    borderRadius: THEME.button.borderRadius,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: THEME.button.disabledBackgroundColor,
    borderRadius: THEME.button.borderRadius,
  },
  sectionHeaderText: {
    ...AmplifyTheme.sectionHeaderText,
    color: THEME.text.color.primary,
  },
  input: { ...AmplifyTheme.input, color: THEME.text.color.primary },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: THEME.text.color.primary,
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    color: THEME.text.color.disabled,
  },
  linkUnderlay: { color: THEME.colors.background },
  inputLabel: { ...AmplifyTheme.inputLabel, color: THEME.text.color.primary },
  phoneInput: { ...AmplifyTheme.phoneInput, color: THEME.text.color.primary },
  pickerItem: {
    ...AmplifyTheme.pickerItem,
    color: THEME.colors.foreground,
  },
  errorRowText: {
    ...AmplifyTheme.errorRowText,
    color: THEME.colors.danger,
  },
};
