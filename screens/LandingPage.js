import React from "react";
import { Alert, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

import SyncStorage from "sync-storage";
import "localstorage-polyfill";
// global.localStorage;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Google from "expo-google-app-auth";
import getEnvVars from "../environment";

// TODO: when we move to email password login, use the secureStore expo package :)

const IOS_AUTH_ID = getEnvVars().ios_auth_key;
// TODO: set android in environment.js
//const ANDROID_AUTH_ID = getEnvVars().android_auth_key;
let userName = "";
let userEmail = "";
let accessToken = "";
// MOVE THIS TO THE LOCATION SCREEN WITH NABEEL TOMORROW ET.
// const get_user_location = async () => {
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.log(
//           `Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`
//         );
//         SyncStorage.set(origin, {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//         return {
//           // lat: position.coords.latitude,
//           // lng: position.coords.longitude,
//         };
//       },
//       (err) => {
//         return [];
//       }
//     );
//   } else {
//     return [];
//   }
// };

// const get_spaces = async () => {
//   let res = await axios({
//     method: "get",
//     url: `http://localhost:8080/spaces`,
//   }).catch(function (error) {
//     console.log("This is the error: ", error);
//   });
//   console.log(res.data.data);
//   localStorage.setItem("mapinfo", JSON.stringify(res.data.data));
//   return JSON.stringify(res.data.data);
// };

// initMap = async () => {
//   // Get user address from lat and long

//   // Get all location addresses in db

//   // Get all space names, ids, capacity from db
//   var http_request2 = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=3335+Woodland+Walk,+Philadelphia,+PA+19104&destinations=`;
//   var http_end = `&mode=walking&departure_time=now&key=AIzaSyAU6aosyLmkC7HZadYSlDE5MBp2wy7jxW0`;
//   var http_request = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=3335+Woodland+Walk,+Philadelphia,+PA+19104&destinations=3420+Walnut+St,+Philadelphia,+PA+19104|209+S+33rd+St,+Philadelphia,+PA+19104|3730+Walnut+St,+Philadelphia,+PA+19104&mode=walking&departure_time=now&key=AIzaSyAU6aosyLmkC7HZadYSlDE5MBp2wy7jxW0`;

//   // console.log(
//   //   "THIS IS THE RES INSIDE THE INIT MAP FUNCTION: " +
//   //     JSON.parse(res)[0].bldgName
//   // );
//   const space_names = [];
//   const space_ids = [];
//   const capacity = [];
//   const addresses = [];
//   const instructions = [];
//   const dailyHours = [];
//   var destinations = "";
//   let res = await get_spaces().then((response) => {
//     let x = JSON.parse(response);

//     for (var i = 0; i < x.length; i++) {
//       var cur = x[i];
//       space_names.push(cur.spaceName);
//       space_ids.push(cur.id);
//       capacity.push(cur.capacity);
//       addresses.push(cur.bldgAddress);
//       instructions.push(cur.instructions);
//       dailyHours.push(cur.daily_hours);
//     }

//     for (var i = 0; i < addresses.length; i++) {
//       if (i === addresses.length - 1) {
//         destinations = destinations.concat(addresses[i].replace(" ", "+"));
//       } else {
//         destinations = destinations.concat(
//           addresses[i].replace(" ", "+") + "|"
//         );
//       }
//     }
//     destinations = destinations.replaceAll(" ", "+");
//     http_request2 = http_request2 + destinations + http_end;
//     // console.log(
//     // "THIS IS THE RES INSIDE THE INIT MAP FUNCTION: " + http_request2
//     // );
//   });
//   // console.log("COMPLETED");
//   await axios
//     .post(http_request2)
//     .then((response) => {
//       //console.log("THIS IS RESPONCE",response.data["rows"][0]["elements"][1].duration.text);
//       var origins = response.data["origin_addresses"];
//       var destinations = response.data["destination_addresses"]; // API CALL to get this info

//       // const space_names = ["VanPelt Library", "DRL", "Huntsman Hall"];
//       // const space_ids = [1, 2, 3];
//       // const capacity = ["10", "3", "5"];
//       // const addresses = [
//       //   "3420 Walnut St, Philadelphia, PA 19104",
//       //   "209 S 33rd St, Philadelphia, PA 19104",
//       //   "3730 Walnut St, Philadelphia, PA 19104",
//       // ];
//       // const instructions = [
//       //   "Go up to the 4th floor, study room 403",
//       //   "Go to classroom A40",
//       //   "Go up walnut it is red building",
//       // ]; // Sort the results
//       for (var i = 0; i < origins.length; i++) {
//         var results = response.data["rows"][0]["elements"];
//         var len = destinations.length;
//         var indices = new Array(len);
//         for (let x = 0; x < len; ++x) {
//           indices[x] = x;
//         }
//         indices.sort(function (a, b) {
//           return results[a].duration.value - results[b].duration.value;
//         });
//         var sorted_results = [];
//         var sorted_capacity_results = [];
//         var sorted_name_results = [];
//         var sorted_ids = [];
//         var arr3 = [];
//         for (var j = 0; j < results.length; j++) {
//           sorted_results.push(results[indices[j]].duration.text);
//           sorted_capacity_results.push(capacity[indices[j]]);
//           sorted_name_results.push(space_names[indices[j]]);
//           sorted_ids.push(instructions[indices[j]]);
//           arr3.push({
//             building_name: space_names[indices[j]],
//             bldgName: space_names[indices[j]],
//             spaceName: space_names[indices[j]],
//             distance: results[indices[j]].duration.text,
//             capacity: capacity[indices[j]],
//             instructions: instructions[indices[j]],
//             dailyHours: dailyHours[indices[j]],
//           });
//         }
//       }
//       // console.log("THIS IS ARR3", arr3);
//       localStorage.setItem("computed", JSON.stringify(arr3));
//       return; //return [sorted_results, sorted_capacity_results, sorted_name_results, sorted_ids];
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
import { baseUrl } from "../config/backend-config";

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
  // console.log("THIS IS RES" + res);
  return res;
}

async function isAdmin(userEmail) {
  const axios = require("axios");
  let url = `http://localhost:8080/user?email=` + userEmail;
  let res = await axios.get(url).catch(function (error) {
    // console.log("This is the error for CHECKING ADMIN: ", error);
  });
  // console.log("THIS IS RES for ADMIN " + res.data.admin);
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

      navigation.navigate("Welcome", {
        userName: { userName },
        userEmail: { userEmail },
        is_admin: { is_admin },
      });
      console.log("OK");
      return result.accessToken;
    } else {
      Alert.alert("Login Error", "Hmm, looks like your login didn't go through :(", [
        { text: "OK" },
      ]);
      return { cancelled: true };
    }
  } catch (e) {
    if (e == "Not a Penn email") {
      Alert.alert("Login Error", "Whoops! This service is only for Penn students.", [
        { text: "Ok" },
      ]);
      console.log("Nice try, sucker");
    }
    return { error: true };
  }
}

const storeData = async (key, value) => {
  console.log("GOTCHA DATA BOY");
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const storeObj = async (key, value) => {
  console.log("GOTCHA JSON BOY");
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppText customStyle={styles.title}>Welcome to</AppText>
      <AppText customStyle={styles.titleOne}>Musallah</AppText>

      <AppButton
        title="Login"
        onPress={() => signInWithGoogleAsync(props)}
        // onPress={() => {
        //   // TODO: handle promise rejection?
        //   storeData("isSignedIn", "true");
        //   storeObj("user", {
        //     userName: "señor ozer",
        //     userEmail: "ozer@math.upenn.edu",
        //     is_admin: true,
        //   });
        //   console.log("Store ok!");
        //   navigation.navigate("Welcome", {
        //     userName: "mrozer",
        //     userEmail: "ozer@upenn.edu",
        //     is_admin: true,
        //   });
        // }}
        customStyle={styles.editBtn}
      ></AppButton>

      <AppButton
        title="Continue as Guest"
        onPress={() => {
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
