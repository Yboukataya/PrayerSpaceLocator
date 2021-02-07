import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useNavigation } from '@react-navigation/native'

import AppSpaceListing from "./AppSpaceListing";
import ListItemSeparator from "./ListItemSeparator";
import Screen from "./Screen";

/**
 * This component defines a list of prayer spaces for the View Spaces page.
 * It uses the AppSpaceListing component to render each individual space in
 * the table.
 * @param {*} props
 */

function AppSpaceList({ locations }) {
  // console.log("These are our locations: " + JSON.stringify(locations));
  // console.log("APPSPACELISTPROPS\n", "--------------\n", navigation);
  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={(listing) => listing.spaceName}
        renderItem={({ item }) => (
          <AppSpaceListing
            space={item}
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
