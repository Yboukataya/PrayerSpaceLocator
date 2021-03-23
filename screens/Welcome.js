import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import SyncStorage from "sync-storage";
import "localstorage-polyfill";
global.localStorage;
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { backendApi } from "../config/backend-config";

import axios from "axios";

// const get_spaces = async () => {
//   let res = await axios({
//     method: "get",
//     url: `http://node-env.eba-myjteg7z.us-east-1.elasticbeanstalk.com/spaces`,
//   }).catch(function (error) {
//     console.log("This is the error: ", error);
//   });
//   console.log("Behold, AWS!\n", res.data.data);
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
//     console.log("Response OK!");
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
//       console.log("THIS IS ARR3", arr3);
//       localStorage.setItem("computed", JSON.stringify(arr3));
//       return; //return [sorted_results, sorted_capacity_results, sorted_name_results, sorted_ids];
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// MOVE THIS TO THE LOCATION SCREEN WITH NABEEL TOMORROW ET.
const get_user_location = async () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(
        // `Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`
        // );
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

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      // return value;
      return value;
    }
  } catch (e) {
    // error reading value
  }
};
const getMyObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(String(key));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

  console.log("Done.");
};

function WelcomeScreen({ navigation, route }) {
  // console.log(navigation);

  // TODO: get this from async storage
  // let is_signed_in =
  let [isSignedIn, setSignedIn] = useState("");

  let [is_admin, setIsAdmin] = useState(false);
  let [user, setUser] = useState({});

  useEffect(() => {
    // getData("isSignedIn").then(function (value) {
    //   setSignedIn(value);
    // });

    getMyObject("user").then(function (value) {
      // console.log('VALUE | ', value);
      setUser(value);
      setIsAdmin(value.is_admin == 1);
    });
  }, []);

  return (
    <View style={styles.container}>
      <AppText customStyle={styles.title}>Welcome</AppText>
      <AppText customStyle={styles.titleOne}>{user.userName}</AppText>

      <AppButton
        title="Add a new Prayer Space"
        onPress={() =>
          navigation.navigate("Spaces", {
            screen: "AddSpace",
            // Not updating an existing space here
            params: { existingSpace: undefined },
          })
        }
        customStyle={styles.editBtn}
      ></AppButton>
      <AppButton
        title="Add new Event"
        onPress={() =>
          navigation.navigate("Events", {
            screen: "AddEvent",
          })
        }
        customStyle={styles.editBtn}
      ></AppButton>

      <AppButton
        title="List of Prayer Spaces"
        onPress={() => {
          navigation.navigate("Spaces", {
            screen: "ViewSpaces",
            params: {
              viewUnapproved: false,
            },
          });
        }}
        customStyle={styles.editBtn}
      ></AppButton>

      <AppButton
        title="View Events"
        onPress={() => {
          navigation.navigate("Events", {
            screen: "ViewEvents",
          });
        }}
        customStyle={styles.editBtn}
      ></AppButton>

      {is_admin && (
        <AppButton
          title="Approval needed"
          onPress={() =>
            navigation.navigate("Spaces", {
              screen: "ViewSpaces",
              params: {
                viewUnapproved: true,
              },
            })
          }
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
