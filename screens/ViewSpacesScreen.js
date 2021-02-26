import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppSpaceList from "../components/AppSpaceList";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import "localstorage-polyfill";
import axios from "axios";
import AppMapView from "../components/AppMapView";

import { baseUrl } from "../config/backend-config";

/**
 * This component specifies appearance of the screen that shows both list of
 * nearby spaces as well as the map.
 * @param {*} param0
 */

// let [spots, setSpots] = useState("");

let spots = [
  {
    id: 1,
    bldgName: "VanPelt Library",
    bldgAddress: "3420 Walnut St, Philadelphia, PA 19104",
    daily_hours: "9AM - 5PM",
    instructions: "Go up to the 4th floor, study room 403",
    capacity: 10,
    spaceName: "VanPelt Library",
    approval: 0,
    latitude: 39.952801,
    longitude: -75.192398,
    imgUrl:
      "https://images.unsplash.com/photo-1516836378273-db6cea41d84c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    bldgName: "DRL",
    bldgAddress: "209 S 33rd Street, 19104",
    daily_hours: "9AM- 5PM",
    instructions: "Go to room A40",
    capacity: 5,
    spaceName: "DRL",
    approval: 1,
    latitude: 39.95217,
    longitude: -75.19007,
    imgUrl:
      "https://images.unsplash.com/photo-1594737660822-97e4807a7533?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80",
  },
];

const get_spaces = async () => {
  let res = await axios({
    method: "get",
    url: `http://node-env.eba-myjteg7z.us-east-1.elasticbeanstalk.com/spaces`,
  }).catch(function (error) {
    console.log("This is the error: ", error);
  });
  // console.log("Behold, AWS!\n", res.data.data);
  // localStorage.setItem("mapinfo", JSON.stringify(res.data.data));
  return JSON.stringify(res.data.data);
};

