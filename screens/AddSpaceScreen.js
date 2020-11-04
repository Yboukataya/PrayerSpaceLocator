import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Formik, Field, Form } from "formik";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

const spaceProperties = ["Name", "Address", "YoKiddo"];

export default function AddSpaceScreen(props) {
  const renderAttribute = ({ item }) => <AppText>{item}</AppText>;

  return (
    <Screen>
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
        <AppFormField name="spaceName" placeholder="Space Name" />
        <AppFormField name="bldgName" placeholder="Building Name" />
        <AppFormField name="bldgAddress" placeholder="Building Address" />
        <AppFormField
          name="instructions"
          placeholder="How do you get there from building entrance?"
        />
        <AppFormField
          name="capacity"
          placeholder="Capacity"
          keyboardType="number-pad"
        />
        <SubmitButton title="Add New Space" />
      </AppForm>
      {/* </View> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  attrList: {
    flex: 0.5,
  },
  bList: {
    flex: 0.5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  sideBySide: {
    flexDirection: "row",
  },
  title: {
    fontSize: 48,
    fontWeight: "600",
  },
});
