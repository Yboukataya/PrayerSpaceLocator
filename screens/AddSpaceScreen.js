import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Formik, Field, Form } from "formik";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppFormEntry from "../components/forms/AppFormEntry";

const spaceProperties = ["Name", "Address", "YoKiddo"];

export default function AddSpaceScreen(props) {
  const renderAttribute = ({ item }) => <AppText>{item}</AppText>;

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppText customStyle={styles.title}>Add New Space</AppText>
      </View>

      {/* <View style={styles.sideBySide}>
        <FlatList
          data={spaceProperties}
          keyExtractor={(attribute) => attribute}
          renderItem={renderAttribute}
          style={styles.attrList}
        /> */}

      <AppForm
        initialValues={{
          spaceName: "",
          bldgName: "",
          bldgAddress: "",
          instructions: "",
        }}
        onSubmit={(values) => console.log(values)}
        style={styles.bList}
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
