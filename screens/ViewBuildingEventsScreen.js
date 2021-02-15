import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppBuildingList from "../components/AppBuildingList";
import AppEventList from "../components/AppEventList";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import "localstorage-polyfill";
import axios from "axios";
import { PennBuildings } from "../constants/Buildings.js";

function ViewBuildingEventsScreen({navigation, route}) {  
  // var obj = JSON.parse(PennBuildings);
  // var values = Object.keys(obj).map(function (key) { return obj[key]; });
// console.log(values);

let buildings = [];
for (const [name] of Object.entries(PennBuildings)) {
  let bldgName = name;
  let bldg = {
    name: bldgName,
    // TODO: assign this based on number of events happening in the building
    numEvents: 5,
  }
  buildings.push(bldg);
}
buildings.sort((a, b) => (a.label > b.label) ? 1 : -1);

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.headingContainer}>
        <AppText customStyle={styles.title}>Events By Building</AppText>
      </View>

      <View style={styles.container}>
        <View style={styles.buildingListContainer}>
          <AppText>hi</AppText>
          <AppBuildingList buildings={buildings}/>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buildingListContainer: {
    flex: 1,
    width: "90%",
    borderColor: "blue",
    borderWidth: 2,
  },
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

export default ViewBuildingEventsScreen;
