import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

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
    ...THEME.button,
  },
  buttonText: {
    fontSize: THEME.text.fontSizeButton,
    color: THEME.text.color,
  },
});
