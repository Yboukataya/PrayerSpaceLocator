import React, { useState, useEffect } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppEventList from '../components/AppEventList';
import AppBuildingEvents from '../components/AppBuildingEvents';
import AppTitle from '../components/AppTitle.js';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import 'localstorage-polyfill';
import axios from 'axios';
import { baseUrl } from '../config/backend-config.js';

import AppEventListing from '../components/AppEventListing';

let eventsN = [
  {
    id: 1,
    building: 'VanPelt Library',
    space: 'DUNGEON',
    eventName: 'Maghrib at VP',
    date: new Date(2021, 2, 15, 19, 30, 0, 0),
  },
  {
    Eventid: 2,
    Building: 'Houston',
    Space: 'SPARC',
    eventName: 'ZUHR with bros only',
    date: new Date(2021, 2, 15, 13, 30, 0, 0),
  },
  {
    Eventid: 3,
    Building: 'Houston',
    Space: 'SPARC',
    eventName: 'ladies only',
    date: new Date(2021, 2, 15, 13, 35, 0, 0),
  },
  {
    Eventid: 4,
    Building: 'Engineering',
    Space: 'electrical switch room',
    Name: 'sorry, engineering only',
    Date: new Date(2021, 2, 14, 13, 40, 0, 0),
  },
  {
    Eventid: 4,
    Building: 'VanPelt Library',
    Space: 'electrical switch room',
    Name: 'sorry, engineering only',
    Date: new Date(2021, 2, 14, 13, 40, 0, 0),
  },
  {
    Eventid: 4,
    Building: 'Engineering',
    Space: 'electrical switch room',
    Name: 'sorry, engineering only',
    Date: new Date(2021, 2, 14, 13, 40, 0, 0),
  },
  {
    Eventid: 4,
    Building: 'Engineering',
    Space: 'electrical switch room',
    Name: 'sorry, engineering only',
    Date: new Date(2021, 2, 14, 13, 40, 0, 0),
  },
];

function ViewEventsScreen({ navigation, route }) {
  const [viewByBuilding, setViewByBuilding] = useState(true);
  const myEventsState = useState([]);

  const [viewMyEventsOnly, setViewMyEventsOnly] = useState(false);
  const [events, setEvents] = useState([]);

  // When hitting the "View my events only", only render as visible the events where we are going
  const toggleSwitch = () => {
    setViewMyEventsOnly((previousState) => !previousState);
  };

  useEffect(() => {
    fetch(baseUrl + 'events')
      .then((response) => response.json())
      .then((json) => {
        setEvents(json.data);
        console.log(json.data);
      });
  }, []);

  useEffect(() => {
    fetch(baseUrl + 'buildings')
      .then((response) => response.json())
      .then((json) => {
        setEvents(json.data);
        console.log(json.data);
      });
  }, []);

  // TODO: where do we go after adding a new event?

  console.log('events: ', myEventsState[0]);
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.viewSelect}>
        <TouchableOpacity onPress={() => setViewByBuilding(!viewByBuilding)}>
          <AppText customStyle={viewByBuilding ? styles.subTitleSelected : styles.subTitle}>
            Events By Building
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setViewByBuilding(!viewByBuilding)}>
          <AppText customStyle={viewByBuilding ? styles.subTitle : styles.subTitleSelected}>
            All Events Today
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.headingContainer}>
        <AppText customStyle={styles.title}>
          {viewByBuilding ? 'Buildings' : "Today's Events"}
        </AppText>
      </View>

      {/* Toggle switch for my events only / all events */}
      <View style={styles.container}>
        {viewByBuilding ? (
          <AppBuildingEvents events={events} otherProps={(navigation, route)} />
        ) : (
          <>
            <View style={styles.switchContainer}>
              <AppText customStyle={{ paddingRight: 10 }}>View My Events Only</AppText>
              <Switch onValueChange={toggleSwitch} value={viewMyEventsOnly} />
            </View>
            <View style={styles.eventListContainer}>
              <AppEventList
                events={
                  !viewMyEventsOnly
                    ? events
                    : events.filter((e) => myEventsState[0].includes(e.Eventid))
                }
                myEventsState={myEventsState}
              />
            </View>
          </>
        )}
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
    // borderColor: "blue",
    // borderWidth: 2,
    justifyContent: 'center',
  },
  eventListContainer: {
    flex: 1,
    width: '90%',
    // borderColor: "blue",
    // borderWidth: 2,
  },
  subTitle: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitleSelected: {
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: "flex-end",
    paddingTop: 10,
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

export default ViewEventsScreen;
