import React, { useState, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SnackbarContent from "../../reusable_components/SnackbarContent";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import { THEME } from "../../../constants/Theme";
import AlgoquantApiContext from "../../../constants/ApiContext";

export default function CreateInvestorSmartStep3Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);

  const [isLoading, setIsLoading] = useState(false);
  // Manage snackbar state
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  console.log("AI investor: ", investorObject);
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
    <Animated.View style={styles.container}>
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
            <Animated.View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Investor name:</Text>
              <Text style={styles.text}>{investorObject.investor_name}</Text>
            </Animated.View>
            <Animated.View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Investor type:</Text>
              <Text style={styles.text}>{investorObject.type}</Text>
            </Animated.View>
            <Animated.View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Profit stop:</Text>
              <Text style={styles.text}>{investorObject.profit_stop}%</Text>
            </Animated.View>
            <Animated.View style={styles.investorConfigurationItem}>
              <Text style={styles.text}>Loss stop:</Text>
              <Text style={styles.text}>{investorObject.loss_stop}%</Text>
            </Animated.View>
          </Animated.View>
          {/* Create Investor Button */}
          <Animated.View style={styles.nextButtonContainer}>
            <Button
              buttonColor={THEME.button.primaryColorBackground}
              textColor={THEME.text.secondaryColor}
              onPress={handleCreateInvestorPress}
            >
              Create Investor
            </Button>
          </Animated.View>
          {/* Snackbar */}
          <Animated.View style={styles.snackbarContainer}>
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
          </Animated.View>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: THEME.text.color.primary,
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  headerContainer: {
    flex: 0.1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H3,
    color: THEME.text.color.primary,
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
  nextButtonContainer: {
    flex: 0.6,
    justifyContent: "flex-end",
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
