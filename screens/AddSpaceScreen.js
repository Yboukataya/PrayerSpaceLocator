import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Formik, Field, Form } from 'formik';

import DropDownPicker from 'react-native-dropdown-picker';

import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import AppFormEntry from '../components/forms/AppFormEntry';
import { PennBuildings } from '../constants/Buildings.js';

import { baseUrl } from '../config/backend-config.js';

// addSpace = async (
//   bldgName,
//   bldgAddress,
//   instructions,
//   capacity,
//   daily_hours,
//   spaceName
// ) => {
//   console.log(bldgName);
//   const axios = require("axios");
//   let data = {
//     bldgName: bldgName,
//     bldgAddress: bldgAddress,
//     instructions: instructions,
//     capacity: capacity,
//     daily_hours: daily_hours,
//     spaceName: spaceName,
//     approval: false,
//   };
//   let url = `http://localhost:8080/space/`;
//   /* let res = await axios({
//   //   method: "post",
//   //   url: `http://localhost:8080/space/`,
//   //   data: JSON.stringify({
//   //     bldgName: bldgName,
//   //     bldgAddress: bldgAddress,
//   //     instructions: instructions,
//   //     capacity: capacity,
//   //     daily_hours: daily_hours,
//   //     spaceName: spaceName,
//   //   }),
//   //   headers: { "Content-Type": "application/json" },
//   // })
//   */
//   let res = await axios
//     .post(url, data, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     })
//     .catch(function (error) {
//       console.log("This is the error: ", error);
//     });
//   console.log("THIS IS RES" + res);
//   return res;
// };

export default function AddSpaceScreen({ navigation, route }) {
  let [dataBuildings, setBuildings] = useState([]);
  let buildings = [];

  // useEffect(() => {
  //   fetch(baseUrl + "buildings").then((response) => console.log(response)); //.json())
  //   // .then((json) => {
  //   //   console.log(json.data);
  //   //   setBuildings(json.data);
  //   // });
  // }, []);
  useEffect(() => {
    fetch(baseUrl + 'buildings')
      .then((response) => response.json())
      .then((json) => {
        setBuildings(json.data);
      });
  }, []);

  let [selectedBuilding, setBuilding] = useState('');

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
        <AppText customStyle={styles.title}>
          {route.params.existingSpace ? 'Update Space' : 'Add New Space'}
        </AppText>
      </View>

      <AppForm
        initialValues={{
          spaceName: route.params.existingSpace ? route.params.existingSpace.Name : '',
          bldgName: '',
          bldgAddress: '',
          instructions: '',
          capacity: '',
          // dailyHours: "",
          selectedBuilding: '',
        }}
        onSubmit={(values) => {
          console.log('LETS TRY VALUES: ' + values);
          console.log('spaceData: ' + values.spaceName);
          console.log('spaceBldg: ' + selectedBuilding);
          console.log(buildings.filter((b) => b.label == selectedBuilding)[0].value);
          let buildingId = buildings.filter((b) => b.label == selectedBuilding)[0].value;

          // get all spaces
          let addUrl = baseUrl + 'spaces?';
          addUrl += `Name=${encodeURIComponent(values.spaceName)}&`;
          addUrl += `Capacity=${encodeURIComponent(values.capacity)}&`;
          addUrl += `Passerby=&`;
          addUrl += `Cleanliness=&`;
          addUrl += `Accessibility=&`;
          addUrl += `Instructions=${encodeURIComponent(values.instructions)}&`;
          addUrl += `Notes=&`;
          addUrl += `Approval=0&`;
          // TODO Fix this!
          addUrl += `Building=${encodeURIComponent(buildingId)}`;

          console.log(addUrl);

          fetch(addUrl, {
            method: 'POST',
          })
            .then((response) => response.json())
            .then((json) => console.log('Hooray! ', json));

          navigation.navigate('SentToApproval');
        }}
      >
        <AppFormEntry
          label='Space Name'
          name='spaceName'
          placeholder='Space Name'
          defaultValue={route.params.existingSpace ? route.params.existingSpace.Name : ''}
        />
        {/* TODO: export this to a separate component */}
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            zIndex: 200,
          }}
        >
          <View style={{ flex: 3 }}>
            <AppText>Building</AppText>
          </View>

          <View style={{ flex: 7 }}>
            {/* TODO: Fix this dropdown once the database is addressed */}
            <DropDownPicker
              items={buildings}
              placeholder='Select a building'
              // defaultValue={route.params.existingSpace ? route.params.existingSpace.bldgName : ""}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              // TODO: fix this to update some kind of form state
              onChangeItem={(item) => {
                setBuilding(item.label);
                console.log(selectedBuilding);
              }}
            />
          </View>
        </View>

        {/* TODO: make this one bigger */}
        <AppFormEntry
          label='Instructions'
          name='instructions'
          placeholder='How do you get to space?'
          multiline={true}
          defaultValue={route.params.existingSpace ? route.params.existingSpace.Instructions : ''}
        />
        <AppFormEntry
          label='Capacity'
          name='capacity'
          keyboardType='number-pad'
          placeholder=''
          type='text'
          pattern='[0-9]*'
          defaultValue={
            route.params.existingSpace ? route.params.existingSpace.Capacity.toString() : ''
          }
        />
        {/* <AppFormEntry
          label="Daily Hours"
          name="dailyHours"
          placeholder="When is this space open?"
          defaultValue={route.params.existingSpace ? route.params.existingSpace.daily_hours : ""}
        /> */}
        <SubmitButton title='Submit!' selectedBuilding={selectedBuilding} />
      </AppForm>
      {/* </View> */}
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
});
