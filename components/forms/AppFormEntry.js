import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../AppText";
import AppFormField from "./AppFormField";

function AppFormEntry({ label, bg, ...otherProps }) {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <AppText>{label}</AppText>
      </View>
      <View style={styles.field}>
        <AppFormField {...otherProps} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: bg,

    width: "100%",
    // justifyContent: "flex-end",
    alignItems: "center",
  },
  entryElt: {
    flex: 1,
  },
  field: {
    flex: 3,
    // width: "60%",
  },
  label: {
    paddingRight: 10,

    // width: "40%",
    flex: 2,
  },
});
export default AppFormEntry;
