import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { THEME } from "../../../../../general_constants/theme/Theme";
import { CHIP_JOB_TYPES } from "../../../../general_use/active_inactive_chip/enums/chipJobTypeEnum";

export default function JobsAndHistoryItemList(props) {
  const { listData, isLoading, handleFetchMoreData, type } = props;
  const navigation = useNavigation();

  // Get reference of scrollview component
  const scrollViewRef = useRef(null);

  // state variable to show activity indicator whenever handleFetchMoreData is called
  const [fetchDataLoading, setFetchDataLoading] = useState(false);

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (contentOffsetY + scrollViewHeight >= contentHeight) {
      // ternary operator to handle the tab data loading in the home page
      // tenary operator to handle the chip data loading in the investor screen
      type === CHIP_JOB_TYPES.Past || type === "CAROUSEL_TAB_HISTORY"
        ? handleFetchMoreData("complete")
        : handleFetchMoreData("active");
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size="large"
            color={THEME.loadingIndicator.color}
          />
        </View>
      ) : (
        <View style={styles.listItems}>
          {listData.length === 0 ? (
            <View style={styles.noResultsContainer}>
              {type === "CAROUSEL_TAB_JOBS" || CHIP_JOB_TYPES.Active ? (
                <Text style={styles.text2}>
                  You don't have any jobs yet. You can create a job from one of
                  your investors.
                </Text>
              ) : (
                <Text style={styles.text2}>
                  No history yet. Go create some jobs!
                </Text>
              )}
            </View>
          ) : (
            <ScrollView
              onScroll={handleScroll}
              scrollEventThrottle={250}
              ref={scrollViewRef}
            >
              <Animated.View entering={SlideInDown}>
                {listData.map((item) => {
                  return (
                    <TouchableWithoutFeedback
                      key={item.job_id}
                      onPress={() =>
                        navigation.navigate("JobScreen", {
                          jobID: item.job_id,
                          jobType: type,
                        })
                      }
                    >
                      <View style={styles.listItem}>
                        <View style={styles.itemName}>
                          <Text style={styles.text}>{item.name}</Text>
                        </View>
                        <View style={styles.itemBalance}>
                          <Text style={styles.text}>${item.total_job_val}</Text>
                          <Text
                            style={
                              item.percentage_change >= 0
                                ? styles.percentChangeUpText
                                : styles.percentChangeDownText
                            }
                          >
                            ({item.percentage_change}%)
                          </Text>
                          {item.percentage_change >= 0 ? (
                            <Ionicons
                              name="caret-up-outline"
                              size={12}
                              color={THEME.colors.trendingUp}
                            />
                          ) : (
                            <Ionicons
                              name="caret-down-outline"
                              size={12}
                              color={THEME.colors.trendingDown}
                            />
                          )}
                        </View>
                        <View style={styles.itemInvestor}>
                          <Image
                            style={styles.investorImage}
                            source={{ uri: item?.image_id }}
                          />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </Animated.View>
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
  },
  text: {
    color: THEME.text.color.secondary,
  },
  text2: {
    color: THEME.text.color.primary,
  },
  activityIndicator: {
    paddingTop: "10%",
    minHeight: 150,
  },
  listItems: {
    minHeight: 150,
    maxHeight: 450,
    alignItems: "center",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 75,
    width: "100%",
    marginBottom: "5%",
    borderRadius: 10,
    backgroundColor: THEME.investCard.backgroundColor,
  },
  noResultsContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    paddingTop: "5%",
  },
  itemName: {
    width: "30%",
    alignItems: "center",
    paddingRight: "3%",
    justifyContent: "center",
  },
  itemBalance: {
    flexDirection: "row",
    width: "33%",
    paddingLeft: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemInvestor: {
    width: "33%",
    paddingLeft: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  investorImage: { height: 30, width: 20 },
  investorNameText: {
    fontSize: 10,
    color: THEME.text.color.secondary,
  },
  percentChangeUpText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.colors.trendingUp,
    paddingLeft: "4%",
  },
  percentChangeDownText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.colors.trendingDown,
    paddingLeft: "4%",
  },
});
