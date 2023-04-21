import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../../../../../general_constants/theme/Theme";

export default function FeatureItem(props) {
  const { title, descriptionList, borderRight } = props;
  return (
    <View
      style={[
        styles.featureItem,
        borderRight
          ? {
              borderRightWidth: 1,
              borderRightColor: THEME.colors.background,
            }
          : null,
      ]}
    >
      <Text style={styles.featureTitleText}>{title}</Text>
      <View>
        {descriptionList.map((item) => (
          <View key={item.id} style={styles.featureDescriptionItem}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="remove-outline"
                size={THEME.icon.size.small}
                color={THEME.icon.color.secondary}
              />
              <Text style={styles.featureDescriptionText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },

  featureItem: {
    width: "50%",
    alignItems: "center",
  },
  featureTitleText: {
    fontSize: THEME.text.fontSize.H4,
    color: THEME.text.color.secondary,
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  featureDescriptionItem: {
    paddingBottom: "5%",
    paddingLeft: "10%",
  },
  featureDescriptionText: {
    color: THEME.text.color.secondary,
    fontWeight: "200",
    width: "100%",
    maxWidth: "85%",
  },
});
