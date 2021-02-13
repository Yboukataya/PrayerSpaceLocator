import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import * as firebase from "firebase";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import TabNavigator from "./navigation/TabNavigator.js";

export default function App() {
  const sampleSpace = {
    spaceName: "SPARC",
    bldgName: "Houston Hall",
    instructions: "Go west, young man!",
    capacity: 8,
    dailyHours: "M-F 9-5",
  };
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    // <EventDetailScreen />
  );
}
