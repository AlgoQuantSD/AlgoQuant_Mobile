import React, { useState, useRef, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { Button, Snackbar } from "react-native-paper";
import CustomParallaxCarousel from "../../reusable_components/CustomParallaxCarousel";
import IndicatorsOrStocksListView from "../../reusable_components/IndicatorsOrStocksListView";
import SnackbarContent from "../../reusable_components/SnackbarContent";
import { PERIOD_LIST } from "../../../constants/CreateInvestorConstants";
import { chunker } from "../../../helpers/chunker";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import { THEME } from "../../../constants/Theme";
import AlgoquantApiContext from "../../../constants/ApiContext";

export default function CreateInvestorAlgorithmicStep4Screen(props) {
  const { investorObject } = props.route.params;
  // State variables used to access algoquant SDK APfI and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  console.log("Step 4: ", investorObject);
  const navigation = useNavigation();

  const [isIndicatorSetToCarouselView, setIsIndicatorSetToCarouselView] =
    useState(true);
  const [isStockSetToCarouselView, setIsStockSetToCarouselView] =
    useState(true);
  const chunkedIndicators = chunker(investorObject.indicators, 3);
  const chunkedStocks = chunker(investorObject.assets_to_track, 3);
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  function handleIndicatorViewChange() {
    setIsIndicatorSetToCarouselView(!isIndicatorSetToCarouselView);
  }

  function handleStockViewChange() {
    setIsStockSetToCarouselView(!isStockSetToCarouselView);
  }

  function handleCreateInvestorPress() {
    // Put API call to create investor here
    // investorObject contains all the information needed to pass in the API call
    setIsLoading(true);
    if (algoquantApi.token) {
      algoquantApi
        .createInvestor(
          investorObject?.assets_to_track,
          investorObject?.indicators,
          investorObject?.image_id,
          investorObject?.investor_name,
          investorObject?.loss_stop / 100,
          investorObject?.period,
          investorObject?.profit_stop / 100,
          "I"
        )
        .then((resp) => {
          console.log(resp.data);
          setIsLoading(false);
          setSnackbarMessage(
            <SnackbarContent
              iconName={THEME.icon.name.error}
              iconSize={THEME.icon.size.snackbarIconSize}
              iconColor={THEME.colors.danger}
              text="Success: investor created."
              textColor={THEME.colors.success}
            />
          );
          setIsSnackbarVisible(true);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
          // Set snackbar message if there is an error
          setSnackbarMessage(
            <SnackbarContent
              iconName={THEME.icon.name.error}
              iconSize={THEME.icon.size.snackbarIconSize}
              iconColor={THEME.colors.danger}
              text="ERROR: Failed to create investor."
              textColor={THEME.colors.danger}
            />
          );
          setIsSnackbarVisible(true);
        });
    }
    // Navigate back home after successfully creating investor
    navigation.navigate("HomeScreen");
  }

  return (
    <View style={styles.container}>
      {/* Show loading view if loading */}
      {isLoading ? (
        <Animated.View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          entering={FadeIn.delay(1000)}
        >
          <ActivityIndicator
            size={"large"}
            color={THEME.activityIndicator.color.primary}
          />

          <Animated.Text entering={FadeIn.delay(500)}>
            Creating your investor!
          </Animated.Text>
        </Animated.View>
      ) : (
        <Animated.View style={{ flex: 1 }}>
          {/* Header */}
          <Animated.View
            style={styles.headerContainer}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text style={styles.headerText}>Confirm Investor Creation</Text>
          </Animated.View>
          {/* Investor Configuration */}
          <Animated.View
            style={styles.investorConfigurationContainer}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text style={styles.sectionTitleText}>Investor Configuration</Text>
            <View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Investor name:</Text>
              <Text style={styles.text}>{investorObject.investor_name}</Text>
            </View>
            <View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Investor type:</Text>
              <Text style={styles.text}>{investorObject.type}</Text>
            </View>
            <View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Profit stop:</Text>
              <Text style={styles.text}>{investorObject.profit_stop}%</Text>
            </View>
            <View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Loss stop:</Text>
              <Text style={styles.text}>{investorObject.loss_stop}%</Text>
            </View>
            <View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Trade frequency:</Text>
              <Text style={styles.text}>
                {PERIOD_LIST.map((item) => {
                  if (item.value === investorObject.period) {
                    return item.name;
                  }
                })}
              </Text>
            </View>
          </Animated.View>
          {/* Indicators */}
          <View style={styles.indicatorsContainer}>
            <View style={styles.indicatorsHeaderRow}>
              <Text style={styles.sectionTitleText}>Indicators</Text>
              <Button
                buttonColor={THEME.button.primaryColorBackground}
                textColor={THEME.text.secondaryColor}
                onPress={handleIndicatorViewChange}
              >
                {isIndicatorSetToCarouselView ? "List View" : "Carousel View"}
              </Button>
            </View>
            {isIndicatorSetToCarouselView ? (
              <CustomParallaxCarousel data={investorObject.indicators} />
            ) : (
              <Animated.View entering={BounceIn.delay(500)} exiting={BounceOut}>
                <IndicatorsOrStocksListView data={chunkedIndicators} />
              </Animated.View>
            )}
          </View>
          {/* Stocks */}
          <View style={styles.stocksContainer}>
            <View style={styles.stocksHeaderRow}>
              <Text style={styles.sectionTitleText}>Stocks</Text>
              <Button
                buttonColor={THEME.button.primaryColorBackground}
                textColor={THEME.text.secondaryColor}
                onPress={handleStockViewChange}
              >
                {isIndicatorSetToCarouselView ? "List View" : "Carousel View"}
              </Button>
            </View>
            {isStockSetToCarouselView ? (
              <CustomParallaxCarousel data={investorObject.assets_to_track} />
            ) : (
              <Animated.View entering={BounceIn.delay(500)} exiting={BounceOut}>
                <IndicatorsOrStocksListView data={chunkedStocks} />
              </Animated.View>
            )}
          </View>
          {/* Create Investor Button */}
          <View style={styles.nextButtonContainer}>
            <Button
              buttonColor={THEME.button.primaryColorBackground}
              textColor={THEME.text.secondaryColor}
              onPress={handleCreateInvestorPress}
            >
              Create Investor
            </Button>
          </View>
          {/* Snackbar */}
          <View style={styles.snackbarContainer}>
            <Snackbar
              visible={isSnackbarVisible}
              onDismiss={() =>
                snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage)
              }
              duration={3500}
              action={{
                label: "Dismiss",
                textColor: THEME.snackbar.text.color,
                onPress: () => {
                  snackbarCleanUp(setIsSnackbarVisible, setSnackbarMessage);
                },
              }}
              style={styles.snackbar}
            >
              {snackbarMessage}
            </Snackbar>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  text: { fontSize: THEME.text.fontSize.body, color: THEME.text.color.primary },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  investorConfigurationContainer: {
    flex: 0.25,
    justifyContent: "center",
  },
  investorConfigurationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  indicatorsContainer: {
    flex: 0.25,
    marginTop: "10%",
  },
  indicatorsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stocksHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stocksContainer: {
    flex: 0.25,
  },
  nextButtonContainer: {
    flex: 0.1,
    justifyContent: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
    alignItems: "flex-end",
  },
  snackbarContainer: {
    flex: 0.05,
  },
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
