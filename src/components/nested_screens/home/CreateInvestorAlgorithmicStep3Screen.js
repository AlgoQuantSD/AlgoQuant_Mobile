import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorAlgorithmicStep3Screen(props) {
  const { investorObject } = props.route.params;
  console.log("Step 3 ", investorObject);
  const navigation = useNavigation();
  return (
    <View>
      <Text>Create investor screen step 3 {investorObject.indicators[0]}</Text>
      <Button
        buttonColor={THEME.button.primaryColorBackground}
        textColor={THEME.text.secondaryColor}
        onPress={() =>
          navigation.navigate("CreateInvestorAlgorithmicStep4Screen")
        }
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
