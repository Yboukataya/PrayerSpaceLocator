import React, { useEffect, useState } from 'react';
import { FlatList, LogBox, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Formik, Field, Form } from 'formik';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import AppFormEntry from '../components/forms/AppFormEntry';
// import { PennBuildings } from '../constants/Buildings.js';
import { baseUrl } from '../config/backend-config';

import { getMyObject, storeObj } from '../config/async-utils';
const axios = require('axios');

// LogBox.ignoreLogs(['Animated: ...', 'Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import t from 'tcomb-form-native';

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
  let [buildingsObj, setBuildingsObj] = useState({});
  let [spacesObj, setSpacesObj] = useState({});
  let [formState, setFormState] = useState({});

  useEffect(() => {
    fetch(baseUrl + 'buildings')
      .then((response) => response.json())
      .then((json) => {
        let unsortedBuildings = json.data;
        unsortedBuildings.sort((a, b) => (a.Name > b.Name ? 1 : -1));
        unsortedBuildings.forEach((b) => {
          setBuildingsObj((prevBldgs) => {
            let x = Object.assign({}, prevBldgs);
            x[b.Buildingid] = b.Name;
            return x;
          });
        });
      });
  }, []);

  let Building = t.enums(buildingsObj);
  let Space = t.enums(spacesObj);

  const Event = t.struct({
    eventName: t.String,
    building: Building,
    space: Space,
    // date: x,
    // time: x,
  });

  const Form = t.form.Form;
  var formVar;

  function onPress() {}

  function onChange(value) {
    // console.log('hi');
    console.log(value);
    if (value.building != formVar.building) {
      // get spaces for the new building
      fetch(baseUrl + `building-spaces?Buildingid=${value.building}`)
        .then((response) => response.json())
        .then((json) => {
          setSpacesObj({});
          if (json.data.length != 0) {
            let unsortedSpaces = json.data;
            unsortedSpaces.sort((a, b) => (a.Name > b.Name ? 1 : -1));
            unsortedSpaces.forEach((b) => {
              setSpacesObj((prevSpaces) => {
                let x = Object.assign({}, prevSpaces);
                x[b.Spaceid] = b.Name;
                return x;
              });
            });
          }
        });
      setFormState(value);
    }
    formVar.building = value.building;
  }

  // Custom form options: labels, placeholder, etc
  let options = {
    // order: [
    //   'spaceName',
    //   'building',
    //   'capacity',
    //   'passerby',
    //   'carpet',
    //   'wuduNearby',
    //   'noise',
    //   'instructions',
    //   'cleanliness',
    // ],
    // fields: {
    //   instructions: {
    //     label: 'Directions',
    //     placeholder: 'How do you get to this space?',
    //     multiline: true,
    //   },
    //   carpet: {
    //     label: 'Prayer rugs available?',
    //   },
    //   capacity: {
    //     label: 'How many can pray here comfortably?',
    //     placeholder: 'Capacity',
    //   },
    //   passerby: {
    //     label: 'Is the space relatively private?',
    //   },
    //   noise: {
    //     label: 'Noise level',
    //   },
    // },
  };

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppText customStyle={styles.title}>Add New Event</AppText>
      </View>

      <ScrollView style={styles.formContainer}>
        <Form
          type={Event}
          ref={(c) => (formVar = c)}
          options={options}
          onChange={onChange}
          value={formState}
        />
      </ScrollView>

      <AppButton title='Submit Event' customStyle={styles.editBtn}></AppButton>
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
