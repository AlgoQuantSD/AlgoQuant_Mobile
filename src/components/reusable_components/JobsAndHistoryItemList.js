import React, { useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { investorImagePathList } from "../../constants/InvestorImagePaths";
import { THEME } from "../../constants/Theme";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";

export default function JobsAndHistoryItemList(props) {
  const { listData, isLoading, handleFetchMoreData, type } = props;
  const navigation = useNavigation();

  // Get reference of scrollview component
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    if (contentOffsetY + scrollViewHeight >= contentHeight) {
      type === "CAROUSEL_TAB_HISTORY"
        ? handleFetchMoreData("complete")
        : handleFetchMoreData("active");
    }
  };
  console.log(listData.length);
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
              {type === "CAROUSEL_TAB_JOBS" ? (
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
                        navigation.navigate("JobScreen", { job: item })
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
                            source={investorImagePathList[0]}
                          />
                          {/* <Text style={styles.investorNameText}>
                            investor's name
                          </Text> */}
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
    height: "90%",
    marginTop: "5%",
  },
  text: {
    color: THEME.text.color.secondary
  },
  text2: {
    color: THEME.text.color.primary
  },
  activityIndicator: {
    paddingTop: "10%",
  },
  listItems: {
    height: "100%",
    alignItems: "center",
    width: "100%",
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
    marginTop: "5%",
  },
  itemName: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemBalance: {
    flexDirection: "row",
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemInvestor: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  investorImage: { height: 30, width: 20 },
  investorNameText: {
    fontSize: 10,
    color: THEME.text.secondaryColor,
  },
  percentChangeUpText: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.trendingUp,
    marginLeft: "2%",
  },
  percentChangeDownText: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.trendingDown,
    marginLeft: "2%",
  },
});
