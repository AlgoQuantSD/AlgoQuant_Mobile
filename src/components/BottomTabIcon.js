import { Ionicons } from "@expo/vector-icons";

// This function is necessary because components shouldn't be defined during render
// This allows us to send the icon to the bottom tab navigator with no performance issues
export default function BottomTabIcon(props) {
  const { color, size, name } = props;
  return <Ionicons name={name} size={size} color={color} />;
}
