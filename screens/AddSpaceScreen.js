import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import AppButton from '../components/AppButton';

import { baseUrl } from '../config/backend-config.js';

import t from 'tcomb-form-native';
import ImageFactory from 'react-native-image-picker-form';

import {TidinessOptions, NoiseOptions, PrivacyOptions, WuduOptions} from '../constants/SpaceDescriptions';

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
  let [buildingsObj, setBuildingsObj] = useState({});

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
  let Tidiness = t.enums(TidinessOptions);
  let Noise = t.enums(NoiseOptions);
  let Privacy = t.enums(PrivacyOptions);
  let Wudu = t.enums(WuduOptions);
  
  const Space = t.struct({
    spaceName: t.String,
    building: Building,
    capacity: t.Number,
    passerby: Privacy,
    carpet: t.Boolean,
    wuduNearby: Wudu,
    noise: Noise,
    cleanliness: Tidiness,
    instructions: t.String,
  });

  const Form = t.form.Form;

  // Custom form options: labels, placeholder, etc
  let options = {
    order: [
      'spaceName',
      'building',
      'capacity',
      'passerby',
      'carpet',
      'wuduNearby',
      'noise',
      'instructions',
      'cleanliness',
    ],
    fields: {
      instructions: {
        label: 'Directions',
        placeholder: 'How do you get to this space?',
        multiline: true,
      },
      carpet: {
        label: 'Prayer rugs available?',
      },
      capacity: {
        label: 'How many can pray here comfortably?',
        placeholder: 'Capacity',
      },
      passerby: {
        label: 'Is the space relatively private?',
      },
      noise: {
        label: 'Noise level',
      },
    },
  };

  var formVar;

  function onPress() {
    // console.log(formVar.getValue());
    let formValues = formVar.getValue();
    // submit new space to db
    let addUrl = baseUrl + 'spaces?';
    addUrl += `Name=${encodeURIComponent(formValues.spaceName)}&`;
    addUrl += `Capacity=${encodeURIComponent(formValues.capacity)}&`;
    addUrl += `Passerby=${encodeURIComponent(formValues.passerby)}&`;
    addUrl += `Cleanliness=${encodeURIComponent(formValues.cleanliness)}&`;
    addUrl += `Accessibility=&`;
    addUrl += `Instructions=${encodeURIComponent(formValues.instructions)}&`;
    addUrl += `Notes=&`;
    addUrl += `CARPET=${encodeURIComponent(formValues.carpet)}&`;
    addUrl += `Approval=0&`;
    addUrl += `Building=${encodeURIComponent(formValues.building)}`;
    addUrl += `WuduNearby=${encodeURIComponent(formValues.wuduNearby)}`;
    addUrl += `NoiseLevel=${encodeURIComponent(formValues.noise)}`;
    // TODO: add wudu nearby, noise level to database

    fetch(addUrl, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((json) => console.log('Hooray! ', json));

    navigation.navigate('SentToApproval');
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
          onPress={() => onPress()}
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
