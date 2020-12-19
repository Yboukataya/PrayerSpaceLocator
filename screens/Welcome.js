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
        customStyle={styles.editBtn}
      ></AppButton>

      <AppButton
        title="Map of Prayer Spaces"
        onPress={() => navigation.navigate("MapView")}
        customStyle={styles.editBtn}
      ></AppButton>
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
