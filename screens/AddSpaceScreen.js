import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Formik, Field, Form } from "formik";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppFormEntry from "../components/forms/AppFormEntry";

/**
 * This component defines the form that shows up asking a user to add a new
 * prayer space to the database
 * @param {*} props
 */

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
        onSubmit={(values) => console.log(values)}
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
        <AppFormEntry
          label="Building Address"
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
