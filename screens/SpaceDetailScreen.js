import React, { useState, useEffect } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AppButton from "../components/AppButton";
import AppSpaceDetail from "../components/AppSpaceDetail";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

import { baseUrl } from "../config/backend-config";

import { getMyObject, storeObj } from "../config/async-utils";
import {
  getTidinessDescription,
  getWuduDescription,
  getNoiseDescription,
  getPrivacyDescription,
} from "../constants/SpaceDescriptions";
import StarRating from "react-native-star-rating";
import { setStatusBarStyle } from "expo-status-bar";

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

const onStarRatingPress = (rating) => {
  // post command here!
};

function SpaceDetailScreen({ route }) {
  let [selectedBuilding, setBuilding] = useState("");
  let [stars, setStars] = useState(
    (route.params.space.RatTot * 1.0) / (route.params.space.NumRat * 1.0)
  );
  let [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // check async storage for is_admin
    getMyObject("user").then(function (value) {
      setIsAdmin(value.is_admin == 1);
    });

    // get building name using asyncStorage
    getMyObject("buildings").then(function (value) {
      let bldgs = JSON.parse(value);
      // find the building whose ID matches this space's Building id
      bldgs.forEach((b) => {
        if (b.Buildingid === route.params.space.Building) {
          setBuilding(b.Name);
        }
      });
    });

    // fetch(baseUrl + `rating?Spaceid=${route.params.space.Spaceid}`)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(((json.data.RatTot * 1.0) / NumRat) * 1.0);
    //     setStars(json.data);
    //   });

    // get command here.
  }, []);

  const navigation = useNavigation();
  console.log(route.params.space);
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppTitle>{route.params.space.Name}</AppTitle>
      </View>

      <ScrollView style={styles.spaceDetails} persistentScrollbar={true}>
        {/* <View style={styles.imgContainer}>
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1592632132538-a901188c014f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1068&q=80",
            }}
            style={{ width: "90%", height: 200, marginBottom: 10 }}
          />
        </View> */}
        {/* just for the building... */}
        <View style={styles.detailEntry}>
          <AppText>
            <AppText customStyle={styles.detailTitleStyle}>Building: </AppText>
            {selectedBuilding}
          </AppText>
        </View>
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
        <AppSpaceDetail
          space={route.params.space}
          detailTitle="Carpet"
          detailKey="CARPET"
          detailFunction={(a) => {
            if (a) {
              return "Yes";
            } else {
              return "No";
            }
          }}
        />
        <AppSpaceDetail
          space={route.params.space}
          detailTitle="Cleanliness"
          detailKey="Cleanliness"
          detailFunction={getTidinessDescription}
        />
        <AppSpaceDetail
          space={route.params.space}
          detailTitle="Is this space private?"
          detailKey="Passersby"
          detailFunction={getPrivacyDescription}
        />
        <AppSpaceDetail
          space={route.params.space}
          detailTitle="Is this space nose?"
          detailKey="NoiseLevel"
          detailFunction={getNoiseDescription}
        />
        <AppSpaceDetail
          space={route.params.space}
          detailTitle="Is there a Wudu space nearby?"
          detailKey="WuduNearby"
          detailFunction={getWuduDescription}
        />
        <AppSpaceDetail
          space={route.params.space}
          detailTitle="Capacity"
          detailKey="Capacity"
        />

        {/* TODO: fix this */}
        {/* <AppSpaceDetail
            space={route.params.space}
            detailTitle="Daily Hours"
            detailKey="daily_hours"
          />  */}
      </ScrollView>

      <StarRating
        disabled={false}
        maxStars={5}
        rating={stars}
        selectedStar={(rating) => {
          console.log(rating);
          fetch(
            baseUrl +
              `rating?Rating=${rating}&Spaceid=${route.params.space.Spaceid}`,
            {
              method: "POST",
            }
          )
            .then((response) => response.json())
            .then((json) => console.log("Hooray! ", json));
          fetch(baseUrl + `space?Spaceid=${route.params.space.Spaceid}`)
            .then((response) => response.json())
            .then((json) => {
              console.log(json.data[0]);
              console.log(json.data[0].RatTot / json.data[0].NumRat);
              setStars(json.data[0].RatTot / json.data[0].NumRat);
            });
        }}
      />

      <View style={styles.btnContainer}>
        {route.params.viewUnapproved ? (
          <AppButton
            title="Approve"
            customStyle={styles.btnStyle}
            onPress={() => acceptOnPress(route.params.space.Spaceid)}
          />
        ) : null}
        {route.params.viewUnapproved ? (
          <AppButton
            title="Reject"
            customStyle={styles.btnStyle}
            onPress={rejectOnPress}
          />
        ) : null}
        {/* {route.params.viewUnapproved ? (<AppButton title="Update"/>) : (<AppButton title="Bye"/>)}
          {route.params.viewUnapproved ? (<AppButton title="Go Back"/>) : (<AppButton title="Bye"/>)} */}
      </View>
      {isAdmin && (
        <>
          <AppButton
            title="Update"
            onPress={() =>
              navigation.navigate("AddSpace", {
                existingSpace: route.params.space,
              })
            }
          />
        </>
      )}
      <AppButton
        title="Go Back"
        onPress={() => navigation.navigate("ViewSpaces")}
      />
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
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  detailEntry: {
    marginBottom: 10,
  },
  detailTitleStyle: {
    fontWeight: "bold",
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
