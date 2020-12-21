import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppSpaceListing from "./AppSpaceListing";
import ListItemSeparator from "./ListItemSeparator";
import Screen from "./Screen";

/**
 * This component defines a list of prayer spaces for the View Spaces page.
 * It uses the AppSpaceListing component to render each individual space in
 * the table.
 * @param {*} props
 */

function AppSpaceList({ locations, props }) {
  console.log("These are our locations: " + JSON.stringify(locations));
  const data = locations;
  // const data = [
  //   {
  //     spaceName: "SPARC",
  //     bldgName: "Houston Hall",
  //     bldgAddress: "123 Main St",
  //     instructions: "Go east, young man!",
  //     capacity: 8,
  //     dailyHours: "M-F 9-5",
  //   },
  //   {
  //     spaceName: "Huntsman",
  //     bldgName: "Huntsman Hall",
  //     bldgAddress: "123 Locust St",
  //     instructions: "Go west, young man!",
  //     capacity: 2,
  //     dailyHours: "M-F 9-5",
  //   },
  // ];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(listing) => listing.spaceName}
        renderItem={({ item }) => (
          <AppSpaceListing
            space={item}
            distance={item.distance}
            props={props}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
    width: "100%",
  },
});
export default AppSpaceList;
