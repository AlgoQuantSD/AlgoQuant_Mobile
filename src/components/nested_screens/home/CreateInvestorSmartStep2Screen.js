import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorSmartStep2Screen(props) {
  const { investorObject } = props.route.params;
  const navigation = useNavigation();

  return (
    <View>
      <Text>Create smart investor screen step 2</Text>
      <Text>
        Investor name: {investorObject.name} Investor type:{" "}
        {investorObject.type}
      </Text>
      <Button
        buttonColor={THEME.button.primaryColorBackground}
        textColor={THEME.text.secondaryColor}
        onPress={() =>
          navigation.navigate("CreateInvestorSmartStep3Screen", {
            investorObject: investorObject,
          })
        }
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
