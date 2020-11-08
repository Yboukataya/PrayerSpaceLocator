import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import AddSpaceScreen from "./screens/AddSpaceScreen.js";
import AppSpaceList from "./components/AppSpaceList.js";
import SpaceDetailScreen from "./screens/SpaceDetailScreen.js";
import Screen from "./components/Screen.js";

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
    <Screen style={{ flex: 1, padding: 20 }}>
      <AppSpaceList />
    </Screen>
  );
  // return <SpaceDetailScreen space={sampleSpace} />;
}
