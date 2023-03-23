import React, { useState } from "react";
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
import { INVESTOR_PERIOD_ENUM } from "../../constants/InvestorPeriodEnums";
import {
  INVESTOR_IMAGE_DAY_HIGH_FREQ,
  INVESTOR_IMAGE_DAY_LOW_FREQ,
  INVESTOR_IMAGE_SWING_HIGH_FREQ,
  INVESTOR_IMAGE_SWING_LOW_FREQ,
  INVESTOR_IMAGE_LONG_HIGH_FREQ,
  INVESTOR_IMAGE_LONG_LOW_FREQ,
} from "../../constants/InvestorImagePaths";
import { THEME } from "../../constants/Theme";

export default function InvestorTradeFrequencyCarousel(props) {
  const { data, selectedFrequency, setSelectedFrequency, setImageId } = props;
  const width = Dimensions.get("window").width;
  console.log("Investor item: ", data);

  // Set random investor images
  const [investorImageDayHighFreq, setInvestorImageDayHighFreq] = useState(
    INVESTOR_IMAGE_DAY_HIGH_FREQ[
      Math.floor(Math.random() * INVESTOR_IMAGE_DAY_HIGH_FREQ.length)
    ]
  );
  const [investorImageDayLowFreq, setInvestorImageDayLowFreq] = useState(
    INVESTOR_IMAGE_DAY_LOW_FREQ[
      Math.floor(Math.random() * INVESTOR_IMAGE_DAY_LOW_FREQ.length)
    ]
  );
  const [investorImageSwingHighFreq, setInvestorImageSwingHighFreq] = useState(
    INVESTOR_IMAGE_SWING_HIGH_FREQ[
      Math.floor(Math.random() * INVESTOR_IMAGE_SWING_HIGH_FREQ.length)
    ]
  );
  const [investorImageSwingLowFreq, setInvestorImageSwingLowFreq] = useState(
    INVESTOR_IMAGE_SWING_LOW_FREQ[
      Math.floor(Math.random() * INVESTOR_IMAGE_SWING_LOW_FREQ.length)
    ]
  );
  const [investorImageLongHighFreq, setInvestorImageLongHighFreq] = useState(
    INVESTOR_IMAGE_LONG_HIGH_FREQ[
      Math.floor(Math.random() * INVESTOR_IMAGE_LONG_HIGH_FREQ.length)
    ]
  );
  const [investorImageLongLowFreq, setInvestorImageLongLowFreq] = useState(
    INVESTOR_IMAGE_LONG_LOW_FREQ[
      Math.floor(Math.random() * INVESTOR_IMAGE_LONG_LOW_FREQ.length)
    ]
  );

  // Assign values for selected frequency and the investor image in the investor object
  function handleSelectFrequency(freq) {
    console.log("Selected freq: ", freq);
    setSelectedFrequency(freq);
    setImageId(getInvestorImage(freq));
  }
  // Get the correct investor image based on trade frequency
  function getInvestorImage(freq) {
    console.log("Period: ", freq);
    switch (freq) {
      case INVESTOR_PERIOD_ENUM.DAY_HIGH_FREQ:
        return investorImageDayHighFreq;
      case INVESTOR_PERIOD_ENUM.DAY_LOW_FREQ:
        return investorImageDayLowFreq;
      case INVESTOR_PERIOD_ENUM.SWING_HIGH_FREQ:
        return investorImageSwingHighFreq;
      case INVESTOR_PERIOD_ENUM.SWING_LOW_FREQ:
        return investorImageSwingLowFreq;
      case INVESTOR_PERIOD_ENUM.LONG_HIGH_FREQ:
        return investorImageLongHighFreq;
      case INVESTOR_PERIOD_ENUM.LONG_LOW_FREQ:
        return investorImageLongLowFreq;
    }
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
                source={{ uri: getInvestorImage(item.value) }}
              />
            </View>
            <View style={styles.tradeFrequencyDescriptionContainer}>
              <Text style={styles.text}>{item.description}</Text>
            </View>
            <View style={styles.footerRow}>
              <TouchableOpacity
                hitSlop={{ top: 30, bottom: 30, left: 30 }}
                onPress={() => handleSelectFrequency(item.value)}
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
    width: "30%",
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
