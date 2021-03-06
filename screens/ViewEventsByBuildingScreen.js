import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppEventList from '../components/AppEventList';
import AppBuildingEvents from '../components/AppBuildingEvents';
import AppTitle from '../components/AppTitle.js';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import 'localstorage-polyfill';
let events = [
  {
    id: 1,
    building: 'VanPelt Library',
    space: 'DUNGEON',
    eventName: 'Maghrib at VP',
    date: new Date(2021, 2, 15, 19, 30, 0, 0),
  },
  {
    id: 2,
    building: 'Houston',
    space: 'SPARC',
    eventName: 'ZUHR with bros only',
    date: new Date(2021, 2, 15, 13, 30, 0, 0),
  },
  {
    id: 3,
    building: 'Houston',
    space: 'SPARC',
    eventName: 'ladies only',
    date: new Date(2021, 2, 15, 13, 35, 0, 0),
  },
  {
    id: 4,
    building: 'Engineering',
    space: 'electrical switch room',
    eventName: 'sorry, engineering only',
    date: new Date(2021, 2, 14, 13, 40, 0, 0),
  },
];

/**
 * route.params.building:   name of building
 * route.params.event:      events happening only in that building
 */
function ViewEventsByBuildingScreen({ navigation, route }) {
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.headingContainer}>
        <AppText customStyle={styles.title}>{route.params.building}</AppText>
        <AppText>{route.params.address}</AppText>
      </View>

      <View style={styles.container}>
        <View style={styles.eventListContainer}>
          <AppEventList
            events={route.params.events}
            // for buildings, we're just showing events, so no need to pass a modifying function
            allEventsState={[route.params.events, (arr) => {}]}
            myEventsState={route.params.myEventsState}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventListContainer: {
    flex: 1,
    width: '90%',
  },
  subTitle: {
    // color: "blue",
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitleSelected: {
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  viewSelect: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});

export default ViewEventsByBuildingScreen;
