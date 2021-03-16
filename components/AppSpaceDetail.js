import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../components/AppText";

/**
 * This component defines the layout of one "detail" on the page that
 * describes attributes of a single space. Example:
 * Instructions: Go inside Houston Hall,...
 *
 * This component defines how that detail will be laid out (ex. bolding the
 * word "instructions", etc)
 */

function AppSpaceDetail({ space, style, detailTitle, detailKey, detailFunction }) {
  return (
    <View style={styles.detailEntry}>
      <AppText>
        <AppText customStyle={styles.detailTitleStyle}>{detailTitle}: </AppText>
        {detailFunction ? detailFunction(space[detailKey]) : space[detailKey]}
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  detailEntry: {
    marginBottom: 10,
  },
  detailTitleStyle: {
    fontWeight: "bold",
  },
});
export default AppSpaceDetail;
