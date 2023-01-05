import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreenStackNavigator,
  SearchScreenStackNavigator,
  BacktestingScreenStackNavigator,
  ProfileScreenStackNavigator,
} from "./StackNavigation";
import BottomTabIcon from "./BottomTabIcon";
import { Theme } from "../constants/Theme";

const Tab = createBottomTabNavigator();

// This is the bottom tab nav you see in the app
// There are some settings in the Tab.Navigator for general styling
// In Tab.Screen we specify route names, name of the component we want to render in that tab, and icon styling
export default function BottomTabNavigaton() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.bottomTab.tabActiveColor,
        tabBarInactiveTintColor: Theme.bottomTab.tabInactiveColor,
        tabBarStyle: {
          backgroundColor: Theme.bottomTab.backgroundColor,
          borderTopColor: Theme.bottomTab.topBorderColor,
          borderTopWidth: Theme.bottomTab.topBorderWidth,
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
  );
}
