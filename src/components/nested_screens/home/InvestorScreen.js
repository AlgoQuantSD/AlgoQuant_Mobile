import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { investorImagePathList } from "../../../constants/InvestorImagePaths";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { THEME } from "../../../constants/Theme";

export default function InvestorScreen(props, { navigation }) {
  const { investor } = props.route.params;
  const width = Dimensions.get("window").width;

  const indicators = [
    {
      name: "RSI",
    },
    {
      name: "OBV",
    },
    {
      name: "MACD",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{investor.name}</Text>
        <Image
          style={styles.investorImage}
          source={investorImagePathList[investor.imageId]}
        />
        <Ionicons
          style={styles.trashIcon}
          name="trash"
          size={32}
          color="white"
        />
      </View>
      <View style={styles.investorConfigurationContainer}>
        <Text style={styles.sectionTitleText}>Investor Configuration</Text>
        <View style={styles.investorConfigurationDetailsRow}>
          <View style={styles.investorConfigurationDetailsCol}>
            <Text style={styles.text}>Investor name:</Text>
            <Text style={styles.text}>Profit stop:</Text>
            <Text style={styles.text}>Loss stop:</Text>
          </View>
          <View
            style={[
              styles.investorConfigurationDetailsCol,
              { alignItems: "flex-end" },
            ]}
          >
            <Text style={styles.text}>{investor.name}</Text>
            <Text style={styles.text}>{investor.profitStop}</Text>
            <Text style={styles.text}>{investor.lossStop}</Text>
          </View>
        </View>
      </View>
      <View style={styles.indicatorsContainer}>
        <Text style={styles.sectionTitleText}>Indicators</Text>
        <View style={{ flex: 1, backgroundColor: "purple" }}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            mode="parallax"
            data={indicators}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item, index }) => (
              <View
                style={{
                  borderWidth: 1,
                  justifyContent: "center",
                  backgroundColor: "blue",
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 30 }}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
      <Text
        style={styles.text}
        onPress={() => props.navigation.navigate("JobScreen")}
      >
        Press here to view one of {investor.name}'s jobs
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "red",
  },
  text: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.text.color,
  },
  headerContainer: {
    flex: 0.1,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    marginLeft: "5%",
    marginTop: "5%",
    marginRight: "5%",
  },
  headerText: {
    fontSize: THEME.text.fontSizeH2,
    color: THEME.text.color,
    paddingRight: "2%",
  },
  investorImage: { height: 45, width: 30 },
  trashIcon: {
    marginLeft: "auto",
  },
  investorConfigurationContainer: {
    flex: 0.13,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "green",
  },
  sectionTitleText: {
    fontSize: THEME.text.fontSizeH4,
    color: THEME.text.color,
  },
  investorConfigurationDetailsRow: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "blue",
  },
  investorConfigurationDetailsCol: {
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "purple",
  },
  indicatorsContainer: {
    flex: 0.15,
    width: "90%",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "green",
  },
});
