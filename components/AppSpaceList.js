import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import AppSpaceListing from "./AppSpaceListing";
import ListItemSeparator from "./ListItemSeparator";
import Screen from "./Screen";

/**
 * This component defines a list of prayer spaces for the View Spaces page.
 * It uses the AppSpaceListing component to render each individual space in
 * the table.
 * @param {*} props
 */

function AppSpaceList({ locations, viewUnapproved }) {
  // console.log("These are our locations: " + JSON.stringify(locations));
  // console.log("APPSPACELISTPROPS\n", "--------------\n", navigation);
  return (
    <View style={styles.container}>
      <FlatList
        data={locations.filter((l) => (viewUnapproved ? l.approval == 0 : l.approval == 1))}
        keyExtractor={(listing) => listing.spaceName}
        renderItem={({ item }) => <AppSpaceListing space={item} viewUnapproved={viewUnapproved} />}
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
