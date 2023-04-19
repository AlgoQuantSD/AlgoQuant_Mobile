import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { THEME } from "../../../general_constants/theme/Theme";

export default function CustomParallaxCarousel(props) {
  const { data, height, width } = props;
  const defaultWidth = Dimensions.get("window").width;
  return (
    <Animated.View
      entering={FadeInUp.delay(500)}
      exiting={FadeOutDown}
      style={{ flex: 1, alignItems: "center" }}
    >
      <Carousel
        loop
        width={width ? width : defaultWidth}
        height={height ? height : defaultWidth / 2}
        mode="parallax"
        data={data}
        scrollAnimationDuration={1000}
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
