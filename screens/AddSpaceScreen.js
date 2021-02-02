import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Formik, Field, Form } from "formik";

import {Picker} from '@react-native-picker/picker';


import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppFormEntry from "../components/forms/AppFormEntry";
import { PennBuildings } from "../constants/Buildings.js";

/**
 * This component defines the form that shows up asking a user to add a new
 * prayer space to the database
 * @param {*} props
 */

addSpace = async (
  bldgName,
  bldgAddress,
  instructions,
  capacity,
  daily_hours,
  spaceName
) => {
  console.log(bldgName);
  const axios = require("axios");
  let data = {
    bldgName: bldgName,
    bldgAddress: bldgAddress,
    instructions: instructions,
    capacity: capacity,
    daily_hours: daily_hours,
    spaceName: spaceName,
    approval: false,
  };
  let url = `http://localhost:8080/space/`;
  /* let res = await axios({
  //   method: "post",
  //   url: `http://localhost:8080/space/`,
  //   data: JSON.stringify({
  //     bldgName: bldgName,
  //     bldgAddress: bldgAddress,
  //     instructions: instructions,
  //     capacity: capacity,
  //     daily_hours: daily_hours,
  //     spaceName: spaceName,
  //   }),
  //   headers: { "Content-Type": "application/json" },
  // })
  */
  let res = await axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .catch(function (error) {
      console.log("This is the error: ", error);
    });
  console.log("THIS IS RES" + res);
  return res;
};

export default function AddSpaceScreen(props) {
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppText customStyle={styles.title}>Add New Space</AppText>
      </View>

      <AppForm
        initialValues={{
          spaceName: "",
          bldgName: "",
          bldgAddress: "",
          instructions: "",
          capacity: "",
          dailyHours: "",
        }}
        onSubmit={(values) => {
          console.log(values.spaceName);
          this.addSpace(
            values.bldgName,
            values.bldgAddress,
            values.instructions,
            values.capacity,
            values.dailyHours,
            values.spaceName
          );
          props.navigation.navigate("SpaceDetail", { values, source: "add" });
        }}
      >
        <AppFormEntry
          label="Space Name"
          name="spaceName"
          placeholder="Space Name"
        />
        <AppFormEntry
          label="Building Name"
          name="bldgName"
          placeholder="Building Name"
        />
        
        <View style={{alignItems: "center",
    flex: 1,
    flexDirection: "row",
    width: "100%",}}>
          <View style={{flex: 3,}}>
            <AppText>Building</AppText>
          </View>
          <View style={{flex: 7,}}>
            <Picker>
              <Picker.Item label="Huntsman" value="huntsman" />
              <Picker.Item label="CA" value="ca" />
          </Picker>
          </View>
        </View>

        <AppFormEntry
          label="Building Address: 123 Main St, Philadelphia, PA 19104"
          name="bldgAddress"
          placeholder="Building Address"
        />
        <AppFormEntry
          label="Instructions"
          name="instructions"
          placeholder="How do you get to space?"
        />
        <AppFormEntry
          label="Capacity"
          name="capacity"
          keyboardType="number-pad"
          placeholder=""
        />
        <AppFormEntry
          label="Daily Hours"
          name="dailyHours"
          placeholder="When is this space open?"
        />
        <SubmitButton title="Submit!" />
      </AppForm>
      {/* </View> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "600",
  },
});
