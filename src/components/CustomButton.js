import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Theme } from "../constants/Theme";

export default function CustomButton(props) {
  const { label, action } = props;
  return (
    <TouchableOpacity onPress={action} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    ...Theme.button,
  },
  buttonText: {
    fontSize: Theme.text.fontSizeButton,
    color: Theme.text.color,
  },
});
