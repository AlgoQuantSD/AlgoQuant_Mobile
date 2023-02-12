import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { investorImagePathList } from "../../constants/InvestorImagePaths";
import { THEME } from "../../constants/Theme";

export default function JobsAndHistoryItemList(props) {
  const { listData, isLoading } = props;
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size="large"
            color={THEME.loadingIndicator.color}
          />
        </View>
      ) : (
        <View style={styles.listItems}>
          <ScrollView>
            {listData.map((item) => {
              return (
                <TouchableWithoutFeedback key={item.id}>
                  <View style={styles.listItem}>
                    <View style={styles.itemName}>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                    <View style={styles.itemBalance}>
                      <Text style={styles.text}>${item.balance}</Text>
                      <Text
                        style={
                          item.percentChange >= 0
                            ? styles.percentChangeUpText
                            : styles.percentChangeDownText
                        }
                      >
                        ({item.percentChange})
                      </Text>
                      {item.percentChange >= 0 ? (
                        <Ionicons
                          name="caret-up-outline"
                          size={12}
                          color={THEME.colors.primary}
                        />
                      ) : (
                        <Ionicons
                          name="caret-down-outline"
                          size={12}
                          color={THEME.colors.danger}
                        />
                      )}
                    </View>
                    <View style={styles.itemInvestor}>
                      <Image
                        style={styles.investorImage}
                        source={investorImagePathList[item.investor.imageId]}
                      />
                      <Text style={styles.investorNameText}>
                        {item.investor.name}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
  },
  text: {
    color: "white",
  },
  activityIndicator: {
    paddingTop: "10%",
  },
  listItems: {
    height: 600,
    width: "100%",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 75,
    width: "100%",
    marginBottom: "5%",
    borderRadius: 10,
    backgroundColor: THEME.investCard.backgroundColor,
  },
  itemName: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemBalance: {
    flexDirection: "row",
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemInvestor: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  investorImage: { height: 30, width: 20 },
  investorNameText: {
    fontSize: 10,
    color: THEME.text.color,
  },
  percentChangeUpText: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.primary,
    marginLeft: "2%",
  },
  percentChangeDownText: {
    fontSize: THEME.text.fontSizeBody,
    color: THEME.colors.danger,
    marginLeft: "2%",
  },
});
