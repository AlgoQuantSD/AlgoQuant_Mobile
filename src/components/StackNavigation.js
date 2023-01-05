import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./main_screens/HomeScreen";
import InvestorScreen from "./nested_screens/InvestorScreen";
import JobScreen from "./nested_screens/JobScreen";
import SearchScreen from "./main_screens/SearchScreen";
import StockInfoScreen from "./nested_screens/StockInfoScreen";
import BacktestingScreen from "./main_screens/BacktestingScreen";
import CreateBacktestScreen from "./nested_screens/CreateBacktestScreen";
import BacktestResultsScreen from "./nested_screens/BacktestResultsScreen";
import ProfileScreen from "./main_screens/ProfileScreen";
import UpdateCredentialsScreen from "./nested_screens/UpdateCredentialsScreen";
import TradeHistoryScreen from "./nested_screens/TradeHistoryScreen";
import { nestedScreenOptions } from "../constants/Theme";

const Stack = createStackNavigator();

// Here we specify all of our main screens such as the home screen and all the nested screens that live within the main screens
export function HomeScreenStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black", borderBottomWidth: 0 },
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
        options={nestedScreenOptions}
      />
      <Stack.Screen
        name="JobScreen"
        component={JobScreen}
        options={nestedScreenOptions}
      />
    </Stack.Navigator>
  );
}

export function SearchScreenStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black", borderBottomWidth: 0 },
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
        headerStyle: { backgroundColor: "black", borderBottomWidth: 0 },
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
        options={nestedScreenOptions}
      />
    </Stack.Navigator>
  );
}

export function ProfileScreenStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black", borderBottomWidth: 0 },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateCredentialsScreen"
        component={UpdateCredentialsScreen}
        options={nestedScreenOptions}
      />
      <Stack.Screen
        name="TradeHistoryScreen"
        component={TradeHistoryScreen}
        options={nestedScreenOptions}
      />
    </Stack.Navigator>
  );
}
