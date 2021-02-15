import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useNavigation } from '@react-navigation/native'

import AppBuildingListing from "./AppBuildingListing";
import ListItemSeparator from "./ListItemSeparator";
import Screen from "./Screen";

function AppBuildingList({ buildings }) {
  console.log("hi");
  console.log(buildings);
  return (
    <View style={styles.container}>
      <FlatList
        data={buildings}
        keyExtractor={(listing) => console.log(listing)}
        renderItem={({ item }) => (
          <AppBuildingListing
            building={item}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
    width: "100%",
  },
});

export default AppBuildingList;
