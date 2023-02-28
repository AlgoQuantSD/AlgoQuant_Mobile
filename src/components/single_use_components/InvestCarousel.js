import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import InvestItemList from "../reusable_components/InvestItemList";
import JobsAndHistoryItemList from "../reusable_components/JobsAndHistoryItemList";
import {
  MOCK_INVESTORS,
  MOCK_JOBS,
  MOCK_HISTORY,
} from "../../constants/MockData";
import { THEME } from "../../constants/Theme";
import AlgoquantApiContext from "../../constants/ApiContext";

export default function InvestCarousel(props) {
  const {
    handlePressInTouchableElement,
    handlePressOutTouchableElement,
    setSnackbarMessage,
    setIsSnackbarVisible,
    navigation,
  } = props;
  // State variables used to access algoquant SDK API and display/ keep state of user data from database
  const algoquantApi = useContext(AlgoquantApiContext);
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
    if (algoquantApi.token) {
      algoquantApi
        .getInvestorList()
        .then((resp) => {
          setInvestorList(resp.data["investors"]);
        })
        .catch((err) => {
          // TODO: Need to implement better error handling
          console.log(err);
        });
    }
  }, [setInvestorList, algoquantApi]);

  // CallBack function that fetchs for job list data in a paginiated manner
  const getjobList = (fetchType) => {
    console.log("outside of job");

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
          })
          .catch((err) => {
            // TODO: Need to implement better error handling
            console.log(err);
          });
      }
    }
  };

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

  // Handles what happens when the user presses one of the carousel tabs or swipes left or right inside of the component
  async function handleCarouselOptionChange(index) {
    setIsLoading(true);
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
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  // Call investorlist when home page is loaded so investors are loaded when home page is
  useEffect(() => {
    getInvestorList();
  }, []);

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
                handlePressInTouchableElement={handlePressInTouchableElement}
                handlePressOutTouchableElement={handlePressOutTouchableElement}
                setSnackbarMessage={setSnackbarMessage}
                setIsSnackbarVisible={setIsSnackbarVisible}
                navigation={navigation}
              />
            ) : (
              <JobsAndHistoryItemList
                listData={jobList}
                isLoading={isLoading}
                handleFetchMoreData={getjobList}
                type={carouselOptions[selectedCarouselOptionIndex].key}
                handlePressInTouchableElement={handlePressInTouchableElement}
                handlePressOutTouchableElement={handlePressOutTouchableElement}
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
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.primaryColor,
  },
  carouselHeader: {
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  selectedCarouselOption: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.primaryColor,
    textDecorationLine: "underline",
  },
});
