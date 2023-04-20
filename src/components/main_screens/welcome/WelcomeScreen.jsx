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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome To AlgoQuant!</Text>
      </View>

      <Swiper
        showsButtons={true}
        autoplay={false}
        loop={false}
        activeDotColor={THEME.colors.primary}
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

      <View style={styles.getStartedButton}>
        <Button
          buttonColor={THEME.button.primaryColorBackground}
          textColor={THEME.text.color.secondary}
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
  container: { flex: 1, backgroundColor: THEME.colors.background },
  headerContainer: { alignItems: "center" },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "600",
    color: THEME.text.color.primary,
  },
  getStartedButton: {
    width: "60%",
    alignSelf: "center",
  },
});
