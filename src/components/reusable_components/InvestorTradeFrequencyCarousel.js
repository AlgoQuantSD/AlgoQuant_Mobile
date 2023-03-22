import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Ionicons } from "@expo/vector-icons";
import { investorImagePathList } from "../../constants/InvestorImagePaths";
import { THEME } from "../../constants/Theme";

export default function InvestorTradeFrequencyCarousel(props) {
  const { data, selectedFrequency, setSelectedFrequency, setImageId } = props;
  const width = Dimensions.get("window").width;
  console.log("Selected frequency: ", selectedFrequency);

  function handleSelectFrequency(freq, imageId) {
    setSelectedFrequency(freq);
    setImageId(imageId);
  }
  return (
    <Animated.View
      entering={BounceIn.delay(500)}
      exiting={BounceOut}
      style={{ flex: 1 }}
    >
      <Carousel
        loop
        width={width}
        height={width / 1.2}
        mode="parallax"
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.headerRowContainer}>
              <Text style={styles.headerText}>{item.name}</Text>
            </View>
            <View style={styles.investorImageContainer}>
              <Image
                style={styles.investorImage}
                source={investorImagePathList[item.imageId]}
              />
            </View>
            <View style={styles.tradeFrequencyDescriptionContainer}>
              <Text style={styles.text}>{item.description}</Text>
            </View>
            <View style={styles.footerRow}>
              <TouchableOpacity
                hitSlop={{ top: 30, bottom: 30, left: 30 }}
                onPress={() => handleSelectFrequency(item.value, item.imageId)}
              >
                {item.value === selectedFrequency ? (
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.selectedFrequencyText}>Selected</Text>
                    <Ionicons
                      name={THEME.icon.name.selectOptionCircleFilledIn}
                      color={THEME.icon.color.ternary}
                      size={THEME.icon.size.medium}
                    />
                  </View>
                ) : (
                  <Ionicons
                    name={THEME.icon.name.selectOptionCircleOutline}
                    color={THEME.icon.color.secondary}
                    size={THEME.icon.size.medium}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.indicatorAndStockCards.backgroundColor,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.secondary,
  },
  headerText: {
    textAlign: "center",
    color: THEME.text.color.secondary,
    fontSize: THEME.text.fontSize.H3,
  },
  headerRowContainer: {
    flex: 0.15,
    justifyContent: "center",
  },
  investorImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: THEME.colors.background,
  },
  investorImage: {
    justifyContent: "center",
    height: "100%",
    width: "25%",
  },
  tradeFrequencyDescriptionContainer: {
    flex: 0.2,
    justifyContent: "center",
    paddingLeft: "1%",
    paddingRight: "1%",
  },
  footerRow: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: "1%",
  },
  selectedFrequencyText: {
    alignSelf: "center",
    paddingRight: "2%",
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.ternary,
  },
});
