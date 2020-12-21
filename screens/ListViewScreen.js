import * as React from "react";
import "localstorage-polyfill";
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
import axios from "axios";

// const get_spaces = async () => {
//   let res = await axios({
//     method: "get",
//     url: `http://localhost:8080/spaces`,
//   }).catch(function (error) {
//     console.log("This is the error: ", error);
//   });
//   console.log(res.data.data);
//   localStorage.setItem("mapinfo", JSON.stringify(res.data.data));
// };

// const initMap = async() =>  {

//   // Get user address from lat and long

//   // Get all location addresses in db

//   // Get all space names, ids, capacity from db

//   var http_request = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=3335+Woodland+Walk,+Philadelphia,+PA+19104&destinations=3420+Walnut+St,+Philadelphia,+PA+19104|209+S+33rd+St,+Philadelphia,+PA+19104|3730+Walnut+St,+Philadelphia,+PA+19104&mode=walking&departure_time=now&key=AIzaSyAU6aosyLmkC7HZadYSlDE5MBp2wy7jxW0`;

//   axios.post(http_request).then((response) => {
//     //console.log("THIS IS RESPONCE",response.data["rows"][0]["elements"][1].duration.text);
//     var origins = response.data["origin_addresses"];
//     var destinations = response.data["destination_addresses"];

//     // API CALL to get this info
//     const space_names = [ "VanPelt Library", "DRL","Huntsman Hall"];
//     const space_ids = [1,2,3];
//     const capacity = ["10", "3", "5"];
//     const addresses = ['3420 Walnut St, Philadelphia, PA 19104', '209 S 33rd St, Philadelphia, PA 19104', '3730 Walnut St, Philadelphia, PA 19104' ];
//     const instructions = ["Go up to the 4th floor, study room 403", "Go to classroom A40", "Go up walnut it is red building"]

//     // Sort the results

//     for (var i = 0; i < origins.length; i++) {
//     	var results = response.data["rows"][0]["elements"];
//     	var len = destinations.length;
//     	var indices = new Array(len);
//     	for (let x = 0; x < len; ++x) {
//     		indices[x] = x;
//     	}

//     	indices.sort(function (a, b)  {
//     		return results[a].duration.value - results[b].duration.value;
//     	});

//     	var sorted_results = [];
//     	var sorted_capacity_results = [];
//     	var sorted_name_results = [];
//       var sorted_ids = [];
//       var arr3 = []
//     	for (var j = 0; j < results.length; j++) {
//     		sorted_results.push(results[indices[j]].duration.text);
//     		sorted_capacity_results.push(capacity[indices[j]]);
//     		sorted_name_results.push(space_names[indices[j]]);
//         sorted_ids.push(instructions[indices[j]]);
//         arr3.push({building_name:space_names[indices[j]], bldgName:space_names[indices[j]], spaceName:space_names[indices[j]], distance:results[indices[j]].duration.text, capacity:capacity[indices[j]], instructions: instructions[indices[j]]});
//     	}
//     }
//      console.log("THIS IS ARR3",arr3);

//      return arr3;
//      //return [sorted_results, sorted_capacity_results, sorted_name_results, sorted_ids];
//   }).catch(err =>{
//     console.log(err);
//   })
// }

// // THIS FUNCTION USED TO INTERACT WITH DB.
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

// // STATIC DATA
// const arr = [
//   {
//     Carpet: true,
//     Notes: "Anything",
//     accessibility: "Penn Ok",
//     building_address: {
//       city: "Philadelphia",
//       state: "Pennsylvania",
//       street: "3800 Walnut Street",
//     },
//     bldgAddress: "3800 Walnut Street, Philadelphia, PA 19104",
//     building_address_city: "Philadelphia",
//     building_address_street: "3800 Walnut Street",
//     building_address_zip: "19104",
//     building_name: "Huntsman Hall",
//     bldgName: "Huntsman Hall",
//     capacity: "10",
//     cleanliness: 3,
//     instructions: "Go up Walnut. It is the great red building.",
//     latitude: "39.95289",
//     longitude: "-75.1982",
//     nearby_wudhu: "around the corner - the washrooms",
//     passers_by: "none",
//     space_name: "huntsman",
//     dailyHours: "10AM - 10PM",
//     spaceName: "Huntsman",
//     distance: "0.46",
//   },
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
//     distance: "0.51",
//   },
// ];
// var arr5 =  [
//   {
//     building_name: "VanPelt Library",
//     bldgName: "VanPelt Library",
//     spaceName:"VanPelt Library",
//     capacity: "10",
//     distance: "4 mins",
//     instructions: "Go up to the 4th floor, study room 403",
//   },
//    {
//     building_name: "DRL",
//     spaceName: "DRL",
//     bldgName: "DRL",
//     capacity: "3",
//     distance: "5 mins",
//     instructions: "Go to classroom A40",
//   },
//   {
//     building_name: "Huntsman Hall",
//     bldgName:"Huntsman Hall",
//     spaceName: "Huntsman Hall",
//     capacity: "5",
//     distance: "8 mins",
//     instructions: "Go up walnut it is red building",
//   },
// ];
// console.log("THIS IS ARR 5", arr5);
export default class PrayerSpaceLocation extends React.Component {
  constructor(props) {
    super(props);

    console.log("THIS IS LOCAL", JSON.parse(localStorage.getItem("computed")));
    this.state = {
      locations: JSON.parse(localStorage.getItem("computed")),
      props: props,

      // location: null,
      // loading: false,
    };
  }

  render() {
    return (
      <SafeAreaView /*style={props.styles.container}*/>
        <View>
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
          />

          <View style={styles.situation}>
            {/* <AppButton
              title="Home"
              onPress={() => this.state.navigation.popToTop()}
              // if (props.route.params.source == "add") props.navigation.popToTop() else props.navigation.pop())
              //   console.log(
              //     props.navigation.goBack.equals(
              //       props.navigation.navigate("MapView")
              //     )
              //   )
              // }
              // onPress={() => props.navigation.popToTop()}
              customStyle={styles.editBtn}
            ></AppButton> */}
            <AppButton
              title="Map View"
              onPress={() => {
                // get_spaces();
                this.state.props.navigation.navigate("MapView");
              }}
              // if (props.route.params.source == "add") props.navigation.popToTop() else props.navigation.pop())
              //   console.log(
              //     props.navigation.goBack.equals(
              //       props.navigation.navigate("MapView")
              //     )
              //   )
              // }
              // onPress={() => props.navigation.popToTop()}
              customStyle={styles.editBtn}
            ></AppButton>
          </View>
        </View>
      </SafeAreaView>
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
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
  title: {
    fontSize: 48,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 35,
  },
  situation: {
    paddingTop: 450,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  callout: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
  },
});
