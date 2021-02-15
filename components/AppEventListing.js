import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'

import AppButton from "./AppButton";
import AppText from "./AppText";

/**
 * This component defines how each prayer space in the list on the View Spaces
 * screen is rendered.
 * @param {*} param0
 */

function AppSpaceListing({ event }) {
  console.log(event);
  const navigation = useNavigation();
  return (
    <View style={styles.listingContainer}>
      <View style={styles.detailContainer}>
      {/* for the text information */}
      <View style={styles.eventDetailTextStyle}> 
        <AppText >
          {event.eventName}
        </AppText>
        <AppText customStyle={styles.capacityStyle}>
          {event.space + " in " + event.building}
        </AppText>
        <AppText customStyle={styles.capacityStyle}>
          {/* TODO get time out of the event.date */}
          {/* Time: {} */}
          Time: {event.date.getHours() + ":" + event.date.getMinutes()}
        </AppText>
      </View>
      </View>
      {/* buttons on the right */}
      <View style={styles.buttonsContainer}>
        <View style={styles.pplGoingStyleView}>
          <AppText style={styles.pplGoingStyle}>3 going</AppText>
        </View> 

        <TouchableOpacity
          style={styles.btnViewEvent}
          onPress={() => navigation.navigate("EventDetail",  {
                            event: {
                              eventName: event.eventName,
                              selectedSpace: event.space,
                              selectedBuilding: event.building,
                              date: event.date.toDateString(),
                              time: event.date.getHours() + ":" + event.date.getMinutes(),
                            },
                          })}>
        <Text style={styles.btnText}>View Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnJoinEvent}
          onPress={console.log("ViewEvent")} >
        <Text style={styles.btnText}>Join Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  btnJoinEvent: {
    backgroundColor: "#46D811",
    borderRadius: 10,
    marginBottom: 10,
    padding: 5, 
  },
  btnViewEvent: {
    backgroundColor: "#00BCFF",
    borderRadius: 10,
    marginBottom: 10,
    padding: 5, 
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // width: 100,
    flex: 3,
  },
  capacityStyle: {
    color: "goldenrod",
  },
  detailContainer: {
    flex: 7,
  },
  distStyle: {
    color: "green",
  },
  eventDetailTextStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  listingContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  pplGoingStyleView: {
    padding: 1,
  },
  
});

export default AppSpaceListing;
