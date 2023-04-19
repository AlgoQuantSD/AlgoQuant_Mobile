import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { THEME } from "../../../constants/Theme";

export function FailedStateView(props) {
  const { imageSize, errorMessage, buttonText, buttonAction } = props;
  return (
    <View style={styles.activityIndicator}>
      <Image
        source={{
          uri: "https://gcdnb.pbrd.co/images/vTa9fdqweN7b.png?o=1",
        }}
        style={imageSize}
      />
      <Text style={[styles.text, { paddingBottom: "2%" }]}>{errorMessage}</Text>
      <Button
        buttonColor={THEME.button.primaryColorBackground}
        textColor={THEME.text.color.secondary}
        onPress={buttonAction}
      >
        {buttonText}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
  },
  text: {
    fontSize: THEME.text.fontSize.body,
    color: THEME.text.color.primary,
  },
});
