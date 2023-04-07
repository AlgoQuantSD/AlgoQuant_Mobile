import { createStackNavigator } from "@react-navigation/stack";
import { THEME } from "../../constants/Theme";
import BacktestingScreen from "../main_screens/BacktestingScreen";
import HomeScreen from "../main_screens/HomeScreen";
import ProfileScreen from "../main_screens/ProfileScreen";
import SearchScreen from "../main_screens/SearchScreen";
import BacktestResultsScreen from "../nested_screens/backtesting/BacktestResultsScreen";
import CreateBacktestScreen from "../nested_screens/backtesting/CreateBacktestScreen";
import CreateInvestorAlgorithmicStep2Screen from "../nested_screens/home/CreateInvestorAlgorithmicStep2Screen";
import CreateInvestorAlgorithmicStep3Screen from "../nested_screens/home/CreateInvestorAlgorithmicStep3Screen";
import CreateInvestorAlgorithmicStep4Screen from "../nested_screens/home/CreateInvestorAlgorithmicStep4Screen";
import CreateInvestorSmartStep2Screen from "../nested_screens/home/CreateInvestorSmartStep2Screen";
import CreateInvestorSmartStep3Screen from "../nested_screens/home/CreateInvestorSmartStep3Screen";
import CreateInvestorStep1Screen from "../nested_screens/home/CreateInvestorStep1Screen";
import InvestorScreen from "../nested_screens/home/InvestorScreen";
import JobScreen from "../nested_screens/home/JobScreen";
import TradeHistoryScreen from "../nested_screens/profile/TradeHistoryScreen";
import StockInfoScreen from "../nested_screens/search/StockInfoScreen";
import { nestedScreenOptions } from "./NavigationHelpers";

const Stack = createStackNavigator();

// Here we specify all of our main screens such as the home screen and all the nested screens that live within the main screens
export function HomeScreenStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.topTabNavigator.color.background,
          borderBottomWidth: 0,
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvestorScreen"
        component={InvestorScreen}
        options={{ ...nestedScreenOptions, title: "Investor Details" }}
      />
      <Stack.Screen
        name="CreateInvestorStep1Screen"
        component={CreateInvestorStep1Screen}
        options={{ ...nestedScreenOptions, title: "Create Investor Step 1" }}
      />
      <Stack.Screen
        name="CreateInvestorAlgorithmicStep2Screen"
        component={CreateInvestorAlgorithmicStep2Screen}
        options={{ ...nestedScreenOptions, title: "Create Investor Step 2" }}
      />
      <Stack.Screen
        name="CreateInvestorSmartStep2Screen"
        component={CreateInvestorSmartStep2Screen}
        options={{ ...nestedScreenOptions, title: "Create Investor Step 2" }}
      />
      <Stack.Screen
        name="CreateInvestorAlgorithmicStep3Screen"
        component={CreateInvestorAlgorithmicStep3Screen}
        options={{ ...nestedScreenOptions, title: "Create Investor Step 3" }}
      />
      <Stack.Screen
        name="CreateInvestorSmartStep3Screen"
        component={CreateInvestorSmartStep3Screen}
        options={{
          ...nestedScreenOptions,
          title: "Create Investor Confirmation",
        }}
      />
      <Stack.Screen
        name="CreateInvestorAlgorithmicStep4Screen"
        component={CreateInvestorAlgorithmicStep4Screen}
        options={{
          ...nestedScreenOptions,
          title: "Create Investor Confirmation",
        }}
      />
      <Stack.Screen
        name="CreateBacktestScreen"
        component={CreateBacktestScreen}
        options={{ ...nestedScreenOptions, title: "Create a Backtest" }}
      />
      <Stack.Screen
        name="JobScreen"
        component={JobScreen}
        options={{ ...nestedScreenOptions, title: "Job Details" }}
      />
      <Stack.Screen
        name="StockInfoScreen"
        component={StockInfoScreen}
        options={nestedScreenOptions}
      />
    </Stack.Navigator>
  );
}

export function SearchScreenStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.topTabNavigator.color.background,
          borderBottomWidth: 0,
        },
      }}
    >
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockInfoScreen"
        component={StockInfoScreen}
        options={nestedScreenOptions}
      />
    </Stack.Navigator>
  );
}

export function BacktestingScreenStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.topTabNavigator.color.background,
          borderBottomWidth: 0,
        },
      }}
    >
      <Stack.Screen
        name="BacktestingScreen"
        component={BacktestingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateBacktestScreen"
        component={CreateBacktestScreen}
        options={nestedScreenOptions}
      />
      <Stack.Screen
        name="BacktestResultsScreen"
        component={BacktestResultsScreen}
        options={{ ...nestedScreenOptions, title: "Backtest Results" }}
      />
    </Stack.Navigator>
  );
}

export function ProfileScreenStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.topTabNavigator.color.background,
          borderBottomWidth: 0,
        },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TradeHistoryScreen"
        component={TradeHistoryScreen}
        options={nestedScreenOptions}
      />
    </Stack.Navigator>
  );
}
