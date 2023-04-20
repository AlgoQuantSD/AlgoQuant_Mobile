import { Image, StyleSheet, Text, View } from "react-native";
import { THEME } from "../../../../general_constants/theme/Theme";

export default function WelcomeSlide(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../../../../assets/investor_avatars/avatar0.png")}
          />
        </View>
        <Text style={styles.headerText}>Welcome to AlgoQuant!</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>
          AlgoQuant aims to make Algorithmic Trading more available to
          non-professional individual investors (retail investors). AlgoQuant
          currently uses Paper Trading, that means no real money is at stake.
        </Text>
        <Image
          style={{ height: 50, width: 50, alignSelf: "center" }}
          source={require("../../../../../assets/app_json_icons/app-icon.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: "2%",
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.background,
  },
  imageContainer: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#334F47",
    backgroundColor: "#334F47",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "600",
    color: THEME.text.color.secondary,
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
});
