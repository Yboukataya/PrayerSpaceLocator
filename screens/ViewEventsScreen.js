import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppEventList from "../components/AppEventList";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import "localstorage-polyfill";
import axios from "axios";

/**
 * This component specifies appearance of the screen that shows both list of
 * nearby spaces as well as the map.
 * @param {*} param0
 */

// let [spots, setSpots] = useState("");

// CHECK EVENT OBJECT: 
//  Object {
//   "date": "2/14/2023",
//   "eventName": "Fghfgf",
//   "selectedBuilding": "DRL",
//   "selectedSpace": "DRL",
//   "time"

let events = [
  {
  "id":1,
  "building":"VanPelt Library",
  "space":"DUNGEON",
  "eventName":"Maghrib at VP",
  "date": new Date(2021, 2, 14, 19, 30, 0,0),
  },
  {
    
    "id":2,
    "building":"Houston",
    "space":"SPARC",
    "eventName":"ZUHR with bros only",
    "date":  new Date(2021, 2, 14, 13, 30, 0,0),
  }
]

function ViewEventsScreen({navigation, route}) {
  // console.log(props)
  // useEffect(() => {initMap}, []);
  // console.log("localStorage: ", localStorage);
  // // let locations = JSON.parse(localStorage.getItem("computed"));
  // let locations = globalLocations;
  // let locationsMap = JSON.parse(localStorage.getItem("mapinfo"));
  
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.headingContainer}>
        <AppText customStyle={styles.title}>Today's Events</AppText>
      </View>

      <View style={styles.container}>
        <View style={styles.spaceListContainer}>
            <AppEventList events={events} viewUnapproved={false}/>
        </View>
      </View>
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

export default ViewEventsScreen;
