import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { THEME } from "../../../../../constants/Theme";
import { startJobModalBuilder } from "../../../../../helpers/modalFactory";

// Renders the list of investors, jobs, or history
export default function InvestorItemList(props) {
  const { listData, isLoading, modalProps, navigation } = props;

  // Show the start job modal and pass in the investor id
  function handlePressStartJob(investorId) {
    modalProps.setInvestorId(investorId);
    startJobModalBuilder(modalProps);
  }

  return (
    <View style={styles.container}>
      {/* If investors are loading */}
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size="large"
            color={THEME.loadingIndicator.color}
          />
        </View>
      ) : (
        // List of investors
        <View style={styles.listItems}>
          {listData.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.primaryText}>
                You don't have any investors yet. Press the plus icon in the
                bottom right corner of the screen to create one.
              </Text>
            </View>
          ) : (
            <ScrollView>
              <Animated.View entering={SlideInDown}>
                {listData.map((item) => {
                  return (
                    <TouchableWithoutFeedback
                      key={item.investor_id}
                      onPress={() =>
                        navigation.navigate("InvestorScreen", {
                          investorID: item.investor_id,
                        })
                      }
                    >
                      <View
                        style={
                          item.type === "I"
                            ? styles.listItem
                            : {
                                ...styles.listItem,
                                backgroundColor:
                                  THEME.investCard.ai.backgroundColor,
                              }
                        }
                      >
                        {/* Investor name */}
                        <View style={styles.nameContainer}>
                          <Text style={styles.listItemName}>
                            {item.investor_name}
                          </Text>
                        </View>
                        {/* Investor image */}
                        <View style={styles.imageContainer}>
                          <Image
                            style={
                              item.type === "I"
                                ? styles.investorImage
                                : styles.aiInvestorImage
                            }
                            source={{ uri: item.image_id }}
                          />
                        </View>
                        {item.type === "I" ? (
                          <View style={styles.indicatorAndStockContainer}>
                            {/* Indicators */}
                            <View style={styles.indicatorCol}>
                              <Text style={styles.indictorAndStockHeaderText}>
                                Indicators
                              </Text>
                              <ScrollView>
                                {item?.indicators?.map((item, index) => {
                                  return (
                                    <Text
                                      key={item}
                                      style={styles.indictorAndStockText}
                                    >
                                      {item}
                                    </Text>
                                  );
                                })}
                              </ScrollView>
                            </View>
                            {/* Stocks */}
                            <View style={styles.stockCol}>
                              <Text style={styles.indictorAndStockHeaderText}>
                                Stocks
                              </Text>
                              <ScrollView>
                                {item?.assets_to_track?.map((item, index) => {
                                  return (
                                    <Text
                                      key={item}
                                      style={styles.indictorAndStockText}
                                    >
                                      {item}
                                    </Text>
                                  );
                                })}
                              </ScrollView>
                            </View>
                          </View>
                        ) : null}

                        {/* Start job */}
                        <View style={styles.startJobContainer}>
                          <TouchableOpacity
                            style={styles.startJobButton}
                            onPress={() =>
                              handlePressStartJob(item.investor_id)
                            }
                          >
                            <Text style={styles.primaryText}>Start Job</Text>
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
  primaryText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  secondaryText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.secondary,
  },
  activityIndicator: {
    flex: 1,
    paddingTop: "10%",
  },
  listItems: {
    alignItems: "center",
    maxHeight: 700,
    width: "100%",
  },
  listItem: {
    flex: 1,
    alignItems: "center",
    height: 400,
    width: "100%",
    marginBottom: "10%",
    borderRadius: 10,
    backgroundColor: THEME.investCard.algorithmic.backgroundColor,
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
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "600",
    color: THEME.text.color.secondary,
  },
  imageContainer: {
    flex: 0.4,
    justifyContent: "center",
  },
  investorImage: { height: 150, width: 130 },
  aiInvestorImage: { height: 200, width: 120 },
  indicatorAndStockContainer: {
    flex: 0.25,
    width: "100%",
    flexDirection: "row",
  },
  indictorAndStockHeaderText: {
    fontSize: THEME.text.fontSize.H4,
    fontWeight: "600",
    color: THEME.text.color.secondary,
  },
  indictorAndStockText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.secondary,
  },
  indicatorCol: {
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
  },
  stockCol: {
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
  },
  indicatorAndStockItems: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  startJobContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: "2%",
    position: "absolute",
    bottom: 10,
  },
  startJobButton: {
    flexDirection: "row",

    backgroundColor: THEME.colors.background,

    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 10,
  },
});
