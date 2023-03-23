import { PixelRatio } from "react-native";
import { VictoryTheme } from "victory-native";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const PALETTE = {
  primaryGreen: "#1F302B",
  primaryGreenOpacity95: "#1F302BD9",
  brightGreen: "#4BB543",
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
    color: {
      primary: PALETTE.primaryGreen,
      secondary: PALETTE.cokeWhite,
      ternary: PALETTE.brightGreen,
      disabled: PALETTE.mediumGray,
    },
    fontSize: {
      H1: 42,
      H2: 36,
      H3: 28,
      H4: 22,
      bold: 20,
      body: 16,
      modalBody: 14,
    },
  },
  button: {
    color: {
      primary: PALETTE.primaryGreen,
      secondary: PALETTE.cokeWhite,
      disabled: PALETTE.primaryGreenOpacity95,
    },
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 45,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 3,
    primaryColorBackground: PALETTE.primaryGreen,
    secondaryColorBackground: PALETTE.cokeWhite,
    disabledBackgroundColor: PALETTE.primaryGreenOpacity95,
  },
  bottomTab: {
    backgroundColor: PALETTE.primaryGreen,
    tabActiveColor: PALETTE.cokeWhite,
    tabInactiveColor: PALETTE.mediumGray,
    topBorderColor: PALETTE.cokeWhite,
    topBorderWidth: 1,
  },
  topTabNavigator: {
    color: {
      background: PALETTE.primaryGreen,
    },
  },
  modal: {
    color: {
      background: PALETTE.primaryGreenOpacity95,
    },
  },
  profileScreen: {
    profilePicBackgroundColor: PALETTE.primaryGreen,
    dividerColor: PALETTE.primaryGreen,
  },
  loadingIndicator: {
    color: PALETTE.primaryGreen,
  },
  icon: {
    name: {
      success: "shield-checkmark-outline",
      error: "warning-outline",
      investorStartJob: "play",
      deleteInvestor: "trash",
      stopJob: "stop",
      inactiveJob: "lock-closed",
      editPencil: "pencil",
      refresh: "refresh",
      arrowRight: "arrow-forward",
      selectOptionCircleOutline: "ellipse-outline",
      selectOptionCircleFilledIn: "ellipse",
      backtest: "flask",
    },
    color: {
      primary: PALETTE.primaryGreen,
      secondary: PALETTE.cokeWhite,
      ternary: PALETTE.brightGreen,
    },
    size: {
      xSmall: 12,
      small: 16,
      medium: 24,
      large: 32,
      snackbarIconSize: 24,
    },
  },
  indicatorAndStockCards: {
    backgroundColor: PALETTE.primaryGreen,
  },
  table: {
    rowColor1: PALETTE.primaryGreen,
    rowColor2: PALETTE.lightGray,
  },
  flexboxSizes: {
    headerContainerSmall: 0.15,
    headerContainerMedium: 0.2,
    headerContainerLarge: 0.25,
  },
  investCard: {
    backgroundColor: "#1F302B",
  },
  searchbar: {
    color: {
      background: PALETTE.smokeWhite,
      borderBottom: PALETTE.primaryGreen,
    },
    borderBottomWidth: 1,
  },
  searchResults: {
    color: {
      background: PALETTE.primaryGreen,
      border: PALETTE.smokeWhite,
    },
  },
  snackbar: {
    color: {
      background: PALETTE.primaryGreen,
      border: PALETTE.smokeWhite,
    },
    text: {
      color: PALETTE.smokeWhite,
    },
  },
  animatedFAB: {
    color: { background: PALETTE.smokeWhite },
  },
  activityIndicator: {
    color: {
      primary: PALETTE.primaryGreen,
    },
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

export const customRNPaperTheme = {
  ...DefaultTheme,

  colors: {
    primary: PALETTE.primaryGreen,
  },
};

export const LIGHT_THEME = {
  ...THEME,
  colors: {
    background: PALETTE.cokeWhite,
    foreground: PALETTE.primaryGreen,
    text: PALETTE.primaryGreen,
  },
};
