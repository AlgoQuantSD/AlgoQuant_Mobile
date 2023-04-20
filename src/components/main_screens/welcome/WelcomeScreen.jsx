import { SafeAreaView, Text } from "react-native";
import { Button } from "react-native-paper";
import { THEME } from "../../../general_constants/theme/Theme";
import { handleWelcomeScreenCompleted } from "./helpers/welcomScreenState";

export default function WelcomeScreen(props) {
  const { setShowWelcomeScreen } = props;
  return (
    <SafeAreaView>
      <Text>Welcome Screen</Text>
      <Button
        buttonColor={THEME.button.primaryColorBackground}
        textColor={THEME.text.color.secondary}
        onPress={() => handleWelcomeScreenCompleted(setShowWelcomeScreen)}
        style={THEME.button.style}
      >
        Get Started
      </Button>
    </SafeAreaView>
  );
}
