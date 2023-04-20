import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Swiper from "react-native-swiper";
import { THEME } from "../../../general_constants/theme/Theme";
import { handleWelcomeScreenCompleted } from "./helpers/welcomScreenState";

export default function WelcomeScreen(props) {
  const { setShowWelcomeScreen } = props;
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome To AlgoQuant!</Text>
      <Swiper
        showsButtons={true}
        autoplay={false}
        loop={false}
        activeDotColor={THEME.colors.primary}
        buttonWrapperStyle={{ color: "red" }}
        nextButton={
          <Text>
            <Ionicons
              name="chevron-forward"
              size={36}
              color={THEME.colors.primary}
            />
          </Text>
        }
        prevButton={
          <Text>
            <Ionicons
              name="chevron-back"
              size={36}
              color={THEME.colors.primary}
            />
          </Text>
        }
      >
        <View>
          <Text>Slide 1</Text>
        </View>
        <View>
          <Text>Slide 2</Text>
        </View>
        <View>
          <Text>Slide 3</Text>
        </View>
      </Swiper>
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

const styles = StyleSheet.create({
  container: { flex: 1, paddingLeft: "5%", paddingRight: "5%" },
});
