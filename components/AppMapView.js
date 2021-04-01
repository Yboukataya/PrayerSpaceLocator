import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout, CalloutSubview } from "react-native-maps";

// import * from "../constants/dummySpaces";
// import { mapMarkersClosed, mapMarkersOpen } from "../functions/MapMarkers";

function AppMapView({ locations, props }) {
  // TODO Can't figure out how to define this dummy data in a separate
  //  file and import, unfortunately
  let closedSpacesList = locations;
  console.log("APP MAP VIEW HELLO:\n" + JSON.stringify(locations));

  function mapMarkersClosed(spaceList, navigation) {
    console.log(spaceList);
    return spaceList.map((report) => (
      <Marker
        key={report.Name}
        coordinate={{
          latitude: Number(report.Latitide),
          longitude: Number(report.Longitude),
        }}
        pinColor={"green"}
        title={report.Name}
        // description={"Open"}
        // onCalloutPress={this.state.navigation.navigate("SpaceDetail", {
        // values: arr2[0],
        // })}
        // onPress={console.log("WHAT's GOOD")}
      ></Marker>
    ));
  }
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
      {mapMarkersClosed(locations)}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});

const marker = (
  <Callout tooltip>
    <CalloutSubview
    // onPress={() =>
    //   navigation.navigate("SpaceDetail", {
    //     // TODO: fix this "arr2" here?
    //     values: closedSpacesList[0],
    //     source: "map",
    //   })
    // }
    >
      <View>
        <View style={styles.callout}>{/* <Text>{report.Name}</Text> */}</View>
      </View>
    </CalloutSubview>
  </Callout>
);

export default AppMapView;
