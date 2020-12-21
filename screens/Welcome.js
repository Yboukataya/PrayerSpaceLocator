import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import SyncStorage from "sync-storage";

// MOVE THIS TO THE LOCATION SCREEN WITH NABEEL TOMORROW ET.
const get_user_location = async () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          `Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`
        );
        SyncStorage.set(origin, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        return {
          // lat: position.coords.latitude,
          // lng: position.coords.longitude,
        };
      },
      (err) => {
        return [];
      }
    );
  } else {
    return [];
  }
};

function WelcomeScreen(props) {
  one = 2048;
  console.log("WelcomeScreen: ", props);
  return (
    <View style={styles.container}>
      <AppText customStyle={styles.title}>Welcome</AppText>
      <AppText customStyle={styles.titleOne}>
        {props.route.params.userName.userName}!
      </AppText>

      <AppButton
        title="Add a new Prayer Space"
        onPress={() => props.navigation.navigate("AddSpace")}
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
        onPress={() => {
          get_user_location();
          props.navigation.navigate("ViewSpaces");
        }}
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

      {props.route.params.is_admin.is_admin && (
        <AppButton
          title="Approval needed"
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
      )}
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
