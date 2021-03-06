import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Formik, Field, Form } from 'formik';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import AppFormEntry from '../components/forms/AppFormEntry';
// import { PennBuildings } from '../constants/Buildings.js';
import { baseUrl } from '../config/backend-config';

import { getMyObject, storeObj } from '../config/async-utils';
const axios = require('axios');

export default function AddEventScreen({ navigation, route }) {
  let buildings = [];
  let spaces = [];
  let [selectedBuilding, setBuilding] = useState('');
  let [selectedSpace, setSpace] = useState('');
  const [eventDate, setEventDate] = useState(new Date(Date.now()));
  const [eventTime, setEventTime] = useState(new Date(Date.now()));
  let [dataBuildings, setBuildings] = useState([]);

  let [dataSpaces, setSpaces] = useState([]);

  let [spaceId, setSpaceId] = useState(-1);

  useEffect(() => {
    fetch(baseUrl + 'buildings')
      .then((response) => response.json())
      .then((json) => {
        setBuildings(json.data);
      });
  }, []);

  dataBuildings.forEach(function (b) {
    let bldgDropdown = {
      label: b.Name,
      value: b.Buildingid,
    };
    buildings.push(bldgDropdown);
  });

  buildings.sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppText customStyle={styles.title}>Add New Event</AppText>
      </View>

      <AppForm
        initialValues={{
          eventName: '',
        }}
        onSubmit={(values) => {
          console.log('eventName: ' + values.eventName);
          console.log('eventBldg: ' + selectedBuilding);
          console.log('eventSpace: ' + selectedSpace);
          console.log('eventDate: ' + eventDate);
          console.log('eventTime: ' + eventTime);

          const save_date = new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate(),
            eventTime.getHours(),
            eventTime.getMinutes()
          );

          // endpoint for adding new event
          let addUrl = baseUrl + 'events?';
          addUrl += `Name=${encodeURIComponent(values.eventName)}&`;
          addUrl += `Date=${encodeURIComponent(save_date.toISOString())}&`;
          addUrl += `Space=${spaceId}`;

          console.log(addUrl);

          fetch(addUrl, {
            method: 'POST',
          })
            .then((response) => response.json())
            .then((json) => console.log('Hooray! ', json));

          navigation.navigate('EventDetail', {
            event: {
              eventName: values.eventName,
              selectedBuilding: selectedBuilding,
              selectedSpace: selectedSpace,
              // save_date()
              date: eventDate.toDateString(),
              time:
                eventTime.getHours() +
                ':' +
                (eventTime.getMinutes() < 10 ? '0' : '') +
                eventTime.getMinutes(),
            },
          });
        }}
      >
        {/* EVENT NAME */}
        <AppFormEntry label='Event Name' name='eventName' placeholder='Event Name' />

        {/* BUILDING DROPDOWN */}
        <View style={styles.bldgDropdownStyle}>
          <View style={{ flex: 3 }}>
            <AppText>Building</AppText>
          </View>

          <View style={{ flex: 7 }}>
            {/* TODO: Fix this dropdown once the database can retrieve buildings */}
            <DropDownPicker
              items={buildings}
              placeholder='Select a building'
              // defaultValue={route.params.existingSpace ? route.params.existingSpace.bldgName : ""}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{ justifyContent: 'flex-start' }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={(item) => {
                setBuilding(item.label);
                // console.log('ITEM: ', item);
                // set ID of the building we're considering
                // update eligible spaces
                fetch(baseUrl + `building-spaces?Buildingid=${item.value}`)
                  .then((response) => response.json())
                  .then((json) => {
                    spaces = [];
                    json.data.forEach(function (s) {
                      let spaceDropdown = {
                        label: s.Name,
                        value: s.Spaceid,
                      };
                      spaces.push(spaceDropdown);
                    });
                    // console.log('NewSPaces: ', spaces);
                    setSpaces(spaces);
                    // spaces.sort((a, b) => (a.label > b.label ? 1 : -1));
                  });
                console.log('Building set!');
              }}
            />
          </View>
        </View>

        {/* SPACE DROPDOWN */}
        <View style={styles.dropdownStyle}>
          <View style={{ flex: 3 }}>
            <AppText>Space Name</AppText>
          </View>

          <View style={{ flex: 7 }}>
            {/* TODO: Disable this dropdown until building is selected */}
            {/* TODO: wait for integration with database */}
            <DropDownPicker
              items={dataSpaces}
              placeholder='Select a Space'
              // defaultValue={route.params.existingSpace ? route.params.existingSpace.bldgName : ""}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{ justifyContent: 'flex-start' }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={(item) => {
                // Set space ID for event submission
                setSpaceId(item.value);
                setSpace(item.label);
                // console.log('Space updated!', item.value, ' | ', spaceId);
              }}
            />
          </View>
        </View>

        {/* DATE DROPDOWN */}
        <View style={styles.dateTimePickerStyle}>
          <View style={{ flex: 3 }}>
            <AppText>Date</AppText>
          </View>
          <View style={{ flex: 7, height: 50 }}>
            <DateTimePicker
              value={eventDate}
              mode='date'
              display='compact'
              onChange={(event, date) => {
                const newDate = date || eventDate;
                setEventDate(newDate);
                console.log(new Date(newDate)); /*console.log("Date Set!");*/
              }}
              style={styles.dateTimePickerComponentStyle}
            />
          </View>
        </View>

        {/* TIME DROPDOWN */}
        <View style={styles.dateTimePickerStyle}>
          <View style={{ flex: 3 }}>
            <AppText>Time</AppText>
          </View>

          <View style={{ flex: 7, height: 50 }}>
            <DateTimePicker
              value={eventTime}
              mode='time'
              display='compact'
              minuteInterval={5}
              onChange={(event, time) => {
                const newTime = time || eventTime;
                setEventTime(newTime);
                console.log(new Date(newTime)); /*console.log("Date Set!");*/
              }}
              style={styles.dateTimePickerComponentStyle}
            />
          </View>
        </View>

        {/* TODO: make this one bigger */}
        <SubmitButton title='Submit!' />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
  },
  dateTimePickerComponentStyle: {
    height: 100,
  },
  dateTimePickerStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  dropdownStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    zIndex: 50,
  },
  bldgDropdownStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    zIndex: 100,
  },
});
