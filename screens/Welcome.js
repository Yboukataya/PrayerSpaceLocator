import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

function WelcomeScreen({ navigation }) {
  // const result = await sortDistances();
  // const handlePress = async () => {

  // }
  return (
    <View style={styles.container}>
      <Text>Welcome to Musalla! Let us Help you out!</Text>
      {/* <TouchableOpacity
        style={{ marginTop: 32 }}
        onPress={() => this.signOutuser()}
      >
        <Text>Logout</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{ marginTop: 40 }}
        onPress={() => {
          navigation.navigate("AddSpace");
        }}
      >
        <Text>Add a new Prayer Space</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 40 }}
        onPress={() => {
          navigation.navigate("ListView");
        }}
      >
        <Text>ListView!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 40 }}
        onPress={() => {
          navigation.navigate("MapView");
        }}
      >
        <Text>Map View!</Text>
      </TouchableOpacity>
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

export default WelcomeScreen;
