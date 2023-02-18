import React from "react";
import { View, Text, Dimensions } from "react-native";
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
          <View
            style={{
              borderWidth: 1,
              justifyContent: "center",
              borderColor: THEME.colors.foreground,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: THEME.text.color,
                fontSize: THEME.text.fontSizeH3,
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </Animated.View>
  );
}
