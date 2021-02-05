import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import * as firebase from "firebase";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import HomeNavigator from "./navigation/HomeNavigator.js";
import TabNavigator from "./navigation/TabNavigator.js";
import AddSpaceScreen from "./screens/AddSpaceScreen";
import ViewSpacesScreen from "./screens/ViewSpacesScreen";
import SentToApprovalScreen from "./screens/SentToApproval"

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
    // <SentToApprovalScreen />
    <AddSpaceScreen />
  );
  // return <SpaceDetailScreen space={sampleSpace} />;
}
