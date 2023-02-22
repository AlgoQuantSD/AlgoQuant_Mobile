import React, { useState } from "react";
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
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { investorImagePathList } from "../../../constants/InvestorImagePaths";
import CustomParallaxCarousel from "../../reusable_components/CustomParallaxCarousel";
import IndicatorsOrStocksListView from "../../reusable_components/IndicatorsOrStocksListView";
import JobsAndHistoryItemList from "../../reusable_components/JobsAndHistoryItemList";
import CustomModal from "../../reusable_components/CustomModal";
import { deleteInvestorModalBuilder } from "../../../helpers/modalFactory";
import { MOCK_JOBS } from "../../../constants/MockData";
import { chunker } from "../../../helpers/chunker";
import { THEME } from "../../../constants/Theme";

export default function InvestorScreen(props) {
  const { investor, setSnackbarMessage, setIsSnackbarVisible } =
    props.route.params;
  const navigation = useNavigation();

  const chunkedIndicators = chunker(investor.indicators, 3);
  const chunkedStocks = chunker(investor.stocks, 3);

  const [isIndicatorSetToCarouselView, setIsIndicatorSetToCarouselView] =
    useState(true);
  const [isStockSetToCarouselView, setIsStockSetToCarouselView] =
    useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalHeader, setModalHeader] = useState(null);
  const [modalBody, setModalBody] = useState(null);
  const [modalButtons, setModalButtons] = useState(null);
  // This state variable tells will only be true if we just deleted an investor so we can navigate back home
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false);

  const modalProps = {
    isModalVisible,
    setIsModalVisible,
    setModalType,
    setModalTitle,
    setModalHeader,
    setModalBody,
    setModalButtons,
  };

  function handleIndicatorViewChange() {
    setIsIndicatorSetToCarouselView(!isIndicatorSetToCarouselView);
  }
  function handleStockViewChange() {
    setIsStockSetToCarouselView(!isStockSetToCarouselView);
  }
  function handleTrashIconPress() {
    deleteInvestorModalBuilder(modalProps);
  }
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
        modalButtons={modalButtons}
        setModalButtons={setModalButtons}
        setSnackbarMessage={setSnackbarMessage}
        setIsSnackbarVisible={setIsSnackbarVisible}
        setShouldNavigateBack={setShouldNavigateBack}
      />
      {/* Header (name, image, start/delete buttons) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{investor.name}</Text>
        <Image
          style={styles.investorImage}
          source={investorImagePathList[investor.imageId]}
        />
        <TouchableOpacity
          style={styles.headerRowIcon}
          onPress={() => console.log("Start new job")}
        >
          <Ionicons
            name={THEME.icon.name.investorStartJob}
            size={THEME.icon.size.large}
            color={THEME.icon.color.primary}
          />
        </TouchableOpacity>
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
      {/* Investor Configuration */}
      <View style={styles.investorConfigurationContainer}>
        <Text style={styles.sectionTitleText}>Investor Configuration</Text>
        <View style={styles.investorConfigurationDetailsRow}>
          <View style={styles.investorConfigurationDetailsCol}>
            <Text style={styles.text}>Profit stop:</Text>
            <Text style={styles.text}>Loss stop:</Text>
          </View>
          <View
            style={[
              styles.investorConfigurationDetailsCol,
              { alignItems: "flex-end" },
            ]}
          >
            <Text style={styles.text}>{investor.profitStop}</Text>
            <Text style={styles.text}>{investor.lossStop}</Text>
          </View>
        </View>
      </View>
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
          <CustomParallaxCarousel data={investor.indicators} />
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
          <CustomParallaxCarousel data={investor.stocks} />
        ) : (
          <Animated.View entering={BounceIn.delay(500)} exiting={BounceOut}>
            <IndicatorsOrStocksListView data={chunkedStocks} />
          </Animated.View>
        )}
      </View>
      {/* Jobs */}
      <View style={styles.jobsContainer}>
        <Text style={styles.sectionTitleText}>Jobs</Text>
        <View style={styles.jobList}>
          <JobsAndHistoryItemList
            listData={MOCK_JOBS}
            isLoading={false}
            type={"CAROUSEL_TAB_JOBS"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: THEME.colors.background,
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
  headerContainer: {
    flex: 0.1,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",

    marginLeft: "5%",
    marginTop: "2%",
    marginRight: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSize.H2,
    color: THEME.text.color.primary,
    paddingRight: "2%",
  },
  investorImage: { height: 45, width: 30 },
  headerRowIcon: {
    marginLeft: "auto",
  },
  investorConfigurationContainer: {
    flex: 0.1,
    width: "90%",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.primary,
  },
  investorConfigurationDetailsRow: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  investorConfigurationDetailsCol: {
    height: "100%",
    justifyContent: "space-between",
  },
  indicatorsContainer: {
    flex: 0.15,
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
    flex: 0.15,
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
    flex: 0.47,
    width: "90%",
    marginTop: "10%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: "5%",
  },
  jobList: {
    width: "100%",
  },
});
