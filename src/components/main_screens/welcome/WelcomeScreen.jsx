import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Swiper from "react-native-swiper";
import { THEME } from "../../../general_constants/theme/Theme";
import { handleWelcomeScreenCompleted } from "./helpers/welcomScreenState";
import WelcomeSlide from "./slides/WelcomeSlide";

export default function WelcomeScreen(props) {
  const { setShowWelcomeScreen } = props;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Swiper
        showsButtons={true}
        autoplay={false}
        loop={false}
        activeDotColor={THEME.colors.background}
        nextButton={
          <Text>
            <Ionicons
              name="chevron-forward"
              size={36}
              color={THEME.colors.background}
            />
          </Text>
        }
        prevButton={
          <Text>
            <Ionicons
              name="chevron-back"
              size={36}
              color={THEME.colors.background}
            />
          </Text>
        }
      >
        <WelcomeSlide />
        <View>
          <Text>Slide 2</Text>
        </View>
        <View>
          <Text>Slide 3</Text>
        </View>
      </Swiper>

      <View style={styles.getStartedButton}>
        <Button
          buttonColor={THEME.button.color.secondary}
          textColor={THEME.text.color.primary}
          onPress={() => handleWelcomeScreenCompleted(setShowWelcomeScreen)}
          style={THEME.button.style}
        >
          Get Started
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.foreground },

  getStartedButton: {
    width: "60%",
    alignSelf: "center",
  },
});
