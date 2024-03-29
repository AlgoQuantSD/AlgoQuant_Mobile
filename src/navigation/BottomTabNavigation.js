import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { React, useMemo, useState } from "react";
import InvestorListContext from "../components/main_screens/home/create_investor/context/InvestorListContext";
import AlgoquantApiContext from "../general_constants/api/apiContext";
import initAlgoQuantApi from "../general_constants/api/apiUtils";
import { THEME } from "../general_constants/theme/Theme";
import { BottomTabIcon } from "./NavigationHelpers";
import {
  BacktestingScreenStackNavigator,
  HomeScreenStackNavigator,
  ProfileScreenStackNavigator,
  SearchScreenStackNavigator,
} from "./StackNavigation";
const Tab = createBottomTabNavigator();

// This is the bottom tab nav you see in the app
// There are some settings in the Tab.Navigator for general styling
// In Tab.Screen we specify route names, name of the component we want to render in that tab, and icon styling
export default function BottomTabNavigation() {
  // Utilizing amplify's useAuthenticator hook to access logged in user information
  const { user } = useAuthenticator((context) => [context.user]);
  const [investorListRefresh, setInvestorListRefresh] = useState(false);

  // Create Algoquant object, used to access algoquant SDK api
  let algoquant = undefined;
  try {
    algoquant = initAlgoQuantApi(user);
  } catch (err) {}

  const memoizedInvestorListContextValue = useMemo(() => {
    return { investorListRefresh, setInvestorListRefresh };
  }, [investorListRefresh, setInvestorListRefresh]);

  return (
    // Context Provider allowing access to the algoquant to any child component of the provider
    <AlgoquantApiContext.Provider value={algoquant}>
      <InvestorListContext.Provider value={memoizedInvestorListContextValue}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: THEME.bottomTab.tabActiveColor,
            tabBarInactiveTintColor: THEME.bottomTab.tabInactiveColor,
            tabBarStyle: {
              backgroundColor: THEME.bottomTab.backgroundColor,
              borderTopColor: THEME.bottomTab.topBorderColor,
              borderTopWidth: THEME.bottomTab.topBorderWidth,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreenStackNavigator}
            options={{
              tabBarIcon: ({ color, size, name = "home" }) =>
                BottomTabIcon({ color, size, name }),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreenStackNavigator}
            options={{
              tabBarIcon: ({ color, size, name = "search" }) =>
                BottomTabIcon({ color, size, name }),
            }}
          />
          <Tab.Screen
            name="Backtesting"
            component={BacktestingScreenStackNavigator}
            options={{
              tabBarIcon: ({ color, size, name = "flask" }) =>
                BottomTabIcon({ color, size, name }),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreenStackNavigator}
            options={{
              tabBarIcon: ({ color, size, name = "person" }) =>
                BottomTabIcon({ color, size, name }),
            }}
          />
        </Tab.Navigator>
      </InvestorListContext.Provider>
    </AlgoquantApiContext.Provider>
  );
}
