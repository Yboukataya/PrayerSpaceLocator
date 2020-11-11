import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppSpaceDetail from "../components/AppSpaceDetail";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

/**
 * This component specifies appearance of the screen that shows attributes
 * about a prayer. For each attribute, it uses an AppSpaceDetail component
 * to render that attribute on its own line.
 * @param {*} param0
 */

function SpaceDetailScreen({ space }) {
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppTitle>{space.spaceName}</AppTitle>
      </View>

      <View>
        <AppSpaceDetail
          space={space}
          detailTitle="Building"
          detailKey="bldgName"
        />
        <AppSpaceDetail
          space={space}
          detailTitle="Address"
          detailKey="bldgAddress"
        />
        <AppSpaceDetail
          space={space}
          detailTitle="Instructions"
          detailKey="instructions"
        />
        <AppSpaceDetail
          space={space}
          detailTitle="Capacity"
          detailKey="capacity"
        />
        <AppSpaceDetail
          space={space}
          detailTitle="Daily Hours"
          detailKey="dailyHours"
        />
      </View>
      <View style={styles.container}>
        <AppButton
          title="Go Back"
          onPress={() => console.log("Edit!")}
          customStyle={styles.editBtn}
        ></AppButton>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  editBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SpaceDetailScreen;
