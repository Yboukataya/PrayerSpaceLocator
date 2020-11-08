import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppSpaceListing from "./AppSpaceListing";
import ListItemSeparator from "./ListItemSeparator";
import Screen from "./Screen";

function AppSpaceList(props) {
  const data = [
    {
      spaceName: "SPARC",
      bldgName: "Houston Hall",
      bldgAddress: "123 Main St",
      instructions: "Go east, young man!",
      capacity: 8,
      dailyHours: "M-F 9-5",
    },
    {
      spaceName: "Huntsman",
      bldgName: "Huntsman Hall",
      bldgAddress: "123 Locust St",
      instructions: "Go west, young man!",
      capacity: 2,
      dailyHours: "M-F 9-5",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(listing) => listing.spaceName}
        renderItem={({ item }) => (
          <AppSpaceListing space={item} distance="0.4" />
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
