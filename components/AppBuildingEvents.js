import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppBuildingList from './AppBuildingList';
import 'localstorage-polyfill';
import { PennBuildings } from '../constants/Buildings.js';
import { baseUrl } from '../config/backend-config';

function AppBuildingEvents({ events }) {
  let [dataBuildings, setBuildings] = useState([]);
  let buildings = [];

  useEffect(() => {
    fetch(baseUrl + 'buildings')
      .then((response) => response.json())
      .then((json) => {
        setBuildings(json.data);
      });
  }, []);

  dataBuildings.forEach(function (b) {
    let bldgEntry = {
      name: b.Name,
      numEvents: b.Buildingid,
    };
    buildings.push(bldgEntry);
  });

  buildings.sort((a, b) => (a.label > b.label ? 1 : -1));

  // let buildings = [];
  // for (const [name] of Object.entries(PennBuildings)) {
  //   let bldgName = name;
  //   let bldg = {
  //     name: bldgName,
  //     // TODO: assign this based on number of events happening in the building
  //     // JS to count number of events where bldgName matches building of space on the event
  //     numEvents: 5,
  //   };
  //   buildings.push(bldg);
  // }
  // buildings.sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <View style={styles.container}>
      <View style={styles.buildingListContainer}>
        <AppBuildingList buildings={buildings} events={events} />
      </View>
    </View>
  );
}
//
const styles = StyleSheet.create({
  buildingListContainer: {
    flex: 1,
    width: '90%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});

export default AppBuildingEvents;
