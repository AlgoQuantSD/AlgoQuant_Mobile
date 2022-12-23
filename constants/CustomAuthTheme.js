import { AmplifyTheme } from "aws-amplify-react-native";
import { Theme } from "./Theme";

export const CustomAuthTheme = {
  ...AmplifyTheme,
  container: {
    ...AmplifyTheme.container,
    backgroundColor: Theme.colors.background,
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: Theme.button.backgroundColor,
    borderRadius: Theme.button.borderRadius,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: Theme.button.disabledBackgroundColor,
    borderRadius: Theme.button.borderRadius,
  },
  sectionHeaderText: {
    ...AmplifyTheme.sectionHeaderText,
    color: Theme.text.color,
  },
  input: { ...AmplifyTheme.input, color: Theme.text.color },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: Theme.text.color,
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    color: Theme.text.disabledColor,
  },
  linkUnderlay: { color: Theme.colors.background },
  inputLabel: { ...AmplifyTheme.inputLabel, color: Theme.text.color },
  phoneInput: { ...AmplifyTheme.phoneInput, color: Theme.text.color },
  pickerItem: {
    ...AmplifyTheme.pickerItem,
    color: Theme.colors.foreground,
  },
  errorRowText: {
    ...AmplifyTheme.errorRowText,
    color: Theme.colors.danger,
  },
};
