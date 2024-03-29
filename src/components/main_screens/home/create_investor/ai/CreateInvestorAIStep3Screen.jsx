import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";
import AlgoquantApiContext from "../../../../../general_constants/api/apiContext";
import { THEME } from "../../../../../general_constants/theme/Theme";
import SnackbarContent from "../../../../general_use/snackbar/SnackbarContent";
import { snackbarCleanUp } from "../../../../general_use/snackbar/helpers/snackbarCleanup";
import SuccessScreen from "../../../../general_use/success_error_screens/SuccessScreen";
import InvestorListContext from "../context/InvestorListContext";

export default function CreateInvestorAIStep3Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();
  const { setInvestorListRefresh } = useContext(InvestorListContext);
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowSuccessScreen, setShouldShowSuccessScreen] = useState(false);
  // Manage snackbar state
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

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
          investorObject?.loss_stop / 100, // update
          investorObject?.period,
          investorObject?.profit_stop / 100, // update so we dont do this here
          "A"
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
      {isLoading ? (
        <View
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
        </View>
      ) : shouldShowSuccessScreen ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SuccessScreen message="Successfully created investor!" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Finalize Your Investor</Text>
          </View>
          {/* Investor Configuration */}
          <View>
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
          </View>
          <View
            style={{
              alignItems: "center",

              borderRadius: 300,
              padding: 20,
            }}
          >
            <Image
              style={{
                height: 300,
                width: 200,
              }}
              source={{ uri: investorObject.image_id }}
            />
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
        </View>
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
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    fontWeight: "600",
    color: THEME.text.color.primary,
    paddingBottom: "2%",
  },
  headerContainer: {
    paddingBottom: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    fontWeight: "bold",
    color: THEME.text.color.primary,
  },

  investorConfigurationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
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
