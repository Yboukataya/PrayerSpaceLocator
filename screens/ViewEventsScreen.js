import React, { useState, useEffect } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

import AppEventList from '../components/AppEventList';
import AppBuildingEvents from '../components/AppBuildingEvents';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import 'localstorage-polyfill';
import { baseUrl } from '../config/backend-config.js';
import { useIsFocused } from '@react-navigation/native';

import { getMyObject } from '../config/async-utils';

let eventsN = [
  {
    id: 1,
    building: 'VanPelt Library',
    space: 'DUNGEON',
    eventName: 'Maghrib at VP',
    date: new Date(2021, 2, 15, 19, 30, 0, 0),
  },
];

function ViewEventsScreen({ navigation, route }) {
  // Which view appears?
  const [viewByBuilding, setViewByBuilding] = useState(false);

  // Events that I am going to (on the frontend)
  const myEventsState = useState([]);

  // For toggle at the top of screen
  const [viewMyEventsOnly, setViewMyEventsOnly] = useState(false);

  // Events state
  const [events, setEvents] = useState([]);
  const allEventsState = useState([]);

  let [userId, setUserId] = useState(-1);

  // When hitting the "View my events only", only render as visible the events where we are going
  const toggleSwitch = () => {
    setViewMyEventsOnly((previousState) => !previousState);
  };

  // Variable denoting whether or not this screen is focused (for updating events)
  let isFocused = useIsFocused();

  async function refreshEvents() {
    // Load events from the database
    let today = new Date().toISOString().substr(0, 10);
    await fetch(baseUrl + `events-today?Date=${today}`)
      .then((response) => response.json())
      .then((json) => {
        setEvents(json.data);
        allEventsState[1](json.data);
      });
    console.log('yip yip');
  }

  async function loadMyEvents() {
    // Load events from the database
    let today = new Date().toISOString().substr(0, 10);
    console.log(`UserId: ${userId}, Date: ${today}`);
    await fetch(baseUrl + `eventsByUserDate?User=${userId}&Date=${today}`)
      .then((response) => response.json())
      .then((json) => {
        // setEventListEvents(json.data);
        // allEventsState[1](json.data);
        console.log('MyEventsToday:');
        console.log(json.data);
      });
    // console.log('okie');
  }

  useEffect(() => {
    async function updateUserId() {
      await getMyObject('user').then(function (value) {
        setUserId(value.userId);
      });
    }
    updateUserId();
    loadMyEvents();
  }, []);

  useEffect(() => {
    let isMounted = true;
    // Load events from the database when this screen is focused
    if (isFocused) {
      refreshEvents();
    }
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

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
          <AppBuildingEvents events={events} myEventsState={myEventsState} />
        ) : (
          <>
            <View style={styles.switchContainer}>
              <AppText customStyle={{ paddingRight: 10 }}>View My Events Only</AppText>
              <Switch onValueChange={toggleSwitch} value={viewMyEventsOnly} />
            </View>
            <View style={styles.eventListContainer}>
              <AppEventList
                allEventsState={allEventsState}
                events={
                  !viewMyEventsOnly
                    ? events
                    : events.filter((e) => myEventsState[0].includes(e.Eventid))
                }
                myEventsState={myEventsState}
              />
            </View>
            <AppButton
              title='Create New Event'
              onPress={() => navigation.navigate('AddEvent')}
              customStyle={styles.editBtn}
            ></AppButton>
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
