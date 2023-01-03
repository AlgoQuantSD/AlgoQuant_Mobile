import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./main_screens/HomeScreen";
import InvestorScreen from "./nested_screens/InvestorScreen";

const Stack = createStackNavigator();

export default function HomeScreenStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="InvestorScreen" component={InvestorScreen} />
    </Stack.Navigator>
  );
}