initMap = async () => {
  // Get user address from lat and long

  // Get all location addresses in db

  // Get all space names, ids, capacity from db
  var http_request2 = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=3335+Woodland+Walk,+Philadelphia,+PA+19104&destinations=`;
  var http_end = `&mode=walking&departure_time=now&key=AIzaSyAU6aosyLmkC7HZadYSlDE5MBp2wy7jxW0`;
  var http_request = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=3335+Woodland+Walk,+Philadelphia,+PA+19104&destinations=3420+Walnut+St,+Philadelphia,+PA+19104|209+S+33rd+St,+Philadelphia,+PA+19104|3730+Walnut+St,+Philadelphia,+PA+19104&mode=walking&departure_time=now&key=AIzaSyAU6aosyLmkC7HZadYSlDE5MBp2wy7jxW0`;

  // console.log(
  //   "THIS IS THE RES INSIDE THE INIT MAP FUNCTION: " +
  //     JSON.parse(res)[0].bldgName
  // );
  const space_names = [];
  const space_ids = [];
  const capacity = [];
  const addresses = [];
  const instructions = [];
  const dailyHours = [];
  var destinations = "";
  let res = await get_spaces().then((response) => {
    // console.log("Response OK!");
    let x = JSON.parse(response);
    // console.log("The JSON response: ", response);

    for (var i = 0; i < x.length; i++) {
      var cur = x[i];
      space_names.push(cur.spaceName);
      space_ids.push(cur.id);
      capacity.push(cur.capacity);
      addresses.push(cur.bldgAddress);
      instructions.push(cur.instructions);
      dailyHours.push(cur.daily_hours);
    }

    for (var i = 0; i < addresses.length; i++) {
      if (i === addresses.length - 1) {
        destinations = destinations.concat(addresses[i].replace(" ", "+"));
      } else {
        destinations = destinations.concat(addresses[i].replace(" ", "+") + "|");
      }
    }
    destinations = destinations.replaceAll(" ", "+");
    http_request2 = http_request2 + destinations + http_end;
    // console.log(
    // "THIS IS THE RES INSIDE THE INIT MAP FUNCTION: " + http_request2
    // );
  });
  // console.log("COMPLETED");
  await axios
    .post(http_request2)
    .then((response) => {
      //console.log("THIS IS RESPONCE",response.data["rows"][0]["elements"][1].duration.text);
      var origins = response.data["origin_addresses"];
      var destinations = response.data["destination_addresses"]; // API CALL to get this info

      // const space_names = ["VanPelt Library", "DRL", "Huntsman Hall"];
      // const space_ids = [1, 2, 3];
      // const capacity = ["10", "3", "5"];
      // const addresses = [
      //   "3420 Walnut St, Philadelphia, PA 19104",
      //   "209 S 33rd St, Philadelphia, PA 19104",
      //   "3730 Walnut St, Philadelphia, PA 19104",
      // ];
      // const instructions = [
      //   "Go up to the 4th floor, study room 403",
      //   "Go to classroom A40",
      //   "Go up walnut it is red building",
      // ]; // Sort the results
      for (var i = 0; i < origins.length; i++) {
        var results = response.data["rows"][0]["elements"];
        var len = destinations.length;
        var indices = new Array(len);
        for (let x = 0; x < len; ++x) {
          indices[x] = x;
        }
        indices.sort(function (a, b) {
          return results[a].duration.value - results[b].duration.value;
        });
        var sorted_results = [];
        var sorted_capacity_results = [];
        var sorted_name_results = [];
        var sorted_ids = [];
        var arr3 = [];
        for (var j = 0; j < results.length; j++) {
          sorted_results.push(results[indices[j]].duration.text);
          sorted_capacity_results.push(capacity[indices[j]]);
          sorted_name_results.push(space_names[indices[j]]);
          sorted_ids.push(instructions[indices[j]]);
          arr3.push({
            building_name: space_names[indices[j]],
            bldgName: space_names[indices[j]],
            spaceName: space_names[indices[j]],
            distance: results[indices[j]].duration.text,
            capacity: capacity[indices[j]],
            instructions: instructions[indices[j]],
            dailyHours: dailyHours[indices[j]],
          });
        }
      }
      console.log("THIS IS ARR3", arr3);
      // setSpots(JSON.stringify(arr3));
      localStorage.setItem("computed", JSON.stringify(arr3));
      return; //return [sorted_results, sorted_capacity_results, sorted_name_results, sorted_ids];
    })
    .catch((err) => {
      console.log(err);
    });
};

function ViewSpacesScreen({ navigation, route }) {
  // console.log(props)
  // useEffect(() => {initMap}, []);
  // console.log("localStorage: ", localStorage);
  // // let locations = JSON.parse(localStorage.getItem("computed"));
  // let locations = globalLocations;
  // let locationsMap = JSON.parse(localStorage.getItem("mapinfo"));
  // backendApi
  //   .get("/spaces")
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log("Here's what went wrong: ", error.status);
  //   });
  let [spaces, setSpaces] = useState([]);

  // get all spaces
  useEffect(() => {
    fetch(baseUrl + "spaces")
      .then((response) => response.json())
      .then((json) => setSpaces(json.data));
  }, []);

  const [mapVisible, setMapVisible] = useState(false);
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.headingContainer}>
        <AppText customStyle={styles.title}>
          View {route.params.viewUnapproved ? "Unapproved" : ""}Spaces
        </AppText>
      </View>

      <View style={styles.container}>
        {/* Render map or list of spaces, based on mapVisible */}
        {/* Always hide map view if an admin is here to look at unapproved */}
        {mapVisible && !route.params.viewUnapproved ? (
          <AppMapView locations={locationsMap} props={(navigation, route)} />
        ) : (
          <View style={styles.spaceListContainer}>
            <AppSpaceList locations={spaces} viewUnapproved={route.params.viewUnapproved} />
          </View>
        )}
      </View>
      {mapVisible && !route.params.viewUnapproved ? (
        <AppButton
          title={mapVisible ? "List View" : "Map View"}
          onPress={() => setMapVisible(!mapVisible)}
        />
      ) : (
        <></>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  spaceListContainer: {
    flex: 1,
    width: "90%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default ViewSpacesScreen;
