import React from "react";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet } from "react-native";

// This file is just to make your life easier so we don't have to use
// SafeAreaView on every screen

function Screen({ children }) {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
}
const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});

export default Screen;
