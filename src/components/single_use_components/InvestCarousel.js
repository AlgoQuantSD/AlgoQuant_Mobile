import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { THEME } from "../../constants/Theme";

export default function InvestCarousel() {
  const carouselOptions = [
    { name: "Investors", key: "CAROUSEL_TAB_INVESTORS" },
    { name: "Jobs", key: "CAROUSEL_TAB_JOBS" },
    { name: "History", key: "HISTORY" },
  ];

  const [selectedCarouselOption, setSelectedCarouselOption] = useState(
    "CAROUSEL_TAB_INVESTORS"
  );
  return (
    <View style={styles.container}>
      {carouselOptions.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => setSelectedCarouselOption(item.key)}
          hitSlop={{ top: 30, bottom: 30 }}
          style={styles.carouselHeader}
        >
          <Text
            style={
              item.key === selectedCarouselOption
                ? styles.selectedCarouselOption
                : styles.text
            }
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  headerText: {
    fontSize: THEME.text.fontSizeH1,
    color: THEME.text.color,
  },
  carouselHeader: {
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  selectedCarouselOption: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.primary,
    textDecorationLine: "underline",
  },
});
