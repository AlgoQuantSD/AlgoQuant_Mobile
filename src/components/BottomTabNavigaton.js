import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./main_screens/HomeScreen";
import SearchScreen from "./main_screens/SearchScreen";
import BacktestingScreen from "./main_screens/BacktestingScreen";
import ProfileScreen from "./main_screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigaton() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Backtesting" component={BacktestingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
