import { Image, StyleSheet, Text, View } from "react-native";
import { THEME } from "../../../../../general_constants/theme/Theme";

export default function WelcomeHeader(props) {
  const { title, image } = props;
  return (
    <View style={styles.headerContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
