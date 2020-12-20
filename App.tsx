import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import * as firebase from "firebase";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import HomeNavigator from "./navigation/HomeNavigator.js";
import TabNavigator from "./navigation/TabNavigator.js";

import MapViewScreen from "./screens/MapViewScreen";
import ViewSpacesScreen from "./screens/ViewSpacesScreen";
import ListViewScreen from "./screens/ListViewScreen";

export default function App() {
  const sampleSpace = {
    spaceName: "SPARC",
    bldgName: "Houston Hall",
    bldgAddress: "123 Main St",
    instructions: "Go west, young man!",
    capacity: 8,
    dailyHours: "M-F 9-5",
  };
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
  // return <SpaceDetailScreen space={sampleSpace} />;
}
