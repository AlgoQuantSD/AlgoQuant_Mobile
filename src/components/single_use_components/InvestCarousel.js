import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import InvestItemList from "../reusable_components/InvestItemList";
import JobsAndHistoryItemList from "../reusable_components/JobsAndHistoryItemList";
import {
  MOCK_INVESTORS,
  MOCK_JOBS,
  MOCK_HISTORY,
} from "../../constants/MockData";
import { THEME } from "../../constants/Theme";

export default function InvestCarousel(props) {
  const {
    handlePressInTouchableElement,
    handlePressOutTouchableElement,
    setSnackbarMessage,
    setIsSnackbarVisible,
    navigation,
  } = props;
  // Options for the carousel tabs
  const carouselOptions = [
    { name: "Investors", key: "CAROUSEL_TAB_INVESTORS", index: 0 },
    { name: "Jobs", key: "CAROUSEL_TAB_JOBS", index: 1 },
    { name: "History", key: "CAROUSEL_TAB_HISTORY", index: 2 },
  ];

  const [isLoading, setIsLoading] = useState(false);
  // Keeps track of which carousel option is selected
  const [selectedCarouselOptionIndex, setSelectedCarouselOptionIndex] =
    useState(0);
  // Keeps track of what data we should pass into either the investor card or job and history list
  const [listData, setListData] = useState(MOCK_INVESTORS);
  const [swipeDirection, setSwipeDirection] = useState(null);
  // Track the swipe translation in the x direction
  const [translationX, setTranslationX] = useState(0);

  // Handles what happens when the user presses one of the carousel tabs or swipes left or right inside of the component
  function handleCarouselOptionChange(index) {
    setIsLoading(true);
    setSelectedCarouselOptionIndex(index);
    switch (index) {
      case 0:
        setListData(MOCK_INVESTORS);
        break;
      case 1:
        setListData(MOCK_JOBS);
        break;
      case 2:
        setListData(MOCK_HISTORY);
        break;
      default:
        setListData(MOCK_INVESTORS);
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
                setSnackbarMessage={setSnackbarMessage}
                setIsSnackbarVisible={setIsSnackbarVisible}
                navigation={navigation}
              />
            ) : (
              <JobsAndHistoryItemList
                listData={listData}
                isLoading={isLoading}
                type={carouselOptions[selectedCarouselOptionIndex].key}
                handlePressInTouchableElement={handlePressInTouchableElement}
                handlePressOutTouchableElement={handlePressOutTouchableElement}
                navigation={navigation}
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
    color: THEME.text.primaryColor,
  },
  carouselHeader: {
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  selectedCarouselOption: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.primaryColor,
    textDecorationLine: "underline",
  },
});
