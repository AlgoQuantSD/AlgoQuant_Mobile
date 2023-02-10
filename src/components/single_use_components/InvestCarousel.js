import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import InvestItemList from "../reusable_components/InvestItemList";
import { THEME } from "../../constants/Theme";

export default function InvestCarousel() {
  // Options for the carousel tabs
  const carouselOptions = [
    { name: "Investors", key: "CAROUSEL_TAB_INVESTORS" },
    { name: "Jobs", key: "CAROUSEL_TAB_JOBS" },
    { name: "History", key: "CAROUSEL_TAB_HISTORY" },
  ];
  // Filler data until we can get real data through API
  const mockInvestors = [
    {
      name: "Warren Buffet",
      imageId: 1,
      id: 0,
    },
    {
      name: "Bill Gates",
      imageId: 2,
      id: 1,
    },
    {
      name: "Your Mom",
      imageId: 1,
      id: 2,
    },
  ];
  const mockJobs = [
    {
      name: "Job1",
      investorName: "Warren Buffet",
      imageId: 1,
      id: 0,
    },
    {
      name: "Job2",
      investorName: "Bill Gates",
      imageId: 2,
      id: 1,
    },
    {
      name: "Job3",
      investorName: "Your Mom",
      imageId: 1,
      id: 2,
    },
  ];

  const mockHistory = [
    {
      name: "Job3",
      investorName: "Warren Buffet",
      imageId: 1,
      id: 0,
    },
    {
      name: "Job2",
      investorName: "Bill Gates",
      imageId: 2,
      id: 1,
    },
    {
      name: "Job1",
      investorName: "Your Mom",
      imageId: 1,
      id: 2,
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCarouselOption, setSelectedCarouselOption] = useState(
    "CAROUSEL_TAB_INVESTORS"
  );
  const [listData, setListData] = useState(mockInvestors);

  // When the user switches carousel tabs
  function handleCarouselOptionPress(option) {
    setIsLoading(true);
    setSelectedCarouselOption(option);
    switch (option) {
      case "CAROUSEL_TAB_INVESTORS":
        setListData(mockInvestors);
        break;
      case "CAROUSEL_TAB_JOBS":
        setListData(mockJobs);
        break;
      case "CAROUSEL_TAB_HISTORY":
        setListData(mockHistory);
        break;
      default:
        setListData(mockInvestors);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  return (
    <View>
      <View style={styles.carouselOptionRow}>
        {carouselOptions.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => handleCarouselOptionPress(item.key)}
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
      <InvestItemList listData={listData} isLoading={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselOptionRow: {
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
