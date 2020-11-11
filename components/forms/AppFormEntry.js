import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../AppText";
import AppFormField from "./AppFormField";

/**
 * This component is for our Formik forms. It creates a row in a form with a
 * label aligned on the left and a form field on the right.
 * @param {*} param0
 */

function AppFormEntry({ label, ...otherProps }) {
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
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  field: {
    flex: 7,
  },
  label: {
    flex: 3,
    paddingRight: 10,
  },
});
export default AppFormEntry;
