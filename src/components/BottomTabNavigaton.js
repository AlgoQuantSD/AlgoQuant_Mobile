import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenStackNavigator from "./StackNavigation";
import SearchScreen from "./main_screens/SearchScreen";
import BacktestingScreen from "./main_screens/BacktestingScreen";
import ProfileScreen from "./main_screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigaton() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Backtesting"
        component={BacktestingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flask" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
