import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function startLogin() {
  console.log("hey");
}

function ToyPennKey(props) {
  return (
    <View style={styles.container}>
      <AppButton title="login with PennKey" onPress={startLogin}></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToyPennKey;
