import { React, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreenStackNavigator,
  SearchScreenStackNavigator,
  BacktestingScreenStackNavigator,
  ProfileScreenStackNavigator,
} from "./StackNavigation";
import { BottomTabIcon } from "./NavigationHelpers";
import { THEME } from "../../constants/Theme";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import initAlgoQuantApi from "../../constants/ApiUtils";
import AlgoquantApiContext from "../../constants/ApiContext";

const Tab = createBottomTabNavigator();

// This is the bottom tab nav you see in the app
// There are some settings in the Tab.Navigator for general styling
// In Tab.Screen we specify route names, name of the component we want to render in that tab, and icon styling
export default function BottomTabNavigaton() {
  const { user } = useAuthenticator((context) => [context.user]);
  let algoquant = undefined;
  try {
    algoquant = initAlgoQuantApi(user);
  } catch (err) {
    console.log(err);
  }
  return (
    <AlgoquantApiContext.Provider value={algoquant}>
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
    </AlgoquantApiContext.Provider>
  );
}
