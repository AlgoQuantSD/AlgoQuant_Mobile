import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { investorImagePathList } from "../../constants/InvestorImagePaths";
import { THEME } from "../../constants/Theme";
import Animated, { SlideInDown } from "react-native-reanimated";

// Renders the list of investors, jobs, or history
export default function InvestItemList(props) {
  const { listData, isLoading } = props;

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
              <Text style={styles.text}>
                You don't have any investors yet. Press the plus icon above to
                create one.
              </Text>
            </View>
          ) : (
            <ScrollView>
              <Animated.View entering={SlideInDown}>
                {listData.map((item) => {
                  return (
                    <TouchableWithoutFeedback
                      key={item.id}
                      onPress={() => console.log("Opening: ", item.name)}
                    >
                      <View style={styles.listItem}>
                        <View style={styles.nameContainer}>
                          <Text style={styles.listItemName}>{item.name}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                          <Image
                            style={styles.investorImage}
                            source={investorImagePathList[item.imageId]}
                          />
                        </View>
                        <View style={styles.indicatorAndStockContainer}>
                          <View style={styles.indicatorCol}>
                            <Text style={styles.indictorAndStockHeaderText}>
                              Indicators
                            </Text>
                            <ScrollView>
                              <View style={styles.indicatorAndStockItems}>
                                {item.indicators.map((item) => {
                                  return (
                                    <Text
                                      key={item}
                                      style={styles.indictorAndStockText}
                                    >
                                      {item}
                                    </Text>
                                  );
                                })}
                              </View>
                            </ScrollView>
                          </View>
                          <View style={styles.stockCol}>
                            <Text style={styles.indictorAndStockHeaderText}>
                              Stocks
                            </Text>
                            <ScrollView>
                              <View style={styles.indicatorAndStockItems}>
                                {item.stocks.map((item) => {
                                  return (
                                    <Text
                                      key={item}
                                      style={styles.indictorAndStockText}
                                    >
                                      {item}
                                    </Text>
                                  );
                                })}
                              </View>
                            </ScrollView>
                          </View>
                        </View>
                        <View style={styles.startJobContainer}>
                          <TouchableOpacity
                            hitSlop={{
                              top: 30,
                              bottom: 30,
                              left: 30,
                              right: 30,
                            }}
                            style={styles.startJobButton}
                          >
                            <Text style={styles.text}>Start Job</Text>
                            <Ionicons
                              name="arrow-forward"
                              size={16}
                              color={THEME.colors.foreground}
                            />
                          </TouchableOpacity>
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
    marginTop: "5%",
    alignItems: "center",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  activityIndicator: {
    paddingTop: "10%",
  },
  listItems: {
    alignItems: "center",
    height: 600,
    width: "100%",
  },
  listItem: {
    flex: 1,
    alignItems: "center",
    height: 400,
    width: "100%",
    marginBottom: "10%",
    borderRadius: 10,
    backgroundColor: THEME.investCard.backgroundColor,
  },
  noResultsContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    marginTop: "5%",
  },
  nameContainer: {
    flex: 0.2,
    justifyContent: "center",
  },
  listItemName: {
    fontSize: THEME.text.fontSizeH3,
    color: THEME.text.color,
  },
  imageContainer: {
    flex: 0.4,
    justifyContent: "center",
  },
  investorImage: { height: 150, width: 100 },
  indicatorAndStockContainer: {
    flex: 0.3,
    width: "100%",
    flexDirection: "row",
  },
  indictorAndStockHeaderText: {
    fontSize: THEME.text.fontSizeH4,
    color: THEME.text.color,
  },
  indictorAndStockText: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.primary,
  },
  indicatorCol: {
    flexDirection: "col",
    alignItems: "center",
    width: "50%",
  },
  stockCol: {
    flexDirection: "col",
    alignItems: "center",
    width: "50%",
  },
  indicatorAndStockItems: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  startJobContainer: {
    flex: 0.1,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  startJobButton: {
    flexDirection: "row",
    paddingRight: "2%",
  },
});
