import { Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { THEME } from "../../../../general_constants/theme/Theme";
import WelcomeHeader from "./subcomponents/WelcomeHeader";

export default function DemoSlide(props) {
  const { name, headerImage, demoImages } = props;
  return (
    <View style={styles.container}>
      <WelcomeHeader title={name} image={headerImage} />
      <View style={styles.carouselContainer}>
        <Swiper
          showsButtons={false}
          showsPagination={false}
          autoplay={true}
          autoplayTimeout={5}
          loop={true}
        >
          {/* Loop through all the demo images and render them along with their text caption */}
          {demoImages.map((item) => (
            <View key={item.id}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.caption}</Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  carouselContainer: {
    height: "66%",
    width: "66%",
    backgroundColor: "#334F47",
    margin: "5%",
    padding: "2%",
    alignSelf: "center",
    borderRadius: 10,
  },
  imageContainer: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "90%",
    width: "90%",
    resizeMode: "contain",
  },
  textContainer: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    width: "100%",
    maxWidth: "85%",
    fontSize: 12,
    fontWeight: "200",
    textAlign: "center",
    color: THEME.text.color.secondary,
  },
});
