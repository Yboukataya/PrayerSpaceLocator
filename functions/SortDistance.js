import AppSpaceListing from "../components/AppSpaceListing";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import * as firebase from "react-native";

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

export default sortDistances;
