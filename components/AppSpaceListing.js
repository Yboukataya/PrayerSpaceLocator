import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import AppText from "./AppText";

function AppSpaceListing({ space, distance }) {
  return (
    <View style={styles.listingContainer}>
      {/* for the text information */}
      <View>
        <AppText customStyle={{ flex: 1, width: "100%", borderColor: "blue" }}>
          {space.spaceName} :
          <AppText customStyle={styles.distStyle}> {distance}mi</AppText>
        </AppText>
        <AppText customStyle={styles.capacityStyle}>
          Capacity: {space.capacity}
        </AppText>
      </View>

      {/* for the icon */}
      <View>
        <TouchableOpacity onPress={() => console.log(space)}>
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
  //   iconStyle: {},
  listingContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  //   primaryRow: {},
});
export default AppSpaceListing;
