import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import InvestItemList from "../reusable_components/InvestItemList";
import JobsAndHistoryItemList from "../reusable_components/JobsAndHistoryItemList";
import { THEME } from "../../constants/Theme";

export default function InvestCarousel(props) {
  const {
    handlePressInTouchableElement,
    handlePressOutTouchableElement,
    navigation,
  } = props;
  // Options for the carousel tabs
  const carouselOptions = [
    { name: "Investors", key: "CAROUSEL_TAB_INVESTORS", index: 0 },
    { name: "Jobs", key: "CAROUSEL_TAB_JOBS", index: 1 },
    { name: "History", key: "CAROUSEL_TAB_HISTORY", index: 2 },
  ];
  // Filler data until we can get real data through API
  const mockInvestors = [
    {
      name: "Warren Buffet",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      profitStop: "20%",
      lossStop: "30%",
      imageId: 0,
      id: 0,
    },
    {
      name: "Heinous Investor",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      profitStop: "50%",
      lossStop: "90%",
      imageId: 1,
      id: 1,
    },
    {
      name: "Your Mom",
      indicators: ["RSI", "MACD", "OBV"],
      stocks: ["AMZN", "APPL", "GOOGL", "SPOT"],
      profitStop: "20%",
      lossStop: "30%",
      imageId: 1,
      id: 2,
    },
  ];
  const mockJobs = [
    {
      name: "Job1",
      investor: { name: "Warren Buffet", imageId: 0 },
      balance: 191.41,
      percentChange: 4.1,
      id: 0,
    },
    {
      name: "Job2",
      investor: { name: "Heinous Investor", imageId: 1 },
      balance: 252.23,
      percentChange: 5.2,
      id: 1,
    },
    {
      name: "Job3",
      investor: { name: "Warren Buffet", imageId: 0 },
      balance: 90.21,
      percentChange: -3.1,
      id: 2,
    },
  ];

  const mockHistory = [
    {
      name: "Job3",
      investor: { name: "Warren Buffet", imageId: 0 },
      balance: 90.21,
      percentChange: -3.1,
      id: 0,
    },
    {
      name: "Job2",
      investor: { name: "Heinous Investor", imageId: 1 },
      balance: 252.23,
      percentChange: 5.2,
      id: 1,
    },
    {
      name: "Job1",
      investor: { name: "Warren Buffet", imageId: 0 },
      balance: 191.41,
      percentChange: 4.1,
      id: 2,
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  // Keeps track of which carousel option is selected
  const [selectedCarouselOptionIndex, setSelectedCarouselOptionIndex] =
    useState(0);
  // Keeps track of what data we should pass into either the investor card or job and history list
  const [listData, setListData] = useState(mockInvestors);
  const [swipeDirection, setSwipeDirection] = useState(null);
  // Track the swipe translation in the x direction
  const [translationX, setTranslationX] = useState(0);

  // Handles what happens when the user presses one of the carousel tabs or swipes left or right inside of the component
  function handleCarouselOptionChange(index) {
    setIsLoading(true);
    setSelectedCarouselOptionIndex(index);
    switch (index) {
      case 0:
        setListData(mockInvestors);
        break;
      case 1:
        setListData(mockJobs);
        break;
      case 2:
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
      {/* Handles left and right swipe interactions on the carousel */}
      <GestureHandlerRootView>
        <PanGestureHandler
          onGestureEvent={(event) => {
            setTranslationX(event.nativeEvent.translationX);
          }}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state === State.END) {
              if (
                translationX > 0 &&
                Math.abs(translationX) >
                  Math.abs(event.nativeEvent.translationY) &&
                swipeDirection !== "right"
              ) {
                console.log("RIGHT SWIPE");
                setSwipeDirection("right");
                if (selectedCarouselOptionIndex === 0) {
                  handleCarouselOptionChange(carouselOptions.length - 1);
                } else {
                  handleCarouselOptionChange(selectedCarouselOptionIndex - 1);
                }
              } else if (
                translationX < 0 &&
                Math.abs(translationX) >
                  Math.abs(event.nativeEvent.translationY) &&
                swipeDirection !== "left"
              ) {
                console.log("LEFT SWIPE");
                setSwipeDirection("left");
                if (
                  selectedCarouselOptionIndex ===
                  carouselOptions.length - 1
                ) {
                  handleCarouselOptionChange(0);
                } else {
                  handleCarouselOptionChange(selectedCarouselOptionIndex + 1);
                }
              }
              setSwipeDirection(null);
              setTranslationX(0);
            }
          }}
        >
          <View>
            <View style={styles.carouselOptionRow}>
              {carouselOptions.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => handleCarouselOptionChange(item.index)}
                  hitSlop={{ top: 30, bottom: 30 }}
                  style={styles.carouselHeader}
                >
                  <Text
                    style={
                      item.key ===
                      carouselOptions[selectedCarouselOptionIndex].key
                        ? styles.selectedCarouselOption
                        : styles.text
                    }
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {carouselOptions[selectedCarouselOptionIndex].key ===
            "CAROUSEL_TAB_INVESTORS" ? (
              <InvestItemList
                listData={listData}
                isLoading={isLoading}
                handlePressInTouchableElement={handlePressInTouchableElement}
                handlePressOutTouchableElement={handlePressOutTouchableElement}
                navigation={navigation}
              />
            ) : (
              <JobsAndHistoryItemList
                listData={listData}
                isLoading={isLoading}
                type={carouselOptions[selectedCarouselOptionIndex].key}
                handlePressInTouchableElement={handlePressInTouchableElement}
                handlePressOutTouchableElement={handlePressOutTouchableElement}
              />
            )}
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
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
