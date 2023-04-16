import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Chip, Snackbar } from "react-native-paper";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import AlgoquantApiContext from "../../../constants/ApiContext";
import { CHIP_JOB_TYPES } from "../../../constants/ChipJobTypeEnum";
import InvestorListContext from "../../../constants/InvestorListContext";
import { THEME } from "../../../constants/Theme";
import { chunker } from "../../../helpers/chunker";
import {
  deleteInvestorModalBuilder,
  startJobModalBuilder,
} from "../../../helpers/modalFactory";
import { snackbarCleanUp } from "../../../helpers/snackbarCleanup";
import CustomModal from "../../reusable_components/CustomModal";
import CustomParallaxCarousel from "../../reusable_components/CustomParallaxCarousel";
import IndicatorsOrStocksListView from "../../reusable_components/IndicatorsOrStocksListView";
import JobsAndHistoryItemList from "../../reusable_components/JobsAndHistoryItemList";

export default function InvestorScreen(props) {
  const { investorID } = props.route.params;

  // State variables used to access algoquant SDK APfI and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const navigation = useNavigation();
  const { setInvestorListRefresh } = useContext(InvestorListContext);

  // state variable to hold the investor using the investor ID passed from the investorItemList
  const [investor, setInvestor] = useState(null);

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

  // State variables for an investors job list
  // State variable to hold array of job objects
  const [jobList, setJobList] = useState([]);
  // Loading stop when switching from viewing active jobs to past jobs
  const [isJobListLoading, setIsJobListLoading] = useState(false);
  const [isInvestorLoading, setIsInvestorLoading] = useState(false);

  // Used for pagination of the job list data
  // last evaluated key - used for the api to know if there is more data to fetch
  // lastQUery - true if last evaluated key comes back undefined, aka no more queries
  const [lekJobId, setlekJobId] = useState(null);
  const [lastQuery, setLastQuery] = useState(false);

  // State variable to track the selected chip. usees the CHIP_JOB_TYPES Enum
  const [chipState, setChipState] = useState(CHIP_JOB_TYPES.Active);
  // state variables to track what chip is currently selected
  const [selectedChipActive, setSelectedChipActive] = useState(true);
  const [selectedChipPast, setSelectedChipPast] = useState(false);

  const scrollViewRef = useRef();

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
      if (!lastQuery) {
        setIsJobListLoading(true);
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
              setIsJobListLoading(false);
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
    setIsInvestorLoading(true);
    if (algoquantApi.token) {
      algoquantApi
        .getInvestor(investorID)
        .then((resp) => {
          setInvestor(resp.data);
          setIsInvestorLoading(false);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          setIsInvestorLoading(false);
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
      case CHIP_JOB_TYPES.Active:
        setChipState(CHIP_JOB_TYPES.Active);
        setSelectedChipActive(true);
        setSelectedChipPast(false);
        break;
      case CHIP_JOB_TYPES.Past:
        setChipState(CHIP_JOB_TYPES.Past);
        setSelectedChipPast(true);
        setSelectedChipActive(false);
    }
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 200);
  };

  // Useeffect that gets triggered when the values of the dependent list changes
  // Used to fetch the list of data for active or past jobs based on the tab the user has selected
  useEffect(() => {
    if (!lastQuery && jobList.length === 0 && lekJobId === null)
      if (chipState === CHIP_JOB_TYPES.Active) {
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
    <View style={{ flex: 1, backgroundColor: THEME.colors.background }}>
      <StatusBar barStyle={"light-content"} />
      {isInvestorLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator
            size="large"
            color={THEME.activityIndicator.color.primary}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView ref={scrollViewRef} style={styles.container}>
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
              setInvestorListRefresh={setInvestorListRefresh}
              investorID={investorID}
              navigation={navigation}
            />
            {/* Header (name, image, start/delete buttons) */}
            <View style={styles.headerContainer}>
              <View style={styles.headerTextAndInvestorImageContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
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
              <Text style={styles.sectionTitleText}>
                Investor Configuration
              </Text>
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
                  <Text style={styles.investorConfigurationDetailsText}>
                    {investor?.loss_stop * 100 + "%"}
                  </Text>
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
                      {isIndicatorSetToCarouselView
                        ? "List View"
                        : "Carousel View"}
                    </Button>
                  </View>
                  {isIndicatorSetToCarouselView ? (
                    <CustomParallaxCarousel
                      data={investor?.indicators}
                      height={Dimensions.get("window").width / 5}
                      width={Dimensions.get("window").width}
                    />
                  ) : (
                    <Animated.View
                      entering={FadeInUp.delay(500)}
                      exiting={FadeOutDown}
                    >
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
                    <CustomParallaxCarousel
                      data={investor?.assets_to_track}
                      height={Dimensions.get("window").width / 5}
                      width={Dimensions.get("window").width}
                    />
                  ) : (
                    <Animated.View
                      entering={FadeInUp.delay(500)}
                      exiting={FadeOutDown}
                    >
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
                  onPress={() => handleJobTypeChipPress(CHIP_JOB_TYPES.Active)}
                >
                  Active
                </Chip>
                <Chip
                  mode="flat"
                  style={styles.chip}
                  selected={selectedChipPast}
                  elevated
                  onPress={() => handleJobTypeChipPress(CHIP_JOB_TYPES.Past)}
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
          </ScrollView>
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
    backgroundColor: THEME.colors.background,
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "3%",
    paddingBottom: "5%",
  },
  headerTextAndInvestorImageContainer: {
    width: "65%",
    flexDirection: "row",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H2,
    fontWeight: "bold",
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
    paddingTop: "5%",
    paddingBottom: "10%",
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    fontWeight: "600",
    color: THEME.text.color.primary,
    marginRight: 10,
    paddingBottom: "2%",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  investorConfigurationDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  investorConfigurationDetailsCol: {
    justifyContent: "center",
  },
  investorConfigurationDetailsText: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
    alignSelf: "flex-end",
    paddingBottom: "2%",
  },
  indicatorsContainer: {
    paddingBottom: "5%",
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
  jobsContainer: {
    paddingTop: "10%",
    paddingBottom: "5%",
  },
  jobList: {
    width: "100%",
  },
  snackbarContainer: { justifyContent: "flex-end" },
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
