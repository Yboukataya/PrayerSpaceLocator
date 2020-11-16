// BEGINS ON LINE 134

// // import * as React from "react";
// // import { StyleSheet, FlatList } from "react-native";
// // import { Link } from "react-router";
// // import EditScreenInfo from "../components/EditScreenInfo";
// // import { Text, View } from "../components/Themed";
// // import AppSpaceListing from "../components/AppSpaceListing";
// // import ListItemSeparator from "../components/ListItemSeparator";
// // import Screen from "../components/Screen";

// // import { MapView, Marker } from "react-native-maps";

// // export default class PrayerSpaceLocationMap extends React.Component {

// //   //   componentDidMount() {
// //   //     this.state.locations
// //   //       .map((entry) => (
// //   //         <MapView.Marker
// //   //           key={entry.building_name}
// //   //           coordinate={{
// //   //             latitude: entry.latitude,
// //   //             longitude: entry.longitude,
// //   //           }}
// //   //           title={entry.building_name}
// //   //           description={entry.text}
// //   //         />
// //   //       ))
// //   //       .then((res) => this.setState({ mapMarkers: res }));
// //   //   }

// //   render() {
// //     // this.setState({
// //     //   mapMarkers: this.state.locations.map((entry) => (
// //     //     <MapView.Marker
// //     //       key={entry.building_name}
// //     //       coordinate={{
// //     //         latitude: entry.latitude,
// //     //         longitude: entry.longitude,
// //     //       }}
// //     //       title={entry.building_name}
// //     //       description={entry.text}
// //     //     />
// //     //   )),
// //     // });

// //     return (
// //       //   <View /*style={styles.container}*/>
// //       <MapView
// //         //   style={styles.mapStyle}
// //         style={{ alignSelf: "stretch", height: 400 }}
// //         region={this.props.coordinate}
// //         showsUserLocation={true}
// //       ></MapView>
// //       //{/* </View> */}
// //       //   {this.mapMarkers()}
// //     );
// //   }
// // }

// const getEntries = async () => {
//   var entries = [];
//   var additional_location_info = [];
//   var destinations = "";
//   const firestoreRef = firebase.firestore().collection("prayer-spaces");
//   const snapshot = await firebase.firestore().collection("prayer-spaces").get();
//   const s2 = snapshot.docs.map((doc) => doc.data());
//   for (var i = 0; i < s2.length; i++) {
//     entries.push(s2[i]);
//     additional_location_info.push({
//       latitude: s2[i]["Latitude"],
//       longitude: s2[i]["Longitude"],
//       capacity: s2[i]["capacity"],
//       name: s2[i]["building_name"],
//     });
//     if (i === s2.length - 1) {
//       destinations = destinations.concat(
//         s2[i]["Latitude"] + "," + s2[i]["Longitude"]
//       );
//     } else {
//       destinations = destinations.concat(
//         s2[i]["Latitude"] + "," + s2[i]["Longitude"] + "|"
//       );
//     }
//   }
//   const userStart = "39.955230,-75.194640";
//   console.log(entries);
//   console.log(destinations);

//   return [userStart, destinations, "walking", additional_location_info];
// };

// async function sortDistances() {
//   const res = await getEntries();
//   const api_params = res;
//   var proxy_url = "https://cors-anywhere.herokuapp.com/";
//   var target_url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${api_params[0]}&destinations=${api_params[1]}&rankBy=duration&mode=${api_params[2]}`; //<https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=$%7Bapi_params%5B0%5D%7D&destinations=$%7Bapi_params%5B1%5D%7D&rankBy=duration&mode=$%7Bapi_params%5B2%5D%7D%60>;
//   var google_api_key = "&key=AIzaSyAU6aosyLmkC7HZadYSlDE5MBp2wy7jxW0";
//   let resp = await fetch(`${proxy_url}${target_url}${google_api_key}`);
//   let respJson = await resp.json();
//   console.log("THIS IS JSON", respJson["rows"]);
//   var locationInfo = [];
//   var distancesArray = respJson.rows[0].elements;
//   distancesArray.sort(
//     (a, b) => parseFloat(a.duration.value) - parseFloat(b.duration.value)
//   );
//   const destination_addresses_array = respJson.destination_addresses;

//   console.log("THIS IS ELEMENTS 1sdf", respJson.rows[0].elements[0].duration);
//   const add_info = api_params[3];
//   var i = 0;
//   for (i = 0; i < destination_addresses_array.length; i++) {
//     locationInfo.push({
//       capacity: add_info[i].capacity,
//       building_name: add_info[i].name,
//       address: destination_addresses_array[i],
//       text: respJson.rows[0].elements[i].distance.text,
//       value: respJson.rows[0].elements[i].distance.value,
//     });
//   }

//   locationInfo.sort(function (a, b) {
//     return a.value - b.value;
//   });

//   console.log(locationInfo);
//   return locationInfo;
// }

// ACTUAL CLASS

import React from "react";

import { MapView, Marker } from "react-native-maps";

import { StyleSheet, Text, View, Dimensions } from "react-native";

import * as firebase from "firebase";

// STATIC DATA
var arr = [
  {
    Carpet: true,
    Notes: '"Anything"',
    accessibility: '"Penn Ok"',
    building_address: {
      city: '"Philadelphia"',
      state: '"Pennsylvania"',
      street: '"3800 Walnut Street"',
    },
    building_address_city: '"Philadelphia"',
    building_address_street: '"3800 Walnut Street"',
    building_address_zip: '"19104"',
    building_name: '"Huntsman Hall"',
    capacity: "10",
    cleanliness: 3,
    instructions: '"Go up Walnut. It is the great red building."',
    latitude: "39.95339",
    longitude: "-75.19966",
    nearby_wudhu: '"around the corner - the washrooms"',
    passers_by: '"none"',
    space_name: '"huntsman"',
  },
  {
    building_address_city: '"Philadelphia"',
    building_address_street: '"3417 Spruce Street"',
    building_address_zip: '"19104"',
    building_name: '"Houston Hall"',
    latitude: "39.95052",
    longitude: "-75.192920",
    capacity: "2",
  },
];

export default class MapViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locations: arr };
  }
  //   componentDidMount() {
  //     sortDistances()
  //       .then((res) => {
  //         this.setState({ locations: ra\ });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

  //   mapMarkers = () => {
  //     return this.state.locations.map((report) => (
  //       <Marker
  //         key={report.building_address_city}
  //         coordinate={{ latitude: report.latitude, longitude: report.longitude }}
  //         title={report.building_name}
  //         description={report.capacity}
  //       ></Marker>
  //     ));
  //   };

  // initialRegion={{
  //   latitude: 39.95523,
  //   longitude: -75.19464,
  //   latitudeDelta: 10,
  //   longitudeDelta: 45,
  // }}
  // region={this.props.coordinate}
  // showsUserLocation={true}
  //   />
  //</View></MapView>

  // RENDER throwing some confusing issues.
  render() {
    // console.log(this.mapMarkers());
    return (
      <View style={styles.container}>
        <MapView style={{ ...StyleSheet.absoluteFillObject }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",

    alignItems: "center",

    justifyContent: "center",
  },

  mapStyle: {
    width: Dimensions.get("window").width,

    height: Dimensions.get("window").height,
  },
});
