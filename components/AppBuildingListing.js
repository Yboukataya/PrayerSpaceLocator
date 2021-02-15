import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native'

import AppText from "./AppText";

/**
 * This component defines how each prayer space in the list on the View Spaces
 * screen is rendered.
 * @param {*} param0
 */

function AppBuildingListing({ building }) {
  // console.log("APPSPACELISTINGPROPS\n", papaProps);
  const navigation = useNavigation();
  return (
    <View style={styles.listingContainer}>
      {/* for the text information */}
      <View>
        <AppText customStyle={{ flex: 1, width: "100%", borderColor: "blue" }}>
          {building.name}
        </AppText>
        <AppText customStyle={styles.capacityStyle}>
          {building.numEvents} events today
        </AppText>
      </View>

      {/* for the icon */}
      <View>
        {/* TODO Fix icon to go to a page with all events in that building */}
        <TouchableOpacity
          onPress={() => 
            navigation.navigate("SpaceDetail", {
              space: space,
              viewUnapproved: viewUnapproved,
            })
          }
        >
          <AntDesign name="rightcircle" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //   alternateRow: {},
  capacityStyle: {
    color: "goldenrod",
  },
  distStyle: {
    color: "green",
  },
  listingContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AppBuildingListing;
