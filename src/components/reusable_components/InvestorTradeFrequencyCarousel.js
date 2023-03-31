import React, { useState, useEffect } from "react";
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
  NUM_INVESTOR_IMAGES_PER_FREQ,
  INVESTOR_IMAGE_BASE_URL,
} from "../../constants/InvestorImagePaths";
import { THEME } from "../../constants/Theme";

export default function InvestorTradeFrequencyCarousel(props) {
  const { data, selectedFrequency, setSelectedFrequency, setImageId } = props;
  const width = Dimensions.get("window").width;
  console.log("Investor item: ", data);

  // Set random investor images
  const [investorImageDayHighFreq, setInvestorImageDayHighFreq] = useState(
    Math.floor(Math.random() * NUM_INVESTOR_IMAGES_PER_FREQ) + 1
  );
  const [investorImageDayLowFreq, setInvestorImageDayLowFreq] = useState(
    Math.floor(Math.random() * NUM_INVESTOR_IMAGES_PER_FREQ) + 1
  );
  const [investorImageSwingHighFreq, setInvestorImageSwingHighFreq] = useState(
    Math.floor(Math.random() * NUM_INVESTOR_IMAGES_PER_FREQ) + 1
  );
  const [investorImageSwingLowFreq, setInvestorImageSwingLowFreq] = useState(
    Math.floor(Math.random() * NUM_INVESTOR_IMAGES_PER_FREQ) + 1
  );
  const [investorImageLongHighFreq, setInvestorImageLongHighFreq] = useState(
    Math.floor(Math.random() * NUM_INVESTOR_IMAGES_PER_FREQ) + 1
  );
  const [investorImageLongLowFreq, setInvestorImageLongLowFreq] = useState(
    Math.floor(Math.random() * NUM_INVESTOR_IMAGES_PER_FREQ) + 1
  );

  // Assign values for selected frequency and the investor image in the investor object
  function handleSelectFrequency(freq) {
    console.log("Selected freq: ", freq);
    setSelectedFrequency(freq);
    setImageId(
      INVESTOR_IMAGE_BASE_URL +
        "/" +
        freq +
        "/" +
        getInvestorImageNumber(freq) +
        ".png"
    );
  }
  // Get the correct investor image based on trade frequency
  function getInvestorImageNumber(freq) {
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

  // Set the image id in the case that the user doesnt change their trade frequency
  useEffect(() => {
    setImageId(
      INVESTOR_IMAGE_BASE_URL + "/30_min/" + investorImageDayHighFreq + ".png"
    );
  }, []);
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
                source={{
                  uri:
                    INVESTOR_IMAGE_BASE_URL +
                    "/" +
                    item.value +
                    "/" +
                    getInvestorImageNumber(item.value) +
                    ".png",
                }}
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
                    color={THEME.icon.color.primary}
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
    borderWidth: 2,
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.primary,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
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
    flex: 0.225,
    padding: "2%",
    backgroundColor: THEME.colors.ternary,
  },
  footerRow: {
    flex: 0.125,
    backgroundColor: THEME.colors.ternary,
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
