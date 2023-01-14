const PALETTE = {
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

export const THEME = {
  colors: {
    background: PALETTE.black,
    foreground: PALETTE.white,
    primary: PALETTE.green,
    success: PALETTE.green,
    danger: PALETTE.red,
  },
  text: {
    fontSizeH1: 28,
    fontSizeH2: 24,
    fontSizeH3: 20,
    fontSizeBold: 20,
    fontSizeBody: 16,
    fontSizeButton: 16,
    color: PALETTE.white,
    disabledColor: PALETTE.mediumGray,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 45,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 3,
    backgroundColor: PALETTE.primaryGreen,
    disabledBackgroundColor: PALETTE.primaryGreenOpacity35,
  },
  bottomTab: {
    backgroundColor: PALETTE.black,
    tabActiveColor: PALETTE.white,
    tabInactiveColor: PALETTE.mediumGray,
    topBorderColor: PALETTE.darkGray,
    topBorderWidth: 1,
  },
  modal: {
    backgroundColor: PALETTE.darkGrayOpacity95,
  },
  profileScreen: {
    profilePicBackgroundColor: PALETTE.mediumGray,
    dividerColor: PALETTE.mediumGray,
  },
};

export const LIGHT_THEME = {
  ...THEME,
  colors: {
    background: PALETTE.white,
    foreground: PALETTE.black,
    text: PALETTE.black,
  },
};
