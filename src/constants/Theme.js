const Palette = {
  primaryGreen: "#3F9F30",
  primaryGreenOpacity35: "#3F9F3059",
  red: "#B11818",
  lightGray: "#C7C7C7",
  mediumGray: "#747272",
  darkGray: "#323232",
  darkGrayOpacity95: "#323232F2",
  white: "#FFFFFF",
  whiteOpacity35: "FFFFFFE6",
  black: "#000000",
};

export const Theme = {
  colors: {
    background: Palette.black,
    foreground: Palette.white,
    primary: Palette.green,
    success: Palette.green,
    danger: Palette.red,
  },
  text: {
    fontSizeH1: 28,
    fontSizeBody: 16,
    fontSizeButton: 16,
    color: Palette.white,
    disabledColor: Palette.mediumGray,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 45,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 3,
    backgroundColor: Palette.primaryGreen,
    disabledBackgroundColor: Palette.primaryGreenOpacity35,
  },
  modal: {
    backgroundColor: Palette.darkGrayOpacity95,
  },
};

export const LightTheme = {
  ...Theme,
  colors: {
    background: Palette.white,
    foreground: Palette.black,
    text: Palette.black,
  },
};
