import React from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import SyncStorage from "sync-storage";

import * as Google from "expo-google-app-auth";
import getEnvVars from "../environment";

const IOS_AUTH_ID = getEnvVars().ios_auth_key;
// TODO: set android in environment.js
//const ANDROID_AUTH_ID = getEnvVars().android_auth_key;
let userName = "";
let userEmail = "";
let accessToken = "";
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

async function signOutWithGoogleAsync() {
  userName = "";
  userEmail = "";
  accessToken = "";
  await Google.logOutAsync();
}

async function addOrFindUser(userEmail, isAdmin) {
  // console.log(bldgName);
  const axios = require("axios");
  let data = {
    email: userEmail,
    is_admin: false,
  };
  let url = `http://localhost:8080/user/`;
  let res = await axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .catch(function (error) {
      console.log("This is the error: ", error);
    });
  console.log("THIS IS RES" + res);
  return res;
}

async function isAdmin(userEmail) {
  const axios = require("axios");
  let url = `http://localhost:8080/user?email=` + userEmail;
  let res = await axios.get(url).catch(function (error) {
    console.log("This is the error for CHECKING ADMIN: ", error);
  });
  console.log("THIS IS RES for ADMIN " + res.data.admin);
  return res.data.admin;
}

async function signInWithGoogleAsync(props) {
  try {
    const result = await Google.logInAsync({
      androidClientId: "TODO",
      iosClientId: IOS_AUTH_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      console.log("accessToken: " + result.accessToken);
      console.log("name: " + result.user.name);
      console.log("fName: " + result.user.givenName);
      console.log("email: " + result.user.email + "\n");
      if (!result.user.email.endsWith("upenn.edu")) {
        console.log("error");
        signOutWithGoogleAsync();
        throw "Not a Penn email";
      }

      userName = result.user.givenName;
      userEmail = result.user.email;
      accessToken = result.user.accessToken;

      // create function to check if user exists in db, this is a waste but ok for demo
      await addOrFindUser(userEmail, false);
      let is_admin = await isAdmin(userEmail);

      props.navigation.navigate("Welcome", {
        userName: { userName },
        userEmail: { userEmail },
        is_admin: { is_admin },
      });
      console.log("OK");
      return result.accessToken;
    } else {
      Alert.alert(
        "Login Error",
        "Hmm, looks like your login didn't go through :(",
        [{ text: "Ok" }]
      );
      return { cancelled: true };
    }
  } catch (e) {
    if (e == "Not a Penn email") {
      Alert.alert(
        "Login Error",
        "Whoops! This service is only for Penn students.",
        [{ text: "Ok" }]
      );
      console.log("Nice try, sucker");
    }
    return { error: true };
  }
}

function LandingScreen(props) {
  one = 1;
  console.log(props);
  return (
    <View style={styles.container}>
      <AppText customStyle={styles.title}>Welcome to</AppText>
      <AppText customStyle={styles.titleOne}>Musallah</AppText>

      <AppButton
        title="Login"
        // onPress={() => navigation.navigate("Welcome")}
        onPress={signInWithGoogleAsync(props)}
        customStyle={styles.editBtn}
      ></AppButton>

      <AppButton
        title="Continue as Guest"
        onPress={() => {
          get_user_location();
          navigation.navigate("ViewSpaces");
        }}
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

export default LandingScreen;
