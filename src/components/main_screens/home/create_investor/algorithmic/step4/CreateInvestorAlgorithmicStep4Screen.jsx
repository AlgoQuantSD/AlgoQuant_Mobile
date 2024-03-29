import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import AlgoquantApiContext from "../../../../../../general_constants/api/apiContext";
import { THEME } from "../../../../../../general_constants/theme/Theme";
import { chunker } from "../../../../../../general_helpers/chunker";
import CustomParallaxCarousel from "../../../../../general_use/carousel_list_view_toggle/CustomParallaxCarousel";
import IndicatorsOrStocksListView from "../../../../../general_use/carousel_list_view_toggle/IndicatorsOrStocksListView";
import SnackbarContent from "../../../../../general_use/snackbar/SnackbarContent";
import { snackbarCleanUp } from "../../../../../general_use/snackbar/helpers/snackbarCleanup";
import SuccessScreen from "../../../../../general_use/success_error_screens/SuccessScreen";
import { PERIOD_LIST } from "../../constants/createInvestorConstants";
import InvestorListContext from "../../context/InvestorListContext";

export default function CreateInvestorAlgorithmicStep4Screen(props) {
  const { investorObject } = props.route.params;
  // State variables used to access algoquant SDK APfI and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const { setInvestorListRefresh } = useContext(InvestorListContext);

  const navigation = useNavigation();

  const [isIndicatorSetToCarouselView, setIsIndicatorSetToCarouselView] =
    useState(true);
  const [isStockSetToCarouselView, setIsStockSetToCarouselView] =
    useState(true);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowSuccessScreen, setShouldShowSuccessScreen] = useState(false);

  const chunkedIndicators = chunker(investorObject.indicators, 3);
  const chunkedStocks = chunker(investorObject.assets_to_track, 3);

  function handleIndicatorViewChange() {
    setIsIndicatorSetToCarouselView(!isIndicatorSetToCarouselView);
  }

  function handleStockViewChange() {
    setIsStockSetToCarouselView(!isStockSetToCarouselView);
  }

  // Do this if the create backetest endpoint returns success
  function handleSuccess() {
    setShouldShowSuccessScreen(true);
    setTimeout(() => {
      setShouldShowSuccessScreen(false);
      navigation.navigate("HomeScreen");
    }, 3000);
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
          investorObject?.loss_stop / 100, // update so we dont do this here
          investorObject?.period,
          investorObject?.profit_stop / 100, // update so we dont do this here
          "I"
        )
        .then((resp) => {
          setInvestorListRefresh(true);
          setIsLoading(false);
          handleSuccess();
        })
        .catch((err) => {
          setInvestorListRefresh(false);
          // TODO: Need to implement better error handling
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
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
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
      ) : shouldShowSuccessScreen ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SuccessScreen message="Successfully created investor!" />
        </View>
      ) : (
        <Animated.View style={{ flex: 1 }}>
          {/* Header */}
          <Animated.View
            style={styles.headerContainer}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text style={styles.headerText}>Finalize Your Investor</Text>
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
                textColor={THEME.text.color.secondary}
                onPress={handleIndicatorViewChange}
              >
                {isIndicatorSetToCarouselView ? "List View" : "Carousel View"}
              </Button>
            </View>
            {isIndicatorSetToCarouselView ? (
              <CustomParallaxCarousel data={investorObject.indicators} />
            ) : (
              <Animated.View entering={FadeIn.delay(500)} exiting={FadeOut}>
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
                textColor={THEME.text.color.secondary}
                onPress={handleStockViewChange}
              >
                {isStockSetToCarouselView ? "List View" : "Carousel View"}
              </Button>
            </View>
            {isStockSetToCarouselView ? (
              <CustomParallaxCarousel data={investorObject.assets_to_track} />
            ) : (
              <Animated.View entering={FadeIn.delay(500)} exiting={FadeOut}>
                <IndicatorsOrStocksListView data={chunkedStocks} />
              </Animated.View>
            )}
          </View>
          {/* Create Investor Button */}
          <View style={styles.nextButtonContainer}>
            <Button
              buttonColor={THEME.button.primaryColorBackground}
              textColor={THEME.text.color.secondary}
              onPress={handleCreateInvestorPress}
              style={THEME.button.style}
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
    paddingTop: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  headerContainer: {
    paddingBottom: "5%",
  },
  text: { fontSize: THEME.text.fontSize.body, color: THEME.text.color.primary },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "bold",
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    fontWeight: "600",
    color: THEME.text.color.primary,
    paddingBottom: "3%",
  },
  investorConfigurationContainer: {
    paddingBottom: "10%",
  },
  investorConfigurationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  indicatorsContainer: {
    paddingBottom: "25%",
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
  stocksContainer: {},
  nextButtonContainer: {
    marginTop: "auto",
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
