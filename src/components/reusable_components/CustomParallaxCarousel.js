import React from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

export default function CustomParallaxCarousel(props) {
  const { data } = props;
  const width = Dimensions.get("window").width;
  return (
    <Animated.View
      entering={BounceIn.delay(500)}
      exiting={BounceOut}
      style={{ flex: 1, backgroundColor: "purple" }}
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
              backgroundColor: "blue",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </Animated.View>
  );
}
