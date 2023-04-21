import { Image, StyleSheet, Text, View } from "react-native";
import AppIcon from "../../../../../assets/app_json_icons/app-icon.png";
import HeaderImage from "../../../../../assets/investor_avatars/avatar0.png";
import { THEME } from "../../../../general_constants/theme/Theme";
import WelcomeHeader from "./subcomponents/WelcomeHeader";

export default function WelcomeSlide() {
  return (
    <View style={styles.container}>
      <WelcomeHeader title="Welcome to AlgoQuant!" image={HeaderImage} />
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>
          AlgoQuant aims to make Algorithmic Trading more available to
          non-professional individual investors (retail investors). AlgoQuant
          currently uses Paper Trading, that means no real money is at stake.
        </Text>
        <Image style={styles.appIconImage} source={AppIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  bodyContainer: {
    width: "60%",
    marginTop: "5%",
    padding: "2%",
    borderWidth: 3,
    borderColor: "#334F47",
    backgroundColor: THEME.colors.ternary,
  },
  bodyText: {
    fontSize: THEME.text.fontSize.body,
    fontWeight: "200",
    color: THEME.text.color.primary,
    textAlign: "center",
  },
  appIconImage: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
});
