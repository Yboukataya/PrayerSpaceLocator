import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../components/AppText";

function AppSpaceDetail({ space, style, detailTitle, detailKey }) {
  return (
    <View style={styles.detailEntry}>
      <AppText>
        <AppText customStyle={styles.detailTitleStyle}>{detailTitle}: </AppText>
        {space[detailKey]}
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  detailEntry: {
    marginBottom: 20,
  },
  detailTitleStyle: {
    fontWeight: "bold",
  },
});
export default AppSpaceDetail;
