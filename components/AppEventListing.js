import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import * as Calendar from 'expo-calendar';

import AppButton from './AppButton';
import AppText from './AppText';

import { baseUrl } from '../config/backend-config.js';
import { getMyObject } from '../config/async-utils';

async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
  const defaultCalendars = calendars.filter((each) => each.title === 'Calendar');
  return defaultCalendars[0];
}

async function createEvent(event) {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'YeRubbishCalendar' };

  await Calendar.createEventAsync(defaultCalendarSource.id, {
    title: event.Name,
    startDate: event.Date,
    endDate: new Date(event.Date.getTime() + 15 * 60000),
    location: event.selectedSpace + ' in ' + event.selectedBuilding,
  });
}

function AppSpaceListing({ event, myEventsState }) {
  let [spaceName, setSpaceName] = useState('');
  let [bldgName, setBldgName] = useState('');
  let [userId, setUserId] = useState(-1);

  useEffect(() => {
    const getCal = async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      }
    };
    getCal();
    let bldgId = -1;

    // Get the name of the space using the space ID
    fetch(baseUrl + `space?Spaceid=${event.Space}`)
      .then((response) => response.json())
      .then((json) => {
        bldgId = json.data[0].Building;
        let nameOfSpace = json.data[0].Name;
        setSpaceName(nameOfSpace);
      })
      .then(() => {
        // Get the name of the building from the space's building ID
        fetch(baseUrl + `building?Buildingid=${bldgId}`)
          .then((response) => response.json())
          .then((json) => {
            setBldgName(json.data[0].Name);
          });
      });

    getMyObject('user').then(function (value) {
      setUserId(value.userId);
    });
  }, []);

  event.Date = new Date(event.Date);
  const navigation = useNavigation();

  return (
    <View style={styles.listingContainer}>
      <View style={styles.detailContainer}>
        {/* for the text information */}
        <View style={styles.eventDetailTextStyle}>
          <AppText>{event.Name}</AppText>
          <AppText customStyle={styles.capacityStyle}>{spaceName + ' in ' + bldgName}</AppText>
          <AppText customStyle={styles.capacityStyle}>
            Time:{' '}
            {event.Date.getHours() +
              ':' +
              (event.Date.getMinutes() < 10 ? '0' : '') +
              event.Date.getMinutes()}
          </AppText>
        </View>
      </View>

      {/* buttons on the right */}
      <View style={styles.buttonsContainer}>
        <View style={styles.pplGoingStyleView}>
          <AppText style={styles.pplGoingStyle}>3 going</AppText>
        </View>

        <TouchableOpacity
          style={styles.btnViewEvent}
          onPress={() =>
            navigation.navigate('EventDetail', {
              event: {
                eventName: event.Name,
                selectedSpace: spaceName,
                selectedBuilding: bldgName,
                date: event.Date.toDateString(),
                time: event.Date.getHours() + ':' + event.Date.getMinutes(),
              },
            })
          }
        >
          <Text style={styles.btnText}>View Event</Text>
        </TouchableOpacity>
        {!myEventsState[0].includes(event.Eventid) ? (
          <TouchableOpacity
            style={styles.btnJoinEvent}
            onPress={() => {
              // Create the event on user's calendar
              createEvent(event);

              // Notify database that a new attendee is going
              fetch(`${baseUrl}rsvp?Userid=${userId}&Eventid=${event.Eventid}`, {
                method: 'POST',
              });
              // call setState for myEvents: update list of my events
              myEventsState[1]((oldArray) =>
                oldArray.includes(event.Eventid) ? oldArray : [...oldArray, event.Eventid]
              );
            }}
          >
            <Text style={styles.btnText}>Join Event</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.btnJoinEvent}
              onPress={() => {
                // TODO: remove the event from the array
                // myEventsState[1]((oldArray) => oldArray.splice(oldArray.indexOf(event.Eventid), 1));
                console.log('not goin no more!');
              }}
            >
              <Text style={styles.btnText}>Going!</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnJoinEvent: {
    backgroundColor: '#46D811',
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
  },
  btnViewEvent: {
    backgroundColor: '#00BCFF',
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 100,
    flex: 3,
  },
  capacityStyle: {
    color: 'goldenrod',
  },
  detailContainer: {
    flex: 7,
  },
  distStyle: {
    color: 'green',
  },
  eventDetailTextStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  listingContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  pplGoingStyleView: {
    padding: 1,
  },
});

export default AppSpaceListing;
