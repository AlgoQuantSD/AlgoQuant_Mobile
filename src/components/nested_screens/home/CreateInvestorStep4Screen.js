import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { THEME } from "../../../constants/Theme";

export default function CreateInvestorStep4Screen({ navigation }) {
  return (
    <View>
      <Text>Create investor screen step 4</Text>
      <Button
        buttonColor={THEME.button.primaryColorBackground}
        textColor={THEME.text.secondaryColor}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
