import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import AppButton from "../components/AppButton";
import AppSpaceDetail from "../components/AppSpaceDetail";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
// import styles from "../config/styles";

export default function EventDetailScreen({ route }) {
  const navigation = useNavigation();
  let [comments, setComments] = useState("");
  // console.log(route.params.event.comments[0]);
  console.log(route.params.event);

  // login(() => {});

  // useEffect(() => {
  //   fetch(
  //     `http://localhost:3000/comment?` + `Eventid=${route.params.event.Eventid}`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setComments(json.data);
  //       console.log(json);
  //     });
  // });

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppTitle>{route.params.event.eventName}</AppTitle>
      </View>

      <ScrollView style={styles.spaceDetails} persistentScrollbar={true}>
        <View style={styles.spaceDetails}>
          <AppSpaceDetail
            space={route.params.event}
            detailTitle="Building"
            detailKey="selectedBuilding"
          />
          <AppSpaceDetail
            space={route.params.event}
            detailTitle="Space"
            detailKey="selectedSpace"
          />
          {/* TODO: combine date/time into one entry below */}
          <AppSpaceDetail
            space={route.params.event}
            detailTitle="Date"
            detailKey="date"
          />

          <View style={styles.detailEntry}>
            <AppText>
              <AppText customStyle={styles.detailTitleStyle}>Time: </AppText>
              {route.params.event.time}
            </AppText>
          </View>

          <View
            style={{
              // backgroundColor: "#0078fe",
              padding: 10,
              marginLeft: "45%",
              borderRadius: 5,
              marginTop: 5,
              marginRight: "5%",
              minWidth: "90%",
              alignSelf: "flex-end",
              borderColor: "#000000",
              borderWidth: 2,
              borderRadius: 20,
            }}
          >
            <FlatList
              data={route.params.event.comment}
              keyExtractor={(listing) => listing.Commentid}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "#0078fe",
                    padding: 10,
                    borderRadius: 20,
                    marginBottom: 5,

                    // maxWidth: "50%",
                  }}
                >
                  <AppText customStyle={{ color: "white" }}>
                    {item.Content}
                  </AppText>
                </View>
              )}
              // ItemSeparatorComponent={ListItemSeparator}
              // refreshing={false}
              // onRefresh={() => {
              //   // refreshEvents();
              // }}
            />
          </View>
          {/* <AppText>Comments: {route.params.comments[0].Content}</AppText> */}
        </View>
      </ScrollView>
      <View style={styles.btnContainer}></View>

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="comment"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={(text) => setComments(text)}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          route.params.event.comment.push({ Content: comments, Commentid: 5 });
          setComments("");
        }}
      >
        <Text style={styles.submitButtonText}> Submit </Text>
      </TouchableOpacity>
      {/* <AppButton title="Update"  onPress={() => navigation.navigate("AddSpace", {existingSpace: route.params.space})}/> */}
      <AppButton
        title="Back To Events"
        onPress={() => navigation.navigate("ViewEvents")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
  btnContainer: {
    flexDirection: "row",
    width: "50%",
    paddingRight: 10,
    paddingLeft: 10,
  },
  btnStyle: {
    marginRight: 5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  detailEntry: {
    marginBottom: 20,
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

// export default EventDetailScreen;
