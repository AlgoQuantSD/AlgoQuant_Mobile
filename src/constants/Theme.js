import { PixelRatio } from "react-native";
import { VictoryTheme } from "victory-native";

const PALETTE = {
  primaryGreen: "#1F302B",
  primaryGreenOpacity35: "#3F9F3059",
  brightGreen: "#00FF38",
  mediumGreen: "#33CA47",
  red: "#B11818",
  lightGray: "#C7C7C7",
  mediumGray: "#747272",
  darkGray: "#323232",
  darkGrayOpacity95: "#323232F2",
  white: "#FFFFFF",
  cokeWhite: "#FAFAFA",
  smokeWhite: "#F0F0F0",
  whiteOpacity35: "FFFFFFE6",
  black: "#000000",
  transparent: "#ffffff00",
};

export const THEME = {
  colors: {
    background: PALETTE.cokeWhite,
    foreground: PALETTE.primaryGreen,
    primary: PALETTE.primaryGreen,
    success: PALETTE.brightGreen,
    danger: PALETTE.red,
    trendingUp: PALETTE.mediumGreen,
    trendingDown: PALETTE.red,
    transparent: PALETTE.transparent,
  },
  text: {
    fontSizeH1: 42,
    fontSizeH2: 36,
    fontSizeH3: 28,
    fontSizeH4: 22,
    fontSizeBold: 38 / PixelRatio.get(),
    fontSizeBody: 30 / PixelRatio.get(),
    fontSizeButton: 30 / PixelRatio.get(),
    fontSizeModalBody: 26 / PixelRatio.get(),
    primaryColor: PALETTE.primaryGreen,
    secondaryColor: PALETTE.cokeWhite,
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
    primaryColorBackground: PALETTE.primaryGreen,
    secondaryColorBackground: PALETTE.cokeWhite,
    disabledBackgroundColor: PALETTE.primaryGreenOpacity35,
  },
  bottomTab: {
    backgroundColor: PALETTE.primaryGreen,
    tabActiveColor: PALETTE.cokeWhite,
    tabInactiveColor: PALETTE.mediumGray,
    topBorderColor: PALETTE.cokeWhite,
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
    investorStartJobIcon: "play",
    deleteInvestorIcon: "trash",
    primaryColor: PALETTE.primaryGreen,
    secondaryColor: PALETTE.cokeWhite,
    iconSizeXSmall: 12,
    iconSizeSmall: 16,
    iconSizeMedium: 24,
    iconSizeLarge: 32,
    snackbarIconSize: 16,
  },
  indicatorAndStockCards: {
    backgroundColor: PALETTE.primaryGreen,
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
  investCard: {
    backgroundColor: "#1F302B",
  },
};

// Customize the graph styling
export const LINE_GRAPH_THEME = {
  ...VictoryTheme.grayscale,

  axis: {
    style: {
      axis: {
        stroke: THEME.colors.primary,
        strokeWidth: 1,
      },
      grid: {
        fill: "transparent",
        stroke: "transparent",
      },
      ticks: {
        size: 5,
        stroke: THEME.colors.primary,
        strokeWidth: 1,
      },
      tickLabels:
        ({},
        {
          fill: THEME.colors.primary,
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
