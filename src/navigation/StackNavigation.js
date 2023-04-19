import { createStackNavigator } from "@react-navigation/stack";
import BacktestingScreen from "../components/main_screens/backtesting/BacktestingScreen";
import CreateBacktestScreen from "../components/main_screens/backtesting/create/CreateBacktestScreen";
import BacktestResultsScreen from "../components/main_screens/backtesting/results/BacktestResultsScreen";
import HomeScreen from "../components/main_screens/home/HomeScreen";
import CreateInvestorStep1Screen from "../components/main_screens/home/create_investor/CreateInvestorStep1Screen";
import CreateInvestorAIStep2Screen from "../components/main_screens/home/create_investor/ai/CreateInvestorAIStep2Screen";
import CreateInvestorAIStep3Screen from "../components/main_screens/home/create_investor/ai/CreateInvestorAIStep3Screen";
import CreateInvestorAlgorithmicStep2Screen from "../components/main_screens/home/create_investor/algorithmic/step2/CreateInvestorAlgorithmicStep2Screen";
import CreateInvestorAlgorithmicStep3Screen from "../components/main_screens/home/create_investor/algorithmic/step3/CreateInvestorAlgorithmicStep3Screen";
import CreateInvestorAlgorithmicStep4Screen from "../components/main_screens/home/create_investor/algorithmic/step4/CreateInvestorAlgorithmicStep4Screen";
import InvestorScreen from "../components/main_screens/home/invest/investor/InvestorScreen";
import JobScreen from "../components/main_screens/home/invest/job/JobScreen";
import ProfileScreen from "../components/main_screens/profile/ProfileScreen";
import TradeHistoryScreen from "../components/main_screens/profile/options/TradeHistoryScreen";
import SearchScreen from "../components/main_screens/search/SearchScreen";
import StockInfoScreen from "../components/main_screens/search/results/StockInfoScreen";
import { THEME } from "../constants/Theme";
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
        name="CreateInvestorAIStep2Screen"
        component={CreateInvestorAIStep2Screen}
        options={{ ...nestedScreenOptions, title: "Create Investor Step 2" }}
      />
      <Stack.Screen
        name="CreateInvestorAlgorithmicStep3Screen"
        component={CreateInvestorAlgorithmicStep3Screen}
        options={{ ...nestedScreenOptions, title: "Create Investor Step 3" }}
      />
      <Stack.Screen
        name="CreateInvestorAIStep3Screen"
        component={CreateInvestorAIStep3Screen}
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
        options={{ ...nestedScreenOptions, title: "Stock Info" }}
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
        options={{ ...nestedScreenOptions, title: "Stock Info" }}
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
