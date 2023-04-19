import { Ionicons } from "@expo/vector-icons";

// This function is necessary because components shouldn't be defined during render
// This allows us to send the icon to the bottom tab navigator with no performance issues
export function BottomTabIcon(props) {
  const { color, size, name } = props;
  return <Ionicons name={name} size={size} color={color} />;
}

// Options for the top nav area which appears only in nested screens
export const nestedScreenOptions = {
  title: "",
  headerBackTitle: "Back",
  headerTintColor: "white",
  headerBackImage: () => (
    <Ionicons name="chevron-back" color="white" size={24} />
  ),
};
