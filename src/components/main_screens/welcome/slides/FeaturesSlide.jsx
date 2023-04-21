import { StyleSheet, View } from "react-native";
import HeaderImage from "../../../../../assets/investor_avatars/avatar1.png";
import { THEME } from "../../../../general_constants/theme/Theme";
import {
  BACKTEST_DESCRIPTION,
  INVESTOR_DESCRIPTION,
  JOB_DESCRIPTION,
  PAPER_TRADING_DESCRIPTION,
} from "./constants/featureDescriptions";
import FeatureItem from "./subcomponents/FeatureItem";
import WelcomeHeader from "./subcomponents/WelcomeHeader";

export default function FeaturesSlide() {
  return (
    <View style={styles.container}>
      <WelcomeHeader title="Features" image={HeaderImage} />
      <View
        style={[
          styles.featureRow,
          { borderBottomWidth: 1, borderBottomColor: THEME.colors.background },
        ]}
      >
        <FeatureItem
          title="Investors"
          descriptionList={INVESTOR_DESCRIPTION}
          borderRight={true}
        />

        <FeatureItem
          title="Backtesting"
          descriptionList={BACKTEST_DESCRIPTION}
        />
      </View>
      <View style={styles.featureRow}>
        <FeatureItem
          title="Jobs"
          descriptionList={JOB_DESCRIPTION}
          borderRight={true}
        />

        <FeatureItem
          title="Paper Trading"
          descriptionList={PAPER_TRADING_DESCRIPTION}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  featureRow: {
    flexDirection: "row",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
