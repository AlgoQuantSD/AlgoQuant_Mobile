import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function TypewriterAnimatedText(props) {
  const { text, style } = props;
  const [typedText, setTypedText] = useState("");
  const textToType = text;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText(textToType.slice(0, index + 1));
      index++;
      if (index === textToType.length) {
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [textToType]);

  return (
    <View>
      <Text style={style}>{typedText}</Text>
    </View>
  );
}
