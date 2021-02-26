import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AppButton from "../components/AppButton";
import AppSpaceDetail from "../components/AppSpaceDetail";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import { baseUrl } from "../config/backend-config";

/**
 * This component specifies appearance of the screen that shows attributes
 * about a prayer space. For each attribute, it uses an AppSpaceDetail component
 * to render that attribute on its own line.
 * @param {*} param0
 */

const acceptOnPress = (spaceId) =>
  Alert.alert(
    "Accept Space",
    "I verify that I have visited this space and that I believe Muslim students would be safe praying here.",
    [
      {
        text: "Go Back",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Yes, Approve!",
        onPress: () => {
          // console.log("Accepting..");
          /* update database approval value */
          fetch(baseUrl + `approval?Spaceid=${spaceId}`, {
            method: "POST",
          })
            .then((response) => response.json())
            .then((json) => console.log("Hooray! ", json));
        },
      },
    ]
  );

const rejectOnPress = () =>
  Alert.alert("Reject Space", "Are you sure you want to reject this space?", [
    {
      text: "Cancel",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "Yes, Reject",
      onPress: () =>
        console.log(
          "Rejecting!"
        ) /* make DELETE request for spaces table, ADD request for rejected table */,
    },
  ]);

function SpaceDetailScreen({ route }) {
  // console.log("CHECK SPACE OBJECT: \n", route.params.space);
  // console.log("CHECK VIEWUNAPPROVED: \n", route.params.viewUnapproved);

  const navigation = useNavigation();

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppTitle>{route.params.space.Name}</AppTitle>
      </View>

      <View style={styles.spaceDetails}>
        <AppSpaceDetail space={route.params.space} detailTitle="Building" detailKey="Building" />
        {/* <AppSpaceDetail
            space={route.params.space}
            detailTitle="Address"
            detailKey="bldgAddress"
          /> */}
        <AppSpaceDetail
          space={route.params.space}
          detailTitle="Instructions"
          detailKey="Instructions"
        />
        <AppSpaceDetail space={route.params.space} detailTitle="Capacity" detailKey="Capacity" />
        {/* <AppSpaceDetail
            space={route.params.space}
            detailTitle="Daily Hours"
            detailKey="daily_hours"
          />  */}
      </View>

      <View style={styles.imgContainer}>
        <Image
          source={{
            height: "100%",
            uri:
              "https://images.unsplash.com/photo-1592632132538-a901188c014f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1068&q=80",
            width: "90%",
          }}
        />
      </View>

      <View style={styles.btnContainer}>
        {route.params.viewUnapproved ? (
          <AppButton
            title="Approve"
            customStyle={styles.btnStyle}
            onPress={() => acceptOnPress(route.params.space.Spaceid)}
          />
        ) : null}
        {route.params.viewUnapproved ? (
          <AppButton title="Reject" customStyle={styles.btnStyle} onPress={rejectOnPress} />
        ) : null}
        {/* {route.params.viewUnapproved ? (<AppButton title="Update"/>) : (<AppButton title="Bye"/>)}
          {route.params.viewUnapproved ? (<AppButton title="Go Back"/>) : (<AppButton title="Bye"/>)} */}
      </View>
      <AppButton
        title="Update"
        onPress={() => navigation.navigate("AddSpace", { existingSpace: route.params.space })}
      />
      <AppButton title="Go Back" onPress={() => navigation.navigate("ViewSpaces")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    width: "50%",
    paddingRight: 10,
    paddingLeft: 10,
  },
  btnStyle: {
    marginRight: 5,
  },
  imgContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingTop: 5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  editBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  spaceDetails: {
    flex: 1,
  },
});

export default SpaceDetailScreen;
