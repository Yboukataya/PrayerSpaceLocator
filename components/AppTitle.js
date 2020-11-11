import { StyleSheet } from "react-native";
import AppText from "./AppText.js";

import React from "react";

/**
 * This component defines a standard title for the top of a screen to reduce
 * duplication in other screens
 * @param {*} param0
 */

function AppTitle({ children }) {
  return <AppText customStyle={styles.title}>{children}</AppText>;
}
const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontWeight: "600",
  },
});
export default AppTitle;
