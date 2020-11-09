import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppSpaceDetail from "../components/AppSpaceDetail";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

function SpaceDetailScreen({ space }) {
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppText customStyle={styles.title}>{space.spaceName}</AppText>
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
  title: {
    fontSize: 48,
    fontWeight: "600",
  },
});
export default SpaceDetailScreen;
