import { PixelRatio } from "react-native";
import { VictoryTheme } from "victory-native";

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
  transparent: "#ffffff00",
};

export const THEME = {
  colors: {
    background: PALETTE.black,
    foreground: PALETTE.white,
    primary: PALETTE.primaryGreen,
    success: PALETTE.primaryGreen,
    danger: PALETTE.red,
    transparent: PALETTE.transparent,
  },
  text: {
    fontSizeH1: 42,
    fontSizeH2: 36,
    fontSizeH3: 28,
    fontSizeBold: 38 / PixelRatio.get(),
    fontSizeBody: 30 / PixelRatio.get(),
    fontSizeButton: 30 / PixelRatio.get(),
    fontSizeModalBody: 26 / PixelRatio.get(),
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
  loadingIndicator: {
    color: PALETTE.primaryGreen,
  },
  icons: {
    successIcon: "shield-checkmark-outline",
    errorIcon: "warning-outline",
    snackbarIconSize: 16,
  },
  table: {
    rowColor1: PALETTE.darkGray,
    rowColor2: PALETTE.black,
  },
  flexboxSizes: {
    headerContainerSmall: 0.15,
    headerContainerMedium: 0.2,
    headerContainerLarge: 0.25,
  },
};

// Customize the graph styling
export const LINE_GRAPH_THEME = {
  ...VictoryTheme.grayscale,
  area: {
    style: {
      labels: { fill: "red" },
    },
  },
  axis: {
    style: {
      axis: {
        stroke: "white",
        strokeWidth: 1,
      },
      grid: {
        fill: "transparent",
        stroke: "transparent",
      },
      ticks: {
        size: 5,
        stroke: "white",
        strokeWidth: 1,
      },
      tickLabels:
        ({},
        {
          fill: "white",
        }),
    },
  },
  cursorLabel: { fill: "red" },
};

export const LIGHT_THEME = {
  ...THEME,
  colors: {
    background: PALETTE.white,
    foreground: PALETTE.black,
    text: PALETTE.black,
  },
};
