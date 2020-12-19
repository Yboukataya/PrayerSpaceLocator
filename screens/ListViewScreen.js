import * as React from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Link } from "react-router";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import AppSpaceListing from "../components/AppSpaceListing";
import AppText from "../components/AppText";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import * as firebase from "firebase";
import AppButton from "../components/AppButton";
// import firebase from "../config/firebase";

// THIS FUNCTION USED TO INTERACT WITH DB.
const getEntries = async () => {
  var entries = [];
  var additional_location_info = [];
  var destinations = "";
  const firestoreRef = firebase.firestore().collection("prayer-spaces");
  const snapshot = await firebase.firestore().collection("prayer-spaces").get();
  const s2 = snapshot.docs.map((doc) => doc.data());
  for (var i = 0; i < s2.length; i++) {
    entries.push(s2[i]);
    additional_location_info.push({
      latitude: s2[i]["Latitude"],
      longitude: s2[i]["Longitude"],
      capacity: s2[i]["capacity"],
      name: s2[i]["building_name"],
    });
    if (i === s2.length - 1) {
      destinations = destinations.concat(
        s2[i]["Latitude"] + "," + s2[i]["Longitude"]
      );
    } else {
      destinations = destinations.concat(
        s2[i]["Latitude"] + "," + s2[i]["Longitude"] + "|"
      );
    }
  }
  const userStart = "39.955230,-75.194640";
  console.log(entries);
  console.log(destinations);

  return [userStart, destinations, "walking", additional_location_info];
};

// THIS FUNCTION USED TO INTERACT WITH DB
async function sortDistances() {
  const res = await getEntries();
  const api_params = res;
  var proxy_url = "https://cors-anywhere.herokuapp.com/";
  var target_url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${api_params[0]}&destinations=${api_params[1]}&rankBy=duration&mode=${api_params[2]}`; //<https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=$%7Bapi_params%5B0%5D%7D&destinations=$%7Bapi_params%5B1%5D%7D&rankBy=duration&mode=$%7Bapi_params%5B2%5D%7D%60>;
  var google_api_key = "&key=AIzaSyAU6aosyLmkC7HZadYSlDE5MBp2wy7jxW0";
  let resp = await fetch(`${proxy_url}${target_url}${google_api_key}`);
  let respJson = await resp.json();
  console.log("THIS IS JSON", respJson["rows"]);
  var locationInfo = [];
  var distancesArray = respJson.rows[0].elements;
  distancesArray.sort(
    (a, b) => parseFloat(a.duration.value) - parseFloat(b.duration.value)
  );
  const destination_addresses_array = respJson.destination_addresses;

  console.log("THIS IS ELEMENTS 1sdf", respJson.rows[0].elements[0].duration);
  const add_info = api_params[3];
  var i = 0;
  for (i = 0; i < destination_addresses_array.length; i++) {
    locationInfo.push({
      capacity: add_info[i].capacity,
      building_name: add_info[i].name,
      address: destination_addresses_array[i],
      text: respJson.rows[0].elements[i].distance.text,
      value: respJson.rows[0].elements[i].distance.value,
    });
  }

  locationInfo.sort(function (a, b) {
    return a.value - b.value;
  });

  console.log(locationInfo);
  return locationInfo;
}

// STATIC DATA
const arr = [
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
    distance: "0.46",
  },
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
    distance: "0.51",
  },
];

export default class PrayerSpaceLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locations: arr, props: props };
  }

  // This part we will need when we use data from firebase

  //   componentDidMount() {
  //     sortDistances()
  //       .then((res) => {
  //         this.setState({ locations: res });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  render() {
    return (
      <Screen style={{ flex: 1 }}>
        <View style={styles.container}>
          <AppText customStyle={styles.title}>Prayer Spaces</AppText>
          <FlatList
            data={this.state.locations}
            keyExtractor={(listing) => listing.building_name}
            renderItem={({ item }) => (
              <AppSpaceListing
                space={item}
                distance={item.distance}
                props={this.state.props}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
            style={styles.spaceListStyle}
          />

          <AppButton
            title="Map View"
            onPress={() => this.state.props.navigation.navigate("MapView")}
            customStyle={styles.editBtn}
          ></AppButton>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "blue",
    padding: 10,
    // margin: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  editBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
  title: {
    fontSize: 48,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },
  spaceListStyle: {
    width: "90%",
    // just for debugging purposes:
    // borderColor: "blue",
    // borderWidth: 2,
  },
});
