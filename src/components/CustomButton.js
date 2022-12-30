import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/Theme";

export default function CustomButton(props) {
  return (
    <TouchableOpacity
      testID="customButton"
      onPress={props.action}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    ...Theme.button,
  },
  buttonText: {
    fontSize: Theme.text.fontSizeButton,
    color: Theme.text.color,
  },
});
