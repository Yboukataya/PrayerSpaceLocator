import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppBuildingList from './AppBuildingList';
import 'localstorage-polyfill';
import { PennBuildings } from '../constants/Buildings.js';
import { baseUrl } from '../config/backend-config';

function AppBuildingEvents({ events, myEventsState }) {
  let [dataBuildings, setBuildings] = useState([]);
  let buildings = [];

  useEffect(() => {
    async function getBuildings() {
      await fetch(baseUrl + 'buildings')
        .then((response) => response.json())
        .then((json) => {
          setBuildings(json.data);
        });
    }
    getBuildings();
    console.log('got buildings OK');
  }, []);

  dataBuildings.forEach(async function (b) {
    let bldgEntry = {
      name: b.Name,
      address: b.Address,
      Buildingid: b.Buildingid,
    };
    buildings.push(bldgEntry);
  });

  buildings.sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <View style={styles.container}>
      <View style={styles.buildingListContainer}>
        <AppBuildingList buildings={buildings} events={events} myEventsState={myEventsState} />
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
