import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import AppText from "./AppText";

/**
 * This component defines how each prayer space in the list on the View Spaces
 * screen is rendered.
 * @param {*} param0
 */

function AppSpaceListing({space, papaProps}) {
  console.log("APPSPACELISTINGPROPS\n", papaProps);
  return (
    <View style={styles.listingContainer}>
      {/* for the text information */}
      <View>
        <AppText customStyle={{ flex: 1, width: "100%", borderColor: "blue" }}>
          {space.spaceName} :
          {/* <AppText customStyle={styles.distStyle}> {distance}</AppText> */}
        </AppText>
        <AppText customStyle={styles.capacityStyle}>
          Capacity: {space.capacity}
        </AppText>
      </View>

      {/* for the icon */}
      <View>
        <TouchableOpacity
          onPress={() =>
            papaProps.navigation.navigate("SpaceDetail", {
              space: space,
              props: papaProps,
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

export default AppSpaceListing;
