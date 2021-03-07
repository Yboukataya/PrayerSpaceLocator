import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import { Formik, Field, Form } from 'formik';

import DropDownPicker from 'react-native-dropdown-picker';

import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

import { baseUrl } from '../config/backend-config.js';

import t from 'tcomb-form-native';

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

  let Building = t.enums({
    1: 'DRL',
    2: 'CA',
    3: 'Huntsman',
  });

  const Space = t.struct({
    spaceName: t.String,
    building: Building,
    capacity: t.Number,
    carpet: t.Boolean,
    passerby: t.String,
    passer2: t.String,
    instructions: t.String,
  });

  const Form = t.form.Form;

  // Custom form options: placeholder, etc
  let options = {
    fields: {
      instructions: {
        placeholder: 'How do you get to this space?',
      },
      carpet: {
        label: 'Prayer rugs available?',
      },
    },
  };

  var formVar;

  function onPress() {
    console.log(formVar.getValue());
    console.log('hi');
  }

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppText customStyle={styles.title}>
          {route.params.existingSpace ? 'Update Space' : 'Add Space'}
        </AppText>

        <ScrollView style={styles.formContainer}>
          <Form type={Space} ref={(c) => (formVar = c)} options={options} />
        </ScrollView>
        <AppButton
          title='Submit Space'
          onPress={() => {
            onPress();
            // navigation.navigate('SentToApproval');
          }}
          customStyle={styles.editBtn}
        ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
  },
});
