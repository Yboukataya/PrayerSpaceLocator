import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function WelcomeScreen({ navigation }) {
  // const result = await sortDistances();
  // const handlePress = async () => {

  // }
  return (
    <View style={styles.container}>
      <AppText customStyle={styles.title}>Welcome to</AppText>
      <AppText customStyle={styles.titleOne}>Musallah</AppText>
      {/* <TouchableOpacity
        style={{ marginTop: 32 }}
        onPress={() => this.signOutuser()}
      >
        <Text>Logout</Text>
      </TouchableOpacity> */}
      <AppButton
        title="Add a new Prayer Space"
        onPress={() => navigation.navigate("AddSpace")}
        // if (props.route.params.source == "add") props.navigation.popToTop() else props.navigation.pop())
        //   console.log(
        //     props.navigation.goBack.equals(
        //       props.navigation.navigate("MapView")
        //     )
        //   )
        // }
        // onPress={() => props.navigation.popToTop()}
        customStyle={styles.editBtn}
      ></AppButton>

      <AppButton
        title="List of Prayer Spaces"
        onPress={() => navigation.navigate("ListView")}
        // if (props.route.params.source == "add") props.navigation.popToTop() else props.navigation.pop())
        //   console.log(
        //     props.navigation.goBack.equals(
        //       props.navigation.navigate("MapView")
        //     )
        //   )
        // }
        // onPress={() => props.navigation.popToTop()}
        customStyle={styles.editBtn}
      ></AppButton>

      <AppButton
        title="Map of Prayer Spaces"
        onPress={() => navigation.navigate("MapView")}
        // if (props.route.params.source == "add") props.navigation.popToTop() else props.navigation.pop())
        //   console.log(
        //     props.navigation.goBack.equals(
        //       props.navigation.navigate("MapView")
        //     )
        //   )
        // }
        // onPress={() => props.navigation.popToTop()}
        customStyle={styles.editBtn}
      ></AppButton>

      {/* <TouchableOpacity
        style={{ marginTop: 40 }}
        onPress={() => {
          navigation.navigate("AddSpace");
        }}
      >
        <Text>Add a new Prayer Space</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },
  titleOne: {
    fontSize: 48,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
