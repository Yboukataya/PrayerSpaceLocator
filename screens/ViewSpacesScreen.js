import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppSpaceList from "../components/AppSpaceList";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import MapViewScreen from "./MapViewScreen";
import Screen from "../components/Screen";
import "localstorage-polyfill";
import axios from "axios";
import AppMapView from "../components/AppMapView";

/**
 * This component specifies appearance of the screen that shows both list of
 * nearby spaces as well as the map.
 * @param {*} param0
 */

function ViewSpacesScreen(props) {
  let locations = JSON.parse(localStorage.getItem("computed"));
  const [mapVisible, setMapVisible] = useState(false);
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.headingContainer}>
        <AppText customStyle={styles.title}>View Spaces</AppText>
      </View>

      <View style={styles.container}>
        {/* Render map or list of spaces, based on mapVisible */}
        {mapVisible ? (
          <AppMapView {...props} />
        ) : (
          <View style={styles.spaceListContainer}>
            <AppSpaceList locations={locations} {...props} />
          </View>
        )}
      </View>
      <AppButton
        title={mapVisible ? "List View" : "Map View"}
        onPress={() => setMapVisible(!mapVisible)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  spaceListContainer: {
    flex: 1,
    width: "90%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default ViewSpacesScreen;
