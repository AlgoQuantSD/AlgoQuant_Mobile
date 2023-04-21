import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Swiper from "react-native-swiper";
import InvestorHeaderImage from "../../../../assets/investor_avatars/avatar2.png";
import BacktestingHeaderImage from "../../../../assets/investor_avatars/avatar3.png";
import JobsHeaderImage from "../../../../assets/investor_avatars/avatar4.png";
import PaperTradingHeaderImage from "../../../../assets/investor_avatars/avatar5.png";
import { THEME } from "../../../general_constants/theme/Theme";
import { handleWelcomeScreenCompleted } from "./helpers/welcomScreenState";
import DemoSlide from "./slides/DemoSlide";
import FeaturesSlide from "./slides/FeaturesSlide";
import WelcomeSlide from "./slides/WelcomeSlide";
import {
  DEMO_IMAGES_BACKTESTING,
  DEMO_IMAGES_INVESTOR,
} from "./slides/constants/demoImageList";

export default function WelcomeScreen(props) {
  const { setShowWelcomeScreen } = props;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      {/* Carousel control */}
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
        {/* Slides */}
        <WelcomeSlide />
        <FeaturesSlide />
        <DemoSlide
          name="Investor"
          headerImage={InvestorHeaderImage}
          demoImages={DEMO_IMAGES_INVESTOR}
        />
        <DemoSlide
          name="Backtesting"
          headerImage={BacktestingHeaderImage}
          demoImages={DEMO_IMAGES_BACKTESTING}
        />
        <DemoSlide
          name="Jobs"
          headerImage={JobsHeaderImage}
          demoImages={DEMO_IMAGES_INVESTOR}
        />
        <DemoSlide
          name="Paper Trading"
          headerImage={PaperTradingHeaderImage}
          demoImages={DEMO_IMAGES_INVESTOR}
        />
      </Swiper>
      {/* Get started button */}
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
