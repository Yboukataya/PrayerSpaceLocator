import React, { useEffect } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Calendar from "expo-calendar";

import AppButton from "./AppButton";
import AppText from "./AppText";

async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  const defaultCalendars = calendars.filter(
    (each) => each.title === "Calendar"
  );
  return defaultCalendars[0];
}

async function createEvent(event) {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "YeRubbishCalendar" };

  await Calendar.createEventAsync(defaultCalendarSource.id, {
    title: event.Name,
    startDate: event.Date,
    endDate: new Date(event.Date.getTime() + 15 * 60000),
    // location: event.selectedSpace + " in " + event.selectedBuilding,
  });
}

function AppSpaceListing({ event, myEventsState }) {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
      }
    })();
  }, []);

  event.Date = new Date(event.Date);

  const navigation = useNavigation();

  return (
    <View style={styles.listingContainer}>
      <View style={styles.detailContainer}>
        {/* for the text information */}
        <View style={styles.eventDetailTextStyle}>
          <AppText>{event.Name}</AppText>
          <AppText customStyle={styles.capacityStyle}>
            {/* {event.space + " in " + event.building} */}
          </AppText>
          <AppText customStyle={styles.capacityStyle}>
            Time: {event.Date.getHours() + ":" + event.Date.getMinutes()}
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
          onPress={() =>
            navigation.navigate("EventDetail", {
              event: {
                eventName: event.Name,
                // selectedSpace: event.space,
                // selectedBuilding: event.building,
                date: event.Date.toDateString(),
                time: event.Date.getHours() + ":" + event.date.getMinutes(),
              },
            })
          }
        >
          <Text style={styles.btnText}>View Event</Text>
        </TouchableOpacity>
        {!myEventsState[0].includes(event.Eventid) ? (
          <TouchableOpacity
            style={styles.btnJoinEvent}
            onPress={() => {
              createEvent({
                eventName: event.Name,
                selectedSpace: event.Space,
                // selectedBuilding: event.building,
                date: event.Date,
              });
              // call setState for myEvents
              myEventsState[1]((oldArray) =>
                oldArray.includes(event.Eventid)
                  ? oldArray
                  : [...oldArray, event.Eventid]
              );
            }}
          >
            <Text style={styles.btnText}>Join Event</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnJoinEvent}
            onPress={() => {
              // TODO: remove the event from the array
              // myEventsState[1](oldArray => oldArray);
              console.log("not goin no more!");
            }}
          >
            <Text style={styles.btnText}>Going!</Text>
          </TouchableOpacity>
        )}
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
