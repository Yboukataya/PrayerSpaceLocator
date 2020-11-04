import React from "react";
import { StyleSheet } from "react-native";

import AppFormEntry from "../AppFormEntry";
import AppText from "../AppText";
import AppFormField from "./AppFormField";

function AppFormEntry({ entryTitle, ...otherProps }) {
  return (
    <View style={styles.container}>
      <AppText>{entryTitle}</AppText>
      <AppFormField />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
export default AppFormEntry;
