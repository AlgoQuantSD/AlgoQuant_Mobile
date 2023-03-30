import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { Button, Snackbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { investorImagePathList } from "../../../constants/InvestorImagePaths";
import CustomParallaxCarousel from "../../reusable_components/CustomParallaxCarousel";
import IndicatorsOrStocksListView from "../../reusable_components/IndicatorsOrStocksListView";
import JobsAndHistoryItemList from "../../reusable_components/JobsAndHistoryItemList";
import CustomModal from "../../reusable_components/CustomModal";
import {
  deleteInvestorModalBuilder,
  startJobModalBuilder,
} from "../../../helpers/modalFactory";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import { Chip } from "react-native-paper";
import { chunker } from "../../../helpers/chunker";
import { THEME } from "../../../constants/Theme";
import AlgoquantApiContext from "../../../constants/ApiContext";
import { ChipJobTypes } from "../../../constants/ChipJobTypeEnum";

export default function InvestorScreen(props) {
  const { investorID } = props.route.params;

  // State variables used to access algoquant SDK APfI and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const navigation = useNavigation();

  // state variable to hold the investor using the investor ID passed from the investorItemList
  const [investor, setInvestor] = useState(null);

  console.log("Investor type: ", investor?.type);

  const chunkedIndicators = chunker(investor?.indicators, 3);
  const chunkedStocks = chunker(investor?.assets_to_track, 3);

  const [isIndicatorSetToCarouselView, setIsIndicatorSetToCarouselView] =
    useState(true);
  const [isStockSetToCarouselView, setIsStockSetToCarouselView] =
    useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [modalInputFields, setModalInputFields] = useState(null);
  const [modalButtons, setModalButtons] = useState(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [modalSnackbarMessage, setModalSnackbarMessage] = useState(null);
  const [isModalSnackbarVisible, setIsModalSnackbarVisible] = useState(null);

  // This state variable tells will only be true if we just deleted an investor so we can navigate back home
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false);

  // State variables for an investors job list
  // State variable to hold array of job objects
  const [jobList, setJobList] = useState([]);
  // Loading stop when switching from viewing active jobs to past jobs
  const [isJobListLoading, setIsJobListLoading] = useState(false);
  // Used for pagination of the job list data
  // last evaluated key - used for the api to know if there is more data to fetch
  // lastQUery - true if last evaluated key comes back undefined, aka no more queries
  const [lekJobId, setlekJobId] = useState(null);
  const [lastQuery, setLastQuery] = useState(false);

  // State variable to track the selected chip. usees the ChipJobTypes Enum
  const [chipState, setChipState] = useState(ChipJobTypes.Active);
  // state variables to track what chip is currently selected
  const [selectedChipActive, setSelectedChipActive] = useState(true);
  const [selectedChipPast, setSelectedChipPast] = useState(false);

  const modalProps = {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setModalInputFields,
    setModalButtons,
  };

  function handleIndicatorViewChange() {
    setIsIndicatorSetToCarouselView(!isIndicatorSetToCarouselView);
  }
  function handleStockViewChange() {
    setIsStockSetToCarouselView(!isStockSetToCarouselView);
  }
  function handleStartJobIconPress() {
    startJobModalBuilder(modalProps);
  }
  function handleTrashIconPress() {
    deleteInvestorModalBuilder(modalProps);
  }
  function handleBacktestIconPress() {
    navigation.navigate("CreateBacktestScreen", { investorID: investorID });
  }

  // CallBack function that fetchs for job list data in a paginiated manner
  // FetchType: "active" or "complete"
  // UPDATE: USE THE INVESTOR OF FROM THE SECOND API CALL !!!
  const getJobList = useCallback(
    (fetchType) => {
      setIsJobListLoading(true);
      if (!lastQuery) {
        if (algoquantApi.token) {
          algoquantApi
            .getJobList(fetchType, investorID, lekJobId)
            .then((resp) => {
              setlekJobId(resp.data.LEK_job_id);
              setJobList(jobList.concat(resp.data.jobs));

              if (resp.data.LEK_job_id === undefined) {
                setLastQuery(true);
              } else {
                setlekJobId(resp.data.LEK_job_id);
              }
              setIsJobListLoading(false);
            })
            .catch((err) => {
              // TODO: Need to implement better error handling
              console.log(err);
            });
        }
      }
    },
    [
      lastQuery,
      algoquantApi,
      setlekJobId,
      setJobList,
      setLastQuery,
      investorID,
      lekJobId,
      jobList,
    ]
  );
  const getInvestor = useCallback(() => {
    if (algoquantApi.token) {
      algoquantApi
        .getInvestor(investorID)
        .then((resp) => {
          console.log(resp.data);
          setInvestor(resp.data);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log("getInvestor: " + err);
        });
    }
  }, [algoquantApi, investorID]);

  // Function to handle job fetch based on the JobChipType
  // JobChipType takes the enum: ChipJobType to call either active or past (complete) jobs
  const handleJobTypeChipPress = (JobChipType) => {
    // Reset the dependent values used to fetch the pagniated job / history list data
    // and the useEffect on line 110 will be called
    setJobList([]);
    setLastQuery(false);
    setlekJobId(null);

    switch (JobChipType) {
      case ChipJobTypes.Active:
        setChipState(ChipJobTypes.Active);
        setSelectedChipActive(true);
        setSelectedChipPast(false);
        break;
      case ChipJobTypes.Past:
        setChipState(ChipJobTypes.Past);
        setSelectedChipPast(true);
        setSelectedChipActive(false);
    }
  };

  // Useeffect that gets triggered when the values of the dependent list changes
  // Used to fetch the list of data for active or past jobs based on the tab the user has selected
  useEffect(() => {
    if (!lastQuery && jobList.length === 0 && lekJobId === null)
      if (chipState === ChipJobTypes.Active) {
        getJobList("active");
      } else {
        getJobList("complete");
      }
  }, [chipState, lastQuery, lekJobId, jobList]);

  // UseEffect for when the page is loaded to fetch the investor's information, called once
  useEffect(() => {
    getInvestor();
  }, [investorID]);

  return (
    <View style={styles.container}>
      {shouldNavigateBack ? navigation.navigate("HomeScreen") : null}
      {/* Modal */}
      <CustomModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        modalType={modalType}
        setModalType={setModalType}
        modalTitle={modalTitle}
        setModalTitle={setModalTitle}
        modalHeader={modalHeader}
        setModalHeader={setModalHeader}
        modalBody={modalBody}
        setModalBody={setModalBody}
        modalInputFields={modalInputFields}
        setModalInputFields={setModalInputFields}
        modalButtons={modalButtons}
        setModalButtons={setModalButtons}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarVisible={setIsSnackbarVisible}
        modalSnackbarMessage={modalSnackbarMessage}
        setModalSnackbarMessage={setModalSnackbarMessage}
        isModalSnackbarVisible={isModalSnackbarVisible}
        setIsModalSnackbarVisible={setIsModalSnackbarVisible}
        setShouldNavigateBack={setShouldNavigateBack}
        investorID={investorID}
      />
      {/* Header (name, image, start/delete buttons) */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTextAndInvestorImageContainer}>
          <View
            style={{ flexDirection: "row", width: "80%", alignItems: "center" }}
          >
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.5}
              numberOfLines={1}
              style={styles.headerText}
            >
              {investor?.investor_name}
            </Text>

            <Image
              style={styles.investorImage}
              source={{ uri: investor?.image_id }}
            />
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.headerRowIcon}
            onPress={handleStartJobIconPress}
          >
            <Ionicons
              name={THEME.icon.name.investorStartJob}
              size={THEME.icon.size.large}
              color={THEME.icon.color.primary}
            />
          </TouchableOpacity>
          {/* Only show start backtest button if its an algorithmic investor (AI investors cant backtest) */}
          {investor?.type === "I" ? (
            <TouchableOpacity
              style={styles.headerRowIcon}
              onPress={handleBacktestIconPress}
            >
              <Ionicons
                name={THEME.icon.name.backtest}
                size={THEME.icon.size.large}
                color={THEME.icon.color.primary}
              />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.headerRowIcon}
            onPress={handleTrashIconPress}
          >
            <Ionicons
              name="trash"
              size={THEME.icon.size.large}
              color={THEME.icon.color.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Investor Configuration */}
      <View style={styles.investorConfigurationContainer}>
        <Text style={styles.sectionTitleText}>Investor Configuration</Text>
        <View style={styles.investorConfigurationDetailsRow}>
          <View style={styles.investorConfigurationDetailsCol}>
            <Text style={styles.investorConfigurationDetailsText}>
              Profit stop:
            </Text>
            <Text style={styles.text}>Loss stop:</Text>
          </View>
          <View style={styles.investorConfigurationDetailsCol}>
            <Text style={styles.investorConfigurationDetailsText}>
              {investor?.profit_stop * 100 + "%"}
            </Text>
            <Text style={styles.text}>{investor?.loss_stop * 100 + "%"}</Text>
          </View>
        </View>
      </View>
      {investor?.type === "I" ? (
        <View style={{ flex: 0.5 }}>
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
              <CustomParallaxCarousel data={investor?.indicators} />
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
                buttonColor={THEME.button.color.primary}
                textColor={THEME.text.color.secondary}
                onPress={handleStockViewChange}
              >
                {isStockSetToCarouselView ? "List View" : "Carousel View"}
              </Button>
            </View>

            {isStockSetToCarouselView ? (
              <CustomParallaxCarousel data={investor?.assets_to_track} />
            ) : (
              <Animated.View entering={BounceIn.delay(500)} exiting={BounceOut}>
                <IndicatorsOrStocksListView data={chunkedStocks} />
              </Animated.View>
            )}
          </View>
        </View>
      ) : null}

      {/* Jobs */}
      <View style={styles.jobsContainer}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>Jobs</Text>
          <Chip
            mode="flat"
            style={styles.chip}
            selected={selectedChipActive}
            elevated
            onPress={() => handleJobTypeChipPress(ChipJobTypes.Active)}
          >
            Active
          </Chip>
          <Chip
            mode="flat"
            style={styles.chip}
            selected={selectedChipPast}
            elevated
            onPress={() => handleJobTypeChipPress(ChipJobTypes.Past)}
          >
            Past
          </Chip>
        </View>
        <View style={styles.jobList}>
          <JobsAndHistoryItemList
            listData={jobList}
            isLoading={isJobListLoading}
            type={chipState}
            handleFetchMoreData={getJobList}
          />
        </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  headerContainer: {
    flex: 0.15,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
  },
  headerTextAndInvestorImageContainer: {
    width: "65%",
    flexDirection: "row",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H2,
    color: THEME.text.color.primary,

    paddingRight: "2%",
  },
  investorImage: { height: 45, width: 30 },
  iconsContainer: {
    width: "35%",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  headerRowIcon: {
    paddingRight: "5%",
  },
  investorConfigurationContainer: {
    flex: 0.15,
    width: "90%",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
    marginRight: 10,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  investorConfigurationDetailsRow: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    // backgroundColor: "green",
  },
  investorConfigurationDetailsCol: {
    height: "100%",
    justifyContent: "center",
  },
  investorConfigurationDetailsText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
    paddingBottom: "2%",
  },
  indicatorsContainer: {
    flex: 0.5,
    width: "90%",
    marginTop: "10%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  indicatorsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stocksContainer: {
    flex: 0.5,
    width: "90%",
    marginTop: "10%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  stocksHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobsContainer: {
    flex: 0.45,
    width: "90%",
    marginTop: "10%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
  },
  jobList: {
    width: "100%",
  },
  snackbarContainer: { flex: 0.05 },
  snackbar: {
    backgroundColor: THEME.snackbar.color.background,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  chip: {
    marginRight: 10,
    backgroundColor: THEME.button.color.secondary,
    textStyle: THEME.text.color.secondary,
  },
});
