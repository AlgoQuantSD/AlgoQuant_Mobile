import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import AlgoquantApiContext from "../../constants/ApiContext";
import InvestorListContext from "../../constants/InvestorListContext";
import { THEME } from "../../constants/Theme";
import InvestItemList from "../reusable_components/InvestItemList";
import JobsAndHistoryItemList from "../reusable_components/JobsAndHistoryItemList";
export default function InvestCarousel(props) {
  const {
    setSnackbarMessage,
    setIsSnackbarVisible,
    modalProps,
    isRefreshing,
    scrollToBottom,
    navigation,
  } = props;
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
  const { investorListRefresh, setInvestorListRefresh } =
    useContext(InvestorListContext);

  // Options for the carousel tabs
  const carouselOptions = [
    { name: "Investors", key: "CAROUSEL_TAB_INVESTORS", index: 0 },
    { name: "Jobs", key: "CAROUSEL_TAB_JOBS", index: 1 },
    { name: "History", key: "CAROUSEL_TAB_HISTORY", index: 2 },
  ];

  const [isLoading, setIsLoading] = useState(false);
  // Keeps track of which carousel option is selected
  const [selectedCarouselOptionIndex, setSelectedCarouselOptionIndex] =
    useState(0);

  const [swipeDirection, setSwipeDirection] = useState(null);
  // Track the swipe translation in the x direction
  const [translationX, setTranslationX] = useState(0);

  // State variable to store an array of investor objects
  const [investorList, setInvestorList] = useState([]);

  // State variable to hold array of job objects
  const [jobList, setJobList] = useState([]);

  // Used for pagination of the job list data
  // last evaluated key - used for the api to know if there is more data to fetch
  // lastQUery - true if last evaluated key comes back undefined, aka no more queries
  const [lekJobId, setlekJobId] = useState(null);
  const [lastQuery, setLastQuery] = useState(false);

  // CallBack function to get list of investors in bulk
  const getInvestorList = useCallback(() => {
    setIsLoading(true);
    if (algoquantApi.token) {
      algoquantApi
        .getInvestorList()
        .then((resp) => {
          setInvestorList(resp.data["investors"]);
          setIsLoading(false);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [setInvestorList, algoquantApi]);

  // CallBack function that fetchs for job list data in a paginiated manner
  const getjobList = useCallback(
    (fetchType) => {
      setIsLoading(true);
      if (!lastQuery) {
        if (algoquantApi.token) {
          algoquantApi
            .getJobList(fetchType, null, lekJobId)
            .then((resp) => {
              console.log("job endpoint");
              setlekJobId(resp.data.LEK_job_id);
              setJobList(jobList.concat(resp.data.jobs));

              if (resp.data.LEK_job_id === undefined) {
                setLastQuery(true);
              } else {
                setlekJobId(resp.data.LEK_job_id);
              }
              setIsLoading(false);
            })
            .catch((err) => {
              // TODO: Need to implement better error handling
              console.log(err);
              setIsLoading(false);
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
      lekJobId,
      jobList,
    ]
  );

  // Useeffect that gets triggered when the values of the dependent list changes
  // Used to fetch the list of data for active or past jobs based on the tab the user has selected
  useEffect(() => {
    if (!lastQuery && jobList.length === 0 && lekJobId === null)
      if (selectedCarouselOptionIndex === 1) {
        getjobList("active");
      } else {
        getjobList("complete");
      }
  }, [selectedCarouselOptionIndex, lastQuery, lekJobId, jobList]);

  useEffect(() => {
    if (investorListRefresh) {
      getInvestorList();
    }
    setInvestorListRefresh(false);
  }, [investorListRefresh]);

  // Handles what happens when the user presses one of the carousel tabs or swipes left or right inside of the component
  async function handleCarouselOptionChange(index) {
    setSelectedCarouselOptionIndex(index);
    switch (index) {
      case 0:
        getInvestorList();
        break;
      case 1:
        // Reset the dependent values used to fetch the pagniated job / history list data
        // and the useEffect on line 110 will be called
        setJobList([]);
        setLastQuery(false);
        setlekJobId(null);
        break;
      case 2:
        // Reset the dependent values used to fetch the pagniated job / history list data
        // and the useEffect on line 110 will be called
        setJobList([]);
        setLastQuery(false);
        setlekJobId(null);
        break;
      default:
        break;
    }
    scrollToBottom();
  }

  // Call investorlist when home page is loaded so investors are loaded when home page is
  // Get new investor list if we refresh the home screen
  useEffect(() => {
    getInvestorList();
  }, [isRefreshing]);

  return (
    <View>
      {/* Handles left and right swipe interactions on the carousel */}
      <GestureHandlerRootView>
        <PanGestureHandler
          onGestureEvent={(event) => {
            setTranslationX(event.nativeEvent.translationX);
          }}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state === State.END) {
              if (
                translationX > 0 &&
                Math.abs(translationX) >
                  Math.abs(event.nativeEvent.translationY) &&
                swipeDirection !== "right"
              ) {
                setSwipeDirection("right");
                if (selectedCarouselOptionIndex === 0) {
                  handleCarouselOptionChange(carouselOptions.length - 1);
                } else {
                  handleCarouselOptionChange(selectedCarouselOptionIndex - 1);
                }
              } else if (
                translationX < 0 &&
                Math.abs(translationX) >
                  Math.abs(event.nativeEvent.translationY) &&
                swipeDirection !== "left"
              ) {
                setSwipeDirection("left");
                if (
                  selectedCarouselOptionIndex ===
                  carouselOptions.length - 1
                ) {
                  handleCarouselOptionChange(0);
                } else {
                  handleCarouselOptionChange(selectedCarouselOptionIndex + 1);
                }
              }
              setSwipeDirection(null);
              setTranslationX(0);
            }
          }}
        >
          <View>
            <View style={styles.carouselOptionRow}>
              {carouselOptions.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => handleCarouselOptionChange(item.index)}
                  hitSlop={{ top: 30, bottom: 30 }}
                  style={styles.carouselHeader}
                >
                 
                  <Text
                    style={
                      item.key ===
                      carouselOptions[selectedCarouselOptionIndex].key
                        ? styles.selectedCarouselOption
                        : styles.text
                    }
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {carouselOptions[selectedCarouselOptionIndex].key ===
            "CAROUSEL_TAB_INVESTORS" ? (
              <InvestItemList
                listData={investorList}
                isLoading={isLoading}
                setSnackbarMessage={setSnackbarMessage}
                setIsSnackbarVisible={setIsSnackbarVisible}
                modalProps={modalProps}
                navigation={navigation}
              />
            ) : (
              <JobsAndHistoryItemList
                listData={jobList}
                isLoading={isLoading}
                handleFetchMoreData={getjobList}
                type={carouselOptions[selectedCarouselOptionIndex].key}
                navigation={navigation}
              />
            )}
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselOptionRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: THEME.text.color.primary,
  },
  carouselHeader: {
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  selectedCarouselOption: {
    fontSize: 18,
    fontWeight: "600",
    color: THEME.colors.primaryColor,
    textDecorationLine: "underline",
  },
});
