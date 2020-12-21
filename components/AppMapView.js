import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";

// import * from "../constants/dummySpaces";
// import { mapMarkersClosed, mapMarkersOpen } from "../functions/MapMarkers";

function AppMapView({ locations, props }) {
  // TODO Can't figure out how to define this dummy data in a separate
  //  file and import, unfortunately
  let closedSpacesList = locations;
  console.log(" APP MAP VIEW HELLO: " + JSON.stringify(locations));
  // [
  //   {
  //     building_address_city: "Philadelphia",
  //     building_address_street: "3417 Spruce Street",
  //     building_address_zip: "19104",
  //     building_name: "Houston Hall",
  //     bldgName: "Houston Hall",
  //     bldgAddress: "3417 Spruce Street, Philadelphia, PA 19104",
  //     latitude: "39.95052",
  //     longitude: "-75.192920",
  //     capacity: "2",
  //     dailyHours: "2PM - 5PM",
  //     instructions:
  //       "Inside Houston Hall, go up to the second floor and you will see SPARC.",
  //     spaceName: "SPARC",
  //   },
  // ];

  function mapMarkersClosed(spaceList, navigation) {
    return spaceList.map((report) => (
      <Marker
        key={report.spaceName}
        coordinate={{
          latitude: Number(report.latitude),
          longitude: Number(report.longitude),
        }}
        pinColor={"green"}
        title={report.building_name}
        description={"Open"}
        // onCalloutPress={this.state.navigation.navigate("SpaceDetail", {
        // values: arr2[0],
        // })}
        // onPress={console.log("WHAT's GOOD")}
      >
        <Callout tooltip>
          <CalloutSubview
            onPress={() =>
              navigation.navigate("SpaceDetail", {
                // TODO: fix this "arr2" here?
                values: closedSpacesList[0],
                source: "map",
              })
            }
          >
            <View>
              <View style={styles.callout}>
                <Text>{report.building_name}</Text>
              </View>
            </View>
          </CalloutSubview>
        </Callout>
      </Marker>
    ));
  }
  console.log("MapProps: ", props);
  return (
    <MapView
      style={styles.mapStyle}
      region={{
        latitude: 39.95523,
        longitude: -75.19464,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      }}
      showsUserLocation={true}
    >
      {mapMarkersClosed(closedSpacesList, props.navigation)}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});

export default AppMapView;
