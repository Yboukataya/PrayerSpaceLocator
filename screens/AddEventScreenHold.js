import React, { useEffect, useState } from 'react';
import {
  FlatList,
  LogBox,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Formik, Field, Form } from 'formik';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import AppFormEntry from '../components/forms/AppFormEntry';
// import { PennBuildings } from '../constants/Buildings.js';
import { baseUrl } from '../config/backend-config';

import { getMyObject, storeObj } from '../config/async-utils';
const axios = require('axios');
// import RNPickerSelect from 'react-native-picker-select';
// import RNPickerSelect from '@react-native-picker/picker';

import { Controller, useForm } from 'react-hook-form';

LogBox.ignoreLogs(['Animated: ...', 'Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import t from 'tcomb-form-native';
import RNPickerSelect from 'react-native-picker-select';
// import RNPickerSelect from '@react-native-picker/picker';

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

  let buildingOptions = {};

  useEffect(() => {
    fetch(baseUrl + 'buildings')
      .then((response) => response.json())
      .then((json) => {
        let unsortedBuildings = json.data;
        unsortedBuildings.forEach((b) => {
          setBuildingsObj((prevBldgs) => {
            let x = Object.assign({}, prevBldgs);
            x[b.Buildingid] = b.Name;
            return x;
          });
        });
      });
    fetch(baseUrl + 'spaces')
      .then((response) => response.json())
      .then((json) => {
        let unsortedBuildings = json.data;
        unsortedBuildings.forEach((b) => {
          setSpacesObj((prevSpaces) => {
            let x = Object.assign({}, prevSpaces);
            x[b.Spaceid] = [b.Buildingid, b.Name];
            return x;
          });
        });
      });
  }, []);

  let Building = t.enums(buildingsObj);
  let Space = t.enums(buildingOptions);

  // getSpaces = () => {
  //   console.log('in getspaces');
  //   console.log(formVar.getValue());
  //   console.log(formState);
  //   if (formVar != undefined) {
  //     if (formVar.building != undefined) {
  //       console.log('bldg: ', formVar.building);
  //       fetch(baseUrl + `building-spaces?Buildingid=${value.building}`)
  //         .then((response) => response.json())
  //         .then((json) => {
  //           setSpacesObj({});
  //           if (json.data.length != 0) {
  //             let unsortedSpaces = json.data;
  //             unsortedSpaces.sort((a, b) => (a.Name > b.Name ? 1 : -1));
  //             unsortedSpaces.forEach((b) => {
  //               setSpacesObj((prevSpaces) => {
  //                 let x = Object.assign({}, prevSpaces);
  //                 x[b.Spaceid] = b.Name;
  //                 return x;
  //               });
  //             });
  //           }
  //         });
  //     }
  //   } else {
  //     return t.enums({});
  //   }
  // };

  const Event = t.struct({
    eventName: t.String,
    building: Building,
    // space: getSpaces(),
    space: Space,
    // date: x,
    // time: x,
  });

  const Form = t.form.Form;
  var formVar = { getValue: () => {} };

  function onPress() {}

  // function onChange(value) {
  //   async () => {
  //     // console.log('hi');
  //     console.log(value);
  //     if (value.building != formVar.building) {
  //       // get spaces for the new building
  //       await fetch(baseUrl + `building-spaces?Buildingid=${value.building}`)
  //         .then((response) => response.json())
  //         .then((json) => {
  //           setSpacesObj({});
  //           if (json.data.length != 0) {
  //             let unsortedSpaces = json.data;
  //             unsortedSpaces.sort((a, b) => (a.Name > b.Name ? 1 : -1));
  //             unsortedSpaces.forEach((b) => {
  //               setSpacesObj((prevSpaces) => {
  //                 let x = Object.assign({}, prevSpaces);
  //                 x[b.Spaceid] = b.Name;
  //                 return x;
  //               });
  //             });
  //           }
  //           while (spacesObj.length == 0);
  //           return spacesObj;
  //         })
  //         .then((spacesObj) => {
  //           console.log(spacesObj);
  //           setFormState({
  //             eventName: value.eventName,
  //             building: value.building,
  //             space: { 1: 'yippee', 2: 'woohoo' },
  //           });
  //         });
  //     }
  //   };
  //   // formVar.building = value.building;
  // }

  const { control, handleSubmit, errors } = useForm();

  let [pickedBuilding, setPickedBuilding] = useState(-1);

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppText customStyle={styles.title}>Add New Event</AppText>
      </View>

      <ScrollView style={styles.formContainer}>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
          ]}
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