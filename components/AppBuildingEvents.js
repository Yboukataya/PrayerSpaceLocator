import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "./AppButton";
import AppBuildingList from "./AppBuildingList";
import AppEventList from "./AppEventList";
import AppTitle from "./AppTitle.js";
import AppText from "./AppText";
import Screen from "./Screen";
import "localstorage-polyfill";
import axios from "axios";
import { PennBuildings } from "../constants/Buildings.js";

function AppBuildingEvents({events}) {  
  // var obj = JSON.parse(PennBuildings);
  // var values = Object.keys(obj).map(function (key) { return obj[key]; });
// console.log(values);

  let buildings = [];
  for (const [name] of Object.entries(PennBuildings)) {
    let bldgName = name;
    let bldg = {
      name: bldgName,
      // TODO: assign this based on number of events happening in the building
      // JS to count number of events where bldgName matches building of space on the event
      numEvents: 5,
    }
    buildings.push(bldg);
  }
  buildings.sort((a, b) => (a.label > b.label) ? 1 : -1);

    return (
        <View style={styles.container}>
          <View style={styles.buildingListContainer}>
            <AppBuildingList buildings={buildings} events={events}/>
          </View>
        </View>
    );
}
// 
const styles = StyleSheet.create({
  buildingListContainer: {
    flex: 1,
    width: "90%",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
});

export default AppBuildingEvents;
