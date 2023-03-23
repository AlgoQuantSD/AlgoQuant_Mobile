import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { THEME } from "../../constants/Theme";

export default function CustomParallaxCarousel(props) {
  const { data } = props;
  const width = Dimensions.get("window").width;
  return (
    <Animated.View
      entering={BounceIn.delay(500)}
      exiting={BounceOut}
      style={{ flex: 1 }}
    >
      <Carousel
        loop
        width={width}
        height={width / 2}
        mode="parallax"
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    justifyContent: "center",
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.indicatorAndStockCards.backgroundColor,
  },
  text: {
    textAlign: "center",
    color: THEME.text.color.secondary,
    fontSize: THEME.text.fontSize.H3,
  },
});
