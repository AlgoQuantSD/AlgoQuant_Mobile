import { StyleSheet, View } from "react-native";
import HeaderImage from "../../../../../assets/investor_avatars/avatar1.png";
import WelcomeHeader from "./subcomponents/WelcomeHeader";
export default function FeaturesSlide() {
  return (
    <View style={styles.container}>
      <WelcomeHeader title="Features" image={HeaderImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
});
