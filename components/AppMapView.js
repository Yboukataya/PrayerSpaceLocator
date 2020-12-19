import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";

// import { closedSpacesList, openSpacesList } from "../config/dummySpaces";
// import { mapMarkersClosed, mapMarkersOpen } from "../functions/MapMarkers";

var arr1 = [
  {
    building_address_city: "Philadelphia",
    building_address_street: "3417 Spruce Street",
    building_address_zip: "19104",
    building_name: "Houston Hall",
    bldgName: "Houston Hall",
    bldgAddress: "3417 Spruce Street, Philadelphia, PA 19104",
    latitude: "39.95052",
    longitude: "-75.192920",
    capacity: "2",
    dailyHours: "2PM - 5PM",
    instructions:
      "Inside Houston Hall, go up to the second floor and you will see SPARC.",
    spaceName: "SPARC",
  },
];
var arr2 = [
  {
    Carpet: true,
    Notes: "Anything",
    accessibility: "Penn Ok",
    building_address: {
      city: "Philadelphia",
      state: "Pennsylvania",
      street: "3800 Walnut Street",
    },
    bldgAddress: "3800 Walnut Street, Philadelphia, PA 19104",
    building_address_city: "Philadelphia",
    building_address_street: "3800 Walnut Street",
    building_address_zip: "19104",
    building_name: "Huntsman Hall",
    bldgName: "Huntsman Hall",
    capacity: "10",
    cleanliness: 3,
    instructions: "Go up Walnut. It is the great red building.",
    latitude: "39.95289",
    longitude: "-75.1982",
    nearby_wudhu: "around the corner - the washrooms",
    passers_by: "none",
    space_name: "huntsman",
    dailyHours: "10AM - 10PM",
    spaceName: "Huntsman",
  },
];

function AppMapView(props) {
  let mapMarkersClosed = () => {
    return arr2.map((report) => (
      <Marker
        key={report.building_name}
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
              this.state.navigation.navigate("SpaceDetail", {
                values: arr2[0],
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
  };

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
      {mapMarkersClosed(arr1)}
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
